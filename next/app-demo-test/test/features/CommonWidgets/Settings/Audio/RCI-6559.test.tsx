/**
 * RCI-6559: No permission_show alert
 * https://test_it_domain/test-cases/RCI-6559
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * in chrome://settings,microphone permission for extension is Ask
 * Entry point(/s):
 * Go to Settings > Audio
 * Go to Dialer > Click badge'Web Phone Unavailable'
 */
import { mockDevice } from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import { AudioSettings } from '@ringcentral-integration/micro-phone/src/app/services';
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
  MockAccountInfoWithBrand,
  screen,
  within,
  userEvent,
} from '@ringcentral-integration/test-utils';

import { CheckToastMessage } from '../../../../steps/Alert';
import { ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { Logout } from '../../../../steps/Logout';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('No permission_show alert')
export class NoPermissionAlert extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples([
    {
      Entry: <NavigateTo path="/settings/audio" />,
      mockDevices: [],
      brand: 'rc',
      brandId: '1210',
      brandName: 'RingCentral',
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="No permission_show alert">
        <When
          desc="Direct to entry points"
          action={[
            CreateMock,
            <MockAccountInfoWithBrand brandId={this.example.brandId} />,
            Login,
            ((_, { app }) => {
              const brand = app.container.got(Brand)!;
              brand.setDynamicConfig({
                ...brand.brandConfig,
                name: this.example.brandName,
              });
              window.navigator.mediaDevices.getUserMedia = jest
                .fn()
                .mockRejectedValue('permission reject');
            }) as StepFunction,
            (() => {
              jest
                .mocked(window.navigator.mediaDevices.getUserMedia)
                .mockClear();
            }) as StepFunction,
            this.example.Entry,
          ]}
        />
        <Then
          desc="Display the warning message and with close button:
										'To use this function, go to your browser settings to allow {brandName} to access microphone. Checkpermissions'
										[L10N]"
          action={
            <CheckToastMessage
              message={`To use this function, go to your browser settings to allow ${this.example.brandName} to access microphone. Check permissions`}
            />
          }
        />
        <When
          desc="Click 'Check permissions'"
          action={[
            (() => {
              jest
                .mocked(window.navigator.mediaDevices.getUserMedia)
                .mockClear();
            }) as StepFunction,
            <ClickItemByDataSign dataSign="checkPermissionAction" />,
          ]}
        />
        <Then
          desc="Popup browser audio permission grant"
          action={() => {
            expect(
              window.navigator.mediaDevices.getUserMedia,
            ).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Click the close button"
          action={[
            (async () => {
              const toasts = screen.queryAllByTestId('Toast');
              const targetToast = toasts.find((toast) =>
                toast.textContent?.includes(
                  `To use this function, go to your browser settings to allow ${this.example.brandName} to access microphone. Check permissions`,
                ),
              );
              if (targetToast) {
                const dismissButton = within(targetToast).getByTestId('dismiss');
                userEvent.click(dismissButton);
              }
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The warning message disappeared"
          action={
            <CheckToastMessage
              noExist
              message={`To use this function, go to your browser settings to allow ${this.example.brandName} to access microphone. Check permissions`}
            />
          }
        />
        <When
          desc="Back to step 2, allow audio permission to app"
          action={[
            ((_, { app }) => {
              const audioSettings = app.container.got(AudioSettings)!;
              audioSettings.showPermissionAlert();
              mockDevice();
            }) as StepFunction,
            <ClickItemByDataSign dataSign="checkPermissionAction" />,
          ]}
        />
        <Then
          desc="The warning message disappeared"
          action={
            <CheckToastMessage
              noExist
              message={`To use this function, go to your browser settings to allow ${this.example.brandName} to access microphone. Check permissions`}
            />
          }
        />
        <Then desc="Logout" action={[<Logout shouldFlush shouldReset />]} />
      </Scenario>
    );
  }
}
