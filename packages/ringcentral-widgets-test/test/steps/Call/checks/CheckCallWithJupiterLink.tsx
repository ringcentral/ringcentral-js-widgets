import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';

import type { StepFunction } from '../../../lib/step';

export const CheckCallWithJupiterLink: StepFunction<{
  link: RegExp;
  phoneNumber: string;
}> = async ({ link, phoneNumber }: any) => {
  await whenStateOrTimerChange(() => {
    const callNumber = phoneNumber.replace(/\+|\*/g, (match) => {
      return `\\${match}`;
    });
    const reg = new RegExp(`${callNumber}$`);
    expect(window.open.mock.calls[0][0]).toMatch(link);
    expect(window.open.mock.calls[0][0]).toMatch(reg);
  });
};
