import type { StepFunction } from '../../lib/step';

interface MockGetStatusProps {
  repeat?: number;
  isDefaultInit?: boolean;
  retryAfter?: string;
  status?: 200 | 500 | 503;
  mockData?: any;
}

const contentType = { 'Content-Type': 'application/json' };

function generateRetryAfter(retryAfter?: string) {
  const retryAfterHeader = !retryAfter ? {} : { 'Retry-After': retryAfter };
  return retryAfterHeader;
}

export const MockGetStatus: StepFunction<MockGetStatusProps> = async (
  { repeat = 1, retryAfter, status = 200, mockData = {} },
  { rcMock },
) => {
  const retryAfterHeader = generateRetryAfter(retryAfter);
  const setupMock = () => {
    rcMock.get('/restapi/v1.0/status', status, {
      repeat,
      response: {
        body: mockData,
        headers: {
          ...contentType,
          ...retryAfterHeader,
        },
      },
    });
  };

  setupMock();
};
