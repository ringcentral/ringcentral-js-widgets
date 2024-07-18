/**
 * RCI-4358: SDP enable and dialed invalid pstn number
 * https://test_it_domain/test-cases/RCI-4358
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
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-CA |8 |6 |233456 |Not Match extNot MatchPSTN |205 |223456 |Incorrect extension |223456 |
	| RC-UK |7 |7 |2334567 |Not Match extNot MatchPSTN |20 |2234567 | Incorrect extension |2234567 |

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
import { screen } from '@testing-library/react';

import type { StepProp } from '../../../lib/step';
import {
  CheckCallControlPage as BaseCheckCallControlPage,
  MakeCall,
} from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import {
  MockAccountInfo,
  MockExtensionInfo,
  MockNumberParserV2,
  MockPermission,
} from '../../../steps/Mock';
import { NavigateTo } from '../../../steps/Router';
import { SetAreaCode } from '../../../steps/Settings';

// country code should in RegionSettings.availableCountries,
// come from dialingPlan ringcentral-js-widgets/ringcentral-mock/src/platform/data/dialingPlan.json

@autorun(test.skip)
@it
@p2
@title('SDP enable and dialed invalid pstn number when EDP be enabled')
export class RCI4358 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;
  @examples(`
    | country | maxExtensionNumberLength | areaCode | phoneNumber | parsedNumber |
    | 'CA'    | 8                        | '205'    | '233456'    | '233456'     |
    | 'FR'    | 7                        | '20'     | '2334567'   | '2334567'    |
    | 'US'    | 7                        | '20'     | '2334567'   | '2334567'    |
    | 'PR'    | 7                        | '20'     | '2334567'   | '2334567'    |
  `)
  run() {
    const { Login, CreateMock, CheckCallControlPage } = this;

    const { country } = this.example;

    const thenActions = ['US', 'PR', 'CA'].includes(country) ? (
      <>
        <When
          desc="navigate to region setting page"
          action={[<NavigateTo path="/settings/region" />]}
        />
        <Then
          desc="set areaCode not be there"
          action={() => {
            expect(
              screen.queryByTestId('areaCodeInputField'),
            ).not.toBeInTheDocument();
          }}
        />
      </>
    ) : (
      <>
        <And
          desc="1. navigate to region setting page
                     2. set area code"
          action={[<NavigateTo path="/settings/region" />, SetAreaCode]}
        />
        <When
          desc="Make an outbound call"
          action={[<NavigateTo path="/dialer" />, MakeCall]}
        />
        <Then
          desc="Checked the dialing number on call control page is ${parsedNumber}"
          action={CheckCallControlPage}
        />
      </>
    );

    return (
      <Scenario
        desc="SDP enable and dialed invalid pstn number"
        action={({ maxExtensionNumberLength, phoneNumber, country }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength =
                maxExtensionNumberLength;
              return mockData;
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = country;
              return mockData;
            }}
          />,
          <MockPermission
            repeat={2}
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
          <MockNumberParserV2
            isDefaultInit={false}
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              (mockData.results[0].numberDetails as any).extensionNumber =
                phoneNumber;
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />
        {thenActions}
      </Scenario>
    );
  }
}
