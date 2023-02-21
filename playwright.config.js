// @ts-check
const { devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  /* test case directory */
  testDir: "./tests",

  /* maximum time one test can run for before reporting failure. */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },

  /* tests result report output to */
  reporter: "html",

  use: {
    browserName: "chromium",
    // browserName: "firefox",
    // browserName: "webkit",
    // headless: true,
    // screenshot: "on",
    // trace: "on",
  },
};

module.exports = config;
