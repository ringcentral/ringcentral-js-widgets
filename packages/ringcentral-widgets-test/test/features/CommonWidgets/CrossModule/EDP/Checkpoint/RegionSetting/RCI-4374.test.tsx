/**
 * RCI-4374: Input area code on region page
 * https://test_id_domain/test-cases/RCI-4374
 * Preconditions:
 * CTI app is integrated
 * The user has logged in to the CTI app with RC brand
 * EDP is enabled
 * Entry point(/s):
 * Open CTI> Go to the 'Settings' page> Go to the 'Settings' page
 */

import {
  autorun,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { NavigateTo } from '../../../../../../steps/Router';
import { SetAreaCode } from '../../../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('Input area code on region page')
export class RegionPage extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | areaCode |
    | null     |
    | '2'      |
    | '480'    |
    | '2200'   |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Input area code on region page"
        action={[CreateMock, Login]}
      >
        <When
          desc="navigate to region settings"
          action={<NavigateTo path="/settings/region" />}
        />
        <Then
          desc="> Check the Area code field
										> Input null/1 digitals/3 digitals/4 digitals in the Area code field
										> Click 'save' button"
          action={async ({ areaCode }: any) => {
            return !areaCode ? null : <SetAreaCode areaCode={areaCode} />;
          }}
        />
      </Scenario>
    );
  }
}
