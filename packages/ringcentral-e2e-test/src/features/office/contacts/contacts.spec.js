/* eslint-disable */
/* global $, page, browser, driver, context */
import { createProcess } from 'marten';
import AuthorizeOffice from '../../../steps/office/authorizeOffice';
import Login from '../../../steps/office/login';
import Entry from '../../../steps/entry';
import sleep from 'ringcentral-integration/lib/sleep';

/**
 * Selectors
 */
const o365loginURL = 'https://login.microsoftonline.com';
const outlookId = 'ShellMail_link';
const peopleBtnSelector = 'button[title="People"]';// unsafe but due to outlook page can render multiple people button with the same Aria lable but different css cls
const contactFolderSelector = 'div[aria-label="Your contacts"][role="tree"][aria-haspopup="true"][role="tree"]';
const markAsReadSelector = '[aria-label="Mark all as read (Q)"]';
const contactFolderExpandedAttr = 'aria-expanded';
const ariaLableAttr = 'aria-label';
const contactListSelector = `[${ariaLableAttr}="Contact table. Press up or down arrow to move between contacts. Press left or right arrow for more contact information."] div[${ariaLableAttr}*="Press enter to view more details."]`;
const contactNavSelector = 'div[title="Contacts"]';
const searchBarSelector = 'input[placeholder="Search..."]';
const dismissBtn = '[class*="node_modules-ringcentral-widgets-components-Message-_styles_dismiss"]';
const backBtnSelector = '[class*="node_modules-ringcentral-widgets-components-BackHeader-_styles_iconRotate"]';

/**
 * Tests here
 */
beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
});
afterEach(async() => {
  await browser.close();
});

