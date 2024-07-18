import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  it,
  title,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';
import {
  MockAddressBookSync,
  MockAddressBookSyncFail,
  TriggerAddressBookSync,
} from '../../../steps/AddressBook';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import { CreateMock as CommonCreateMock } from '../../../steps/Mock';

@autorun(test)
@it
@common
@title('Check AddressBook Sync Fail')
export class CheckAddressBookSyncFail extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let fetchAllSpy: jest.SpyInstance;
    return (
      <Scenario desc="Check AddressBook Sync Fail">
        <Given
          desc="Create mock and setup the app"
          action={[CreateMock, <MockAddressBookSync page={1} />]}
        />
        <And desc="User login the app" action={Login} />
        <When
          desc="API syncToken unavailable for some reason"
          action={() => [
            // 1st call, Response 400 CMN-101 error when ISync
            <MockAddressBookSyncFail
              repeat={1}
              status={400}
              handler={() => ({
                errors: [
                  {
                    errorCode: 'CMN-101',
                    message: 'Parameter [syncToken] value is invalid.',
                  },
                ],
              })}
            />,
            // 2nd call, Response 200 with normal records
            <MockAddressBookSync page={1} />,
          ]}
        />
        <Then
          desc="Check the refresh token request is sent and the token is refreshed"
          action={(_: unknown, context: Context) => [
            () => {
              fetchAllSpy = jest.spyOn(context.phone.addressBook, '_fetchAll');
            },
            TriggerAddressBookSync,
            async () => {
              await waitUntilTo(() => {
                expect(fetchAllSpy).toHaveBeenCalledTimes(2);
                // ISync with a syncToken
                expect(fetchAllSpy.mock.calls[0][0]).toBeTruthy();
                // FSync with no syncToken
                expect(fetchAllSpy.mock.calls[1][0]).toBeFalsy();
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
