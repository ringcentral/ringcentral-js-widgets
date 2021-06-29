import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { AccountInfo } from '../../modules/AccountInfoV2';
import { loginStatus } from '../../modules/AuthV2';
import { permissionsMessages } from '../../enums/permissionsMessages';

class MockAuth {
  loginStatus = loginStatus.loggedIn;
  async logout() {
    this.loginStatus = loginStatus.notLoggedIn;
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
          desc="An AccountInfo instance with cleanOnReset = ${cleanOnReset} in options"
          action={(_: any, context: any) => {
            context.instance = new AccountInfo({
              auth: {} as any,
              client: {} as any,
              extensionFeatures: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              alert: {} as any,
              accountInfoOptions: {
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

@autorun(test)
@title(
  'Should logout if ReadCompanyInfo permission is missing: ReadCompanyInfo=${ReadCompanyInfo}',
)
export class ReadCompanyInfo extends Step {
  @examples(`
    | ReadCompanyInfo |
    | true            |
    | false            |
  `)
  run() {
    class MockRolesAndPermissions extends AccountInfo {
      _mockReady = false;
      _mockData: any = null;
      get data() {
        return this._mockData;
      }

      get ready() {
        return this._mockReady;
      }
    }
    return (
      <Scenario desc="ReadCompanyInfo=${ReadCompanyInfo}">
        <Given
          desc="An RolesAndPermissions instance with ReadCompanyInfo=${ReadCompanyInfo}"
          action={(_: any, context: any) => {
            context.instance = new MockRolesAndPermissions({
              auth: new MockAuth() as any,
              client: {} as any,
              extensionFeatures: {
                features: {
                  ReadCompanyInfo: {
                    available: context.example.ReadCompanyInfo,
                  },
                },
              } as any,
              alert: new MockAlert() as any,
              dataFetcherV2: {
                register() {},
              } as any,
            });
          }}
        />
        <When
          desc="module is ready"
          action={async (_: any, context: any) => {
            context.instance._mockReady = true;
            await context.instance.onStateChange();
          }}
        />
        <Then
          desc="Should logout if user has no ReadCompanyInfo permission"
          action={(_: any, context: any) => {
            if (!context.example.ReadCompanyInfo) {
              expect(context.instance._deps.auth.loginStatus).toBe(
                loginStatus.notLoggedIn,
              );
              expect(context.instance._deps.alert.args[0].message).toBe(
                permissionsMessages.insufficientPrivilege,
              );
            } else {
              expect(context.instance._deps.auth.loginStatus).toBe(
                loginStatus.loggedIn,
              );
              expect(context.instance._deps.alert.args).toBeNull();
            }
          }}
        />
      </Scenario>
    );
  }
}
