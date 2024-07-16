import type { StepFunction } from '../../../lib/step';

interface MockGetStatusProps {
  handler?: (mockData: any) => any;
  status?: 200 | 503;
  repeat?: 0 | 1;
}

/**
 * Mock get status API
 * @param handler optional handler for API response
 * @param status optional http-code for API response
 * @param repeat optional repeat for fetch-mock
 */
export const MockGetStatus: StepFunction<MockGetStatusProps> = (
  { repeat, status = 200, handler },
  { rcMock },
) => {
  function mock() {
    rcMock.get('/restapi/v1.0/status' as any, status, {
      repeat,
      response: ({ mockData }) => {
        return {
          body: handler?.(mockData) ?? mockData,
        };
      },
    });
  }

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.add(mock);
  }
};
