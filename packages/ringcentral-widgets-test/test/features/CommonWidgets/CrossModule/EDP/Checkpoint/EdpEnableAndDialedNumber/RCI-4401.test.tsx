/**
 * RCI-4401: Can call PSTN when dialed number match valid PSTN (DT>MEL)
 * https://test_it_domain/test-cases/RCI-4401
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR not support in 22.2.20
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-UK |7 |8 |3135 0033 |Match valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-UK |7 |8 |3135 0033 |Match valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  p1,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import type { StepProp } from '../../../../../../lib/step';
import { CheckCallControlPage, MakeCall } from '../../../../../../steps/Call';
import { CheckLogBaseInfoActive } from '../../../../../../steps/CallLog';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CheckIsCRM } from '../../../../../../steps/IDB';
import {
  CreateMock,
  MockAccountInfo,
  MockDialingPlan,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
} from '../../../../../../steps/Mock';
import { generateDialPlanData } from '../../../../../../__mock__/generateDialPlanData';

@autorun(test)
@it
@p1
@title('Can call PSTN when dialed number match valid PSTN (DT>MEL)')
@common
export class DialPSTNEDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  appName = 'common';

  @examples(`
    | maxExtensionLength | phoneNumber | areaCode | parsedNumber    | e164            |
    | 7                  | '31350033'  | '28'     | '028 3135 0033' | '+442831350033' |
  `)
  run() {
    const { Login, CreateMock, appName } = this;
    return (
      <Scenario
        desc="make an outbound to pstn when edp enabled"
        action={({ maxExtensionLength, parsedNumber, e164 }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '1', 'United States', 'US'),
              ];
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = 'GB';
              return mockData;
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
            handler={(mockData) => {
              mockData.results[0].category = Category.Regular;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                e164Extended: e164,
                e164,
              };
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="> Input{dialing text}in 'To' filed
										> Click call button"
          action={MakeCall}
        />
        <Then
          desc="Checked the dialing number on call control page is{parsed number}
										Checked Contact on the call control page is {Contact}"
          action={() => {
            if (CheckIsCRM(appName)) {
              return (
                <CheckLogBaseInfoActive
                  phoneNumber={this.example.parsedNumber}
                />
              );
            }
            return (
              <CheckCallControlPage parsedNumber={this.example.parsedNumber} />
            );
          }}
        />
      </Scenario>
    );
  }
}
