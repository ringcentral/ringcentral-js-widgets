import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor, within } from '@testing-library/react';

const CheckSpecificCallsItem = (
  title: string,
  length: number,
  hasMergeButton?: boolean,
) => {
  if (length === 0) {
    expect(screen.queryAllByText(title)).toHaveLength(0);
    return;
  }

  const callsList = screen.queryAllByTestId('callList');
  const specificList = callsList.find((x) => !!within(x).queryByText(title))!;
  expect(specificList).toBeTruthy();

  const callItems = within(specificList).queryAllByTestId('callItem');
  expect(callItems.length).toBe(length);

  if (typeof hasMergeButton === 'boolean') {
    callItems.forEach((item) => {
      const mergeButton = within(item).queryAllByTestId('merge');
      expect(mergeButton.length).toBe(hasMergeButton ? 1 : 0);
    });
  }
};

export const CheckAllCallsListPage: StepFunction<{
  length?: number;
  onHoldCallsLength?: number;
  currentCallsLength?: number;
  ringingCallsLength?: number;
  checkMergeButton?: boolean;
}> = async ({
  length,
  onHoldCallsLength,
  currentCallsLength,
  ringingCallsLength,
  checkMergeButton,
}) => {
  await waitFor(
    () => {
      expect(screen.getByTestId('activeCalls')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );

  if (length !== undefined) {
    expect(screen.queryAllByTestId('callItem')).toHaveLength(length);
  }

  if (currentCallsLength !== undefined) {
    CheckSpecificCallsItem(
      'Current Call',
      currentCallsLength,
      checkMergeButton === true ? false : undefined,
    );
  }

  if (onHoldCallsLength !== undefined) {
    CheckSpecificCallsItem(
      'Call on Hold',
      onHoldCallsLength,
      checkMergeButton === true ? true : undefined,
    );
  }

  if (ringingCallsLength !== undefined) {
    CheckSpecificCallsItem(
      'Ringing Call',
      ringingCallsLength,
      checkMergeButton === true ? false : undefined,
    );
  }
};
