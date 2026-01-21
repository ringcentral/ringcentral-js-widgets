import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';

interface CheckCallListLengthProps {
  callListLength?: number;
  currentName?: string;
}

const CheckCallListLength: StepFunction<CheckCallListLengthProps> = async ({
  callListLength,
  currentName,
}) => {
  const backButton = screen.getByTestId('backButton');
  fireEvent.click(backButton);

  await whenStateChange(() => {
    expect(screen.queryByTestId('activeCalls')).not.toBeNull();
    expect(screen.getAllByTestId('callList').length).toEqual(callListLength);
    expect(screen.getByTestId('currentName').textContent).toEqual(currentName);
  });
};

export { CheckCallListLength };
