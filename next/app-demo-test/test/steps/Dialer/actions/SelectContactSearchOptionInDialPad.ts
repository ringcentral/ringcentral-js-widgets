import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const SelectContactSearchOptionInDialPad: StepFunction<{
  option: string;
}> = async ({ option }) => {
  fireEvent.click(screen.queryAllByText(option)[0]);
};
