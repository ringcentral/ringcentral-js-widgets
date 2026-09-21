/**
 * RCI-578: Check conversation detail page
 * https://test_it_domain/test-cases/RCI-578
 * Preconditions:
 * Number1: Doesn't match any 3rd party entity(Account/Contact/Lead/Opportunity)
 * Number2: Matches only one 3rd party entity(Account/Contact/Lead/Opportunity)
 * Number3: Matches multiple 3rd party entities (Account/Contact/Lead/Opportunity)
 * Note: extension number doesn't support contact match
 * Entry point(/s):
 * Enter phone number(s) and extension numbers in To field, compose message and click Send
 * Click on a conversation from Messages tab
 */
import { Conversations } from '@ringcentral-integration/micro-message/src/app/services';
import { RouterPlugin } from '@ringcentral-integration/next-core';
import {
  whenStateChange,
  whenStateOrTimerChange,
} from '@ringcentral-integration/next-core/test';
import {
  autorun,
  common,
  examples,
  fireEvent,
  Given,
  it,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';
import dayjs from 'dayjs';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { ClearSMSMock, SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock,
  createMockTextResponse,
  MockCompanyPager,
  MockGetMessage,
  MockGetPhoneNumber,
  MockMessagePut,
  MockPostSMS,
} from '../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../steps/Router';

const now = dayjs('2024-01-01 20:30:00');
const OneHourAgo = now.subtract(1, 'hour');
const currentUser = {
  name: 'John Doe701',
  phoneNumber: '101',
  extensionNumber: '101',
};
const mockData = {
  // Doesn't match any 3rd party entity (Account/Contact/Lead/Opportunity)
  noMatchNumber1: {
    number: '+16501111111',
    name: 'Amy Doe111',
  },
  // Matches only one 3rd party entity (Account/Contact/Lead/Opportunity)
  matchOneNumber2: {
    number: '+16501234567',
    name: 'Bob Doe123',
  },
};

const mockRecords = createMockTextResponse(4, [
  {
    id: 2093905021,
    type: 'SMS',
    creationTime: now.subtract(2, 'day').toISOString(),
    to: [
      {
        name: mockData.noMatchNumber1.name,
        phoneNumber: mockData.noMatchNumber1.number,
      },
    ],
    from: currentUser,
    subject: 'SMS to noMatchNumber1',
    conversationId: 1699508180182,
  },
  {
    id: 2093905022,
    type: 'SMS',
    creationTime: now.subtract(1, 'day').toISOString(),
    direction: 'Inbound',
    from: {
      name: mockData.noMatchNumber1.name,
      phoneNumber: mockData.noMatchNumber1.number,
    },
    to: [currentUser],
    subject: 'SMS from noMatchNumber1',
    conversationId: 1699508180182,
  },
  {
    id: 2093905031,
    type: 'SMS',
    creationTime: now.subtract(2, 'day').toISOString(),
    to: [
      {
        name: mockData.matchOneNumber2.name,
        phoneNumber: mockData.matchOneNumber2.number,
      },
    ],
    from: currentUser,
    subject: 'SMS to matchOneNumber2',
    conversationId: 1699508180183,
  },
  {
    id: 2093905032,
    type: 'SMS',
    creationTime: now.subtract(1, 'day').toISOString(),
    direction: 'Inbound',
    from: {
      name: mockData.matchOneNumber2.name,
      phoneNumber: mockData.matchOneNumber2.number,
    },
    to: [currentUser],
    subject: 'SMS from matchOneNumber2',
    conversationId: 1699508180183,
  },
]).records;

const clickConversationByText = async (text: string) => {
  const conversation = await whenStateOrTimerChange(
    () => screen.getByText(text),
    { timeout: 10000 },
  );
  await userEvent.click(conversation);
  await waitForRenderReady();
};

@autorun(test)
@it
@p2
@title('Check conversation detail page: entry 1 number 1')
@common
export class RCI578Entry1Number1 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  phoneNumberInConversationsPage = '(650) 111-1111';
  CheckSMSLogButton: StepFunction<any, any> = () => {
    // no sms log button in common
  };
  run() {
    const {
      Login,
      CreateMock,
      phoneNumberInConversationsPage,
      CheckSMSLogButton,
    } = this;
    return (
      <Scenario
        desc="Check conversation detail page"
        action={[
          CreateMock,
          <MockGetPhoneNumber
            getPhoneNumberData={(mockData: any) => ({
              ...mockData,
              records: [
                {
                  ...mockData.records[0],
                  id: now.unix(),
                  phoneNumber: currentUser.phoneNumber,
                },
              ],
            })}
          />,
          <MockGetMessage
            repeat={1}
            syncType="ISync"
            messageType="SMS"
            records={[]}
            isDefaultInit={false}
          />,
          <MockPostSMS
            isDefaultInit
            repeat={1}
            handler={(data) => {
              return {
                ...data,
                type: 'SMS',
                direction: 'Outbound',
                subject: 'SMS to noMatchNumber1',
                creationTime: OneHourAgo.toISOString(),
                lastModifiedTime: OneHourAgo.toISOString(),
                from: currentUser,
                conversationId: 1699508180182,
                conversation: {
                  id: 1699508180182,
                  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/3237561336559605395',
                },
                to: [
                  {
                    name: mockData.noMatchNumber1.name,
                    phoneNumber: mockData.noMatchNumber1.number,
                  },
                ],
              };
            }}
          />,
          <MockCompanyPager
            repeat={1}
            isDefaultInit
            handler={(data) => {
              return {
                ...data,
                type: 'Pager',
                direction: 'Outbound',
                subject: 'SMS to noMatchNumber1',
                creationTime: OneHourAgo.toISOString(),
                lastModifiedTime: OneHourAgo.toISOString(),
                from: currentUser,
                to: [
                  {
                    name: '103',
                    phoneNumber: '103',
                  },
                ],
              };
            }}
          />,
          <MockMessagePut
            repeat={0}
            handler={(mockData) => ({
              ...mockData,
              readStatus: 'Read',
            })}
          />,
        ]}
      >
        <Given
          desc="Enter phone number(s) and extension numbers in To field, compose message and click Send"
          action={[
            Login,
            <NavigateTo path="/composeText" />,
            (async (_, { app }) => {
              // Mock
              jest
                .spyOn(app.modules.MessageSender, '_validateToNumbers')
                .mockImplementation(() => ({
                  result: true,
                  extNumbers: ['103'],
                  noExtNumbers: [mockData.noMatchNumber1.number],
                }));

              // input sms send number
              const element = screen.getByTestId('recipientsInput');
              await userEvent.type(element, '103');
              fireEvent.keyDown(element, {
                key: 'Enter',
                code: 13,
                charCode: 13,
              });
              await waitForRenderReady();
            }) as StepFunction,
            <SendSMS
              phoneNumber={mockData.noMatchNumber1.number}
              textMessage="SMS to noMatchNumber1"
            />,
          ]}
        />
        <When
          desc="Direct to entry points"
          action={
            (async (_, { app }) => {
              const router = app.container.got(RouterPlugin)!;
              await whenStateChange(() => {
                expect(router.currentPath).toBe('/messages');
              });
              await clickConversationByText(phoneNumberInConversationsPage);
              const conversations = app.container.got(Conversations)!;
              await whenStateChange(() => {
                expect(conversations.currentConversationId).not.toBeNull();
              });
            }) as StepFunction
          }
        />
        <Then
          desc="Back button
										Log SMS button(Not apply to current zendesk version)
										The other end of conversation: phone number
										Area displayingthe inbound and outbound messages exchanged in the conversation
										Text area with ghost text 'Type message...'
										Send button[L10N]"
          action={[
            CheckSMSLogButton,
            (async () => {
              // Back button
              expect(screen.getByTestId('backButton')).toBeVisible();
              // The other end of conversation: phone number 6501111111
              expect(screen.getByTestId('currentName')).toHaveTextContent(
                phoneNumberInConversationsPage,
              );
              // Area displaying the inbound and outbound messages exchanged in the conversation
              expect(screen.getByTestId('OutboundText')).toHaveTextContent(
                'SMS to noMatchNumber1',
              );
              // Text area with ghost text 'Type message...'
              expect(
                screen.getByPlaceholderText('Type message...'),
              ).toBeVisible();
            }) as StepFunction,
          ]}
        />
        <When
          desc="Try to enter text in text area"
          action={() => {
            const textMessageOver1000Chars = new Array(1001).join('a');
            fireEvent.change(screen.getByTestId('messageInput'), {
              target: { value: textMessageOver1000Chars },
            });
          }}
        />
        <Then
          desc="User can only enter 1000 characters
										User enter over 1000 characters:
										The excess should be cut off."
          action={() => {
            expect(screen.getByTestId('messageInput').textContent).toHaveLength(
              1000,
            );
          }}
        />
        <When
          desc="Click send button"
          action={[
            ClearSMSMock,
            <MockPostSMS
              isDefaultInit={false}
              handler={(data) => {
                return {
                  ...data,
                  type: 'SMS',
                  direction: 'Outbound',
                  subject: new Array(1000).join('a'),
                  creationTime: now.toISOString(),
                  lastModifiedTime: now.toISOString(),
                  from: currentUser,
                  id: now.unix(),
                  conversationId: 1699508180182,
                  conversation: {
                    id: 1699508180182,
                    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/3237561336559605395',
                  },
                  to: [
                    {
                      name: mockData.noMatchNumber1.name,
                      phoneNumber: mockData.noMatchNumber1.number,
                    },
                  ],
                };
              }}
            />,
            (async (_, { app }) => {
              // Mock
              jest
                .spyOn(app.modules.MessageSender, '_validateToNumbers')
                .mockImplementation(() => ({
                  result: true,
                  extNumbers: [],
                  noExtNumbers: [mockData.noMatchNumber1.number],
                }));

              await whenStateChange(() => {
                expect(screen.getByTestId('messageButton')).toBeEnabled();
              });
              fireEvent.click(screen.getByTestId('messageButton'));
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The message is updated to conversation area include:
										Content
										Date and Time"
          action={
            (async (_, { app }) => {
              const conversations = app.container.got(Conversations)!;
              await whenStateChange(() => {
                expect(conversations.currentConversation.messages).toHaveLength(
                  2,
                );
              });
              // check content
              const content = new Array(1000).join('a');
              await whenStateChange(() => {
                expect(screen.getByText(content)).toBeVisible();
              });
              // check date and time
              expect(
                screen.getByText(now.format('M/D/YYYY, HH:mm')),
              ).toBeVisible();
            }) as StepFunction
          }
        />
        <When
          desc="Click back button"
          action={() => {
            fireEvent.click(screen.getByTestId('backButton'));
          }}
        />
        <Then
          desc="User is navigated to Messages page
              The selected entity is shown in the conversation"
          action={async (_, { app }) => {
            const router = app.container.got(RouterPlugin)!;
            expect(router.currentPath).toBe('/messages');
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p2
@title('Check conversation detail page: entry 2 number 1')
@common
export class RCI578Entry2Number1 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  phoneNumberInConversationsPage = '(650) 111-1111';
  CheckSMSLogButton: StepFunction<any, any> = () => {
    // no sms log button in common
  };
  run() {
    const {
      Login,
      CreateMock,
      phoneNumberInConversationsPage,
      CheckSMSLogButton,
    } = this;
    return (
      <Scenario
        desc="Check conversation detail page"
        action={[
          CreateMock,
          <MockGetPhoneNumber
            getPhoneNumberData={(mockData: any) => ({
              ...mockData,
              records: [
                {
                  ...mockData.records[0],
                  id: now.unix(),
                  phoneNumber: currentUser.phoneNumber,
                },
              ],
            })}
          />,
          <MockGetMessage
            repeat={1}
            syncType="ISync"
            messageType="SMS"
            records={mockRecords}
            isDefaultInit={false}
          />,
          <MockMessagePut
            repeat={0}
            handler={(mockData) => ({
              ...mockData,
              readStatus: 'Read',
            })}
          />,
          <MockPostSMS
            isDefaultInit
            handler={(data) => {
              return {
                ...data,
                type: 'SMS',
                direction: 'Outbound',
                subject: new Array(1000).join('a'),
                creationTime: now.toISOString(),
                lastModifiedTime: now.toISOString(),
                from: currentUser,
                id: now.unix(),
                conversationId: 1699508180182,
                conversation: {
                  id: 1699508180182,
                  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/3237561336559605395',
                },
                to: [
                  {
                    name: mockData.noMatchNumber1.name,
                    phoneNumber: mockData.noMatchNumber1.number,
                  },
                ],
              };
            }}
          />,
        ]}
      >
        <Given desc="Login CTI" action={[Login, NavigateToMessagesTab]} />
        <When
          desc="Go to entrypoint2 by clicking the conversation with: number1"
          action={
            (async (_, { app }) => {
              await clickConversationByText(phoneNumberInConversationsPage);
              const conversations = app.container.got(Conversations)!;
              await whenStateChange(() => {
                expect(conversations.currentConversationId).not.toBeNull();
              });
            }) as StepFunction
          }
        />
        <Then
          desc="Back button
										Log SMS button(Not apply to current zendesk version)
										The other end of conversation: phone number
										Area displayingthe inbound and outbound messages exchanged in the conversation
										Text area with ghost text 'Type message...'
										Send button[L10N]"
          action={[
            CheckSMSLogButton,
            (async () => {
              // Back button
              expect(screen.getByTestId('backButton')).toBeVisible();
              // The other end of conversation: phone number 6501111111
              expect(screen.getByTestId('currentName')).toHaveTextContent(
                phoneNumberInConversationsPage,
              );
              // Area displaying the inbound and outbound messages exchanged in the conversation
              expect(screen.getByTestId('OutboundText')).toHaveTextContent(
                'SMS to noMatchNumber1',
              );
              expect(screen.getByTestId('InboundText')).toHaveTextContent(
                'SMS from noMatchNumber1',
              );
              // Text area with ghost text 'Type message...'
              expect(
                screen.getByPlaceholderText('Type message...'),
              ).toBeVisible();
            }) as StepFunction,
          ]}
        />
        <When
          desc="Try to enter text in text area"
          action={() => {
            const textMessageOver1000Chars = new Array(1001).join('a');
            jest.useFakeTimers();
            fireEvent.change(screen.getByTestId('messageInput'), {
              target: { value: textMessageOver1000Chars },
            });
          }}
        />
        <Then
          desc="User can only enter 1000 characters
										User enter over 1000 characters:
										The excess should be cut off."
          action={() => {
            expect(screen.getByTestId('messageInput').textContent).toHaveLength(
              1000,
            );
          }}
        />
        <When
          desc="Click send button"
          action={[
            (async (_, { app }) => {
              // Mock
              jest
                .spyOn(app.modules.MessageSender, '_validateToNumbers')
                .mockImplementation(() => ({
                  result: true,
                  extNumbers: [],
                  noExtNumbers: [mockData.noMatchNumber1.number],
                }));

              // onchange fn is debounce
              jest.advanceTimersByTime(1000);
              await whenStateChange(() => {
                expect(screen.getByTestId('messageButton')).toBeEnabled();
              });
              jest.useRealTimers();
              fireEvent.click(screen.getByTestId('messageButton'));
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The message is updated to conversation area include:
										Content
										Date and Time"
          action={
            (async (_, { app }) => {
              const conversations = app.container.got(Conversations)!;
              await whenStateChange(() => {
                expect(conversations.currentConversation.messages).toHaveLength(
                  3,
                );
              });
              // check content
              const content = new Array(1000).join('a');
              expect(screen.getByText(content)).toBeVisible();
              // check date and time
              expect(
                screen.getByText(now.format('M/D/YYYY, HH:mm')),
              ).toBeVisible();
            }) as StepFunction
          }
        />
        <When
          desc="Click back button"
          action={() => {
            fireEvent.click(screen.getByTestId('backButton'));
          }}
        />
        <Then
          desc="User is navigated to Messages page
              The selected entity is shown in the conversation"
          action={async (_, { app }) => {
            const router = app.container.got(RouterPlugin)!;
            expect(router.currentPath).toBe('/messages');
          }}
        />
      </Scenario>
    );
  }
}
