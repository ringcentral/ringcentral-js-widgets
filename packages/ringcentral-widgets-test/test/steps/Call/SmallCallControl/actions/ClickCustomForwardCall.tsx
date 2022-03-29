import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ClickCustomForwardCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  const customEle = screen.getByTestId('custom');
  fireEvent.click(customEle);
};
