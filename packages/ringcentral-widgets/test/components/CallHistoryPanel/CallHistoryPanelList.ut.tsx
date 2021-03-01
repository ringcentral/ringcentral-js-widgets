import React from 'react';
import { StepFunction } from 'crius-test';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { CallHistoryPanel } from '../../../components/CallHistoryPanel';

interface CallHistoryPanelProps {
  calls: any[];
}

export const UTListNoData: StepFunction<CallHistoryPanelProps> = ({
  calls,
}) => {
  const { container } = render(
    <CallHistoryPanel calls={calls} currentLocale="en-US" />,
  );
  const emptyNode = container.querySelector('.empty');
  expect(emptyNode.innerHTML).toEqual('No call records');
};
