import I18n, { RUNTIME } from '../i18n';

describe('I18n', () => {
  describe('_getString', () => {
    let i18n: I18n;
    const originalDefaultLocale = RUNTIME.defaultLocale;
    const originalFallbackLocale = RUNTIME.fallbackLocale;

    const setUp = () => {
      // Set up cache manually to test lookup order
      i18n._cache = {
        'fr-CA': {
          testKey1: 'Value from fr-CA',
          testKey3: 'Value from defaultLocale (fr-CA)',
        },
        fr: {
          testKey2: 'Value from fr',
        },
        'en-US': {
          // defaultLocale
          testKey3: 'Value from defaultLocale (en-US)',
          emptyValue: '',
          nullKey: null as any,
        },
        'en-GB': {
          // fallbackLocale
          testKey4: 'Value from fallbackLocale (en-GB)',
        },
      };
    };

    beforeEach(() => {
      // Create instance with dummy loader
      i18n = new I18n(async () => ({}));

      // Reset RUNTIME locales to known state
      RUNTIME.defaultLocale = 'en-US';
      RUNTIME.fallbackLocale = 'en-GB';
    });

    afterEach(() => {
      RUNTIME.defaultLocale = originalDefaultLocale;
      RUNTIME.fallbackLocale = originalFallbackLocale;
    });

    it('should return value from exact locale match', () => {
      setUp();
      const result = i18n._getString('testKey1', 'fr-CA');
      expect(result).toBe('Value from fr-CA');
    });

    it('should fall back to language match if exact locale match fails', () => {
      // testKey2 is in 'fr' but not 'fr-CA'
      setUp();
      const result = i18n._getString('testKey2', 'fr-CA');
      expect(result).toBe('Value from fr');
    });

    it('should fall back to defaultLocale if language match fails', () => {
      // testKey3 is in 'en-US' (default) but not 'fr-CA' or 'fr'
      setUp();
      const result = i18n._getString('testKey3', 'fr-CA');
      expect(result).toBe('Value from defaultLocale (fr-CA)');
    });

    it('should fall back to fallbackLocale if defaultLocale match fails', () => {
      // testKey4 is in 'en-GB' (fallback) but not 'en-US' or 'fr*'
      setUp();
      const result = i18n._getString('testKey4', 'fr-CA');
      expect(result).toBe('Value from fallbackLocale (en-GB)');
    });

    it('should return key if not found in any locale', () => {
      const key = 'missingKey';
      setUp();
      const result = i18n._getString(key, 'fr-CA');
      expect(result).toBe(key);
    });

    it('should return key if value is explicitly null in cache', () => {
      // 'nullKey' is null in 'en-US' (defaultLocale)
      // Logic says: return value === null ? key : value;
      setUp();
      const result = i18n._getString('nullKey', 'fr-CA');
      expect(result).toBe('nullKey');
    });

    it('should return key if value is not exist key', () => {
      setUp();
      const result = i18n._getString('example111', 'fr-CA');
      expect(result).toBe('example111');
    });

    it('should return key if value is empty string', () => {
      setUp();
      const result = i18n._getString('emptyValue', 'en-US');
      expect(result).toBe('');
    });

    it('should prioritize logic correctly', () => {
      // Setup collision to verify priority
      i18n._cache = {
        'fr-CA': { key: 'fr-CA' },
        fr: { key: 'fr' },
        'en-US': { key: 'en-US' },
        'en-GB': { key: 'en-GB' },
      };
      expect(i18n._getString('key', 'fr-CA')).toBe('fr-CA');

      delete (i18n._cache['fr-CA'] as any).key;
      expect(i18n._getString('key', 'fr-CA')).toBe('fr');

      delete (i18n._cache['fr'] as any).key;
      expect(i18n._getString('key', 'fr-CA')).toBe('en-US'); // default

      delete (i18n._cache['en-US'] as any).key;
      expect(i18n._getString('key', 'fr-CA')).toBe('en-GB'); // fallback
    });
  });
});
