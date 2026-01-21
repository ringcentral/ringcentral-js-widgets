import type parerPhoneNumbersResponse from '@ringcentral-integration/mock/src/platform/data/numberParser.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockNumberParserProps {
  handler?: (
    res: typeof parerPhoneNumbersResponse,
  ) => typeof parerPhoneNumbersResponse;
  isDefaultInit?: boolean;
  repeat?: number;
}
export const MockNumberParserV1: StepFunction<MockNumberParserProps> = async (
  { handler, isDefaultInit = true, repeat = 0 },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postParerPhoneNumbers(handler, repeat);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.postParerPhoneNumbers, () => {
    rcMock.postParerPhoneNumbers(handler, repeat);
  });
};
