const { test, expect } = require("@playwright/test");

test("register user", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  //assert page title
  await expect(page).toHaveTitle("Let's Shop");

  //assert is login page?
  const loginPageTitle = page.locator("h1.login-title");
  await expect(loginPageTitle).toHaveText("Log in");

  await page.locator("a.text-reset").click();

  //assert is register page?
  const registerPageTitle = page.locator("h1.login-title");
  await expect(registerPageTitle).toHaveText("Register");

  const firstName = page.locator("input#firstName");
  const lastName = page.locator("input#lastName");
  const userEmail = page.locator("input#userEmail");
  const userMobile = page.locator("input#userMobile");
  const userPassword = page.locator("input#userPassword");
  const confirmPassword = page.locator("input#confirmPassword");
  const register = page.locator("input#login");

  await firstName.type("kunal"); // use fill OR type
  await lastName.type("pardeshi");
  await userEmail.type("kunal@sharklasers.com");
  await userMobile.type("1234567890");
  await userPassword.type("Kunal@123");
  await confirmPassword.type("Kunal@123");

  const occupation = page.locator("select.custom-select");
  await occupation.selectOption({ label: "Engineer" });

  await page.getByLabel("Male", { exact: true }).check();

  await page.getByRole("checkbox").setChecked(true);

  await expect(await register.inputValue()).toBe("Register");

  await register.click();
});
