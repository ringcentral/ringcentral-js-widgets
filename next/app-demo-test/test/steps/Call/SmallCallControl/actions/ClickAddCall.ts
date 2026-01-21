import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickAddButton: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.getByTestId('add').classList.value).not.toContain(
      'buttonDisabled',
    );
  });
  fireEvent.click(document.querySelector('[data-sign="add"] circle')!);
  await whenStateChange(() => {
    expect(screen.getByTestId('recipientsInput')).toBeInTheDocument();
  });
};
