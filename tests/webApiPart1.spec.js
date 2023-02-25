// request- it is used for api calls and grab the response.
const { test, expect, request } = require("@playwright/test");
const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

//execute only once before all the test cases.
test.beforeAll(async () => {
  const apiContext = await request.newContext();
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
});
