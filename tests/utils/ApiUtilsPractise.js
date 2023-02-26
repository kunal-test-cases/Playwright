// request- it is used for api calls and grab the response.
const { expect, request } = require("@playwright/test");

export class ApiUtilsPractise {
  constructor() {
    this.token = null;
    this.orderId = null;
    this.apiContext = null;
  }

  async login(loginPayLoad) {
    this.apiContext = await request.newContext();

    //1. login api
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayLoad,
      }
    );

    //200/201
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson.token);
    this.token = loginResponseJson.token;
  }

  async addTokenToLocalStorage(page) {
    page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, this.token);
  }

  async createOrder(orderPayload) {
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: this.token,
          "Content-Type": "application/json",
        },
      }
    );
    //200/201
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    this.orderId = orderResponseJson.orders[0];
  }
}
