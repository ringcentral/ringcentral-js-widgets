/**
 * RCI-5557: Disable area code in RC-CA/US/PR
 * https://test_it_domain/test-cases/RCI-5557
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * App has EDP permission
 * Set ' Outbound Call Prefix' to enable inadmin web
 * User Set'Outbound Call Prefix' as{outboundCallPrefix}inSW:SCP> login SW > More > Account Settings
 * User has 'Max extension number length' as{maxExtensionNumberLength}digits
 * Set 'Smart Dial Plan Routing' is {sdpEnabled} inSCP
 * Userdefault area code of main number/primary number is '343' and '(343) 270-4461' is a valid PSTN number
 * Entry point(/s):
 * > Open CTI navigate toNavigate to dial page
 *
  | Country |maxExtensionNumberLength |outboundCallPrefix |originalStrings |defaultAreaCode |sdpEnabled |parsed number |NPC category |Connect result |
  | CA |7 |9 |90011112 |'' |false |0011112 |Extension |Incorrect extension |
	| CA |7 |'' |2704461 |'' |true |2704461 |PSTN |The call is temporarily unavailable |
	| US |6 |9 |2704461 |'' |false |2704461 |PSTN |The call is temporarily unavailable |
	| PR |7 |'' |0011112 |'' |false |0011112 |Extension |Incorrect extension |

 */
import {
  p1,
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  examples,
  StepProp,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';
import {
  CheckCallControlPage as BaseCheckCallControlPage,
  CheckParseApiCalledWithParams,
  MakeCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  MockAccountInfo,
  MockDialingPlan,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
  MockPermission,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test.skip)
@it
@p1
@title('Disable area code in RC-CA/US/PR')
export class RCI5557 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;
  @examples(`
    | country | maxExtensionLength | ocp | defaultAreaCode | sdpEnabled | originalStrings | parsedNumber | e164ParsedNumber | category  |
    | 'CA'    | 7                  | '9' | ''              | false      | '90011112'      | '0011112'    | '+10011112'      | 'Regular' |
    | 'CA'    | 7                  | ''  | ''              | true       | '2704461'       | '2704461'    | '+12704461'      | 'Regular' |
    | 'US'    | 6                  | '9' | ''              | false      | '2704461'       | '2704461'    | '+12704461'      | 'Regular' |
    | 'PR'    | 7                  | ''  | ''              | false      | '0011112'       | '0011112'    | '+10011112'      | 'Regular' |
  `)
  run() {
    const { Login, CreateMock, CheckCallControlPage } = this;
    return (
      <Scenario desc="Should not pass area code in CA/US/PR">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockDialingPlan
              handler={() => [
                generateDialPlanData('1', '1', 'United States', 'US'),
                generateDialPlanData('39', '39', 'Canada', 'CA'),
                generateDialPlanData('1', '179', 'Puerto Rico', 'PR'),
              ]}
            />,
            <MockAccountInfo
              handler={(mockData) => {
                mockData.limits.maxExtensionNumberLength =
                  this.example.maxExtensionNumberLength;
                return mockData;
              }}
            />,
            <MockExtensionInfo
              handle={(mockData) => {
                mockData.regionalSettings.homeCountry.isoCode =
                  this.example.country;
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
                      available: this.example.sdpEnabled,
                    },
                    {
                      id: 'OutboundCallPrefix',
                      available: !!this.example.ocp,
                      params: [
                        { name: 'OutboundCallPrefix', value: this.example.ocp },
                      ],
                    },
                  ]);
              }}
            />,
            MockGetPhoneNumber,
          ]}
        />
        <Given desc="Login APP" action={Login} />
        <When
          desc=">Go to theEntryfollow{Path}
										> Check the Network with inspect tool
										> Navigate to the API requestnumber-parser/parse"
          action={[
            <MockNumberParserV2
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.results[0].category = this.example.category;
                mockData.results[0].formats[0] = {
                  ...mockData.results[0].formats[0],
                  e164Extended: this.example.e164ParsedNumber,
                  e164: this.example.e164ParsedNumber,
                };
                return mockData;
              }}
            />,
            <MakeCall phoneNumber={this.example.e164ParsedNumber} />,
            CheckCallControlPage,
          ]}
        />
        <Then
          desc="Our CTI passed parameters below
	                  {originalStrings}
										{outboundCallPrefix}
										{defaultAreaCode}
										{maxExtensionNumberLength}
										contextSource:'Account'
										Can Navigateto the call control page with {parsed number}
										Note(/s):
										For the CRM app, Check result will replace 'the call control page' with 'the call log page'
										ContextSource:The app will not pass user details to the apieg:country,brand, but will let the api go to the account to get the information"
          action={[
            <NavigateTo path="/dialer" />,
            (_, { phone }) => {
              jest.spyOn(phone.numberValidate, '_parsingPhoneNumber');
            },
            <MakeCall phoneNumber={this.example.originalStrings} />,
            <CheckParseApiCalledWithParams
              maxExtensionNumberLength={this.example.maxExtensionLength}
              outboundCallPrefix={this.example.ocp}
              phoneNumber={this.example.originalStrings}
              areaCode={this.example.defaultAreaCode}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
