/**
 * RCI-5545: SMS to 988 with Non-US DL
 * https://test_it_domain/test-cases/RCI-5545
 * Preconditions:
 * 1. It have already installed CTI.
 * Entry point(/s):
 * 
  | Account |Region |DL |Phone number |Include 988 extension users |
  | account 1 |UK |UK |988 |No |
	| account 2 |UK |UK |+1988 |No |

 * > Login CTI with{Account}
 * > send a message to{Phone number}
 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CheckContainsAlertMessage } from '../../../../../../steps/Alert';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockCompanyPager,
  MockMessageSync,
  MockPostSMS,
  MockGetPhoneNumber,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

import specialErrorMock from './mocks/errorResponseMock.json';
import extErrorMock from './mocks/extErrorMock.json';
import extMock from './mocks/extResponseMock.json';
import specialMock from './mocks/specialServiceResponseMock.json';

@autorun(test)
@it
@p2
@title('SMS to 988/+1988 with Non-US DL')
class smsToNoSpecialServiceAndNoExtension extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;

  @examples([{ number: '988' }, { number: '+1988' }])
  run() {
    const { Login, CreateMock } = this;

    const number = this.context.example.number;
    const isSpecialService = number === '+1988';
    return (
      <Scenario
        desc="EDP enabled and send message to 988 in a no-support special service country
      , and the account not have a extension number is 988"
      >
        <When
          desc="Init mock and set up mocks data"
          action={[
            CreateMock,
            MockGetPhoneNumber,
            <MockMessageSync repeat={0} />,
            <MockNumberParserV2
              isDefaultInit={true}
              handler={() => {
                return (isSpecialService ? specialMock : extMock) as any;
              }}
            />,
            <MockCompanyPager
              isDefaultInit
              responseCode={400}
              handler={() => {
                return isSpecialService ? specialErrorMock : extErrorMock;
              }}
            />,
            <MockPostSMS
              isDefaultInit
              handler={() => {
                return (
                  isSpecialService ? specialErrorMock : extErrorMock
                ) as any;
              }}
              status={400}
            />,
          ]}
        />
        <Given desc="login App" action={Login} />
        <Then
          desc={`Go to compose text page, and trying to send a message to ${number}`}
          action={[
            <NavigateTo path="/composeText" />,
            <SendSMS phoneNumber={number} />,
          ]}
        />
        <Then
          desc="The message send failed.
										For phone number is 988, 'Please enter a valid phone number.'is prompted
										For phone number is +1988, 'Sending SMS to short numbers is not available'is prompted[L10N]"
          action={
            <CheckContainsAlertMessage
              message={
                isSpecialService
                  ? 'Sending SMS to short numbers is not available.'
                  : 'Please enter a valid phone number.'
              }
            />
          }
        />
      </Scenario>
    );
  }
}
