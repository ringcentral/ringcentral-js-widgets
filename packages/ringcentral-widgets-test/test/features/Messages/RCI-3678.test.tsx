/**
 * RCI-3678: Fax log for user not publish number
 * https://test_it_domain/test-cases/RCI-3678
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserAhas loggedinto CTI app
 * UserBhave fax with UserA before on the Message page
 * UserB is one of the company contacts for UserA and has settings below
 *
  | AI CDC |Include user |Publish number |Contacts |Phone number |
  | On |On |Off |UserB |18662105111 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
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
  MockMessageSync,
  MockMessageList,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../steps/Mock';
import { NavigateToMessagesTab } from '../../steps/Navigate/actions/NavigateToMessages';

interface IFax3678Props {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}
@autorun(test.skip)
@common
@it
@p2
@title('Fax action buttons for user not publish number')
export class Fax3678 extends Step<IFax3678Props> {
  CustomLogin = null;
  CustomCreateMock = null;
  @examples(`
    | user    | number        | source          |
    | 'UserB' | '18662105111' | 'ContactNumber' |
  `)
  run() {
    return (
      <Scenario
        desc="Fax action buttons for user not publish number"
        action={({ user, number, source }: any) => [
          this.CustomCreateMock,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData({
                hidden: false,
                firstName: user,
                phoneNumber: number,
                phoneNumberUsageType: source,
                phoneNumberHidden: true,
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
          desc="There are action buttons: View, View Details, Download, Mark as read/unread and Delete"
          action={
            <>
              <CheckActionMenu
                expectShowEntityButton
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
