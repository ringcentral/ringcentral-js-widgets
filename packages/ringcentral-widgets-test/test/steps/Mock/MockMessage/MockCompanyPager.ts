import type companyPagerInvalidResponse from '@ringcentral-integration/mock/src/platform//data/companyPagerInvalid.json';
import type companyPagerBody from '@ringcentral-integration/mock/src/platform/data/companyPager.json';

import type { StepFunction } from '../../../lib/step';

interface MockCompanyPagerProps {
  handler?: (
    companyPagerResponse:
      | typeof companyPagerBody
      | typeof companyPagerInvalidResponse,
  ) => any;
  isDefaultInit?: boolean;
  repeat?: number;
  requestInvalid?: boolean;
  responseCode?: number;
}

export const MockCompanyPager: StepFunction<MockCompanyPagerProps> = async (
  {
    handler = (mockData) => mockData,
    repeat = 1,
    isDefaultInit = true,
    requestInvalid = false,
    responseCode = 200,
  },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postCompanyPager(handler, repeat, requestInvalid, responseCode);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.postCompanyPager);
  rcMock.defaultInitMocks.add(() => {
    rcMock.postCompanyPager(handler, repeat, requestInvalid, responseCode);
  });
};
