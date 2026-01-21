/**
 * RCI-516: Region setting for only one dialing plan
 * https://test_it_domain/test-cases/RCI-516
 * Preconditions:
 *
  | Accounts |DL type(Dialing plan) |showAreaCode |
  | 1 |Non US/CA/PR |True |
	| 2 |RC US/RC CA |False |

 * 3. The user has never logged in RC app
 * Entry point(/s):
 * > Login CTI app with {Accounts}
 */
import {
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p2,
  title,
  type StepProp,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockDialingPlan,
  MockExtensionInfo,
} from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';
import { NavigateToRegionSettings } from '../../../../../steps/Navigate/actions/NavigateToRegionSettings';
import {
  CheckAreaCodeField,
  CheckCountryCodeField,
  CheckCountryCodeHint,
} from '../../../../../steps/Settings';

// An improvement is created to adjust the country hint message
// RCINT-38284

interface ExampleItem {
  countryId: string;
  countryCode: string;
  countryName: string;
  countryCallingCode: string;
  showAreaCode: boolean;
  countryHint: string;
}

@autorun(test)
@it
@p2
@title('Region setting for only one dialing plan')
@common
export class RegionSettingForOneDialingPlan extends Step {
  Login?: StepProp;
  CreateMock?: StepProp;

  @examples(`
    | countryId | countryCode | countryName      | countryCallingCode | showAreaCode | countryHint                                                       |
    | '1'       | 'US'        | 'United States'  | '1'                | false        | 'Please set your area code. This will be used for local dialing.' |
    | '39'      | 'GB'        | 'United Kingdom' | '44'               | true         | ''                                                                |
  `)
  run() {
    const {
      CreateMock = CommonCreateMock,
      Login = <CommonLogin CreateInstance={CreateInstance} />,
    } = this;
    return (
      <Scenario
        desc="Region setting for only one dialing plan"
        action={(example: ExampleItem) => [
          CreateMock,
          <MockExtensionInfo
            handle={(mockData) => {
              const country = mockData.regionalSettings.homeCountry;
              country.id = example.countryId;
              country.isoCode = example.countryCode;
              country.name = example.countryName;
              country.callingCode = example.countryCallingCode;
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => [
              generateDialPlanData(
                example.countryCallingCode,
                example.countryId,
                example.countryName,
                example.countryCode,
              ),
            ]}
          />,
        ]}
      >
        <Given desc="Logged in Third-part APP and CTI" action={Login} />
        <When
          desc="Go to entry point, navigate to region setting page"
          action={[NavigateToSettings, NavigateToRegionSettings]}
        />
        <Then
          desc="Region displays as following detail:
										Text:Please set your area code. This will be used for local dialing.
										Dropdown list: Country (Only display the country of the company account)
										Show area code as {showAreaCode}[L10N]"
          action={({
            countryName,
            countryCallingCode,
            showAreaCode,
            countryHint,
          }: ExampleItem) => [
            <CheckCountryCodeHint hint={countryHint} />,
            <CheckCountryCodeField
              countryCallingCode={countryCallingCode}
              countryName={countryName}
            />,
            <CheckAreaCodeField exist={showAreaCode} />,
          ]}
        />
      </Scenario>
    );
  }
}
