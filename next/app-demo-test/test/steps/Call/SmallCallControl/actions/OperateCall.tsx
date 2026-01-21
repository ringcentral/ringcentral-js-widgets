import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, getByTestId, screen } from '@testing-library/react';

interface OperateCallProps {
  dataSign: string;
}
export const OperateCall: StepFunction<OperateCallProps> = ({ dataSign }) => {
  const moreListSection = screen.getByTestId('moreList');
  const selector = getByTestId(moreListSection, dataSign);
  fireEvent.click(selector);
};
