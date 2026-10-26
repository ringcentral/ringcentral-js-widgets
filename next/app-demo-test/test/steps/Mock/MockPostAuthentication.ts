import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPostAuthenticationProps {
  repeat?: number;
}

export const MockPostAuthentication: StepFunction<
  MockPostAuthenticationProps
> = async ({ repeat = 1 }, { rcMock }) => {
  rcMock.postAuthentication(undefined, repeat);
};
