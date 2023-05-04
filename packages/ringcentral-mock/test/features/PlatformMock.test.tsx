import { ParsePhoneNumberResponse, PlatformMock } from '../../src';
import { autorun, Given, Scenario, Step, Then, title, When } from '../steps';

@autorun(test)
@title('check base mock')
export class BaseMock extends Step {
  run() {
    let platformMock: PlatformMock;
    let response: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance and init mock"
          action={() => {
            platformMock = new PlatformMock();
            platformMock.defaultInitMocks.add(() => {
              platformMock.post('/restapi/v1.0/number-parser/parse', 200, {
                response: ({ mockData, body }) => {
                  const phoneNumbers = mockData.phoneNumbers.slice(
                    0,
                    body.originalStrings.length,
                  );
                  body.originalStrings.forEach((value, index) => {
                    phoneNumbers[index].originalString = value;
                  });
                  return {
                    body: {
                      ...mockData,
                      phoneNumbers,
                    },
                  };
                },
              });
            });
            platformMock.init();
          }}
        />
        <When
          desc="Call 'post' mock api"
          action={async () => {
            response = await fetch(
              'http://example.com/restapi/v1.0/number-parser/parse?nationalAsPriority=false&homeCountry=US',
              {
                body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
                method: 'POST',
              },
            );
          }}
        />
        <Then
          desc="The 'post' api should be mocked and response a mock data"
          action={async () => {
            expect(response.ok).toBeTruthy();
            const result: ParsePhoneNumberResponse = await response.json();
            expect(Object.keys(result.homeCountry).length).toBe(6);
            expect(Object.keys(result.phoneNumbers).length).toBe(1);
            expect(result.phoneNumbers[0].originalString).toBe(
              '(165) 1223-4567',
            );
            expect(platformMock.fetchMock).toHaveBeenCalledWith(
              'http://example.com/restapi/v1.0/number-parser/parse?nationalAsPriority=false&homeCountry=US',
              {
                body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
                method: 'POST',
              },
            );
            platformMock.reset();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('check base overwrite mock with custom')
export class BaseMockWithCustom extends Step {
  run() {
    let platformMock: PlatformMock;
    let response: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance and init mock"
          action={() => {
            platformMock = new PlatformMock();
            platformMock.defaultInitMocks.add(() => {
              platformMock.post('/restapi/v1.0/number-parser/parse', 200, {
                response: ({ mockData, body }) => {
                  const phoneNumbers = mockData.phoneNumbers.slice(
                    0,
                    body.originalStrings.length,
                  );
                  body.originalStrings.forEach((value, index) => {
                    phoneNumbers[index].originalString = value;
                  });
                  return {
                    body: {
                      ...mockData,
                      phoneNumbers,
                    },
                  };
                },
              });
            });
            platformMock.init();
          }}
        />
        <When
          desc="Overwrite mock and Call 'post' mock api"
          action={async () => {
            platformMock.post('/restapi/v1.0/number-parser/parse', 200, {
              response: ({ mockData }) => {
                return { body: mockData };
              },
              overwriteRoutes: true,
            });
            response = await fetch(
              'http://example.com/restapi/v1.0/number-parser/parse?nationalAsPriority=false&homeCountry=US',
              {
                body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
                method: 'POST',
              },
            );
          }}
        />
        <Then
          desc="The 'post' api should be mocked and response a mock data"
          action={async () => {
            expect(response.ok).toBeTruthy();
            const result: ParsePhoneNumberResponse = await response.json();
            expect(Object.keys(result.homeCountry).length).toBe(6);
            expect(result.phoneNumbers[0].originalString).not.toBe(
              '(165) 1223-4567',
            );
            expect(platformMock.fetchMock).toHaveBeenCalledWith(
              'http://example.com/restapi/v1.0/number-parser/parse?nationalAsPriority=false&homeCountry=US',
              {
                body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
                method: 'POST',
              },
            );
            platformMock.reset();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('check base init mock with custom')
export class BaseInitMockWithCustom extends Step {
  run() {
    let platformMock: PlatformMock;
    let response0: Response;
    let response1: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance and init mock"
          action={() => {
            platformMock = new PlatformMock();
            platformMock
              .get('/restapi/v1.0/account/:accountId/call-queues')
              .get('/restapi/v1.0/dictionary/state/:stateId');
          }}
        />
        <When
          desc="Overwrite mock and Call 'post' mock api"
          action={async () => {
            response0 = await fetch(
              'http://example.com/restapi/v1.0/account/~/call-queues',
            );
            response1 = await fetch(
              'http://example.com/restapi/v1.0/dictionary/state/123',
            );
          }}
        />
        <Then
          desc="The 'post' api should be mocked and response a mock data"
          action={async () => {
            expect(response0.ok).toBeTruthy();
            expect(response1.ok).toBeTruthy();
            const result0 = await response0.json();
            const result1 = await response1.json();
            expect(Object.keys(result0).sort()).toEqual([
              'navigation',
              'paging',
              'records',
              'uri',
            ]);
            expect(Object.keys(result1).sort()).toEqual([
              'country',
              'id',
              'isoCode',
              'name',
              'uri',
            ]);
            expect(platformMock.fetchMock).toHaveFetchedTimes(
              1,
              'http://example.com/restapi/v1.0/account/~/call-queues',
            );
            expect(platformMock.fetchMock).toHaveFetchedTimes(
              1,
              'http://example.com/restapi/v1.0/dictionary/state/123',
            );
            platformMock.reset();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('check base init mock with debugger')
export class BaseInitMockWithDebugger extends Step {
  run() {
    let platformMock: PlatformMock;
    let response0: Response;
    let response1: Response;
    const fn = jest.fn();
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance and init mock"
          action={() => {
            platformMock = new PlatformMock();
            platformMock
              .get('/restapi/v1.0/account/:accountId/call-queues')
              .get('/restapi/v1.0/dictionary/state/:stateId');

            platformMock.debug(fn);
          }}
        />
        <When
          desc="Overwrite mock and Call 'post' mock api"
          action={async () => {
            response0 = await fetch(
              'http://example.com/restapi/v1.0/account/~/call-queues',
            );
            response1 = await fetch(
              'http://example.com/restapi/v1.0/dictionary/state/123',
            );

            fetch('http://example.com/foo/bar', {
              method: 'POST',
            });
          }}
        />
        <Then
          desc="The 'post' api should be mocked and response a mock data"
          action={async () => {
            expect(response0.ok).toBeTruthy();
            expect(response1.ok).toBeTruthy();
            const result0 = await response0.json();
            const result1 = await response1.json();
            expect(Object.keys(result0).sort()).toEqual([
              'navigation',
              'paging',
              'records',
              'uri',
            ]);
            expect(Object.keys(result1).sort()).toEqual([
              'country',
              'id',
              'isoCode',
              'name',
              'uri',
            ]);
            expect(fn.mock.calls.length).toBe(3);
            expect(fn.mock.calls[0][0].url).toBe(
              'http://example.com/restapi/v1.0/account/~/call-queues',
            );
            expect(fn.mock.calls[1][0].mock).toBe(true);
            expect(fn.mock.calls[1][0].url).toBe(
              'http://example.com/restapi/v1.0/dictionary/state/123',
            );
            expect(fn.mock.calls[1][0].mock).toBe(true);
            expect(fn.mock.calls[2][0].url).toBe('http://example.com/foo/bar');
            expect(fn.mock.calls[2][0].mock).toBe(false);
            expect(platformMock.fetchMock).toHaveFetchedTimes(
              1,
              'http://example.com/restapi/v1.0/account/~/call-queues',
            );
            expect(platformMock.fetchMock).toHaveFetchedTimes(
              1,
              'http://example.com/restapi/v1.0/dictionary/state/123',
            );
            platformMock.reset();
          }}
        />
      </Scenario>
    );
  }
}
