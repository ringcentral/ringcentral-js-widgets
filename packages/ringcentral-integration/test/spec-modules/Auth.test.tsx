import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
} from '@ringcentral-integration/test-utils';

import { Auth, loginStatus, Token } from '../../modules/Auth';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    loginStatus: null as string,
    isFreshLogin: null as boolean,
    token: {} as Token,
  });

@autorun(test)
@title('Check loginStatus')
export class CheckLoginStatus extends Step {
  run() {
    return (
      <Scenario desc="check 'loginStatus'">
        <Given
          desc="Create a 'Auth' instance and initial state should be 'null'"
          action={() => {
            const auth = new Auth({} as any);
            expect(auth.loginStatus).toBeNull();
          }}
        />
        <Then
          desc="The mockModule 'loginStatus' should be the expected values"
          action={() => {
            const actions = [
              {
                action: 'login',
                value: loginStatus.loggingIn,
              },
              {
                action: 'loginSuccess',
                value: loginStatus.loggedIn,
              },
              {
                action: 'refreshSuccess',
                value: loginStatus.loggedIn,
              },
              {
                action: 'cancelLogout',
                value: loginStatus.loggedIn,
              },
              {
                action: 'loginError',
                value: loginStatus.notLoggedIn,
              },
              {
                action: 'logoutSuccess',
                value: loginStatus.notLoggedIn,
              },
              {
                action: 'logoutError',
                value: loginStatus.notLoggedIn,
              },
              {
                action: 'refreshError',
                param: () => [false],
                value: loginStatus.notLoggedIn,
              },
              {
                action: 'refreshError',
                param: () => [true],
                value: null,
              },
              {
                action: 'logout',
                value: loginStatus.loggingOut,
              },
              {
                action: 'beforeLogout',
                value: loginStatus.beforeLogout,
              },
              {
                action: 'initLogin',
                param: () => [{ loggedIn: false }],
                value: loginStatus.notLoggedIn,
              },
              {
                action: 'initLogin',
                param: () => [{ loggedIn: true }],
                value: loginStatus.loggedIn,
              },
            ];
            actions.forEach(({ action, value, param }) => {
              const mockModule = getMockModule();
              const fnName = `set${action[0].toUpperCase()}${action.slice(1)}`;
              const args = param ? param() : [{}];
              (Auth.prototype as any)[fnName].apply(mockModule, args);
              expect(mockModule.loginStatus).toBe(value);
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check token')
export class CheckToken extends Step {
  run() {
    return (
      <Scenario desc="check 'token'">
        <Given
          desc="Create a 'Auth' instance and initial state should be '{}'"
          action={() => {
            const auth = new Auth({} as any);
            expect(auth.token).toEqual({});
          }}
        />
        <Then
          desc="The mockModule 'token' should be the expected values"
          action={() => {
            const check = (
              action: string,
              args: any[],
              value: any,
              initState = {},
            ) => {
              const mockModule = Object.assign(getMockModule(), initState);
              const fnName = `set${action[0].toUpperCase()}${action.slice(1)}`;
              (Auth.prototype as any)[fnName].apply(mockModule, args);
              expect(mockModule.token).toEqual(value);
            };

            ['loginSuccess', 'refreshSuccess'].forEach((type) => {
              check(
                type,
                [
                  {
                    endpoint_id: 'foo',
                    owner_id: 'owner',
                    access_token: 'access token',
                    expire_time: '1111',
                    expires_in: '1234',
                    scope: 'scope',
                  },
                ],
                {
                  endpointId: 'foo',
                  ownerId: 'owner',
                  accessToken: 'access token',
                  expireTime: '1111',
                  expiresIn: '1234',
                  scope: 'scope',
                },
              );
            });

            ['loginError', 'logoutSuccess', 'logoutError'].forEach((type) => {
              check(type, [], {});
            });

            ['refreshError'].forEach((type) => {
              check(
                type,
                [true],
                {
                  endpointId: 'foo',
                  ownerId: 'owner',
                  accessToken: 'access token',
                  expireTime: '1111',
                  expiresIn: '1234',
                  scope: 'scope',
                },
                {
                  token: {
                    endpointId: 'foo',
                    ownerId: 'owner',
                    accessToken: 'access token',
                    expireTime: '1111',
                    expiresIn: '1234',
                    scope: 'scope',
                  },
                },
              );
            });

            ['refreshError'].forEach((type) => {
              check(type, [false], {});
            });

            ['login', 'logout', 'beforeLogout', 'cancelLogout'].forEach(
              (type) => {
                check(
                  type,
                  [],
                  {
                    endpointId: 'foo',
                    ownerId: 'owner',
                    accessToken: 'access token',
                    expireTime: '1111',
                    expiresIn: '1234',
                    scope: 'scope',
                  },
                  {
                    token: {
                      endpointId: 'foo',
                      ownerId: 'owner',
                      accessToken: 'access token',
                      expireTime: '1111',
                      expiresIn: '1234',
                      scope: 'scope',
                    },
                  },
                );
              },
            );

            ['initLogin'].forEach((type) => {
              check(
                type,
                [
                  {
                    token: {
                      endpoint_id: 'foo',
                      owner_id: 'owner',
                      access_token: 'access token',
                      expire_time: '1111',
                      expires_in: '1234',
                      scope: 'scope',
                    },
                  },
                ],
                {
                  endpointId: 'foo',
                  ownerId: 'owner',
                  accessToken: 'access token',
                  expireTime: '1111',
                  expiresIn: '1234',
                  scope: 'scope',
                },
              );
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check isFreshLogin')
export class CheckIsFreshLogin extends Step {
  run() {
    return (
      <Scenario desc="check 'isFreshLogin'">
        <Given
          desc="Create a 'Auth' instance and initial state should be 'null'"
          action={() => {
            const auth = new Auth({} as any);
            expect(auth.isFreshLogin).toEqual(null);
          }}
        />
        <Then
          desc="The mockModule 'isFreshLogin' should be the expected values"
          action={() => {
            const check = (
              action: string,
              args: any[],
              value: any,
              initState = {},
            ) => {
              const mockModule = Object.assign(getMockModule(), initState);
              const fnName = `set${action[0].toUpperCase()}${action.slice(1)}`;
              (Auth.prototype as any)[fnName].apply(mockModule, args);
              expect(mockModule.isFreshLogin).toEqual(value);
            };

            ['login'].forEach((type) => {
              check(type, [], true);
            });

            [
              'loginError',
              'logoutError',
              'refreshError',
              'logoutSuccess',
            ].forEach((type) => {
              check(type, [], null);
            });

            [
              'cancelLogout',
              'loginSuccess',
              'logout',
              'refreshSuccess',
              'beforeLogout',
            ].forEach((type) => {
              check(type, [{}], false, { isFreshLogin: false });
            });

            ['initLogin'].forEach((type) => {
              check(type, [{ loggedIn: false, token: {} }], null);
            });

            ['initLogin'].forEach((type) => {
              check(type, [{ loggedIn: true, token: {} }], false);
            });
          }}
        />
      </Scenario>
    );
  }
}
