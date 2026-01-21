import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface CheckAreaCodeProps {
  areaCode: string;
}

export const CheckPassAreaCode: StepFunction<CheckAreaCodeProps> = async (
  { areaCode },
  { app },
) => {
  const numberValidate = app.container.got(NumberValidate)!;
  expect(
    numberValidate._parsingPhoneNumber.mock.calls[0][0].context.defaultAreaCode,
  ).toBe(areaCode);
};
