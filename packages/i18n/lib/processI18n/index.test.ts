import { processI18n } from './index';
import type { I18nStrings } from './type';

describe('process i18n test', () => {
  const givenData: {
    appName: I18nStrings;
  } = {
    appName: {
      __i18n__: true,
      translations: {
        'en-US': 'Test app name',
        'zh-CN': '测试 app',
      },
    },
  };

  it.each`
    locale     | expected
    ${'en-US'} | ${'Test app name'}
    ${'zh-CN'} | ${'测试 app'}
    ${'en-ZZ'} | ${'[[~!]Ţéšţ åþþ ñåɱé[~!]]'}
  `('get localized appName via locale: $locale', ({ locale, expected }) => {
    const actual = processI18n(givenData, locale);
    expect(actual.appName).toEqual(expected);
  });
});
