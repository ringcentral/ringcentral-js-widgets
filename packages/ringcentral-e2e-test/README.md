# ringcentral-e2e-test

## Goal

-   More easily code/read/maintain E2E testing
-   High-quality reusable code
-   High-performance
-   Appropriate structure
-   Progressive enhancement/plug-in modular

## Features

-   Steps controller(Control process/Enhance steps)
-   E2E test report
-   Support CLI
-   Compatible with selenium-webdriver(Maybe WebdriverIO)

---

-   Serial perform case
-   Auto-create test file with AC or test case
-   Auto-modify ticket status from Jira

## Planning

-   Infrastructure/Architecture

    -   Test Runner
    -   Steps Controller ✅
    -   Driver(Puppeteer/WebdriverIO/Enzyme)
    -   Helper Libs(Webphone/AccountManager/MockServer)
    -   Plugins(Logger/Screenshot, etc.)
    -   Infrastructure(Login/Account/Entry/Navigation/Others, etc.)
    -   Test Results Collector

-   Reporter

    -   Data Receiver
    -   RESTful API Server
    -   Web App with Result List(Query/sorting/filtering)
    -   Display Features(Chart/Layered List/Display Error)

-   Command Line Interface
    -   Process/Thread Management
    -   Basics CLI Feature(Output Beautification/Version Management/Update/Helper)
    -   Create Project
    -   Create/Update/Search Cases
    -   Testing Parameters Management

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

-   Infrastructure／Architecture
-   Foundation Steps
-   Compatibility
-   Enhancement

---

## Usage

```shell
git clone https://github.com/unadlib/ringcentral-js-widget.git
cd ringcentral-js-widget && git checkout e2e-test && lerna bootstrap
cd packages/ringcentral-widgets-demo && yarn dev-server
```

> set demo config file in `./packages/ringcentral-widgets-demo/dev-server/api-config.js`
> set e2e config file in `./packages/ringcentral-e2e-test/e2e.config.js`

```shell
cd packages/ringcentral-e2e-test
npx e2e-test run ./src/features/widgets/meeting/**/*.js
```

### Benchmark Results

| Drivers                         | cases | threads | sandbox | performance | stability |
| ------------------------------- | ----- | ------- | ------- | ----------- | --------- |
| puppeteer/Firefox/Chrome/Safari | 1600  | 1       |         | 1312.125s   | ✅         |
| puppeteer                       | 400   | 1       |         | 237.614s    | ✅         |
| puppeteer                       | 400   | 8       |         | 96.44s      | ✅         |
| puppeteer                       | 400   | 8       | ✅       | 289.44s     | ✅         |
| Chrome                          | 400   | 8       |         | 103.665s    | ✅         |
| Firefox                         | 400   | 8       |         | 415.726s    | ✅         |
| puppeteer/Firefox/Chrome        | 1200  | 8       |         | 630.503s    | ⚠️        |
| Safari                          | 400   | 8       |         | -           | ❌         |
| Enzyme                          | 400   | 1       | ✅       | 374.998s    | ✅         |
| Enzyme                          | 400   | 8       | ✅       | 149.882s    | ✅         |
| Enzyme                          | 400   | 1       |         | -           | ❌         |

### Subpackage

├── ringcentral-e2e-test

        ├── ringcentral-e2e-cli

              ├── ringcentral-e2e-environment

                    ├── ringcentral-e2e-drivers

        ├── ringcentral-e2e-reporter

### Configuration Relation

-   Exec Config
    -   User CLI config
    -   User setting exec config
    -   Library default exec config
-   Cases Config
    -   Cases setting config
    -   User setting cases config
    -   Library default cases config

### Lifecycle Hook

-   CLI start
-   Runner start
-   Jest global setup
-   Jest setupFiles
-   Jest NodeEnvironment Setup
-   setupTestFrameworkScriptFile
-   Jest BeforeAll
-   Jest BeforeEach
-   Test case
-   Marten Pre-Hook
-   Marten Post-Hook
-   Jest AfterEach
-   Jest AfterAll
-   Jest NodeEnvironment Teardown
-   Jest global teardown
-   Runner close
-   CLI close

### TODO

-   Query
-   Infrastructure
-   Marten(CI/Test,etc.)
-   Plugins
    - Logger
-   CLI

    - Tags optimization
    - Exclude file or path
    - Filter jest env cli option
    - Error driver warning
    - Debug mode
    - Verbose option/help info/error info
    - Exec config file
    - Create cases/update cases/search cases
    - Create project

-   Reporter

    - Test Results Collector (info/error end/error script/error assert)
    - reporter SPA(Query/sorting/filtering)
    - Display Features(Chart/Layered List/Display Error)
    - RESTful API Server(TBD)