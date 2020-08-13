import {
  autorun,
  title,
  Scenario,
  Given,
  Then,
  And,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { Presence } from '../../modules/PresenceV2';

class MockAuth {
  loggedIn = true;
  async logout() {
    this.loggedIn = false;
  }
}

class MockAlert {
  args: any = null;
  danger(...args: any[]) {
    this.args = args;
  }
}

@autorun(test)
@title('CleanOnReset is always enabled')
export class CleanOnReset extends Step {
  @examples(`
    | cleanOnReset |
    | true         |
    | false        |
  `)
  run() {
    return (
      <Scenario desc="Check this._source.cleanOnReset">
        <Given
          desc="An Presence instance with cleanOnReset = ${cleanOnReset} in options"
          action={(_: any, context: any) => {
            context.instance = new Presence({
              auth: {} as any,
              client: {} as any,
              rolesAndPermissions: {} as any,
              connectivityMonitor: {} as any,
              subscription: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              presenceOptions: {
                cleanOnReset: context.example.cleanOnReset,
              } as any,
            });
          }}
        />
        <Then
          desc="CleanOnReset should be enabled"
          action={(_: any, context: any) => {
            expect(context.instance._source.cleanOnReset).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}
