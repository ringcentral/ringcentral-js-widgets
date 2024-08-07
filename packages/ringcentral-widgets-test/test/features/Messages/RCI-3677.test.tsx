/**
 * RCI-3677: Fax log for user was hide
 * https://test_it_domain/test-cases/RCI-3677
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserAhas loggedinto CTI app
 * UserBhave fax with UserA before on the Message page
 * UserB is one of the company contacts for UserA and has settings below
 *
  | AI CDC |Include user |Contacts |Phone number |
  | On |Off |UserB |18662105111 |

 * AICDC:search number > description > Filter CDC
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../__mock__';
import {
  ExpandTheActionMenu,
  CheckActionMenu,
  CheckFaxActionMenu,
} from '../../steps/Messages';
import {
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageList,
  MockMessageSync,
} from '../../steps/Mock';
import { NavigateToMessagesTab } from '../../steps/Navigate/actions/NavigateToMessages';

interface IFax3677Props {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}
@autorun(test.skip)
@it
@p2
@title('Fax action for user was hide')
export class Fax3677 extends Step<IFax3677Props> {
  CustomLogin = null;
  CustomCreateMock = null;

  @examples(`
    | user    | number        | source          |
    | 'UserB' | '18662105111' | 'ContactNumber' |
`)
  run() {
    return (
      <Scenario
        desc="Fax action for user was hide"
        action={({ user, number, source }: any) => [
          this.CustomCreateMock,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData({
                hidden: true,
                firstName: user,
                phoneNumber: number,
                phoneNumberUsageType: source,
              }),
            })}
          />,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData(null),
            })}
            repeat={0}
            isDefaultInit
          />,
          <MockMessageSync
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                direction: 'Inbound',
                type: 'Fax',
                toName: user,
                toNumber: number,
              }),
            })}
          />,
        ]}
      >
        <Given
          desc="UserA has contact 'Test contact', mock his extension info"
          action={this.CustomLogin}
        />
        <When
          desc="> Go to the Entry point
                  > Check the fax with {Contacts}
                  > Expand the fax"
          action={[NavigateToMessagesTab, ExpandTheActionMenu]}
        />
        <Then
          desc="1. There are action buttons: View, Download, Mark as read/unread and Delete
                  2. There is no View Details button"
          action={
            <>
              <CheckActionMenu
                expectShowEntityButton={false}
                expectShowCallButton={false}
              />
              <CheckFaxActionMenu />
            </>
          }
        />
      </Scenario>
    );
  }
}
