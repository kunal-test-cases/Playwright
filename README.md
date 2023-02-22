# Playwright

## 1. playwright inspector

`npx playwright test --debug testfile.spec.js`

[doc](https://playwright.dev/docs/debug#playwright-inspector "official doc for playwright inspector")

---

## 2. codegen

`npx playwright codegen http:google.com`

The above command will open a browser and a playwright inspector,
you can perform any activity in the browser and playwright will automatically generate a script in the playwright inspector for you.

[doc](https://playwright.dev/docs/codegen-intro "official doc for codegen")

---

## 3. Trace

```JSON
use: {
    trace: 'retain-on-failure',
  }
```

1. **'off'** - Do not record trace.
2. **'on'** - Record trace for each test.
3. **'retain-on-failure'** - Record trace for each test, but remove it from successful test runs.
4. **'on-first-retry'** - Record trace only when retrying a test for the first time.

`npx playwright test --trace on`

[doc1](https://playwright.dev/docs/trace-viewer-intro)

[doc2](https://playwright.dev/docs/trace-viewer)
