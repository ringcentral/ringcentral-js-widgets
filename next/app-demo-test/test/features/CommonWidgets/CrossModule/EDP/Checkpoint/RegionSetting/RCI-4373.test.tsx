/**
 * RCI-4373: Open Area code for all country
 * https://test_it_domain/test-cases/RCI-4373
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

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CreateMock, MockDialingPlan } from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';
import { SetCountryCode } from '../../../../../../steps/Settings';

@autorun(test)
@it
@common
@p2
@title('Open Area code for all country')
export class AreaCodeInRegionPage extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;

  @examples(`
    | countryName      | countryCallingCode | isoCode |
    | 'United Kingdom' | '44'               | 'GB'    |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Open Area code for all country">
        <When
          desc="> Go to the 'Settings' page > Go to the Region page
										>Select EU /AU or other countries on the Region setting page"
          action={({ countryName, countryCallingCode, isoCode }: any) => [
            CreateMock,
            <MockDialingPlan
              handler={(mockData) => {
                const plan = mockData.find(
                  (plan) => plan.id === countryCallingCode,
                );
                if (!plan) {
                  mockData.push({
                    uri: `https://platform.ringcentral.com/restapi/v1.0/dictionary/country/${countryCallingCode}`,
                    id: countryCallingCode,
                    name: countryName,
                    callingCode: countryCallingCode,
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
