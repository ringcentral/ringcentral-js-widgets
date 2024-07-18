/**
 * RCI-509: Check call history section without calls
 * https://test_it_domain/test-cases/RCI-509
 * Preconditions:
 * 1. RC CTI app was installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User has logged in to RC CTI
 * 4. User has no call history in past week
 * 5. User has no active call
 * 6. Dynamics app is based on CIF
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  p2,
  title,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { GenerateCallHistory } from '../../../../steps/CallHistory';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  MockCallLogSync,
  MockCallLogs,
} from '../../../../steps/Mock';
import { NavigateToHistory } from '../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Check call history section without calls')
export class CheckCallHistorySectionWithoutCalls extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  appName = 'common';
  run() {
    const { Login = CommonLogin, appName, CreateMock } = this;
    return (
      <Scenario desc="Check call history section without calls">
        <Given
          desc="Create mock"
          action={() => {
            const callLogData = GenerateCallHistory({ length: 0 });
            return [
              CreateMock,
              <MockCallLogSync mockResponse={callLogData} />,
              <MockCallLogs
                handler={(mockData) => {
                  return {
                    ...mockData,
                    ...callLogData,
                  };
                }}
              />,
            ];
          }}
        />
        <And desc="Login CTI" action={Login} />
        <When
          desc="Click calls icon, check the page"
          action={<NavigateToHistory />}
        />

        <Then
          desc="There is no active and history calls
										'No results found.' displays note: for SfB, no history calls"
          action={() => {
            if (appName.includes('Skype for Business')) {
              expect(screen.getByText('No history calls.')).toBeInTheDocument();
            }
            expect(screen.getByText('No results found.')).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
