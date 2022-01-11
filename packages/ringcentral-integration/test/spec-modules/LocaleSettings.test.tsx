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

import { LocaleSettings } from '../../modules/LocaleSettingsV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    savedLocale: null as string,
  });

@autorun(test)
@title('LocaleSettings Module "_saveLocale" action')
export class SaveLocale extends Step {
  @examples(`
    | options  | savedLocale   |
    | 'en-US'  | 'en-US'       |
    | null     | null          |
  `)
  run() {
    return (
      <Scenario desc="LocaleSettings Module '_saveLocale' action">
        <Given
          desc="Create an LocaleSettings instance with default value"
          action={(_: any, context: any) => {
            const localeSettings = new LocaleSettings({} as any);
            expect(localeSettings.savedLocale).toBe(null);
            expect(localeSettings.supportedLocales).toEqual(['en-US']);
            context.instance = localeSettings;
          }}
        />
        <When
          desc="Call LocaleSettings '_saveLocale' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._saveLocale.call(
              context.mockModule,
              context.example.options,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.savedLocale).toBe(
              context.example.savedLocale,
            );
          }}
        />
      </Scenario>
    );
  }
}
