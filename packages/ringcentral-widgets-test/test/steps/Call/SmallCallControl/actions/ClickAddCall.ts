import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const ClickAddButton: StepFunction = async () => {
  await waitUntilTo(() => {
    expect(screen.getByTestId('add').classList.value).not.toContain(
      'buttonDisabled',
    );
  });
  fireEvent.click(document.querySelector('[data-sign="add"] circle')!);
  await waitUntilTo(() => {
    expect(screen.getByTestId('recipientsInput')).toBeInTheDocument();
  });
};
