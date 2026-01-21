/**
 * RCI-6704: Hide Select devices and Test volume components when on safari
 * https://test_it_domain/test-cases/RCI-6704
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio
 *
  | No. |Preconditions |Status |
  | 1 |The browser is Safari |Hide |
	| 2 |The browser is not Safari |Show |

 */
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepFunction,
  screen,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

jest.mock('@ringcentral-integration/utils', () => ({
  ...jest.requireActual('@ringcentral-integration/utils'),
  isSafari: () => !!global.isSafari,
}));

jest.mock(
  '@ringcentral-integration/commons/modules/Webphone/webphoneHelper',
  () => ({
    ...jest.requireActual(
      '@ringcentral-integration/commons/modules/Webphone/webphoneHelper',
    ),
    isFirefox: () => !!global.isFirefox,
  }),
);

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title(
  'Hide Select devices and Test volume components when on safari or firefox',
)
export class HideUnSupportedRingtoneSection extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  originalUserAgent = window.navigator.userAgent;
  @examples([
    {
      isSafari: true,
    },
    {
      isSafari: false,
    },
    {
      isFirefox: true,
    },
    {
      isFirefox: false,
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Hide Select devices and Test volume components when on safari or firefox">
        <When
          desc="User is on {Preconditions }, goto Entry point"
          action={[
            () => {
              global.isSafari = this.example.isSafari;
              global.isFirefox = this.example.isFirefox;
            },
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Input: the whole section
                Output:
                  - Speaker Source
                  - Test Speaker
                  - Ringtone and notification source
                All following components should be {Status}"
          action={() => {
            if (this.example.isSafari || this.example.isFirefox) {
              expect(
                screen.queryByTestId('inputDeviceSection'),
              ).not.toBeInTheDocument();
              expect(
                screen.queryByTestId('speakerDeviceSelect'),
              ).not.toBeInTheDocument();
              expect(
                screen.queryByTestId('test-speaker-button'),
              ).not.toBeInTheDocument();
              expect(
                screen.queryByTestId('ringtoneDeviceSelect'),
              ).not.toBeInTheDocument();
            } else {
              expect(
                screen.queryByTestId('inputDeviceSection'),
              ).toBeInTheDocument();
              expect(
                screen.queryByTestId('speakerDeviceSelect'),
              ).toBeInTheDocument();
              expect(
                screen.queryByTestId('test-speaker-button'),
              ).toBeInTheDocument();
              expect(
                screen.queryByTestId('ringtoneDeviceSelect'),
              ).toBeInTheDocument();
            }
            // reset data
            global.isSafari = undefined;
            global.isFirefox = undefined;
          }}
        />
      </Scenario>
    );
  }
}
