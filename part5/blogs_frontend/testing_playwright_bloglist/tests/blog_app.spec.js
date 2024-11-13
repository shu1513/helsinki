const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });
  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
  });
});
