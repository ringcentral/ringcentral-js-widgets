/**
 * RCI-6810: Error handling when sending MMS
 * https://test_it_domain/test-cases/RCI-6810
 * Preconditions:
 * User has logged into the 3rd party
 * CTI app is integrated.
 * Configure the below accounts:
 *
  | Accounts |Permission |
  | Account_1 |Has sent SMS permission |
	| Account_2 |Has SMS permission but no phone number can be allowed to send SMS |
	| Account_3 |Only has pager permission |

 * Note(/s):
 * Turn onSMS permission:
	Go to admin web > Account Info > 'SMS/MMS Feature Availability' selection
 * RC UK/EU/AU, BT belongs to Account_3 type
 * Go to admin web > Account Info > 'SMS/MMS Feature Availability' selection
 * Entry point(/s):
 *
  | Entry  |Accounts     |Input value |Validation messages |
  | 1 |Account_1 |invalid value |'Please enter a valid phone number.' |
	| 2 |Account_1 |international number(eg. +448003322019) |'Sending SMS to international phone number is not supported' |
	| 3 |Account_1 |main*ext number(eg. +18444241754*102) |'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.' |
	| 4 |Account_2 |DID number(eg. +12092322323) |'AvalidPhoneNumberisrequiredtosendtextmessagetorecipientsoutsideofyourcompany,PleasecontactyourAdministratortoaddadirectnumbertoyouraccount.' |
	| 5 |Account_3 |DID number(eg. +12092322323) |'You don't have permission to send messages to recipients outside of your organization.' |

 * Note: invalid value:
 * invalid symbol eg: asdasdasd
 * invalid ext.
 * invalid number
 * > Login CTI app with the {Accounts}
 * > Go to the 'Messages' tab
 * > Click 'Compose Text' icon
 */
import {
  p3,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  UseFakeTimers,
  AdvanceTimersByTime,
  WaitForRenderReady,
  UseRealTimers,
  screen,
  StepProp,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../../steps/Alert';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CheckAttachment, CheckButton } from '../../../../../../steps/Messages';
import {
  createMockFile,
  MB,
} from '../../../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../../../steps/Messages/Files/selectFileFn';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockPermission,
  MockPostMMS,
} from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';
import { InputToField } from '../../../../../../steps/dialer';

jest.mock('use-file-upload', () => {
  const { selectFileFn } = jest.requireActual(
    '../../../../../../steps/Messages/Files/selectFileFn',
  );

  return {
    __esModule: true,
    useFileUpload: () => {
      return [null, selectFileFn];
    },
  };
});

@autorun(test.skip)
@it
@p3
@common
@title('Error handling when sending MMS')
export class ErrorHandlingSendMMS extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      inputValue: 'invalid value',
      Mocks: () => ({}),
      alert: 'Please enter a valid phone number.',
    },
    {
      inputValue: '+448003322019',
      Mocks: (
        <MockPostMMS
          status={400}
          handler={() => {
            return {
              errorCode: 'InvalidParameter',
              message: 'International MMS feature is not available',
              errors: [
                {
                  errorCode: 'MSG-383',
                  message: 'International MMS feature is not available',
                },
              ],
            } as any;
          }}
        />
      ),
      alert: 'Something wrong happened when send message.',
    },
    {
      inputValue: '+18444241754*102',
      Mocks: (
        <MockPostMMS
          status={400}
          handler={() => {
            return {
              errorCode: 'InvalidParameter',
              message: 'Sending SMS from/to extension numbers is not available',
              errors: [
                {
                  errorCode: 'MSG-246',
                  message:
                    'Sending SMS from/to extension numbers is not available',
                },
              ],
            } as any;
          }}
        />
      ),
      alert:
        'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.',
    },
    {
      inputValue: '+12092322323',
      Mocks: (
        <MockGetPhoneNumber
          getPhoneNumberData={(mockData) => {
            // mock sms sender list
            mockData.records[0].phoneNumber = '+16507778888';
            // no allowed to send sms
            mockData.records[0].features = ['CallerId'];
            return {
              ...mockData,
              records: [mockData.records[0]],
            };
          }}
        />
      ),
      alert:
        'A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account.',
    },
    {
      inputValue: '+12092322323',
      Mocks: () => (
        <MockPermission
          handler={(features) => {
            return features
              .filter((feature) => feature.id !== 'SMSSending')
              .concat([
                {
                  id: 'SMSSending',
                  available: false,
                  reason: {
                    code: 'AccountLimitation',
                    message: '',
                    permission: '',
                  },
                  params: [],
                },
              ]);
          }}
        />
      ),
      alert:
        "You don't have permission to send messages to recipients outside of your organization.",
    },
  ])
  run() {
    const TEST_FILE = {
      file: createMockFile('file1.jpg', 0.1 * MB),
      size: 0.1 * MB,
      name: 'file1.jpg',
    };
    return (
      <Scenario desc="Error handling when sending MMS">
        <When
          desc="> Go to entry points
                > Enter an {Input value} in the 'To' field
                > Click the attachment icon, select 1 file, and click OK button
                > Click the 'Send' button"
          action={[
            this.CreateMock,
            this.example.Mocks,
            this.Login,
            NavigateToComposeText,
            <InputToField input={this.example.inputValue} needEnter />,
            () => {
              selectFileFn.mockImplementation((args, cb) => {
                cb([{ file: TEST_FILE.file }]);
              });
            },
            <ClickItemByDataSign dataSign="attachButton" />,
            <CheckAttachment expectedFiles={[TEST_FILE.file]} />,
            <CheckButton expectDisabled={false} />,
            <ClickItemByDataSign dataSign="messageButton" />,
          ]}
        />
        <Then
          desc="Validation message displays as {Validation messages}
										[L10N]"
          action={<CheckAlertMessage message={this.example.alert} />}
        />
        <When
          desc="Check the message after 5 seconds"
          action={[
            UseFakeTimers,
            <AdvanceTimersByTime ms={5000} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then
          desc="This message does not auto fade out, should only be manually closed by user."
          action={<CheckAlertMessage message={this.example.alert} />}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p3
@common
@title('Error handling when sending MMS - no SMS/Pager feature')
export class NoSMSFeature extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    return (
      <Scenario desc="Error handling when sending MMS - no SMS/Pager feature">
        <When
          desc="> Go to entry points
                > Remove SMS and pager feature from Admin web, go to Messages"
          action={[
            this.CreateMock,
            <MockPermission
              handler={(features) => {
                const permission = features
                  .filter(
                    (feature) =>
                      !['SMSReceiving', 'PagesReceiving'].includes(feature),
                  )
                  .concat([
                    {
                      id: 'SMSReceiving',
                      available: false,
                    },
                    {
                      id: 'PagesReceiving',
                      available: false,
                    },
                  ]);
                return permission;
              }}
            />,
            this.Login,
            NavigateToMessagesTab,
          ]}
        />
        <Then
          desc="There is no 'Text' sub-tab displays"
          action={() => {
            expect(screen.queryByTestId('Text')).not.toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
