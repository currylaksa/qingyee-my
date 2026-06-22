# Huawei Internship Automation Portfolio

During my Project Management internship at Huawei, I developed five automation
solutions using Python, PowerShell, Selenium, pandas, openpyxl, and Microsoft
Excel automation.

These projects reduced repetitive operational work, improved data consistency,
and made network-site information easier to validate and report. They also
strengthened skills relevant to Network Security Engineering, including data
validation, access-related record tracking, browser automation, error handling,
diagnostic logging, and secure configuration practices.

> Portfolio note: The scripts in this folder are sanitized versions of the
> original tools. Credentials, internal URLs, personal information, customer
> names, subcontractor names, and operational datasets have been removed.

## 1. Work Permit Site Extractor

**Usage:** Shared with teammates

Built a Python tool that processes weekly work-permit spreadsheets, extracts
network-site IDs from multiple columns, normalizes inconsistent delimiters,
removes duplicate entries, groups sites by configurable operational regions,
maps site IDs to site names, and generates formatted Excel reports.

### Technical highlights

- Parses comma-, slash-, and whitespace-separated site identifiers.
- Handles missing child-site values using a configurable source column.
- Combines and deduplicates records from multiple workbooks.
- Enriches site IDs using a separate mapping workbook.
- Produces sorted and formatted `.xlsx` reports.

### Relevant skills

Python, openpyxl, data validation, parsing, deduplication, spreadsheet
automation, and operational reporting.

Source: [`work_permit_site_extractor/work_permit_extractor.py`](work_permit_site_extractor/work_permit_extractor.py)

## 2. Site Key Status Checker

**Usage:** Shared with teammates

Developed a Python lookup tool that correlates two Excel data sources to show a
network site's key status, key holder, collection location, responsible task
handler, and collector details when required.

### Technical highlights

- Accepts one or multiple site IDs.
- Correlates records across separate operational datasets.
- Enriches key-holder records with collection-location information.
- Handles missing and duplicate records.
- Restricts the display of collector details to relevant status conditions.

### Relevant skills

Python, pandas, data correlation, physical-access record visibility, input
validation, and exception handling.

Source: [`site_key_status_checker/key_status_checker.py`](site_key_status_checker/key_status_checker.py)

## 3. Multi-Site Clock-In/Clock-Out Automation

**Usage:** Shared with teammates

Automated repetitive browser workflows for batches of network sites. The tool
logs in using environment-based credentials, validates requested sites against
a work permit, performs clock-in or clock-out actions, and produces a
success/failure summary.

### Technical highlights

- Uses Selenium explicit waits for reliable browser interaction.
- Supports batch input with multiple delimiters.
- Validates site IDs before performing an action.
- Filters open records by date for clock-out processing.
- Continues processing when individual sites fail.
- Keeps credentials and endpoint URLs outside the source code.

### Relevant skills

Python, Selenium, secure configuration, browser automation, validation,
fault-tolerant batch processing, and diagnostic logging.

Source: [`multi_site_clock_automation/site_clock_automation.py`](multi_site_clock_automation/site_clock_automation.py)

## 4. Daily Clock Report Automation

**Usage:** Personal productivity tool

Created a PowerShell workflow that transforms a raw daily clock report into
structured Excel reports. It filters configurable work categories, validates
distance values, converts timestamps, generates PivotTables, highlights
duplicate site records, and enriches entries from a master activity workbook.

### Technical highlights

- Controls Microsoft Excel through COM automation.
- Applies configurable distance-validation thresholds.
- Generates detailed and summary PivotTables.
- Correlates site IDs with daily activity descriptions.
- Cleans non-breaking spaces that can cause lookup mismatches.
- Highlights duplicate and unmatched records for review.

### Relevant skills

PowerShell, Excel COM automation, data cleansing, anomaly detection, reporting,
and cross-dataset correlation.

Source: [`daily_clock_report/clock_report.ps1`](daily_clock_report/clock_report.ps1)

## 5. Batch Email Request Automation

**Usage:** Personal productivity tool

Built a Selenium workflow that processes batches of network-related identifiers
through an authenticated internal request form. The user completes login
manually, after which the script submits each identifier and records failures
with diagnostic screenshots.

### Technical highlights

- Keeps authentication under user control.
- Processes identifiers sequentially with progress feedback.
- Uses configurable field selectors and form values.
- Isolates failures so one record does not stop the batch.
- Saves screenshots to support troubleshooting.

### Relevant skills

Python, Selenium, authentication-aware workflow design, batch processing,
exception handling, and diagnostic evidence collection.

Source: [`batch_email_request/batch_email_request.py`](batch_email_request/batch_email_request.py)

## Network Security Relevance

Together, these projects demonstrate:

- Automation of repeatable operational workflows.
- Correlation and validation of records from multiple data sources.
- Awareness of physical-access and network-site information.
- Secure handling of credentials and internal endpoints.
- Detection of missing, duplicate, or anomalous records.
- Resilient processing with clear audit-friendly results.
- Diagnostic logging and evidence collection when automation fails.

## Repository Structure

```text
portfolio_automation_projects/
├── README.md
├── requirements.txt
├── batch_email_request/
│   └── batch_email_request.py
├── daily_clock_report/
│   └── clock_report.ps1
├── multi_site_clock_automation/
│   └── site_clock_automation.py
├── site_key_status_checker/
│   └── key_status_checker.py
└── work_permit_site_extractor/
    └── work_permit_extractor.py
```

## Running the Python Tools

Create a virtual environment and install the included dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

On Windows PowerShell, activate the environment with:

```powershell
.\.venv\Scripts\Activate.ps1
```

Each Python script provides command-line guidance through `--help`. The daily
clock report requires Windows and a locally installed copy of Microsoft Excel
because it uses Excel COM automation.

## Safe Configuration

The browser automations read configuration from environment variables instead
of storing secrets in source code:

```powershell
$env:SITE_PORTAL_LOGIN_URL = "https://example.invalid/login"
$env:SITE_PORTAL_WORK_PERMIT_URL = "https://example.invalid/work-permits"
$env:SITE_PORTAL_HISTORY_URL = "https://example.invalid/history"
$env:SITE_PORTAL_USERNAME = "your-username"
$env:SITE_PORTAL_PASSWORD = "your-password"
$env:EMAIL_REQUEST_FORM_URL = "https://example.invalid/request-form"
```

Placeholder domains will not connect to a real service. Authorized endpoint
values must be supplied by the user in their own environment.

