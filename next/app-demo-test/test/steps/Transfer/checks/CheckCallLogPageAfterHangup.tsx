import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import { screen, type StepFunction } from '@ringcentral-integration/test-utils';

interface CheckCallLogPageAfterHangupProps {
  originCallName: string;
  transferCallHangup?: boolean;
}
export const CheckCallLogPageAfterHangup: StepFunction<
  CheckCallLogPageAfterHangupProps
> = async ({ originCallName, transferCallHangup = true }, { app }) => {
  expect(screen.getByTestId('logName')).toBeInTheDocument();
  expect(screen.queryByTestId('subLogName')).toBeNull();
  expect(screen.getByTestId('logName')?.textContent).toEqual(originCallName);
  const activeCallControl = app.container.got(ActiveCallControl)!;
  expect(activeCallControl.activeSession?.isOnHold).toBeTruthy();
  if (transferCallHangup) {
    expect(screen.getByTestId('mute')).toBeInTheDocument();
    expect(screen.getByTestId('showKeypad')).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
    expect(screen.getByTestId('hangup')).toBeInTheDocument();
  }
};
