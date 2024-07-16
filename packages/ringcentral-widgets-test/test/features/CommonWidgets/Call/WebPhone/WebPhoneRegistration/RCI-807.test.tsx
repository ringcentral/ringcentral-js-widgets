/**
 * RCI-807: Web phone registration limitations - no permission
 * https://test_it_domain/test-cases/RCI-807
 * Preconditions:
 * Account doesn't have WebPhone Permission
 * Entry point(/s):
 * Login CTI APP > Settings > Calling
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

import type { StepFunction } from '../../../../../lib/step';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
  MockFeaturePermission,
} from '../../../../../steps/Mock';
import { CheckRoutePathIs, NavigateTo } from '../../../../../steps/Router';
import {
  ExpandCallingSettingDropdown,
  CheckCallWithOption,
} from '../../../../../steps/Settings';

@autorun(test)
@common
@it
@p2
@title('Web phone registration limitations - no permission')
export class RCI807 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Web phone registration limitations - no permission"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          <MockFeaturePermission featureId={'WebPhone'} available={false} />,
          Login,
        ]}
      >
        <When
          desc="Click 'Make my calls with'"
          action={() => [
            <NavigateTo path="/settings/calling" />,
            <CheckRoutePathIs path="/settings/calling" />,
            <ExpandCallingSettingDropdown />,
          ]}
        />
        <Then
          desc="There is no 'Browser' in dropdown list, Web Phone can't be turned on.[L10N]"
          action={<CheckCallWithOption optionText={'Browser'} exists={false} />}
        />
      </Scenario>
    );
  }
}
