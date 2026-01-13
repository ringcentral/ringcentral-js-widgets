/**
 * RCI-6806: Attach 1 supported attchment file
 * https://test_it_domain/test-cases/RCI-6806
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | File name |File icon |File size |
  | .jpeg/.jpg |1 | |1.1KB |
	| .png |2 | |1.1MB |
	| .bmp |3 | |1MB |
	| .gif |4 | |0.1KB |
	| .tiff/.tif |5 | |1KB |
	| .svg |6 | |1KB |
	| .mp4 |8 | |1KB |
	| .mpeg |9 | |1KB |
	| .mp3 |11 | |1MB |
	| .vcf/.vcard |12 | |1MB |
	| .zip |13 | |1MB |

 * Entry point(/s):
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into CTI
 * UserA has contacts below
 *
  | Contacts |Phone Number |
  | UserX |18662100000 |

 *
  | File name |File icon |File size |
  | .jpeg/.jpg |1 | |1.1KB |
	| .png |2 | |1.1MB |
	| .bmp |3 | |1MB |
	| .gif |4 | |0.1KB |
	| .tiff/.tif |5 | |1KB |
	| .svg |6 | |1KB |
	| .mp4 |8 | |1KB |
	| .mpeg |9 | |1KB |
	| .mp3 |11 | |1MB |
	| .vcf/.vcard |12 | |1MB |
	| .zip |13 | |1MB |

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
  within,
  fireEvent,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
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
@title('Attach 1 supported attachment file')
export class RCI6806 extends Step {
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
    const item = {
      name: 'I am a long long long name15',
      type: '.rtf',
      size: 1 * MB,
      sizeText: '1.0 MB',
    };

    const TEST_FILE = {
      file: createMockFile(`${item.name}${item.type}`, item.size),
      size: item.size,
      sizeText: item.sizeText,
      name: `${item.name}${item.type}`,
    };
    return (
      <Scenario desc="Attach 1 supported attachment file">
        <When
          desc="Go to the Entry, click the attachment button"
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
            <MockMessageSync
              repeat={0}
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
                cb([{ file: TEST_FILE.file }]);
              });

              jest
                .spyOn(phone.messageSender, '_validateSenderNumber')
                .mockReturnValue(true);
            }) as StepProp,
          ]}
        />
        <Then
          desc="Open the system file selector
										The {File Extension} file are enabled"
          action={[
            <ClickItemByDataSign dataSign="attachButton" />,
            <CheckAttachment expectedFiles={[TEST_FILE.file]} />,
          ]}
        />
        <When
          desc="After attache successfully"
          action={() => {
            const EXPECT_FILES = [
              'image/tiff',
              'image/gif',
              'image/jpeg',
              'image/bmp',
              'image/png',
              'image/svg+xml',
              'text/vcard',
              'video/mp4',
              'video/mpeg',
              'audio/mpeg', // .mp3
              'application/zip',
            ];
            expect(selectFileFn).toHaveBeenCalledWith(
              { accept: EXPECT_FILES.join(','), multiple: true },
              expect.any(Function),
            );
          }}
        />
        <Then
          desc="Display the {File name} with{File Extension}and remove button below the input box
										The Send button enabled"
          action={[
            <CheckAttachment expectedFiles={[TEST_FILE.file]} />,
            <CheckButton expectDisabled={false} />,
          ]}
        />
        <When
          desc="Click Send button"
          action={[<ClickItemByDataSign dataSign="messageButton" />]}
        />
        <Then
          desc="Display:
										Send time
										{File icon}
										{File name}with{File Extension}
										{File size}
										Download button with tooltips[L10N]"
          action={
            (async (_, { phone }) => {
              await whenStateChange(() => {
                expect(
                  phone.conversations.currentConversation.messages,
                ).toHaveLength(2);
              });

              // Send time
              expect(
                screen.getByTestId('conversationSendTime'),
              ).toBeInTheDocument();

              // Check file
              const messages = screen.getAllByTestId('message');
              const newestMessage = messages[messages.length - 1];
              // {File icon}
              expect(
                newestMessage.querySelector('.file_border'),
              ).toBeInTheDocument();
              // {File name}with{File Extension}
              expect(
                within(newestMessage).getByTestId('file-full-name'),
              ).toHaveTextContent(TEST_FILE.name);
              // {File size}
              expect(
                within(newestMessage).getByText(TEST_FILE.sizeText),
              ).toBeInTheDocument();
              // Download button with tooltips
              const downloadButton =
                within(newestMessage).getByTestId('download');
              expect(downloadButton).toBeInTheDocument();
              jest.useFakeTimers();
              fireEvent.mouseEnter(downloadButton);
              jest.advanceTimersByTime(1000);
              expect(screen.getByRole('tooltip')).toHaveTextContent('Download');

              fireEvent.mouseLeave(downloadButton);
              jest.advanceTimersByTime(1000);
              jest.useRealTimers();
            }) as StepProp
          }
        />
      </Scenario>
    );
  }
}
