import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallWithJupiterLink: StepFunction<{
  link: RegExp;
  phoneNumber: string;
}> = ({ link, phoneNumber }: any) => {
  const callNumber = phoneNumber.replace(/\+|\*/g, (match) => {
    return `\\${match}`;
  });
  const reg = new RegExp(`${callNumber}$`);
  expect(window.open.mock.calls[0][0]).toMatch(link);
  expect(window.open.mock.calls[0][0]).toMatch(reg);
};
