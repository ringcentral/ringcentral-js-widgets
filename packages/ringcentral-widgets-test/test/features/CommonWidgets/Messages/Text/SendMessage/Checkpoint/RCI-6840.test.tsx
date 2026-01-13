/**
 * RCI-6840: Send emoji
 * https://test_it_domain/test-cases/RCI-6840
 * Preconditions:
 * UserAhas logged into the 3rd party
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
	| 3 |Expand the history item with{Contacts}, click the Text button |

 */
import { whenStateChange } from '@ringcentral-integration/core/test';
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
  common,
  StepProp,
  screen,
  within,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CheckButton } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockCallLogSync,
  MockMessageList,
  MockMessagePut,
  MockMessageSync,
  MockPostSMS,
} from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToHistory,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';
import { InputToField } from '../../../../../../steps/dialer';

@autorun(test.skip)
@it
@p2
@common
@title('Send emoji')
export class SendEmoji extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      Entry: () => (
        <>
          <NavigateToMessagesTab />
          <ClickItemByDataSign dataSign="msgDetail" index={0} />
        </>
      ),
    },
    {
      Entry: () => (
        <>
          <NavigateToComposeText />
          <InputToField input="+18662100000" needEnter />
        </>
      ),
    },
    {
      Entry: () => (
        <>
          <NavigateToHistory />
          <ClickItemByDataSign dataSign="extendButton" />
          <ClickItemByDataSign dataSign="clickToSms" />
        </>
      ),
    },
  ])
  run() {
    const emojiText = '😀';
    return (
      <Scenario
        desc="Send emoji"
        action={[
          this.CreateMock,
          <MockMessagePut repeat={0} />,
          <MockMessageList
            repeat={0}
            handler={(mockData) => ({ ...mockData, record: [] })}
          />,
          <MockMessageSync
            repeat={1}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData([
                {
                  id: 3628750004,
                  direction: 'Outbound',
                  toNumber: '+18662100000',
                  conversationId: 1699508180182,
                  conversation: {
                    id: 1699508180182,
                    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/1699508180182',
                  },
                },
              ]),
            })}
          />,
          <MockPostSMS
            isDefaultInit
            handler={(smsResponse) => ({
              ...smsResponse,
              direction: 'Outbound',
              subject: emojiText,
              to: [
                {
                  phoneNumber: '+18662100000',
                  location: 'Provo, UT',
                },
              ],
              id: 3628750003,
              creationTime: new Date().toISOString(),
              lastModifiedTime: new Date().toISOString(),
              conversationId: 1699508180182,
              conversation: {
                id: 1699508180182,
                uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/1699508180182',
              },
              attachments: [
                {
                  id: 3628750003,
                  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/363799004/extension/363820004/message-store/3628750004/content/3628750004',
                  type: 'Text',
                  contentType: 'text/plain',
                },
              ],
            })}
          />,
          <MockCallLogSync
            mockResponse={GenerateCallHistory({ length: 1 })}
            isDefaultInit
            repeat={1}
          />,
          this.Login,
          this.example.Entry,
          ((_, { phone }) => {
            jest
              .spyOn(phone.messageSender, '_validateSenderNumber')
              .mockReturnValue(true);
          }) as StepProp,
        ]}
      >
        <When
          desc="Go to the Entry,click the emoji button"
          action={<ClickItemByDataSign dataSign="emojiButton" />}
        />
        <Then
          desc="Open emoji selector"
          action={async () => {
            await whenStateChange(() => {
              expect(screen.getByTestId('emoji-popup')).toBeInTheDocument();
            });
          }}
        />
        <When
          desc="Click out of the emoji selector"
          action={[
            async () => {
              // EmojiMenu use ClickAwayListener to close the emoji selector
              // which has a setTimeout(0) when rendering
              // so need to wait for the next tick to click
              await sleep(0);
            },
            <ClickItemByDataSign dataSign="messageInput" />,
          ]}
        />
        <Then
          desc="Close the emoji selector"
          action={() => {
            expect(screen.queryByTestId('emoji-popup')).not.toBeInTheDocument();
          }}
        />
        <When
          desc="click the emoji button, select ':grinning:' "
          action={[
            <ClickItemByDataSign dataSign="emojiButton" />,
            <ClickItemByDataSign dataSign="emoji-grinning" />,
          ]}
        />
        <Then
          desc="Close the emoji selector
                Display the emoji on the text box
                Send button change to enabled"
          action={[
            async () => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('emoji-popup'),
                ).not.toBeInTheDocument();
                expect(screen.getByTestId('messageInput')).toHaveTextContent(
                  emojiText,
                );
              });
            },
            <CheckButton expectDisabled={false} />,
          ]}
        />
        <When
          desc="Click Send button"
          action={<ClickItemByDataSign dataSign="messageButton" />}
        />
        <Then
          desc="Send the emoji successfully"
          action={[
            (async (_, { phone }) => {
              await whenStateChange(() => {
                expect(
                  phone.conversations.currentConversation.messages.length,
                ).toBeGreaterThan(1);
              });
              const messages = screen.getAllByTestId('message');
              const latestMessage = messages[messages.length - 1];
              // check emoji text
              expect(
                within(latestMessage).getByTestId('OutboundText').textContent,
              ).toBe(emojiText);
            }) as StepProp,
          ]}
        />
      </Scenario>
    );
  }
}
