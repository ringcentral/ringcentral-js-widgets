import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

const ClickMoreButton: StepFunction = async () => {
  let selector: HTMLElement | null = null;
  await waitFor(() => {
    selector =
      screen.queryByTestId('more') ||
      document.querySelector<HTMLElement>('[data-sign="more"]');
    expect(selector).not.toBeNull();
  });

  fireEvent.click(selector!);
};

export { ClickMoreButton };
