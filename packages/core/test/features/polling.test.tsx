import {
  And,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import {
  AdvanceTimersByTime,
  CheckTimerCounts,
  ClearAllTimers,
  UseFakeTimers,
  UseRealTimers,
} from '@ringcentral-integration/test-utils/steps';
import { polling, sleep } from '@ringcentral-integration/utils';

interface PollingProps {
  ms?: number;
  /**
   * what times to success
   */
  success?: number;
  state: boolean;
}

type PollingContext = {
  result: boolean;
  promise: ReturnType<typeof polling>;
};

const CheckResult: StepFunction<PollingProps, PollingContext> = async (
  { state },
  context,
) => {
  expect(context.result).toBe(state);
};

@autorun(test)
@title('Polling work correctly')
class Polling extends Step {
  @examples(`
    | ms    | success |
    | 100   | 3       |
    | 20000 | 6       |
    | 500   | -1      |
  `)
  run() {
    let execCount = 0;
    return (
      <Scenario desc="Polling work correctly">
        <Given
          desc="Create a polling for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            async ({ ms, success }: PollingProps, context: PollingContext) => {
              context.result = false;

              const fn = async () => {
                execCount++;
                await sleep(100);
                return execCount === success;
              };

              polling(fn, ms).then(() => {
                context.result = true;
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
          desc="should only have fn sleep timer"
          action={<CheckTimerCounts count={1} />}
        />
        <When desc="wait 100 time" action={<AdvanceTimersByTime ms={100} />} />
        <Then
          desc="fn sleep be done, and polling timer will be trigger"
          action={<CheckTimerCounts count={1} />}
        />
        <And
          desc="execCount still be 1"
          action={() => {
            expect(execCount).toBe(1);
          }}
        />
        <When desc="wait ${ms} time" action={AdvanceTimersByTime} />
        <Then
          desc="callback should be call again"
          action={() => {
            expect(execCount).toBe(2);
          }}
        />
        <And
          desc="fn sleep be done, and polling timer will be trigger"
          action={<CheckTimerCounts count={1} />}
        />
        <When
          desc="wait for a bigger time"
          action={({ ms }: PollingProps) => {
            const times = 20;
            return Array(times).fill(
              <>
                <AdvanceTimersByTime ms={100} />
                <AdvanceTimersByTime ms={ms!} />
              </>,
            );
          }}
        />
        <Then desc="when success not be -1, execCount should be ${success}" />
        <And desc="when success not be -1, result should be true" />
        <And
          desc="when success not be -1, should not have any timer if success"
          action={({ success }: PollingProps) => {
            if (success === -1) {
              expect(execCount).toBe(22); // 2 + 20

              return [
                <CheckResult state={false} />,
                <CheckTimerCounts count={1} />,
                ClearAllTimers,
                <CheckTimerCounts count={0} />,
                UseRealTimers,
              ];
            }

            expect(execCount).toBe(success);

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
class CancelPolling extends Step {
  @examples(`
    | ms    | success |
    | 100   | 3       |
    | 20000 | 6       |
    | 500   | -1      |
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
            ({ ms, success }: PollingProps, context: PollingContext) => {
              context.result = false;

              const fn = async () => {
                execCount++;
                await sleep(100);
                return execCount === success;
              };

              context.promise = polling(fn, ms);

              context.promise
                .then(() => {
                  context.result = true;
                })
                .catch((err) => {
                  context.result = false;
                  cancelErr = err;
                });
            },
            <CheckTimerCounts count={1} />,
          ]}
        />
        <And
          desc="should only have fn sleep timer"
          action={<CheckTimerCounts count={1} />}
        />
        <When desc="wait 100 time" action={<AdvanceTimersByTime ms={100} />} />
        <Then
          desc="fn sleep be done, and polling timer will be trigger"
          action={<CheckTimerCounts count={1} />}
        />
        <When
          desc="cancel timer"
          action={({ ms }: PollingProps, context: PollingContext) => {
            context.promise.cancel();
          }}
        />
        <Then
          desc="get cancel error"
          action={() => {
            expect(cancelErr).toStrictEqual(
              new Error('Async Polling has been cancelled'),
            );
          }}
        />
        <When
          desc="wait for a bigger time"
          action={({ ms }: PollingProps) => {
            const times = 20;
            return Array(times).fill(
              <>
                <AdvanceTimersByTime ms={100} />
                <AdvanceTimersByTime ms={ms!} />
              </>,
            );
          }}
        />
        <Then
          desc="result still be false"
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
