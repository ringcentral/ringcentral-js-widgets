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
import { waitUntilTo } from '@ringcentral-integration/utils';

interface WaitUntilToProps {
  ms?: number;
  /**
   * what times to success
   */
  success?: number;
  timeout?: number;
  state: string | null;
  /**
   * is that wait exec success
   */
  waitCompleted?: boolean;
}

type WaitUntilToContext = {
  result: string | null;
  promise: ReturnType<typeof waitUntilTo>;
};

const CheckResult: StepFunction<WaitUntilToProps, WaitUntilToContext> = async (
  { state },
  context,
) => {
  expect(context.result).toBe(state);
};

@autorun(test)
@title('WaitUntilTo work correctly')
class WaitUntilTo extends Step {
  @examples(`
    | ms   | timeout | success | wait_completed |
    | 100  | 500     | 3       | true           |
    | 200  | 5000    | 6       | true           |
    | 3000 | 5000    | 3       | false          |
    | 500  | 5000    | -1      | false          |
  `)
  run() {
    let execCount = 0;
    let cancelErr: any;

    return (
      <Scenario desc="WaitUntilTo work correctly">
        <Given
          desc="Create a polling for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            async (
              { ms, success, timeout }: WaitUntilToProps,
              context: WaitUntilToContext,
            ) => {
              context.result = null;

              const fn = () => {
                execCount++;
                if (execCount === success) {
                  return 'exec completed';
                }

                throw new Error('not completed!!');
              };

              waitUntilTo(fn, { interval: ms, timeout })
                .then((result) => {
                  context.result = result;
                })
                .catch((err) => {
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
          action={<CheckTimerCounts count={2} />}
        />
        <When
          desc="wait for timeout"
          action={({ timeout, ms }: WaitUntilToProps) => {
            const times = Math.ceil(timeout! / ms!);
            return Array(times).fill(<AdvanceTimersByTime ms={ms!} />);
          }}
        />
        <Then desc="when success not be -1, execCount should be ${success}" />
        <And desc="when success not be -1, result should be 'exec completed'" />
        <And
          desc="when success not be -1, should not have any timer if success"
          action={({ waitCompleted, timeout }: WaitUntilToProps) => {
            if (!waitCompleted) {
              expect(cancelErr).toStrictEqual(new Error('not completed!!'));

              return [
                <CheckResult state={null} />,
                <CheckTimerCounts count={0} />,
                UseRealTimers,
              ];
            }

            return [
              <CheckResult state="exec completed" />,
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
@title('Cancel WaitUntilTo work correctly')
class CancelWaitUntilTo extends Step {
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
              { ms, timeout, success }: WaitUntilToProps,
              context: WaitUntilToContext,
            ) => {
              context.result = null;

              const fn = () => {
                execCount++;
                if (execCount === success) {
                  return 'exec completed';
                }

                throw new Error('not completed!!');
              };

              context.promise = waitUntilTo(fn, { interval: ms, timeout });

              context.promise
                .then((result) => {
                  context.result = result as string;
                })
                .catch((err) => {
                  cancelErr = err;
                });
            },
          ]}
        />
        <And
          desc="should have polling timer and timeout timer, if first time success to be zero"
          action={<CheckTimerCounts count={2} />}
        />
        <When
          desc="cancel timer"
          action={({ ms }: WaitUntilToProps, context: WaitUntilToContext) => {
            context.promise.cancel();
          }}
        />
        <Then
          desc="get cancel error"
          action={() => {
            expect(cancelErr).toStrictEqual(
              new Error('Async waitUntilTo has been cancelled'),
            );
          }}
        />
        <When
          desc="wait for a bigger time"
          action={({ ms }: WaitUntilToProps) => {
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
          desc="result still be null, and not have any timer"
          action={[
            <CheckTimerCounts count={0} />,
            <CheckResult state={null} />,
            UseRealTimers,
          ]}
        />
      </Scenario>
    );
  }
}
