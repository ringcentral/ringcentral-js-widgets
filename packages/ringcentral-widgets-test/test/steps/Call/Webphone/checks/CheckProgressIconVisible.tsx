import type { StepFunction } from '../../../../lib/step';

export const CheckProgressIconVisible: StepFunction<{
  visible: boolean;
}> = async ({ visible }, context) => {
  const { queryByRole } = context.app;
  visible
    ? expect(queryByRole('progressbar')).not.toBeNull()
    : expect(queryByRole('progressbar')).toBeNull();
};
