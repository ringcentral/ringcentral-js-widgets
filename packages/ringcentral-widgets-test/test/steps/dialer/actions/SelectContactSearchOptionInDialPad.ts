import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const SelectContactSearchOptionInDialPad: StepFunction<{
  option: string;
}> = async ({ option }) => {
  fireEvent.click(screen.queryAllByText(option)[0]);
};
