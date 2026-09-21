import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@ringcentral-integration/test-utils';

export const CheckLimitedModeBadge: StepFunction<{
  show?: boolean;
}> = async ({ show = true }) => {
  await whenStateOrTimerChange(() => {
    const badge = screen.queryByText('Limited Mode');
    if (show) {
      const badgeTexts = screen
        .queryAllByTestId('ConnectivityBadge')
        .map((item) => item.textContent?.trim())
        .filter(Boolean);
      expect(badgeTexts).toContain('Limited Mode');
    } else {
      expect(badge).not.toBeInTheDocument();
    }
  });
};
