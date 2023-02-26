// request- it is used for api calls and grab the response.
const { test, expect } = require("@playwright/test");
const { ApiUtilsPractise } = require("./utils/ApiUtilsPractise");
const utils = new ApiUtilsPractise();

//execute only once before all the test cases.
test.beforeAll(async () => {
  //login
  const loginPayLoad = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000",
  };
  await utils.login(loginPayLoad);

  //2. order api
  const orderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }],
  };
  await utils.createOrder(orderPayload);
});

test("bypass login page by storing token into local storage", async ({
  page,
}) => {
  await utils.addTokenToLocalStorage(page);

  await page.goto("https://rahulshettyacademy.com/client/");
});

//Verify if order created is showing in history page
// Precondition - create order
test("Place the order", async ({ page }) => {
  await utils.addTokenToLocalStorage(page);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (utils.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(utils.orderId.includes(orderIdDetails)).toBeTruthy();
});
