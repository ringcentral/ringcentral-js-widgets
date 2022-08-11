/**
 * RCI-4362: Call to external when the Ext changes
 * https://test_id_domain/test-cases/RCI-4362
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

import { StepProp } from '../../../lib/step';
import { CheckCallControlPage, MakeCall } from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import {
  MockAccountInfo,
  MockCallLogs,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
  MockPermission,
  MockPresence,
} from '../../../steps/Mock';
import { NavigateTo } from '../../../steps/Router/action';
import { SetAreaCode } from '../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('Call to external when the Ext changes')
export class RCI4362 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  Logout: StepProp | null = null;
  @examples(`
      | maxExtensionNumberLength | areaCode | phoneNumber    | parsedNumber     | e164           |
      | 7                        | '205'    |  '2482217'     | '(205) 248-2217' | '+12052482217' |
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
                ]);
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
        <Given desc="Logout APP" action={Logout} />
        <Given desc="Relogin APP" action={Login} />
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
