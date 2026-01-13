/**
 * RCI-4348: EDP enable and send to message incorrect number
 * https://test_it_domain/test-cases/RCI-4348
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR
 * Entry point(/s):
 * Open CTI >Go to Settings page > Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut > Set region country same with account country/ Navigate to dial page
 * Entry point(/s):
 * Open CTI >Go to Settings page > Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut > Set region country same with account country/ Navigate to dial page
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Default area code |parsed number |NPC category |
  | RC-CA |8 |7 |3135006 |205 |3135006 |Incorrect extension |

 */
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckInvalidSmsPrompt,
  SendSMS,
} from '../../../../../../steps/Messages';
import {
  MockAccountInfo,
  MockCompanyPager,
  MockGetPhoneNumber,
  MockNumberParserV2,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

@autorun(test.skip)
@common
@it
@p1
@title('EDP enable and send to message incorrect number')
export class MessageIncorrectNumber extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | maxExtensionLength | phoneNumber | DefaultAreaCode | parsedNumber |
    | 8                  | '3135006'   | '205'           | '3135006'    |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="EDP enable and send to message incorrect number"
        action={({ maxExtensionLength, parsedNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockCompanyPager
            isDefaultInit={false}
            requestInvalid
            responseCode={400}
          />,
          MockGetPhoneNumber,
          <MockNumberParserV2
            isDefaultInit={true}
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              mockData.results[0].numberDetails.extensionNumber = parsedNumber;
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />

        <And
          desc="navigate to message page"
          action={<NavigateTo path="/composeText" />}
        />

        <When
          desc="> Input {dialing text} in 'To' filed
										> Input test text in text box
										> Click send button"
          action={[SendSMS]}
        />
        <Then
          desc="Check on the conversation page would prompt an error message : 'Please enter a valid phone number.'"
          action={CheckInvalidSmsPrompt}
        />
      </Scenario>
    );
  }
}
