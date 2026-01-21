import { RouterPlugin } from '@ringcentral-integration/next-core';
import {
  fireEvent,
  screen,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

interface CheckAfterCompleteTransferProps {
  isCompleteTransfer?: boolean;
}

const CheckAfterCompleteTransfer: StepFunction<
  CheckAfterCompleteTransferProps
> = async ({ isCompleteTransfer = true }, { app }) => {
  if (!isCompleteTransfer) {
    expect(screen.getByTestId('logName')?.textContent).toEqual('110');
    expect(screen.getByTestId('subLogName')?.textContent).toEqual(
      '+18882556247',
    );

    const backButton = screen.getByTestId('backButton');
    fireEvent.click(backButton);
    expect(screen.queryByTestId('activeCalls')).not.toBeNull();
    expect(screen.queryAllByTestId('callList').length).toEqual(2);
  } else {
    const router = app.container.got(RouterPlugin)!;
    router.push('/calls');
    const backButton = screen.getByTestId('backButton');
    expect(screen.getByTestId('logName')?.textContent).toEqual('+18882556247');
    fireEvent.click(backButton);
    expect(screen.queryByTestId('activeCalls')).toBeNull();
  }
};

export { CheckAfterCompleteTransfer };
