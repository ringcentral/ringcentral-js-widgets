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
import { StepFunction } from '../../../../lib/step';
import {
  MockDialingPlan,
  CreateMock as CommonCreateMock,
} from '../../../../steps/Mock';
import { generateDialPlanData } from '../../../../__mock__/generateDialPlanData';
import { NavigateToRegionSettings } from '../../../../steps/Navigate';
import { CheckAreaCodeField, SetAreaCode } from '../../../../steps/Settings';
import { Login } from '../../../../steps/Login';
import { NavigateTo } from '../../../../steps/Router';

@autorun(test)
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
      dialPlans: [generateDialPlanData('39', '39', 'Canada', 'CA')],
      areaCode: '605',
    },
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
@p2
@title('Should not show area code field when account is US/PR')
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
