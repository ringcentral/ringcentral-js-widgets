import {
  And,
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';
import type { StepFunction } from '../../../../../lib/step';
import { Login } from '../../../../../steps/Login';
import {
  MockDialingPlan,
  CreateMock as CommonCreateMock,
} from '../../../../../steps/Mock';
import { NavigateToRegionSettings } from '../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckAreaCodeField, SetAreaCode } from '../../../../../steps/Settings';

@autorun(test.skip)
@common
@it
@p2
@title('Show area code field when account has EDP permission')
export class CheckShowAreaCode extends Step {
  Login: StepFunction<any, any> | StepFunction<any, any>[] = [
    Login,
    () => <NavigateTo path="/settings" />,
  ];
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  @examples([
    {
      dialPlans: [generateDialPlanData('33', '33', 'France', 'FR')],
      areaCode: '1',
    },
    {
      dialPlans: [generateDialPlanData('44', '44', 'United Kingdom', 'GB')],
      areaCode: '2200',
    },
  ])
  run() {
    return (
      <Scenario
        desc="Check show area code when account has EDP permission"
        action={[
          this.CreateMock,
          ({ dialPlans }: any) => (
            <MockDialingPlan
              handler={() => {
                return dialPlans;
              }}
            />
          ),
        ]}
      >
        <Given
          desc="User is logged into 3rd party and CTI"
          action={this.Login}
        />
        <When
          desc="Direct to Settings -> Region setting"
          action={NavigateToRegionSettings}
        />
        <Then
          desc="Area code field should displayed"
          action={<CheckAreaCodeField exist />}
        />
        <And
          desc="Set any digit number area code, check save successfully"
          action={({ areaCode }: { areaCode: string }) => (
            <SetAreaCode areaCode={areaCode} />
          )}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@common
@p2
@title('Should not show area code field when account is US/PR/CA')
export class CheckNoAreaCode extends Step {
  Login: StepFunction<any, any> | StepFunction<any, any>[] = [
    Login,
    () => <NavigateTo path="/settings" />,
  ];
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  @examples([
    {
      dialPlans: [generateDialPlanData('1', '1', 'United States', 'US')],
    },
    {
      dialPlans: [generateDialPlanData('1', '179', 'Puerto Rico', 'PR')],
    },
    {
      dialPlans: [generateDialPlanData('39', '39', 'Canada', 'CA')],
    },
  ])
  run() {
    return (
      <Scenario
        desc="Should not show area code field when account is US/PR"
        action={[
          this.CreateMock,
          ({ dialPlans }: any) => (
            <MockDialingPlan
              handler={() => {
                return dialPlans;
              }}
            />
          ),
        ]}
      >
        <Given
          desc="User is logged into 3rd party and CTI"
          action={this.Login}
        />
        <When
          desc="Direct to Settings -> Region setting"
          action={NavigateToRegionSettings}
        />
        <Then
          desc="Area code field should not display"
          action={<CheckAreaCodeField exist={false} />}
        />
      </Scenario>
    );
  }
}
