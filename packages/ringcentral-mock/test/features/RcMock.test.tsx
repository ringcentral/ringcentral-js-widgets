import type { GetTokenRequest, TokenInfo } from '../../src';
import { PubnubMock, RcMock } from '../../src';
import { autorun, Given, Scenario, Step, Then, title, When } from '../steps';

const initialMockMcpEnv = process.env.MOCK_MCP;

afterEach(() => {
  if (initialMockMcpEnv === undefined) {
    delete process.env.MOCK_MCP;
  } else {
    process.env.MOCK_MCP = initialMockMcpEnv;
  }
  delete global.mockMcpClient;
});

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

@autorun(test)
@title('check RC mock unwraps mock-mcp resolved payload')
export class MockMcpResolvedPayload extends Step {
  run() {
    let rcMock: RcMock;
    let response: Response;
    const previousMockMcp = process.env.MOCK_MCP;
    const mockMcpClient = {
      requestMock: jest.fn().mockResolvedValue({
        requestId: 'req-1',
        data: {
          records: [
            {
              uri: 'http://example.com/phone-number/1',
              id: 1,
              phoneNumber: '+16505550101',
              primary: true,
              status: 'Normal',
              type: 'VoiceFax',
              usageType: 'DirectNumber',
              features: [],
            },
          ],
          navigation: {
            firstPage: {
              uri: 'http://example.com/phone-number?page=1',
            },
          },
          paging: {
            page: 1,
            perPage: 100,
            pageStart: 0,
            pageEnd: 0,
            totalPages: 1,
            totalElements: 1,
          },
        },
        status: 206,
        headers: {
          'x-mock-mcp': 'true',
        },
      }),
    };

    const restoreEnvironment = () => {
      if (previousMockMcp === undefined) {
        delete process.env.MOCK_MCP;
      } else {
        process.env.MOCK_MCP = previousMockMcp;
      }
      delete global.mockMcpClient;
    };

    return (
      <Scenario desc="Check mock-mcp resolved payload compatibility">
        <Given
          desc="Create a RcMock instance in MOCK_MCP mode"
          action={() => {
            process.env.MOCK_MCP = 'true';
            global.mockMcpClient = mockMcpClient as any;
            rcMock = new RcMock({ subscription: new PubnubMock() });
            rcMock.getPhoneNumber();
          }}
        />
        <When
          desc="Call phone number endpoint"
          action={async () => {
            response = await fetch(
              'http://example.com/restapi/v1.0/account/~/extension/~/phone-number?perPage=MAX&page=1',
            );
          }}
        />
        <Then
          desc="The wrapped mock-mcp payload should be unwrapped before RcMock processing"
          action={async () => {
            try {
              expect(response.status).toBe(206);
              expect(response.headers.get('x-mock-mcp')).toBe('true');

              const result = await response.json();

              expect(result.records[0].features).toEqual([
                'CallerId',
                'SmsSender',
                'MmsSender',
              ]);
              expect(result.records[0].usageType).toBe('MainCompanyNumber');
              expect(mockMcpClient.requestMock).toHaveBeenCalledWith(
                'http://example.com/restapi/v1.0/account/~/extension/~/phone-number?perPage=MAX&page=1',
                'GET',
                expect.objectContaining({
                  body: undefined,
                }),
              );
            } finally {
              rcMock.reset();
              restoreEnvironment();
            }
          }}
        />
      </Scenario>
    );
  }
}
