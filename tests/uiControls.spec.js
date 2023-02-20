const { test, expect } = require("@playwright/test");

test("Handling UI elements", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");

  const userName = page.locator("input#username");
  const password = page.locator("input#password");
  const signIn = page.locator("input#signInBtn");

  //select dropdown
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //select radio
  //await page.locator("radiotextsty").last().click();
  const radio = page.locator("input[type='radio'][value='user']");
  await radio.click();

  await page.locator("#okayBtn").click();

  //assert radio btn is checked.
  await expect(radio).toBeChecked();
  console.log(await radio.isChecked());

  //select checkbox
  const checkbox = page.locator("#terms");
  await checkbox.click();

  //assert checkbox is checked.
  await expect(checkbox).toBeChecked();
  console.log(await checkbox.isChecked());
  await checkbox.uncheck();
  expect(await checkbox.isChecked()).toBeFalsy();

  await page.pause();
});
