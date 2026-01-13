/**
 * RCI-3690: The send button status
 * https://test_it_domain/test-cases/RCI-3690
 * Preconditions:
 * UserA has logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 * Entry point(/s):
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | Entry |Path |
  | 1 |Click 'Compose Text' >Input{PhoneNumber}in 'To' field |
	| 2 |Click the conversation with {Contacts} |

 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
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
import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import type { StepProp } from '../../../../../../lib/step';
import {
  ClearMessage,
  InputSMS,
} from '../../../../../../steps/Messages/actions';
import { CheckButton } from '../../../../../../steps/Messages/checks/CheckButton';
import {
  MockExtensionsList,
  mockExtensionsListData,
  MockMessagePut,
  MockMessageSync,
  MockPresence,
} from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToContactDetails,
  NavigateToContacts,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';

@autorun(test.skip)
@common
@it
@p2
@title('The send button status')
export class SMSButtonStatus extends Step {
  CustomLogin: StepFunction<any, any> | null = null;
  CustomCreateMock: StepProp | null = null;

  @examples(`
    | contactName     | extension | phoneNumber    | textMessage    |
    | 'Test ContactA' | '102'     | '+18662100000' | 'test message' |
  `)
  run() {
    return (
      <Scenario
        desc="The send button status"
        action={({ contactName, extension, phoneNumber }: any) => [
          this.CustomCreateMock,
          <MockExtensionsList
            handler={(mockData) => {
              const data = mockExtensionsListData({
                firstName: contactName.split(' ')[0],
                lastName: contactName.split(' ')[1],
                extensionNumber: extension,
                phoneNumbers: [
                  {
                    phoneNumber,
                    type: 'VoiceFax',
                    usageType: 'DirectNumber',
                    hidden: true,
                  },
                ],
              });
              return {
                ...mockData,
                ...data,
              };
            }}
          />,
          <MockPresence repeat={0} />,
          <MockMessageSync repeat={4} />,
        ]}
      >
        <Given
          desc="UserA has contact 'Test contact', mock his extension info"
          action={this.CustomLogin}
        />
        <When
          desc="Go to the Entry
										Check the 'Send' button in conversation page"
          action={<NavigateToComposeText />}
        />
        <Then
          desc="The 'Send' button is show
										Gray
										disable"
          action={<CheckButton expectDisabled />}
        />
        <When desc="input some text in the textarea" action={InputSMS} />
        <Then
          desc="The user should be able to enter the text in the text area.
										The 'Send' button is enabled"
          action={[<CheckButton expectDisabled={false} />, ClearMessage]}
        />
        <When
          desc="Go to the Entry
										Check the 'Send' button in conversation page"
          action={({
            contactName,
            textMessage,
          }: {
            contactName: string;
            textMessage: string;
          }) => {
            const element = screen.queryByTestId('contactsTab');
            if (element) {
              return [
                NavigateToContacts,
                <NavigateToContactDetails userName={contactName} />,
                async () => {
                  await waitUntilTo(() => {
                    expect(screen.getByTestId('text')).toBeVisible();
                  });
                  fireEvent.click(screen.getByTestId('text'));
                  await waitUntilTo(() => {
                    expect(screen.getByTestId('messageButton')).toBeDisabled();
                  });
                },
              ];
            }
            // Note(/s): For HubSpot, no contacts feature in release 22.2.10, so check the conversation in the "messages" tab
            return [
              <NavigateToMessagesTab />,
              // message is unread, navigate to conversation will call message-store API, to update message to 'Read' status
              <MockMessagePut
                handler={(mockData) => ({
                  ...mockData,
                  readStatus: 'Read',
                })}
              />,
              () => {
                fireEvent.click(screen.queryAllByTestId('currentName')[0]);
              },
            ];
          }}
        />
        <Then
          desc="The 'Send' button is show
										Gray
										disable"
          action={<CheckButton expectDisabled />}
        />
        <When
          desc="input some text in the textarea"
          action={async ({ textMessage }: { textMessage: string }) => {
            await fireEvent.change(screen.getByTestId('messageInput'), {
              target: { value: textMessage },
            });
            await waitFor(() => {
              expect(screen.getByTestId('messageInput')).toHaveTextContent(
                textMessage,
              );
            });
          }}
        />
        <Then
          desc="The user should be able to enter the text in the text area.
										The 'Send' button is enabled"
          action={[<CheckButton expectDisabled={false} />]}
        />
      </Scenario>
    );
  }
}
