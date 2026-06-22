"""Submit batches of identifiers through an authorized request form.

The endpoint is supplied through EMAIL_REQUEST_FORM_URL. Authentication remains
manual so credentials and multi-factor authentication are never handled by the
script.
"""

from __future__ import annotations

import argparse
import os
import re
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def load_identifiers(path: Path) -> list[str]:
    """Load unique, non-empty identifiers while preserving input order."""
    seen: set[str] = set()
    identifiers: list[str] = []

    for line in path.read_text(encoding="utf-8").splitlines():
        identifier = line.strip()
        if identifier and identifier not in seen:
            identifiers.append(identifier)
            seen.add(identifier)

    return identifiers


def safe_filename(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]", "_", value)


def submit_requests(
    driver: webdriver.Chrome,
    form_url: str,
    identifiers: list[str],
    request_format: str,
    screenshot_directory: Path,
) -> None:
    wait = WebDriverWait(driver, 20)
    screenshot_directory.mkdir(parents=True, exist_ok=True)
    succeeded = 0
    failures: list[str] = []

    for index, identifier in enumerate(identifiers, start=1):
        print(f"[{index}/{len(identifiers)}] Processing {identifier}")
        try:
            driver.get(form_url)
            identifier_input = wait.until(
                EC.element_to_be_clickable((By.ID, "identifier"))
            )
            identifier_input.clear()
            identifier_input.send_keys(identifier)

            format_dropdown = wait.until(
                EC.element_to_be_clickable((By.ID, "request-format"))
            )
            format_dropdown.click()
            option = wait.until(
                EC.element_to_be_clickable(
                    (
                        By.XPATH,
                        f"//*[@role='option' and normalize-space()='{request_format}']",
                    )
                )
            )
            option.click()

            wait.until(EC.element_to_be_clickable((By.ID, "submit"))).click()
            wait.until(
                EC.any_of(
                    EC.presence_of_element_located((By.CLASS_NAME, "success-message")),
                    EC.url_changes(form_url),
                )
            )
            succeeded += 1
        except Exception as error:
            failures.append(f"{identifier}: {type(error).__name__}")
            screenshot = screenshot_directory / f"error_{safe_filename(identifier)}.png"
            driver.save_screenshot(str(screenshot))

    print(f"\nSucceeded: {succeeded}/{len(identifiers)}")
    print(f"Failed: {len(failures)}")
    for failure in failures:
        print(f"  {failure}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_file", type=Path, help="One identifier per line")
    parser.add_argument("--format", default="TEST", dest="request_format")
    parser.add_argument(
        "--screenshots",
        type=Path,
        default=Path("diagnostic_screenshots"),
    )
    args = parser.parse_args()

    form_url = os.getenv("EMAIL_REQUEST_FORM_URL")
    if not form_url:
        raise RuntimeError("Set EMAIL_REQUEST_FORM_URL before running the script.")

    identifiers = load_identifiers(args.input_file)
    if not identifiers:
        raise RuntimeError("No identifiers were found in the input file.")

    driver = webdriver.Chrome()
    driver.maximize_window()
    try:
        driver.get(form_url)
        input(
            "Complete the authorized login in the browser, open the request form, "
            "then press Enter to continue..."
        )
        submit_requests(
            driver,
            form_url,
            identifiers,
            args.request_format,
            args.screenshots,
        )
    finally:
        driver.quit()


if __name__ == "__main__":
    main()

