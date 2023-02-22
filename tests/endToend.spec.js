const { test, expect } = require("@playwright/test");

test("end to end test practice", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  // login
  await page.locator("input#userEmail").fill("kunal@sharklasers.com");
  await page.locator("input#userPassword").fill("Kunal@123");
  await page.locator("[value='Login']").click();

  // wait for network calls to happen for login
  await page.waitForLoadState("networkidle");

  // verify products section is present
  await page.locator("section#products").isVisible();

  const cardBody = page.locator(".card .card-body");

  for (const row of await cardBody.all()) {
    const title = await row.locator("h5 b").textContent();
    console.log(title);
    if (title === "zara coat 3") {
      //add to cart button
      await row.locator("button").last().click();
      break;
    }
  }

  // wait for network calls to happen for addtocart
  await page.waitForLoadState("networkidle");

  const cartBtn = await page.locator("button[routerlink='/dashboard/cart']");

  await Promise.all([page.waitForNavigation(), cartBtn.click()]);

  // verify my cart page
  expect(await page.locator("div.heading h1").textContent()).toEqual("My Cart");

  //verify item in cart
  const itemTitle = await page.locator("div.cartSection h3").textContent();

  if (itemTitle === "zara coat 3") {
    //click checkout button
    await page.locator(".totalRow button").click();
  }

  await page.getByText("CVV Code").locator("input").fill(123);
  await page.getByText("input[name='coupon']").fill(kunal);

  await page.pause();
});

test.only("end to end test original", async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("input#userEmail").fill(email);
  await page.locator("input#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("button[routerlink*='cart']").click();

  await page.locator(".cartWrap li.items").first().waitFor();
  const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page
    .locator("input[placeholder*='Country']")
    .type("ind", { delay: 100 });

  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();

  const btnCount = await dropDown.locator("button").count();

  for (let i = 0; i < btnCount; i++) {
    const btnText = await dropDown.locator("button").nth(i).textContent();
    if (btnText.trim() === "India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
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
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  page.pause();
});
