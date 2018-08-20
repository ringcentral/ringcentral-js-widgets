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

| controller                  | config       | info             |
| --------------------------- | ------------ | ---------------- |
| 1.tags(title/level/target…) | 1.runner     | 1.help info      |
| 2.path                      | 2.driver     | 2.error info     |
| 3.env                       | 3.tester     | 3.verbose option |
| 4.exclude                   | 4.reporter   |                  |
| 5.worker                    | 5.screenshot |                  |
|                             | 6.mock       |                  |
|                             | 7.mode       |                  |

## Milestone
* Infrastructure／Architecture
* Foundation Steps
* Compatibility
* Enhancement
