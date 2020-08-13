import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  examples,
  Step,
} from '../steps';
import { Login } from '../steps/Login';

@autorun(test)
@title('User make outbound call')
export class MakeOutboundCall extends Step {
  @examples(`
    | phoneNumber |
    | '1234567'   |
  `)
  run() {
    return (
      <Scenario desc="User login app" action={Login}>
        <Given desc="User go to dialer page" />
        <When desc="User input ${phoneNumber} and clicks 'dial' button" />
        <Then desc="User should see that the ${phoneNumber} was made outbound" />
      </Scenario>
    );
  }
}
