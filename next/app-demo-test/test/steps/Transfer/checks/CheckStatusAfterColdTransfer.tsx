import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import { CallLogSection } from '@ringcentral-integration/micro-phone/src/app/views';
import { RouterPlugin } from '@ringcentral-integration/next-core';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen, type StepFunction } from '@ringcentral-integration/test-utils';

interface CheckStatusAfterColdTransferProps {
  notification?: string;
  postStatus: number;
}

const CheckStatusAfterColdTransfer: StepFunction<
  CheckStatusAfterColdTransferProps
> = async ({ notification, postStatus }, { app }) => {
  const activeCallControl = app.container.got(ActiveCallControl)!;
  const callLogSection = app.container.got(CallLogSection)!;
  const router = app.container.got(RouterPlugin)!;
  const callStatus = activeCallControl.activeSession?.callStatus;
  const telephonySessionId = callLogSection.currentCall.telephonySessionId;
  if (notification) {
    await whenStateChange(() => {
      expect(screen.queryByRole('alert')!.textContent).toEqual(notification);
    });
  }
  if (postStatus === 200) {
    await whenStateChange(() => {
      // transfer page should be closed
      expect(router.currentPath).not.toContain('/transfer');
      // The call should be disconnected
      expect(callStatus).not.toEqual('CallConnected');
    });
  } else {
    // Still on the transfer page
    expect(router.currentPath).toBe(`/transfer/${telephonySessionId}/active`);
    // The call should be connected
    expect(callStatus).toEqual('CallConnected');
  }
};

export { CheckStatusAfterColdTransfer };
