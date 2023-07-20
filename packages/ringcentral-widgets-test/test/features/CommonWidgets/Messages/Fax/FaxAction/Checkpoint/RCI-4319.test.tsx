/**
 * RCI-4319: View fax contact details
 * https://test_it_domain/test-cases/RCI-4319
 * Preconditions:
 * The user has logged into the CTI app with AI CDC off
 * The user has authorized 3rd party
 * User has unread fax with 3rd party/Personal/Company contacts/unknown number users.
 * There are fax as below:
 *
  |  |Direction |Contact |Contact Source |
  | Fax1 |Inbound |UserA |Company |
	| Fax2 |Outbound |UserB |Personal |
	| Fax3 |Inbound |UserC |3rd party |

 * 3rd party:Google/Office365/Outlook contacts
 * Entry point(/s):
 * > Messages tab > All/Fax >Click expand fax action menu of{Fax}
 */

import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';
import {
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageList,
  MockMessageSync,
  MockCallLogs,
  MockPresence,
  MockAddressBookSync,
} from '../../../../../../steps/Mock';
import { CheckInContactDetailsPage } from '../../../../../../steps/ContactsView';
import {
  CheckFaxActionButton,
  ClickActionButton,
  ExpandTheActionMenu,
} from '../../../../../../steps/Messages';
import { NavigateToFax } from '../../../../../../steps/Navigate';
import { mockMessageListData } from '../../../../../../__mock__';
import { WaitForSpinner } from '../../../../../../steps/WaitForSpinner';

@autorun(test.skip)
@it
@p2
@title('View fax contact details for Company contact')
export class RCI4319CompanyContact extends Step {
  CustomLogin: StepFunction<any, any> | null = null;
  CustomCreateMock: StepFunction<any, any> | null = null;

  @examples(`
    | fax    | direction | number        | contact | contactSource |
    | 'Fax1' | 'Inbound' | '18662105111' | 'UserA' | 'Company'     |
  `)
  run() {
    return (
      <Scenario desc="View fax contact details">
        <Given
          desc="User has ${direction} fax from ${contact}"
          action={({ contact, number, direction }: any) => [
            this.CustomCreateMock,
            <MockExtensionsList
              handler={(mockData) => ({
                ...mockData,
                ...mockExtensionsListData({
                  firstName: contact,
                  phoneNumber: number,
                }),
              })}
            />,
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
              isDefaultInit
              repeat={0}
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData({
                  direction,
                  type: 'Fax',
                  fromName: contact,
                  fromNumber: number,
                }),
              })}
            />,
            <MockCallLogs repeat={3} />,
            <MockPresence repeat={3} />,
          ]}
        />
        <And desc="Login CTI" action={this.CustomLogin} />
        <Then desc="Navigate to Fax" action={NavigateToFax} />
        <When
          desc="Click expand fax action menu of {Fax}"
          action={ExpandTheActionMenu}
        />
        <When desc="Hover on View Details icon" />
        <Then
          desc="'View Details' should be shown
										[L10N]"
          action={<CheckFaxActionButton testId="View Details" />}
        />
        <When
          desc="Click the View Details icon"
          action={<ClickActionButton testId="View Details" />}
        />
        <Then
          desc="User should be navigated to the {Contact} details page from {Contact Source}"
          action={({ contact }: any) => {
            <CheckInContactDetailsPage userName={contact} />;
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('View fax contact details for Personal contact')
export class RCI4319PersonalContact extends Step {
  CustomLogin: StepFunction<any, any> | null = null;
  CustomCreateMock: StepFunction<any, any> | null = null;

  @examples(`
    | fax    | direction  | number        | contact | contactSource |
    | 'Fax2' | 'Outbound' | '18600000000' | 'UserB' | 'Personal'    |
  `)
  run() {
    return (
      <Scenario desc="View fax contact details">
        <Given
          desc="User has ${direction} fax from ${contact}"
          action={({ contact, number, direction }: any) => [
            this.CustomCreateMock,
            <MockAddressBookSync
              handler={(personalUsers) => {
                const firstPersonalUser = personalUsers[0];

                firstPersonalUser.firstName = contact;
                firstPersonalUser.middleName = '';
                firstPersonalUser.lastName = '';
                firstPersonalUser.homePhone = number;

                return personalUsers;
              }}
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
              useFaker
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData({
                  direction,
                  type: 'Fax',
                  toName: contact,
                  toNumber: number,
                }),
              })}
            />,
            <MockCallLogs repeat={3} />,
            <MockPresence repeat={3} />,
          ]}
        />
        <And desc="Login CTI" action={this.CustomLogin} />
        <Then desc="Navigate to Fax" action={[NavigateToFax, WaitForSpinner]} />
        <When
          desc="Click expand fax action menu of {Fax}"
          action={ExpandTheActionMenu}
        />
        <When desc="Hover on View Details icon" />
        <Then
          desc="'View Details' should be shown
										[L10N]"
          action={<CheckFaxActionButton testId="View Details" />}
        />
        <When
          desc="Click the View Details icon"
          action={<ClickActionButton testId="View Details" />}
        />
        <Then
          desc="User should be navigated to the {Contact} details page from {Contact Source}"
          action={({ contact }: any) => {
            <CheckInContactDetailsPage userName={contact} />;
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('View fax contact details for Third Party')
export class RCI4319ThirdParty extends Step {
  CustomLogin: StepFunction<any, any> | null = null;
  CustomCreateMock: StepFunction<any, any> | null = null;

  @examples(`
    | fax    | direction | number         | contact | contactSource |
    | 'Fax3' | 'Inbound' | '+18662105333' | 'UserC' | '3rd party'   |
  `)
  run() {
    return (
      <Scenario desc="View fax contact details">
        <Given
          desc="User has ${direction} fax from ${contact}"
          action={({ contact, number, direction }: any) => [
            this.CustomCreateMock({ contact, number }),
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
              repeat={0}
              isDefaultInit
            />,
            <MockMessageSync
              useFaker
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData({
                  direction,
                  type: 'Fax',
                  fromName: contact,
                  fromNumber: number,
                }),
              })}
            />,
            <MockCallLogs repeat={5} />,
            <MockPresence repeat={3} />,
          ]}
        />
        <And desc="Login CTI" action={this.CustomLogin} />
        <Then desc="Navigate to Fax" action={[NavigateToFax, WaitForSpinner]} />
        <When
          desc="Click expand fax action menu of {Fax}"
          action={ExpandTheActionMenu}
        />
        <When desc="Hover on View Details icon" />
        <Then
          desc="'View Details' should be shown
										[L10N]"
          action={<CheckFaxActionButton testId="View Details" />}
        />
        <When
          desc="Click the View Details icon"
          action={<ClickActionButton testId="View Details" />}
        />
        <Then
          desc="User should be navigated to the {Contact} details page from {Contact Source}"
          action={({ contact }: any) => {
            <CheckInContactDetailsPage userName={contact} />;
          }}
        />
      </Scenario>
    );
  }
}
