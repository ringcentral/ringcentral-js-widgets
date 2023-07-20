import React from 'react';

import type { StepFunction } from '@ringcentral-integration/test-utils';
import { render } from '@ringcentral-integration/test-utils';

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
