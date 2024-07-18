import {
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  it,
  title,
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../lib/step';
import {
  CheckAddressBookData,
  MockAddressBookSync,
} from '../../../steps/AddressBook';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import { CreateMock as CommonCreateMock } from '../../../steps/Mock';

@autorun(test)
@it
@common
@title('Check AddressBook Sync')
export class CheckAddressBookSync extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Check AddressBook Sync">
        <When
          desc="Create mock and setup the app"
          action={[CreateMock, MockAddressBookSync]}
        />
        <When desc="User login the app" action={Login} />

        <Then
          desc="Check the refresh token request is sent and the token is refreshed"
          action={CheckAddressBookData}
        />
      </Scenario>
    );
  }
}
