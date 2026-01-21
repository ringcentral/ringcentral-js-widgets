/**
 * RCI-6830: Preview MMS on message list
 * https://test_it_domain/test-cases/RCI-6830
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
  | 1 |Click 'Compose Text' >Input{PhoneNumber}in 'To' field, and send 1.jpg to UserX |MMS with 1 attachmentNote:MMS with X attachment, x is the attachment quantity |
	| 2 |Click 'Compose Text' >Input{PhoneNumber}/102/103in 'To' field, and send 1.jpg/2.jpgto UserX, 102,103 |MMS with 2 attachments |
	| 3 |Click 'Compose Text' >Input 7204084363 in 'To' field, send text 'hello' and 1.jpg |MMS with 1 attachment |

 */
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
  type StepFunction,
  screen,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@common
@title('Preview MMS on message list')
export class RCI6830 extends Step {
  CommonLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;

  @examples([
    {
      scenario: 'MMS with 1 attachment',
      preview: 'MMS with 1 attachment',
      mockData: [
        {
          id: 4833668004,
          to: [
            {
              phoneNumber: '+18662100000',
              name: 'UserX',
              location: 'Los Angeles, CA',
            },
          ],
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
              uri: 'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4833668004/content/1580932004',
              type: 'MmsAttachment',
              contentType: 'image/jpg',
              size: 42310,
              fileName: 'download.png',
              width: 462,
              height: 220,
            },
          ],
          direction: 'Outbound',
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
      scenario: 'send text "hello", 1.jpg  and 2.gif',
      preview: 'MMS with 2 attachments',
      mockData: [
        {
          id: 4854010004,
          to: [
            {
              phoneNumber: '+17204084363',
              location: 'Brighton, CO',
            },
          ],
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
              uri: 'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4854010004/content/1584661004',
              type: 'MmsAttachment',
              contentType: 'image/jpeg',
              size: 87167,
              fileName: '1.jpg',
              width: 210,
              height: 210,
            },
            {
              id: 1584662004,
              uri: 'https://media-xmrupxmn.intlabs_domain/restapi/v1.0/account/334153004/extension/334153004/message-store/4854010004/content/1584662004',
              type: 'MmsAttachment',
              contentType: 'image/gif',
              size: 87167,
              fileName: '2.gif',
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
    const { CommonLogin, CreateMock } = this;
    return (
      <Scenario desc="Preview MMS on message list">
        <When
          desc="Go to the Entry, go to the Message List"
          action={[
            CreateMock,
            <MockMessageList repeat={0} />,
            <MockMessageSync
              repeat={0}
              handler={(mockData) => ({
                ...mockData,
                records: mockMessageListData(this.example.mockData).records,
              })}
            />,
            CommonLogin,
            NavigateToMessagesTab,
          ]}
        />
        <Then
          desc="Display {Preview}[L10N]"
          action={() => {
            expect(screen.getByText(this.example.preview)).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
