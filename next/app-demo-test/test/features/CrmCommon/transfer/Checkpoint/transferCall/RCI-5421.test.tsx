/**
 * RCI-5421: Check transfer to cold transfer
 * https://test_it_domain/test-cases/RCI-5421
 * Preconditions:
 * User is logged into Salesforce
 * UserA is logged in RC CTI App
 * There has an account entity named Account_test in Salesforce
 * UserA has a personal contact named Personal_test
 * Entry point(/s):
 * > Make a call, go to transfer page > input ''test'in 'To:' field> select 'Personal_test' on Personal tab> clicked the Transferbutton (can transfer)
 * >Make a call, go to transfer page >input ''test'in 'To:' field> select 'Account_test' on Salesforce tab> clicked theTransferbutton (can nottransfer)
 */
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  UseFakeTimers,
  AdvanceTimersByTime,
  UseRealTimers,
  common,
  Context,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import {
  AnswerCall,
  ClickCircleButton,
  MakeInboundCall,
} from '../../../../../steps/Call';
import {
  CheckInCallLogPage,
  CheckInCallLogPageByTitle,
} from '../../../../../steps/CallLog';
import {
  ClickItemByDataSign,
  WaitForItemEnabled,
} from '../../../../../steps/Common';
import { CheckContactSearchPanel } from '../../../../../steps/ContactSearch';
import { TypingWordingInSearch } from '../../../../../steps/Messages';
import {
  MockAddressBookSync,
  MockCallLogSync,
} from '../../../../../steps/Mock';
import { SelectContactFromTabs } from '../../../../../steps/RCDirectory';
import { CheckEventTracking } from '../../../../../steps/Tracking';
import { CheckStatusAfterColdTransfer } from '../../../../../steps/Transfer/checks/CheckStatusAfterColdTransfer';

@autorun(test.skip)
@it
@p2
@common
@title('Check transfer to cold transfer')
export class RCI5421 extends Step {
  Login?: StepFunction<any, any>;
  Entry?: StepFunction<any, any>;
  createMockUser?: (props: any) => any;
  @examples([
    {
      entry: 1,
      inputText: 'test',
      selectTab: 'personal',
      name: 'Personal_test',
      notification: 'Call transferred',
      status: 200,
      phoneNumber: '+18882556247',
    },
    {
      entry: 2,
      inputText: 'test',
      selectTab: 'thirdParty',
      name: 'Account_test',
      notification: 'Cannot transfer the call. Please try again later.',
      status: 409,
      phoneNumber: '+18882556247',
    },
  ])
  run() {
    const { Login, Entry, createMockUser } = this;
    return (
      <Scenario desc="Check transfer to cold transfer">
        <When
          desc="Direct to entry point1"
          action={[
            <Entry
              contactMatchMapping={{
                test: [
                  createMockUser?.({
                    name: 'Account_test',
                    phone: '+18002121222',
                  })!,
                ],
              }}
              mocks={[
                <MockCallLogSync repeat={0} />,
                <MockAddressBookSync
                  page={1}
                  handler={(personalUsers) => {
                    const firstPersonalUser = personalUsers[0];
                    firstPersonalUser.firstName = 'Personal_test';
                    firstPersonalUser.middleName = '';
                    firstPersonalUser.lastName = '';
                    return personalUsers;
                  }}
                />,
              ]}
            />,
            Login,
            <MakeInboundCall phoneNumber={this.example.phoneNumber} />,
            AnswerCall,
            CheckInCallLogPageByTitle,
            <ClickCircleButton dataSign="more" />,
            <ClickItemByDataSign dataSign="transfer" />,
            UseFakeTimers,
            <TypingWordingInSearch
              chars={this.example.inputText}
              wait={false}
              dataSign="recipientsInput"
            />,
            <AdvanceTimersByTime ms={1000} />,
            UseRealTimers,
            <SelectContactFromTabs
              type={this.example.selectTab}
              name={this.example.name}
            />,
            <CheckContactSearchPanel present={false} />,
            <WaitForItemEnabled dataSign="transferBtn" />,
            (_: any, { rcMock, app }: Context) => {
              rcMock.coldTransfer(this.example.status);
            },
            <ClickItemByDataSign dataSign="transferBtn" />,
          ]}
        />
        <Then
          desc="For entry 1:
          The transfer page should be closed
										The call should be disconnected
										Pop up notification 'Call transferred'
										The current call transferred to the target record"
          action={() => {
            if (this.example.entry === 1) {
              return [
                <CheckContainsAlertMessage
                  message={this.example.notification}
                />,
                async (_: any, { rcMock }: any) => {
                  await rcMock.disConnectLatestCall();
                },
                <CheckStatusAfterColdTransfer
                  postStatus={this.example.status}
                />,
                <CheckEventTracking contain={['Cold Transfer Call']} />,
              ];
            }
          }}
        />
        <When desc="Direct to entry point2" />
        <Then
          desc="For entry 2:
          Still on the transfer page
										The call should be connected
										The pop-up notification 'Cannot transfer the call. Please try again later.'
										[L10N]"
          action={() => {
            if (this.example.entry === 2) {
              return [
                <CheckContainsAlertMessage
                  message={this.example.notification}
                />,
                <CheckStatusAfterColdTransfer
                  postStatus={this.example.status}
                />,
                <CheckEventTracking contain={['Cold Transfer Call']} />,
              ];
            }
          }}
        />
      </Scenario>
    );
  }
}
