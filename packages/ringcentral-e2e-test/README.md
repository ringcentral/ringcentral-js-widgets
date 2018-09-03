# ringcentral-e2e-test

## Goal
* More easily code/read/maintain E2E testing
* High-quality reusable code
* High-performance
* Appropriate structure
* Progressive enhancement/plug-in modular

## Features
* Steps controller(Control process/Enhance steps)
* E2E test report
* Support CLI
* Compatible with selenium-webdriver(Maybe WebdriverIO)
----
* Serial perform case
* Auto-create test file with AC or test case
* Auto-modify ticket status from Jira

## Planning
- Infrastructure/Architecture
  * Test Runner
  * Steps Controller ✅
  * Driver(Puppeteer/WebdriverIO/Enzyme)
  * Helper Libs(Webphone/AccountManager/MockServer)
  * Plugins(Logger/Screenshot, etc.)
  * Infrastructure(Login/Account/Entry/Navigation/Others, etc.)
  * Test Results Collector

- Reporter
  * Data Receiver
  * RESTful API Server
  * Web App with Result List(Query/sorting/filtering)
  * Display Features(Chart/Layered List/Display Error)

- Command Line Interface
  * Process/Thread Management
  * Basics CLI Feature(Output Beautification/Version Management/Update/Helper)
  * Create Project
  * Create/Update/Search Cases
  * Testing Parameters Management

| controller                | config     | info           |
| ------------------------- | ---------- | -------------- |
| tags(title/level/target…) | runner     | help info      |
| path                      | driver     | error info     |
| env                       | tester     | verbose option |
| exclude                   | reporter   |                |
| worker                    | screenshot |                |
|                           | mock       |                |
|                           | mode       |                |

## Milestone
* Infrastructure／Architecture
* Foundation Steps
* Compatibility
* Enhancement

------

## Usage

```shell
git clone https://github.com/unadlib/ringcentral-js-widget.git
cd ringcentral-js-widget && git checkout e2e-test && yarn install && yarn bootstrap
cd packages/ringcentral-widgets-demo && yarn dev-server
```

```shell
cd packages/ringcentral-e2e-test
npx e2e-test run ./src/features/widgets/meeting/**/*.js
```


### Benchmark Results
| Drivers                         | cases | threads | sandbox | performance | stability |
| ------------------------------- | ----- | ------- | ------- | ----------- | --------- |
| puppeteer/Firefox/Chrome/Safari | 1600  | 1       |         | 1260.56s    | ✅         |
| puppeteer                       | 400   | 1       |         | 215.179s    | ✅         |
| puppeteer                       | 400   | 8       |         | 79.744s     | ✅         |
| puppeteer                       | 400   | 8       | ✅       | 230.122s    | ✅         |
| seleniumWebdriverChrome         | 400   |         |         | 80.129s     | ✅         |
| seleniumWebdriverFirefox        | 1200  | 8       |         | 428s        | ❌         |
| puppeteer/Firefox/Chrome        | 1200  | 8       |         | 505.122s    | ❌         |
| Safari                          | 400   | 8       |         | -           | ❌         |

### Subpackage

  ├── ringcentral-e2e-test

        ├── ringcentral-e2e-cli

              ├── ringcentral-e2e-environment

                    ├── ringcentral-e2e-drivers

        ├── ringcentral-e2e-reporter

### Configuration Relation

- Exec Config
  - User CLI config
  - User setting exec config
  - Library default exec config
- Cases Config
  - Cases setting config
  - User setting cases config
  - Library default cases config

### Lifecycle Hook

* CLI start
* Runner
* Jest
* Jest global setup
* Jest setupFiles
* Jest NodeEnvironment Setup
* setupTestFrameworkScriptFile
* Jest BeforeAll
* Jest BeforeEach
* Test case
* Steps Pre-Hook
* Steps Post-Hook
* Jest AfterEach
* Jest AfterAll
* Jest NodeEnvironment Teardown
* Jest global teardown
* CLI close