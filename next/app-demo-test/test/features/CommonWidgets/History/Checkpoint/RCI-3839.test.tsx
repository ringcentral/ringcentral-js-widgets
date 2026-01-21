/**
 * RCI-3839: History tab with calls for CRM
 * https://test_it_domain/test-cases/RCI-3839
 * Preconditions:
 * The user has logged into 3rd party.
 * The current date is 2020/08/08
 * There are follow past calls
 *
  | Call |Caller/Callee name |Call direction |Call time |Call duration |Caller ID |
  | Call1 |No match |Inbound |Yesterday |1 hr |6501111111 |
	| Call2 |TestSingle |Outbound |17:00 |2 mins |6501234567 |
	| Call3 |[TestMultiple1, TestMultiple2] |Inbound |01:59 |24 s |6507654321 |
	| Call4 |- |Missed |08:01 |24 s |Blocked number |

 * Entry point(/s):
 *
  | Call |Display name |Call icon tooltip |Call duration |Call time |
  | Call1 |6501111111 |Inbound |01:00:00 |08/07 |
	| Call2 |TestSingle |Outbound |02:00 |17:00 |
	| Call3 |6507654321 |Inbound |00:24 |01:59 |
	| Call4 |Anonymous/Unknown |Missed |00:24 |08:01 |

 * Note(/s): For HubSpot, show 'Anonymous'; For Salesforce, show 'Unknown' for now
 * > Login CTI > History
 */
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  And,
  autorun,
  common,
  it,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  When,
  within,
} from '@ringcentral-integration/test-utils';
import dayjs from 'dayjs';

import {
  GenerateDateBeforeMinute,
  GenerateDateBeforeToday,
} from '../../../../steps/CallHistory';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockAddressBookSync,
  MockCallLogs,
  MockCallLogSync,
} from '../../../../steps/Mock';
import { NavigateToHistory } from '../../../../steps/Navigate';

const yesterday = GenerateDateBeforeToday(1);
const fiveMinsAgo = GenerateDateBeforeMinute(5);
const tenMinsAgo = GenerateDateBeforeMinute(10);
const fifteenMinsAgo = GenerateDateBeforeMinute(15);
const mockRecords = [
  {
    to: {
      phoneNumber: '8085820842',
      name: 'Something1 New1',
    },
    from: {
      phoneNumber: '6501111111',
      name: 'ac New1',
    },
    direction: 'Inbound',
    startTime: yesterday,
    duration: 25 * 60 * 60, // 1hour
    sessionId: '1',
  },
  {
    to: {
      phoneNumber: '6501234567',
      name: 'TestSingle',
    },
    from: {
      phoneNumber: '8085820841',
      name: 'ac New1',
    },
    direction: 'Outbound',
    duration: 2 * 60,
    sessionId: '2',
    startTime: fiveMinsAgo,
  },
  {
    to: {
      phoneNumber: '8085820843',
      name: 'Something1 New3',
    },
    from: {
      phoneNumber: '6507654321',
      // [TestMultiple1, TestMultiple2]
      name: 'TestMultiple1',
    },
    direction: 'Inbound',
    duration: 24,
    sessionId: '3',
    startTime: fifteenMinsAgo,
  },
  {
    to: {
      phoneNumber: '8085820843',
      name: 'Something1 New3',
    },
    from: {
      phoneNumber: '',
      name: 'Anonymous',
    },
    direction: 'Inbound',
    result: 'Missed',
    duration: 24,
    sessionId: '4',
    startTime: tenMinsAgo,
  },
];

