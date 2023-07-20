import { screen, getByTestId, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface IBaseInfoParams {
  name?: string;
  status?: string;
  hasDuration?: boolean;
}

interface ICheckLogBaseInfoSubParams extends IBaseInfoParams {
  hasCallStatusIcon?: boolean;
}

interface ICheckLogBaseInfoActiveParams extends ICheckLogBaseInfoSubParams {
  phoneNumber?: string;
}

export const CheckLogBaseInfoActive: StepFunction<ICheckLogBaseInfoActiveParams> =
  async ({ name, phoneNumber, status, hasDuration }) => {
    await waitFor(
      () => {
        const section = screen.getByTestId('logSection');
        if (name) {
          expect(getByTestId(section, 'logName').textContent).toBe(name);
        }

        if (phoneNumber) {
          expect(getByTestId(section, 'phoneNumber').textContent).toBe(
            phoneNumber,
          );
        }

        if (status) {
          expect(getByTestId(section, 'callStatus').textContent).toBe(status);
        }

        if (hasDuration) {
          expect(getByTestId(section, 'subCallDuration')).toBeInTheDocument();
        }
      },
      { timeout: 3000 },
    );
  };

export const CheckLogBaseInfoSub: StepFunction<ICheckLogBaseInfoSubParams> =
  async ({ name, hasDuration, hasCallStatusIcon }) => {
    await waitFor(
      () => {
        const section = screen.getByTestId('subLogSection');

        if (name) {
          expect(getByTestId(section, 'subLogName').textContent).toBe(name);
        }

        if (hasDuration) {
          expect(getByTestId(section, 'subCallDuration')).toBeInTheDocument();
        }

        if (hasCallStatusIcon) {
          expect(getByTestId(section, 'subInfoHoldIcon')).toBeInTheDocument();
        }
      },
      { timeout: 3000 },
    );
  };

export const CheckLogBaseInfoSubSectionNotExist: StepFunction = async () => {
  await waitFor(
    () => {
      const section = screen.queryByTestId('subLogSection');
      expect(section).not.toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
