/**
 * RCI-4461: Region setting for multiple dialing plans account
 * https://test_it_domain/test-cases/RCI-4461
 * Preconditions:
 * CTI app is integrated
 * EDP is enabled
 *
  | Account |Country for account |Multiple dialing plans |
  | 16137700009 |CA |CA/US/AU/PR/SG/UK... |

 * Entry point(/s):
 * Open CTI >User login to the CTI app with {Account}
 */

import {
  autorun,
  common,
  Given,
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
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockDialingPlan,
  MockExtensionInfo,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';
import { CheckCountryCodeField } from '../../../../../../steps/Settings';

@autorun(test)
@it
@p2
@common
@title('Region setting for multiple dialing plans account')
export class RCI4461 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;

  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Region setting for multiple dialing plans account"
        action={[
          CreateMock,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = 'FR';
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => [
              {
                uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1',
                id: '1',
                name: 'United States',
                isoCode: 'US',
                callingCode: '1',
              },
              {
                uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/39',
                id: '39',
                name: 'Canada',
                isoCode: 'CA',
                callingCode: '1',
              },
              {
                uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/75',
                id: '75',
                name: 'France',
                isoCode: 'FR',
                callingCode: '33',
              },
            ]}
          />,
        ]}
      >
        <Given desc="login in the CTI" action={Login} />
        <When
          desc="> Go to Entry
										> Navigateto the 'Settings' page> Check the Country filed on the Region page"
          action={<NavigateTo path="/settings/region" />}
        />
        <Then
          desc="The default value is {Country for account}"
          action={<CheckCountryCodeField countryCode="(+33) France" />}
        />
      </Scenario>
    );
  }
}
