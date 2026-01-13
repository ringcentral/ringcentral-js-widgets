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
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../steps/Login';
import {
  CreateMock as CommonCreateMock,
  MockMessageError,
} from '../../steps/Mock';

@autorun(test)
@common
@it
@p2
@title('Check message syncToken invalid')
export class MessageSyncTokenInvalid extends Step {
  Login = CommonLogin as StepFunction<any, any>;
  CreateMock = CommonCreateMock as StepFunction<any, any>;

  @examples(`
    | errorCode | message                                                                          | fetchTimes |
    | 'CMN-403' | 'In order to call this API endpoint, application needs to have [xxx] permission' | 1          |
    | 'CMN-101' | 'Parameter [syncToken] value is invalid.'                                        | 2          |
    | 'CMN-101' | 'Parameter [syncToken] value is xxxx.'                                           | 2          |
    | 'MSG-333' | 'Parameter [syncToken] is invalid'                                               | 2          |
    | 'MSG-333' | 'Parameter [syncToken] is xxxx'                                                  | 2          |
  `)
  run() {
    return (
      <Scenario desc="Check message syncToken invalid">
        <Given
          desc="user login in app"
          action={[
            this.CreateMock,
            <MockMessageError
              errorCode={this.example.errorCode}
              message={this.example.message}
            />,
          ]}
        />
        <When desc="user login in app" action={<this.Login skipCreateMock />} />
        <Then
          desc="check the error fetch times"
          action={async (_, { rcMock }) => {
            expect(rcMock.fetchMock).toHaveFetchedTimes(
              this.example.fetchTimes,
              (url) =>
                url.indexOf(
                  'restapi/v1.0/account/~/extension/~/message-sync?recordCountPerConversation=15&syncType=FSync',
                ) > -1,
            );
          }}
        />
      </Scenario>
    );
  }
}
