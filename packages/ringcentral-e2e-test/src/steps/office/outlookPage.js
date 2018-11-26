import sleep from 'ringcentral-integration/lib/sleep';

const o365PeopleURL = 'https://outlook.office.com/owa/?path=/people';
// HACK: get the expand icon selector, seems to be /^_ariaId_\d{3}$/
const contactFolderExpandIconSelector = contactFolderId =>
  `button[aria-labelledby="_ariaId_${+contactFolderId.replace('_ariaId_','') + 1}"]`;

export default class OutlookPage {
  static getStaticContactsNames() {
    return ['Demo2 User', 'Demo4 User', 'Test1 Test1'];
  }
  static async getRealContactsNames(context) {
    console.log('Opening o365 home page.');
    const outlookPage = await browser.newPage();

    // This page could be slower than you think
    await outlookPage.goto(o365PeopleURL, {
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

    if (!expanded) {
      console.log('Clicking to expand the contacts section tree.')
      await $(outlookPage).click(contactFolderExpandIconSelector(contactFolderId));
    }

    console.log('Clicking contact entry and waiting for 15s for entry page to laod.')
    await $(outlookPage).click(contactsEntry);
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

    if (!officeContactsNames.length) {
      console.log('No outlook contacts were found');
      return [];
    }

    return officeContactsNames;
  }
}
