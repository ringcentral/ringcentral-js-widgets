/**
 * RCI-3908: Restrict users from logging different brands
 * https://test_id_domain/test-cases/RCI-3908
 * Preconditions:
 * User login to 3rd party
 * User install CTI
 * Brand and Brand name as:
 *
  | Brand |Brand name |
  |  Avaya | Avaya Cloud Office |
	| Telus |TELUS Business Connect |
	| AT&T |AT&T Office@Hand |

 * Entry point(/s):
 *
  | Project |Partner brand |
  | Scheduler |Avaya/AT&T |
	| Salesforce  |BT/Telus/AT&T |
	| Outlook Plugin |BT/Telus/AT&T |

 * Salesforce
 * BT/Telus/AT&T
 * User tries to log in {Partner brandBrand} for {Project}
 */

import {
  p1,
  it,
  autorun,
  StepProp,
  Scenario,
  Step,
  Then,
  And,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';

import { CheckRouterNavigation } from '../../../../steps/Navigate';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CheckModalValue,
  ClickConfirmInModal,
  CheckModalExist,
} from '../../../../steps/Modal';

// common server mock as rc brand so it doesn't has this scenario
@autorun(test.skip)
@it
@p1
@common
@title('Restrict users from logging different brands')
export class RCI3908 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Restrict users from logging different brands">
        <When
          desc="Login to CTI with other brand account in {Partner brand} app"
          action={Login}
        />
        <Then
          desc="Block users from logging in to partner brand apps
                Prompt error message on the login page:
                Title:Please try again
                Text:The information you entered doesn't match our records.Use your {Brand name}account to sign in.
                Title:Please try again
                Text:The information you entered doesn't match our records.Use your {Brand name}account to sign in.
                [L10N][Update Release_22.3.10]"
          action={async ({ brandName }: any) => {
            await waitForRenderReady();
            return (
              <CheckModalValue
                confirmButtonText="Close"
                title="Please try again"
                childrenContent={`The information you entered doesn't match our records. Use your ${brandName} account to sign in.`}
              />
            );
          }}
        />
        <And
          desc="Back to Sign In page"
          action={<CheckRouterNavigation toPage="Login" />}
        />
        <When desc="Click the Close button" action={ClickConfirmInModal} />
        <Then
          desc="The dialog disappears"
          action={<CheckModalExist isExist={false} />}
        />
      </Scenario>
    );
  }
}
