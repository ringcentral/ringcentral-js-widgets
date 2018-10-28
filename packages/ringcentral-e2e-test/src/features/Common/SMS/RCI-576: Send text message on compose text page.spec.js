/* eslint-disable */ 
/* RCI-576: Send text message on compose text page
http://einstein.int.ringcentral.com/?project=1309&suite=11048&suite=11086&suite=11437&case=12117

Summary:
  Goal: To verify whether App can send text message using Compose Text page

  Priority: P0

  User Story: 
    RCINT-2896: Dynamics_Compose Text
    https://jira.ringcentral.com/browse/RCINT-2896
    RCINT-5051: SfB_Compose Text & Conversation
    https://jira.ringcentral.com/browse/RCINT-5051
    RCINT-6104: Salesforce_Compose Text
    https://jira.ringcentral.com/browse/RCINT-6104
  
  Keywords:
    Automation Ready, Functionality, Salesforce, SkypeForBusiness,
    Skype for Business2.0, Dynamics, Salesforce_6.0, DynamicsV1.1  

  Preconditions:
    1. User has logged into the 3rd party
    2. CTI app is integrated.
    3. User has logged into CTI app
    
    Account type(/s): RC CA/US/UK/EU/AU, BT, Telus
    Extension type(/s): 
    Entry point(/s): Compose Text

Created By	sarah.chen
Date Created	Fri, 24 Aug 2018 18:57:55
Updated By	sarah.chen
Date Updated	Fri, 24 Aug 2018 18:57:55
 */
/* global $, page, browser, driver, context, app */
/* eslint-enable */

import { createProcess } from 'marten';
import Login from '../../../steps/commons/login';
import NavigateTo from '../../../steps/commons/navigateTo';
import TypeComposeToField from '../../../steps/commons/SMS/typeComposeToField';
import TypeTextSMS from '../../../steps/commons/SMS/typeTextSMS';
import SendSMS from '../../../steps/commons/SMS/sendSMS';
import Entry from '../../../steps/entry';

describe('Commom SMS: =====>', () => {
  test({
    title: 'Send text message on compose text page',
    tags: [
      ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { typeToFields: ['foobar', '101', '(650)8881234', '+16508881234', '+16508881234*101'], textSMS: 'bar', accounts: ['CM_RC_US'], callingType: 'myRCPhone' },
    ],
  }, async ({ option }) => {
    const NavigateToComposeText = NavigateTo('composeText');
    const NavigateToMessages = NavigateTo('messages');
    const LoginCTI = Login();
    const process = createProcess(
      Entry,
      LoginCTI,
      NavigateToComposeText,
      TypeComposeToField,
      TypeTextSMS,
      SendSMS,
      NavigateToMessages,
    )(context);
    /*
    __Step1__: Enter some characters in "To" field.
    ( eg:
    Enter a name
    Enter a number to search , the phone number can be :
    Extension number , DID , local number , E164format, company number*extension number
    )
    [Expected Result]: It displays the phone number, name or extension on " To" textbox with a "X"
    */
    TypeComposeToField.addCheckPoints(async (selector, typeToField) => {
      const toFieldText = await $(app).getValue(selector);
      expect(toFieldText).toBe(typeToField);
    });
    await process.execTo(TypeComposeToField);

    /*
    __Step2__: Type a text on the text area
    [Expected Result]:
    1. User should be able to enter the text in the textarea.
    2. The ghoest text "Type message..." disappears
    3. "Send" button is enabled
    */
    await process.execTo(TypeTextSMS);
    const placeholder = await $(app).getAttribute('@messageInput', 'placeholder');
    expect(placeholder).toBe('Type message...');
    const inputSMS = await $(app).html('@messageInput');
    expect(inputSMS).toBe(option.textSMS);
    const disabled = await $(app).getAttribute('@messageButton', 'disabled');
    expect(disabled).toBeNull();

    /*
    __Step3__: Click the send button
    [Expected Result]:
    1. User is navigated to conversation detail page
    2. The message and date sent before should be displayed on coversation detail page.
    3. The title is the recipient's name or phone number
    */
    await process.execTo(SendSMS);
    const conversationPanel = await $(app).waitForSelector('@conversationPanel');
    expect(conversationPanel).toBeTruthy();
    const lastTextSMS = await $(app).getText('@message:-1');
    expect(lastTextSMS).toEqual(expect.stringContaining(option.textSMS));
    const title = await $(app).getText('@conversationPanel');
    expect(title).not.toBe('');

    /*
    __Step4__: Go to Messages > All/Text
    [Expected Result]: The conversation is shown on the top of messages list
    */
    await process.execTo(NavigateToMessages);
    const messageItemText = await $(app).getText('@messageItem');
    expect(messageItemText).toEqual(expect.stringContaining(option.textSMS));
  });
});
