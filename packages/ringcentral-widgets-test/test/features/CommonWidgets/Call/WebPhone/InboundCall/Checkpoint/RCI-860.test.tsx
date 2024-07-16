/**
 * RCI-860: Second Incoming Call_ Cover and navigate back
 * https://test_it_domain/test-cases/RCI-860
 * Preconditions:
 * User has logged into 3rd party.
 * User has logged into RC CTI App
 * Web Phone is enabled and 'Browser' is selected in Settings > Calling > Make my calls with
 * User is on a call
 * Entry point(/s):
 *
  | Viewing Page |
  | Active call |
	| History |

 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../../../../lib/step';
import {
  MakeOutboundCall,
  MakeInboundCall,
  CheckIncomingCallPageExist,
  CheckIncomingCallPageNotExist,
  ClickBackButtonOfIncomingCallPanel,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import { CheckRoutePathIs, NavigateTo } from '../../../../../../steps/Router';

interface DataExample {
  viewingPage: string;
  pagePath: string;
}

@autorun(test)
@common
@it
@p2
@title('Second Incoming Call_ Cover and navigate back')
export class RCI860 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  @examples(`
    | viewingPage   | pagePath        |
    | 'Active call' | '/calls/active' |
    | 'History'     | '/history'      |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Second Incoming Call_ Cover and navigate back">
        <Given
          desc="User is on a call"
          action={({ pagePath }: DataExample) => [
            Login,
            <MakeOutboundCall />,
            <NavigateTo path={pagePath} />,
          ]}
        />
        <When desc="> Make an inbound call" action={<MakeInboundCall />} />
        <Then
          desc="The {viewingPage} is covered by the single incoming call page
										The upper-left corner of this page should contain a back button"
          action={CheckIncomingCallPageExist}
        />
        <When
          desc="> Click the back button"
          action={ClickBackButtonOfIncomingCallPanel}
        />
        <Then
          desc="It should be returned to the {viewingPage}"
          action={({ pagePath }: DataExample) => [
            <CheckIncomingCallPageNotExist />,
            <CheckRoutePathIs path={pagePath} />,
          ]}
        />
      </Scenario>
    );
  }
}
