import type {
  AlertLevelType,
  Options,
} from '@ringcentral-integration/commons/modules/Alert';
import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';

import type { StepFunction } from '../../../lib/step';

export const CheckAlertToBeCallWith: StepFunction<Options> = async (
  props,
  { phone },
) => {
  const { children, level, ...data } = props;
  jest.useFakeTimers();
  jest.advanceTimersByTime(500);
  jest.useRealTimers();

  await whenStateOrTimerChange(() => {
    expect(phone.alert[level as AlertLevelType]).toHaveBeenCalledWith(
      expect.objectContaining(data),
    );
  });
};
