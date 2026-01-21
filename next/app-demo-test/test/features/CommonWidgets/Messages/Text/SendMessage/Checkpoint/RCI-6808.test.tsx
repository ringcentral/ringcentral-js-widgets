/**
 * RCI-6808: Max size 1.5MB when attchment file
 * https://test_it_domain/test-cases/RCI-6808
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 * ContactsPhone NumberUserX18662100000
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 * Entry point(/s):
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 * ContactsPhone NumberUserX18662100000
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | Entry |Path |
  | 1 |Click 'Compose Text' >Input{PhoneNumber}in 'To' field |
	| 2 |Click the conversation with {Contacts} |
	| 3 |Expand the history item with{Contacts}, click the Text button |

 */
import { Conversations } from '@ringcentral-integration/micro-message/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
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
  StepFunction,
  fireEvent,
  screen,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { CheckToastMessage } from '../../../../../../steps/Alert';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { InputToField } from '../../../../../../steps/Dialer';
import { CheckAttachment, CheckButton } from '../../../../../../steps/Messages';
import {
  createMockFile,
  MB,
} from '../../../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../../../steps/Messages/Files/selectFileFn';
import {
  CreateMock,
  MockCallLogSync,
  MockMessageList,
  MockMessagePut,
  MockMessageSync,
  MockPostMMS,
} from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToHistory,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';

jest.mock('use-file-upload', () => {
  const { selectFileFn } = jest.requireActual(
    '../../../../../../steps/Messages/Files/selectFileFn',
  );

  return {
    __esModule: true,
    useFileUpload: () => {
      return [null, selectFileFn];
    },
  };
});

@autorun(test.skip)
@it
@p2
@common
@title('Max size 1.5MB when attachment file')
export class MMSSizeLimit extends Step {
  CommonLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  @examples([
    {
      Entry: () => (
        <>
          <NavigateToMessagesTab />
          <ClickItemByDataSign dataSign="msgDetail" />
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
    const TEST_FILE = {
      file: createMockFile('file1.jpg', 1.5 * MB),
      size: 1.5 * MB,
      name: 'file1.jpg',
    };
    const TEST_OVER_SIZE_FILE = {
      file: createMockFile('file2.jpg', 1.8 * MB),
      size: 1.8 * MB,
      name: 'file2.jpg',
    };
    return (
      <Scenario
        desc="Max size 1.5MB when attachment file"
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
          <MockPostMMS
            isDefaultInit
            handler={(smsResponse) => ({
              ...smsResponse,
              direction: 'Outbound',
              subject: '',
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
                {
                  id: 3628750000,
                  uri: 'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/363799004/extension/363799004/message-store/3628750000/content/3628750000',
                  type: 'MmsAttachment',
                  contentType: TEST_FILE.file.type,
                  size: TEST_FILE.size,
                  fileName: TEST_FILE.name,
                  width: 210,
                  height: 210,
                },
              ],
            })}
          />,
          <MockCallLogSync
            mockResponse={GenerateCallHistory({ length: 1 })}
            isDefaultInit
            repeat={1}
          />,
          this.CommonLogin,
          this.example.Entry,
          ((_, { app }) => {
            selectFileFn.mockImplementation((args, cb) => {
              cb([{ file: TEST_FILE.file }]);
            });
            jest
              .spyOn(app.modules.MessageSender, '_validateSenderNumber')
              .mockReturnValue(true);
          }) as StepFunction,
        ]}
      >
        <When
          desc="Go to the Entry,click the attachment button,
                The attached file size is equal to 1.5MB
                And add max length text
                Click OK button"
          action={[
            <ClickItemByDataSign dataSign="attachButton" />,
            <CheckAttachment expectedFiles={[TEST_FILE.file]} />,
            () => {
              const textMessage1000Chars = new Array(1000).join('a');
              fireEvent.change(screen.getByTestId('messageInput'), {
                target: { value: textMessage1000Chars },
              });
            },
          ]}
        />
        <Then
          desc="Send successfully"
          action={[
            <CheckButton expectDisabled={false} />,
            <ClickItemByDataSign dataSign="messageButton" />,
          ]}
        />
        <When
          desc="click the attachment button,
                Attache file size more than 1.5MB
                Click OK button"
          action={[
            (async (_, { app }) => {
              const conversations = app.container.got(Conversations)!;
              await whenStateChange(() => {
                expect(
                  conversations.currentConversation.messages.length,
                ).toBeGreaterThan(1);
              });
              selectFileFn.mockImplementation((args, cb) => {
                cb([{ file: TEST_OVER_SIZE_FILE.file }]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachButton" />,
          ]}
        />
        <Then
          desc="Display error message: 'The over all attachment size can't be larger than 1.5 MB per message.' with the close button
										The file can not attach
										The attachment button enabled
										The Send button disabled[L10N]"
          action={[
            <CheckToastMessage message="The over all attachment size can't be larger than 1.5 MB per message." />,
            <CheckAttachment expectedFiles={[]} />,
            <CheckButton expectDisabled />,
          ]}
        />
      </Scenario>
    );
  }
}
