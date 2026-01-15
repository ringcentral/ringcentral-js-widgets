import type accountBody from '@ringcentral-integration/mock/src/platform/data/accountInfo.json';

import type { StepFunction } from '../lib';

export const MockAccountInfoWithBrand: StepFunction<{
  handler?: (accountInfo: typeof accountBody) => typeof accountBody;
  brandId: string;
}> = ({ handler, brandId }, { rcMock }) => {
  rcMock.defaultInitMocks.delete(rcMock.getAccount);
  rcMock.defaultInitMocks.add(() => rcMock.getAccount({ brandId, handler }));
};
