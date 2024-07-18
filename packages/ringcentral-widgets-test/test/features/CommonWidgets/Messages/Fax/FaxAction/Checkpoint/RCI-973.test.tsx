/**
 * RCI-973: Fax action buttons
 * https://test_it_domain/test-cases/RCI-973
 * Preconditions:
 * The user has logged into the CTI app with AI CDC off
 * The user has authorized 3rd party
 * User has unread fax with 3rd party/Personal/Company contacts/unknown number users.
 * There is two fax as below:
 *
  |  |Direction |Read status |From contact |
  | Fax1 |Inbound |Unread |UserA |
	| Fax2 |Outbound |- |Unknown user |

 * AICDC:search number > description > FindCompany Directory Controls
 * 3rd party:Google/Office365/Outlook contacts
 * Entry point(/s):
 * > Messages tab > All/Fax
 *
  | Fax |Action buttons |
  | Fax1 |[View, Download, Delete, View Details, Mark as read] |
	| Fax2 |[View, Download, Delete] |

 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  And,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { ExpandTheActionMenu } from '../../../../../../steps/Messages/actions';
import {
  CheckFaxActionButton,
  CheckFaxActionButtons,
} from '../../../../../../steps/Messages/checks';
import { MockMessageList, MockMessageSync } from '../../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@common
@p2
@title('Action buttons for inbound and outbound fax')
export class RCI973FaxActionButtons extends Step {
  CustomLogin = null;
  CustomCreateMock = null;
  @examples(`
    | direction  | user    | readStatus | actionButtons                                                  |
    | 'Inbound'  | 'UserB' | 'Unread'   | ['View', 'Download', 'Delete', 'View Details', 'Mark as read'] |
    | 'Outbound' | null    | null       | ['View', 'Download', 'Delete']                                 |
  `)
  run() {
    return (
      <Scenario desc="Action buttons for inbound and outbound fax">
        <Given
          desc="User has unread fax"
          action={({ user, readStatus, direction }: any) => [
            this.CustomCreateMock,
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
              isDefaultInit
              repeat={0}
            />,
            <MockMessageSync
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    direction,
                    type: 'Fax',
                    fromName: user,
                    readStatus,
                  },
                ]),
              })}
            />,
          ]}
        />
        <And desc="Login CTI" action={this.CustomLogin} />
        <Then desc="Navigate to Fax" action={NavigateToFax} />
        <When
          desc="Click expand fax action menu of {Fax}"
          action={ExpandTheActionMenu}
        />
        <Then
          desc="The {Action buttons} should show
										[L10N]"
          action={CheckFaxActionButtons}
        />
        <When desc="Hover on view icon" />
        <Then
          desc="'View' should be shown.
										[L10N]"
          action={<CheckFaxActionButton testId="View" />}
        />
      </Scenario>
    );
  }
}
