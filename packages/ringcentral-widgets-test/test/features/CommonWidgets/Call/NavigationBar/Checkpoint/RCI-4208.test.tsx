/**
 * RCI-4208: Call Status Monitor Bar_ single incoming call
 * https://test_id_domain/test-cases/RCI-4208
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Login Standalone
 * 2. Login floating window
 */

import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import { StepFunction } from '../../../../../lib/step';
import {
  CheckIncomingCallPageExist,
  MakeInboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock as CommonCreateMock,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@common
@title('Call Status Monitor Bar_ single incoming call')
export class RCI4208 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  run() {
    const { Login, CreateMock } = this;

    return (
      <Scenario desc="Check incoming call UI" action={[CreateMock, Login]}>
        <When
          desc="Make an incoming call and doesn't answer the call"
          action={[
            <MakeInboundCall phoneNumber="18882556247" />,
            TriggerActiveCallChanged,
          ]}
        />
        <Then
          desc="Below information should be displayed on the call status monitor bar:
										1 Incoming Call
										The 'View Calls' button
										[L10N]"
          action={[
            CheckIncomingCallPageExist,
            () => {
              expect(screen.getByText('View Calls')).toBeVisible();
              expect(screen.getByText('1 Incoming Call')).toBeVisible();
            },
          ]}
        />
      </Scenario>
    );
  }
}
