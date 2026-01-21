/**
 * RCI-4362: Call to external when the Ext changes
 * https://test_it_domain/test-cases/RCI-4362
 * Preconditions:
 * CTI app is integrated,
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as 8digits
 * User has default area code as 205
 * Exist an extension number : 248 2217
 * Exist an external real number (PSTN) :(205)248 2217
 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * Entry point(/s):
 * Login SW by admin account
 */
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../__mock__/generateDialPlanData';
import { CheckCallControlPage, MakeCall } from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import { Logout } from '../../../steps/Logout';
import {
  CreateMock,
  MockAccountInfo,
  MockCallLogs,
  MockDialingPlan,
  MockExtensionInfo,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
  MockPermission,
  MockPresence,
} from '../../../steps/Mock';
import { NavigateTo } from '../../../steps/Router';
import { SetAreaCode } from '../../../steps/Settings';

@autorun(test)
@it
@p2
@title('Call to external when the Ext changes')
@common
export class RCI4362 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  Logout: StepFunction<any, any> | null = (<Logout shouldReset />);
  @examples(`
    | maxExtensionNumberLength | areaCode | phoneNumber | parsedNumber    | e164            |
    | 7                        | '114'    | '3346365'   | '0114 334 6365' | '+441143346365' |
  `)
  run() {
    const { Login, CreateMock, Logout } = this;
    return (
      <Scenario
        desc="Call to external when the Ext changes"
        action={({ maxExtensionNumberLength, phoneNumber, e164 }: any) => [
          CreateMock,
          <MockAccountInfo
            repeat={2}
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength =
                maxExtensionNumberLength;
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
                ] as never);
            }}
          />,
          <MockExtensionsList
            isDefaultInit={false}
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData({
                firstName: 'John',
                lastName: 'Doe702',
                extensionNumber: phoneNumber,
              }),
            })}
          />,
          <MockNumberParserV2
            isDefaultInit={false}
            handler={(mockData) => {
              mockData.results[0].category = Category.Ambiguous;
              mockData.results[0].originalString = phoneNumber;
              mockData.results[0].formats[0].e164Extended = e164;
              return mockData;
            }}
          />,
          <MockCallLogs repeat={0} />,
          <MockPresence repeat={0} />,
          <MockMessageSync repeat={0} />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = 'GB';
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => {
              return [generateDialPlanData('44', '44', 'United Kingdom', 'GB')];
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />
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
          desc="Checked the dialing number on call control page is ${phoneNumber}, and match extension name"
          action={({ phoneNumber }: any) => {
            return (
              <CheckCallControlPage
                name="John Doe702"
                parsedNumber={phoneNumber}
              />
            );
          }}
        />
        <Given
          desc="Relogin APP"
          action={({ parsedNumber, e164 }: any) => [
            Logout,
            <MockNumberParserV2
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.results[0].originalString = parsedNumber;
                mockData.results[0].formats[0].e164Extended = e164;
                return mockData;
              }}
            />,
            Login,
          ]}
        />
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
      </Scenario>
    );
  }
}
