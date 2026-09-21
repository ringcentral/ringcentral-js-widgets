import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { renderHook } from '@testing-library/react';

import { useContactRenderInfoFromCall } from './useContactRenderInfo';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral-integration/next-core', () => ({
  ...jest.requireActual('@ringcentral-integration/next-core'),
  useContainer: () => undefined,
}));

jest.mock('./components', () => ({
  ContactDisplayRender: () => null,
  useFormatExtOrPhoneNumber: (info: { phoneNumber?: string } = {}) =>
    info.phoneNumber || '',
  useGetContactDisplayTextFn: () => () => '',
}));

describe('useContactRenderInfoFromCall', () => {
  test('preserves Avatar and DisplayName identity when incoming call data is unchanged', () => {
    const call = {
      direction: 'Inbound',
      from: {
        phoneNumber: '+16505550100',
      },
      to: {
        phoneNumber: '+16505550101',
      },
      fromMatches: [],
      toMatches: [],
      webphoneSession: {},
    } as unknown as Call;

    const { result, rerender } = renderHook(() =>
      useContactRenderInfoFromCall(call),
    );
    const firstAvatar = result.current.Avatar;
    const firstDisplayName = result.current.DisplayName;

    rerender();

    expect(result.current.Avatar).toBe(firstAvatar);
    expect(result.current.DisplayName).toBe(firstDisplayName);
  });
});
