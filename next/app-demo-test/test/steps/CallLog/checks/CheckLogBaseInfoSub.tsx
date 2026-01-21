import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { getByTestId, screen } from '@testing-library/react';

interface ICheckLogBaseInfoSubParams {
  name?: string;
  status?: 'onHold' | 'active' | 'callEnd';
  hasDuration?: boolean;
  hasCallStatusIcon?: boolean;
}

export const CheckLogBaseInfoSub: StepFunction<
  ICheckLogBaseInfoSubParams
> = async ({ name, hasDuration, hasCallStatusIcon, status }) => {
  await whenStateChange(() => {
    const section = screen.getByTestId('subLogSection');

    if (name) {
      expect(getByTestId(section, 'subLogName')).toHaveTextContent(name);
    }

    if (status) {
      expect(getByTestId(section, `shinyBar-${status}`)).toBeInTheDocument();
    }

    if (hasDuration) {
      expect(getByTestId(section, 'subCallDuration')).toBeInTheDocument();
    }

    if (hasCallStatusIcon) {
      expect(getByTestId(section, 'subInfoHoldIcon')).toBeInTheDocument();
    }
  });
};
