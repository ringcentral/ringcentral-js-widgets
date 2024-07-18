import execa from 'execa';
import fs from 'fs';
import yaml from 'js-yaml';
import type { OpenAPIV3 } from 'openapi-types';
import path from 'path';
import { parse } from 'ringcentral-open-api-parser';

import { generateApis } from './generateApis';
import { generateInterfaces } from './generateInterfaces';
import { generateSchemas } from './generateSchemas';

export const generate = (specFilePath: string, outputFolderPath: string) => {
  const doc: OpenAPIV3.Document = yaml.load(
    fs.readFileSync(specFilePath, 'utf8'),
  );

  const { models } = parse(doc);

  generateInterfaces(models, outputFolderPath);
  generateApis(doc.paths, outputFolderPath);
  generateSchemas(doc, outputFolderPath);

  process.chdir(path.resolve(__dirname, '../../../'));
  execa.commandSync(`yarn prettier ${outputFolderPath}`);
};
