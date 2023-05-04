/**
 * RCI-885: Filter contacts
 * https://test_id_domain/test-cases/RCI-885
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2.User has logged in to RC CTI app
 * 3.There are some records for Google/O365, Company , Personal contacts in account
 * Entry point(/s):
 * More -> Contacts
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
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import { StepProp } from '../../../../lib/step';
import { CommonLogin } from '../../../../steps/CommonLogin';
import {
  CheckContactItemExistInList,
  CheckContactSourceFilterButton,
  CheckContactSourceList,
  ClickContactSourceFilterButton,
  SearchContacts,
  SelectContactSourceFilter,
} from '../../../../steps/ContactsView';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../steps/Mock';
import { NavigateToContacts } from '../../../../steps/Navigate';

@autorun(test)
@it
@p2
@common
@title('Filter contacts')
export class RCI885 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  MockThirdPartyContacts: StepProp = () => {};

  companyContactName = 'John Company';
  thirdPartyContactName = 'John 3rd Party';

  @examples(`
    | thirdPartyOption |
    | ''               |
  `)
  run() {
    const { Login, CreateMock, MockThirdPartyContacts } = this;
    return (
      <Scenario
        desc="Filter contacts"
        action={() => [
          CreateMock,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData([
                {
                  firstName: this.companyContactName,
                  lastName: '',
                  extensionNumber: '101',
                  phoneNumber: '+12054332854',
                  hidden: false,
                  phoneNumberHidden: false,
                },
              ]),
            })}
          />,
          MockThirdPartyContacts,
        ]}
      >
        <Given desc="More -> Contacts" action={[Login, NavigateToContacts]} />
        <When
          desc="Click filter icon"
          action={ClickContactSourceFilterButton}
        />
        <Then
          desc="Contact screen should has contact filters 'All / Company / Personal / 3rd party(for Account_A)'
										All selected by default"
          action={<CheckContactSourceList selectedOption="All" />}
        />
        <When
          desc="Select one of contact filter, then hover on filter icon"
          action={<SelectContactSourceFilter filter="Company" />}
        />
        <Then
          desc="Contact items should be displayed by the selected filter
										It will show corresponding tooltips"
          action={
            <CheckContactSourceFilterButton
              tooltip="Company"
              showSelectedFilter
            />
          }
        />
        <When
          desc="Select 3rd party filter(for Account_A)
										Note: Account_B doesn't have 3rd party filter options"
          action={({ thirdPartyOption }: { thirdPartyOption?: string }) => {
            if (thirdPartyOption) {
              return [
                ClickContactSourceFilterButton,
                <SelectContactSourceFilter filter={thirdPartyOption} />,
              ];
            }
          }}
        />
        <Then
          desc="Directory and personal of 3rd party contacts should be displayed"
          action={({ thirdPartyOption }: { thirdPartyOption?: string }) => {
            if (thirdPartyOption) {
              return (
                <CheckContactItemExistInList
                  userName={this.thirdPartyContactName}
                />
              );
            }
          }}
        />
        <When
          desc="Search contact in search box"
          action={({ thirdPartyOption }: { thirdPartyOption?: string }) => (
            <SearchContacts
              content={
                thirdPartyOption
                  ? this.thirdPartyContactName
                  : this.companyContactName
              }
            />
          )}
        />
        <Then
          desc="Search results should be applied selected filter"
          action={({ thirdPartyOption }: { thirdPartyOption?: string }) => (
            <CheckContactItemExistInList
              userName={
                thirdPartyOption
                  ? this.thirdPartyContactName
                  : this.companyContactName
              }
            />
          )}
        />
      </Scenario>
    );
  }
}
