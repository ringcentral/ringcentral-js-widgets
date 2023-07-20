import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import {
  AdvanceTimersByTime,
  CheckTimerCounts,
  UseFakeTimers,
  UseRealTimers,
} from '@ringcentral-integration/test-utils/steps';
import { waitUntil } from '@ringcentral-integration/utils';

interface WaitUntilProps {
  ms?: number;
  /**
   * what times to success
   */
  success?: number;
  timeout?: number;
  state: boolean;
  /**
   * is that wait exec success
   */
  waitCompleted?: boolean;
  initTimerCount?: number;
}

type WaitUntilContext = {
  result: boolean;
  promise: ReturnType<typeof waitUntil>;
};

const CheckResult: StepFunction<WaitUntilProps, WaitUntilContext> = async (
  { state },
  context,
) => {
  expect(context.result).toBe(state);
};

@autorun(test)
@title('WaitUntil work correctly')
class WaitUntil extends Step {
  @examples(`
    | ms    | timeout | success | wait_completed | init_timer_count |
    | 100   | 500     | 3       | true           | 2                |
    | 200   | 5000    | 6       | true           | 2                |
    | 20000 | 5000    | 1       | true           | 0                |
    | 20000 | 5000    | 2       | false          | 2                |
    | 500   | 5000    | -1      | false          | 2                |
  `)
  run() {
    let execCount = 0;
    let cancelErr: any;

    return (
      <Scenario desc="WaitUntil work correctly">
        <Given
          desc="Create a polling for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            async (
              { ms, success, timeout }: WaitUntilProps,
              context: WaitUntilContext,
            ) => {
              context.result = false;

              const fn = () => {
                execCount++;
                return execCount === success;
              };

              waitUntil(fn, { interval: ms, timeout })
                .then(() => {
                  context.result = true;
                })
                .catch((err) => {
                  context.result = false;
                  cancelErr = err;
                });
            },
          ]}
        />
        <Then
          desc="callback should be executed immediately"
          action={() => {
            expect(execCount).toBe(1);
          }}
        />
        <And
          desc="should have polling timer and timeout timer"
          action={({ initTimerCount }: WaitUntilProps) => (
            <CheckTimerCounts count={initTimerCount!} />
          )}
        />
        <When
          desc="wait for timeout"
          action={({ timeout, ms }: WaitUntilProps) => {
            const times = Math.ceil(timeout! / ms!);
            return Array(times).fill(<AdvanceTimersByTime ms={ms!} />);
          }}
        />
        <Then desc="when success not be -1, execCount should be ${success}" />
        <And desc="when success not be -1, result should be true" />
        <And
          desc="when success not be -1, should not have any timer if success"
          action={({ waitCompleted, timeout }: WaitUntilProps) => {
            if (!waitCompleted) {
              expect(cancelErr).toStrictEqual(
                new Error(`${timeout} ms timeout error`),
              );

              return [
                <CheckResult state={false} />,
                <CheckTimerCounts count={0} />,
                UseRealTimers,
              ];
            }

            return [
              <CheckResult state />,
              <CheckTimerCounts count={0} />,
              UseRealTimers,
            ];
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Cancel polling work correctly')
class CancelWaitUntil extends Step {
  @examples(`
    | ms    | timeout | success |
    | 100   | 500     | 3       |
    | 200   | 5000    | 6       |
    | 20000 | 5000    | 2       |
    | 500   | 5000    | -1      |
  `)
  run() {
    let cancelErr: any;
    let execCount = 0;

    return (
      <Scenario desc="Cancel polling work correctly">
        <Given
          desc="Create a polling for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            (
              { ms, timeout, success }: WaitUntilProps,
              context: WaitUntilContext,
            ) => {
              context.result = false;

              const fn = () => {
                execCount++;
                return execCount === success;
              };

              context.promise = waitUntil(fn, { interval: ms, timeout });

              context.promise
                .then(() => {
                  context.result = true;
                })
                .catch((err) => {
                  context.result = false;
                  cancelErr = err;
                });
            },
          ]}
        />
        <When
          desc="cancel timer"
          action={({ ms }: WaitUntilProps, context: WaitUntilContext) => {
            context.promise.cancel();
          }}
        />
        <Then
          desc="get cancel error"
          action={() => {
            expect(cancelErr).toStrictEqual(
              new Error('Async waitUntil has been cancelled'),
            );
          }}
        />
        <When
          desc="wait for a bigger time"
          action={({ ms }: WaitUntilProps) => {
            const times = 200;
            return Array(times).fill(
              <>
                <AdvanceTimersByTime ms={100} />
                <AdvanceTimersByTime ms={ms!} />
              </>,
            );
          }}
        />
        <Then
          desc="result still be false, and not have any timer"
          action={[
            <CheckTimerCounts count={0} />,
            <CheckResult state={false} />,
            UseRealTimers,
          ]}
        />
      </Scenario>
    );
  }
}
