import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';

import {
  GenericMeeting,
  genericMeetingStatus,
} from '../../modules/GenericMeetingV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    updatingStatus: null as string,
  });

@autorun(test)
@title('GenericMeeting Module "setUpdatingStatus" action')
class SetUpdatingStatus extends Step {
  run() {
    return (
      <Scenario desc="GenericMeeting Module 'setUpdatingStatus' action">
        <Given
          desc="Create an GenericMeeting instance with default value"
          action={(_: any, context: any) => {
            context.instance = new GenericMeeting({} as any);
            expect(context.instance.updatingStatus).toBeNull();
          }}
        />
        <When
          desc="Call 'setUpdatingStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setUpdatingStatus.call(
              context.mockModule,
              genericMeetingStatus.updating,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.updatingStatus).toBe(
              genericMeetingStatus.updating,
            );
          }}
        />
      </Scenario>
    );
  }
}
