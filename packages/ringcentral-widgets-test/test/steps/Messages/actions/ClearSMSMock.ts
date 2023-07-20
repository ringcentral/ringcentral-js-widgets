import { StepFunction } from '@ringcentral-integration/test-utils';

interface ClearSMSMockProps {}

export const ClearSMSMock: StepFunction<ClearSMSMockProps> = async (
  props,
  { rcMock },
) => {
  rcMock.defaultInitMocks.delete(rcMock.postSms);
};
