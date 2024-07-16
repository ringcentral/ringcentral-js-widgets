/**
 * RCI-4048: Could not click to dial/SMS
 * https://test_it_domain/test-cases/RCI-4048
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * Entry point(/s):
 *
  | Click to Dial/SMS |Phone number |
  | On |1 |
	| On |123 |
	| On |098765 |
	| Off |+16501234567 |

 * > Go to Settings
 * > Make the status of Click to Dial/SMS to be {Click to Dial/SMS}
 */
import {
  p2,
  it,
  Given,
  autorun,
  examples,
  StepProp,
  Scenario,
  Step,
  title,
  common,
  When,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SwitchToggleTo } from '../../../../../steps/Meeting';
import { CreateMock, MockGetPhoneNumber } from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';

jest.mock(
  'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
  () => {
    const { HoverRangeMatch: BaseHoverRangeMatch } = jest.requireActual(
      'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
    );
    class HoverRangeMatch extends BaseHoverRangeMatch {
      // mock mouse is hover on rect
      isMatch() {
        return true;
      }
    }
    return {
      __esModule: true,
      ...jest.requireActual(
        'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
      ),
      HoverRangeMatch,
    };
  },
);

window.Range.prototype.getBoundingClientRect = jest.fn(
  () =>
    ({
      bottom: 196,
      height: 23,
      left: 139.1328125,
      right: 283.15625,
      top: 173,
      width: 144.0234375,
      x: 139.1328125,
      y: 173,
    } as DOMRect),
);

// not enabled c2d feature for common
@autorun(test.skip)
@it
@p2
@common
@title('Could not click to dial/SMS')
export class UnableClickToDial extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  HandleC2D: StepProp = () => ({});
  @examples(`
    | phoneNumber    | c2dEnable | c2dIsDisplayed |
    | '1'            | true      | false          |
    | '123'          | true      | false          |
    | '098765'       | true      | false          |
    | '+16501234567' | false     | false          |
  `)
  run() {
    const { CreateMock, Login, HandleC2D } = this;
    return (
      <Scenario
        desc="Could not click to dial/SMS"
        action={[CreateMock, MockGetPhoneNumber]}
      >
        <Given
          desc="User has logged into RC CTI App"
          action={[
            Login,
            NavigateToSettings,
            <SwitchToggleTo
              dataSign="switchClickToDialSMS"
              status={this.example.c2dEnable}
            />,
            WaitForRenderReady,
          ]}
        />
        <When
          desc="> Go to any website (not in block lists) with {Phone number}
                > Mouse hover{Phone number}
                > Wait for 5 seconds
                There should not have any icons display"
          action={HandleC2D}
        />
      </Scenario>
    );
  }
}
