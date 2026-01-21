/**
 * RCI-7258: Call queue call status display in Call History
 * https://test_it_domain/test-cases/RCI-7258
 * Preconditions:
 * The user A and user B are the queue members of a call queue
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 *
  | Call behavior |Call status icon |Call status copy |
  | User A ignore the call&User B answer callOr user A don't do anything&User B answer call |Answered Inbound call |On user A side:Display 'Answered by User B'On user B side:Not display the copy. |
	| No one answer call, caller end the callOronly 1 queue member and the called is not answered |Missed Inbound call |On user A and user B side,Not display the copy. |

 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
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
  screen,
  When,
  StepFunction,
  WaitForRenderReady,
  within,
  common,
} from '@ringcentral-integration/test-utils';

import { CallButtonBehavior, MakeCall } from '../../../../steps/Call';
import { ClickBackButton } from '../../../../steps/Common';
import { MockCallLogSync, generateCallLogData } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

const callingPhoneNumber = '17204084363';

@autorun(test.skip)
@common
@it
@p2
@title('Call queue call status display in Call History')
export class RCI7258Base extends Step {
  CreateMock?: StepFunction<any, any>;
  CustomLogin?: StepFunction<any, any>;
  CustomMakeCallFunction?: StepFunction<any, any>;
  CustomExpectations?: StepFunction<any, any>;
  CustomDisconnectCall?: StepFunction<any, any>;

  @examples([
    {
      callResult: 'Answered',
    },
    {
      callResult: 'Missed',
    },
    {
      callResult: 'Answered Elsewhere',
      delegationType: 'QueueForwarding',
      delegate: {
        id: '123',
        name: 'User B',
      },
    },
  ])
  run() {
    const {
      CreateMock,
      CustomLogin,
      CustomMakeCallFunction,
      CustomDisconnectCall,
    } = this;
    return (
      <Scenario desc="Call queue call status display in Call History">
        <When
          desc="User A and user B both receive the incoming call queue call.
                And Do the {Call behavior}
                Go to call history page"
          action={[CreateMock, CustomLogin]}
        />
        <When
          desc="User A and user B both receive the incoming call queue call.
                And Do the {Call behavior}
                Go to call history page"
          action={[
            <MockCallLogSync
              isDefaultInit={false}
              repeat={1}
              mockResponse={generateCallLogData({
                fromNumber: callingPhoneNumber,
                result: this.example.callResult,
                duration: 10,
                delegationType: this.example.delegationType,
                delegate: this.example.delegate,
              })}
            />,

            CustomMakeCallFunction,

            (async (_, context) => {
              const webphone = context.app.container.got(Webphone)!;
              const sessions = webphone.sessions;
              await webphone.updateSessionsState([
                {
                  ...sessions[0],
                  callQueueName: 'Tech Support',
                },
              ]);
            }) as StepFunction,

            () => {
              const toVoicemailBtn = screen.queryByTestId('toVoicemail');
              expect(toVoicemailBtn).toBe(null);
            },
            <CallButtonBehavior callButtonBehaviorType={'ignore'} />,
            CustomDisconnectCall,
            WaitForRenderReady,
            <ClickBackButton />,
            <NavigateTo path="/history" />,
            <WaitForRenderReady />,
          ]}
        />

        <Then
          desc="The {Call status icon}, {Hover tooltip}, {Call status copy} as expected.
										[L10N]"
          action={[
            this.CustomExpectations ? this.CustomExpectations : () => {},
            async () => {
              // TO-DO: check later why call item with ringing also shows up along with ignored call

              const targetCall = screen
                .getAllByTestId('calls_item_wrapper')
                .find(
                  (it) =>
                    it.innerHTML.includes('0:10') &&
                    it.innerHTML.includes(callingPhoneNumber),
                );

              expect(targetCall).toBeInTheDocument();

              const answeredBy = within(targetCall!).queryByTestId(
                'answered-by',
              );
              const callIcon = within(targetCall!).queryByTestId('callIcon');

              expect(callIcon).not.toBe(null);

              if (this.example.callResult === 'Answered Elsewhere') {
                expect(answeredBy).toHaveTextContent('Answered by User B');

                expect(callIcon!.title).toEqual('Inbound');
              } else {
                expect(answeredBy).toBe(null);
                expect(callIcon!.title).toEqual(
                  this.example.callResult === 'Answered'
                    ? 'Inbound'
                    : this.example.callResult,
                );
              }
            },
          ]}
        />
      </Scenario>
    );
  }
}
