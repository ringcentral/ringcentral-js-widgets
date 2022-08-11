import { SDK } from '@ringcentral/sdk';
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  it,
} from '../../../lib/step';
import { Login } from '../../../steps/Login';
import { NavigateTo } from '../../../steps/Router/action';
import { ToggleEnv } from '../../../steps/Environment/actions/ToggleEnv';
import { SetEnvironmentOptions } from '../../../steps/Environment/actions/SetEnvironmentOptions';
import { CheckEnvironmentOptions } from '../../../steps/Environment/checks/CheckEnvironmentOptions';

const defaultServerUrl = SDK.server.sandbox;
const fakeServerUrl = 'https://www.new-server';

@autorun(test)
@it
@title('Check Environment Settings')
export class EnvironmentSettings extends Step {
  run() {
    return (
      <Scenario desc="Create phone instance and login">
        <Given desc="Create phone instance and login" action={Login} />
        <When
          desc="App navigate to environment page"
          action={[<NavigateTo path="/" />, <ToggleEnv />]}
        />
        <Then
          desc="There should be environment options"
          action={<CheckEnvironmentOptions server={defaultServerUrl} />}
        />
        <When
          desc="New environment options are applied"
          action={<SetEnvironmentOptions server={fakeServerUrl} enable />}
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
