import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ClickForwardCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  const forwardList = screen.getByTestId('forwardActiveList');
  const firstEle = forwardList.getElementsByClassName('moreActionItem')[0];
  fireEvent.click(firstEle);
};
