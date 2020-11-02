import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';
import { RegionSettings } from '../../modules/RegionSettingsV2';

const getMockModule = () => ({
  data: {
    countryCode: 'US',
    areaCode: '',
  },
  state: {},
  _dispatch: () => {},
  parentModule: {},
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
            const regionSettings = new RegionSettings({} as any);
            expect(regionSettings._initialValue.data.countryCode).toBe('US');
            expect(regionSettings._initialValue.data.areaCode).toBe('');
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
