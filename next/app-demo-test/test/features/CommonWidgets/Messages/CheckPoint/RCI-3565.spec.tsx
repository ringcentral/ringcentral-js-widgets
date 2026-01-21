/**
 * RCI-3565: Total message unread count
 * https://test_it_domain/test-cases/RCI-3565
 * Preconditions:
 * The user has logged into the CTI app
 * The user has fax and SMS permission
 * The user has authorized RingCentral for Google
 * Entry point(/s):
 * The user has unread voicemail with{Unread voicemail count}, unread fax with{Unread fax count} and unread text message with {Unread text count}
 *
  | Unread voicemail count |Unread fax count |Unread text count |Total unread count |
  | 3 |3 |94 |99+ |
	| 0 |3 |0 |3 |
	| 1 |0 |0 |1 |
	| 0 |0 |2 |2 |

 */
import messageSyncBody from '@ringcentral-integration/mock/src/platform/data/messageSync.json';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CheckMessageNavUnreadCount } from '../../../../steps/Messages';
import {
  CreateMock,
  generateMessage,
  MockMessageSync,
} from '../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../steps/Navigate';

@autorun(test)
@p2
@it
@common
@title('Total message unread count')
export class TotalMessageUnreadCount extends Step {
  CustomLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock: StepFunction<any, any> = CreateMock;

  @examples(`
    | unreadVoicemailCount | unreadFaxCount | unreadTextCount | totalUnreadCount |
    | 3                    | 3              | 94              | '99+'            |
    | 0                    | 3              | 0               | '3'              |
    | 1                    | 0              | 0               | '1'              |
    | 0                    | 0              | 2               | '2'              |
  `)
  run() {
    const { CustomLogin, CustomCreateMock } = this;
    return (
      <Scenario desc="Total message unread count">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={() => [
            CustomCreateMock,
            <MockMessageSync
              useFaker
              isDefaultInit
              handler={() => ({
                ...messageSyncBody,
                records: [
                  ...generateMessage({
                    length: this.context.example.unreadTextCount,
                    unreadCount: this.context.example.unreadTextCount,
                    type: 'SMS',
                  }),
                  ...generateMessage({
                    length: this.context.example.unreadVoicemailCount,
                    unreadCount: this.context.example.unreadVoicemailCount,
                    type: 'VoiceMail',
                  }),
                  ...generateMessage({
                    length: this.context.example.unreadFaxCount,
                    unreadCount: this.context.example.unreadFaxCount,
                    type: 'Fax',
                  }),
                ],
              })}
            />,
            CustomLogin,
          ]}
        />
        <When
          desc="Check the total unread message count from the right-top side of Message tab"
          action={NavigateToMessagesTab}
        />
        <Then
          desc="The total unread count should be ${totalUnreadCount}"
          action={
            <CheckMessageNavUnreadCount
              count={this.context.example.totalUnreadCount}
            />
          }
        />
      </Scenario>
    );
  }
}
