import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Locale } from '../../modules/Locale';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    locale: null as string,
    debugMode: false,
    setLocale: jest.fn(),
  });

@autorun(test)
@title('Set locale success and toggle debug Mode')
class CheckLocaleState extends Step {
  run() {
    return (
      <Scenario desc="Set locale success and toggle debug Mode">
        <Given
          desc="Locale should provide the default values"
          action={() => {
            const instance = new Locale({} as any);
            expect(instance.locale).toBe(null);
            expect(instance.debugMode).toBe(false);
            expect(instance.defaultLocale).toBe('en-US');
            expect(instance._detectBrowser).toBe(true);
            expect(instance._polling).toBe(false);
            expect(instance._pollingInterval).toBe(2000);
          }}
        />
        <When
          desc="Execute '_setLocaleSuccess' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.locale = 'zh';
            Locale.prototype._setLocaleSuccess.call(
              context.mockModule,
              context.locale,
            );
          }}
        />
        <Then
          desc="The mockModule 'locale' should be the expected value"
          action={(_: any, context: any) => {
            expect(context.mockModule.locale).toEqual(context.locale);
          }}
        />
        <When
          desc="Execute '_toggleDebugMode' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            expect(context.mockModule.debugMode).toBe(false);
            expect(context.mockModule.setLocale.mock.calls).toEqual([]);
            Locale.prototype._toggleDebugMode.call(context.mockModule);
          }}
        />
        <Then
          desc="The mockModule 'debugMode' should be the expected value"
          action={(_: any, context: any) => {
            expect(context.mockModule.debugMode).toBe(true);
            expect(context.mockModule.setLocale.mock.calls).toEqual([
              ['en-ZZ'],
            ]);
          }}
        />
      </Scenario>
    );
  }
}
