"""Correlate network-site key status and collection-location spreadsheets."""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd


PENDING_RETURN_STATUS = "Pending Key Return"


def normalize(value: object) -> str:
    """Normalize spreadsheet lookup values."""
    if pd.isna(value):
        return ""
    return str(value).strip()


def load_workbook(path: Path, sheet_name: str | int = 0) -> pd.DataFrame:
    if not path.exists():
        raise FileNotFoundError(f"Workbook not found: {path}")
    return pd.read_excel(path, sheet_name=sheet_name, engine="openpyxl")


def enrich_key_holder(
    key_holder: object,
    site_id: str,
    locations: pd.DataFrame,
) -> str:
    """Append an authorized collection location for configured holder types."""
    holder = normalize(key_holder)
    if holder.upper() not in {"HOLDER_A", "HOLDER_B"}:
        return holder or "-"

    required_column = "Customer Site ID"
    if required_column not in locations.columns:
        return holder

    matches = locations[
        locations[required_column].map(normalize).str.casefold() == site_id.casefold()
    ]
    if matches.empty:
        return holder

    location_column = {
        "HOLDER_A": "Holder A Collection Location",
        "HOLDER_B": "Holder B Collection Location",
    }[holder.upper()]

    if location_column not in matches.columns:
        return holder

    location = normalize(matches.iloc[0][location_column])
    return f"{holder} ({location})" if location else holder


def search_sites(
    requested_ids: list[str],
    status_data: pd.DataFrame,
    location_data: pd.DataFrame,
) -> list[dict[str, str]]:
    """Return all matching records, including explicit not-found results."""
    if status_data.empty:
        return []

    site_column = status_data.columns[0]
    results: list[dict[str, str]] = []

    for requested_id in requested_ids:
        matches = status_data[
            status_data[site_column].map(normalize).str.casefold()
            == requested_id.casefold()
        ]

        if matches.empty:
            results.append(
                {
                    "Site ID": requested_id,
                    "Key Status": "Not found",
                    "Key Holder": "-",
                    "Task Handler": "-",
                    "Collector Name": "-",
                    "Collector Contact": "-",
                }
            )
            continue

        for _, row in matches.iterrows():
            key_status = normalize(row.iloc[2]) if len(row) > 2 else "-"
            key_holder = row.iloc[3] if len(row) > 3 else ""
            show_collector = key_status.casefold() == PENDING_RETURN_STATUS.casefold()

            results.append(
                {
                    "Site ID": requested_id,
                    "Key Status": key_status or "-",
                    "Key Holder": enrich_key_holder(
                        key_holder, requested_id, location_data
                    ),
                    "Task Handler": normalize(row.iloc[4]) if len(row) > 4 else "-",
                    "Collector Name": (
                        normalize(row.iloc[6]) if show_collector and len(row) > 6 else "-"
                    ),
                    "Collector Contact": (
                        normalize(row.iloc[7]) if show_collector and len(row) > 7 else "-"
                    ),
                }
            )

    return results


def display_results(results: list[dict[str, str]]) -> None:
    if not results:
        print("No records to display.")
        return

    frame = pd.DataFrame(results)
    print("\nKEY STATUS CHECK RESULTS")
    print(frame.to_string(index=False))
    print(f"\nTotal records: {len(frame)}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("status_workbook", type=Path)
    parser.add_argument("location_workbook", type=Path)
    parser.add_argument(
        "site_ids",
        help="One or more comma-separated site IDs",
    )
    parser.add_argument(
        "--location-sheet",
        default="Site Rollout Plan",
        help="Location workbook sheet name",
    )
    args = parser.parse_args()

    requested_ids = [
        item.strip() for item in args.site_ids.split(",") if item.strip()
    ]
    status_data = load_workbook(args.status_workbook)
    location_data = load_workbook(args.location_workbook, args.location_sheet)
    display_results(search_sites(requested_ids, status_data, location_data))


if __name__ == "__main__":
    main()

