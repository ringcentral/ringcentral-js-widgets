import fs from 'fs';
import path from 'path';

export const generateIndex = (outputPath: string) => {
  const interfaceFiles = fs
    .readdirSync(outputPath)
    .map((interfaceFile) => path.parse(interfaceFile).name);
  const code = interfaceFiles
    .map(
      (interfaceFile) =>
        `export { ${interfaceFile} } from './${interfaceFile}';`,
    )
    .join('\n');
  fs.writeFileSync(path.join(outputPath, 'index.ts'), `${code}\n`);
};
