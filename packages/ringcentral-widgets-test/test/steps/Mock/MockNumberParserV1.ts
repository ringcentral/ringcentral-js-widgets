import parerPhoneNumbersResponse from '@ringcentral-integration/mock/src/platform/data/numberParser.json';
import { StepFunction } from '../../lib/step';

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
  rcMock.defaultInitMocks.delete(rcMock.postParerPhoneNumbers);
  rcMock.defaultInitMocks.add(() => {
    rcMock.postParerPhoneNumbers(handler, repeat);
  });
};
