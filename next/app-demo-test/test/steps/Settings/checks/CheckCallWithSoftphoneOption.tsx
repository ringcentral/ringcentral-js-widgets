import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  screen,
  StepFunction,
  within,
} from '@ringcentral-integration/test-utils';

export const CheckCallWithSoftphoneOptionDisplay: StepFunction<{
  show: boolean;
  spartanName: string;
}> = async ({ show, spartanName }) => {
  if (show) {
    await whenStateChange(() => {
      expect(
        within(screen.getByTestId('callingSetting')).queryByText(spartanName),
      ).toBeInTheDocument();
    });
  } else {
    await whenStateChange(() => {
      expect(
        within(screen.getByTestId('callingSetting')).queryByText('Phone'),
      ).not.toBeInTheDocument();
    });
  }
};
