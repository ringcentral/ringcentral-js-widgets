import fs from 'fs-extra';
import path from 'path';

import exportLocaleFile from '.';

const sourceFolder = './testData/exportLocaleFile';

async function clean() {
  await fs.emptyDir(sourceFolder);
}

describe('exportLocaleFile', () => {
  beforeEach(async () => {
    await clean();
    await fs.ensureDir(sourceFolder);
    await fs.writeFile(
      path.resolve(sourceFolder, 'en-US.ts'),
      `
      const obj = {
        key: 'testKey',
      };

      export default {
        modern: 'rogue',
        [obj.key]: 'testValue',
        template: \`hello
        world\`,
      } as const;
    `,
    );
  });

  afterEach(clean);

  test('should export one locale file as a flat translation object', () => {
    expect(
      exportLocaleFile({
        sourceFolder,
        sourceRelativePath: 'en-US.ts',
        sourceLocale: 'en-US',
      }),
    ).toEqual({
      modern: 'rogue',
      '[obj.key]': 'testValue',
      template: `hello
        world`,
    });
  });

  test('should throw when sourceRelativePath is not the requested source locale file', () => {
    expect(() =>
      exportLocaleFile({
        sourceFolder,
        sourceRelativePath: 'en-US.ts',
        sourceLocale: 'fr-FR',
      }),
    ).toThrow("options.sourceRelativePath must be a valid 'fr-FR' locale file");
  });
});
