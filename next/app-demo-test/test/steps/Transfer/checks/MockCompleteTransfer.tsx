import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCompleteTransferProps {
  isSucceed: boolean;
}
const MockCompleteTransfer: StepFunction<MockCompleteTransferProps> = async (
  _,
  { app, rcMock },
) => {
  const activeCallControl = app.container.got(ActiveCallControl)!;
  jest
    .spyOn(activeCallControl, 'completeWarmTransfer')
    .mockImplementation(async (telephonySession: any) => {
      const { relatedTelephonySessionId } =
        activeCallControl.transferCallMapping[telephonySession];
      await rcMock.goneCall(relatedTelephonySessionId);
      await rcMock.goneCall(telephonySession);
    });
};

export { MockCompleteTransfer };
