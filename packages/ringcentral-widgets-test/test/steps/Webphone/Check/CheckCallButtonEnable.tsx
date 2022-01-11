import { StepFunction } from '../../../lib/step';
import { ClickToNavigatePage } from '../../Router/action/PageNavigation';
import { Context } from '../../../interfaces';

export const CheckCallButtonEnable: StepFunction<{
  enable: boolean;
}> = async ({ enable }, context: Context) => {
  const { phone, app } = context;
  const { queryByTestId } = app;
  const dialerUIProps = phone.dialerUI.getUIProps();
  return (
    <>
      <ClickToNavigatePage path="/dialer" />
      {() => {
        if (enable) {
          expect(dialerUIProps.callButtonDisabled).toBeFalsy();
          expect(
            queryByTestId('callButton').getAttribute('class'),
          ).not.toContain('disabled');
        }
        if (!enable) {
          expect(dialerUIProps.callButtonDisabled).toBeTruthy();
          expect(queryByTestId('callButton').getAttribute('class')).toContain(
            'disabled',
          );
        }
      }}
    </>
  );
};
