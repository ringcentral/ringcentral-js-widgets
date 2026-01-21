/**
 * RCI-1872: Check microphone permission
 * https://test_it_domain/test-cases/RCI-1872
 * Preconditions:
 * 3. The microphone settings in Chrome:chrome://settings/content/microphone
 * Entry point(/s):
 * 1. The microphone setting in Site settings is 'Ask', and the microphone settings in Chrome is 'Ask'
 */
import { mockDevice } from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import {
  connectionStatus,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  And,
  autorun,
  common,
  Context,
  it,
  p1,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import {
  CheckCallButtonActive,
  CheckCallButtonDisabled,
} from '../../steps/Dialer';
import { Entry } from '../../steps/Entry';
import { Login } from '../../steps/Login';
import { NavigateToAudioSetting, NavigateToDialer } from '../../steps/Navigate';

// this case should be deprecated after introduce ringtone v2
@autorun(test.skip)
@common
@it
@p1
@title('Check microphone permission')
export class CheckMicrophonePermission extends Step {
  Login?: StepFunction | StepFunction[] = [Entry, Login];
  CheckCallButtonDisabled?: StepFunction = CheckCallButtonDisabled;
  appName = 'RingCentral Integrations Internal Demo';

  run() {
    const { Login, CheckCallButtonDisabled } = this;
    return (
      <Scenario desc="Check microphone permission">
        <When
          desc="mock no microphone permission"
          action={() => {
            mockDevice([]);
          }}
        />
        <When desc="login to the CTI" action={Login} />
        <Then
          desc="Go to Dialer, click the 'Webphone unavailable; Will show 'Please grant <AppName> to access your audio'"
          action={[
            WaitForRenderReady,
            () => {
              fireEvent.click(screen.getByTitle('Web Phone Unavailable'));
              expect(
                screen.getByText(
                  `Please grant ${this.appName} to access your audio.`,
                ),
              ).toBeVisible();
            },
          ]}
        />
        <Then
          desc="1. navigate to dialer page;
                2. call button should be disabled"
          action={[NavigateToDialer, CheckCallButtonDisabled]}
        />
        <When
          desc="Go to Settings/Audio page'"
          action={NavigateToAudioSetting}
        />
        <Then
          desc="Click 'Check permission;"
          action={async (_: any, context: Context) => {
            mockDevice();
            fireEvent.click(screen.getByTestId('checkMicPermission'));
            context.app.container
              .get(Webphone)
              .setConnectionStatus(connectionStatus.connected);
          }}
        />
        <Then
          desc="1. navigate to dialer page
                2. Call button change to available"
          action={[NavigateToDialer, <CheckCallButtonActive />]}
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
