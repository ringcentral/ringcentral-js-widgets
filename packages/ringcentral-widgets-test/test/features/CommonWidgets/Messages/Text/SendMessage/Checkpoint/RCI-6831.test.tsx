/**
 * RCI-6831: Download MMS attachment
 * https://test_it_domain/test-cases/RCI-6831
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
  | Entry |Precondition |Preview |
  | 1 |Click 'Compose Text' >Input{PhoneNumber}in 'To' field, and send 1.mp4 to UserX |MMS with 1 attachment |
	| 2 |Click 'Compose Text' >Input{PhoneNumber}in 'To' field, and send 1.jpg/2.jpgto UserX |MMS with 2 attachments |

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
  CheckButton,
  ClickDownloadAndCheckAction,
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

jest.mock('@ringcentral-integration/utils', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@ringcentral-integration/utils'),
    downloadFileWithIframe: jest.fn(() => Promise.resolve()),
  };
});

const MOCK_FILE_PATH_1 =
  'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4833668004/content/1580932004';
const MOCK_FILE_PATH_2 =
  'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4854010004/content/1584662004';

@autorun(test.skip)
@it
@p2
@common
@title('Download MMS attachment')
export class RCI6831 extends Step {
  CommonLogin: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      scenario: 'send 1.mp4 to UserX',
      mockData: [
        {
          id: 4833668004,
          direction: 'Outbound',
          toNumber: '+18662100000',
          toName: 'UserX',
          creationTime: '2024-08-27T07:47:46.000Z',
          attachments: [
            {
              id: 4833668004,
              uri: 'https://api-rcapps-labs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4833668004/content/4833668004',
              type: 'Text',
              contentType: 'text/plain',
            },
            {
              id: 1580932004,
              uri: MOCK_FILE_PATH_1,
              type: 'MmsAttachment',
              contentType: 'video/mpeg',
              size: 42310,
              fileName: '1.mp4',
              width: 462,
              height: 220,
            },
          ],
          subject: ' ',
          conversationId: 2467782659106404480,
          conversation: {
            id: '2467782659106404480',
            uri: 'https://api-rcapps-labs_domain/restapi/v1.0/conversation/2467782659106404480',
          },
        },
      ],
    },
    {
      scenario: 'send 1.jpg/2.jpg to UserX',
      mockData: [
        {
          id: 4854010004,
          toNumber: '+18662100000',
          toName: 'UserX',
          creationTime: '2024-08-28T06:57:11.000Z',
          attachments: [
            {
              id: 4854010004,
              uri: 'https://api-rcapps-labs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4854010004/content/4854010004',
              type: 'Text',
              contentType: 'text/plain',
            },
            {
              id: 1584661004,
              uri: MOCK_FILE_PATH_1,
              type: 'MmsAttachment',
              contentType: 'image/jpeg',
              size: 87167,
              fileName: '1.jpg',
              width: 210,
              height: 210,
            },
            {
              id: 1584662004,
              uri: MOCK_FILE_PATH_2,
              type: 'MmsAttachment',
              contentType: 'image/jpeg',
              size: 87167,
              fileName: '2.jpg',
              width: 210,
              height: 210,
            },
          ],
          direction: 'Outbound',
          subject: 'hello',
          smsSendingAttemptsCount: 1,
          conversationId: 2467968175823830060,
          conversation: {
            id: '2467968175823830060',
            uri: 'https://api-rcapps-labs_domain/restapi/v1.0/conversation/2467968175823830060',
          },
          lastModifiedTime: '2024-08-28T06:57:11.395Z',
        },
      ],
    },
  ])
  run() {
    return (
      <Scenario desc="Download MMS attachment">
        <When
          desc="Go to the Entry, open the message conversation, click the download button"
          action={[
            this.CreateMock,
            <MockMessageList
              repeat={0}
              isDefaultInit
              handler={(mockData) => ({ ...mockData, record: [] })}
            />,
            <MockMessageSync
              repeat={0}
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                records: mockMessageListData(this.example.mockData).records,
              })}
            />,
            this.CommonLogin,
            NavigateToMessagesTab,
            <ClickItemByDataSign dataSign="msgDetail" index={0} />,
          ]}
        />
        <Then
          desc="Download button enabled
										Start downloading the file"
        />
        <When desc="After the download successfully" />
        <Then
          desc="Download button change to enabled
										The attachment download to local"
          action={
            ((_, { phone }) => {
              const accessToken = phone.auth.token.accessToken;
              if (this.example.scenario === 'send 1.mp4 to UserX') {
                return (
                  <ClickDownloadAndCheckAction
                    downloadLink={`${MOCK_FILE_PATH_1}?access_token=${accessToken}&shouldCache=true&contentDisposition=Attachment`}
                    fileName="1.mp4"
                    type="file"
                  />
                );
              }

              if (this.example.scenario === 'send 1.jpg/2.jpg to UserX') {
                return [
                  <ClickDownloadAndCheckAction
                    downloadLink={`${MOCK_FILE_PATH_1}?access_token=${accessToken}&shouldCache=true&contentDisposition=Attachment`}
                    fileName="1.jpg"
                    type="image"
                  />,
                  <ClickDownloadAndCheckAction
                    downloadLink={`${MOCK_FILE_PATH_2}?access_token=${accessToken}&shouldCache=true&contentDisposition=Attachment`}
                    fileName="2.jpg"
                    type="image"
                  />,
                ];
              }
            }) as StepProp
          }
        />
      </Scenario>
    );
  }
}
