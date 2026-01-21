import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { ClickMoreButton } from './ClickMoreButton';

const HangupWarmTransferCall: StepFunction = async (props, context) => {
  await ClickMoreButton(props, context);

  const moreList = screen.getByTestId('moreList');
  expect(moreList).toBeInTheDocument();

  fireEvent.click(moreList.querySelector('[data-sign="hangup"]')!);
};

export { HangupWarmTransferCall };
