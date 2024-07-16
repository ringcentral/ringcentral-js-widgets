/**
 * RCI-4394: Send text to PSTN when can't match ext. but valid PSTN (DT<=MEL)
 * https://test_it_domain/test-cases/RCI-4394
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-US |8 |7 |248 2217 |Not Match extbut valid PSTN |205 |(205) 248 2217 |PSTN |(205) 248 2217 |
	| RC-US |7 |7 |313 5033 |Not Match extbut valid PSTN |205 |(205) 248 2217 |PSTN |(205) 248 2217 |

 */
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import { mockMessageListData } from '../../../../../../__mock__';
import { generateDialPlanData } from '../../../../../../__mock__/generateDialPlanData';
import type { StepProp } from '../../../../../../lib/step';
import { ClickBackButton } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CheckConversations } from '../../../../../../steps/Conversation/CheckConversations';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockAccountInfo,
  MockDialingPlan,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockGetTelephonyState,
  MockMessageSync,
  MockMessageList,
  MockNumberParserV2,
  MockPermission,
  MockPostSMS,
} from '../../../../../../steps/Mock';
import { NavigateToMessageHistory } from '../../../../../../steps/Navigate/actions/NavigateToMessageHistory';
import { NavigateTo } from '../../../../../../steps/Router';

@autorun(test)
@it
@p1
@title(`Send text to PSTN when can't match ext. but valid PSTN (DT<=MEL)`)
@common
export class SMSPSTNSDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  @examples(`
    | isoCode | MaxExtensionLength | phoneNumber | parsedNumber    | e164ParsedNumber |
    | 'AU'    | 8                  | '2482217'   | '2052482217'    | '+612052482217'  |
    | 'GB'    | 8                  | '31350033'  | '028 3135 0033' | '+442831350033'  |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Make an sms to pstn when sdp enabled"
        action={({
          maxExtensionLength,
          isoCode,
          parsedNumber,
          e164ParsedNumber,
          phoneNumber,
        }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              mockData.serviceInfo.brand.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          MockGetTelephonyState,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('61', '61', 'Australia', 'AU'),
              ];
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
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          <MockMessageSync
            isDefaultInit
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                direction: 'Inbound',
                toNumber: parsedNumber,
              }),
            })}
          />,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              records: [],
            })}
            repeat={0}
            isDefaultInit
          />,
          <MockPostSMS
            isDefaultInit
            handler={(mockData) => {
              mockData.to[0].phoneNumber = e164ParsedNumber;
              return mockData;
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
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
                  e164Extended: e164ParsedNumber,
                  category: Category.Regular,
                },
              ];
              mockData.results = [mockData.results[0]];
              return mockData;
            }}
          />,
        ]}
      >
        <Given
          desc="UserA has contact 'Test contact', mock his extension info"
          action={Login}
        />
        <When
          desc="> Input{originalStrings}in 'To' filed> Input test text in text box
										> Click send button"
          action={({ phoneNumber }: any) => [
            <NavigateTo path="/composeText" />,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Checked Contact on the message detail page is{Contact}
										Can send the message successfully"
          action={async ({ parsedNumber }: any) => {
            await waitUntilTo(() => {
              expect(
                screen.getByTestId('conversationPanel'),
              ).toBeInTheDocument();
              expect(screen.getByTestId('currentName')).toHaveTextContent(
                parsedNumber,
              );
            });
          }}
        />
        <When
          desc="> Click back button
										>Check text log on the message page"
          action={[
            ClickBackButton,
            <NavigateToMessageHistory tabName="Text" />,
          ]}
        />
        <Then
          desc="Display as{Contact}in message log list"
          action={({ parsedNumber }: any) => [
            <CheckConversations
              parsedNumber={parsedNumber}
              testId="SMSMessageItem"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
