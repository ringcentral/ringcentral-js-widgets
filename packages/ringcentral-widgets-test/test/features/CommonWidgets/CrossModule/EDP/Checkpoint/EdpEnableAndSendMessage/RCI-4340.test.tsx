/**
 * RCI-4340: Send text to call ext. when match (DT<=MEL)
 * https://test_id_domain/test-cases/RCI-4340
 * Preconditions:
 * CTI app is integrated,
 * The user is logged-in to 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * The user is notRC-US/RC-PRnot supported in 22.2.20
 * Entry point(/s):
 * CTI app is integrated,
 * The user is logged-in to 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * The user is notRC-US/RC-PRnot supported in 22.2.20
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Default area code |parsed number |NPC category |Contact |
  | RC-CA |8 |8 |35351101 |205 |35351101 |Extension |Lexie |
	| RC-US |8 |7 |3135003 |205 | 3135003 |Extension |Sarah |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import { waitUntilTo } from '@ringcentral-integration/utils';
import {
  p1,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import { getNodeText, screen } from '@testing-library/react';

import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { StepProp } from '../../../../../../lib/step';
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
  MockNumberParserV2,
  MockPresence,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';
import { CheckEventTracking } from '../../../../../../steps/Tracking';

@autorun(test)
@it
@p1
@common
@title('Send text to call ext. when match (DT<=MEL)')
export class SendMessageWhenEDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  hasRCContact = true;
  shouldTestDataTrack = false;

  @examples(`
    | maxExtensionLength | phoneNumber | defaultAreaCode | parsedNumber | name    |
    | 8                  | '3135003'   | '310'           | '3135003'    | 'UserA' |
    | 8                  | '35351101'  | '205'           | '35351101'   | 'UserB' |
  `)
  run() {
    const { Login, CreateMock, hasRCContact } = this;
    return (
      <Scenario
        desc="EDP enabled and send message"
        action={({ maxExtensionLength, name, phoneNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockMessageSync repeat={0} />,
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
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="Mock parse extension number"
          action={({ parsedNumber, phoneNumber }: any) => [
            <MockNumberParserV2
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.results[0].category = Category.Extension;
                mockData.results[0].numberDetails.extensionNumber =
                  parsedNumber;
                mockData.results = [mockData.results[0]];
                return mockData;
              }}
            />,
            <NavigateTo path="/composeText" />,
            <MockCompanyPager
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.from.extensionNumber = '101';
                mockData.to[0].extensionNumber = parsedNumber;
                mockData.to[0].name = 'UserA';
                return mockData;
              }}
            />,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Checked Contact on the message detail page is{Contact}
										Can send the message successfully"
          action={async ({ name, parsedNumber }: any) => {
            await waitUntilTo(() => {
              expect(
                screen.getByTestId('conversationPanel'),
              ).toBeInTheDocument();
              if (hasRCContact) {
                expect(screen.getByTestId('currentName')).toHaveTextContent(
                  name,
                );
              } else {
                expect(getNodeText(screen.getByTestId('currentName'))).toBe(
                  parsedNumber,
                );
              }
            });
          }}
        />
        <Then
          desc="Should track event 'SMS Attempt'"
          action={({ shouldTestDataTrack }: any) =>
            shouldTestDataTrack && (
              <CheckEventTracking
                check={(logs) => {
                  const log = logs.find(
                    ({ event }) => event === trackEvents.smsAttempt,
                  );
                  expect(log).not.toBeUndefined();
                  expect(log?.trackProps).toEqual(
                    expect.objectContaining({
                      isGroupMessage: false,
                      isPager: true,
                    }),
                  );
                }}
              />
            )
          }
        />
      </Scenario>
    );
  }
}
