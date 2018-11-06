/* eslint-disable */
import {
  createProcess
} from 'marten';
import AuthorizeOffice from '../../../steps/office/authorizeOffice';
import Login from '../../../steps/office/login';
import Entry from '../../../steps/entry';
import sleep from 'ringcentral-integration/lib/sleep';

/**
 * Selectors
 */
const o365loginURL = 'https://login.microsoftonline.com';
const o365PeopleURL = 'https://outlook.office.com/owa/?path=/people';
const outlookId = 'ShellMail_link';
const peopleBtnSelector = 'button[title="People"]'; // unsafe but due to outlook page can render multiple people button with the same Aria lable but different css cls
const contactFolderSelector = 'div[aria-label="Your contacts"][role="tree"][aria-haspopup="true"][role="tree"]';
const markAsReadSelector = '[aria-label="Mark all as read (Q)"]';
const contactFolderExpandedAttr = 'aria-expanded';
const ariaLableAttr = 'aria-label';
const contactListSelector = `[${ariaLableAttr}="Contact table. Press up or down arrow to move between contacts. Press left or right arrow for more contact information."] div[${ariaLableAttr}*="Press enter to view more details."]`;
const contactNavSelector = 'div[title="Contacts"]';
const searchBarSelector = 'input[placeholder="Search..."]';
const dismissBtn = '[class*="node_modules-ringcentral-widgets-components-Message-_styles_dismiss"]';
const backBtnSelector = '[class*="node_modules-ringcentral-widgets-components-BackHeader-_styles_iconRotate"]';
const contactFilterSelector = '[class*=ringcentral-widgets-components-ContactSourceFilter-_styles_filterIconContainer]';
const contactFilterItemSelector = '[class*=contactSourceItem]';
const spinnerSelector = '[class*=ringcentral-widgets-components-SpinnerOverlay]';
const contactNameSelector = '[class*=node_modules-ringcentral-widgets-components-ContactItem-_styles_contactName]';
const defaultFilterColor = 'rgb(6, 132, 189)';
/**
 * Tests here
 */
