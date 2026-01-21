import type {
  AlertLevelType,
  Options,
} from '@ringcentral-integration/commons/modules/Alert';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckAlertToBeCallWith: StepFunction<Options> = async (
  props,
  { app },
) => {
  const { children, level, ...data } = props;
  jest.useFakeTimers();
  jest.advanceTimersByTime(500);
  jest.useRealTimers();
  const alert = app.container.got(Alert)!;
  await whenStateOrTimerChange(() => {
    expect(alert[level as AlertLevelType]).toHaveBeenCalledWith(
      expect.objectContaining(data),
    );
  });
};
