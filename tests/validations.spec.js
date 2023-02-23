const { test, expect } = require("@playwright/test");

test("browser forward and backward", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  await page.goto("http://google.com");

  //browser back button
  await page.goBack();

  //browser forward button
  await page.goForward();
});

test("input element show/hide", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  expect(await page.locator("#displayed-text").isVisible()).toBeTruthy();
  await page.locator("#hide-textbox").click();
  expect(await page.locator("#displayed-text").isHidden()).toBeTruthy();

  await page.locator("#show-textbox").click();
  await expect(await page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(await page.locator("#displayed-text")).toBeHidden();
});