export default async function caseO365Contacts(context) {
  const { options: { config: { params } }, page, browser } = context;
  // const process = createProcess(
  //   Entry,
  //   Login,
  //   AuthorizeOffice
  // )(context);
  // await process.exec();
  // console.log('Wait 40s for syncing');
  // await sleep(40000);

  console.log('Dismiss alerts...');
  const alertHandlers = await page.$$(dismissBtn, {
    selector: 'css'
  });
  for (const alertHandler of alertHandlers) {
    try {
      await alertHandler.click();
    } catch (e) {
      //
    }
  }
  // for alerts to disappear
  await sleep(2000);

  console.log('Opening o365 home page.');
  const outlookPage = await browser.newPage();

  await outlookPage.goto(o365PeopleURL, { // This page could be slower than you think
    waitUntil: 'networkidle2',
    timeout: 600000,
  });

  console.log('Waiting for people panel to mount.');

  await $(outlookPage).waitFor(contactFolderSelector, {
    selector: 'css',
    timeout: 120000,
  });

  const {
    expanded,
    contactFolderId,
  } = await outlookPage.evaluate((contactFolderSelector, contactFolderExpandedAttr) => {
      const foldr = [].slice
        .call(document.querySelectorAll(contactFolderSelector))
        .find(dom => dom.offsetHeight > 0);

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
    await $(outlookPage).click(contactFolderExpandIconSelector, {
      selector: 'css'
    });
  }

  console.log('Clicking contact entry and waiting for 15s for entry page to laod.')
  await $(outlookPage).click(contactsEntry, {
    selector: 'css'
  });
  await sleep(15000); // wait for loading
  console.log('Get contacts names');

  // get contact names of the first page.
  const officeContactsNames = await outlookPage.evaluate(
    (contactListSelector, ariaLableAttr) => (
      Array.prototype.slice.call(document.querySelectorAll(contactListSelector))
      .map(dom => dom.getAttribute(ariaLableAttr).replace('. Press enter to view more details.', ''))
    ),
    contactListSelector,
    ariaLableAttr,
  );

  console.log(`Close outlook page, got ${officeContactsNames.length} countacts from first page: ${officeContactsNames.join(', ')}.`);
  outlookPage.close();
  // const officeContactsNames = ["AB 100", "AB 1000", "AB 1001", "AB 1002", "AB 1003", "AB 1004", "AB 1005", "AB 1006", "AB 1007", "AB 1008", "AB 1009", "AB 101", "AB 1010", "AB 1011", "AB 1012", "AB 1013", "AB 1014", "AB 1015", "AB 1016", "AB 1017", "AB 1018", "AB 1019", "AB 102", "AB 1020", "AB 1021", "AB 1022", "AB 1023", "AB 1024", "AB 1025", "AB 1026", "AB 1027", "AB 1028", "AB 1029", "AB 103", "AB 1030", "AB 1031", "AB 1032", "AB 1033", "AB 1034", "AB 1035", "AB 1036", "AB 1037", "AB 1038", "AB 1039", "AB 104", "AB 1040", "AB 1041", "AB 1042", "AB 1043", "AB 1044"];

  if (!officeContactsNames.length) {
    console.log('No outlook contacts were found');
    return;
  }
  /**
   * FIXME: get the contact count
   */
  await $(page).waitFor(contactNavSelector, {
    selector: 'css'
  });

  const contactNavBtn = await page.$(contactNavSelector);
  expect(contactNavBtn).toBeTruthy();

  console.log('Goto contact panel');
  await $(page).click(contactNavSelector, {
    selector: 'css'
  });

  console.log('Waiting for loading o365 contacts');
  await $(page).waitFor(spinnerSelector, {
    selector: 'css',
    hidden: true,
    timeout: 120000,
  });
  await sleep(1000);

  await $(page).waitFor(contactFilterSelector, {
    selector: 'css'
  });

  console.log('Opening filter');
  await $(page).click(contactFilterSelector, {
    selector: 'css'
  });
  const {
    allFilterColor,
    texts,
  } = await page.evaluate((contactFilterItemSelector) => {
      const filters = Array.prototype.slice.call(document.querySelectorAll(contactFilterItemSelector));

      return {
        allFilterColor: window.getComputedStyle(filters[0]).color,
        texts: filters.map(dom => dom.innerText),
      };
    },
    contactFilterItemSelector);
  
    async function testContacts(contactsNames) {
      for (let contactName of contactsNames) {
        console.log(`Seaching ${contactName} in CTI...`);
        const searchBar = await page.$(searchBarSelector);
        expect(searchBar).toBeTruthy();
        await searchBar.click();
        await searchBar.focus();
        // click three times to select all
        await searchBar.click({
          clickCount: 3
        });
        await searchBar.press('Backspace');
        await searchBar.type(contactName);
        await sleep(800);
        const contactItemSelector = `div[title="${contactName}"]`;
        const resultLength = await page.evaluate((contactName, contactItemSelector) => (
          Array.prototype.slice.call(document.querySelectorAll(contactItemSelector)).length
        ), contactName, contactItemSelector);
        expect(resultLength).toBeGreaterThanOrEqual(0);
        await $(page).click(contactItemSelector, {
          selector: 'css'
        });
        await sleep(800);
    
        const contactTitleSelector = `span[title="${contactName}"]`;
        const contactTitle = await page.evaluate((contactName, contactTitleSelector) => (
          document.querySelector(contactTitleSelector).innerText
        ), contactName, contactTitleSelector);
        expect(contactTitle).toEqual(contactName);
        await $(page).click(backBtnSelector, {
          selector: 'css'
        });
        await sleep(800);
      }
    }

  console.log('Checking filters...');
  expect(texts.length).toEqual(4);
  expect(allFilterColor).toEqual(defaultFilterColor);
  const expectedFilters = ['All', 'Company', 'Personal', 'Office 365'];
  expect(texts).toEqual(expectedFilters);
  let filterHandlers = await page.$$(contactFilterItemSelector, {
    selector: 'css'
  });
  console.log('Collapsing the filter.')
  await $(page).click(contactFilterSelector, {
    selector: 'css'
  });

  await sleep(1000);

  for(const index of [1, 2]) {
    await $(page).click(contactFilterSelector, {
      selector: 'css'
    });
    filterHandlers = await page.$$(contactFilterItemSelector, {
      selector: 'css'
    });

    await filterHandlers[index].click();
    await sleep(500);

    console.log(`Check ${expectedFilters[index]}`);
    const contactsNames = await page.evaluate((contactNameSelector)=>{
      return Array.prototype.slice.call(document.querySelectorAll(contactNameSelector)).map(
        dom=>dom.innerText
      ).filter(v => !!v)
    }, contactNameSelector);
    await testContacts(contactsNames.slice(0,1));
  }

  console.log('Reset the filter to all');
  await $(page).click(contactFilterSelector, {
    selector: 'css'
  });
  filterHandlers = await page.$$(contactFilterItemSelector, {
    selector: 'css'
  });
  filterHandlers[0].click();
  await sleep(500);

  console.log('Testing office contacts...');
  await testContacts(officeContactsNames);
}
