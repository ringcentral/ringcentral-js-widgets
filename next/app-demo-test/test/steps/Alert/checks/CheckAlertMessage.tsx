import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckAlertMessage: StepFunction<{
  dataSign?: string;
  message: string;
  shouldBeVisible?: boolean;
}> = async ({ dataSign = 'Toast', message, shouldBeVisible = true }) => {
  await whenStateChange(() => {
    const contents: string[] = [];
    const alerts = screen.queryAllByTestId(dataSign).filter((it) => {
      const textContent = it.textContent;
      textContent && contents.push(textContent);
      return textContent && message === textContent;
    });
    try {
      if (shouldBeVisible) {
        expect(alerts.length).toBeGreaterThanOrEqual(1);
      } else {
        expect(alerts.length).toBe(0);
      }
    } catch (error) {
      throw new Error(
        "Can't find the alert message \r\n\r\n" +
          message +
          '\r\n\r\nall message:\r\n\r\n' +
          contents.join('\r\n\r\n'),
      );
    }
  });
};

export const CheckContainsAlertMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await whenStateChange(() => {
    const alerts = screen.queryAllByTestId('Toast');
    const myAlert = alerts.find((alert) =>
      alert.textContent?.includes(message),
    );
    if (myAlert) {
      expect(myAlert).toHaveTextContent(message);
      return;
    }

    throw new Error("Can't find the alert message \r\n\r\n" + message);
  });
};
