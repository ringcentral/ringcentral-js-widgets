import {
  AdvanceTimersByTime,
  common,
  UseFakeTimers,
  UseRealTimers,
} from '@ringcentral-integration/test-utils';
import { SDK } from '@ringcentral/sdk';

import {
  autorun,
  Given,
  it,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '../../../lib/step';
import { SetDataTrackingEnable } from '../../../steps/Environment/actions/SetDataTrackingEnable';
import { SetEnvironmentOptions } from '../../../steps/Environment/actions/SetEnvironmentOptions';
import { ToggleEnv } from '../../../steps/Environment/actions/ToggleEnv';
import { CheckEnvironmentOptions } from '../../../steps/Environment/checks/CheckEnvironmentOptions';
import { Login } from '../../../steps/Login';
import { NavigateTo } from '../../../steps/Router';

const defaultServerUrl = SDK.server.sandbox;
const fakeServerUrl = 'https://www.new-server';

@autorun(test)
@common
@it
@title('Check Environment Settings')
export class EnvironmentSettings extends Step {
  run() {
    process.env = {
      ...process.env,
      BUILD_ENVIRONMENT: 'dev',
    };

    return (
      <Scenario desc="Create phone instance and login">
        <Given desc="Create phone instance and login" action={Login} />
        <When
          desc="App navigate to environment page"
          action={[<NavigateTo path="/" />, <ToggleEnv />]}
        />
        <Then
          desc="There should be environment options"
          action={
            <CheckEnvironmentOptions
              server={defaultServerUrl}
              enableDataTracking={false}
            />
          }
        />
        <When
          desc="Turn on Enable Data Tracking"
          action={[<SetDataTrackingEnable enable />]}
        />
        <Then
          desc="Analytics should be enabled"
          action={
            ((_, { phone }) => {
              expect(phone.analytics.enableMixpanel).toEqual(true);
            }) as StepFunction
          }
        />
        <When
          desc="Two hours have passed"
          action={[
            UseFakeTimers,
            <AdvanceTimersByTime ms={2 * 60 * 60 * 1000 + 1} />,
          ]}
        />
        <Then
          desc="Analytics should be disabled"
          action={[
            ((_, { phone }) => {
              expect(phone.analytics.enableMixpanel).toEqual(false);
            }) as StepFunction,
            UseRealTimers,
          ]}
        />
        <When
          desc="New environment options are applied"
          action={[
            ToggleEnv,
            <SetEnvironmentOptions server={fakeServerUrl} enable />,
          ]}
        />
        <Then
          desc="Sdk should be created with new environment options"
          action={[
            <ToggleEnv />,
            <CheckEnvironmentOptions server={fakeServerUrl} />,
          ]}
        />
      </Scenario>
    );
  }
}
