/**
 * RCI-4366: SDP enable and send message to invalid pstn number
 * https://test_it_domain/test-cases/RCI-4366
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR
 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * Open CTI >Go to Settings page > Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut > Set region country same with account country/ Navigate to dial page
 * Entry point(/s):
 * Open CTI >Go to Settings page > Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut > Set region country same with account country/ Navigate to dial page
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |
  | RC-CA |8 |6 |223456 |Not Match extNot MatchPSTN |205 |223456 |Incorrect extension |
	| RC-UK |7 |7 |2234567 |Not Match extNot MatchPSTN |20 |2234567 | Incorrect extension |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  And,
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../lib/step';
import { CloseAlertMessage } from '../../../steps/Alert';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CheckInvalidSmsPrompt, SendSMS } from '../../../steps/Messages';
import {
  MockAccountInfo,
  MockCompanyPager,
  MockDialingPlan,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
  MockPermission,
} from '../../../steps/Mock';
import { NavigateTo } from '../../../steps/Router/action';
import { SetAreaCode } from '../../../steps/Settings';
import { generateDialPlanData } from '../../../__mock__/generateDialPlanData';

@autorun(test.skip)
@it
@p2
@title('SDP enable and send message to invalid pstn number')
export class RCI4366 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  @examples(`
    | country | maxExtensionNumberLength | areaCode | phoneNumber | parsedNumber |
    | 'CA'    | 8                        | '205'    | '223456'    | '223456'     |
    | 'GB'    | 7                        | '20'     | '1234567'   | '1234567'    |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="SDP enable and send message to invalid pstn number"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength =
                this.context.example.maxExtensionNumberLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              return features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
            }}
          />,
          <MockCompanyPager
            isDefaultInit={false}
            requestInvalid
            responseCode={400}
          />,
          MockGetPhoneNumber,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode =
                this.example.country;
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '39', 'Canada', 'CA'),
              ];
            }}
          />,
          <MockNumberParserV2
            isDefaultInit={true}
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              mockData.results[0].numberDetails.extensionNumber =
                this.example.parsedNumber;
              mockData.results = [mockData.results[0]];
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />
        <And
          desc="1. navigate to region setting page
                     2. set area code"
          action={[
            <NavigateTo path="/settings/region" />,
            () => {
              if (this.example.country !== 'CA') {
                return [
                  <SetAreaCode areaCode={this.example.areaCode} />,
                  CloseAlertMessage,
                ];
              }
            },
          ]}
        />
        <When
          desc="Send message"
          action={[<NavigateTo path="/composeText" />, SendSMS]}
        />
        <Then
          desc="Check on the conversation page would prompt an error message : Please enter a valid phone number.         "
          action={CheckInvalidSmsPrompt}
        />
      </Scenario>
    );
  }
}
