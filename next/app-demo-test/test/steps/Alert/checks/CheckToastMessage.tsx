import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckToastMessage: StepFunction<{
  message: string;
  noExist?: boolean;
}> = async ({ message, noExist }) => {
  if (noExist) {
    await whenStateOrTimerChange(() => {
      const alert = screen.queryByText(message);
      expect(alert).not.toBeInTheDocument();
    });
    return;
  }

  await whenStateOrTimerChange(() => {
    const alert = screen.queryByTestId('toast-container');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(message);
  });
};

export const CheckContainsToastMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await whenStateOrTimerChange(() => {
    const alerts = screen.queryAllByTestId('toast-container');
    const myToast = alerts.find((alert) =>
      alert.textContent?.includes(message),
    );
    expect(myToast).toHaveTextContent(message);
  });
};
