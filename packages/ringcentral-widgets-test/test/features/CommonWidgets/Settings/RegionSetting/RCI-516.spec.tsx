/**
 * RCI-516: Region setting for only one US/CA dialing plan
 * https://test_id_domain/test-cases/RCI-516
 * Preconditions:
 * Account 1:no DL on the company account
 * Account 2: only Headquarter (the same country as company account) DL on the company account (eg. RC US account only has US DL(s), RC CA account only has CA DL(s))
 * 3. The user has never logged in RC app
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
  p2,
  examples,
} from '@ringcentral-integration/test-utils';
import { screen, getNodeText } from '@testing-library/react';
import devicesBody from '@ringcentral-integration/commons/integration-test/mock/data/device.json';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import {
  format,
  formatTypes,
  isE164,
} from '@ringcentral-integration/phone-number';
import {
  NavigateToHistory,
  NavigateToSettings,
} from '../../../../steps/Navigate';
import { NavigateToRegionSettings } from '../../../../steps/Navigate/actions/NavigateToRegionSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CheckAreaCodeField, SetAreaCode } from '../../../../steps/Settings';
import { Context } from '../../../../interfaces';

@p2
@autorun(test.skip)
@title('Region setting for only one CA dialing plan')
export class RegionSettingForOnlyOneDialingPlan extends Step {
  Login?: StepFunction<
    {
      dialingPlansData?: any;
    },
    any
  >;
  appName: string;
  @examples([
    {
      mockParams: {
        dialingPlansData: {
          records: [
            {
              uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/39',
              id: '39',
              name: 'Canada',
              isoCode: 'CA',
              callingCode: '1',
            },
          ],
        },
        deviceData: { records: devicesBody.records },
      },
      country: '(+1) Canada',
      countryCode: 'CA',
    },
  ])
  run() {
    const { Login = CommonLogin, appName = brandConfig.appName as string } =
      this;
    return (
      <Scenario desc="Region setting for only one US/CA dialing plan.">
        <Given desc="Logged in Third-part APP and CTI" action={Login} />
        <When
          desc="Login CTI app with Account1/Account2, navigate to region setting page"
          action={[NavigateToSettings, NavigateToRegionSettings]}
        />
        <Then
          desc="Region displays as following detail:
                   Text:Please set your area code. This will be used for local dialing.
                   Dropdown list: Country (Only display the country of the company account)
                   Area code text field
                   [L10N]"
          action={async (_: any, context: Context) => {
            expect(
              screen.getByText(
                'Please set your area code. This will be used for local dialing.',
              ),
            ).toBeInTheDocument();
            expect(
              screen.getByText(context.example.country),
            ).toBeInTheDocument();
            return <CheckAreaCodeField exist />;
          }}
        />
        <When
          desc="Input Area Code(eg. 205), click the 'Save' button and go to Active call/History page"
          action={[<SetAreaCode areaCode="205" />, NavigateToHistory]}
        />
        <Then
          desc="The numbers are displayed in local format based on current Dial Plan(US/CA)
                   For Dynamics & Zendesk & Hubspot : the number are displayed as E164 format"
          action={async (_: any, context: Context) => {
            const phoneNumber = getNodeText(
              screen.queryAllByTestId('currentName')[0],
            );
            if (
              appName.includes('Dynamics') ||
              appName.includes('Zendesk') ||
              appName.includes('HubSpot')
            ) {
              // E164
              expect(isE164(phoneNumber)).toBe(true);
            } else {
              // local format
              expect(
                format({
                  phoneNumber,
                  countryCode: context.example.countryCode,
                  type: formatTypes.local,
                }),
              ).toBe(phoneNumber);
            }
          }}
        />
      </Scenario>
    );
  }
}

@p2
@autorun(test.skip)
@title('Region setting for only one US dialing plan')
export class RegionSettingForOnlyUSDialingPlan extends Step {
  Login?: StepFunction<
    {
      dialingPlansData?: any;
    },
    any
  >;
  appName: string;
  @examples([
    {
      mockParams: {
        dialingPlansData: {
          records: [
            {
              uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/1',
              id: '1',
              name: 'United States',
              isoCode: 'US',
              callingCode: '1',
            },
          ],
        },
        deviceData: { records: [] },
      },
      country: '(+1) United States',
      countryCode: 'US',
    },
  ])
  run() {
    const { Login = CommonLogin, appName = brandConfig.appName as string } =
      this;
    return (
      <Scenario desc="Region setting for only one US/CA dialing plan.">
        <Given desc="Logged in Third-part APP and CTI" action={Login} />
        <When
          desc="Login CTI app with Account1/Account2, navigate to region setting page"
          action={[NavigateToSettings, NavigateToRegionSettings]}
        />
        <Then
          desc="Region displays as following detail:
                   Text:Please set your area code. This will be used for local dialing.
                   Dropdown list: Country (Only display the country of the company account)
                   Area code text field
                   [L10N]"
          action={async (_: any, context: Context) => {
            expect(
              screen.getByText(
                'Please set your area code. This will be used for local dialing.',
              ),
            ).toBeInTheDocument();
            expect(
              screen.getByText(context.example.country),
            ).toBeInTheDocument();
            return <CheckAreaCodeField exist={false} />;
          }}
        />
      </Scenario>
    );
  }
}
