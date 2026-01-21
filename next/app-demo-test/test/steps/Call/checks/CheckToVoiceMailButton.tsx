import { StepFunction, screen } from '@ringcentral-integration/test-utils';

export const CheckToVoicemailButton: StepFunction<{
  exists: boolean;
}> = async ({ exists }: { exists: boolean }) => {
  if (exists) {
    const toVoicemailBtn = screen.queryByTestId('toVoicemail');
    expect(toVoicemailBtn).not.toBe(null);
  } else {
    const toVoicemailBtn = screen.queryByTestId('toVoicemail');
    expect(toVoicemailBtn).toBe(null);
  }
};
