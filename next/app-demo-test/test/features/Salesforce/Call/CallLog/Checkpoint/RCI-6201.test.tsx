/**
 * RCI-6201: Check the delay auto-update time info changes(min->sec)
 * https://test_it_domain/test-cases/RCI-6201
 * Preconditions:
 * 1. User is logged into Salesforce.
 * 2. User is logged in RC CTI App
 * 3. SF admin UI 'Delay auto call logging' checked, the delay time is {Delay time}
 * Entry point(/s):
 * 1. Make an inbound/outbound call > answer the call,End this call
 *
  | No. |Delay time(Minutes) |Wait time(Seconds) |Display time |
  | 1 |5 |5 |5 minutes |
	| 2 |5 |60 |4 minutes |
	| 3 |5 |260 |1 minute |
	| 4 |5 |241 |59 seconds |
	| 5 |5 |299 |1 second |
	| 6 |5 |300 |0 seconds |
	| 7 |5 |301 |N/A |

 */
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  renderComponent,
} from '@ringcentral-integration/test-utils';
import { CountdownTimer } from '@ringcentral-integration/widgets/components/CountdownTimer';
import { screen, act } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.useFakeTimers();
});

@autorun(test)
@it
@p2
@title('Updates countdown info correctly after ${waitTimeSeconds} secondes')
class RCI6201 extends Step {
  @examples(`
    | No  | delayTimeMinutes | waitTimeSeconds | displayTime  |
    | '1' | 5                | 5               | '5 minutes'  |
    | '2' | 5                | 60              | '4 minutes'  |
    | '3' | 5                | 240             | '1 minute'   |
    | '4' | 5                | 241             | '59 seconds' |
    | '5' | 5                | 299             | '1 second'   |
    | '6' | 5                | 300             | '0 seconds'  |
  `)
  run() {
    return (
      <Scenario desc="Updates countdown info correctly after ${waitTimeSeconds} secondes">
        <When
          desc="For No.1-No.6
										After the call log syncs successfully;
										Wait for {Wait time} seconds, check the delay auto-update info"
          action={() => {
            renderComponent(CountdownTimer, {
              creationTime: Date.now(),
              duration: 5,
              variant: 'plain',
              currentLocale: 'en-US',
            });
          }}
        />
        <Then
          desc="Display info 'Auto-save log in {Display time}' on the Call log page;
										Display info 'Auto-save log in {Display time}' on the History page"
          action={() => {
            // Advance time by {waitTimeSeconds} seconds
            act(() => {
              jest.advanceTimersByTime(this.example.waitTimeSeconds * 1000);
            });

            expect(
              screen.getByText(
                `Auto-save log in ${this.example.displayTime}...`,
              ),
            ).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p2
@title('Hide countdown info ${waitTimeSeconds} secondes')
class RCI6201No7 extends Step {
  @examples(`
    | No  | delayTimeMinutes | waitTimeSeconds | displayTime |
    | '7' | 5                | 301             | 'N/A'       |
  `)
  run() {
    return (
      <Scenario desc="Hide countdown info ${waitTimeSeconds} secondes">
        <When
          desc="For No.7
          After the call log syncs successfully;
          Wait for {Wait time} seconds, check the delay auto-update info"
          action={() => {
            renderComponent(CountdownTimer, {
              creationTime: Date.now(),
              duration: 5,
              variant: 'plain',
              currentLocale: 'en-US',
            });
          }}
        />
        <Then
          desc="There is no delay info on the Call log page;
          There is no delay info on the History page;
          Save call log automatically"
          action={() => {
            // Advance time by {waitTimeSeconds} seconds
            act(() => {
              jest.advanceTimersByTime(this.example.waitTimeSeconds * 1000);
            });

            expect(screen.queryByText(/Auto-save log in/)).toBeNull();
          }}
        />
      </Scenario>
    );
  }
}
