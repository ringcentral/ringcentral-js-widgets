import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

interface OperationProps {
  parsedNumber?: string;
  name?: string;
}
function getPhoneNumberRegExp(parsedNumber: string) {
  return new RegExp(
    `^${parsedNumber
      .replace('(', '\\(')
      .replace(')', '\\)')
      .replace('+', '\\+')}$`,
  );
}

export const CheckConferenceCallControlPage: StepFunction<OperationProps> =
  async ({ parsedNumber, name }) => {
    expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
    if (parsedNumber) {
      const numberRegEx = getPhoneNumberRegExp(parsedNumber);
      expect(screen.getByTestId('activeCalleeName')).toHaveTextContent(
        numberRegEx,
      );
    }
    if (name) {
      expect(screen.getByTestId('activeCalleeName')).toHaveTextContent(name);
    }
  };
