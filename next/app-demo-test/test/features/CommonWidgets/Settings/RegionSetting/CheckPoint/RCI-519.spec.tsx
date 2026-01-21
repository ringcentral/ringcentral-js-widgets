import type dialingPlanBody from '@ringcentral-integration/commons/integration-test/mock/data/dialingPlan.json';

/**
 * RCI-519: Region - back button
 * https://test_it_domain/test-cases/RCI-519
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  Given,
  p3,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { ClickBackButton } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateMock, MockDialingPlan } from '../../../../../steps/Mock';
import {
  CheckRouterNavigation,
  NavigateToSettings,
} from '../../../../../steps/Navigate';
import { NavigateToRegionSettings } from '../../../../../steps/Navigate/actions/NavigateToRegionSettings';
import {
  CheckAreaCodeField,
  CheckCountryCodeField,
  SetAreaCode,
  SetCountryCode,
} from '../../../../../steps/Settings';

const dialingPlansData = {
  records: [
    {
      uri: 'https://api-rcapps-xmnuplabs_domain/restapi/v1.0/dictionary/country/75',
      id: '75',
      name: 'France',
      isoCode: 'FR',
      callingCode: '33',
    },
    {
      uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/44',
      id: '44',
      name: 'United Kingdom',
      isoCode: 'GB',
      callingCode: '44',
    },
  ],
};

@autorun(test.skip)
@common
@p3
@title('Region - back button')
export class RegionBackButton extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;

  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Region - click back button will not save settings">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockDialingPlan handler={() => dialingPlansData.records} />,
            Login,
          ]}
        />
        <When
          desc="Login CTI app, direct to Region setting page
										Select country
										Enter area code"
          action={[
            NavigateToSettings,
            NavigateToRegionSettings,
            // (+33) France
            <CheckCountryCodeField
              countryCallingCode="33"
              countryName="France"
            />,
            <SetCountryCode
              countryCallingCode="44"
              countryName="United Kingdom"
              clickSave={false}
            />,
            <SetAreaCode areaCode="666" clickSave={false} />,
          ]}
        />
        <Then desc="There are back and save button on the page" />
        <When desc="click back button" action={ClickBackButton} />
        <Then
          desc="User is navigated back to Settings tab"
          action={<CheckRouterNavigation toPage="Settings" />}
        />
        <When
          desc="Go to region setting page again"
          action={NavigateToRegionSettings}
        />
        <Then
          desc="Country and area code revert to previous values"
          action={[
            // (+33) France
            <CheckCountryCodeField
              countryCallingCode="33"
              countryName="France"
            />,
            <CheckAreaCodeField value="" />,
          ]}
        />
      </Scenario>
    );
  }
}
