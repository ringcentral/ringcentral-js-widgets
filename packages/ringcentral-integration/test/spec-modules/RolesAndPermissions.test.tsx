import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { RolesAndPermissions } from '../../modules/RolesAndPermissionsV2';
import { permissionsMessages } from '../../enums/permissionsMessages';
import { loginStatus } from '../../modules/AuthV2';
import { mockModuleGenerator } from '../lib/mockModule';

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
          desc="An RolesAndPermissions instance with cleanOnReset = ${cleanOnReset} in options"
          action={(_: any, context: any) => {
            context.instance = new RolesAndPermissions({
              auth: {} as any,
              client: {} as any,
              extensionInfo: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              alert: {} as any,
              rolesAndPermissionsOptions: {
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
@title('Request status 403 handling')
export class InsufficientPermissionOnRequest extends Step {
  run() {
    return (
      <Scenario desc="Request status 403 handling">
        <Given
          desc="An RolesAndPermissions instance"
          action={(_: any, context: any) => {
            class MockError extends Error {
              response = {
                status: 403,
              };
            }
            class MockClient {
              account() {
                return this;
              }

              extension() {
                return this;
              }

              authzProfile() {
                return this;
              }

              get() {
                throw new MockError('Request Error 403');
              }
            }
            context.instance = new RolesAndPermissions({
              auth: new MockAuth() as any,
              client: new MockClient() as any,
              extensionInfo: {} as any,
              alert: new MockAlert() as any,
              dataFetcherV2: {
                register() {},
              } as any,
            });
          }}
        />
        <When
          desc="fetchFunction catches 403 error"
          action={async (_: any, context: any) => {
            await context.instance._source.fetchFunction();
          }}
        />
        <Then
          desc="logout should be called"
          action={(_: any, context: any) => {
            expect(context.instance._deps.auth.loginStatus).toBe(
              loginStatus.notLoggedIn,
            );
          }}
        />
        <Then
          desc="Should send an insufficient permission alert"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args).toBeTruthy();
            const args = context.instance._deps.alert.args;
            expect(args[0].message).toBe(
              permissionsMessages.insufficientPrivilege,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('onDataReady')
export class OnDataReady extends Step {
  run() {
    class MockRolesAndPermissions extends RolesAndPermissions {
      _mockData: any = null;
      protected async _checkReadUserInfo() {}
      protected async _checkTier() {}

      get data() {
        return this._mockData;
      }

      get ready() {
        return true;
      }
    }

    class MockHandlers {
      _invoked = 0;
      constructor(instance: MockRolesAndPermissions) {
        instance.onDataReady(() => this.handler());
      }

      handler() {
        this._invoked += 1;
      }
    }
    return (
      <Scenario desc="onDataReady">
        <Given
          desc="An RolesAndPermissions instance with onDataReady handlers"
          action={(_: any, context: any) => {
            context.instance = new MockRolesAndPermissions({
              auth: {} as any,
              client: {} as any,
              extensionInfo: {} as any,
              alert: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
            });

            context.handlers = [
              new MockHandlers(context.instance),
              new MockHandlers(context.instance),
              new MockHandlers(context.instance),
            ];
          }}
        />
        <Then
          desc="onDataReady handlers should not be invoked when data is null"
          action={async (_: any, context: any) => {
            expect(context.instance.data).toBeNull();
            await context.instance.onStateChange();
            context.handlers.forEach((handler: MockHandlers) =>
              expect(handler._invoked).toBe(0),
            );
          }}
        />
        <When
          desc="data is ready"
          action={async (_: any, context: any) => {
            context.instance._mockData = {};
          }}
        />
        <Then
          desc="onDataReady handlers should be invoked on the next onStateChange"
          action={async (_: any, context: any) => {
            expect(context.instance.data).toBeTruthy();
            await context.instance.onStateChange();
            context.handlers.forEach((handler: MockHandlers) => {
              expect(handler._invoked).toBe(1);
            });
          }}
        />
        <And
          desc="onDataReady handlers should only be invoked once"
          action={async (_: any, context: any) => {
            await context.instance.onStateChange();
            context.handlers.forEach((handler: MockHandlers) => {
              expect(handler._invoked).toBe(1);
            });
          }}
        />
        <When
          desc="data is reset to null"
          action={async (_: any, context: any) => {
            context.instance._mockData = null;
            await context.instance.onStateChange();
          }}
        />
        <And
          desc="and then data is ready again"
          action={async (_: any, context: any) => {
            context.instance._mockData = {};
            await context.instance.onStateChange();
          }}
        />
        <Then
          desc="onDataReady handlers should be invoked again"
          action={(_: any, context: any) => {
            context.handlers.forEach((handler: MockHandlers) => {
              expect(handler._invoked).toBe(2);
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check tier when isCRM=${isCRM} and hasSalesForce=${hasSalesForce}')
export class CheckTier extends Step {
  @examples(`
    | isCRM | hasSalesForce |
    | true  | true          |
    | true  | false         |
    | false | true          |
    | false | false         |
  `)
  run() {
    class MockRolesAndPermissions extends RolesAndPermissions {
      _mockReady = false;
      protected async _checkDataReady() {}
      protected async _checkReadUserInfo() {}
      get ready() {
        return this._mockReady;
      }
    }
    return (
      <Scenario desc="isCRM=${isCRM} and hasSalesForce=${hasSalesForce}">
        <Given
          desc="An RolesAndPermissions instance with isCRM=${isCRM} and hasSalesForce=${hasSalesForce}"
          action={(_: any, context: any) => {
            context.instance = new MockRolesAndPermissions({
              auth: new MockAuth() as any,
              client: {} as any,
              extensionInfo: {
                serviceFeatures: {
                  SalesForce: {
                    featureName: 'SalesForce',
                    enabled: context.example.hasSalesForce,
                  },
                },
              } as any,
              alert: new MockAlert() as any,
              dataFetcherV2: {
                register() {},
              } as any,
              rolesAndPermissionsOptions: {
                isCRM: context.example.isCRM,
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
          desc="Should logout and show invalidTier alert when isCRM=true and hasSalesForce=false"
          action={(_: any, context: any) => {
            if (context.example.isCRM && !context.example.hasSalesForce) {
              expect(context.instance._deps.auth.loginStatus).toBe(
                loginStatus.notLoggedIn,
              );
              expect(context.instance._deps.alert.args).toBeTruthy();
              expect(context.instance._deps.alert.args[0].message).toBe(
                permissionsMessages.invalidTier,
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

@autorun(test)
@title(
  'Should logout if ReadUserInfo permission is missing: ReadUserInfo=${ReadUserInfo}, hasPermission=${hasPermission}',
)
export class ReadUserInfo extends Step {
  @examples(`
    | ReadUserInfo | hasPermission |
    | true         | true          |
    | false        | true          |
    | false        | false         |
  `)
  run() {
    class MockRolesAndPermissions extends RolesAndPermissions {
      _mockReady = false;
      _mockData: any = null;
      protected async _checkTier() {}
      protected async _checkDataReady() {}
      get data() {
        return this._mockData;
      }

      get ready() {
        return this._mockReady;
      }

      get permissions() {
        return this.data || {};
      }
    }
    return (
      <Scenario desc="ReadUserInfo=${ReadUserInfo} and hasPermission=${hasPermission}">
        <Given
          desc="An RolesAndPermissions instance with ReadUserInfo=${ReadUserInfo} and hasPermission=${hasPermission}"
          action={(_: any, context: any) => {
            context.instance = new MockRolesAndPermissions({
              auth: new MockAuth() as any,
              client: {} as any,
              extensionInfo: {} as any,
              alert: new MockAlert() as any,
              dataFetcherV2: {
                register() {},
              } as any,
            });
            if (context.example.hasPermission) {
              context.instance._mockData = {
                ReadUserInfo: context.example.ReadUserInfo,
              };
            }
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
          desc="Should logout if user has no ReadUserInfo permission, but only show alert if user has permission to fetch authsProfiles data"
          action={(_: any, context: any) => {
            if (!context.example.ReadUserInfo) {
              expect(context.instance._deps.auth.loginStatus).toBe(
                loginStatus.notLoggedIn,
              );
              if (context.example.hasPermission) {
                expect(context.instance._deps.alert.args[0].message).toBe(
                  permissionsMessages.insufficientPrivilege,
                );
              } else {
                expect(context.instance._deps.alert.args).toBeNull();
              }
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

@autorun(test)
@title('extensionInfo.permissions remapping')
export class PermissionsRemapping extends Step {
  run() {
    return (
      <Scenario desc="rolesAndPermissions.permissions remapping">
        <Given
          desc="An RolesAndPermissions instance with data"
          action={(_: any, context: any) => {
            context.mockPermissions = [
              { permission: { id: 'Foo' } },
              { permission: { id: 'Bar' } },
              { permission: { id: 'Tango' } },
              { permission: { id: 'Whisky' } },
            ];
            class MockRolesAndPermissions extends RolesAndPermissions {
              get data() {
                return {
                  permissions: context.mockPermissions,
                };
              }
            }
            context.instance = new MockRolesAndPermissions({
              auth: {} as any,
              client: {} as any,
              extensionInfo: {} as any,
              alert: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
            });
            Object.assign(
              context.instance,
              mockModuleGenerator({
                rolesAndPermissions: {},
              }),
            );
          }}
        />
        <Then
          desc="rolesAndPermissions.permissions should be a remapped object"
          action={(_: any, context: any) => {
            expect(context.instance.permissions).toEqual(
              context.mockPermissions.reduce((result: any, item: any) => {
                result[item.permission.id] = true;
                return result;
              }, {}),
            );
          }}
        />
      </Scenario>
    );
  }
}
