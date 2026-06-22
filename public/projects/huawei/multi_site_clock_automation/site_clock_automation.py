"""Batch clock-in and clock-out automation for an authorized site portal.

Required environment variables:
    SITE_PORTAL_LOGIN_URL
    SITE_PORTAL_WORK_PERMIT_URL
    SITE_PORTAL_HISTORY_URL
    SITE_PORTAL_USERNAME
    SITE_PORTAL_PASSWORD
"""

from __future__ import annotations

import argparse
import os
import re
from dataclasses import dataclass
from datetime import date, timedelta

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait


@dataclass(frozen=True)
class PortalConfig:
    login_url: str
    permit_url: str
    history_url: str
    username: str
    password: str

    @classmethod
    def from_environment(cls) -> "PortalConfig":
        names = {
            "login_url": "SITE_PORTAL_LOGIN_URL",
            "permit_url": "SITE_PORTAL_WORK_PERMIT_URL",
            "history_url": "SITE_PORTAL_HISTORY_URL",
            "username": "SITE_PORTAL_USERNAME",
            "password": "SITE_PORTAL_PASSWORD",
        }
        values = {field: os.getenv(variable, "") for field, variable in names.items()}
        missing = [names[field] for field, value in values.items() if not value]
        if missing:
            raise RuntimeError(
                "Missing required environment variables: " + ", ".join(missing)
            )
        return cls(**values)


def parse_site_ids(raw_value: str) -> list[str]:
    """Normalize comma-, slash-, and whitespace-separated site IDs."""
    return [
        item.upper()
        for item in re.split(r"[,/\s]+", raw_value.strip())
        if item.strip()
    ]


class SitePortalAutomation:
    def __init__(self, config: PortalConfig, driver: webdriver.Chrome):
        self.config = config
        self.driver = driver
        self.wait = WebDriverWait(driver, 15)

    def login(self) -> None:
        self.driver.get(self.config.login_url)
        username = self.wait.until(
            EC.element_to_be_clickable((By.NAME, "username"))
        )
        password = self.driver.find_element(By.NAME, "password")
        username.send_keys(self.config.username)
        password.send_keys(self.config.password)
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        self.wait.until(lambda browser: browser.current_url != self.config.login_url)

    def get_permitted_sites(self, permit_number: str) -> dict[str, str]:
        self.driver.get(self.config.permit_url)
        search = self.wait.until(
            EC.element_to_be_clickable((By.ID, "permit-search"))
        )
        search.clear()
        search.send_keys(permit_number)
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        dropdown = self.wait.until(
            EC.presence_of_element_located((By.ID, "site-selector"))
        )
        permitted: dict[str, str] = {}
        for option in Select(dropdown).options[1:]:
            site_name = option.text.rsplit(" - ", maxsplit=1)[-1].strip().upper()
            if site_name and option.get_attribute("value"):
                permitted[site_name] = option.get_attribute("value")
        return permitted

    def clock_in(self, permit_number: str, requested_sites: list[str]) -> None:
        permitted = self.get_permitted_sites(permit_number)
        succeeded: list[str] = []
        failed: list[str] = []

        for site_id in requested_sites:
            site_path = permitted.get(site_id)
            if not site_path:
                failed.append(f"{site_id}: not listed in permit")
                continue

            try:
                self.driver.get(self.config.permit_url.rstrip("/") + "/" + site_path.lstrip("/"))
                start = self.wait.until(
                    EC.element_to_be_clickable((By.NAME, "start"))
                )
                start.click()
                self._accept_optional_alert()
                succeeded.append(site_id)
            except Exception as error:
                failed.append(f"{site_id}: {type(error).__name__}")

        self._print_summary("Clock-in", succeeded, failed)

    def find_open_sites(self, target_date: str) -> dict[str, str]:
        self.driver.get(self.config.history_url)
        rows = self.wait.until(
            EC.presence_of_all_elements_located(
                (By.CSS_SELECTOR, "table tbody tr")
            )
        )
        open_sites: dict[str, str] = {}

        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            if len(cells) < 6:
                continue
            date_in = cells[4].text.strip()
            date_out = cells[5].text.strip()
            if target_date in date_in and not date_out:
                link = cells[1].find_element(By.TAG_NAME, "a")
                open_sites[link.text.strip().upper()] = link.get_attribute("href")

        return open_sites

    def clock_out(self, target_date: str, requested_sites: list[str] | None) -> None:
        open_sites = self.find_open_sites(target_date)
        selected = requested_sites or sorted(open_sites)
        succeeded: list[str] = []
        failed: list[str] = []

        for site_id in selected:
            site_url = open_sites.get(site_id)
            if not site_url:
                failed.append(f"{site_id}: no open record found")
                continue

            try:
                self.driver.get(site_url)
                finish = self.wait.until(
                    EC.element_to_be_clickable((By.NAME, "finish"))
                )
                finish.click()
                self._accept_optional_alert()
                succeeded.append(site_id)
            except Exception as error:
                failed.append(f"{site_id}: {type(error).__name__}")

        self._print_summary("Clock-out", succeeded, failed)

    def _accept_optional_alert(self) -> None:
        try:
            WebDriverWait(self.driver, 3).until(EC.alert_is_present()).accept()
        except Exception:
            pass

    @staticmethod
    def _print_summary(action: str, succeeded: list[str], failed: list[str]) -> None:
        print(f"\n{action} summary")
        print(f"Succeeded: {len(succeeded)}")
        for site_id in succeeded:
            print(f"  OK  {site_id}")
        print(f"Failed: {len(failed)}")
        for message in failed:
            print(f"  ERR {message}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="action", required=True)

    clock_in_parser = subparsers.add_parser("clock-in")
    clock_in_parser.add_argument("permit_number")
    clock_in_parser.add_argument("sites", help="Comma/slash-separated site IDs")

    clock_out_parser = subparsers.add_parser("clock-out")
    clock_out_parser.add_argument(
        "--date",
        default=(date.today() - timedelta(days=1)).isoformat(),
    )
    clock_out_parser.add_argument(
        "--sites",
        help="Optional comma/slash-separated site IDs; defaults to all open sites",
    )

    args = parser.parse_args()
    config = PortalConfig.from_environment()
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)

    try:
        automation = SitePortalAutomation(config, driver)
        automation.login()
        if args.action == "clock-in":
            automation.clock_in(args.permit_number, parse_site_ids(args.sites))
        else:
            selected_sites = parse_site_ids(args.sites) if args.sites else None
            automation.clock_out(args.date, selected_sites)
    finally:
        driver.quit()


if __name__ == "__main__":
    main()

