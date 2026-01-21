import { screen, StepFunction } from '@ringcentral-integration/test-utils';

export const CheckProgressIconVisible: StepFunction<{
  visible: boolean;
}> = async ({ visible }) => {
  visible
    ? expect(screen.queryByRole('progressbar')).not.toBeNull()
    : expect(screen.queryByRole('progressbar')).toBeNull();
};
