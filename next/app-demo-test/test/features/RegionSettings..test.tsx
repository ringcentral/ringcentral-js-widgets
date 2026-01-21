import { RegionSettings } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  autorun,
  common,
  Given,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../steps/Alert';
import { Entry } from '../steps/Entry';
import { Login } from '../steps/Login';
import { MockNumberParserV1 } from '../steps/Mock';
import { CheckRoutePathIs } from '../steps/Router';

@autorun(test)
@common
@title('Check RegionSettings')
export class TestRegionSettings extends Step {
  run() {
    return (
      <Scenario
        desc="User go to the app entry"
        action={
          <Entry mocks={[<MockNumberParserV1 isDefaultInit={false} />]} />
        }
      >
        <Given desc="User login app and go to dialer page" action={Login} />
        <Then
          desc="regionSettings functions"
          action={[
            (async (_, { app }) => {
              const regionSettings = app.container.got(RegionSettings)!;

              const result = await regionSettings['_alertSettingsChanged']();

              expect(result).toEqual({
                close: expect.any(Function),
                id: expect.any(String),
                closed: expect.any(Object),
              });
            }) as StepFunction,
            <CheckAlertMessage
              message={
                'The previous region is no longer supported for your account.\n    Please verify your new region settings.'
              }
            />,
            ((_, { app }) => {
              userEvent.click(screen.getByText('region settings'));
            }) as StepFunction,
            <CheckRoutePathIs path="/settings/region" />,
          ]}
        />
      </Scenario>
    );
  }
}
