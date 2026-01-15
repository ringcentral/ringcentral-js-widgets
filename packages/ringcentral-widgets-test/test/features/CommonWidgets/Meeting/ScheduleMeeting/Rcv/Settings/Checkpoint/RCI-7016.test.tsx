/**
 * RCI-7016: Allow to start and stop recording
 * https://test_it_domain/test-cases/RCI-7016
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins
 * Login withRCVaccount
 * Entry point(/s):
 * Scheduler: In the 'Schedule Meeting' panel
 *
  | Allow to start and stop recording status |
  | Everyone |
	| Only host and moderators |

 */
import {
  p2,
  it,
  autorun,
  examples,
  common,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
  screen,
} from '@ringcentral-integration/test-utils';
import type { StepProp } from '@ringcentral-integration/test-utils';

import {
  CheckDropDownList,
  SelectOptionFromDropDown,
} from '../../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import { CheckDropdown } from '../../../../../../../steps/Dropdown';
import { CreateMock } from '../../../../../../../steps/Mock';
import { MockRcvPreference } from '../../../../../../../steps/Mock/MockRcvPreference';

// !!NOTE: skip test for common, currently only scheduler and outlook use v2 api, other project still use v1 api
@autorun(test.skip)
@it
@p2
@title('Allow to start and stop recording')
@common
export class RCI7016Step1 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    return (
      <Scenario
        desc="Allow to start and stop recording"
        action={[
          this.CreateMock,
          <MockRcvPreference
            handle={(mockData) => {
              // filter allow_anyone_record_meetings in preference to check default value in code
              mockData = mockData.filter(
                ({ id }) => id !== 'allow_anyone_record_meetings',
              );
              return mockData;
            }}
          />,
        ]}
      >
        <When desc="Go to entry points" action={this.Login} />
        <Then
          desc="The'Allow to start and stop recording' is displayed and the default value is 'Only host and moderators'
										[L10N]"
          action={[
            WaitForRenderReady,
            () => {
              const label = screen
                .getByTestId('allowToRecording')
                .querySelector('.labelText');
              expect(label).toHaveTextContent(
                'Allow to start and stop recording',
              );
            },
            <CheckDropdown
              dataSign="selectAllowToRecord"
              appName="Only host and moderators"
            />,
          ]}
        />
        <When desc="Expand the dropdown" />
        <Then
          desc="There are 2 options:
										Everyone
										Only host and moderators"
          action={
            <CheckDropDownList
              dataSign="selectAllowToRecord"
              options={[
                {
                  value: 'Everyone',
                },
                {
                  value: 'Only host and moderators',
                },
              ]}
            />
          }
        />
      </Scenario>
    );
  }
}

// !!NOTE: skip test for common, currently only scheduler and outlook use v2 api, other project still use v1 api
@autorun(test.skip)
@it
@p2
@title('Allow to start and stop recording')
@common
export class RCI7016Step2 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | status                     | isAllowAnyoneRecord | changeToStatus             |
    | 'Everyone'                 | true                | 'Only host and moderators' |
    | 'Only host and moderators' | false               | 'Everyone'                 |
  `)
  run() {
    return (
      <Scenario
        desc="Allow to start and stop recording"
        action={[
          this.CreateMock,
          <MockRcvPreference
            handle={(mockData) => {
              mockData = mockData.filter(
                ({ id }) => id !== 'allow_anyone_record_meetings',
              );
              mockData.push({
                id: 'allow_anyone_record_meetings',
                value: this.example.isAllowAnyoneRecord,
                readOnly: false,
                canModifyAccess: true,
              });
              return mockData;
            }}
          />,
        ]}
      >
        <When
          desc="Go to entry points"
          action={[this.Login, WaitForRenderReady]}
        />
        <Then
          desc="The selected value is {Allow to start and stop recording status}"
          action={
            <CheckDropdown
              dataSign="selectAllowToRecord"
              appName={this.example.status}
            />
          }
        />
        <When
          desc="Change the {Allow to start and stop recording status} value"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="selectAllowToRecord"
              targetOption={this.example.changeToStatus}
            />
          }
        />
        <Then
          desc="The value changed successfully"
          action={
            <CheckDropdown
              dataSign="selectAllowToRecord"
              appName={this.example.changeToStatus}
            />
          }
        />
      </Scenario>
    );
  }
}
