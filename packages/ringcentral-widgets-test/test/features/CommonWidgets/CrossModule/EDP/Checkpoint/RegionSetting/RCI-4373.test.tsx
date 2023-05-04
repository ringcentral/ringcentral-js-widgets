/**
 * RCI-4373: Open Area code for all country
 * https://test_id_domain/test-cases/RCI-4373
 * Preconditions:
 * CTI app is integrated
 * The user has logged in to the CTI app with RC brand
 * EDP is enabled
 * Entry point(/s):
 * Open CTI
 */

import {
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
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { MockDialingPlan } from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';
import { SetCountryCode } from '../../../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('Open Area code for all country')
export class AreaCodeInRegionPage extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | countryName      | selectedCountryCallingCode | isoCode |
    | 'United Kingdom' | '44'                       | 'GB'    |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Open Area code for all country">
        <When
          desc="> Go to the 'Settings' page > Go to the Region page
										>Select EU /AU or other countries on the Region setting page"
          action={({
            countryName,
            selectedCountryCallingCode,
            isoCode,
          }: any) => [
            CreateMock,
            <MockDialingPlan
              handler={(mockData) => {
                const plan = mockData.find(
                  (plan) => plan.id === selectedCountryCallingCode,
                );
                if (!plan) {
                  mockData.push({
                    uri: `https://platform.ringcentral.com/restapi/v1.0/dictionary/country/${selectedCountryCallingCode}`,
                    id: selectedCountryCallingCode,
                    name: countryName,
                    callingCode: selectedCountryCallingCode,
                    isoCode,
                  });
                }
                return mockData;
              }}
            />,
          ]}
        />
        <Given desc="> Login in the CTI" action={Login} />
        <Then
          desc="1. Navigate to region settings
                2. Area code field is displayed."
          action={[
            <NavigateTo path="/settings/region" />,
            SetCountryCode,
            () => {
              expect(
                screen.getByTestId('areaCodeInputField'),
              ).toBeInTheDocument();
            },
          ]}
        />
      </Scenario>
    );
  }
}
