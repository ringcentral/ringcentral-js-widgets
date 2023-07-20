import type { GetTokenRequest, TokenInfo } from '../../src';
import { PubnubMock, RcMock } from '../../src';
import { autorun, Given, Scenario, Step, Then, title, When } from '../steps';

@autorun(test)
@title('check base RC mock with init')
export class BaseMock extends Step {
  run() {
    let rcMock: RcMock;
    let response: Response;
    let loginResult: TokenInfo;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a RcMock instance and init mock"
          action={() => {
            rcMock = new RcMock({ subscription: new PubnubMock() });
            rcMock.init();
          }}
        />
        <When
          desc="Call 'post' login mock api"
          action={async () => {
            response = await fetch('http://example.com/restapi/oauth/token', {
              body: JSON.stringify({
                username: 'test',
                password: 'test123',
                grant_type: 'password',
              } as GetTokenRequest),
              method: 'POST',
            });
          }}
        />
        <Then
          desc="The 'post' login api should be mocked and response a mock data"
          action={async () => {
            expect(response.ok).toBeTruthy();
            loginResult = await response.json();
            expect(Object.keys(loginResult).sort()).toEqual([
              'access_token',
              'endpoint_id',
              'expireTime',
              'expires_in',
              'id_token',
              'owner_id',
              'refresh_token',
              'refresh_token_expires_in',
              'scope',
              'token_type',
            ]);
            expect(loginResult.expires_in).toBe(3600);
            expect(rcMock.fetchMock).toHaveFetchedTimes(
              1,
              'http://example.com/restapi/oauth/token',
            );
          }}
        />
        <When
          desc="Call 'post' refreshing token mock api"
          action={async () => {
            response = await fetch('http://example.com/restapi/oauth/token', {
              body: JSON.stringify({
                // ...loginResult,
                grant_type: 'refresh_token',
              } as GetTokenRequest),
              method: 'POST',
            });
          }}
        />
        <Then
          desc="The 'post' refreshing token api should be mocked and response a mock data"
          action={async () => {
            expect(response.ok).toBeTruthy();
            const result: TokenInfo = await response.json();
            expect(result.expires_in).toBe(3600);
            expect(result.access_token).not.toBe(loginResult.access_token);
            expect(rcMock.fetchMock).toHaveFetchedTimes(
              2,
              'http://example.com/restapi/oauth/token',
            );
            rcMock.reset();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('check base RC mock request validation for request body')
export class BaseMockRequestBodyValidation extends Step {
  run() {
    let rcMock: RcMock;
    let fetchPromise: Promise<any>;
    const { mockClear } = jest.spyOn(global.console, 'error');
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a RcMock instance and init mock"
          action={() => {
            rcMock = new RcMock({
              subscription: new PubnubMock(),
              enableValidation: true,
            });
            rcMock.init();
          }}
        />
        <When
          desc="Call 'post' token mock api for logout"
          action={async () => {
            fetchPromise = fetch('http://example.com/restapi/oauth/revoke', {
              method: 'POST',
            });
          }}
        />
        <Then
          desc="Request validator should throw verification result for the logout request"
          action={async () => {
            await fetchPromise;
            const { mock } = console.error as ReturnType<typeof jest.fn>;
            expect(mock.calls[0][0]).toMatch(
              JSON.stringify(
                {
                  body: {},
                  params: {},
                  errors: [
                    {
                      instancePath: '/body',
                      schemaPath: '#/properties/body/required',
                      keyword: 'required',
                      params: {
                        missingProperty: 'token',
                      },
                      message: "must have required property 'token'",
                    },
                  ],
                },
                null,
                2,
              ),
            );
            mockClear();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('check base RC mock request validation for request parameters')
export class BaseMockRequestParamsValidation extends Step {
  run() {
    let rcMock: RcMock;
    let fetchPromise: Promise<any>;
    const { mockClear } = jest.spyOn(global.console, 'error');
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a RcMock instance and init mock"
          action={() => {
            rcMock = new RcMock({
              subscription: new PubnubMock(),
              enableValidation: true,
            });
            rcMock.get(
              '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book/contact',
            );
          }}
        />
        <When
          desc="Call 'get' contact mock api"
          action={async () => {
            fetchPromise = fetch(
              'http://example.com/restapi/v1.0/account/~/extension/~/address-book/contact?page=a',
            );
          }}
        />
        <Then
          desc="Request validator should throw verification result for the logout request"
          action={async () => {
            await fetchPromise;
            const { mock } = console.error as ReturnType<typeof jest.fn>;
            expect(mock.calls[0][0]).toMatch(
              JSON.stringify(
                {
                  body: {},
                  params: {
                    accountId: '~',
                    extensionId: '~',
                    page: 'a',
                  },
                  errors: [
                    {
                      instancePath: '/params/page',
                      schemaPath: '#/properties/params/properties/page/type',
                      keyword: 'type',
                      params: {
                        type: 'integer',
                      },
                      message: 'must be integer',
                    },
                  ],
                },
                null,
                2,
              ),
            );
            mockClear();
          }}
        />
      </Scenario>
    );
  }
}
