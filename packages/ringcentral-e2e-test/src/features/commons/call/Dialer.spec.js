/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from '../../../steps/commons/login';
import NavigateTo from '../../../steps/commons/navigateTo';
import Entry from '../../../steps/entry';

describe('Test Demo: =====>', () => {
  // test({
  //   title: 'unit testing',
  //   tags: [['widgets']],
  //   drivers: ['UT'],
  //   levels: ['p0'],
  //   options: [
  //     { text: 'test', expected: 'test' },
  //     { text: 'test1', expected: 'test1' },
  //   ],
  // }, async ({ option }) => {
  //   expect(option.text).toBe(option.expected);
  // });

  // test({
  //   title: 'component unit testing',
  //   tags: [['widgets']],
  //   drivers: ['enzymeUT'],
  //   levels: ['p0'],
  //   options: [
  //     { text: 'test', expected: 'test' },
  //     { text: 'test1', expected: 'test1' },
  //   ],
  // }, async ({ option }) => {
  //   expect(driver.program.shallow(<Button>{option.text}</Button>).text()).toBe(option.expected);
  // });
  // function check() {
  //   console.log(browser.targets().map(tar => ({
  //     type: tar.type(),
  //     url: tar.url()
  //   })));
  // }


  

  

  async function toggleEnv(page) {
    await $(page).execute('window.toggleEnv()');
    
    await $(page).waitForSelector('[class*=input]', { visible: true });
    await $(page).clear('[class*=input]');
    await $(page).type('[class*=input]', 'https://api-xmnup.lab.nordigy.ru');
    
    await $(page).click('[class*=slider]');
    await $(page).waitFor(100);
    await $(page).click('[class*=saveButton]');
  }
  async function loginCTI(page, phoneNumber = '18332085048') {
    await $(page).click('[class*=loginButton]');
    const loginPage = await $(page).waitForNewPage(browser);
    // loginpage-1
    await $(loginPage).waitForSelector('[data-test-automation-id=loginCredentialNext]', { visible: true });
    await $(loginPage).type('[data-test-automation-id=input]', phoneNumber)
    await $(loginPage).click('[data-test-automation-id=loginCredentialNext]');
    // loginpage-2
    await $(loginPage).waitForSelector('[data-test-automation-id=signInBtn]', { visible: true });
    // cannot remove this, cause of it will blink
    await $(loginPage).waitFor(100);
    await $(loginPage).type('[id=password]', 'Test!123');
    await $(loginPage).click('[data-test-automation-id=signInBtn]');
  }

  class DialingHelper {
    constructor(browser) {
      this._browser = browser;
      this.map = new Map();
    }
    async dial(from, to) {
      if (!this.map.has(from)) {
        await this.login(from);
        await this.map.get
      }
      if (!this.map.has(to)) {
        await this.login(to);
      }
      const dialerPage = this.map.get(from);
      // const receiverPage = this.map.get(to);
      await this._dial(dialerPage, to);
    }
    async _dial(dialerPage, to) {
      // dialerPage.dialerUI.call({ phoneNumber: to })
    }
    async login(acc) {
      const page = await this._browser.newPage();
      await page.goto('chrome');
      await toggleEnv(page);
      await loginCTI(page, acc);
      // login acc A
      this.map.set(acc, page);
    }
    async destory() {
      return this._browser.close();
    }
  }

  test({
    title: 'button text with select ${selector} expected ${expected} ',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[class*=loginButton]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    // await $(page).screenshot('test.png');
    // console.log(page.url())
    // console.log(await page.content());
    const text = await $(page).getText(option.selector);
    expect(text).toBe(option.expected);
    // await toggleEnv(page);
    // await loginCTI(page);
    const dh = new DialingHelper(browser);
    await dh.dial('18332085048', '18332085049');
    
    // const newPage = await browser.newPage();
    // await newPage.goto('https://localhost:8201');

    await $(page).waitFor(100000);
  });

  // test({
  //   title: 'Login with username ${username}, dialer ${selector} text expected "${title}"',
  //   tags: [
  //     ['widgets'],
  //     // ['salesforce'],
  //   ],
  //   levels: ['p0'],
  //   options: [
  //     { username: '+18552085709*103', password: 'Test!123', selector: 'toTitle', title: 'To:'},
  //   ],
  // }, async ({ option, isVirtual }) => {
  //   // 1. login CTI
  //   const process = createProcess(
  //     Entry,
  //     Login,
  //     NavigateTo,
  //   )(context);
  //   await process.exec();
  //   // 2. check 'toTitle' text
  //   const fromNumber = await $(app).getText(option.selector);
  //   expect(fromNumber).toBe(option.title);
  // });
});
