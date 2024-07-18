import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import type { SleepPromise } from '@ringcentral-integration/utils';
import * as sleepModule from '@ringcentral-integration/utils/src/utils/sleep';

import type { ConcurrentExecuteOptions } from '../../lib/concurrentExecute';
import concurrentExecute from '../../lib/concurrentExecute';

type ConcurrentExecuteProps = {
  values: number[];
  concurrency: number;
  calledTimes: number;
  delay: number;
};

afterEach(() => {
  jest.restoreAllMocks();
});

@autorun(test)
@title('concurrentExecute')
export class ConcurrentExecute extends Step {
  @examples(`
    | values                | concurrency | calledTimes | delay     |
    | [1, 2, 3, 4, 5, 6, 7] | 2           | 4           | undefined |
    | [1, 2, 3, 4, 5, 6, 7] | 2           | 4           | 0         |
    | [1, 2, 3, 4, 5, 6, 7] | 2           | 4           | 100       |
    | [1, 2, 3, 4, 5, 6, 7] | 3           | 3           | 200       |
    | [1, 2, 3, 4, 5, 6]    | 2           | 3           | 300       |
    | [1, 2, 3, 4, 5, 6]    | 3           | 2           | 400       |
  `)
  run() {
    const promiseSpyOn = jest.spyOn(Promise, 'all');
    let delayCount = 0;

    const sleepSpyOn = jest
      .spyOn(sleepModule, 'sleep')
      .mockImplementation((delay: number) => {
        delayCount += delay;

        const promise: SleepPromise = Promise.resolve(true) as any;
        promise.cancel = () => {};

        return promise;
      });

    return (
      <Scenario desc="should work when have odd length of thunks">
        <When
          desc="should work when have odd length of thunks"
          action={async (
            { values, concurrency, delay }: ConcurrentExecuteProps,
            context: any,
          ) => {
            const thunks = values.map((v) => async () => Promise.resolve(v));

            const options: ConcurrentExecuteOptions = {
              delay,
            };

            context.result = await concurrentExecute(
              thunks,
              concurrency,
              options,
            );
          }}
        />
        <Then
          desc="result should be same as input value ${values} and called times ${calledTimes}"
          action={(
            { values, calledTimes, delay }: ConcurrentExecuteProps,
            context: any,
          ) => {
            expect(context.result).toEqual(values);
            expect(promiseSpyOn).toHaveBeenCalledTimes(calledTimes);

            if (delay === undefined) {
              expect(sleepSpyOn).toHaveBeenCalledTimes(0);
            } else {
              // -1 for first thunk not have delay
              expect(sleepSpyOn).toHaveBeenCalledTimes(calledTimes - 1);
              expect(delayCount).toBe((calledTimes - 1) * delay);
            }
          }}
        />
      </Scenario>
    );
  }
}
