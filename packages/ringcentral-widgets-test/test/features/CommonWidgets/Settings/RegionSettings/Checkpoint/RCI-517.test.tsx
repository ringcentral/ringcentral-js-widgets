/**
 * RCI-517: Region setting for multiple dialing plans (None US/CA)
 * https://test_id_domain/test-cases/RCI-517
 * Preconditions:
 * User is logged into 3rd party
 * RC account has2 or more dialing plans, none of the dialing plans is US or CA (e.g UK and FR)
 * The user has never logged in RC app
 * Entry point(/s):
 *
  | Entry |Dialing plan |Country |
  | 1 |1 |UK |
	| 2 |2 |France |

 * > Login CTI app
 * > Go to the 'Settings' page
 * > Clickthe 'Region' setting option
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
  StepProp,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockDialingPlan,
} from '../../../../../steps/Mock';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  ClickSaveButton,
  CheckCountryCodeField,
  CheckCountryCodeHint,
  CheckAreaCodeField,
  SelectCountryCode,
} from '../../../../../steps/Settings';
import {
  CheckActiveCallExist,
  MakeCall,
  CheckCallControlPage,
} from '../../../../../steps/Call';
import { NavigateTo } from '../../../../../steps/Router/action';
import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';

@autorun(test)
@it
@p2
@title('Region setting for multiple dialing plans (None US/CA)')
export class RegionSettingForMultipleDialingPlan extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | isoCode | callingMode | countryName      | phoneNumber |
    | 'GB'    | '44'        | 'United Kingdom' | '31350031'  |
    | 'FR'    | '33'        | 'France'         | '31350032'  |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Region setting for multiple dialing plans (None US/CA)"
        action={async ({ isoCode }: any) => [
          CreateMock,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('33', '44', 'France', 'FR'),
              ];
            }}
          />,
        ]}
      >
        <When desc="Go to {Entry}" action={Login} />
        <Then
          desc="Page is displayed as following:
                Text 'Please select the country you locate in. This will be used for local dialing and phone number formatting.'
                Dropdown list 'Country',the default value is the{Country}of login account"
          action={async ({ callingMode, countryName }: any) => [
            <NavigateTo path="/settings/region" />,
            <CheckCountryCodeHint hint="Please select the country you locate in. This will be used for local dialing and phone number formatting." />,
            <CheckCountryCodeField
              countryCode={`(+${callingMode}) ${countryName}`}
            />,
          ]}
        />
        <When
          desc="Select the {Country} in the {Dialing plan} of region setting"
          action={async ({ callingMode, countryName }: any) => (
            <SelectCountryCode
              countryCode={`(+${callingMode}) ${countryName}`}
            />
          )}
        />
        <Then
          desc="The country name and country code show up"
          action={async ({ callingMode, countryName }: any) => [
            <CheckCountryCodeField
              countryCode={`(+${callingMode}) ${countryName}`}
            />,
            <CheckAreaCodeField value="" />,
          ]}
        />
        <When
          desc="Click 'Save' and go to Active call/History page"
          action={async ({ phoneNumber }: any) => [
            ClickSaveButton,
            <MakeCall status="connected" phoneNumber={phoneNumber} />,
            CheckActiveCallExist,
          ]}
        />
        <Then
          desc="The phone number is displayed in local format based on the current{Dialing plan}
					    Note(s): For Dynamics & Zendesk & Hubspot : the number are displayed as E164 format"
          action={async ({ phoneNumber, callingMode }: any) => [
            <CheckCallControlPage
              parsedNumber={`+${callingMode} ${phoneNumber}`}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
