import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { ModuleStatus } from '@ringcentral-integration/next-core/src/constant';
import { whenStateChange } from '@ringcentral-integration/next-core/test';

/**
 * RCI-5277: Outbound call should always pop call log section
 * https://test_it_domain/test-cases/RCI-5277
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  fireEvent,
  getNodeText,
  Given,
  it,
  p2,
  Scenario,
  screen,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';

import { MakeOutboundCall, MakeOtherDeviceCall } from '../../../steps/Call';
import { CheckCallLogTitle, CloseCallLogPage } from '../../../steps/CallLog';
import { Entry } from '../../../steps/Entry';
import { Login } from '../../../steps/Login';
import { NavigateToDialer } from '../../../steps/Navigate';

// skip in common because common do not have call log section
@autorun(test.skip)
@it
@p2
@title('Outbound call should always pop call log section')
@common
export class RCI5277 extends Step {
  Login?: StepFunction | StepFunction[] = [Entry, Login];

  run() {
    const { Login } = this;
    return (
      <Scenario desc="Outbound call should always pop call log section">
        <When desc="login to the CTI" action={Login} />
        <When
          desc="Direct to Phone page, check the dial page, fill the following {phone number} type in 'To' field, click the call button
                  Local number: 1234567
                  International number: +441234567890
                  Ext: 102
                  DID: 6501234567
                  Digital line number: 6501234567
                  Company number * Ext: +16501234567 * 102"
          action={[NavigateToDialer, MakeOutboundCall]}
        />
        <Then desc="Call log section will open" action={CheckCallLogTitle} />
        <When desc="Close the call log section" action={CloseCallLogPage} />
        <And desc="Close the call log section" action={MakeOtherDeviceCall} />
        <Then
          desc="The Call log section will not open"
          action={async () => {
            await whenStateChange(() => {
              expect(screen.queryByText('Create log')).not.toBeInTheDocument();
            });
          }}
        />
      </Scenario>
    );
  }
}
