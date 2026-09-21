import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckConnectivityBadgeProps {
  exists?: boolean;
  textContent?: string;
}

/**
 * Check connectivity badge display or not and what is the text content in the badge
 * @param exists boolean value for indicating to check exists of not
 * @param textContent string value for checking the badge text when the badge exists
 */
export const CheckConnectivityBadge: StepFunction<
  CheckConnectivityBadgeProps
> = async ({ exists = true, textContent }) => {
  await whenStateOrTimerChange(() => {
    const connectivityBadges = screen.queryAllByTestId('ConnectivityBadge');
    if (exists) {
      expect(connectivityBadges.length).toBeGreaterThanOrEqual(1);
      if (textContent) {
        expect(
          connectivityBadges.map((badge) => badge.textContent?.trim()),
        ).toContain(textContent);
      }
    } else {
      expect(connectivityBadges).toHaveLength(0);
    }
  });
};
