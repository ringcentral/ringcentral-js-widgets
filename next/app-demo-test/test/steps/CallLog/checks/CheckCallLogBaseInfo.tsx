import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { getByTestId, screen } from '@testing-library/react';

interface IBaseInfoParams {
  name?: string;
  status?: string;
  hasDuration?: boolean;
}

interface ICheckLogBaseInfoSubParams extends IBaseInfoParams {
  hasCallStatusIcon?: boolean;
}

interface ICheckLogBaseInfoActiveParams extends ICheckLogBaseInfoSubParams {
  phoneNumber?: string | null | undefined;
}

export const CheckLogBaseInfoActive: StepFunction<
  ICheckLogBaseInfoActiveParams
> = async ({ name, phoneNumber, status, hasDuration, hasCallStatusIcon }) => {
  await whenStateChange(() => {
    const section = screen.getByTestId('logSection');
    if (name) {
      expect(getByTestId(section, 'logName')).toHaveTextContent(name);
    }

    if (phoneNumber) {
      expect(getByTestId(section, 'phoneNumber')).toHaveTextContent(
        phoneNumber,
      );
    }

    if (status) {
      expect(getByTestId(section, 'callStatus')).toHaveTextContent(status);
    }

    if (hasDuration) {
      expect(getByTestId(section, 'duration')).toBeInTheDocument();
    }

    if (hasCallStatusIcon) {
      expect(section.querySelector('.callIcon')).toBeInTheDocument();
    }
  });
};

export const CheckLogBaseInfoSubSectionNotExist: StepFunction = async () => {
  await whenStateChange(() => {
    const section = screen.queryByTestId('subLogSection');
    expect(section).not.toBeInTheDocument();
  });
};
