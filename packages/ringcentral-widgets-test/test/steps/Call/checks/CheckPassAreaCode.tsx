import { StepFunction } from '../../../lib/step';

interface CheckAreaCodeProps {
  areaCode: string;
}

export const CheckPassAreaCode: StepFunction<CheckAreaCodeProps> = async (
  { areaCode },
  { phone },
) => {
  expect(
    phone.numberValidate._parsingPhoneNumber.mock.calls[0][0].context
      .defaultAreaCode,
  ).toBe(areaCode);
};
