/**
 * RCI-1872: Check microphone permission
 * https://test_it_domain/test-cases/RCI-1872
 * Preconditions:
 * 3. The microphone settings in Chrome:chrome://settings/content/microphone
 * Entry point(/s):
 * 1. The microphone setting in Site settings is 'Ask', and the microphone settings in Chrome is 'Ask'
 */
import { mockDevice } from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';
import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
  common,
  StepProp,
} from '../../../../lib/step';
import { MockSipProvision } from '../../../../steps/Call/Webphone';
import { Login as CommonLogin } from '../../../../steps/Login';
import { MockMessageSync } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import {
  CheckCallButtonActive,
  CheckCallButtonDisabled,
} from '../../../../steps/dialer';

@autorun(test)
@common
@it
@p1
@title('Check microphone permission')
export class CheckMicrophonePermission extends Step {
  Login?: StepFunction<
    {
      isMockUserMedia?: boolean;
      shouldMockDevices?: boolean;
    },
    // TODO: fix the type
    any
  >;
  appName: string;
  CheckCallBtnDisabled: StepProp;

  run() {
    const {
      Login = CommonLogin,
      appName = brandConfig.appName,
      CheckCallBtnDisabled = CheckCallButtonDisabled,
    } = this;
    return (
      <Scenario desc="Check microphone permission">
        <When
          desc="login to the CTI"
          action={() => [
            <Login isMockUserMedia={false} shouldMockDevices={false} />,
            <MockMessageSync isDefaultInit={false} />,
            <MockSipProvision repeat={0} />,
          ]}
        />
        <Then
          desc="Go to Dialer, click the 'Webphone unavailable; Will show 'Please grant <AppName> to access your audio'"
          action={() => {
            fireEvent.click(screen.getByTitle('Web Phone Unavailable'));
            expect(
              screen.getByText(`Please grant ${appName} to access your audio.`),
            ).toBeVisible();
          }}
        />
        <Then
          desc="1. navigate to dialer page;
                2. call button should be disabled"
          action={[<NavigateTo path="/dialer" />, CheckCallBtnDisabled]}
        />
        <When
          desc="Go to Settings/Audio page'"
          action={<NavigateTo path="/settings/audio" />}
        />
        <Then
          desc="Click 'Check permission;"
          action={async (_: any, context: any) => {
            mockDevice();
            fireEvent.click(screen.getByTestId('checkMicPermission'));
            context.phone.webphone._setConnectionStatus(
              connectionStatus.connected,
            );
          }}
        />
        <Then
          desc="1. navigate to dialer page
                2. Call button change to available"
          action={[<NavigateTo path="/dialer" />, <CheckCallButtonActive />]}
        />
        <Then
          desc="The 'Webphone unavailable' will disappear"
          action={() => {
            expect(screen.queryByTitle('Web Phone Unavailable')).toBeNull();
          }}
        />
        <And
          desc="restore device mock"
          action={() => {
            mockDevice([]);
          }}
        />
      </Scenario>
    );
  }
}
