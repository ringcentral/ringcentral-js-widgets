import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  GenericMeeting,
  genericMeetingStatus,
} from '../../modules/GenericMeetingV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    updatingStatus: genericMeetingStatus.idle as string,
  });

@autorun(test)
@title('GenericMeeting Module "setMeetingUpdatingStatus" action')
class setMeetingUpdatingStatus extends Step {
  run() {
    return (
      <Scenario desc="GenericMeeting Module 'setMeetingUpdatingStatus' action">
        <Given
          desc="Create an GenericMeeting instance with default value"
          action={(_: any, context: any) => {
            context.instance = new GenericMeeting({} as any);
            expect(context.instance.updatingStatus).toBe(
              genericMeetingStatus.idle,
            );
          }}
        />
        <When
          desc="Call 'setMeetingUpdatingStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setMeetingUpdatingStatus.call(
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
        <When
          desc="Call 'setIdleStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setMeetingUpdatingStatus.call(
              context.mockModule,
              genericMeetingStatus.idle,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.updatingStatus).toBe(
              genericMeetingStatus.idle,
            );
          }}
        />
      </Scenario>
    );
  }
}
