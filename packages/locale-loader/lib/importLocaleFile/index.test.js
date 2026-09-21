import { transformSync } from '@babel/core';
import fs from 'fs-extra';
import path from 'path';

import importLocaleFile from '.';

const sourceFolder = './testData/importLocaleFile';

function encodeValue(str) {
  return `@#@${JSON.stringify(str)}@#@`;
}

async function clean() {
  await fs.emptyDir(sourceFolder);
}

async function generateSourceFile() {
  await fs.ensureDir(sourceFolder);
  await fs.writeFile(
    path.resolve(sourceFolder, 'en-US.ts'),
    `
    const obj = {
      key: 'testKey',
    };

    export default {
      modern: 'rogue',
      whisky: 'Vault',
      emptySource: '',
      [obj.key]: 'testValue',
    } as const;
  `,
  );
}

describe('importLocaleFile', () => {
  beforeEach(async () => {
    await clean();
    await generateSourceFile();
  });

  afterEach(clean);

  test('should import a translated object from a source locale file path', async () => {
    await importLocaleFile({
      sourceFolder,
      targetLocale: 'en-GB',
      targetRelativePath: 'en-US.ts',
      rawData: {
        modern: 'rogue',
        whisky: 'Changed',
        '[obj.key]': 'testValueChanged',
      },
    });

    const filePath = path.resolve(sourceFolder, 'en-GB.ts');
    expect(await fs.exists(filePath)).toBe(true);

    const content = await fs.readFile(filePath, 'utf8');
    let json;
    expect(() => {
      json = eval(transformSync(content, { filename: 'en-GB.ts' }).code);
    }).not.toThrow();

    expect(json.modern).toBe('rogue');
    expect(json.whisky).toBe('Changed');
    expect(json.testKey).toBe('testValueChanged');
    expect(
      content.includes(
        `// @key: ${encodeValue('whisky')} @source: ${encodeValue('Vault')}`,
      ),
    ).toBe(true);
  });

  test('should derive the source file from an existing target locale path and skip stale source data payloads', async () => {
    await importLocaleFile({
      sourceFolder,
      targetLocale: 'en-GB',
      targetRelativePath: 'en-US.ts',
      rawData: {
        modern: 'rogue',
        whisky: 'Changed',
      },
    });

    await fs.writeFile(
      path.resolve(sourceFolder, 'en-US.ts'),
      `
      export default {
        whisky: 'Updated Source',
      } as const;
    `,
    );

    await importLocaleFile({
      sourceFolder,
      targetLocale: 'en-GB',
      targetRelativePath: 'en-GB.ts',
      rawData: {
        modern: {
          source: 'rogue',
          value: 'still there',
        },
        whisky: {
          source: 'Vault',
          value: 'Should Skip',
        },
      },
    });

    const content = await fs.readFile(
      path.resolve(sourceFolder, 'en-GB.ts'),
      'utf8',
    );
    let json;
    expect(() => {
      json = eval(transformSync(content, { filename: 'en-GB.ts' }).code);
    }).not.toThrow();

    expect(json.modern).toBe(undefined);
    expect(json.whisky).toBe(undefined);
  });

  test('should preserve empty-string translations and falsy structured source values', async () => {
    await importLocaleFile({
      sourceFolder,
      targetLocale: 'en-GB',
      targetRelativePath: 'en-US.ts',
      rawData: {
        whisky: {
          source: 'Vault',
          value: '',
        },
        emptySource: {
          source: '',
          value: 'translated from empty source',
        },
        '[obj.key]': '',
      },
    });

    let content = await fs.readFile(path.resolve(sourceFolder, 'en-GB.ts'), 'utf8');
    let json;
    expect(() => {
      json = eval(transformSync(content, { filename: 'en-GB.ts' }).code);
    }).not.toThrow();

    expect(json.whisky).toBe('');
    expect(json.emptySource).toBe('translated from empty source');
    expect(json.testKey).toBe('');

    await importLocaleFile({
      sourceFolder,
      targetLocale: 'en-GB',
      targetRelativePath: 'en-GB.ts',
      rawData: {},
    });

    content = await fs.readFile(path.resolve(sourceFolder, 'en-GB.ts'), 'utf8');
    expect(() => {
      json = eval(transformSync(content, { filename: 'en-GB.ts' }).code);
    }).not.toThrow();

    expect(json.whisky).toBe('');
    expect(json.emptySource).toBe('translated from empty source');
    expect(json.testKey).toBe('');
  });
});
