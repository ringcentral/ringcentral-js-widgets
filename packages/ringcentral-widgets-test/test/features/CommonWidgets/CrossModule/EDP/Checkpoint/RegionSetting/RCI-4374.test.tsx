/**
 * RCI-4374: Input area code on region page
 * https://test_it_domain/test-cases/RCI-4374
 * Preconditions:
 * CTI app is integrated
 * The user has logged in to the CTI app with RC brand
 * EDP is enabled
 * Entry point(/s):
 * Open CTI> Go to the 'Settings' page> Go to the 'Settings' page
 */
import {
  autorun,
  common,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { MockExtensionInfo } from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';
import { SetAreaCode } from '../../../../../../steps/Settings';

@autorun(test.skip)
@common
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
        action={[
          CreateMock,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry = {
                uri: 'https://api-rcapps-xmnuplabs_domain/restapi/v1.0/dictionary/country/75',
                id: '75',
                name: 'France',
                isoCode: 'FR',
                callingCode: '33',
              };
              return mockData;
            }}
          />,
          Login,
        ]}
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