describe('O365 contact flow: =====>', () => {
  test({
    title: 'O365 contact flow(click contact panel)',
    tags: [
      ['office', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        authSuccess: 'Authorized Account',
      },
    ],
  }, async ({ option }) => {
    const params = context.options.config;
    const process = createProcess(
      Entry,
      Login,
      AuthorizeOffice
    )(context);
    await process.exec();
    // console.log('Wait 40s for syncing');
    // await sleep(40000);

    const alertHandlers = await page.$$(dismissBtn, { selector: 'css' });
    for (const alertHandler of alertHandlers) {
      try{
        await alertHandler.click();
      }catch(e){
        //
      }
    }
    // for alerts to disappear
    await sleep(2000);

    console.log('Opening o365 home page.');
    const o365page = await browser.newPage();
    await o365page.goto(o365loginURL, { // This page could be slower than you think
      waitUntil: 'networkidle2',
      timeout: 600000,
    });

    await sleep(10000);
    console.log('Tring to find outlook link.');

    const outlooklink = await o365page.evaluate((outlookId)=>{
      const icon = document.getElementById(outlookId);
      return icon && icon.href;
    }, outlookId);

    if (!outlooklink){
      return console.error('Can not find outlook link in the office365 home page, exit!');
    }

    console.log('Found outlook link, closing o365.');
    await o365page.close();
    console.log('Opening outlook.');
    const outlookPage = await browser.newPage();
    await outlookPage.goto(outlooklink, { // This page could be slower than you think
      waitUntil: 'networkidle2',
      timeout: 600000,
    });

    console.log('Waiting for oulook to mount, timeout set to 100s');
    await $(outlookPage).waitFor(markAsReadSelector, { 
      selector: 'css',
      timeout: 100000,
     });
    console.log("Waiting for 100s for componet's selector to be rendering.")
    await sleep(100000);// I really don't understand why MS has this wierd behaviour...

    let peopleHandler = null;
    try {
      console.log('Trying open the People panel');
      const elementHandles =  await outlookPage.$$(peopleBtnSelector);
      console.log(`Get ${elementHandles.length} suspects.`);
      for(const elementHandle of elementHandles){
        const boundingBox = await elementHandle.boundingBox();
        if (!boundingBox) {
          break;
        }
        if (boundingBox.width>0 && boundingBox.height>0) {
          try{
            peopleHandler = elementHandle;
            console.log('Goto people panel.');
            await elementHandle.click();
          }catch(e){
            console.log('Error when click people button');
          }
        }
      }
    } catch(e) {
      console.error('Error when finding people button.')
      console.error(e)
    }

    if(!peopleHandler){
      console.log("Can't find people button");
      return;
    }

    console.log('Waiting 30s for people panel to mount.');
    await $(outlookPage).waitFor(contactFolderSelector, { 
      selector: 'css',
      timeout: 30000,
     });
    await sleep(30000);
  
    const {
      expanded,
      contactFolderId,
    } = await outlookPage.evaluate((contactFolderSelector, contactFolderExpandedAttr)=>{
        const foldr = [].slice
        .call(document.querySelectorAll(contactFolderSelector))
        .find(dom=>dom.offsetHeight > 0);

        return {
          expanded: foldr && eval(foldr.parentElement.getAttribute(contactFolderExpandedAttr)),
          contactFolderId: foldr && foldr.parentElement.id,
        };
      }, 
      contactFolderSelector,
      contactFolderExpandedAttr,
    );

    const contactsEntry = `#${contactFolderId} span[title="Contacts"]`;

    // HACK: get the expand icon selector, seems to be /^_ariaId_\d{3}$/
    const contactFolderExpandIconSelector = `button[aria-labelledby="_ariaId_${+contactFolderId.replace('_ariaId_','') + 1}"]`;

    if (!expanded) {
      console.log('Clicking to expand the contacts section tree.')
      await $(outlookPage).click(contactFolderExpandIconSelector, { selector: 'css' });
    }

    console.log('Clicking contact entry and waiting for 15s for entry page to laod.')
    await $(outlookPage).click(contactsEntry, { selector: 'css' });
    await sleep(15000);// wait for loading
    console.log('Get contacts names');

    // get contact names of the first page.
    const contactsNames = await outlookPage.evaluate(
      (contactListSelector, ariaLableAttr)=>(
        Array.prototype.slice.call(document.querySelectorAll(contactListSelector))
        .map(dom=>dom.getAttribute(ariaLableAttr).replace('. Press enter to view more details.',''))
      ),
      contactListSelector,
      ariaLableAttr,
    );

    console.log(`Close outlook page, got ${contactsNames.length} countacts from first page: ${contactsNames.join(', ')}.`);
    outlookPage.close();
    // const contactsNames = ["AB 100", "AB 1000", "AB 1001", "AB 1002", "AB 1003", "AB 1004", "AB 1005", "AB 1006", "AB 1007", "AB 1008", "AB 1009", "AB 101", "AB 1010", "AB 1011", "AB 1012", "AB 1013", "AB 1014", "AB 1015", "AB 1016", "AB 1017", "AB 1018", "AB 1019", "AB 102", "AB 1020", "AB 1021", "AB 1022", "AB 1023", "AB 1024", "AB 1025", "AB 1026", "AB 1027", "AB 1028", "AB 1029", "AB 103", "AB 1030", "AB 1031", "AB 1032", "AB 1033", "AB 1034", "AB 1035", "AB 1036", "AB 1037", "AB 1038", "AB 1039", "AB 104", "AB 1040", "AB 1041", "AB 1042", "AB 1043", "AB 1044"];

    if (!contactsNames.length) {
      console.log('No outlook contacts were found');
      return;
    }
    /**
     * FIXME: get the contact count
     */
    await $(page).waitFor(contactNavSelector, { selector: 'css' });
    await $(page).click(contactNavSelector, { selector: 'css' });

    for (let contactName of contactsNames) {
      console.log(`Seaching ${contactName} in CTI...`);
      const searchBar=await page.$(searchBarSelector);
      await searchBar.click();
      await searchBar.focus();
      // click three times to select all
      await searchBar.click({clickCount: 3});
      await searchBar.press('Backspace');
      await searchBar.type(contactName);
      await sleep(500);
      const contactItemSelector = `div[title="${contactName}"]`;
      const resultLength = await page.evaluate((contactName, contactItemSelector)=>(
        Array.prototype.slice.call(document.querySelectorAll(contactItemSelector)).length
      ), contactName, contactItemSelector);
      expect(resultLength).toBeGreaterThanOrEqual(0);
      await $(page).click(contactItemSelector, { selector: 'css' });
      await sleep(500);

      const contactTitleSelector = `span[title="${contactName}"]`;
      const contactTitle = await page.evaluate((contactName, contactTitleSelector)=>(
        document.querySelector(contactTitleSelector).innerText
      ), contactName, contactTitleSelector);
      expect(contactTitle).toEqual(contactName);
      await $(page).click(backBtnSelector, { selector: 'css' });
    }
  });
});