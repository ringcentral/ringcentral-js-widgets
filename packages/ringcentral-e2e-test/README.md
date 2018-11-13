# ringcentral-e2e-test

`ringcentral-e2e-test` is RingCentral integration Apps test project. It's based on `ringcentral-test-cli` and `marten`.

-   `ringcentral-test-cli` is a complex of E2E test framework, it's based on `jest` as test runner.
-   `marten` is a steps controller library.

We are committed to designing a more efficient testing framework that is used to implement the more easily code/read/maintain E2E testing project with high-quality reusable code. Of course, it better be high-performance. In appropriate structure, it should be progressive enhancement/plug-in modular.

### Contents

-   [Features](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#features)
-   [Installation](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#Installation)
-   [Getting Started](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#getting-started)
-   [Guideline](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#guideline)
-   [Guide For RC Integration App](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#guide-for-rc-integration-app)
-   [APIs Reference](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#api-reference)
    -   [Test CLI](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#test-cli)
    -   [Project Config](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#project-config)
    -   [Test Drivers](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#test-drivers)
    -   [Test Hooks](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#test-hooks)
-   [How It Works](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#how-it-works)
-   [Change Log](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#change-log)

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
git clone https://github.com/ringcentral/ringcentral-js-widgets.git
cd ringcentral-js-widgets && git checkout e2e-test && yarn &&lerna bootstrap
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

**NOTE: If you want to try to write some test cases from the RC widget demo, you can keep on the following [next steps](https://github.com/ringcentral/ringcentral-js-widgets/tree/e2e-discusstion/packages/ringcentral-e2e-test#guide-for-rc-integration-app).**

### Guideline

* You should strictly follow the test case steps and expectations to achieve the testing code, there are any changes to the case need to communicate with the design case personnel, and in the corresponding case clearly comment.
* Case design and review need to be rigorous, to ensure that according to the case is fully able to perform correctly, do not omit any steps (even if the obvious steps can not be omitted).

#### Catalog structure

* Features: Strictly in accordance with the Einstein directory structure, to Einstein case ID + case title as the file name.
* Steps: Only steps specific to each project are placed in their respective project directories, and the step used by more than 2 projects needs to be placed in the Commons folder.

#### Naming rules

* Folder name with nouns, so that reviewers can see what features this folder is used for a glance.
* File name as far as possible with verbs, steps are generally used for execution, it is used in case, in the lookup at will be easier to read.

#### Coding Test

* Create the feature file first (manually created before the CLI create case from Einstein implementation).
* It is best to define the required process first steps first, and then to gradually implement each step.
* If it is a case in which a number of steps are executed in process a simple loop, then marten interfaces such as `reset` `skip` `execTo` can be used.
* In addition, if a case is a complex process, consider using multiple processes for serial execution.
* Don't use the native driver APIs, if necessary, you can encapsulate it yourself in drivers lib and consider or implement other driver identical APIs at the same time.
* DOM node positioning is `data-sign`(`@` for label selector), do not use other Css/xpath and other selector.
* Use only `$`(it's a global variable) as an interface in step writing.
* If a step is a dynamic parameter requirement, you can use a higher-order function.
* At the project maturity stage, do not call the JS function or parameter of the test page directly if it is not necessary, if you must write attention to comment `TODO`.
* Consider the required support for each driver compatibility whenever possible.
* Case note in the public part the generalization of step.

### Guide For RC Integration App
description:

>1. User has logged into Salesforce.
>2. User has logged into RC CTI app.
>3. User go to setting and set up the Make my calls with my ringcentral phone.

1. Write a Minimum steps,this steps is setting process include go to setting and set up the Make my calls with my ringcentral phone.

`settingRCPhone.js`
```js
export default class SettingMyRCPhone {
  //go to setting
  static async enterSettings() {
    await $(app).waitFor(1000);
    await $(app).waitForSelector('[title="More Menu"]');
    await $(app).click('[title="More Menu"]');
    await $(app).waitForSelector('[title="Settings"]');
    await $(app).click('[title="Settings"]');
    await $(app).waitFor(1000);
  }
  //set up the Make my calls with my ringcentral phone.
  static async settingMyRCPhone() {
    await $(app).click('#viewport > div > div > div > div > div > div.node_modules-ringcentral-widgets-components-SettingsPanel-_styles_root_1Eq2f > div > a:nth-child(1) > div > div > div.node_modules-ringcentral-widgets-components-IconField-_styles_content_2rExK')
    const DropdownSelectText = await $(app).getText('[class*="DropdownSelect"]');
    if (DropdownSelectText.trim() !== 'My RingCentral Phone') {
      await $(app).click('[class*="DropdownSelect"]');
      await $(app).click('[title="My RingCentral Phone"]');
      await $(app).click('[class*=SaveButton]');
      await $(app).waitForSelector('[class*="AlertDisplay"]');
      await $(app).execute('phone.alert.dismissAll');
      await $(app).waitFor(1000);
    }
  }
  static get steps() {
    return [
      this.enterSettings,
      this.settingMyRCPhone,
    ];
  }
}
```
NOTE: If use marten must have a function is steps.

2. write a test case
`stepsDemo.js`
```js
import { createProcess } from 'marten';
import { LoginCTI } from '../src/steps/salesforce/login';
import NavigateTo from '../src/steps/salesforce/navigateTo';
import Entry from '../src/steps/entry';
import SettingMyRCPhone from '../src/steps/salesforce/settingMyRCPhone'
import Logout from '../steps/salesforce/logout'

describe('Test Demo: =====>', () => {
  test({
    title: 'setting My RC Phone',
    tags: [
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { accounts: ['SF_RC_US']},
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      LoginCTI,
      NavigateTo,
      SettingMyRCPhone,
      Logout,
    )(context);
      await process.execTo(SettingMyRCPhone);
      context.driver.addAfterHook(async () => {
        await process.exec(Logout);
      });
      const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
      expect(RCPhone.trim()).toBe('My RingCentral Phone');
  });
});
```
NOTE:
    title: test case title
    tags:  This tags is similar to the name of your app, include widgets,salesforce,google，office.
    levels: Priority
    options: an open reference, you can set up account Tag...
    function:createProces: https://github.com/unadlib/marten#function-createprocess
    the peocess description:
        Entry: User has logged into Salesforce..
        Login,NavigateTo: User has logged into RC CTI app.
        SettingMyRCPhone: User go to setting and set up the Make my calls with my ringcentral phone.
    expect: https://jestjs.io/docs/en/expect

3. Run test case
```shell
cd <repo>/packages/ringcentral-e2e-test
npx e2e-test run ./src/features/salesforce/demo/stepsDemo.js --drivers puppeteer
```

#### Setting `loginInfo.js`

set `loginInfo.js`.

```javascript
module.exports = {
  office: {
    username: '',
    password: ''
  },
  salesforce: {
    username: '',
    password: ''
  },
  caseServices: { // such as username and password of Einstein
    username: '',
    password: ''
  }
};
```

use it in `e2e.config.js`.

```javascript
loginInfo.salesforce || {}
```

#### Run RC for GoogleChrome Test Case

1. Generate RC for Google Chrome with brand rc, copy files to `<repo>/packages/ringcentral-e2e-test/resources/extension/google/rc`.

2. Run example test case.

```shell
cd <repo>/packages/ringcentral-e2e-test
npx e2e-test run ./src/features/google/call/Dialer.spec.js --drivers puppeteer -S
```

#### Run RC for O365 Test Case

1. Generate RC for Office with brand rc, copy files to
`<repo>/packages/ringcentral-e2e-test/resources/extension/google/rc`.

2. Run example test case.

```shell
cd <repo>/packages/ringcentral-e2e-test
npx e2e-test run ./src/features/Office365/*.spec.js --drivers puppeteer -S
```

> NOTE: Chrome Extension for puppeteer must be `sandbox` mode.

### Selector

Using `data-sign` in `e2e.config.js`.

```javascript
{
  selectorLabel: 'data-sign',
}
```

* Readability label information within a project (two-three words or less)
* Within a non-project, you can use CSS selector.
* When compiling the production, remove the label.

#### Selector Example

**label Selector use `@` beginning. It supports for parent-child selector.**
**label Selector use `:` for child DOM node with index.**

* label selector

```javascrpt
<a data-sign="foobar">
</a>
```

```javascrpt
$(app).click('@foobar');
```

* parent-child label selector and using index select child.

```javascrpt
<div data-sign="foo">
  <div>
    <a data-sign="bar"></a>
  </div>
  <div>
    <a data-sign="bar"></a>
  </div>
</div>
<div data-sign="foo">
  <div>
    <a data-sign="bar"></a>
  </div>
  <div>
    <a data-sign="bar">select this</a>
  </div>
</div>
```

```javascrpt
$(app).click('@foo:2 bar:-1');
```

### APIs Reference

#### Test CLI

| Reference  | Description                                   | type   | default |
| ---------- | --------------------------------------------- | ------ | ------- |
| --params   | Run E2E test case with some params filtering. | object | None    |
| --sandbox  | Run E2E test case with 'sandbox' mode.        |        | disable |
| --headless | Run E2E test case with 'headless' mode.       |        | disable |
| --exclude  | Run E2E test case exclude some files.         |        | disable |
| --verbose  | Run E2E test case with verbose log.           |        | false   |


TODO

#### Project Config

| Reference    | Description                                     | type     |
| ------------ | ----------------------------------------------- | -------- |
| lookupConfig | Look up executive config from this config file. | function |
| params       | Setting project basic information.              | object   |


#### Test Drivers

##### Driver APIs

| Reference | Description                                     | arguments           |
| --------- | ----------------------------------------------- | ------------------- |
| goto      | Current page goto a new page with a url.        | (config)            |
| clear     | Clear the value of this element.                | (selector, options) |
| newPage   | Create a new page in a default browser context. | ()                  |
| closePage | Closes the current window.                      | ()                  |

##### Query APIs

| Reference       | Description                                                | arguments                  |
| --------------- | ---------------------------------------------------------- | -------------------------- |
| getText         | Get text from a selector.                                  | (selector[, options])      |
| goto            | Current page goto a new page with a url.                   | (config)                   |
| click           | left-click with the mouse.                                 | (selector, options)        |
| type            | Enter a value on the selector.                             | (selector, value, options) |
| waitForSelector | Wait for the selector to appear in page.                   | (selector, options)        |
| waitForFrames   | Wait for the iframes to appear in page and return a frame. | (frameSelector)            |
| screenshot      | Takes a screenshot of the current page.                    | (path)                     |
| execute         | Executes JavaScript in sandbox env.                        | (...args)                  |

#### Test Hooks

| Reference           | Description           | callback arguments |
| ------------------- | --------------------- | ------------------ |
| driver.addAfterHook | After each case ends. | -                  |

example:
```js
context.driver.addAfterHook(async () => {
  await process.exec(Logout);
});
```
TODO

### ENV

1.Default case account environment setting using `e2e.config.js`.

```javascript
{
  envs: ['xmnup'],
}
```

#### Account Type

1.Default case account type setting using `e2e.config.js`.

```javascript
{
  accounts: ['CM_RC_US'],
}
```

2.Using account setting on test case.

```javascript
{
  title: 'Login with username',
  tags: [
    ['widgets', { accounts: ['CM_RC_CA'] }],
  ],
  accounts: ['CM_RC_US']
  options: [
    { username: '+18552085709*103', password: 'Test!123', callingType: 'myRCPhone', accounts: ['CM_RC_EU', 'CM_RC_UK'], },
  ],
}
```

3.Using `Login` step.

```javascript
Login({ username: '+18552085709*103', password: 'Test!123' })
```

Note:
Login user priority: `options` username/password > `Login` parameters > `tags` accounts > `accounts` > default in `e2e.config.js`

### Benchmark Results

| Drivers                             | cases | threads | sandbox | performance | stability |
| ----------------------------------- | ----- | ------- | ------- | ----------- | --------- |
| **puppeteer/Firefox/Chrome/Safari** | 1600  | 1       |         | 1312.125s   | ✅         |
| **puppeteer**                       | 400   | 8       |         | 96.44s      | ✅         |
| puppeteer                           | 400   | 1       |         | 237.614s    | ✅         |
| puppeteer                           | 400   | 8       | ✅       | 289.44s     | ✅         |
| Chrome                              | 400   | 8       |         | 103.665s    | ✅         |
| Firefox                             | 400   | 8       |         | 415.726s    | ✅         |
| puppeteer/Firefox/Chrome            | 1200  | 8       |         | 630.503s    | ⚠️        |
| Safari                              | 400   | 8       |         | -           | ❌         |
| Enzyme                              | 400   | 1       | ✅       | 374.998s    | ✅         |
| **Enzyme**                          | 400   | 8       | ✅       | 149.882s    | ✅         |
| Enzyme                              | 400   | 1       |         | -           | ❌         |

> `Chrome` is selenium webdriver's Chrome.</br>
> Selenium webdriver multithreading operation is not stable.</br>
> Selenium Webdriver Safari does not support multithreading.</br>
> Enzyme does not support non-sandbox mode(Default forced sandbox mode).

### How It Works

<img src='https://raw.githubusercontent.com/unadlib/ringcentral-js-widget/e2e-test/packages/ringcentral-e2e-test/assets/flow.png' />

### Change Log

-   2018/9/14 Implement infrastructure & architecture.
