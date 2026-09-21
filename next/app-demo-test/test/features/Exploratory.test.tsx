import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Entry } from '../steps/Entry';
import { Login } from '../steps/Login';
import { CreateMock } from '../steps/Mock';

@autorun(test)
@common
@title('Exploratory')
export class Exploratory extends Step {
  run() {
    return (
      <Scenario desc="User go to the app entry" action={Entry}>
        <Given desc="User login app and go to dialer page" action={Login} />
      </Scenario>
    );
  }
}
