import type { ParsePhoneNumberResponse } from '../../src';
import { PlatformMock } from '../../src';
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
          desc="Create a PlatformMock instance"
          action={() => {
            platformMock = new PlatformMock();
          }}
        />
        <When
          desc="Call 'post' mock api"
          action={async () => {
            platformMock.post('/restapi/v1.0/number-parser/parse');
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
@title('check base mock with Status')
export class BaseMockWithStatus extends Step {
  run() {
    let platformMock: PlatformMock;
    let response: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance"
          action={() => {
            platformMock = new PlatformMock();
          }}
        />
        <When
          desc="Call 'post' mock api"
          action={async () => {
            platformMock.post('/restapi/v1.0/number-parser/parse', 200);
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
@title('check base mock with Options')
export class BaseMockWithOptions extends Step {
  run() {
    let platformMock: PlatformMock;
    let response: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance"
          action={() => {
            platformMock = new PlatformMock();
          }}
        />
        <When
          desc="Call 'post' mock api"
          action={async () => {
            platformMock.post('/restapi/v1.0/number-parser/parse', 200, {
              response: {
                body: {
                  uri: 'http://test.com',
                  homeCountry: {
                    uri: 'http://example.com/restapi/v1.0/dictionary/country/1',
                    id: '1',
                    name: 'United States',
                    isoCode: 'US',
                    callingCode: '1',
                    emergencyCalling: false,
                  },
                  phoneNumbers: [],
                },
              },
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
            expect(result.uri).toBe('http://test.com');
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
@title('check base mock with ResponseFunc')
export class BaseMockWithResponseFunc extends Step {
  run() {
    let platformMock: PlatformMock;
    let response: Response;
    return (
      <Scenario desc="Check the base mock for fetch mock">
        <Given
          desc="Create a PlatformMock instance"
          action={() => {
            platformMock = new PlatformMock();
          }}
        />
        <When
          desc="Call 'post' mock api"
          action={async () => {
            platformMock.post('/restapi/v1.0/number-parser/parse', 200, {
              response: ({ mockData, url, params, body }) => {
                expect(url).toEqual(
                  'http://example.com/restapi/v1.0/number-parser/parse?nationalAsPriority=false&homeCountry=US',
                );
                expect(params).toEqual({
                  homeCountry: 'US',
                  nationalAsPriority: false,
                });
                expect(body).toEqual({ originalStrings: ['(165) 1223-4567'] });
                return { body: mockData };
              },
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
