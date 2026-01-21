import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';

import { getDisplayCallQueueName } from '../../src/app/services';

@autorun(test)
@ut
@title('getDisplayCallQueueName Test')
class getDisplayCallQueueNameTest extends Step {
  run() {
    return (
      <Scenario desc="getDisplayCallQueueName Test">
        <When
          desc="Test on 'getDisplayCallQueueName' helper"
          action={() => {
            expect(typeof getDisplayCallQueueName).toBe('function');
          }}
        />
        <Then
          desc="Test call 'getDisplayCallQueueName' helper with inbound"
          action={() => {
            const call = {
              direction: callDirection.inbound,
              to: { phoneNumber: '123' },
              from: { phoneNumber: '456' },
              toMatches: [],
              fromMatches: [],
              activityMatches: [],
            };
            expect(
              getDisplayCallQueueName({
                ...call,
                webphoneSession: { callQueueName: 'queueA' },
              } as any),
            ).toBe('queueA');

            expect(
              getDisplayCallQueueName({
                ...call,
                toMatches: [{ isCallQueueNumber: true, name: 'queueA' }],
              } as any),
            ).toBe('queueA');
          }}
        />
        <Then
          desc="Test call 'getDisplayCallQueueName' helper with outbound should return empty string"
          action={() => {
            const call = {
              direction: callDirection.outbound,
              to: { phoneNumber: '123' },
              from: { phoneNumber: '456' },
              toMatches: [],
              fromMatches: [],
              activityMatches: [],
            };
            expect(
              getDisplayCallQueueName({
                ...call,
                webphoneSession: { callQueueName: 'queueA' },
              } as any),
            ).toBe('');

            expect(
              getDisplayCallQueueName({
                ...call,
                toMatches: [{ isCallQueueNumber: true, name: 'queueA' }],
              } as any),
            ).toBe('');
          }}
        />
      </Scenario>
    );
  }
}
