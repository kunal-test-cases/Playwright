const { test } = require("@playwright/test");

test("browser context playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/locatorspractice/");
});

test("page playwright test", async ({ page }) => {
  await page.goto("https://google.com/");
});

//Playwright will run below test only and skip all the remaining tests in this file.
test.only("page playwright test only", async ({ page }) => {
  await page.goto("https://google.com/");
});
