import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { RateLimiter } from '../../modules/RateLimiterV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    timestamp: null as string,
  });

@autorun(test)
@title('RateLimiter Module "startThrottle" action')
class StartThrottle extends Step {
  run() {
    return (
      <Scenario desc="RateLimiter Module 'startThrottle' action">
        <Given
          desc="Create an RateLimiter instance with default value"
          action={(_: any, context: any) => {
            context.instance = new RateLimiter({} as any);
            expect(context.instance._throttleDuration).toBe(61 * 1000);
          }}
        />
        <When
          desc="Call 'startThrottle' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.now = Date.now();
            context.instance.startThrottle.call(
              context.mockModule,
              context.now,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.timestamp).toBe(context.now);
          }}
        />
      </Scenario>
    );
  }
}
@autorun(test)
@title('RateLimiter Module "stopThrottle" action')
class StopThrottle extends Step {
  run() {
    return (
      <Scenario desc="RateLimiter Module 'stopThrottle' action">
        <Given
          desc="Create an RateLimiter instance with default value"
          action={(_: any, context: any) => {
            context.instance = new RateLimiter({} as any);
            expect(context.instance.timestamp).toBeNull();
          }}
        />
        <When
          desc="Call 'stopThrottle' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            const now = Date.now();
            context.instance.startThrottle.call(context.mockModule, now);
            context.instance.stopThrottle.call(context.mockModule);
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.timestamp).toBeNull();
          }}
        />
      </Scenario>
    );
  }
}
