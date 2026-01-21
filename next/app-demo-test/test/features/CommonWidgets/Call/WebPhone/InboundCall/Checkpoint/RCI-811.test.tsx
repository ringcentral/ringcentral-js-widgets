/**
 * RCI-811: Single Incoming Call_ Cover and navigate back
 * https://test_it_domain/test-cases/RCI-811
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import {
  autorun,
  common,
  examples,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckIncomingCallPageExist,
  CheckIncomingCallPageNotExist,
  ClickBackButtonOfIncomingCallPanel,
  MakeInboundCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import { CheckRoutePathIs, NavigateTo } from '../../../../../../steps/Router';

interface DataExample {
  currentPage: string;
}

@autorun(test)
@it
@p2
@common
@title('Single Incoming Call_ Cover and navigate back')
export class RCI811 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;

  @examples(`
    | currentPage |
    | '/messages'  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Single Incoming Call_ Cover and navigate back">
        <When
          desc="Make an inbound call"
          action={({ currentPage }: DataExample) => [
            Login,
            <NavigateTo path={currentPage} />,
            <MakeInboundCall />,
          ]}
        />
        <Then
          desc="The original app view is covered by the single incoming call page and the upper-left corner of this page should contain back button"
          action={CheckIncomingCallPageExist}
        />
        <When
          desc="Click the back button"
          action={ClickBackButtonOfIncomingCallPanel}
        />
        <Then
          desc="It should be returned to the original app page user was viewing"
          action={({ currentPage }: DataExample) => [
            <CheckIncomingCallPageNotExist />,
            <CheckRoutePathIs path={currentPage} />,
          ]}
        />
      </Scenario>
    );
  }
}
