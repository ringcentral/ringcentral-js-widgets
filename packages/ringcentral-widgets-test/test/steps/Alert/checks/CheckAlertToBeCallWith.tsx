import type {
  Options,
  AlertLevelType,
} from '@ringcentral-integration/commons/modules/Alert';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../lib/step';

export const CheckAlertToBeCallWith: StepFunction<Options> = async (
  props,
  { phone },
) => {
  const { children, level, ...data } = props;
  jest.useFakeTimers();
  jest.advanceTimersByTime(500);
  await waitForRenderReady();
  jest.useRealTimers();

  expect(phone.alert[level as AlertLevelType]).toBeCalledWith(
    expect.objectContaining(data),
  );
};
