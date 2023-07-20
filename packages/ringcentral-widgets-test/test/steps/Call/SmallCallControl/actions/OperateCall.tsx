import { fireEvent, screen, getByTestId } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

interface OperateCallProps {
  dataSign: string;
}
export const OperateCall: StepFunction<OperateCallProps> = ({ dataSign }) => {
  const moreListSection = screen.getByTestId('moreList');
  const selector = getByTestId(moreListSection, dataSign);
  fireEvent.click(selector);
};
