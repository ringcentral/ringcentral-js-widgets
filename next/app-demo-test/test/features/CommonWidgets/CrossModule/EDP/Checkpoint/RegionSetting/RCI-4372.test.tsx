/**
 * RCI-4372: Open region setting for all RC brand
 * https://test_it_domain/test-cases/RCI-4372
 * Preconditions:
 * CTI app is integrated
 * The user has logged in to the CTI app with RC brand
 * EDP is enabled
 * Entry point(/s):
 * Open CTI
 */
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { generateDialPlanData } from '../../../../../../__mock__/generateDialPlanData';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CreateMock, MockDialingPlan } from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

@autorun(test)
@it
@common
@p2
@title('Open region setting for all RC brand')
export class ShowRegionSettings extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;

  @examples([
    {
      dialPlans: [generateDialPlanData('33', '33', 'France', 'FR')],
    },
    {
      dialPlans: [
        generateDialPlanData('33', '33', 'France', 'FR'),
        generateDialPlanData('1', '1', 'United States', 'US'),
      ],
    },
  ])
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Open region setting for all RC brand"
        action={({ dialPlans }: any) => [
          CreateMock,
          <MockDialingPlan
            handler={() => {
              return dialPlans;
            }}
          />,
        ]}
      >
        <Given desc="login in the CTI" action={Login} />
        <When
          desc="> Go to 'Settings' page> Check Region setting on the page"
          action={<NavigateTo path="/settings" />}
        />
        <Then
          desc="There is region setting section."
          action={() => {
            expect(screen.getByText('Region')).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
