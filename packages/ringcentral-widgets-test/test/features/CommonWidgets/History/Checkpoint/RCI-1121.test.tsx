/**
 * RCI-1121: History tab with calls
 * https://test_it_domain/test-cases/RCI-1121
 * Preconditions:
 * The user has logged into 3rd party.
 * The current date is 2020/08/08
 * There are follow past calls
 *
  | Call |Caller/Callee name |Call direction |Call time |Call duration |Caller ID |
  | Call1 |No match |Inbound |Yesterday |1 hr |6501111111 |
	| Call2 |TestSingle |Outbound |17:00 |2 mins |6501234567 |
	| Call3 |[TestMultiple1, TestMultiple2] |Outbound |01:59 |24 s |6507654321 |
	| Call4 |- |Missed |08:01 |24 s |Blocked number |

 * Entry point(/s):
 *
  | Call |Display name |Call icon |Call duration |Call time |
  | Call1 |6501111111 |Inbound |01:00:00 |08/07 |
	| Call2 |TestSingle |Outbound |02:00 |17:00 |
	| Call3 |Dropdown list |Outbound |00:24 |01:59 |
	| Call4 |Blocked |Missed |00:24 |08:01 |

 * > Login CTI > History
 */

import {
  common,
  StepFunction,
  autorun,
  examples,
  Given,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
  it,
} from '@ringcentral-integration/test-utils';

import {
  CheckCallType,
  CheckCallName,
  CheckCallTime,
  CheckCallDuration,
  GenerateDateBeforeMinute,
  GenerateDateBeforeToday,
} from '../../../../steps/CallHistory';
import { NavigateToHistory } from '../../../../steps/Navigate';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  MockCallLogSync,
  MockCallLogs,
  generateCallLogData,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../steps/Mock';

const yesterday = GenerateDateBeforeToday(1);
const fiveMinsAgo = GenerateDateBeforeMinute(5);
const tenMinsAgo = GenerateDateBeforeMinute(10);
const fifteenMinsAgo = GenerateDateBeforeMinute(15);
const mockRecords = [
  {
    to: {
      phoneNumber: '+18085820842',
      name: 'Something1 New1',
    },
    from: {
      phoneNumber: '+16501111111',
    },
    direction: 'Inbound',
    startTime: yesterday,
    duration: 60 * 60,
    sessionId: '1',
  },
  {
    to: {
      phoneNumber: '+18085820841',
      name: 'TestSingle',
    },
    from: {
      phoneNumber: '+18085820842',
      name: 'Something1 New1',
    },
    direction: 'Outbound',
    startTime: fiveMinsAgo,
    duration: 2 * 60,
    sessionId: '2',
  },
  {
    to: {
      phoneNumber: '+16507654321',
      name: 'TestMultiple1',
    },
    from: {
      phoneNumber: '+18085820842',
      name: 'Something1 New1',
    },
    direction: 'Outbound',
    duration: 24,
    sessionId: '3',
    startTime: fifteenMinsAgo,
  },
  {
    to: {
      phoneNumber: '+18085820842',
      name: 'Something1 New1',
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
const expectedValues = [
  {
    callType: 'Outbound',
    name: 'TestSingle',
    duration: '02:00',
    time: fiveMinsAgo,
  },
  {
    callType: 'Missed',
    name: 'Anonymous',
    duration: '00:24',
    time: tenMinsAgo,
  },
  {
    callType: 'Outbound',
    name: 'TestMultiple1',
    duration: '00:24',
    time: fifteenMinsAgo,
    matchNames: ['TestMultiple1', 'TestMultiple1'],
  },
  {
    callType: 'Inbound',
    name: '+16501111111',
    duration: '01:00:00',
    time: yesterday,
  },
];

@autorun(test.skip)
@it
@common
@p2
@title('History tab with calls')
export class HistoryWithCalls extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  historyTabDataSign = 'History';

  @examples(`
    | callHistoryRecords             | expectedValues                    |
    | ${JSON.stringify(mockRecords)} | ${JSON.stringify(expectedValues)} |
  `)
  run() {
    const { Login = CommonLogin, CreateMock } = this;
    return (
      <Scenario desc="History tab with calls">
        <Given
          desc="Create mock"
          action={() => {
            const callLogData = generateCallLogData(mockRecords);
            return [
              CreateMock,
              <MockExtensionsList
                handler={(mockData) => ({
                  ...mockData,
                  ...mockExtensionsListData([
                    {
                      phoneNumber: '+18085820841',
                      phoneNumberUsageType: 'DirectNumber',
                      firstName: 'TestSingle',
                      lastName: '',
                    },
                    {
                      phoneNumber: '+16507654321',
                      phoneNumberUsageType: 'DirectNumber',
                      firstName: 'TestMultiple1',
                      lastName: '',
                    },
                    {
                      phoneNumber: '+16507654321',
                      phoneNumberUsageType: 'ContactNumber',
                      firstName: 'TestMultiple2',
                      lastName: '',
                    },
                  ]),
                })}
              />,
              <MockCallLogSync mockResponse={callLogData} />,
              <MockCallLogs
                handler={(mockData) => {
                  return {
                    ...mockData,
                    ...callLogData,
                  };
                }}
              />,
            ];
          }}
        />
        <And desc="Login CTI" action={Login} />
        <When
          desc="Navigate to history page"
          action={<NavigateToHistory testId={this.historyTabDataSign} />}
        />

        <Then
          desc="The following information should be shown and displayed by time order"
          action={[
            CheckCallType,
            CheckCallName,
            CheckCallDuration,
            CheckCallTime,
          ]}
        />
      </Scenario>
    );
  }
}
