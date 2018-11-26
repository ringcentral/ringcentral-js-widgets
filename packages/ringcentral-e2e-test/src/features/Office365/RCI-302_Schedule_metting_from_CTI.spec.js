import { createProcess } from 'marten';
import { LoginCTI } from '../../steps/commons/login';
import AuthorizeOffice from '../../steps/office/authorizeOffice';
import Entry from '../../steps/entry'
import NavigateToScheduleMeeting from '../../steps/commons/NavigateTo/navigateToScheduleMeeting';
import NavigateToSettings from '../../steps/commons/NavigateTo/navigateToSettings';
import MeetingHelper from '../../steps/office/meetingHelper';
describe("RCI-302 Schedule meeting > invite with Outlook Calendar", () => {
  test({
    title: "Authorised > Click 'Invite with Outlook with Outlook Calendar'",
    tags: [['office']],
    levels: ['p1'],
    brands: [
      ['rc', { accounts: ['CM_RC_US'] }],
      ['bt', { accounts: ['CM_BT'] }],
      ['att', { username:'18665133464', password:'Test!123' }],
      ['telus', { accounts: ['CM_TELUS'] }],
    ],
    options: [{
      topicEle: 'div.customScrollBar > div._cx_t1 ul > li:nth-child(1) > div > input',
      locationInput: '[aria-labelledby="MeetingCompose.LocationInputLabel"]',
      startDateEle: 'div[class*="MeetingPanel-_styles_dateText"]',
      startTimeEle: 'div[class*="MeetingPanel-_styles_timePicker"] > div > div >input',
      durationHourEle: "div[class*='rw-input']",
      durationMinuteEle: "div[class*='rw-input']",
    }]
  }, async (context) => {
    const process = createProcess(
      Entry,
      LoginCTI,
      NavigateToSettings,
      AuthorizeOffice,
      NavigateToScheduleMeeting,
    )(context);
    await process.exec();
    const { page, browser, options } = context;
    const brand = context.options.tag.brands;
    await $(page).waitFor(1000);
    const inviteButtonText = await $(page).getText('button[class*="MeetingScheduleButton"]', {
      selector: 'css'
    });
    const startDate = await $(page).getText(options.option.startDateEle, { selector: 'css' });
    const startTime = await $(page).getProperty(options.option.startTimeEle, 'value');
    const startDateTime = new Date(startDate + ' ' +startTime);
    expect(inviteButtonText).toEqual('Invite with Outlook Calendar');
    const openEventPage = new Promise((resolve, reject) => {
      browser.on('targetcreated', async (target) => {
        const page = await target.page();
        resolve(page);
      })
    });
    await $(page).click('button[class*="MeetingScheduleButton"]', { selector: 'css' });
    const eventDetailPage = await openEventPage;
    eventDetailPage.on('domcontentloaded',async () => {
      expect(await MeetingHelper.checkTitle(eventDetailPage,context)).toBe(true);
      expect(await MeetingHelper.checkLocation(eventDetailPage, brand)).toBe(true);
      expect(await MeetingHelper.checkDescription(eventDetailPage,brand)).toBe(true);
      expect(await MeetingHelper.checkTime(eventDetailPage, startDateTime)).toBe(true);
    })
  })
})
