import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickCompleteTransferButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('completeTransfer'));
};

export { ClickCompleteTransferButton };
