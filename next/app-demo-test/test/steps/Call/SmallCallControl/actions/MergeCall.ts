import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickMergeButton: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.getByTestId('merge')).not.toBeDisabled();
  });
  fireEvent.click(document.querySelector('[data-sign="merge"] circle')!);
};
