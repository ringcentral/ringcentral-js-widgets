import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { CallButtonBehavior } from './CallButtonBehavior';

export const ForwardCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  const forwardList = screen.getByTestId('forwardActiveList');
  const firstEle = forwardList.getElementsByClassName('moreActionItem')[0];
  fireEvent.click(firstEle);
};
