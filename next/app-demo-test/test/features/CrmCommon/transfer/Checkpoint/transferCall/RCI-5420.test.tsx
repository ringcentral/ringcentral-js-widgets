/**
 * RCI-5420: Check transfer to Voicemail
 * https://test_it_domain/test-cases/RCI-5420
 * Preconditions:
 * User is logged into Salesforce
 * UserA is logged in CTI App
 *
  | User |Phone number |Company contact |Personal contact |
  | UserA |18443223062 |Name:test1Ext.:101Name:test2Ext.:102Name:test3Ext.:103DID: 2056631886 |Name:Per_testNumber:18006034445 |

 * Note: Could only voicemail to the company contact
 * Entry point(/s):
 *
  | Entry |Call Type |From/To number |Input type |To Voicemail number |Result |Data tracking properties |
  | 1 |inbound |18443223062*102 |Click on keypad |103 |succeeded |Contact Type: NullDialpadInput: False |
	| 2 |inbound |18443223062*102 |Click on dialer |2056631886 |failed |- |
	| 3 |inbound |18006034445 |Click on dialer |103 |succeeded |Contact Type: NullDialpadInput: True |
	| 4 |outbound | 18443223062*102 |Click on the search result |test3 |succeeded |Contact Type: CompanyDialpadInput: False |
	| 5 |outbound |18443223062*102 |Click on keypad |2056631886 |failed |- |
	| 6 |outbound |18772051234 | Click on the search result |test3 |failed |- |

 * > Make {Call Type} call with {From/To number}, go to transfer page
 * > Input {To Voicemail number} by {Input type}
 * > Click the 'To Voicemail' button
 */
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  And,
  autorun,
  common,
  Context,
  examples,
  it,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import {
  AnswerCall,
  CheckTransferPage,
  ClickMoreButton,
  GoToTransferPage,
  MakeCall,
} from '../../../../../steps/Call';
import { CheckInCallLogPageByTitle } from '../../../../../steps/CallLog';
import {
  ClickItemByDataSign,
  PressEnter,
  WaitForItemEnabled,
} from '../../../../../steps/Common';
import { CheckContactSearchPanel } from '../../../../../steps/ContactSearch';
import { ClickTheKeyOnTheDialPad } from '../../../../../steps/Dialer';
import { TypingWordingInSearch } from '../../../../../steps/Messages';
import {
  MockAddressBookSync,
  MockCallLogSync,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../../steps/Mock';
import { SelectContactFromTabs } from '../../../../../steps/RCDirectory';
import { CheckEventTracking } from '../../../../../steps/Tracking';
import { CheckStatusAfterColdTransfer } from '../../../../../steps/Transfer';

@autorun(test.skip)
@it
@p2
@common
@title('Check transfer to Voicemail')
export class RCI5420 extends Step {
  Login?: StepFunction<any, any>;
  Entry?: StepFunction<any, any>;
  @examples([
    {
      entry: 1,
      callType: 'Inbound',
      callNumber: '102',
      inputType: 'Click on keypad',
      toVoicemailNumber: '103',
      result: 'succeeded',
      status: 200,
    },
    {
      entry: 2,
      callType: 'Inbound',
      callNumber: '102',
      inputType: 'Click on keypad',
      toVoicemailNumber: 'test3',
      result: 'succeeded',
      status: 200,
    },
    {
      entry: 3,
      callType: 'Inbound',
      callNumber: '102',
      inputType: 'Click on dialer',
      toVoicemailNumber: '8006034445',
      result: 'failed',
      status: 200,
    },
    {
      entry: 4,
      callType: 'Outbound',
      callNumber: '18772051234',
      inputType: 'Click on the search result',
      toVoicemailNumber: 'test3',
      result: 'failed',
      status: 409,
    },
  ])
  run() {
    const { Login, Entry } = this;
    return (
      <Scenario desc="Check transfer to Voicemail">
        <When
          desc="Make {Call Type} call with {From/To number}, go to transfer page"
          action={[
            <Entry
              mocks={[
                <MockCallLogSync repeat={0} />,
                <MockExtensionsList
                  handler={(mockData) => ({
                    ...mockData,
                    ...mockExtensionsListData([
                      {
                        firstName: 'test1',
                        lastName: '',
                        extensionNumber: '101',
                        hidden: false,
                        phoneNumberHidden: false,
                      },
                      {
                        firstName: 'test2',
                        lastName: '',
                        extensionNumber: '102',
                        hidden: false,
                        phoneNumberHidden: false,
                      },
                      {
                        firstName: 'test3',
                        lastName: '',
                        extensionNumber: '103',
                        hidden: false,
                        phoneNumberHidden: false,
                        phoneNumber: '+12056631886',
                      },
                    ]),
                  })}
                />,
                <MockAddressBookSync
                  page={1}
                  handler={(personalUsers) => {
                    const firstPersonalUser = personalUsers[0];
                    firstPersonalUser.firstName = 'Per_test';
                    firstPersonalUser.middleName = '';
                    firstPersonalUser.lastName = '';
                    firstPersonalUser.companyPhone = '18006034445';
                    return personalUsers;
                  }}
                />,
              ]}
            />,
            Login,
            <MakeCall
              status="connected"
              direction={this.example.callType}
              phoneNumber={this.example.callNumber}
            />,
            () => {
              if (this.example.callType === 'Outbound') {
                return [
                  async (_: any, { rcMock }: Context) => {
                    await rcMock.connectLatestCall();
                  },
                  <WaitForRenderReady />,
                  async () => {
                    await whenStateChange(() => {
                      userEvent.click(screen.getByTestId('log'));
                    });
                  },
                ];
              } else {
                return AnswerCall;
              }
            },
            CheckInCallLogPageByTitle,
            ClickMoreButton,
            GoToTransferPage,
            CheckTransferPage,
          ]}
        />
        <And
          desc="Input {To Voicemail number} by {Input type}"
          action={() => {
            if (this.example.inputType === 'Click on dialer') {
              return [
                <ClickTheKeyOnTheDialPad
                  theDialValue={this.example.toVoicemailNumber}
                />,
              ];
            }
            if (this.example.inputType === 'Click on keypad') {
              return [
                <TypingWordingInSearch
                  chars={this.example.toVoicemailNumber}
                  wait={false}
                  dataSign="recipientsInput"
                />,
                <PressEnter dataSign="recipientsInput" />,
              ];
            }
            if (this.example.inputType === 'Click on the search result') {
              return [
                <TypingWordingInSearch
                  chars={this.example.toVoicemailNumber}
                  wait={false}
                  dataSign="recipientsInput"
                />,
                <SelectContactFromTabs
                  type="company"
                  name={this.example.toVoicemailNumber}
                />,
              ];
            }
          }}
        />
        <And
          desc="Click the 'To Voicemail' button"
          action={[
            <CheckContactSearchPanel present={false} />,
            <WaitForItemEnabled dataSign="toVoicemailBtn" />,
            (_: any, { rcMock, app }: Context) => {
              rcMock.coldTransfer(this.example.status);
            },
            <ClickItemByDataSign dataSign="toVoicemailBtn" />,
          ]}
        />
        <Then
          desc="<Result is succeeded>
            The transfer page should be closed The call should be disconnected Pop up notification'Call transferred' Voicemail transferred to the target record's voicemailMixpanel check:Event [Only for Zendesk] name:Int_Phone_Transfer_toVoicemail[Mixpanel check] [Only for SF]Event name: Transfer: Click To Voicemail/Transfer pageProperties: {Data tracking properties}
                      The transfer page should be closed
                      The call should be disconnected
                      Pop up notification'Call transferred'
                      Voicemail transferred to the target record's voicemail
                      Mixpanel check:Event [Only for Zendesk] name:Int_Phone_Transfer_toVoicemail
                      [Mixpanel check] [Only for SF]Event name: Transfer: Click To Voicemail/Transfer pageProperties: {Data tracking properties}
                      [L10N]"
          action={() => {
            if (this.example.result === 'succeeded') {
              return [
                <CheckContainsAlertMessage message="Call transferred" />,
                async (_: any, { rcMock }: any) => {
                  await rcMock.disConnectLatestCall();
                },
                <CheckStatusAfterColdTransfer postStatus={200} />,
                <CheckEventTracking
                  contain={['Int_Phone_Transfer_toVoicemail']}
                />,
              ];
            }
          }}
        />
        <Then
          desc="<Result is failed>
            Still on transfer page
                      The call should be connected
                      Pop up notification'Cannot send call to voicemail due to internal error'
                      [Mixpanel check]:Transfer to external voicemail failed
                      [L10N]"
          action={() => {
            if (this.example.result === 'failed') {
              return [
                <CheckContainsAlertMessage message="Cannot send call to voicemail due to internal error" />,
                <CheckStatusAfterColdTransfer postStatus={409} />,
              ];
            }
          }}
        />
      </Scenario>
    );
  }
}
