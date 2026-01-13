/**
 * RCI-6813: Remove attach1 supported attchment file
 * https://test_it_domain/test-cases/RCI-6813
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
  And,
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
@title('Remove attach1 supported attachment file')
export class RemoveAttachment extends Step {
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
    const TEST_JPG_FILE = {
      file: createMockFile('file1.jpg'),
      size: 1 * MB,
      name: 'file1.jpg',
    };
    return (
      <Scenario
        desc="Remove attach1 supported attachment file"
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
          <MockCallLogSync
            mockResponse={GenerateCallHistory({ length: 1 })}
            isDefaultInit
            repeat={1}
          />,
          this.Login,
          this.example.Entry,
          (() => {
            selectFileFn.mockImplementation((args, cb) => {
              cb([{ file: TEST_JPG_FILE.file }]);
            });
          }) as StepProp,
        ]}
      >
        <When
          desc="Go to theEntry,click the attachment button
										Attach the file like 1.jpg, and click the OK button"
          action={<ClickItemByDataSign dataSign="attachButton" />}
        />
        <And
          desc="After attache successfully, click the remove button"
          action={[
            <CheckAttachment expectedFiles={[TEST_JPG_FILE.file]} />,
            <CheckButton expectDisabled={false} />,
            <ClickItemByDataSign dataSign="removeFileIconButton" />,
          ]}
        />
        <Then
          desc="The upload file1.jpg removed
								The send button change to disabled"
          action={[
            <CheckAttachment expectedFiles={[]} />,
            <CheckButton expectDisabled />,
          ]}
        />
      </Scenario>
    );
  }
}
