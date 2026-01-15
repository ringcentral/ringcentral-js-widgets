/**
 * RCI-7713: Update PMN meeting info when scheduled meet
 * https://test_it_domain/test-cases/RCI-7713
 * Preconditions:
 * Already installed and logged in RingCentral Office Add-In
 * Remember the PMI settings for current user, you can check on SW user level Tools > My Meetings > Personal Meeting Room.
 * User set the PMI meeting name in RCV: Helloworld
 * Entry point(/s):
 * Outlook Web Client
 * Windows Outlook
 * Mac Outlook
 * Outlook > Calendar > Event > RingCentral Scheduler
 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../lib/step';
import { CheckTextContent } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import {
  CheckRCVPageDisplay,
  ClickScheduleButton,
  TurnOnToggle,
} from '../../../../steps/Meeting';
import {
  CreateMock,
  MockPersonalMeetingSettings,
} from '../../../../steps/Mock';

@autorun(test.skip)
@it
@common
@p2
@title('Update PMN meeting info when scheduled meet')
export class RCI7713 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp = CreateMock;
  CheckMeetingAfterScheduler: StepProp | null = null;

  run() {
    return (
      <Scenario desc="Update PMN meeting info when scheduled meet">
        <When
          desc="Check the Settings page"
          action={[
            this.CreateMock,
            <MockPersonalMeetingSettings
              handle={(mockData) => {
                //@ts-expect-error
                mockData.pins.aliases = ['Helloworld'];
                return mockData;
              }}
            />,
            <MockPersonalMeetingSettings
              handle={(mockData) => {
                //@ts-expect-error
                mockData.pins.aliases = ['Helloworld'];
                return mockData;
              }}
            />,
            this.Login,
            <CheckRCVPageDisplay />,
          ]}
        />
        <Then
          desc="Show PMN info:
										Use Personal Meeting: Helloworld[L10N]"
          action={[
            <CheckTextContent
              dataSign="personalMeetingName"
              content="Helloworld"
            />,
          ]}
        />
        <When
          desc="Update the PMN to 'Byebye'
										Click 'Add Meeting'
										Check the meeting injection on the Calendar"
          action={[
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
            <ClickScheduleButton
              useV1={false}
              handleResponse={(meeting) => {
                // pmi id
                meeting.id =
                  'djI6MjkzOTc2MDA0LDI5Mzk3NjAwNCxyY3YsZVrDpcKHw7NUwosMw77Dp8Oswp4';
                //@ts-expect-error
                meeting.pins.aliases = ['Byebye'];
                meeting.type = 'PMI';
                meeting.discovery.web =
                  'https://xmrupxmn-rxe-1-vintlabs_domain/join/122341663';
                return meeting;
              }}
            />,
          ]}
        />
        <Then
          desc="1. Fetch the latest meeting info and update the settings to
					Use Personal Meeting: Byebye
					2. The location displays PMN instead of PMI: e.g  https://xmrupxmn-rxe-1-vintlabs_domain/join/Byebye
					3. The  meeting link show PMN instead of PMI and the Description has PMN info:
					RCV New has invited you to a RingCentral Video meeting.

					Please join using this link:

					https://xmrupxmn-rxe-1-vintlabs_domain/join/jByebye

					MeetinglD: 990651530

					Personal meeting name: Byebye

					One tap to join audio only from a smartphone:+13232382296,,990651530#United States (San Mateo, CA)

					Or dial:

					+13232382296 United States (San Mateo, CA)

					Access Code/MeetinglD: 990651530

					International numbers available: https://xmrupxmn-rxe-1.terenCe"
          action={[
            // Use Personal Meeting: Byebye
            <CheckTextContent
              dataSign="personalMeetingName"
              content="Byebye"
            />,
            // Check location and invitation content
            this.CheckMeetingAfterScheduler,
          ]}
        />
      </Scenario>
    );
  }
}
