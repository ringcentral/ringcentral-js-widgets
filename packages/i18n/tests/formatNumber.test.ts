import I18n from '../i18n';

// Ref: https://wiki_domain/pages/viewpage.action?pageId=182683659
describe('I18n.formatNumber', () => {
  let i18n: I18n;

  beforeEach(() => {
    i18n = new I18n(async () => ({}));
  });

  const testCases = [
    {
      locale: 'de-DE',
      number: 123456789.11,
      expected: '123.456.789,11',
    },
    {
      locale: 'it-IT',
      number: 123456789.11,
      expected: '123.456.789,11',
    },
    {
      locale: 'en-AU',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'ja-JP',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'en-GB',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'ko-KR',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'en-US',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'es-419',
      number: 123456789.11,
      expected: '123 456 789.11',
    },
    {
      locale: 'nl-NL',
      number: 123456789.11,
      expected: '123.456.789,11',
    },
    {
      locale: 'es-ES',
      number: 123456789.11,
      expected: '123 456 789,11',
    },
    {
      locale: 'pt-BR',
      number: 123456789.11,
      expected: '123.456.789,11',
    },
    {
      locale: 'fi-FI',
      number: 123456789.11,
      expected: '123 456 789,11',
    },
    {
      locale: 'pt-PT',
      number: 123456789.11,
      expected: '123 456 789,11',
    },
    {
      locale: 'fr-CA',
      number: 123456789.11,
      expected: '123 456 789,11',
    },
    {
      locale: 'zh-CN',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'fr-FR',
      number: 123456789.11,
      expected: '123 456 789,11',
    },
    {
      locale: 'zh-HK',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
    {
      locale: 'zh-TW',
      number: 123456789.11,
      expected: '123,456,789.11',
    },
  ];

  testCases.forEach(({ locale, number, expected }) => {
    it(`should format number correctly for ${locale}`, async () => {
      await I18n.setLocale(locale);
      expect(i18n.formatNumber(number)).toBe(expected);
    });
  });

  it('should handle formatting options', async () => {
    await I18n.setLocale('en-US');
    expect(
      i18n.formatNumber(1234.56, { style: 'currency', currency: 'USD' }),
    ).toBe('$1,234.56');
  });

  it('should return original value when formatting fails', async () => {
    await I18n.setLocale('invalid-locale');
    expect(i18n.formatNumber(1234.56)).toBe('1,234.56');
  });

  it('should use fallback locale when current locale is PSEUDO_LOCALE', async () => {
    await I18n.setLocale('pseudo');
    expect(i18n.formatNumber(1234567.89)).toBe('1,234,567.89');
  });
});
