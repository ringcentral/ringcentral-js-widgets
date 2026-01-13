/**
 * RCI-7721: Remove the PMN meeting info
 * https://test_it_domain/test-cases/RCI-7721
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
import type { StepFunction } from '@ringcentral-integration/test-utils';

import { TurnOffToggle, TurnOnToggle } from '../../../../steps/Common';
import {
  ClickRemoveButton,
  ClickScheduleButton,
} from '../../../../steps/Meeting';
import { CheckRCVPageDisplay } from '../../../../steps/Meeting/Check/CheckRCVPage';
import {
  MockPersonalMeetingSettings,
  MockRcvGetMeetingInfo,
} from '../../../../steps/Mock';
import { ClickConfirmInModal } from '../../../../steps/Modal';
import { CheckRemoveMeetingModal } from '../../../../steps/Modal/CheckRemoveMeetingModal';

@autorun(test.skip)
@it
@p2
@common
@title('Remove the PMN meeting info')
export class RCI7721 extends Step {
  LoginEntry: StepFunction<any, any> | null = null;
  CreateMock: StepFunction<any, any> | null = null;
  spyOnMeetingAction: StepFunction<any, any> | null = null;
  CheckRemoveAction: StepFunction<any, any> | null = null;
  CheckUpdateAction: StepFunction<any, any> | null = null;

  @examples([
    {
      // Click 'Add Meeting', and click the Remove meeting
      action: () => (
        <>
          <ClickRemoveButton />
          <CheckRemoveMeetingModal />
          <ClickConfirmInModal />
        </>
      ),
      check: 'CheckRemoveAction',
    },
    {
      // Click 'Add Meeting', and click the Update meeting
      action: () => (
        <>
          <TurnOffToggle dataSign="usePersonalMeetingId" />
          <ClickScheduleButton useV1={false} />
        </>
      ),
      check: 'CheckUpdateAction',
    },
  ])
  run() {
    return (
      <Scenario desc="Remove the PMN meeting info">
        <Given
          desc="Create mock"
          action={[
            this.CreateMock,
            <MockRcvGetMeetingInfo
              shortId="asd.f-_x"
              handle={(mockData) => {
                return {
                  ...mockData,
                  type: 'PMI',
                };
              }}
            />,
            <MockPersonalMeetingSettings
              handle={(mockData) => {
                // @ts-ignore
                mockData.pins.aliases = ['asd.f-_x'];
                return mockData;
              }}
            />,
          ]}
        />
        <Given desc="Login" action={this.LoginEntry} />
        <When
          desc="Click 'Add Meeting', and {action}"
          action={[
            CheckRCVPageDisplay,
            // Click 'Add Meeting'
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
            <ClickScheduleButton
              useV1={false}
              handleResponse={(meeting) => {
                // pmi id
                meeting.id =
                  'djI6MjkzOTc2MDA0LDI5Mzk3NjAwNCxyY3YsZVrDpcKHw7NUwosMw77Dp8Oswp4';
                //@ts-expect-error
                meeting.pins.aliases = ['asd.f-_x'];
                meeting.type = 'PMI';
                meeting.discovery.web =
                  'https://xmrupxmn-rxe-1-vintlabs_domain/join/122341663';
                return meeting;
              }}
            />,
            // Action
            this.spyOnMeetingAction,
            this.example.action,
          ]}
        />
        <Then
          desc="
            Entry1: The PMN meeting info should be removed
              The PMN URL in the location
              The PMN description
            Entry2: The PMN meeting info should be updated
              The PMN URL in the location
              The PMN description
              The PMN meeting info should be updated
              The PMN URL in the location
              The PMN description"
          action={
            this.example.check === 'CheckRemoveAction'
              ? this.CheckRemoveAction
              : this.CheckUpdateAction
          }
        />
      </Scenario>
    );
  }
}
