import fs from 'fs';
import path from 'path';

/**
 * Replaces the inline i18n object in a target file with the i18n objects from a specified folder.
 * @param i18nFolder - The path to the folder containing the i18n files.
 * @param targetFilePath - The path to the target file where the inline i18n object will be replaced.
 */
export const replaceI18nInlineObject = (
  i18nFolder: string,
  targetFilePath: string,
  { excludes }: { excludes: string[] } = { excludes: [] },
) => {
  const fileList = fs.readdirSync(i18nFolder);

  const i18nAll = fileList
    .filter(
      (x) => x.includes('ts') && !['index.ts', 'loadLocale.ts'].includes(x),
    )
    .reduce((acc, curr) => {
      const key = curr.replace('.ts', '');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const value = require(path.join(i18nFolder, curr)).default;
      excludes.forEach((exclude) => {
        delete value[exclude];
      });
      acc[key.toLocaleLowerCase()] = value;
      return acc;
    }, {} as any);

  const inlineFilePath = targetFilePath;
  const inlineFile = fs.readFileSync(inlineFilePath);

  const content = inlineFile.toString();

  const startMark = '// i18n-replace';
  const start = content.indexOf(startMark);
  const end = content.indexOf('// i18n-replace-end');

  const newContent =
    content.slice(0, start + startMark.length + 1) +
    `const i18n = ${JSON.stringify(i18nAll)}` +
    content.slice(end);
  console.log('write inline i18n content success:', newContent);

  fs.writeFileSync(inlineFilePath, newContent);
};
