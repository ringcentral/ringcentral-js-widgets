import type { StepFunction } from '../../lib/step';

interface MockPostOauthTokenProps {
  isDefaultInit?: boolean;
  repeat?: number;
  failure?: boolean;
  failureCode?: 400 | 403 | 503;
}

export const MockPostOauthToken: StepFunction<MockPostOauthTokenProps> = async (
  { isDefaultInit = true, repeat = 1, failure = true, failureCode = 403 },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postOauthToken({
      failure,
      repeat,
      failureCode,
    });
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.postOauthToken);
  rcMock.defaultInitMocks.add(() => {
    rcMock.postOauthToken({
      failure,
      repeat,
      failureCode,
    });
  });
};
