/**
 * RCI-6872: Inbound MMS display id as filename
 * https://test_it_domain/test-cases/RCI-6872
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

 */
import { whenStateChange } from '@ringcentral-integration/core/test';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepProp,
  screen,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  HoverAndCheckFileMessage,
  HoverAndCheckImageMessage,
} from '../../../../../../steps/Messages';
import {
  createMockFile,
  KB,
  MB,
} from '../../../../../../steps/Messages/Files/createMockFile';
import {
  CreateMock,
  MockMessageList,
  MockMessagePut,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../../steps/Navigate';

jest.mock('utif', () => ({
  ...jest.requireActual('utif'),
  decode: jest.fn().mockReturnValue([{ width: 210, height: 210 }]),
  decodeImage: jest.fn(),
  toRGBA8: jest.fn().mockReturnValue(new Uint8Array(210 * 210 * 4)),
}));

@autorun(test.skip)
@it
@p2
@common
@title('Inbound MMS display id as filename')
export class InboundMMSDisplay extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    const files = [
      {
        type: '.jpg',
        name: '1',
        size: 1.1 * KB,
        sizeText: '1.1 KB',
        contentType: 'image/jpeg',
      },
      {
        type: '.png',
        name: '2',
        size: 1.1 * MB,
        sizeText: '1.1 MB',
        contentType: 'image/png',
      },
      {
        type: '.bmp',
        name: '3',
        size: 1 * MB,
        sizeText: '1 MB',
        contentType: 'image/bmp',
      },
      {
        type: '.gif',
        name: '4',
        size: 0.1 * KB,
        sizeText: '0.1 KB',
        contentType: 'image/gif',
      },
      {
        type: '.tif',
        name: '5',
        size: 1 * KB,
        sizeText: '1.0 KB',
        contentType: 'image/tiff',
      },
      {
        type: '.svg',
        name: '6',
        size: 1 * KB,
        sizeText: '1.0 KB',
        contentType: 'image/svg+xml',
      },
      {
        type: '.webp',
        name: '7',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'image/webp',
      },
      {
        type: '.mp4',
        name: '8',
        size: 1 * KB,
        sizeText: '1.0 KB',
        contentType: 'video/mp4',
      },
      {
        type: '.mpeg',
        name: '9',
        size: 1 * KB,
        sizeText: '1.0 KB',
        contentType: 'video/mpeg',
      },
      {
        type: '.mp3',
        name: '10',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/mpeg',
      },
      {
        type: '.vcf',
        name: '11',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'text/vcard',
      },
      {
        type: '.zip',
        name: '12',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'application/zip',
      },
      {
        type: '.wmv',
        name: '13',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'x-ms-wmv',
      },
      {
        type: '.flv',
        name: '14',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'x-flv',
      },
      {
        type: '.txt',
        name: '15',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'text/plain',
      },
      {
        type: '.html',
        name: '16',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'text/html',
      },
      {
        type: '.gz',
        name: '17',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'application/gzip',
      },
      {
        type: '.amr',
        name: '18',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/amr',
      },
      {
        type: '.rtf',
        name: '19',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'application/rtf',
      },
      {
        type: '.avi',
        name: '20',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/x-msvideo',
      },
      {
        type: '.msvideo',
        name: '21',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/msvideo',
      },
      {
        type: '.flv',
        name: '22',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/x-flv',
      },
      {
        type: '.mov',
        name: '23',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/quicktime',
      },
      {
        type: '.pdf',
        name: '24',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'application/pdf',
      },
      {
        type: '.wav',
        name: '25',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/wav',
      },
      {
        type: '.wav',
        name: '26',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/x-wav',
      },
      {
        type: '.3gp',
        name: '27',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/3gpp',
      },
      {
        type: '.webm',
        name: '28',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/webm',
      },
      {
        type: '.wmv',
        name: '29',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/x-ms-wmv',
      },
      {
        type: '.ogg',
        name: '30',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'video/ogg',
      },
      {
        type: '.oga',
        name: '31',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/ogg',
      },
      {
        type: '.ogg',
        name: '32',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'application/ogg',
      },
      {
        type: '.csv',
        name: '33',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'text/csv',
      },
      {
        type: '.ics',
        name: '34',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'text/calendar',
      },
      {
        type: '.m4a',
        name: '35',
        size: 1 * MB,
        sizeText: '1.0 MB',
        contentType: 'audio/mp4',
      },
    ];
    const TEST_FILE = files.map((item) => ({
      file: createMockFile(`${item.name}${item.type}`, item.size),
      size: item.size,
      sizeText: item.sizeText,
      name: `${item.name}${item.type}`,
      contentType: item.contentType,
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
        width: 210,
        height: 210,
      })),
    ];
    return (
      <Scenario desc="Inbound MMS display id as filename">
        <When
          desc="Receive{File Extension} file, go to SMS conversation details"
          action={[
            this.CreateMock,
            <MockMessagePut repeat={0} />,
            ((_, { rcMock }) => {
              HTMLCanvasElement.prototype.getContext = jest
                .fn()
                .mockReturnValue({
                  createImageData: jest.fn().mockReturnValue({
                    data: new Uint8ClampedArray(210 * 210 * 4),
                  }),
                  putImageData: jest.fn(),
                });
              rcMock.fetchMock.mock(
                `begin:https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/363799004/extension/363799004/message-store/3628750000/content/3628750000`,
                200,
                {
                  method: 'GET',
                  response: { body: new Blob([''], { type: 'image/tiff' }) },
                  repeat: 0,
                },
              );
            }) as StepProp,
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
                    direction: 'Inbound',
                    toNumber: '+18662100000',
                    conversationId: 1699508180182,
                    conversation: {
                      id: 1699508180182,
                      uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/1699508180182',
                    },
                    attachments: MOCK_ATTACHMENTS,
                  },
                ]),
              })}
            />,
            this.Login,
            <NavigateToMessagesTab />,
            <ClickItemByDataSign dataSign="msgDetail" index={0} />,
            this.example.Entry,
          ]}
        />
        <Then
          desc="Display:
                Send time
                {File icon}
                {id}with{File Extension}
                {File size}
                Download button with tooltips"
          action={[
            (async (_, { phone }) => {
              await whenStateChange(() => {
                expect(
                  phone.conversations.currentConversation.messages.length,
                ).toBe(1);
              });

              // Send time
              expect(
                screen.getByTestId('conversationSendTime'),
              ).toBeInTheDocument();
            }) as StepProp,
            <HoverAndCheckImageMessage filename="3628750000.jpg" index={0} />,
            <HoverAndCheckImageMessage filename="3628750001.png" index={1} />,
            <HoverAndCheckImageMessage filename="3628750002.bmp" index={2} />,
            <HoverAndCheckImageMessage filename="3628750003.gif" index={3} />,
            <HoverAndCheckImageMessage
              isTif
              filename="3628750004.tif"
              index={4}
            />,
            <HoverAndCheckImageMessage filename="3628750005.svg" index={5} />,
            <HoverAndCheckImageMessage filename="3628750006.webp" index={6} />,
            // following files are not image, rendered in InboundAttachment, index starts from 0
            <HoverAndCheckFileMessage filename="3628750007.mp4" index={0} />,
            <HoverAndCheckFileMessage filename="3628750008.mpeg" index={1} />,
            <HoverAndCheckFileMessage filename="3628750009.mp3" index={2} />,
            <HoverAndCheckFileMessage filename="3628750010.vcf" index={3} />,
            <HoverAndCheckFileMessage filename="3628750011.zip" index={4} />,
            <HoverAndCheckFileMessage filename="3628750012.wmv" index={5} />,
            <HoverAndCheckFileMessage filename="3628750013.flv" index={6} />,
            <HoverAndCheckFileMessage filename="3628750014.txt" index={7} />,
            <HoverAndCheckFileMessage filename="3628750015.html" index={8} />,
            <HoverAndCheckFileMessage filename="3628750016.gz" index={9} />,
            <HoverAndCheckFileMessage filename="3628750017.amr" index={10} />,
            <HoverAndCheckFileMessage filename="3628750018.rtf" index={11} />,
            <HoverAndCheckFileMessage filename="3628750019.avi" index={12} />,
            <HoverAndCheckFileMessage
              filename="3628750020.msvideo"
              index={13}
            />,
            <HoverAndCheckFileMessage filename="3628750021.flv" index={14} />,
            <HoverAndCheckFileMessage filename="3628750022.mov" index={15} />,
            <HoverAndCheckFileMessage filename="3628750023.pdf" index={16} />,
            <HoverAndCheckFileMessage filename="3628750024.wav" index={17} />,
            <HoverAndCheckFileMessage filename="3628750025.wav" index={18} />,
            <HoverAndCheckFileMessage filename="3628750026.3gp" index={19} />,
            <HoverAndCheckFileMessage filename="3628750027.webm" index={20} />,
            <HoverAndCheckFileMessage filename="3628750028.wmv" index={21} />,
            <HoverAndCheckFileMessage filename="3628750029.ogg" index={22} />,
            <HoverAndCheckFileMessage filename="3628750030.oga" index={23} />,
            <HoverAndCheckFileMessage filename="3628750031.ogg" index={24} />,
            <HoverAndCheckFileMessage filename="3628750032.csv" index={25} />,
            <HoverAndCheckFileMessage filename="3628750033.ics" index={26} />,
            <HoverAndCheckFileMessage filename="3628750034.m4a" index={27} />,
          ]}
        />
      </Scenario>
    );
  }
}
