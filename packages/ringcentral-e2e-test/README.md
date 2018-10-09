# ringcentral-e2e-test

`ringcentral-e2e-test` is RingCentral integration Apps test project. It's based on `ringcentral-test-cli` and `marten`.

-   `ringcentral-test-cli` is a complex of E2E test framework, it's based on `jest` as test runner.
-   `marten` is a steps controller library.

We are committed to designing a more efficient testing framework that is used to implement the more easily code/read/maintain E2E testing project with high-quality reusable code. Of course, it better be high-performance. In appropriate structure, it should be progressive enhancement/plug-in modular.

### Contents

-   [Features](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#features)
-   [Installation](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#Installation)
-   [Getting Started](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#getting-started)
-   [Guide For RC Integration App](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#guide-for-rc-integration-app)
-   [APIs Reference](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#api-reference)
    -   [Test CLI](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#test-cli)
    -   [Project Config](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#project-config)
    -   [Test Drivers](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#test-drivers)
    -   [Test Hooks](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#test-hooks)
-   [How It Works](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#how-it-works)
-   [Change Log](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#change-log)

### Features

-   **Compatible Test**
-   **Controllable Process**
-   **Stratified Test**
-   **Progressive Modular**

### Installation

TODO

### Getting Started

1. Check to make sure the `lerna` npm package installation.if not, install lerna in the node Global environment; if learn has been installed, skip to next step.

```shell
npm install -g lerna
```

2. Clone current repo and start example from widget demo.

```shell
git clone https://github.com/unadlib/ringcentral-js-widget.git
cd ringcentral-js-widget && git checkout e2e-test && lerna bootstrap
```

> NOTE: set demo config file in `./packages/ringcentral-widgets-demo/dev-server/api-config.js`.

```shell
cd packages/ringcentral-widgets-demo && yarn dev-server
```

3. Run a test file.

```shell
cd <repo>/packages/ringcentral-e2e-test
npx e2e-test run ./src/features/commons/call/Dialer.spec.js --drivers puppeteer
```

> `webphone-client` in RC private internal package.</br>
> Using safari note: it needs enable Remote Automation.

**NOTE: If you want to try to write some test cases from the RC widget demo, you can keep on the following [next steps](https://github.com/unadlib/ringcentral-js-widget/tree/e2e-test/packages/ringcentral-e2e-test#guide-for-rc-integration-app).**

### Guide For RC Integration App

TODO

#### Run RC for GoogleChrome Test Case

1. Generate RC for Google Chrome with brand rc, copy files to `<repo>/packages/ringcentral-e2e-test/resources/extension/google/rc`.

2. Run example test case.

```shell
cd <repo>/packages/ringcentral-e2e-test
npx e2e-test run ./src/features/google/call/Dialer.spec.js --drivers puppeteer -S
```

> NOTE: Chrome Extension for puppeteer must be `sandbox` mode.

### APIs Reference

#### Test CLI

| Reference | Description                                   | type   | default |
| --------- | --------------------------------------------- | ------ | ------- |
| --params  | Run E2E test case with some params filtering. | object | None    |
| --sandbox | Run E2E test case with 'sandbox' mode.        |        | disable |

TODO

#### Project Config

| Reference    | Description                                     | type     |
| ------------ | ----------------------------------------------- | -------- |
| lookupConfig | Look up executive config from this config file. | function |
| params       | Setting project basic information.              | object   |

TODO

#### Test Drivers

##### Driver APIs

| Reference     | Description                                       | arguments                 |
| ------------- | ------------------------------------------------- | --------------------------|
| goto          | Current page goto a new page with a url.          | (config)                  |
| clear         | Clear the value of this element.                  | (selector, options)       |
| newPage       | Create a new page in a default browser context.   | ()                        |
| closePage     | Closes the current window.                        | ()                        |

TODO

##### Query APIs

| Reference     | Description                                       | arguments                 |
| ------------- | ------------------------------------------------- | ------------------------- |
| getText       | Get text from a selector.                         | (selector[, options])     |
| goto          | Current page goto a new page with a url.          | (config)                  |
| click         | left-click with the mouse.                        |(selector, options)        |
| type          | Enter a value on the selector.                    |(selector, value, options) |
|waitForSelector| Wait for the selector to appear in page.          |(selector, options)        |
|waitForFrames  | Wait for the iframes to appear in page and return |                           |
|               | a frame.                                          |(frameIds)                 |
|screenshot     | Takes a screenshot of the current page.           |(path)                     |  
|execute        | Executes JavaScript in the context of the         |                           |
|               | currently selectedframe or window.                |(...args)                  |

TODO

#### Test Hooks

| Reference           | Description           | callback arguments |
| ------------------- | --------------------- | ------------------ |
| driver.addAfterHook | After each case ends. | -                  |

TODO

### Benchmark Results

| Drivers                             | cases | threads | sandbox | performance | stability |
| ----------------------------------- | ----- | ------- | ------- | ----------- | --------- |
| **puppeteer/Firefox/Chrome/Safari** | 1600  | 1       |         | 1312.125s   | ✅        |
| **puppeteer**                       | 400   | 8       |         | 96.44s      | ✅        |
| puppeteer                           | 400   | 1       |         | 237.614s    | ✅        |
| puppeteer                           | 400   | 8       | ✅      | 289.44s     | ✅        |
| Chrome                              | 400   | 8       |         | 103.665s    | ✅        |
| Firefox                             | 400   | 8       |         | 415.726s    | ✅        |
| puppeteer/Firefox/Chrome            | 1200  | 8       |         | 630.503s    | ⚠️        |
| Safari                              | 400   | 8       |         | -           | ❌        |
| Enzyme                              | 400   | 1       | ✅      | 374.998s    | ✅        |
| **Enzyme**                          | 400   | 8       | ✅      | 149.882s    | ✅        |
| Enzyme                              | 400   | 1       |         | -           | ❌        |

> `Chrome` is selenium webdriver's Chrome.</br>
> Selenium webdriver multithreading operation is not stable.</br>
> Selenium Webdriver Safari does not support multithreading.</br>
> Enzyme does not support non-sandbox mode(Default forced sandbox mode).

### How It Works

<img src='https://raw.githubusercontent.com/unadlib/ringcentral-js-widget/e2e-test/packages/ringcentral-e2e-test/assets/flow.png' />

### Change Log

-   2018/9/14 Implement infrastructure & architecture.
