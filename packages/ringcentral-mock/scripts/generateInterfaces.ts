import fs from 'fs';
import path from 'path';
import execa from 'execa';
import { uniq, without } from 'ramda';
import type { Field, Model } from 'ringcentral-open-api-parser/lib/types';

import { generateIndex } from './generateIndex';

const normalizeField = (field: Field): Field => {
  if (field.$ref) {
    field.type = field.$ref;
  } else if (field.type === 'integer' || field.type === 'number') {
    field.type = 'number';
  } else if (field.type === 'array') {
    field.type = `${normalizeField(field.items!).type}[]`;
  } else if (field.type === 'boolean') {
    field.type = 'boolean';
  } else if (field.type === 'string') {
    field.type = 'string';
    if (field.enum) {
      field.type = `(${field.enum
        .map((item: string) => `'${item.replace(/'/g, "\\'")}'`)
        .join(' | ')})`;
    }
  } else if (field.type === 'byte[]') {
    field.type = 'string | Buffer | Blob | NodeJS.ReadableStream';
  } else {
    // throw new Error(`Unknown type ${field.type}`);
  }
  return field;
};

const generateField = (field: Field) => {
  field = normalizeField(field);
  let interfaceStr = '';
  if (
    field.name.includes('-') ||
    field.name.includes(':') ||
    field.name.includes('.')
  ) {
    interfaceStr = `'${field.name}': ${field.type};`;
  } else {
    interfaceStr = `${field.name}: ${field.type};`;
  }

  interfaceStr = ` */\n  ${interfaceStr}`;
  if (field.default) {
    interfaceStr = ` * Default: ${field.default}\n  ${interfaceStr}`;
  }
  if (field.example) {
    interfaceStr = ` * Example: ${field.example}\n  ${interfaceStr}`;
  }
  if (field.format) {
    interfaceStr = ` * Format: ${field.format}\n  ${interfaceStr}`;
  }
  if (field.minimum) {
    interfaceStr = ` * Minimum: ${field.minimum}\n  ${interfaceStr}`;
  }
  if (field.maximum) {
    interfaceStr = ` * Maximum: ${field.maximum}\n  ${interfaceStr}`;
  }
  if (field.required) {
    interfaceStr = ` * Required\n  ${interfaceStr}`;
  }
  if (field.description) {
    interfaceStr = ` * ${field.description
      .trim()
      .split('\n')
      .join('\n *  ')}\n  ${interfaceStr}`;
  }
  interfaceStr = `/**\n  ${interfaceStr}`;
  return interfaceStr;
};

export const generateInterfaces = (models: Model[], outputDir: string) => {
  const outputPath = path.join(outputDir, 'interfaces');
  execa.commandSync(`rm -rf ${outputPath}`);
  execa.commandSync(`mkdir ${outputPath}`);

  models.forEach((model) => {
    let code = `${
      model.description ? `// ${model.description}\n` : ''
    }export interface ${model.name} {
  ${model.fields.map((f) => generateField(f)).join('\n  ')}
}
`;

    const importTypes = code.match(/(?<=^ {2}\S+?: )[A-Z][A-Za-z]+?\b/gm) ?? [];
    code = `${without([model.name], uniq(importTypes))
      .map((name) => `import { ${name} } from './${name}';`)
      .concat(`\n${code}`)
      .join('\n')}`;

    fs.writeFileSync(path.join(outputPath, `${model.name}.ts`), code);
  });

  generateIndex(outputPath);
};
