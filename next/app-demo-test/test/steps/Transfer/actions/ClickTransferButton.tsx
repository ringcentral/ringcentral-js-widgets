import { sleep } from '@ringcentral-integration/commons/utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickTransferButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('transferBtn'));
  await sleep(1000);
};

export { ClickTransferButton };
