import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
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
  CheckTimerCounts,
  UseFakeTimers,
  UseRealTimers,
} from '@ringcentral-integration/test-utils/steps';
import { sleep } from '@ringcentral-integration/utils';

interface SleepProps {
  ms?: number;
  state: boolean;
}

type SleepContext = {
  result: boolean;
  promise: ReturnType<typeof sleep>;
};

const CheckResult: StepFunction<SleepProps, SleepContext> = async (
  { state },
  context,
) => {
  expect(context.result).toBe(state);
};

const WaitForHalfTime: StepFunction<SleepProps, SleepContext> = async (
  { ms },
  context,
) => {
  jest.advanceTimersByTime(ms! / 2);
};

@autorun(test)
@title('Sleep work correctly')
class Sleep extends Step {
  @examples(`
    | ms   |
    | 1000 |
    | 2000 |
    | 3000 |
    | 4000 |
  `)
  run() {
    return (
      <Scenario desc="Sleep work correctly">
        <Given
          desc="Create a sleep for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            async ({ ms }: SleepProps, context: SleepContext) => {
              context.result = false;

              sleep(ms!).then(() => {
                context.result = true;
              });
            },
            <CheckTimerCounts count={1} />,
          ]}
        />
        <When desc="wait for half time" action={WaitForHalfTime} />
        <Then
          desc="result still be false"
          action={<CheckResult state={false} />}
        />
        <When desc="wait for half time" action={WaitForHalfTime} />
        <Then
          desc="result will be true"
          action={[
            <CheckTimerCounts count={0} />,
            <CheckResult state />,
            UseRealTimers,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Cancel sleep work correctly')
class CancelSleep extends Step {
  @examples(`
    | ms   |
    | 1000 |
    | 2000 |
    | 3000 |
    | 4000 |
  `)
  run() {
    let cancelErr: any;

    return (
      <Scenario desc="Cancel sleep work correctly">
        <Given
          desc="Create a sleep for ${ms}, when complete will get false result"
          action={[
            UseFakeTimers,
            ({ ms }: SleepProps, context: SleepContext) => {
              context.result = false;

              context.promise = sleep(ms!);

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
        <When desc="wait for half time" action={WaitForHalfTime} />
        <Then
          desc="result still be false"
          action={<CheckResult state={false} />}
        />
        <When
          desc="cancel timer"
          action={({ ms }: SleepProps, context: SleepContext) => {
            context.promise.cancel();
          }}
        />
        <Then
          desc="get cancel error"
          action={() => {
            expect(cancelErr).toStrictEqual(
              new Error('Async sleep has been cancelled'),
            );
          }}
        />
        <When desc="wait for half time" action={WaitForHalfTime} />
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
