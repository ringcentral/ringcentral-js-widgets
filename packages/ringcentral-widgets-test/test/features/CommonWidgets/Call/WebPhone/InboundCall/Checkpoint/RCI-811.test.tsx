/**
 * RCI-811: Single Incoming Call_ Cover and navigate back
 * https://test_id_domain/test-cases/RCI-811
 * Preconditions:
 *
 * Entry point(/s):
 *
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
} from '@ringcentral-integration/test-utils';
import { StepFunction } from '../../../../../../lib/step';
import {
  CheckIncomingCallPageExist,
  ClickBackButton,
  MakeInboundCall,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CheckRoutePathIs, NavigateTo } from '../../../../../../steps/Router';

@autorun(test.skip)
@it
@p2
@title('Single Incoming Call_ Cover and navigate back')
export class RCI811 extends Step {
  Login: StepFunction<any, any> = CommonLogin;

  @examples(`
    | currentPage |
    | 'messages'  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Single Incoming Call_ Cover and navigate back">
        <When
          desc="Make an inbound call"
          action={({ currentPage }: any) => [
            Login,
            <NavigateTo path={`/${currentPage}`} />,
            <MakeInboundCall />,
          ]}
        />
        <Then
          desc="The original app view is covered by the single incoming call page and the upper-left corner of this page should contain back button"
          action={CheckIncomingCallPageExist}
        />
        <When desc="Click the back button" action={ClickBackButton} />
        <Then
          desc="It should be returned to the original app page user was viewing"
          action={({ currentPage }: any) => (
            <CheckRoutePathIs path={`/${currentPage}`} />
          )}
        />
      </Scenario>
    );
  }
}
