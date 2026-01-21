import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const SetupBrandConfig: StepFunction = (_, { app }) => {
  const brand = app.container.got(Brand)!;
  brand.setDynamicConfig({
    ...brand.brandConfig,
    callWithJupiter: {
      link: 'http://localhost/',
      protocol: 'mock://',
      // TODO: find a better way to generic this I18nStrings object
      name: {
        __i18n__: true,
        translations: {
          'en-US': 'en-US App Name',
          'fr-FR': 'fr-FR App Name',
          fr: 'fr-FR App Name',
          en: 'en-US App Name',
        },
      },
    },
  });
};
