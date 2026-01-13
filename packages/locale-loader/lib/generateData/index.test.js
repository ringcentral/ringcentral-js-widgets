import { toHashPseudoString } from '@ringcentral-integration/i18n/lib/toPseudoString';
import fs from 'fs';

import { generateJsonData, generateXlfData } from './index';

// Mock fs module
jest.mock('fs');
jest.mock('@ringcentral-integration/i18n/lib/toPseudoString');

describe('generateData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fs.existsSync to return true by default
    fs.existsSync.mockReturnValue(true);
    // Mock fs.readFileSync to return a valid package.json
    fs.readFileSync.mockReturnValue(
      JSON.stringify({ name: 'integration-apps' }),
    );
  });

  describe('generateJsonData', () => {
    const mockLocaleData = {
      folder1: {
        path: '/path/to/folder1',
        files: {
          'en-US': {
            file: 'en-US.ts',
            data: new Map([
              ['key1', { key: 'key1', value: 'Hello' }],
              ['key2', { key: 'key2', value: 'World' }],
            ]),
          },
          'fr-FR': {
            file: 'fr-FR.ts',
            data: new Map([
              ['key1', { key: 'key1', value: 'Bonjour', source: 'Hello' }],
              ['key2', { key: 'key2', value: 'Monde', source: 'World' }],
            ]),
          },
          'de-DE': {
            file: 'de-DE.ts',
            data: new Map([
              ['key1', { key: 'key1', value: 'Hallo', source: 'Hello' }],
            ]),
          },
        },
      },
      folder2: {
        path: '/path/to/folder2',
        files: {
          'en-US': {
            file: 'en-US.ts',
            data: new Map([['key3', { key: 'key3', value: 'Test' }]]),
          },
        },
      },
    };

    const defaultParams = {
      projectRoot: '/project/root',
      localeData: mockLocaleData,
      sourceFolder: '/source/folder',
      sourceLocale: 'en-US',
      translationLocales: ['en-US', 'fr-FR', 'de-DE', 'rc-XX'],
    };

    test('should generate JSON data for all locales', () => {
      const result = generateJsonData(defaultParams);

      expect(result).toHaveProperty('en-US');
      expect(result).toHaveProperty('fr-FR');
      expect(result).toHaveProperty('de-DE');
      expect(result).toHaveProperty('rc-XX');
    });

    test('should include source locale data', () => {
      const result = generateJsonData(defaultParams);

      // The path is generated using path.relative(sourceFolder, path.join(folderData.path, sourceFile.file))
      // With sourceFolder='/source/folder' and folderData.path='/path/to/folder1' and sourceFile.file='en-US.ts'
      // This results in '../../path/to/folder1/en-US.ts'
      const expectedPath = '../../path/to/folder1/en-US.ts';
      expect(result['en-US'][expectedPath]).toBeDefined();
      expect(result['en-US'][expectedPath]).toEqual({
        key1: 'Hello',
        key2: 'World',
      });
    });

    test('should include translated data when source matches', () => {
      const result = generateJsonData(defaultParams);

      // The translated data is stored under the source file path, not the target file path
      const expectedPath = '../../path/to/folder1/en-US.ts';
      expect(result['fr-FR'][expectedPath]).toBeDefined();
      expect(result['fr-FR'][expectedPath]).toEqual({
        key1: 'Bonjour',
        key2: 'Monde',
      });
    });

    test('should handle missing translation files', () => {
      const result = generateJsonData(defaultParams);

      // The translated data is stored under the source file path, not the target file path
      const expectedPath = '../../path/to/folder1/en-US.ts';
      expect(result['de-DE'][expectedPath]).toBeDefined();
      expect(result['de-DE'][expectedPath]).toEqual({
        key1: 'Hallo',
      });
    });

    test('should generate rc-XX data with hashes', () => {
      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData(defaultParams);

      expect(result['rc-XX']).toBeDefined();
      expect(toHashPseudoString).toHaveBeenCalled();
    });

    test('should call toHashPseudoString with correct parameters for rc-XX', () => {
      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData(defaultParams);

      // Verify toHashPseudoString was called with correct parameters
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.stringContaining('/path/to/folder1/en-US.ts'),
        'key1',
        'Hello',
      );
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.stringContaining('/path/to/folder1/en-US.ts'),
        'key2',
        'World',
      );
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.stringContaining('/path/to/folder2/en-US.ts'),
        'key3',
        'Test',
      );

      // Verify the result contains the hashed values
      expect(result['rc-XX']).toBeDefined();
      const rcXXData = result['rc-XX'];
      Object.values(rcXXData).forEach((fileData) => {
        Object.values(fileData).forEach((value) => {
          expect(value).toBe('hashed_value');
        });
      });
    });

    test('should generate different hashes for different source paths', () => {
      let callCount = 0;
      toHashPseudoString.mockImplementation((sourcePath, keyPath) => {
        callCount++;
        return `hash_${callCount}_${sourcePath.split('/').pop()}_${keyPath}`;
      });

      const result = generateJsonData(defaultParams);

      expect(result['rc-XX']).toBeDefined();

      // Verify different files get different hash prefixes
      const rcXXData = result['rc-XX'];
      const filePaths = Object.keys(rcXXData);
      expect(filePaths.length).toBeGreaterThan(1);

      // Check that different files have different hash patterns
      const hashValues = Object.values(rcXXData).flatMap((fileData) =>
        Object.values(fileData),
      );
      const uniqueHashes = new Set(hashValues);
      expect(uniqueHashes.size).toBeGreaterThan(1);
    });

    test('should handle empty rc-XX data when no en-US source exists', () => {
      const localeDataWithoutEnUS = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'fr-FR': {
              file: 'fr-FR.ts',
              data: new Map([['key1', { key: 'key1', value: 'Bonjour' }]]),
            },
          },
        },
      };

      const result = generateJsonData({
        ...defaultParams,
        localeData: localeDataWithoutEnUS,
        translationLocales: ['fr-FR'], // Don't include rc-XX in translation locales
      });

      // When there's no en-US data and rc-XX is not in translation locales, rc-XX should be undefined
      expect(result['rc-XX']).toBeUndefined();
      expect(toHashPseudoString).not.toHaveBeenCalled();
    });

    test('should generate rc-XX data with project root path resolution', () => {
      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData({
        ...defaultParams,
        projectRoot: '/custom/project/root',
      });

      expect(result['rc-XX']).toBeDefined();

      // Verify toHashPseudoString was called with paths relative to project root
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.stringMatching(/^\/path\/to\/folder1\/en-US\.ts$/),
        expect.any(String),
        expect.any(String),
      );
    });

    test('should generate rc-XX data with auto-detected project root', () => {
      // Mock fs.existsSync to return true for package.json files
      fs.existsSync.mockImplementation((filePath) => {
        return filePath.includes('package.json');
      });

      // Mock fs.readFileSync to return a valid package.json
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('package.json')) {
          return JSON.stringify({ name: 'integration-apps' });
        }
        return '{}';
      });

      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData({
        ...defaultParams,
        projectRoot: undefined, // Let it auto-detect
      });

      expect(result['rc-XX']).toBeDefined();
      expect(toHashPseudoString).toHaveBeenCalled();
    });

    test('should handle rc-XX generation with complex nested data', () => {
      const complexLocaleData = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([
                ['simpleKey', { key: 'simpleKey', value: 'Simple Value' }],
                ['emptyKey', { key: 'emptyKey', value: '' }],
                [
                  'specialCharsKey',
                  {
                    key: 'specialCharsKey',
                    value: 'Special chars: !@#$%^&*()',
                  },
                ],
                [
                  'unicodeKey',
                  { key: 'unicodeKey', value: 'Unicode: 你好世界 🌍' },
                ],
              ]),
            },
          },
        },
      };

      let callCount = 0;
      toHashPseudoString.mockImplementation((sourcePath, keyPath, value) => {
        callCount++;
        return `pseudo_${callCount}_${keyPath}_${value.length}`;
      });

      const result = generateJsonData({
        ...defaultParams,
        localeData: complexLocaleData,
        translationLocales: ['en-US', 'rc-XX'],
      });

      expect(result['rc-XX']).toBeDefined();
      expect(toHashPseudoString).toHaveBeenCalledTimes(4);

      // Verify all different types of values are processed
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.any(String),
        'simpleKey',
        'Simple Value',
      );
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.any(String),
        'emptyKey',
        '',
      );
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.any(String),
        'specialCharsKey',
        'Special chars: !@#$%^&*()',
      );
      expect(toHashPseudoString).toHaveBeenCalledWith(
        expect.any(String),
        'unicodeKey',
        'Unicode: 你好世界 🌍',
      );
    });

    test('should handle rc-XX generation with multiple source files', () => {
      const multiFileLocaleData = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Value1' }]]),
            },
          },
        },
        folder2: {
          path: '/path/to/folder2',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key2', { key: 'key2', value: 'Value2' }]]),
            },
          },
        },
        folder3: {
          path: '/path/to/folder3',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key3', { key: 'key3', value: 'Value3' }]]),
            },
          },
        },
      };

      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData({
        ...defaultParams,
        localeData: multiFileLocaleData,
        translationLocales: ['en-US', 'rc-XX'],
      });

      expect(result['rc-XX']).toBeDefined();
      expect(toHashPseudoString).toHaveBeenCalledTimes(3);

      // Verify all three files are processed
      const rcXXData = result['rc-XX'];
      expect(Object.keys(rcXXData)).toHaveLength(3);
      expect(rcXXData['../../path/to/folder1/en-US.ts']).toBeDefined();
      expect(rcXXData['../../path/to/folder2/en-US.ts']).toBeDefined();
      expect(rcXXData['../../path/to/folder3/en-US.ts']).toBeDefined();
    });

    test('should handle rc-XX generation when project root is not found', () => {
      // Mock fs to simulate project root not found
      fs.existsSync.mockReturnValue(false);
      fs.readFileSync.mockReturnValue('{}');

      toHashPseudoString.mockReturnValue('hashed_value');

      const result = generateJsonData({
        ...defaultParams,
        projectRoot: undefined, // Let it try to auto-detect
        translationLocales: ['en-US', 'rc-XX'],
      });

      expect(result['rc-XX']).toBeDefined();
      expect(toHashPseudoString).toHaveBeenCalled();

      // Should still work with fallback path resolution
      const rcXXData = result['rc-XX'];
      expect(Object.keys(rcXXData).length).toBeGreaterThan(0);
    });

    test('should handle empty locale data', () => {
      const result = generateJsonData({
        ...defaultParams,
        localeData: {},
      });

      expect(result['en-US']).toEqual({});
      expect(result['fr-FR']).toEqual({});
    });

    test('should handle missing source files', () => {
      const localeDataWithoutSource = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'fr-FR': {
              file: 'fr-FR.ts',
              data: new Map([['key1', { key: 'key1', value: 'Bonjour' }]]),
            },
          },
        },
      };

      const result = generateJsonData({
        ...defaultParams,
        localeData: localeDataWithoutSource,
      });

      expect(result['en-US']).toEqual({});
      expect(result['fr-FR']).toEqual({});
    });

    test('should use projectRoot when provided', () => {
      const result = generateJsonData(defaultParams);
      expect(result).toBeDefined();
    });

    test('should find project root when not provided', () => {
      fs.existsSync.mockImplementation((filePath) => {
        if (filePath.includes('package.json')) {
          return true;
        }
        return false;
      });

      const result = generateJsonData({
        ...defaultParams,
        projectRoot: undefined,
      });

      expect(result).toBeDefined();
    });
  });

  describe('generateXlfData', () => {
    const mockLocaleData = {
      folder1: {
        path: '/path/to/folder1',
        files: {
          'en-US': {
            file: 'en-US.ts',
            data: new Map([
              ['key1', { key: 'key1', value: 'Hello' }],
              ['key2', { key: 'key2', value: 'World' }],
            ]),
          },
          'fr-FR': {
            file: 'fr-FR.ts',
            data: new Map([
              ['key1', { key: 'key1', value: 'Bonjour', source: 'Hello' }],
              ['key2', { key: 'key2', value: 'Monde', source: 'World' }],
            ]),
          },
        },
      },
    };

    const defaultParams = {
      localeData: mockLocaleData,
      sourceLocale: 'en-US',
      translationLocales: ['en-US', 'fr-FR'],
      sourceFolder: '/source/folder',
      exportType: 'full',
      fillEmptyWithSource: false,
    };

    test('should generate XLF data for full export', () => {
      const result = generateXlfData(defaultParams);

      expect(result).toHaveProperty('fr-FR');
      expect(typeof result['fr-FR']).toBe('string');
      expect(result['fr-FR']).toContain('<?xml');
      expect(result['fr-FR']).toContain('<xliff');
    });

    test('should generate XLF data for translated only export', () => {
      const result = generateXlfData({
        ...defaultParams,
        exportType: 'translated',
      });

      expect(result).toHaveProperty('fr-FR');
      expect(typeof result['fr-FR']).toBe('string');
    });

    test('should include trans-units with source and target', () => {
      const result = generateXlfData(defaultParams);

      expect(result['fr-FR']).toContain('<trans-unit');
      expect(result['fr-FR']).toContain('<source>Hello</source>');
      expect(result['fr-FR']).toContain('<target>Bonjour</target>');
    });

    test('should handle fillEmptyWithSource option', () => {
      const result = generateXlfData({
        ...defaultParams,
        fillEmptyWithSource: true,
      });

      expect(result['fr-FR']).toContain('<trans-unit');
    });

    test('should handle missing target files', () => {
      const localeDataWithoutTarget = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Hello' }]]),
            },
          },
        },
      };

      const result = generateXlfData({
        ...defaultParams,
        localeData: localeDataWithoutTarget,
      });

      expect(result['fr-FR']).toContain('<trans-unit');
      expect(result['fr-FR']).toContain('<source>Hello</source>');
    });

    test('should handle empty trans-units array', () => {
      const emptyLocaleData = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map(),
            },
          },
        },
      };

      const result = generateXlfData({
        ...defaultParams,
        localeData: emptyLocaleData,
      });

      expect(result['fr-FR']).toContain('<?xml');
      expect(result['fr-FR']).not.toContain('<trans-unit');
    });

    test('should filter out source locale from translation locales', () => {
      const result = generateXlfData(defaultParams);

      expect(result).not.toHaveProperty('en-US');
      expect(result).toHaveProperty('fr-FR');
    });

    test('should handle different export types', () => {
      const testCases = [
        { exportType: 'full', expectedToContain: '<trans-unit' },
        { exportType: 'translated', expectedToContain: '<trans-unit' },
        { exportType: 'FULL', expectedToContain: '<trans-unit' },
        { exportType: 'TRANSLATED', expectedToContain: '<trans-unit' },
      ];

      testCases.forEach(({ exportType, expectedToContain }) => {
        const result = generateXlfData({
          ...defaultParams,
          exportType,
        });

        expect(result['fr-FR']).toContain(expectedToContain);
      });
    });

    test('should handle source mismatch in translated export', () => {
      const localeDataWithMismatch = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Hello' }]]),
            },
            'fr-FR': {
              file: 'fr-FR.ts',
              data: new Map([
                [
                  'key1',
                  { key: 'key1', value: 'Bonjour', source: 'Old Hello' },
                ],
              ]),
            },
          },
        },
      };

      const result = generateXlfData({
        ...defaultParams,
        localeData: localeDataWithMismatch,
        exportType: 'translated',
      });

      // Should not include mismatched translations in translated-only export
      expect(result['fr-FR']).not.toContain('<trans-unit');
    });

    test('should include all translations in full export regardless of source match', () => {
      const localeDataWithMismatch = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Hello' }]]),
            },
            'fr-FR': {
              file: 'fr-FR.ts',
              data: new Map([
                [
                  'key1',
                  { key: 'key1', value: 'Bonjour', source: 'Old Hello' },
                ],
              ]),
            },
          },
        },
      };

      const result = generateXlfData({
        ...defaultParams,
        localeData: localeDataWithMismatch,
        exportType: 'full',
      });

      expect(result['fr-FR']).toContain('<trans-unit');
    });
  });

  describe('edge cases and error handling', () => {
    test('should handle malformed package.json in findProjectRoot', () => {
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('package.json')) {
          throw new Error('Malformed JSON');
        }
        return JSON.stringify({ name: 'integration-apps' });
      });

      const result = generateJsonData({
        projectRoot: undefined,
        localeData: {},
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: ['en-US'],
      });

      expect(result).toBeDefined();
    });

    test('should handle missing package.json files', () => {
      fs.existsSync.mockReturnValue(false);

      const result = generateJsonData({
        projectRoot: undefined,
        localeData: {},
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: ['en-US'],
      });

      expect(result).toBeDefined();
    });

    test('should handle empty translation locales array', () => {
      const result = generateJsonData({
        projectRoot: '/project/root',
        localeData: {},
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: [],
      });

      expect(result).toEqual({});
    });

    test('should handle null/undefined values in locale data', () => {
      const localeDataWithNulls = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([
                ['key1', { key: 'key1', value: 'Hello' }],
                ['key2', { key: 'key2', value: null }],
                ['key3', { key: 'key3', value: undefined }],
              ]),
            },
          },
        },
      };

      const result = generateJsonData({
        projectRoot: '/project/root',
        localeData: localeDataWithNulls,
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: ['en-US'],
      });

      const expectedPath = '../../path/to/folder1/en-US.ts';
      expect(result['en-US'][expectedPath]).toEqual({
        key1: 'Hello',
        key2: null,
        key3: undefined,
      });
    });

    test('should handle multiple folders with different structures', () => {
      const multiFolderData = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Hello' }]]),
            },
          },
        },
        folder2: {
          path: '/path/to/folder2',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key2', { key: 'key2', value: 'World' }]]),
            },
          },
        },
      };

      const result = generateJsonData({
        projectRoot: '/project/root',
        localeData: multiFolderData,
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: ['en-US'],
      });

      expect(result['en-US']['../../path/to/folder1/en-US.ts']).toBeDefined();
      expect(result['en-US']['../../path/to/folder2/en-US.ts']).toBeDefined();
      expect(result['en-US']['../../path/to/folder1/en-US.ts']).toEqual({
        key1: 'Hello',
      });
      expect(result['en-US']['../../path/to/folder2/en-US.ts']).toEqual({
        key2: 'World',
      });
    });

    test('should handle source mismatch in translated data', () => {
      const localeDataWithMismatch = {
        folder1: {
          path: '/path/to/folder1',
          files: {
            'en-US': {
              file: 'en-US.ts',
              data: new Map([['key1', { key: 'key1', value: 'Hello' }]]),
            },
            'fr-FR': {
              file: 'fr-FR.ts',
              data: new Map([
                [
                  'key1',
                  { key: 'key1', value: 'Bonjour', source: 'Old Hello' },
                ],
              ]),
            },
          },
        },
      };

      const result = generateJsonData({
        projectRoot: '/project/root',
        localeData: localeDataWithMismatch,
        sourceFolder: '/source/folder',
        sourceLocale: 'en-US',
        translationLocales: ['en-US', 'fr-FR'],
      });

      // Source mismatch should result in empty object for fr-FR
      const expectedPath = '../../path/to/folder1/en-US.ts';
      expect(result['fr-FR'][expectedPath]).toEqual({});
    });
  });
});
