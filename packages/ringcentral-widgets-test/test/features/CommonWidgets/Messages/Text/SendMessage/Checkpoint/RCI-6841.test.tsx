/**
 * RCI-6841: Preview image message
 * https://test_it_domain/test-cases/RCI-6841
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | File name |File size |
  | .jpeg/.jpg |1 |1.1KB |
	| .png |2 |1.1MB |
	| .bmp |3 |0.1MB |
	| .gif |4 |0.1KB |
	| .tiff/.tif |5 |1KB |
	| .svg |6 |1KB |

 * Entry point(/s):
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | File name |File size |
  | .jpeg/.jpg |1 |1.1KB |
	| .png |2 |1.1MB |
	| .bmp |3 |0.1MB |
	| .gif |4 |0.1KB |
	| .tiff/.tif |5 |1KB |
	| .svg |6 |1KB |

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
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
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
  KB,
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
@common
@p2
@title('Preview image message')
export class RCI6841 extends Step {
  CommonLogin: StepProp = (props) => (
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
      { type: '.jpg', name: '1', size: 1.1 * KB, sizeText: '1.1 KB' },
      { type: '.png', name: '2', size: 1.1 * MB, sizeText: '1.1 MB' },
      { type: '.bmp', name: '3', size: 0.1 * MB, sizeText: '0.1 MB' },
      { type: '.gif', name: '4', size: 0.1 * KB, sizeText: '0.1 KB' },
      { type: '.tif', name: '5', size: 1 * KB, sizeText: '1.0 KB' },
      { type: '.svg', name: '6', size: 1 * KB, sizeText: '1.0 KB' },
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
      <Scenario desc="Preview image message">
        <When
          desc="Go to the Entry, click the attachment button
										Attache the{File Extension} file, and click OK button
										Click Send button"
          action={[
            this.CreateMock,
            <MockMessagePut repeat={0} />,
            <MockMessageList
              repeat={0}
              isDefaultInit
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
              isDefaultInit
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
            this.CommonLogin,
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
            <CheckAttachment
              expectedFiles={TEST_FILE.map(({ file }) => file)}
            />,
            <CheckButton expectDisabled={false} />,
            <ClickItemByDataSign dataSign="messageButton" />,
          ]}
        />
        <Then
          desc="Show the image in the conversation"
          action={[
            (async (_, { phone }) => {
              await whenStateChange(() => {
                expect(
                  phone.conversations.currentConversation.messages.length,
                ).toBeGreaterThan(1);
              });
            }) as StepProp,
          ]}
        />
        <When desc="Hover on the image" />
        <Then
          desc="{File name}with{File Extension}
										Download button with tooltips"
          action={[
            <HoverAndCheckImageMessage filename="1.jpg" index={0} />,
            <HoverAndCheckImageMessage filename="2.png" index={1} />,
            <HoverAndCheckImageMessage filename="3.bmp" index={2} />,
            <HoverAndCheckImageMessage filename="4.gif" index={3} />,
            <HoverAndCheckImageMessage filename="5.tif" index={4} isTif />,
            <HoverAndCheckImageMessage filename="6.svg" index={5} />,
          ]}
        />
      </Scenario>
    );
  }
}
