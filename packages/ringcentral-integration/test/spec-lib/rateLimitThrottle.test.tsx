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
import { sleep } from '@ringcentral-integration/utils';

import { rateLimitThrottle } from '../../lib/rateLimitThrottle';

@autorun(test)
@title('rateLimitThrottle::basics')
export class ThrottleBasics extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic rate limit throttle"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.pool = 3;
            context.poolWindow = 50;
            context.throttled = rateLimitThrottle({
              fn: context.fn,
              pool: context.pool,
              poolWindow: context.poolWindow,
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
          desc="fn should be invoked"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(1);
          }}
        />
        <When
          desc="throttled is invoked 2 more times"
          action={(_: any, context: any) => {
            context.throttled();
            context.throttled();
          }}
        />
        <Then
          desc="fn should be invoked 2 more times"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(3);
          }}
        />
        <When
          desc="throttled is invoked beyond the pool"
          action={(_: any, context: any) => {
            context.promise = context.throttled();
          }}
        />
        <Then
          desc="throttled is invoked only after the poolWindow is over"
          action={async (_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(3);
            await context.promise;
            expect(context.fn.mock.calls.length).toBe(4);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('rateLimitThrottle::queue')
export class ThrottleQueue extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic rate limit throttle"
          action={(_: any, context: any) => {
            context.fn = jest.fn();
            context.pool = 3;
            context.poolWindow = 50;
            context.throttled = rateLimitThrottle({
              fn: context.fn,
              pool: context.pool,
              poolWindow: context.poolWindow,
            });
          }}
        />
        <When
          desc="throttled is invoked 10 times"
          action={(_: any, context: any) => {
            context.startTime = Date.now();
            for (let i = 0; i < 10; i += 1) {
              context.throttled();
            }
          }}
        />
        <Then
          desc="only 3 should be run immediately"
          action={(_: any, context: any) => {
            expect(context.fn.mock.calls.length).toBe(3);
          }}
        />
        <And
          desc="3 more should be run after first poolWindow"
          action={async (_: any, context: any) => {
            await sleep(context.poolWindow);
            expect(context.fn.mock.calls.length).toBe(6);
          }}
        />
        <And
          desc="3 more should be run after second poolWindow"
          action={async (_: any, context: any) => {
            await sleep(context.poolWindow);
            expect(context.fn.mock.calls.length).toBe(9);
          }}
        />
        <And
          desc="1 more should be run after third poolWindow"
          action={async (_: any, context: any) => {
            await sleep(context.poolWindow);
            expect(context.fn.mock.calls.length).toBe(10);
          }}
        />
      </Scenario>
    );
  }
}
