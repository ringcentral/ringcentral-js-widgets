import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckAlertAutoDismiss: StepFunction<{
  ttl?: number;
  message: string;
}> = async ({ ttl = 5000, message }, { app }) => {
  const toastItem = screen
    .queryAllByTestId('Toast')
    .filter((it) => it.textContent && it.textContent.includes(message));

  expect(toastItem.length).toBeGreaterThan(0);

  const toastIds = toastItem.map((item) => {
    expect(item).toHaveAttribute('data-id');

    return item.getAttribute('data-id');
  });

  const toast = app.container.got(Toast)!;

  toastIds.forEach((id) => {
    const toastItem = toast.toasts.find((item) => id === item.id);

    if (toastItem) {
      // when item be undefined, that will use the default ttl, check the default ttl meet our expect
      if (toastItem.ttl === undefined) {
        expect(toast['_ttl']).toBe(ttl);
      } else {
        expect(toastItem.ttl).toBe(ttl);
      }
    } else {
      throw new Error(`Toast ${id} not found, Message: \r\n ${message}`);
    }
  });
};
