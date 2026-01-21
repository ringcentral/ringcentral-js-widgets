import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockRemoveParticipants: StepFunction<{
  repeat?: number;
  status?: number;
}> = async ({ status, repeat = 1 }, { rcMock }) => {
  rcMock.removePartyFromConference(repeat, status as any);
};