@autorun(test)
@it
@p2
@common
@title('History tab with calls for CRM')
export class RCI3839 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  anonymousName = 'Anonymous';
  CheckThirdPartyMatchedCall = () => {
    // override this in sf/hs case
  };
  run() {
    const callLogData = generateCallLogData(mockRecords as any);
    const { Login, CreateMock, anonymousName, CheckThirdPartyMatchedCall } =
      this;
    return (
      <Scenario
        desc="History tab with calls for CRM"
        action={[
          <CreateMock enableSeparateMessageSyncMock={false} />,
          <MockCallLogs
            handler={(mockData) => {
              return {
                ...mockData,
                ...callLogData,
              };
            }}
          />,
          <MockCallLogSync mockResponse={callLogData} />,
          <MockAddressBookSync
            page={1}
            handler={(personalUsers) => {
              const user1 = personalUsers[0];
              const user2 = personalUsers[1];
              return [
                {
                  ...user1,
                  firstName: 'TestSingle',
                  middleName: '',
                  lastName: '',
                  homePhone: '+16501234567',
                },
                {
                  ...user2,
                  firstName: 'TestMultiple1',
                  middleName: '',
                  lastName: '',
                  homePhone: '+16507654321',
                },
              ];
            }}
          />,
        ]}
      >
        <When
          desc="Check the history list"
          action={[
            Login,
            NavigateToHistory,
            (async (_, { app }) => {
              await whenStateChange(() => {
                expect(
                  screen.queryAllByTestId('calls_item_wrapper'),
                ).toHaveLength(4);
              });
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The following information should be shown:
    The icon should show {Call icon}
                      The display name should show {Display name}
                      The duration and call time should show {Call duration} | {Call time}
                      The Call items should show with order:
    Call2
                      Call4
                      Call3
                      Call1
                      The icon should show {Call icon}
                      The display name should show {Display name}
                      The duration and call time should show {Call duration} | {Call time}
                      Call2
                      Call4
                      Call3
                      Call1"
        />
        <And
          desc="The 1st call item should show be call2
            > Display name should shows TestSingle
            > Call icon tooltip should shows Outbound
            > Call duration should shows 02:00
            "
          action={
            (async (_, { app }) => {
              const date = dayjs(fiveMinsAgo).format('HH:mm');
              await whenStateChange(() => {
                const callItem = screen.getAllByTestId('calls_item_wrapper')[0];
                expect(
                  within(callItem).queryByTitle('Outbound'),
                ).toBeInTheDocument();
                expect(
                  within(callItem).getByTestId('currentName'),
                ).toHaveTextContent('TestSingle');
                expect(
                  within(callItem).getByTestId('duration'),
                ).toHaveTextContent('02:00');
                // check date should be HH:mm
                expect(within(callItem).getByTestId('date')).toHaveTextContent(
                  `| ${date}`,
                );
              });
            }) as StepFunction
          }
        />
        <And
          desc="The 2nd call item should show be call4
            > Display name should shows Unknown
            > Call icon tooltip should shows Missed
            > Call duration should shows 00:24
            "
          action={
            ((_, { app }) => {
              const callItem = screen.getAllByTestId('calls_item_wrapper')[1];
              expect(
                within(callItem).queryByTitle('Missed'),
              ).toBeInTheDocument();
              // Note: For HubSpot, show 'Anonymous'; For Salesforce, show 'Unknown' for now
              expect(
                within(callItem).getByTestId('currentName'),
              ).toHaveTextContent(anonymousName);
              expect(
                within(callItem).getByTestId('duration'),
              ).toHaveTextContent('00:24');
              // check date should be HH:mm
              const date = dayjs(tenMinsAgo).format('HH:mm');
              expect(within(callItem).getByTestId('date')).toHaveTextContent(
                `| ${date}`,
              );
            }) as StepFunction
          }
        />
        <And
          desc="The 2nd call item should show be call3
            > Display name should shows TestMultiple2
            > Call icon tooltip should shows Inbound
            > Call duration should shows 00:24
            "
          action={[
            ((_, { app }) => {
              const callItem = screen.getAllByTestId('calls_item_wrapper')[2];
              expect(
                within(callItem).queryByTitle('Inbound'),
              ).toBeInTheDocument();
              expect(
                within(callItem).getByTestId('duration'),
              ).toHaveTextContent('00:24');
              // check date should be HH:mm
              const date = dayjs(fifteenMinsAgo).format('HH:mm');
              expect(within(callItem).getByTestId('date')).toHaveTextContent(
                `| ${date}`,
              );
            }) as StepFunction,
            CheckThirdPartyMatchedCall,
          ]}
        />
        <And
          desc="The 2nd call item should show be call1
            > Display name should shows 6501111111
            > Call icon tooltip should shows Inbound
            > Call duration should shows 01:00:00
            "
          action={
            (() => {
              const callItem = screen.getAllByTestId('calls_item_wrapper')[3];
              expect(
                within(callItem).queryByTitle('Inbound'),
              ).toBeInTheDocument();
              expect(
                within(callItem).getByTestId('currentName'),
              ).toHaveTextContent('6501111111');
              expect(
                within(callItem).getByTestId('duration'),
              ).toHaveTextContent('01:00:00');
              // check date should be M/D/YYYY
              const date = dayjs(yesterday).format('M/D/YYYY');
              expect(within(callItem).getByTestId('date')).toHaveTextContent(
                `| ${date}`,
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
