import execa from 'execa';
import fs from 'fs';
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';
import { uniq } from 'ramda';

import { generateIndex } from './generateIndex';

const normalizeField = (
  field: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): string | null => {
  if (!field) return null;
  let type: string | null = null;
  const fieldObject = field as OpenAPIV3.SchemaObject;
  if ((field as OpenAPIV3.ReferenceObject).$ref) {
    type = (field as OpenAPIV3.ReferenceObject).$ref.split('/').slice(-1)[0];
  } else if (fieldObject.type === 'integer' || fieldObject.type === 'number') {
    type = 'number';
  } else if (fieldObject.type === 'array') {
    type = `${normalizeField(fieldObject.items!)}[]`;
  } else if (fieldObject.type === 'boolean') {
    type = 'boolean';
  } else if (fieldObject.type === 'string') {
    type = 'string';
    if (fieldObject.enum) {
      type = `(${fieldObject.enum
        .map((i: string) => `'${i.replace(/'/g, "\\'")}'`)
        .join(' | ')})`;
    }
  } else {
    // throw new Error(`Unknown type ${field.type}`);
  }
  return type;
};

export const generateApis = (
  paths: OpenAPIV3.PathsObject<{}, {}>,
  outputDir: string,
) => {
  const outputPath = path.join(outputDir, 'apis');
  execa.commandSync(`rm -rf ${outputPath}`);
  execa.commandSync(`mkdir ${outputPath}`);

  const result = {};
  Object.entries(paths).forEach(([path, pattern]) => {
    const matchPath = path.replace(
      /\{\w+\}/g,
      (match) => `:${match.replace(/\{|\}/g, '')}`,
    );
    Object.entries(
      pattern as Record<string, OpenAPIV3.OperationObject>,
    ).forEach(([method, config]) => {
      result[method] = result[method] ?? '';
      result[method] += `'${matchPath}': {
        parameters: {
          ${(config.parameters ?? [])
            .map((parameter) => {
              if ((parameter as OpenAPIV3.ReferenceObject).$ref) {
                // throw new Error(`Unknown type ${parameter.$ref}`);
                return '';
              }
              const { description, name, required, schema } =
                parameter as OpenAPIV3.ParameterObject;
              const type = normalizeField(schema!);
              const optional = required ? '' : '?';
              return `
                /**
                 * ${description ?? ''}
                 */
                '${name}'${optional}: ${type};
              `;
            })
            .join('')}
        };
        ${
          config.requestBody
            ? `requestBody${
                (config.requestBody as OpenAPIV3.RequestBodyObject).required
                  ? ''
                  : '?'
              }: ${
                normalizeField(
                  // @ts-ignore
                  (config.requestBody as OpenAPIV3.ReferenceObject).$ref
                    ? (config.requestBody as OpenAPIV3.ReferenceObject)
                    : Object.values(
                        (config.requestBody as OpenAPIV3.RequestBodyObject)
                          ?.content ?? {},
                      )[0]?.schema,
                ) ??
                `${config.operationId!.replace(/./, (str) =>
                  str.toUpperCase(),
                )}Request`
              };`
            : 'requestBody: undefined;'
        }
        responses: {
          ${Object.entries(config.responses)
            .map(([status, response]) => {
              const statusKey = status === 'default' ? 200 : status;
              if ((response as OpenAPIV3.ReferenceObject).$ref) {
                const [type] = (response as OpenAPIV3.ReferenceObject).$ref
                  .split('/')
                  .slice(-1);
                return `${statusKey}: ${type}`;
              }
              const { content, description } =
                response as OpenAPIV3.ResponseObject;
              if (!content) return '';
              const type = normalizeField(content['application/json']?.schema!);
              // The original document may be missing the interface type.
              return `
              /**
               ${description
                 .split('\n')
                 .map((item) => `* ${item}`)
                 .join('\n')}
               */
              ${statusKey}: ${type ?? 'any'};
            `;
            })
            .join('')}
        }
      };\n`;
    });
  });

  Object.keys(result).forEach((methodName) => {
    const importTypes = uniq(
      result[methodName].match(/(?<=:\s*)[A-Z][A-Za-z]+(?=(;|\[\]))/gm) ?? [],
    );
    const name = methodName.replace(/./, (str) => str.toUpperCase());
    let code =
      importTypes.length > 0
        ? `import { ${importTypes.join(', ')} } from '../interfaces';\n\n`
        : ``;

    code += `export interface ${name} {
      ${result[methodName]}
    }`;
    fs.writeFileSync(path.join(outputPath, `${name}.ts`), code);
  });

  generateIndex(outputPath);
};
