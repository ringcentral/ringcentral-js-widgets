import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckRecipientsChipInToFieldProps {
  ChipValue: string;
}

const CheckRecipientsChipInToField: StepFunction<
  CheckRecipientsChipInToFieldProps
> = async ({ ChipValue = '' }) => {
  expect(screen.queryByTestId('recipientsChip').textContent).toEqual(ChipValue);
};

export { CheckRecipientsChipInToField };
