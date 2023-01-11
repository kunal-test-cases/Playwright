const { test, expect } = require("@playwright/test");

test("browser context playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/locatorspractice/");
});

test("page playwright test", async ({ page }) => {
  await page.goto("https://google.com/");
});

//Playwright will run below test only and skip all the remaining tests in this file.
test("page playwright test only", async ({ page }) => {
  await page.goto("https://google.com/");

  //assert page title
  await expect(page).toHaveTitle("Google");
});

test("type into input elements using page locators", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/locatorspractice/");
  await page.locator("input#inputUsername").type("kunal");
  await page.locator("[name='inputPassword']").type("12345");
  await page.locator("button.signInBtn").click();
});

test.only("extract error text", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("input#username").type("kunal");
  await page.locator("input#password").type("12345");
  await page.locator("input#signInBtn").click();
  console.log(await page.locator("[style*=block]").textContent());
  await expect(page.locator("[style*=block]")).toContainText("Incorrect");
});
