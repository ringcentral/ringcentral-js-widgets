import type numberParserInfoBody from '@ringcentral-integration/mock/src/platform/data/numberParserV2.json';
import type { StepFunction } from '../../lib/step';

interface MockNumberParserProps {
  handler?: (res: typeof numberParserInfoBody) => typeof numberParserInfoBody;
  isDefaultInit?: boolean;
  repeat?: number;
  status?: number;
}
export const MockNumberParserV2: StepFunction<MockNumberParserProps> = async (
  { handler, isDefaultInit = true, repeat = 0, status = 200 },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postNumberParserV2(handler, repeat, status);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.postNumberParserV2);
  rcMock.defaultInitMocks.add(() => {
    rcMock.postNumberParserV2(handler, repeat, status);
  });
};
