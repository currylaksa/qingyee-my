$ErrorActionPreference = "Stop"

<#
.SYNOPSIS
Creates validated daily clock reports using Excel COM automation.

.DESCRIPTION
Portfolio-safe version of an internship productivity tool. It contains generic
category names and no customer, employee, or subcontractor information.
#>

param(
    [string]$ReportPath,
    [string]$ActivityPath,
    [string]$SourceSheetName = "Clock Detail Report"
)

if (-not $ReportPath) {
    $dateText = Get-Date -Format "MMdd"
    $ReportPath = Join-Path $PSScriptRoot "clockreport$dateText.xlsx"
}

if (-not $ActivityPath) {
    $ActivityPath = Join-Path $PSScriptRoot "activity.xlsx"
}

if (-not (Test-Path $ReportPath)) {
    throw "Report workbook not found: $ReportPath"
}

if (-not (Test-Path $ActivityPath)) {
    throw "Activity workbook not found: $ActivityPath"
}

$categories = @(
    @{ Name = "CATEGORY_A"; DistanceLimit = 500; AddDailyWork = $true },
    @{ Name = "CATEGORY_B"; DistanceLimit = 500; AddDailyWork = $true },
    @{ Name = "CATEGORY_C"; DistanceLimit = 20000; AddDailyWork = $false },
    @{ Name = "CATEGORY_D"; DistanceLimit = 20000; AddDailyWork = $false }
)

$xlDatabase = 1
$xlRowField = 1
$xlTabular = 0
$xlUp = -4162
$xlCellTypeVisible = 12
$xlCount = -4112
$xlDuplicate = 1
$xlMin = -4139

function Normalize-Text {
    param([object]$Value)

    if ($null -eq $Value) {
        return ""
    }

    return ([string]$Value).Replace([char]160, " ").Trim()
}

function Release-ComObject {
    param([object]$ComObject)

    if ($null -ne $ComObject) {
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($ComObject)
    }
}

$excel = $null
$reportWorkbook = $null
$activityWorkbook = $null

