/**
 * RCI-4354: Send text to call ext. when match (DT<=MEL)
 * https://test_it_domain/test-cases/RCI-4354
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
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
 * User is logged-in into 3rd party
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
  | RC-CA |8 |7 |3135003 |Match ext |310 |3135003 |Ext |Sarah |
	| RC-US |8 |8 |35351101 |Match ext |205 |35351101 |Ext |Lexie |

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

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockAccountInfo,
  MockCompanyPager,
  MockExtensionsList,
  mockExtensionsListData,
  MockGetPhoneNumber,
  MockMessageSync,
  MockMessageList,
  MockNumberParserV2,
  MockPermission,
} from '../../../../../../steps/Mock';
import { MockPresence } from '../../../../../../steps/Mock/MockPresence';
import { NavigateTo } from '../../../../../../steps/Router';

@autorun(test)
@it
@p1
@common
@title('Send text to call ext. when match (DT<=MEL)')
export class SendMessageSDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  @examples(`
    | maxExtensionLength | phoneNumber | defaultAreaCode | parsedNumber | name    |
    | 8                  | '3135003'   | '310'           | '3135003'    | 'UserA' |
    | 8                  | '35351101'  | '205'           | '35351101'   | 'UserB' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="SDP enabled and send message"
        action={({
          maxExtensionLength,
          name,
          phoneNumber,
          parsedNumber,
        }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
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
                    available: true,
                  },
                ]);
            }}
          />,
          <MockMessageSync repeat={0} />,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              records: [],
            })}
            repeat={0}
            isDefaultInit
          />,
          <MockExtensionsList
            handler={(mockData) => {
              return {
                ...mockData,
                ...mockExtensionsListData({
                  firstName: name,
                  lastName: '',
                  extensionNumber: phoneNumber,
                }),
              };
            }}
          />,
          MockGetPhoneNumber,
          <MockPresence repeat={0} />,
          <MockNumberParserV2
            isDefaultInit={true}
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              mockData.results[0].numberDetails.extensionNumber = parsedNumber;
              mockData.results = [mockData.results[0]];
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="Mock parse extension number"
          action={({ parsedNumber, phoneNumber }: any) => [
            <NavigateTo path="/composeText" />,
            <MockCompanyPager
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.from.extensionNumber = '101';
                mockData.to[0].extensionNumber = parsedNumber;
                mockData.to[0].name = this.example.name;
                return mockData;
              }}
            />,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Checked Contact on the message detail page is{Contact}
										Can send the message successfully"
          action={async ({ name }: any) => {
            await waitUntilTo(() => {
              expect(
                screen.getByTestId('conversationPanel'),
              ).toBeInTheDocument();
              expect(
                screen.getByTestId('currentName').textContent?.trim(),
              ).toBe(name);
            });
          }}
        />
      </Scenario>
    );
  }
}
