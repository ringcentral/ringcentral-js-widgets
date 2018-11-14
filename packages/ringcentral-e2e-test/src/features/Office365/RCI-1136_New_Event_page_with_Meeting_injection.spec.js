/* eslint-disable */ 
/* RCI-1136: New Event page with Meeting injection
http://einstein.int.ringcentral.com/?project=1309&suite=11037&case=17244

Summary:
  Goal: Checking New Event page injection

  Priority: P1

  User Story: 
    RCINT-8582: New Event Page with RC Meeting Injection
    https://jira.ringcentral.com/browse/RCINT-8582
  
  Keywords:
    Automation Ready, Functionality, Office365

  Preconditions:
    1. RC CTI app is installed and enabled
    2. User has logged in to 3rd party
    3. User has logged in to  CTI app
    4. User has authorized CTI
    
    Account type(/s): RC US, CA, UK, EU, AT&T, TELUS, BT
    Extension type(/s): 
    Entry point(/s):  1. In Calendar, Time Format is 24 hours
                      2. In Calendar, Time Format is 12 hours
                      Setting in :https://portal.office.com//account/#settings

Created By		cerrie.shen
Date Created	Tue, 06 Nov 2018 10:26:36
Updated By	cerrie.shen
Date Updated	Tue, 06 Nov 2018 14:47:44
 */
 /* eslint-enable */

 import { createProcess } from 'marten';
 import { LoginCTI } from '../../steps/commons/login';
 import AuthorizeOffice from '../../steps/office/__temp__/authorizeOffice';
 import Entry from '../../steps/entry';
 import skipGuide from '../../steps/office/__temp__/skipGuide';
 import addMeeting from '../../steps/office/__temp__/addMeeting';
  
 beforeEach(() => {
   jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
 });
 
  describe('Office365 : New Event page =====>', () => {
    test({
      title: 'New Event page with Meeting injection',
      tags: [
        ['office'],
      ],
      levels: ['p1'],
      brands: ['rc', 'bt', 'att', 'telus'],
      options: [
       {
         o365URL: 'https://outlook.office365.com/owa/?path=/calendar/view/Day',
         authSuccess: 'Authorized Account',
         appNames: {
           rc: 'RingCentral for Office365',
           att: 'Office@Hand for Office365',
           bt: 'BT Cloud Phone for Office365',
           telus: 'TELUS Business Connect for Office365',
         },
         accounts: ['CM_RC_US'], callingType: 'myRCPhone'
       }
      ],
    }, async (context) => {
      const process = createProcess(
        Entry,
        LoginCTI,
        skipGuide,
        AuthorizeOffice,
        addMeeting,
      )(context);
      /*
      __Step1__: Go to Outlook->Calendar->click Time slot ->more detail, and user is on New Even page
 
      [Expected Result]: 
      There is a selector:
      <brand icon>+ Select Conference with more drop down
      <brand icon>+ Video Meeting
      <brand icon>+ Conference Meeting
      None
      */
   
      await process.execTo(addMeeting.openDetail);
      expect(await addMeeting.getSelePlaceholder(context)).toEqual('Select Conference');
      expect(await addMeeting.getSeleItems(context)).toEqual(['Add Video Call','Add Conference Call']);
 
      
      /*
      __Step2__: Select "Video Meeting"option
      [Expected Result]:
      Pop up a meeting setting page
      */
     
      /*
      __Step3__: Closed the meeting setting popup and then click "Schedule" button
      [Expected Result]:
      Inject meeting info to "Description", and meeting link to "Location" by default meeting setting
      */
     await process.execTo(addMeeting.createVideoMeeting);
     //const locationRes = await addMeeting.checkVideoLocaExist(context);
     
     expect(await addMeeting.checkVideoLocaExist(context)).toBe(true);
     expect(await addMeeting.checkVideoDescExist(context)).toBe(true);
 
      /*
      __Step4__: Select "Conference Meeting"
      [Expected Result]: Pop up a conference setting page
      */
 
      /*
      __Step5__: Closed the conference setting popup and then click "Schedule" button
      [Expected Result]: 
      1. Meeting info will replace, the Video meeting info will be cleared;
      2. Inject conference info to "Description", and text "Conference Meeting" to "Location"
      */
     //await process.execTo(addMeeting.createConfMeeting);
     //expect(addMeeting.checkConfLocaExist(context).toBeTruthy();
     //expect(addMeeting.checkConfDescExist(context).toBeTruthy();
    });
  });
  