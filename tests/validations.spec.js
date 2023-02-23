const { test, expect } = require("@playwright/test");

test("browser forward and backward", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  await page.goto("http://google.com");

  //browser back button
  await page.goBack();

  //browser forward button
  await page.goForward();
});
