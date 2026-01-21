/* Check warm transfer call log & control page from All Calls page
https://test_it_domain/test-cases/RCI-5431
*/
import { StepFunction } from '@ringcentral-integration/crius';
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  Context,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import {
  CheckAllCallsPageInWarmTransfer,
  CheckInfoSectionInWarmTransfer,
  ClickAnyCallInAllCallsPage,
  ClickBackButton,
  ClickUnholdInAllCallsPage,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call log & control page from All Calls page')
export class RCI5431 extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  run() {
    const { EntryWithLoggedIn } = this;

    return (
      <Scenario desc="Check warm transfer call log control page from All Calls page">
        <Given desc="User login to Salesforce cti" action={EntryWithLoggedIn} />
        <When
          desc="User make a outbound or inbound call"
          action={() => (
            <MakeCall
              phoneNumber="18882556247"
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And
          desc="init a warm transfer call to 110"
          action={<InitAWarmTransferCall phoneNumber="110" />}
        />
        <And
          desc="User go to All Calls page"
          action={[
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            ClickBackButton,
          ]}
        />
        <Then
          desc="User should be see that Transfer call show under 'Current Call' section with 'Transfer' flag show on the right of name field and Original call show under 'Calls on Hold' section with 'Caller' flag show on the right of name field"
          action={
            <CheckAllCallsPageInWarmTransfer
              currentCallName="110 (Transfer)"
              holdCallName="+18882556247 (Caller)"
            />
          }
        />
        <When
          desc="User click on any call"
          action={ClickAnyCallInAllCallsPage}
        />
        <Then
          desc="User should be see that open the warm transfer call log control page and Original call show on Sub session info section and Transfer call show on Active session info section"
          action={
            <CheckInfoSectionInWarmTransfer
              logName="110"
              subLogName="+18882556247"
            />
          }
        />
        <And desc="User go to All Calls page" action={ClickBackButton} />
        <When
          desc="User Click 'Unhold' button for original call "
          action={ClickUnholdInAllCallsPage}
        />
        <Then
          desc="User should be see that Original call show under 'Current Call' section with 'Caller' flag show on the right of name field and Transfer call show under 'Calls on Hold' section with 'Transfer' flag show on the right of name field"
          action={
            <CheckAllCallsPageInWarmTransfer
              currentCallName="+18882556247 (Caller)"
              holdCallName="110 (Transfer)"
            />
          }
        />
        <When
          desc="User click on any call"
          action={ClickAnyCallInAllCallsPage}
        />
        <Then
          desc="User should be see that open the warm transfer call log  control page and Original call show on Active session info section and Transfer call show on Sub session info section"
          action={
            <CheckInfoSectionInWarmTransfer
              logName="+18882556247"
              subLogName="110"
            />
          }
        />
      </Scenario>
    );
  }
}
