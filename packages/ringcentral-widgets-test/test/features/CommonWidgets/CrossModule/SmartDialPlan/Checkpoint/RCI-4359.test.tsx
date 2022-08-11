/**
 * RCI-4359: SDP enable and dialed with other call option
 * https://test_id_domain/test-cases/RCI-4359
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
 * Entry point(/s):
 *
  | Country |Entry |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-EU |> Make a outbound call >Navigate to Call control page > Click 'Call Actions' button > Click 'Transfer' |8 |7 |3135003 |Match ext |11 |3135003 |Ext |Sarah |
	| RC-CA |> Make a outbound call >Navigate to Call control page > Click 'Add' button |6 |7 |248 2217 |Match valid PSTN |205 |(205)248 2217 |PSTN |(205)248 2217 |
	| RC-UK |> Make a inbound call >Navigate to incoming call page > Click 'Forward' button |8 |8 |3135 0033 |Not Match extbut valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { forwardFn, transferFn } from '@ringcentral-integration/mock';
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
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../../../lib/step';
import {
  CheckConferenceCallControlPage,
  CheckIncomingCallPageExist,
  ClickAddButton,
  MakeCall,
  TransferCall,
} from '../../../../../steps/Call';
import { MakeForwardCall } from '../../../../../steps/Call/SmallCallControl/actions/MakeForwardCall';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  MockAccountInfo,
  MockCallLogs,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
  MockPermission,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { SetAreaCode } from '../../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@common
@title('SDP enable and dialed with other call option')
export class SDPEnabledAndTransfer extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | parsedNumber |
    | 8                  | '11'     | '3135003'   | '3135003'    |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="SDP enabled and make transfer call "
        action={({ maxExtensionLength, phoneNumber, parsedNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
              return permission;
            }}
          />,
          <MockExtensionsList
            handler={(mockData) => {
              return {
                ...mockData,
                ...mockExtensionsListData({
                  firstName: 'Something',
                  lastName: 'New',
                  extensionNumber: phoneNumber,
                  phoneNumber: '18662105111',
                }),
              };
            }}
          />,
          <MockCallLogs isDefaultInit repeat={0} />,
          <MockMessageSync isDefaultInit repeat={0} />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="> Follow the {Entry}> Input{dialing text}in 'To' filed
										> Click call button
										Note:
										For 'Forward' entry, input{dialing text}in 'Custom number' filed and click'Forward' button."
          action={({ phoneNumber, parsedNumber }: any) => [
            <MockNumberParserV2
              isDefaultInit={false}
              repeat={2}
              handler={(mockData) => {
                mockData.results[0].category = Category.Extension;
                mockData.results[0].numberDetails.extensionNumber =
                  parsedNumber;
                mockData.results[0].originalString = phoneNumber;
                return mockData;
              }}
            />,
            MakeCall,
            <TransferCall
              phoneNumber={phoneNumber}
              callButtonBehaviorType="callActions"
            />,
          ]}
        />
        <Then
          desc="Can successfully make calls to {Contact}"
          action={async ({ parsedNumber }: any) => {
            await waitUntilTo(() => {
              expect(transferFn).toHaveBeenCalledWith(parsedNumber);
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@common
@title('SDP enable and dialed and add call')
export class SDPEnabledAndAddCall extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | e164           | parsedNumber     |
    | 6                  | '205'    | '2482217'   | '+12052482217' | '(205) 248-2217' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="SDP enabled and make transfer call "
        action={({ maxExtensionLength, e164 }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
              return permission;
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
            repeat={3}
            handler={(mockData) => {
              mockData.results[0].category = Category.Regular;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                e164Extended: e164,
              };
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <And
          desc="set area code"
          action={({ areaCode }: any) => (
            <>
              <NavigateTo path="/settings/region" />,
              <SetAreaCode areaCode={areaCode} />,
              <NavigateTo path="/dialer" />
            </>
          )}
        />
        <When
          desc="> Follow the {Entry}> Input{dialing text}in 'To' filed
										> Click call button
										Note:
										For 'Forward' entry, input{dialing text}in 'Custom number' filed and click'Forward' button."
          action={({ e164 }: any) => [MakeCall, ClickAddButton, MakeCall]}
        />
        <Then
          desc="check call control page"
          action={({ parsedNumber }: any) => (
            <CheckConferenceCallControlPage parsedNumber={parsedNumber} />
          )}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@common
@title('SDP enable and dialed and forward call')
export class SDPEnabledAndForward extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | e164            |
    | 8                  | '12'     | '31350033'  | '+441231350033' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="SDP enabled and make transfer call "
        action={({ maxExtensionLength, phoneNumber, e164 }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
              return permission;
            }}
          />,
          <MockMessageSync repeat={0} />,
          <MockNumberParserV2
            isDefaultInit
            repeat={2}
            handler={(mockData) => {
              mockData.results[0].category = Category.Ambiguous;
              mockData.results[0].numberDetails.extensionNumber = phoneNumber;
              mockData.results[0].formats = [
                {
                  ...mockData.results[0].formats[0],
                  category: Category.Extension,
                  dialable: phoneNumber,
                  dialableExtended: phoneNumber,
                },
                {
                  ...mockData.results[0].formats[0],
                  e164Extended: e164,
                  category: Category.Regular,
                },
              ];
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <And
          desc="set area code"
          action={({ areaCode }: any) => (
            <>
              <NavigateTo path="/settings/region" />,
              <SetAreaCode areaCode={areaCode} />,
            </>
          )}
        />
        <When
          desc="> Follow the {Entry}> Input{dialing text}in 'To' filed
										> Click call button
										Note:
										For 'Forward' entry, input{dialing text}in 'Custom number' filed and click'Forward' button."
          action={({ e164, phoneNumber }: any) => [
            <MakeCall
              direction="Inbound"
              phoneNumber={e164}
              useUserAgentSession
            />,
            CheckIncomingCallPageExist,
            <MakeForwardCall phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Can successfully make calls to {Contact}"
          action={async ({ e164 }: any) => {
            await waitUntilTo(() => {
              expect(forwardFn.mock.calls[0][0]).toBe(e164);
            });
          }}
        />
      </Scenario>
    );
  }
}
