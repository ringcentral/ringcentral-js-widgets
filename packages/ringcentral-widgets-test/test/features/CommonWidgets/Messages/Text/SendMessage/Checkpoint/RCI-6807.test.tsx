/**
 * RCI-6807: Attach 10 supported attchment files
 * https://test_it_domain/test-cases/RCI-6807
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
import { whenStateChange } from '@ringcentral-integration/core/test';
import {
  p2,
  it,
  autorun,
  examples,
  screen,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepProp,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { CheckAlertMessage } from '../../../../../../steps/Alert';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CheckAttachment,
  CheckButton,
  HoverAndCheckImageMessage,
} from '../../../../../../steps/Messages';
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
import { InputToField } from '../../../../../../steps/dialer';

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
@title('Attach 10 supported attachment files')
export class Attach10Files extends Step {
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
    const files = [
      { type: '.jpg', name: '1', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '2', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '3', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '4', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '5', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '6', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '7', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '8', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '9', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.jpg', name: '10', size: 0.1 * MB, sizeText: '0.1 MB' },
    ];
    const TEST_FILE = files.map((item) => ({
      file: createMockFile(`${item.name}${item.type}`, item.size),
      size: item.size,
      sizeText: item.sizeText,
      name: `${item.name}${item.type}`,
    }));
    const MOCK_ATTACHMENTS = [
      {
        id: 3628750003,
        uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/363799004/extension/363820004/message-store/3628750004/content/3628750004',
        type: 'Text',
        contentType: 'text/plain',
      },
      ...TEST_FILE.map((item, index) => ({
        id: 3628750000 + index,
        uri: 'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/363799004/extension/363799004/message-store/3628750000/content/3628750000',
        type: 'MmsAttachment',
        contentType: item.file.type,
        size: item.size,
        fileName: item.name,
        width: 210,
        height: 210,
      })),
    ];
    return (
      <Scenario desc="Attach 10 supported attachment files">
        <When
          desc="Go to the Entry, click the attachment button,
										Attache 10 {File Extension} files,
										and upload another file but size less than1.5MB,
										Click OK button"
          action={[
            this.CreateMock,
            <MockMessagePut repeat={0} />,
            <MockMessageList
              repeat={0}
              handler={(mockData) => ({ ...mockData, record: [] })}
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
                attachments: MOCK_ATTACHMENTS,
              })}
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
            <MockCallLogSync
              mockResponse={GenerateCallHistory({ length: 1 })}
              isDefaultInit
              repeat={1}
            />,
            this.Login,
            this.example.Entry,
            ((_, { phone }) => {
              selectFileFn.mockImplementation((args, cb) => {
                cb(
                  TEST_FILE.map((item) => ({
                    file: item.file,
                  })),
                );
              });

              jest
                .spyOn(phone.messageSender, '_validateSenderNumber')
                .mockReturnValue(true);
            }) as StepProp,
            <ClickItemByDataSign dataSign="attachButton" />,
          ]}
        />
        <Then
          desc="Attache files successfully
										Display the order of the files by upload time"
          action={
            <CheckAttachment
              expectedFiles={TEST_FILE.map(({ file }) => file)}
            />
          }
        />
        <When
          desc="Click Send button"
          action={[
            <CheckButton expectDisabled={false} />,
            <ClickItemByDataSign dataSign="messageButton" />,
          ]}
        />
        <Then
          desc="Send successfully"
          action={[
            (async (_, { phone }) => {
              await whenStateChange(() => {
                expect(
                  phone.conversations.currentConversation.messages.length,
                ).toBeGreaterThan(1);
              });
            }) as StepProp,
            <HoverAndCheckImageMessage filename="1.jpg" index={0} />,
            <HoverAndCheckImageMessage filename="2.jpg" index={1} />,
            <HoverAndCheckImageMessage filename="3.jpg" index={2} />,
            <HoverAndCheckImageMessage filename="4.jpg" index={3} />,
            <HoverAndCheckImageMessage filename="5.jpg" index={4} />,
            <HoverAndCheckImageMessage filename="6.jpg" index={5} />,
            <HoverAndCheckImageMessage filename="7.jpg" index={6} />,
            <HoverAndCheckImageMessage filename="8.jpg" index={7} />,
            <HoverAndCheckImageMessage filename="9.jpg" index={8} />,
            <HoverAndCheckImageMessage filename="10.jpg" index={9} />,
          ]}
        />
        <When
          desc="Attache 11 {File Extension} files,but the size is equal to 1.5MB"
          action={[
            () => {
              selectFileFn.mockImplementation((args, cb) => {
                // 10 files with total size 1.5MB
                const TEST_FILE_OVERSIZE = TEST_FILE.concat([
                  {
                    file: createMockFile(`11.jpg`, 0.5 * MB),
                    size: 0.5 * MB,
                    sizeText: '0.5MB',
                    name: '11.jpg',
                  },
                ]);
                cb(
                  TEST_FILE_OVERSIZE.map((item) => ({
                    file: item.file,
                  })),
                );
              });
            },
            <ClickItemByDataSign dataSign="attachButton" />,
          ]}
        />
        <Then
          desc="Display the error message:Can't be more than 10attachments per message
								with close button[L10N]"
          action={[
            <CheckAlertMessage message="Can't be more than 10 attachments per message" />,
          ]}
        />
      </Scenario>
    );
  }
}
