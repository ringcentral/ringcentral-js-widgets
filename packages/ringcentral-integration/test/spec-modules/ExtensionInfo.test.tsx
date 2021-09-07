import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { ExtensionInfo } from '../../modules/ExtensionInfoV2';
import { permissionsMessages } from '../../enums/permissionsMessages';
import { mockModuleGenerator } from '../lib/mockModule';

@autorun(test)
@title('Polling is on by default')
export class DefaultPolling extends Step {
  run() {
    return (
      <Scenario desc="Check this._source.polling">
        <Given
          desc="An ExtensionInfo instance with no options"
          action={(_: any, context: any) => {
            context.instance = new ExtensionInfo({
              auth: {} as any,
              client: {} as any,
              subscription: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              alert: {} as any,
            });
          }}
        />
        <Then
          desc="Polling should be true"
          action={(_: any, context: any) => {
            expect(context.instance._source.polling).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Polling is controlled by options')
export class PollingOptions extends Step {
  @examples(`
    | polling |
    | true    |
    | false   |
  `)
  run() {
    return (
      <Scenario desc="Check this._source.polling">
        <Given
          desc="An ExtensionInfo instance with polling = ${polling} in options"
          action={(_: any, context: any) => {
            context.instance = new ExtensionInfo({
              auth: {} as any,
              client: {} as any,
              subscription: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              alert: {} as any,
              extensionInfoOptions: {
                polling: context.example.polling,
              },
            });
          }}
        />
        <Then
          desc="Polling should be ${polling}"
          action={(_: any, context: any) => {
            expect(context.instance._source.polling).toBe(
              context.example.polling,
            );
          }}
        />
      </Scenario>
    );
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
          desc="An ExtensionInfo instance with cleanOnReset = ${cleanOnReset} in options"
          action={(_: any, context: any) => {
            context.instance = new ExtensionInfo({
              auth: {} as any,
              client: {} as any,
              subscription: {} as any,
              dataFetcherV2: {
                register() {},
              } as any,
              alert: {} as any,
              extensionInfoOptions: {
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
          desc="An ExtensionInfo instance"
          action={(_: any, context: any) => {
            class MockAuth {
              loggedIn = true;
              async logout() {
                this.loggedIn = false;
              }
            }
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

              get() {
                throw new MockError('Request Error 403');
              }
            }
            class MockAlert {
              args: any = null;
              danger(...args: any[]) {
                this.args = args;
              }
            }

            context.instance = new ExtensionInfo({
              auth: new MockAuth() as any,
              client: new MockClient() as any,
              subscription: {} as any,
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
            expect(context.instance._deps.auth.loggedIn).toBe(false);
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

@autorun(test)
@title('extensionInfo.info has a fallback value of {}')
export class InfoFallBack extends Step {
  run() {
    return (
      <Scenario desc="extensionInfo.info has a fallback value of {}">
        <Given
          desc="An extensionInfo instance with null data"
          action={(_: any, context: any) => {
            context.instance = new ExtensionInfo({
              extensionFeatures: {} as any,
              auth: {} as any,
              client: {} as any,
              subscription: {} as any,
              alert: {} as any,
              dataFetcherV2: {
                register() {},
                getData(): any {
                  return null;
                },
              } as any,
            });
            Object.assign(
              context.instance,
              mockModuleGenerator({
                extensionInfo: {},
              }),
            );
          }}
        />
        <Then
          desc="extensionInfo.info should return {}, and the value should be memoized"
          action={(_: any, context: any) => {
            expect(context.instance.data).toBe(null);
            expect(context.instance.info).toEqual({});
            expect(context.instance.info).toBe(context.instance.info);
          }}
        />
      </Scenario>
    );
  }
}
