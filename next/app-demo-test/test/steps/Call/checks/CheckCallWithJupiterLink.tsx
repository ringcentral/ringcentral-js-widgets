import { Softphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckCallWithJupiterLink: StepFunction<{
  link: string;
  universalLink: string;
  phoneNumber: string;
}> = ({ link, universalLink, phoneNumber }, { app }) => {
  const softphone = app.container.got(Softphone)!;
  const universal = Boolean(softphone['_useJupiterUniversalLink'](''));
  const callNumber = phoneNumber.replace(/\+|\*/g, (match: any) => {
    return `\\${match}`;
  });
  const reg = new RegExp(`${callNumber}$`);
  const mockOpen = jest.mocked(window.open);
  expect(mockOpen.mock.calls[0][0]).toMatch(universal ? universalLink : link);
  expect(mockOpen.mock.calls[0][0]).toMatch(reg);
};
