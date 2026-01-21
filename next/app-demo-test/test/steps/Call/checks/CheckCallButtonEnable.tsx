import { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import { screen, type StepFunction } from '@ringcentral-integration/test-utils';

import { NavigateTo } from '../../Router';

export const CheckCallButtonEnable: StepFunction<{
  enable: boolean;
}> = async ({ enable }, { app }) => {
  const dialerView = app.container.got(DialerView)!;
  const dialerUIProps = dialerView.getUIProps({});
  return (
    <>
      <NavigateTo path="/dialer" />
      {() => {
        if (enable) {
          expect(dialerUIProps.callButtonDisabled).toBeFalsy();
          expect(
            screen.queryByTestId('callButton')!.getAttribute('class'),
          ).not.toContain('disabled');
        }
        if (!enable) {
          expect(dialerUIProps.callButtonDisabled).toBeTruthy();
          expect(
            screen.queryByTestId('callButton')!.getAttribute('class'),
          ).toContain('disabled');
        }
      }}
    </>
  );
};
