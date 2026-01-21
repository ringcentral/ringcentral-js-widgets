import type { StepFunction } from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickWarmTransferButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('warmTransferBtn'));
  await sleep(4000);
};

export { ClickWarmTransferButton };
