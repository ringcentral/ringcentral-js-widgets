import {
  And,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  debounce,
  DEFAULT_THRESHOLD,
  promisedDebounce,
  throttle,
} from '../../lib/debounce-throttle';
import sleep from '../../lib/sleep';

@autorun(test)
@title('Debounce::basic')
export class DebounceBasic extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = DEFAULT_THRESHOLD;
            context.debounced = debounce({ fn: context.fn });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked after the default threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="invoking debounced before the threshold should delay fn being invoked"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::this')
export class DebounceThis extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
            context.obj = {};
          }}
        />
        <When
          desc="debounced is invoked with a context"
          action={(_: any, context: any) => {
            context.debounced.call(context.obj);
          }}
        />
        <Then
          desc="fn should be invoked with the context"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.instances[0]).toBe(context.obj);
          }}
        />
        <And
          desc="fn should be invoked with the last context if multiple invocations occur during threshold"
          action={async (_: any, context: any) => {
            const instances = [];
            context.fn.mockReset();
            for (let i = 0; i < 4; i += 1) {
              instances.push({});
              context.debounced.call(instances[i]);
              expect(context.fn.mock.calls.length).toBe(0);
              await sleep(50);
            }
            await sleep(context.threshold - 50 + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.instances[0]).toBe(instances[3]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::args')
export class DebounceArgs extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
            context.arg = {};
          }}
        />
        <When
          desc="debounced is invoked with a parameter"
          action={(_: any, context: any) => {
            context.debounced(context.arg);
          }}
        />
        <Then
          desc="fn should be invoked with the parameter"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.calls[0][0]).toBe(context.arg);
          }}
        />
        <And
          desc="fn should be invoked with the last parameters if multiple invocations occur during threshold"
          action={async (_: any, context: any) => {
            const parameters = [];
            context.fn.mockReset();
            for (let i = 0; i < 4; i += 1) {
              parameters.push({});
              context.debounced(parameters[i]);
              expect(context.fn.mock.calls.length).toBe(0);
              await sleep(50);
            }
            await sleep(context.threshold - 50 + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.calls[0][0]).toBe(parameters[3]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::return value')
export class DebounceReturnValue extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Debounced simple identify function"
          action={(_: any, context: any) => {
            context.fn = jest.fn((value) => value);
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <Then
          desc="debounced should return undefined before the first invocation of fn"
          action={(_: any, context: any) => {
            for (let i = 0; i < 5; i += 1) {
              expect(context.debounced(i)).toBeUndefined();
            }
          }}
        />
        <And
          desc="debounced should return the last invocation result after invocation occurred"
          action={async (_: any, context: any) => {
            const value = {};
            context.debounced(value);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.calls[0][0]).toBe(value);
            expect(context.debounced({})).toBe(value);
            context.debounced.cancel();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::leading')
export class DebounceLeading extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup with leading=true"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              leading: true,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked immediately"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="subsequent invocations during the threshold should be debounced normally"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(1);
            for (let i = 0; i < 4; i += 1) {
              context.debounced();
              expect(context.fn.mock.calls.length).toBe(1);
              await sleep(50);
            }
            await sleep(context.threshold - 50 + 30);
            expect(context.fn.mock.calls.length).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::leading without trailing')
export class DebounceLeadingWithoutTrailing extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup with leading=true, trailing = false"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              leading: true,
              trailing: false,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked immediately"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="subsequent invocations during the threshold should be suppressed"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(1);
            for (let i = 0; i < 4; i += 1) {
              context.debounced();
              expect(context.fn.mock.calls.length).toBe(1);
              await sleep(50);
            }
            await sleep(context.threshold - 50 + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="next invocation after the threshold should occur immediately"
          action={(_: any, context: any) => {
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::leading=false, trailing=false should behave as trailing=true')
export class DebounceNoLeadingNorTrailing extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup with leading=false and trailing = false"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked after the default threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="invoking debounced before the threshold should delay fn being invoked"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::maxThreshold')
export class DebounceMaxThreshold extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup with maxThreshold"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.maxThreshold = 200;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
              maxThreshold: context.maxThreshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked after the default threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
            context.debounced.cancel();
          }}
        />
        <And
          desc="fn can only be delayed for a time less than the max threshold"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50); // 50ms
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50); // 100ms
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(50); // 150ms
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(70); // 220ms
            expect(context.fn.mock.calls.length).toBe(1);
            context.debounced();
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::cancel')
export class DebounceCancel extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <And
          desc="cancel is invoked before the threshold"
          action={(_: any, context: any) => {
            context.debounced.cancel();
          }}
        />
        <Then
          desc="fn should not be invoked after the threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Debounce::flush')
export class DebounceFlush extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = debounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <And
          desc="flush is invoked before the threshold"
          action={(_: any, context: any) => {
            context.debounced.flush();
          }}
        />
        <Then
          desc="fn should be invoke immediately"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Throttle::basic')
export class ThrottleBasic extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.throttled = throttle({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="throttled is invoked"
          action={(_: any, context: any) => {
            context.throttled();
          }}
        />
        <Then
          desc="fn should be invoked immediately"
          action={(_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="invoking throttled before the threshold should queue a trailing invocation of fn"
          action={async (_: any, context: any) => {
            context.throttled();
            expect(context.fn.mock.calls.length).toBe(1);
            context.throttled();
            expect(context.fn.mock.calls.length).toBe(1);
            expect(context.fn.mock.calls.length).toBe(1);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(2);
          }}
        />
        <And
          desc="subsequent invocation of throttled should queue another trailing invocation of fn"
          action={async (_: any, context: any) => {
            context.throttled();
            expect(context.fn.mock.calls.length).toBe(2);
            context.throttled();
            expect(context.fn.mock.calls.length).toBe(2);
            expect(context.fn.mock.calls.length).toBe(2);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(3);
          }}
        />
        <And
          desc="next invocation of throttle should invoke fn immediately if the threshold is over"
          action={async (_: any, context: any) => {
            await sleep(context.threshold + 30);
            context.throttled();
            expect(context.fn.mock.calls.length).toBe(4);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('PromisedDebounce::basic')
export class PromisedDebounceBasic extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = DEFAULT_THRESHOLD;
            context.debounced = promisedDebounce({ fn: context.fn });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.debounced();
          }}
        />
        <Then
          desc="fn should be invoked after the default threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="invoking debounced before the threshold should delay fn being invoked"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('PromisedDebounce::promise')
export class PromisedDebouncePromise extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = DEFAULT_THRESHOLD;
            context.debounced = promisedDebounce({ fn: context.fn });
          }}
        />
        <When
          desc="debounced is invoked"
          action={(_: any, context: any) => {
            context.promise = context.debounced();
            expect(context.promise instanceof Promise).toBe(true);
          }}
        />
        <Then
          desc="fn should be invoked when promise is resolved"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await context.promise;
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="invoking debounced before the threshold should delay fn being invoked"
          action={async (_: any, context: any) => {
            context.fn.mockReset();
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(200);
            context.debounced();
            expect(context.fn.mock.calls.length).toBe(0);
            await context.debounced();
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('PromisedDebounce::cancel')
export class PromisedDebounceCancel extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = promisedDebounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked, and a function is bound to the promise"
          action={(_: any, context: any) => {
            context.promise = context.debounced();
            context.thenFn = jest.fn();
            context.promise.then(
              () => {},
              (...args: any) => context.thenFn(...args),
            );
          }}
        />
        <And
          desc="cancel is invoked before the threshold"
          action={(_: any, context: any) => {
            context.debounced.cancel();
          }}
        />
        <Then
          desc="promise should be rejected after the next immediate cycle"
          action={async (_: any, context: any) => {
            await sleep(10);
            expect(context.thenFn.mock.calls.length).toBe(1);
            expect(context.thenFn.mock.calls[0][0] instanceof Error).toBe(true);
            expect(context.thenFn.mock.calls[0][0].message).toBe('cancelled');
          }}
        />
        <And
          desc="fn should not be invoked after the threshold"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(0);
            await sleep(context.threshold + 30);
            expect(context.fn.mock.calls.length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('PromisedDebounce::flush')
export class PromisedDebounceFlush extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic debounce setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.threshold = 100;
            context.debounced = promisedDebounce({
              fn: context.fn,
              threshold: context.threshold,
            });
          }}
        />
        <When
          desc="debounced is invoked, and a function is bound to the promise"
          action={(_: any, context: any) => {
            context.promise = context.debounced();
            context.thenFn = jest.fn();
            context.promise.then((...args: any) => context.thenFn(...args));
          }}
        />
        <And
          desc="cancel is invoked before the threshold"
          action={(_: any, context: any) => {
            context.debounced.flush();
          }}
        />
        <Then
          desc="fn should be invoked immediately"
          action={(_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <And
          desc="the promise should be resolved in the next immediate cycle"
          action={async (_: any, context: any) => {
            await sleep(10);
            expect(context.thenFn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
