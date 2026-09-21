import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckToastMessage: StepFunction<{
  message: string;
  noExist?: boolean;
  /**
   * If `fullMatch` is `true`, the `message` must be exactly the same as the toast message.
   * If `fullMatch` is `false`, the `message` must be included in the toast message.
   */
  fullMatch?: boolean;
  timeout?: number;
}> = async ({ message, noExist, fullMatch = true, timeout = 5000 }) => {
  await whenStateOrTimerChange(
    () => {
      const contents: string[] = [];

      const alerts = screen.queryAllByTestId('Toast').filter((it) => {
        const textContent = it.textContent;
        textContent && contents.push(textContent);

        return (
          textContent &&
          (fullMatch ? message === textContent : textContent.includes(message))
        );
      });

      try {
        if (noExist) {
          expect(alerts.length).toBe(0);
        } else {
          expect(alerts.length).toBeGreaterThanOrEqual(1);
        }
      } catch (error) {
        throw new Error(
          `${noExist ? 'Can' : "Can't"} find the toast message \r\n\r\n` +
            message +
            '\r\n\r\nall toast:\r\n\r\n' +
            contents.join('\r\n\r\n'),
        );
      }
    },
    { timeout },
  );
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
