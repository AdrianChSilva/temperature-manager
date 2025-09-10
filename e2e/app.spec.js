import { test, expect } from "./fixtures/test-fixtures.js";
import { TEST_DATA } from "./config/test-constants.js";

test.describe("Temperature Manager App E2E", () => {
  test.beforeEach(async ({ temperatureManagerPage }) => {
    await temperatureManagerPage.goto();
    await expect(temperatureManagerPage.title).toBeVisible();
  });

  test("group expansion and collapse functionality", async ({
    temperatureManagerPage,
  }) => {
    const groupSection = temperatureManagerPage.getFirstGroupSection();

    await groupSection.verifyExpandedState();
    await groupSection.collapse();
    await groupSection.verifyCollapsedState();
    await groupSection.expand();
    await groupSection.verifyExpandedState();
  });

  test("create new group flow", async ({ temperatureManagerPage }) => {
    const modal = await temperatureManagerPage.openNewGroupModal();

    await modal.verifyVisible();
    await modal.createGroup(TEST_DATA.GROUPS.TEST_GROUP);
    await temperatureManagerPage.verifyGroupExists(TEST_DATA.GROUPS.TEST_GROUP);
    await modal.verifyNotVisible();

    const newGroupSection = temperatureManagerPage.getGroupSection(
      TEST_DATA.GROUPS.TEST_GROUP
    );
    await newGroupSection.verifyControlsVisible();
  });

  test("cancel new group creation", async ({ temperatureManagerPage }) => {
    const modal = await temperatureManagerPage.openNewGroupModal();
    await modal.fillName(TEST_DATA.GROUPS.CANCELLED_GROUP);
    await modal.cancel();
    await modal.verifyNotVisible();
    await temperatureManagerPage.verifyGroupDoesNotExist(
      TEST_DATA.GROUPS.CANCELLED_GROUP
    );
  });

  test("group power control functionality", async ({
    temperatureManagerPage,
  }) => {
    const groupSection = temperatureManagerPage.getFirstGroupSection();

    await groupSection.verifyZoneCount(
      TEST_DATA.ZONES.EXPECTED_COUNT_FIRST_GROUP
    ); // Salón y Dormitorio

    await groupSection.turnOnAllZones();
    await groupSection.verifyAllZonesOn();
    await groupSection.turnOffAllZones();
    await groupSection.verifyAllZonesOff();
  });
});
