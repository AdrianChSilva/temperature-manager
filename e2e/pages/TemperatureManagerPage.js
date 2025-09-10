import { expect } from "@playwright/test";
import { TEST_DATA } from "../config/test-constants.js";

export class TemperatureManagerPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  get title() {
    return this.page.getByRole("heading", {
      name: TEST_DATA.UI.TITLES.APP_TITLE,
    });
  }

  get newGroupButton() {
    return this.page.getByRole("button", {
      name: TEST_DATA.UI.BUTTONS.NEW_GROUP,
    });
  }

  getGroupSection(groupName) {
    return new GroupSection(this.page, groupName);
  }

  getFirstGroupSection() {
    return new GroupSection(this.page, TEST_DATA.GROUPS.DEFAULT_FIRST);
  }

  getNewGroupModal() {
    return new NewGroupModal(this.page);
  }

  async openNewGroupModal() {
    await this.newGroupButton.click();
    return this.getNewGroupModal();
  }

  async verifyGroupExists(groupName) {
    const groupHeader = this.page.locator(
      TEST_DATA.UI.SELECTORS.GROUP_HEADER_TITLE,
      {
        hasText: groupName,
      }
    );
    await expect(groupHeader).toBeVisible();
    return groupHeader;
  }

  async verifyGroupDoesNotExist(groupName) {
    const groupHeader = this.page.locator(
      TEST_DATA.UI.SELECTORS.GROUP_HEADER_TITLE,
      {
        hasText: groupName,
      }
    );
    await expect(groupHeader).not.toBeVisible();
  }
}

export class GroupSection {
  constructor(page, groupName) {
    this.page = page;
    this.section = page.locator("section", {
      has: page.locator(TEST_DATA.UI.SELECTORS.GROUP_HEADER_TITLE, {
        hasText: groupName,
      }),
    });
  }

  get toggleButton() {
    return this.section.locator(TEST_DATA.UI.SELECTORS.GROUP_HEADER_TOGGLE);
  }

  get zonesContainer() {
    return this.section.locator(TEST_DATA.UI.SELECTORS.ZONES_GRID);
  }

  get renameButton() {
    return this.section.locator(
      `button[title="${TEST_DATA.UI.TITLES.RENAME}"]`
    );
  }

  get deleteButton() {
    return this.section.locator(
      `button[title="${TEST_DATA.UI.TITLES.DELETE}"]`
    );
  }

  get onButton() {
    return this.section.locator(TEST_DATA.UI.SELECTORS.CHIP_GHOST, {
      hasText: TEST_DATA.UI.BUTTONS.ON,
    });
  }

  get offButton() {
    return this.section.locator(TEST_DATA.UI.SELECTORS.CHIP_GHOST, {
      hasText: TEST_DATA.UI.BUTTONS.OFF,
    });
  }

  get zoneCards() {
    return this.section.locator(TEST_DATA.UI.SELECTORS.ZONE_CARD);
  }

  async verifyExpandedState() {
    await expect(this.toggleButton).toHaveAttribute("aria-expanded", "true");
    await expect(this.toggleButton).toHaveAttribute(
      "title",
      TEST_DATA.UI.TITLES.COLLAPSE
    );
    await expect(this.toggleButton).toHaveText(
      TEST_DATA.UI.STATES.EXPANDED_ICON
    );
    await expect(this.zonesContainer).toBeVisible();
  }

  async verifyCollapsedState() {
    await expect(this.toggleButton).toHaveAttribute("aria-expanded", "false");
    await expect(this.toggleButton).toHaveAttribute(
      "title",
      TEST_DATA.UI.TITLES.EXPAND
    );
    await expect(this.toggleButton).toHaveText(
      TEST_DATA.UI.STATES.COLLAPSED_ICON
    );
    await expect(this.zonesContainer).not.toBeAttached();
  }

  async collapse() {
    await this.toggleButton.click();
  }

  async expand() {
    await this.toggleButton.click();
  }

  async verifyControlsVisible() {
    await expect(this.renameButton).toBeVisible();
    await expect(this.deleteButton).toBeVisible();
    await expect(this.offButton).toBeVisible();
    await expect(this.onButton).toBeVisible();
  }

  async turnOnAllZones() {
    await this.onButton.click();
  }

  async turnOffAllZones() {
    await this.offButton.click();
  }

  async verifyAllZonesOn() {
    const cards = await this.zoneCards.all();
    for (const card of cards) {
      await expect(
        card.locator(TEST_DATA.UI.SELECTORS.ZONE_POWER_BUTTON)
      ).toHaveAttribute("aria-pressed", "true");
      await expect(card).not.toHaveClass(TEST_DATA.UI.STATES.STATE_OFF_CLASS);
    }
  }

  async verifyAllZonesOff() {
    const cards = await this.zoneCards.all();
    for (const card of cards) {
      await expect(
        card.locator(TEST_DATA.UI.SELECTORS.ZONE_POWER_BUTTON)
      ).toHaveAttribute("aria-pressed", "false");
      await expect(card).toHaveClass(TEST_DATA.UI.STATES.STATE_OFF_CLASS);
    }
  }

  async verifyZoneCount(expectedCount) {
    await expect(this.zoneCards).toHaveCount(expectedCount);
  }
}

export class NewGroupModal {
  constructor(page) {
    this.page = page;
  }

  get nameInput() {
    return this.page.locator(
      `input[aria-label="${TEST_DATA.UI.ARIA_LABELS.GROUP_NAME_INPUT}"]`
    );
  }

  get createButton() {
    return this.page.getByRole("button", { name: TEST_DATA.UI.BUTTONS.CREATE });
  }

  get cancelButton() {
    return this.page.getByRole("button", { name: TEST_DATA.UI.BUTTONS.CANCEL });
  }

  async verifyVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.createButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  async verifyNotVisible() {
    await expect(this.nameInput).not.toBeVisible();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async create() {
    await this.createButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async createGroup(name) {
    await this.fillName(name);
    await this.create();
  }
}
