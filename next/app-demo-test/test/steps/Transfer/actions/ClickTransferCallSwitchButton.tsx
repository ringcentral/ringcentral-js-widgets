import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickTransferCallSwitchButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('warmTransferSwitchCallButton'));
};

export { ClickTransferCallSwitchButton };
