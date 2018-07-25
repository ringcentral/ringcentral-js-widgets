# ringcentral-e2e-test

## Goal
* More easily code/read/maintain E2E Test
* High-quality reusable code
* High-performance
* Appropriate structure
* Progressive enhancement/Pluggable

## Features
* Steps controller
* E2E test report
* Support CLI
* Compatible with selenium-webdriver
----
* Serial perform case
* Auto-create test file with AC or test case
* Auto-modify ticket status from Jira

## Planning
- Infrastructure/Architecture
  * Steps controller(Code Review/CI/docs/UT..)
  * Jest-helper(CLI/Tag-Decorator..)
    * Multi-dimension options for test case 
    * Inherit jest
    * Parallel/Replay
    * Process Manager - PM2
  * Jest-reporter(ErrorTracking[ScriptError/ValidationError]/APIsData/Screenshots/DetailTime..)
  * Using jest-puppeteer/jest-environment-puppeteer(?)

- Foundation Steps
  * Puppeteer APIs re-encapsulate
  * Login/Account/Entry/Navigation/Others...

## Milestone
* Infrastructure／Architecture
* Foundation Steps
* Compatibility
* Enhancement


### Nonuse attribute(?)
- Easily find UI DOM  node [v]
- Feature Code mix test code [x]
- remove attribute on production phase
 * babel-plugin-react-remove-properties
 * babel-plugin-remove-attribute
 * babel-plugin-remove-object-properties



