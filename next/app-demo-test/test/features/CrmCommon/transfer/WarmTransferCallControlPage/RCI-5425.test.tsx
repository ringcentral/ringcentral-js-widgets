/**
 * RCI-5425: Check status change after hold/unhold call
 * https://test_it_domain/test-cases/RCI-5425
 * Preconditions:
 * User is logged into Salesforce
 * User is logged in RC CTI App
 * User has succeeded initiate a warm transfer call in CTI (two calls: call1, call2)Note:Sub session infosection- topActive session infosection- bottom
 * Note:
 * Sub session infosection- top
 * Active session infosection- bottom
 * Entry point(/s):
 *
  | Entry |Call info |Action |Call info after action |
  | 1 |Sub session info section section: Call1(hold)Active session info section: Call2(hold) |Unhold Call1 on other devices/tab |Sub session info section section: Call2(hold)Active session info section: Call1(active) |
	| 2 |Sub session info section section: Call1(hold)Active session info section: Call2(hold) |Unhold Call2 on other device or current tab |Sub session info section section: Call1(hold)Active session info section: Call2(active) |
	| 3 |Sub session info section section: Call1(hold)Active session info section: Call2(active) |Unhold Call1 on other devices/tab |Sub session info section section: Call2(hold)Active session info section: Call1(active) |
	| 4 |Sub session info section section: Call1(hold)Active session info section: Call2(active) |Hold Call2 on other tab or current tab |Sub session info section section: Call1(hold)Active session info section: Call2(hold) |

 */
import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  And,
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
  screen,
  queryByTestId,
  common,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import { InitAWarmTransferCall } from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check status change after hold/unhold call')
export class RCI5425 extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  phoneNumber1 = '+16572343431';
  phoneNumber2 = '+16572343432';
  call1SessionId: string = '';
  call2SessionId: string = '';
  @examples(`
    | entry | call1Status | call2Status | action         | subSession    | activeSession   |
    | 1     | 'hold'      | 'hold'      | 'unhold Call1' | 'Call2(hold)' | 'Call1(active)' |
    | 2     | 'hold'      | 'hold'      | 'unhold Call2' | 'Call1(hold)' | 'Call2(active)' |
    | 3     | 'hold'      | 'connected' | 'unhold Call1' | 'Call2(hold)' | 'Call1(active)' |
    | 4     | 'hold'      | 'connected' | 'hold Call2'   | 'Call1(hold)' | 'Call2(hold)'   |
  `)
  run() {
    const { EntryWithLoggedIn } = this;

    return (
      <Scenario desc="Check status change after hold/unhold call">
        <Given
          desc="User login to third party cti"
          action={EntryWithLoggedIn}
        />

        <When
          desc="Direct to entry points: User has succeeded initiate a warm transfer call in CTI (two calls: call1, call2)"
          action={[
            <MakeCall
              direction={'Outbound'}
              status={this.example.call1Status}
              phoneNumber={this.phoneNumber1}
            />,
            <InitAWarmTransferCall phoneNumber={this.phoneNumber2} />,
            (async (_, { app, rcMock }) => {
              const activeCallControl = app.container.get(ActiveCallControl);
              this.call1SessionId =
                activeCallControl.data.sessions[0].telephonySessionId;
              const session = activeCallControl.data.sessions.find(
                (a) => a.telephonySessionId !== this.call1SessionId,
              )!;
              this.call2SessionId = session.telephonySessionId;
              if (this.example.call2Status === 'hold') {
                await rcMock.holdCall(this.call2SessionId);
              }
            }) as StepFunction,
          ]}
        />
        <Then
          desc="After {Action}, {Call info after action} should show on call log page"
          action={[
            (async (_, { app, rcMock }) => {
              if (this.example.action === 'unhold Call1') {
                await rcMock.unholdCall(this.call1SessionId);
              } else if (this.example.action === 'unhold Call2') {
                await rcMock.unholdCall(this.call2SessionId);
              } else if (this.example.action === 'hold Call2') {
                await rcMock.holdCall(this.call2SessionId);
              }

              if (this.example.subSession === 'Call2(hold)') {
                expect(
                  queryByTestId(
                    screen.getByTestId('subLogSection'),
                    'shinyBar-onHold',
                  ),
                ).toBeInTheDocument();
                expect(screen.getByTestId('subLogName')).toHaveTextContent(
                  this.phoneNumber2,
                );
              } else if (this.example.subSession === 'Call1(hold)') {
                expect(
                  queryByTestId(
                    screen.getByTestId('subLogSection'),
                    'shinyBar-onHold',
                  ),
                ).toBeInTheDocument();
                expect(screen.getByTestId('subLogName')).toHaveTextContent(
                  this.phoneNumber1,
                );
              }

              if (this.example.activeSession === 'Call1(active)') {
                expect(
                  queryByTestId(
                    screen.getByTestId('logSection'),
                    'shinyBar-active',
                  ),
                ).toBeInTheDocument();
                expect(screen.getByTestId('logName')).toHaveTextContent(
                  this.phoneNumber1,
                );
              } else if (this.example.activeSession === 'Call2(active)') {
                expect(
                  queryByTestId(
                    screen.getByTestId('logSection'),
                    'shinyBar-active',
                  ),
                ).toBeInTheDocument();
                expect(screen.getByTestId('logName')).toHaveTextContent(
                  this.phoneNumber2,
                );
              } else if (this.example.activeSession === 'Call2(hold)') {
                expect(
                  queryByTestId(
                    screen.getByTestId('logSection'),
                    'shinyBar-onHold',
                  ),
                ).toBeInTheDocument();
                expect(screen.getByTestId('logName')).toHaveTextContent(
                  this.phoneNumber2,
                );
              }
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
