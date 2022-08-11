/**
 * RCI-519: Region - back button
 * https://test_id_domain/test-cases/RCI-519
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import {
  autorun,
  Scenario,
  Step,
  title,
  When,
  Given,
  StepFunction,
  Then,
  examples,
  p3,
} from '@ringcentral-integration/test-utils';
import { screen, getNodeText, fireEvent, act } from '@testing-library/react';
import dialingPlanBody from '@ringcentral-integration/commons/integration-test/mock/data/dialingPlan.json';
import {
  CheckRouterNavigation,
  NavigateToSettings,
} from '../../../../steps/Navigate';
import { NavigateToRegionSettings } from '../../../../steps/Navigate/actions/NavigateToRegionSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { SelectCountryCode } from '../../../../steps/Settings/actions/SelectCountryCode';
import {
  CheckAreaCodeField,
  CheckCountryCodeField,
} from '../../../../steps/Settings';
import { ClickBackButton } from '../../../../steps/Common';

const dialingPlansData = {
  records: [
    {
      uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/44',
      id: '44',
      name: 'United Kingdom',
      isoCode: 'GB',
      callingCode: '44',
    },
    {
      uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/39',
      id: '39',
      name: 'Canada',
      isoCode: 'CA',
      callingCode: '1',
    },
  ],
};

@autorun(test.skip)
@p3
@title('Region - back button')
export class RegionBackButton extends Step {
  Login?: StepFunction<
    {
      mockParams: { dialingPlansData?: Partial<typeof dialingPlanBody> };
    },
    any
  >;
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="Region - click back button will not save settings">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={
            <Login
              mockParams={{
                dialingPlansData,
              }}
            />
          }
        />
        <When
          desc="Login CTI app, direct to Region setting page
										Select country
										Enter area code"
          action={[
            NavigateToSettings,
            NavigateToRegionSettings,
            <CheckCountryCodeField countryCode="(+1) Canada" />,
            <CheckAreaCodeField value="" />,
            <SelectCountryCode countryCode="(+44) United Kingdom" />,
            () => {
              console.log('11111', this.context.phone.extensionInfo.data);
              act(() => {
                fireEvent.change(screen.getByTestId('areaCodeInputField'), {
                  target: { value: '666' },
                });
              });

              expect(screen.getByTestId('areaCodeInputField')).toHaveValue(
                '666',
              );
            },
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
            <CheckCountryCodeField countryCode="(+1) Canada" />,
            <CheckAreaCodeField value="" />,
          ]}
        />
      </Scenario>
    );
  }
}