try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $true
    $excel.DisplayAlerts = $false

    # Build an in-memory Site ID -> Daily Work lookup table.
    $activityMap = @{}
    $activityWorkbook = $excel.Workbooks.Open((Resolve-Path $ActivityPath).Path)
    $activitySheet = $activityWorkbook.Sheets.Item("Site Rollout Plan")
    $lastActivityRow = $activitySheet.Cells.Item(
        $activitySheet.Rows.Count, 2
    ).End($xlUp).Row

    for ($row = 2; $row -le $lastActivityRow; $row++) {
        $siteId = Normalize-Text $activitySheet.Cells.Item($row, 2).Value2
        $dailyWork = Normalize-Text $activitySheet.Cells.Item($row, 9).Value2

        if ($siteId -and -not $activityMap.ContainsKey($siteId)) {
            $activityMap[$siteId] = $dailyWork
        }
    }

    $activityWorkbook.Close($false)
    Release-ComObject $activitySheet
    Release-ComObject $activityWorkbook
    $activityWorkbook = $null

    $reportWorkbook = $excel.Workbooks.Open((Resolve-Path $ReportPath).Path)
    $sourceSheet = $reportWorkbook.Sheets.Item($SourceSheetName)

    foreach ($category in $categories) {
        $categoryName = $category.Name
        $dataSheetName = "Data $categoryName"
        $pivotSheetName = "Pivot $categoryName"

        foreach ($sheetName in @($dataSheetName, $pivotSheetName)) {
            try {
                $reportWorkbook.Sheets.Item($sheetName).Delete()
            }
            catch {
                # The sheet does not exist on the first run.
            }
        }

        if ($sourceSheet.AutoFilterMode) {
            $sourceSheet.AutoFilterMode = $false
        }

        $lastSourceRow = $sourceSheet.Cells.Item(
            $sourceSheet.Rows.Count, 1
        ).End($xlUp).Row
        $sourceRange = $sourceSheet.Range("A1:Z$lastSourceRow")
        $sourceRange.AutoFilter(9, "*$categoryName*")

        try {
            $visibleRange = $sourceSheet.UsedRange.SpecialCells($xlCellTypeVisible)
            $visibleRange.Copy()
        }
        catch {
            Write-Warning "No records found for $categoryName"
            continue
        }

        $dataSheet = $reportWorkbook.Sheets.Add(
            $reportWorkbook.Sheets.Item($reportWorkbook.Sheets.Count)
        )
        $dataSheet.Name = $dataSheetName
        $dataSheet.Paste()

        $lastDataRow = $dataSheet.Cells.Item(
            $dataSheet.Rows.Count, 1
        ).End($xlUp).Row

        # Convert clock timestamps into Excel time values.
        for ($row = 2; $row -le $lastDataRow; $row++) {
            $clockCell = $dataSheet.Cells.Item($row, 5)
            if ($clockCell.Value2) {
                try {
                    $clockCell.Value2 = [DateTime]::Parse([string]$clockCell.Value2)
                    $clockCell.NumberFormat = "hh:mm:ss"
                }
                catch {
                    $clockCell.Interior.ColorIndex = 6
                }
            }
        }

        # Remove records outside the configured distance threshold.
        for ($row = $lastDataRow; $row -ge 2; $row--) {
            $distance = $dataSheet.Cells.Item($row, 6).Value2
            try {
                if ($distance -and [double]$distance -gt $category.DistanceLimit) {
                    [void]$dataSheet.Rows.Item($row).Delete()
                }
            }
            catch {
                # Highlight malformed values for manual review.
                $dataSheet.Cells.Item($row, 6).Interior.ColorIndex = 6
            }
        }

        $lastFilteredRow = $dataSheet.Cells.Item(
            $dataSheet.Rows.Count, 1
        ).End($xlUp).Row

        if ($lastFilteredRow -lt 2) {
            $dataSheet.Delete()
            continue
        }

        # Create the detailed PivotTable.
        $pivotCache = $reportWorkbook.PivotCaches().Create(
            $xlDatabase, $dataSheet.UsedRange
        )
        $pivotSheet = $reportWorkbook.Sheets.Add(
            $reportWorkbook.Sheets.Item($reportWorkbook.Sheets.Count)
        )
        $pivotSheet.Name = $pivotSheetName
        $pivotTable = $pivotCache.CreatePivotTable(
            $pivotSheet.Range("A3"), "Pivot_$categoryName"
        )

        foreach ($fieldName in @("Company", "Account", "Name", "DU ID")) {
            $field = $pivotTable.PivotFields($fieldName)
            $field.Orientation = $xlRowField
            $field.Subtotals = New-Object "boolean[]" 12
            $field.LayoutForm = $xlTabular
        }

        $clockField = $pivotTable.AddDataField(
            $pivotTable.PivotFields("Clock Time"),
            "Earliest Clock Time",
            $xlMin
        )
        $clockField.NumberFormat = "hh:mm:ss"

        # Enrich selected categories with daily work descriptions.
        if ($category.AddDailyWork) {
            $header = $pivotSheet.Cells.Item(3, 6)
            $header.Value2 = "Daily Work"
            $header.Font.Bold = $true
            $header.Interior.ColorIndex = 5
            $header.Font.ColorIndex = 2

            $lastPivotRow = $pivotSheet.Cells.Item(
                $pivotSheet.Rows.Count, 4
            ).End($xlUp).Row

            for ($row = 4; $row -le $lastPivotRow; $row++) {
                $siteId = Normalize-Text $pivotSheet.Cells.Item($row, 4).Value2
                $target = $pivotSheet.Cells.Item($row, 6)

                if ($siteId -and $activityMap.ContainsKey($siteId)) {
                    $target.Value2 = $activityMap[$siteId]
                }
                elseif ($siteId) {
                    $target.Value2 = "Not Found"
                    $target.Font.ColorIndex = 3
                }
            }

            $pivotSheet.Range("F3:F$lastPivotRow").Borders.LineStyle = 1
            $pivotSheet.Columns.Item(6).AutoFit()
        }

        # Create a company-level headcount summary.
        $dataSheet.Range("D1:D$lastFilteredRow").Copy($dataSheet.Range("AA1"))
        $dataSheet.Range("C1:C$lastFilteredRow").Copy($dataSheet.Range("AB1"))
        $dataSheet.Range("AA1:AB$lastFilteredRow").RemoveDuplicates(@(1, 2), 1)
        $lastUniqueRow = $dataSheet.Cells.Item(
            $dataSheet.Rows.Count, 27
        ).End($xlUp).Row

        if ($lastUniqueRow -gt 1) {
            $summaryCache = $reportWorkbook.PivotCaches().Create(
                $xlDatabase, $dataSheet.Range("AA1:AB$lastUniqueRow")
            )
            $summaryTable = $summaryCache.CreatePivotTable(
                $pivotSheet.Range("H3"), "Summary_$categoryName"
            )
            $summaryTable.PivotFields("Company").Orientation = $xlRowField
            [void]$summaryTable.AddDataField(
                $summaryTable.PivotFields("Name"),
                "Count of Name",
                $xlCount
            )
        }

        # Highlight duplicate site IDs as potential anomalies.
        $lastPivotRow = $pivotSheet.Cells.Item(
            $pivotSheet.Rows.Count, 4
        ).End($xlUp).Row

        if ($lastPivotRow -gt 3) {
            $duplicateRule = $pivotSheet.Range(
                "D4:D$lastPivotRow"
            ).FormatConditions.AddUniqueValues()
            $duplicateRule.DupeUnique = $xlDuplicate
            $duplicateRule.Interior.ColorIndex = 46
        }
    }

    if ($sourceSheet.AutoFilterMode) {
        $sourceSheet.ShowAllData()
    }

    $reportWorkbook.Save()
    Write-Host "Report generated successfully: $ReportPath"
}
finally {
    if ($activityWorkbook) {
        $activityWorkbook.Close($false)
    }
    if ($reportWorkbook) {
        $reportWorkbook.Close($true)
    }
    if ($excel) {
        $excel.Quit()
    }

    Release-ComObject $activityWorkbook
    Release-ComObject $reportWorkbook
    Release-ComObject $excel
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
