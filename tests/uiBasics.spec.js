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

test("extract error text", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("input#username");
  const password = page.locator("input#password");
  const signIn = page.locator("input#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await userName.type("kunal");
  await password.type("12345");
  await signIn.click();

  console.log(await page.locator("[style*=block]").textContent());
  await expect(page.locator("[style*=block]")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
});

test.only("extract multiple web elements", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("input#username");
  const password = page.locator("input#password");
  const signIn = page.locator("input#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await userName.type("kunal");
  await password.type("12345");
  await signIn.click();

  console.log(await page.locator("[style*=block]").textContent());
  await expect(page.locator("[style*=block]")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
  await signIn.click();

  console.log(await cardTitles.allTextContents());
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.allTextContents());
});
