import { createProcess } from 'marten';
import { LoginCTI } from '../../steps/commons/login';
import AuthorizeOffice from '../../steps/office/authorizeOffice';
import Entry from '../../steps/entry'
import NavigateToScheduleMeeting from '../../steps/commons/NavigateTo/navigateToScheduleMeeting';
import NavigateToSettings from '../../steps/commons/NavigateTo/navigateToSettings';
import NavigateToConference from '../../steps/commons/NavigateTo/navigateToConference';
import MeetingHelper from '../../steps/office/meetingHelper';
import Meeting from 'ringcentral-client/src/paths/Meeting';
describe("RCI-306 Schedule conference > Invite with Outlook Calendar", () => {
  test({
    title: "Authorised > Click 'Invite with Outlook with Outlook Calendar'",
    tags: [['office']],
    levels: ['p1'],
    brands: ['rc'],
    options: [{
      inviteButtonSelector: 'div[class*="ConferencePanel-_styles_bottom_sViog"] > div'
    }]
  }, async (context) => {
    const process = createProcess(
      Entry,
      LoginCTI,
      NavigateToSettings,
      AuthorizeOffice,
      NavigateToConference,
    )(context);
    await process.exec();
    const { page, browser, options } = context;
    const brand = context.options.tag.brands;
    const inviteButtonText = await $(page).getText(options.option.inviteButtonSelector, {
      selector: 'css'
    });
    expect(inviteButtonText).toEqual('Invite with Outlook Calendar');
    const openEventPage = new Promise((resolve, reject) => {
      browser.on('targetcreated', async (target) => {
        const page = await target.page();
        resolve(page);
      })
    });
    await $(page).click(options.option.inviteButtonSelector, { selector: 'css' });
    const eventDetailPage = await openEventPage;
    eventDetailPage.on('domcontentloaded', async () => {
      expect(await MeetingHelper.checkTitle(eventDetailPage,context,'conference')).toBe(true);
      expect(await MeetingHelper.checkLocation(eventDetailPage, brand, 'conference')).toBe(true);
      expect(await MeetingHelper.checkDescription(eventDetailPage, brand, 'conference')).toBe(true);
    })
  })
})
