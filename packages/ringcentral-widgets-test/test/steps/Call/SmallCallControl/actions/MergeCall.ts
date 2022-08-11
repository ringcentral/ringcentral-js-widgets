import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

export const ClickMergeButton: StepFunction = async () => {
  await waitUntilTo(() => {
    expect(screen.getByTestId('merge')).not.toBeDisabled();
  });
  fireEvent.click(document.querySelector('[data-sign="merge"] circle')!);
};
