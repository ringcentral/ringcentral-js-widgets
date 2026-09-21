import { mockAllLogs } from '@ringcentral-integration/test-utils';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@ringcentral-integration/test-utils/mock/locationMock.js';

beforeEach(() => {
  mockAllLogs();
});

// Mock global variables that would be defined in adapter.html
const mockLegacyScripts = [
  'http://localhost:3000/legacy-script1.js',
  'http://localhost:3000/legacy-script2.js',
];
const mockNewScripts = ['http://localhost:3000/new-script1.js'];
let locationMock: ReturnType<typeof mockWindowLocation>;

beforeEach(() => {
  // Mock global variables that would be defined in adapter.html
  (global as any).legacyScripts = mockLegacyScripts;
  (global as any).newScripts = mockNewScripts;
  locationMock = mockWindowLocation();

  jest.spyOn(document, 'createElement');
  jest.spyOn(document.head, 'appendChild');
});

afterEach(() => {
  restoreWindowLocation();
  jest.restoreAllMocks();
  document.body.innerHTML = '';
  document.head.innerHTML = '';

  // clear the localStorage
  localStorage.clear();
});

describe('Inline Script', () => {
  describe('setCustomEntryUrl function', () => {
    test('should set custom adapter URL in localStorage and reload page', async () => {
      const testUrl = 'https://custom-adapter.example.com/script.js';

      await jest.isolateModulesAsync(async () => {
        // Import the inline script which will execute the IIFE and define global functions
        require('../../src/templates/customEntryUrl.js');

        // The function should now be available globally
        const setCustomEntryUrl = (globalThis as any).setCustomEntryUrl;
        expect(typeof setCustomEntryUrl).toBe('function');

        setCustomEntryUrl(testUrl);

        expect(localStorage.getItem('_RC_CUSTOM_ENTRY_')).toBe(testUrl);
        expect(locationMock.reload).toHaveBeenCalled();
      });
    });
  });
});

describe('clearCustomEntryUrl function', () => {
  test('should remove custom adapter URL from localStorage and reload page', async () => {
    await jest.isolateModulesAsync(async () => {
      localStorage.setItem('_RC_CUSTOM_ENTRY_', 'example');

      require('../../src/templates/customEntryUrl.js');

      const clearCustomEntryUrl = (global as any).clearCustomEntryUrl;
      expect(typeof clearCustomEntryUrl).toBe('function');

      clearCustomEntryUrl();
      expect(localStorage.getItem('_RC_CUSTOM_ENTRY_')).toBe(null);
      expect(locationMock.reload).toHaveBeenCalled();
    });
  });
});

describe('IIFE script loading logic', () => {
  test('should load custom entry URL when present in localStorage', async () => {
    const customUrl = 'https://custom-entry.example.com/script.js';

    localStorage.setItem('_RC_CUSTOM_ENTRY_', customUrl);

    jest.mocked(document.createElement).mockClear();
    jest.mocked(document.head.appendChild).mockClear();
    await jest.isolateModulesAsync(async () => {
      require('../../src/templates/customEntryUrl.js');

      expect(console.warn).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(document.head.appendChild).toHaveBeenCalledTimes(1);

      const createdScript = jest.mocked(document.createElement).mock.results[0]
        .value;
      expect(createdScript.defer).toBe(true);
      expect(createdScript.src).toBe(customUrl);
    });
  });

  test('should prioritize custom entry URL over adapter type selection', async () => {
    const customUrl = 'https://priority-custom.example.com/script.js';
    localStorage.setItem('_RC_CUSTOM_ENTRY_', customUrl);
    localStorage.setItem('_RC_USING_LEGACY_ADAPTER_KEY_', 'true');

    await jest.isolateModulesAsync(async () => {
      // Import and execute the inline script
      require('../../src/templates/customEntryUrl.js');

      expect(console.warn).toHaveBeenCalledWith(
        `%cUsing custom entry URL from localStorage,

${customUrl}

use %c"clearCustomEntryUrl()"%c to clear the custom entry URL`,
        'font-size:2em',
        'color:red;font-size:2em',
        'font-size:2em',
      );
      expect(console.log).not.toHaveBeenCalledWith(
        '@@ Going using legacy adapter',
        true,
      );
      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.head.appendChild).toHaveBeenCalledTimes(1);

      const createdScript = jest.mocked(document.createElement).mock.results[0]
        .value;
      expect(createdScript.src).toBe(customUrl);
    });
  });
});
