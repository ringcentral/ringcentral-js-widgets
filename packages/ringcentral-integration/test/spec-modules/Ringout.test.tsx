import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Ringout, ringoutStatus } from '../../modules/RingoutV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    ringoutStatus: ringoutStatus.idle,
  });

@autorun(test)
@title('Ringout Module "setRingoutStatus" action')
export class SetRingoutStatus extends Step {
  run() {
    return (
      <Scenario desc="Ringout Module 'setRingoutStatus' action">
        <Given
          desc="Create an Ringout instance with default value"
          action={(_: any, context: any) => {
            const ringout = new Ringout({} as any);
            expect(ringout.ringoutStatus).toBe(ringoutStatus.idle);
            context.instance = ringout;
          }}
        />
        <When
          desc="Call Ringout 'setRingoutStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setRingoutStatus.call(
              context.mockModule,
              ringoutStatus.connecting,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.ringoutStatus).toBe(
              ringoutStatus.connecting,
            );
          }}
        />
      </Scenario>
    );
  }
}
