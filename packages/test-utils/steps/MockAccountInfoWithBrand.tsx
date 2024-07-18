import type { StepFunction } from '../lib';

export const MockAccountInfoWithBrand: StepFunction<{
  brandId: string;
}> = ({ brandId }, { rcMock }) => {
  rcMock.defaultInitMocks.delete(rcMock.getAccount);
  rcMock.defaultInitMocks.add(() => rcMock.getAccount({ brandId }));
};
