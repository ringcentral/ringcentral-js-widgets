import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

export const UpdateCallLogField: StepFunction<{
  content: string;
  dataSign: string;
  type: 'input' | 'textarea';
  clearOriginalText?: boolean;
}> = ({ content, dataSign, type, clearOriginalText = true }) => {
  const targetField = screen.getByTestId(dataSign).querySelector(type)!;
  if (clearOriginalText) {
    userEvent.clear(targetField);
  }
  userEvent.type(targetField, content);
};
