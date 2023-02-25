// request- it is used for api calls and grab the response.
const { test, expect, request } = require("@playwright/test");
const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }],
};

let token = null;
let orderId = null;

//execute only once before all the test cases.
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  //1. login api
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad,
    }
  );

  //200/201
  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  console.log(loginResponseJson.token);
  token = loginResponseJson.token;

  //2. order api
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  //200/201
  expect(orderResponse.ok()).toBeTruthy();
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test("bypass login page by storing token into local storage", async ({
  page,
}) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
});

//Verify if order created is showing in history page
// Precondition - create order
test("Place the order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
