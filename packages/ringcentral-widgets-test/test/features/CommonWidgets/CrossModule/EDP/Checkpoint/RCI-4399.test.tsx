/**
 * RCI-4399: EDP enable and dialed with other call option
 * https://test_it_domain/test-cases/RCI-4399
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR not support in 22.2.20
 * Entry point(/s):
 * Entry point(/s):
 *
  | Country |Entry |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-EU |> Make an outbound call>Navigate to the Call control page> Click the 'Call Actions' button> Click 'Transfer' |8 |7 |3135003 |Match ext |11 |3135003 |Extension |Sarah |
	| RC-CA |> Make an outbound call>Navigate to the Call control page> Click 'Add' button |8 |8 |35351101 |Match ext |205 |35351101 |Extension |Lexie |
	| RC-UK |> Make an inbound call>Navigate to the incoming call page> Click the 'Forward' button> Input{dialing text}in the 'Custom number' filed > Click the'Forward' button. |7 |8 |3135 0033 |Match valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

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
import type { Context } from '../../../../../interfaces';

import type { StepProp } from '../../../../../lib/step';
import {
  CheckConferenceCallControlPage,
  CheckIncomingCallPageExist,
  ClickAddButton,
  ClickForwardButton,
  CustomForwardCall,
  ForwardCall,
  MakeCall,
  TransferCall,
  TypeCustomForwardNumber,
} from '../../../../../steps/Call';
import { MakeForwardCall } from '../../../../../steps/Call/SmallCallControl/actions/MakeForwardCall';
import {
  CheckCallLogTitle,
  CheckInCallLogPage,
} from '../../../../../steps/CallLog';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CheckIsCRM } from '../../../../../steps/IDB';
import {
  MockAccountInfo,
  MockCallLogs,
  MockExtensionInfo,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { SetAreaCode } from '../../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('EDP enable and dialed with other call option')
@common
export class EDPEnabledAndTransfer extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  appName = 'common';
  transferFn: any;

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | parsedNumber | transferNumber         |
    | 8                  | '11'     | '3135003'   | '3135003'    | '+18883495556*3135003' |
  `)
  run() {
    const { Login, CreateMock, appName, context } = this;
    return (
      <Scenario
        desc="EDP enabled and make transfer call "
        action={({ maxExtensionLength, phoneNumber, parsedNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
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
            MakeCall,
            <MockNumberParserV2
              isDefaultInit={false}
              repeat={0}
              handler={(mockData) => {
                mockData.results[0].category = Category.Extension;
                mockData.results[0].numberDetails.extensionNumber =
                  parsedNumber;
                mockData.results[0].originalString = phoneNumber;
                return mockData;
              }}
            />,
            (_: any, context: Context) => {
              if (CheckIsCRM(appName)) {
                context.phone.activeCallControl._rcCall.sessions[0].transfer =
                  jest.fn();
              }
            },
            <TransferCall
              phoneNumber={phoneNumber}
              callButtonBehaviorType={
                CheckIsCRM(appName) ? 'more' : 'callActions'
              }
            />,
          ]}
        />
        <Then
          desc="Can successfully make calls to {Contact}"
          action={async (
            { parsedNumber, transferNumber }: any,
            context: Context,
          ) => {
            if (CheckIsCRM(appName)) {
              await waitUntilTo(() => {
                expect(
                  context.phone.activeCallControl._rcCall.sessions[0].transfer,
                ).toHaveBeenCalledWith(transferNumber);
              });
            } else {
              await waitUntilTo(() => {
                expect(transferFn).toHaveBeenCalledWith(parsedNumber);
              });
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('EDP enable and dialed and add call')
@common
export class EDPEnabledAndAddCall extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | parsedNumber |
    | 8                  | '205'    | '31351101'  | '31351101'   |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="EDP enabled and make transfer call "
        action={({ maxExtensionLength, parsedNumber, phoneNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
            repeat={3}
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              mockData.results[0].numberDetails.extensionNumber = parsedNumber;
              mockData.results[0].originalString = phoneNumber;
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="> Follow the {Entry}> Input{dialing text}in 'To' filed
                      > Click call button
                      Note:
                      For 'Forward' entry, input{dialing text}in 'Custom number' filed and click'Forward' button."
          action={[MakeCall, ClickAddButton, MakeCall]}
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
@title('EDP enable and dialed and forward call')
@common
export class EDPEnabledAndForward extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  appName = 'common';

  @examples(`
    | maxExtensionLength | areaCode | phoneNumber | e164            |
    | 7                  | '12'     | '31350033'  | '+441231350033' |
  `)
  run() {
    const { Login, CreateMock, appName } = this;
    return (
      <Scenario
        desc="EDP enabled and make transfer call "
        action={({ maxExtensionLength, e164 }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockMessageSync repeat={0} />,
          <MockNumberParserV2
            isDefaultInit
            repeat={2}
            handler={(mockData) => {
              mockData.results[0].category = Category.Regular;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                e164Extended: e164,
              };
              return mockData;
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry = {
                uri: 'https://api-rcapps-xmnup.rclabenv.com/restapi/v1.0/dictionary/country/75',
                id: '75',
                name: 'France',
                isoCode: 'FR',
                callingCode: '33',
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
              useUserAgentSession={!CheckIsCRM(appName)}
            />,
            () => {
              return CheckIsCRM(appName)
                ? CheckCallLogTitle
                : CheckIncomingCallPageExist;
            },
            (_: any, context: Context) => {
              if (CheckIsCRM(appName)) {
                context.phone.activeCallControl._rcCall.sessions[0].forward =
                  jest.fn();
              }
            },
            () => {
              if (CheckIsCRM(appName)) {
                return (
                  <>
                    <CustomForwardCall />
                    <TypeCustomForwardNumber phoneNumber={phoneNumber} />
                    <ClickForwardButton />
                  </>
                );
              }
              return <MakeForwardCall phoneNumber={phoneNumber} />;
            },
          ]}
        />
        <Then
          desc="Can successfully make calls to {Contact}"
          action={async ({ e164 }: any, context: Context) => {
            if (CheckIsCRM(appName)) {
              await waitUntilTo(() => {
                expect(
                  context.phone.activeCallControl._rcCall.sessions[0].forward
                    .mock.calls[0][0],
                ).toBe(e164);
              });
            } else {
              await waitUntilTo(() => {
                expect(forwardFn.mock.calls[0][0]).toBe(e164);
              });
            }
          }}
        />
      </Scenario>
    );
  }
}
