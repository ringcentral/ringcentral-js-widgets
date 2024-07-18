/**
 * RCI-4035: Request for RCV meeting invitation
 * https://test_it_domain/test-cases/RCI-4035
 * Preconditions:
 * The user has logged in to RC CTI with settings below
 *
  | Account |Brand |Region |Meeting provider |User name |Account env. |
  | 18662105184 |RC |US |RCV |lexie.lin |XMN-UP |

 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * RC CTI > Schedule Video Meeting page > Set the the 'Require Password':pwd123 > Schedule a normal meeting
 * Entry point(/s):
 * Entry point(/s):
 * RC CTI > Schedule Video Meeting page > Set the the 'Require Password':pwd123 > Schedule a normal meeting
 *
  | Parameter |Value |
  | hostName |lexie.lin |
	| meetingId |016889154 9 random numbers |
	| isSIPAvailable(boolean: is support room connector) |false |
	| participantCode(same with meetingId) |016889154 |
	| entryPoint |https://v.ringcentral.com |
	| isE2eeEnabled |false |
	| dialInPassword |793123 |
	| numbers |+16504191505 |
	| unformattedNumber |+16504191505 |
	| country |United States |
	| default |ture |
	| location |San Mateo, CA |
	| maskedPassword |45cb41b32dcfb917ccd8614f1536d6da |
	| password |pwd123 |
	| Brand_Id |1210 |
	| brandName |RingCentral |
	| Extension_FormattingLocaleCode |en-US |
	| Extension_LanguageLocaleCode |en-US |

 */
import type { StepFunction } from '../../../../../../../lib/step';
import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '../../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckInvitation,
  CheckRCVPageDisplay,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p1
@title('Request for RCV meeting invitation')
export class RCI4035 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckInvitation: StepFunction<any, any> = CheckInvitation;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Request for RCV meeting invitation">
        <When desc="Go to Entry Check the {Parameter}" action={Login} />
        <And desc="Wait for ready" action={CheckRCVPageDisplay} />
        <Then desc="Check request params" action={this.CheckInvitation} />
      </Scenario>
    );
  }
}
