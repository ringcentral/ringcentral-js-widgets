import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { RegionSettings } from '../../modules/RegionSettings';
import { mockModuleGenerator } from '../lib/mockModule';
import { regionSettingsMessages } from '../../modules/RegionSettings/regionSettingsMessages';

const getMockModule = () =>
  mockModuleGenerator({
    data: {
      countryCode: 'US',
      areaCode: '',
    },
  });

@autorun(test)
@title('RegionSettings Module "_setData" action')
export class SetData extends Step {
  @examples(`
    | options                                | countryCode     | areaCode  |
    | { countryCode: 'CA' }                  | 'CA'            | ''        |
    | { areaCode: '123' }                    | 'US'            | '123'     |
    | { countryCode: 'CA', areaCode: '123' } | 'CA'            | '123'     |
  `)
  run() {
    return (
      <Scenario desc="RegionSettings Module '_setData' action">
        <Given
          desc="Create an RegionSettings instance with default value"
          action={(_: any, context: any) => {
            const regionSettings = new RegionSettings({
              extensionInfo: {},
            } as any);
            expect(regionSettings.countryCode).toBe('US');
            expect(regionSettings.areaCode).toBe('');
            context.instance = regionSettings;
          }}
        />
        <When
          desc="Call RegionSettings '_setData' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._setData.call(
              context.mockModule,
              context.example.options,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.countryCode).toBe(
              context.example.countryCode,
            );
            expect(context.mockModule.data.areaCode).toBe(
              context.example.areaCode,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check RegionSettings alert (when app init)')
export class CheckRegionSettings extends Step {
  @examples(`
    | options                                | countryCode     | areaCode  | plan                               |
    | { countryCode: 'CA' }                  | 'CA'            | ''        |{ isoCode: 'CA', callingCode: '1' } |
  `)
  run() {
    return (
      <Scenario desc="Check RegionSettings when countryCode is empty ">
        <Given
          desc="Create an RegionSettings instance with default value"
          action={(_: any, context: any) => {
            class MockAlert {
              args: any = null;
              warning(...args: any[]) {
                this.args = args;
              }
            }
            const regionSettings = new RegionSettings({
              dialingPlan: { plans: context.example.plan },
              extensionInfo: { country: context.example.plan },
              alert: new MockAlert(),
              brand: {
                brandConfig: { allowRegionSettings: true },
              },
              appFeatures: {
                isEDPEnabled: false,
              },
            } as any);
            expect(regionSettings.countryCode).toBe('US');
            expect(regionSettings.areaCode).toBe('');
            expect(regionSettings.homeCountryId).toBe('1');
            expect(regionSettings.showRegionSettings).toBe(true);
            expect(regionSettings.availableCountries).toStrictEqual([
              context.example.plan,
            ]);
            context.instance = regionSettings;
          }}
        />
        <When
          desc="do check region settings action (when init)"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.checkRegionSettings();
          }}
        />
        <Then
          desc="check alert message "
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args[0].message).toBe(
              regionSettingsMessages.dialingPlansChanged,
            );
          }}
        />
      </Scenario>
    );
  }
}
