import I18n, { RUNTIME } from '@ringcentral-integration/i18n';

import i18n from './i18n';
import { sortDialInNumbers } from './videoHelper';

const originalGetTranslateLocale = RUNTIME.getTranslateLocale;

const tollFreeNumber = {
  country: {
    callingCode: '1',
    id: '1',
    isoCode: 'US',
    name: 'United States',
    uri: '/restapi/v1.0/dictionary/country/1',
  },
  location: '',
  phoneNumber: '+18003222464',
  premium: true,
} as Parameters<typeof sortDialInNumbers>[0][number];

describe('sortDialInNumbers', () => {
  beforeAll(async () => {
    await Promise.all([i18n._load('de-DE'), i18n._load('fr-FR')]);
  });

  beforeEach(() => {
    I18n.setGetTranslateLocale(() => 'en-US');
  });

  afterAll(() => {
    I18n.setGetTranslateLocale(originalGetTranslateLocale);
  });

  it('localizes toll-free numbers with the operation locale', () => {
    expect(sortDialInNumbers([tollFreeNumber], 'de-DE')).toEqual([
      expect.objectContaining({ location: 'Geb\u00fchrenfrei' }),
    ]);
    expect(sortDialInNumbers([tollFreeNumber], 'fr-FR')).toEqual([
      expect.objectContaining({ location: 'Num\u00e9ro gratuit' }),
    ]);
  });
});
