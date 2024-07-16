/**
 * RCI-3382: Search contact not match any contact
 * https://test_it_domain/test-cases/RCI-3382
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2.User has logged in to RC CTI app
 * 3. There are some records for Google/Office365, Company, Personal contacts in account
 * 4. CTI app has authorizedGoogle/Office365 account(for Outlook, don't need to do authorization, after login Outlook client the contacts will sync up to CTI app);
 * Account type:
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * CTI > contact page >search box
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
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
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CheckContactNotFoundTextExist,
  SearchContacts,
} from '../../../../../steps/ContactsView';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock as CommonCreateMock } from '../../../../../steps/Mock';
import { NavigateToContacts } from '../../../../../steps/Navigate';

@autorun(test)
@it
@p2
@common
@title('Search contact not match any contact')
export class RCI3382 extends Step {
  CustomLogin: StepFunction<any, any> | StepFunction<any, any>[] = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  run() {
    const { CustomLogin, CreateMock } = this;
    return (
      <Scenario
        desc="Search contact not match any contact"
        action={[CreateMock, CustomLogin]}
      >
        <When
          desc="> go to entry
										> Type some text on the search box which would not match any contact"
          action={[NavigateToContacts, <SearchContacts content="test" />]}
        />
        <Then
          desc="'No records found.' displays in the page       [L10N]"
          action={CheckContactNotFoundTextExist}
        />
      </Scenario>
    );
  }
}
