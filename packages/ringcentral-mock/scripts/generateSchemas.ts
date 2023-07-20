import fs from 'fs';
import path from 'path';
import execa from 'execa';
import type { OpenAPIV3 } from 'openapi-types';
import { clone } from 'ramda';

type PropertyWithFaker = OpenAPIV3.NonArraySchemaObject & {
  faker: object | string;
};

const fakerMapping = {
  phoneNumber: {
    'phone.phoneNumber': '+1##########',
  },
  id: 'datatype.uuid',
  uri: 'internet.url',
};

export const generateSchemas = (doc: OpenAPIV3.Document, outputDir: string) => {
  const outputPath = path.join(outputDir, 'schemas.json');
  execa.commandSync(`rm -rf ${outputPath}`);
  const schemas = clone(doc.components!.schemas);
  Object.values(schemas!).forEach((schema) => {
    if ((schema as OpenAPIV3.SchemaObject).properties) {
      Object.entries((schema as OpenAPIV3.SchemaObject).properties!).forEach(
        ([key, property]) => {
          if (
            (property as OpenAPIV3.NonArraySchemaObject).type === 'string' &&
            fakerMapping[key]
          ) {
            (property as PropertyWithFaker).faker = fakerMapping[key];
          }
          if ('example' in property) {
            // `examples` is not a standard field, but `json-schema-faker` supports it.
            // @ts-ignore
            property.examples = [property.example];
            delete property.example;
          }
          if (['page', 'perPage', 'totalPages', 'pageEnd'].includes(key)) {
            (property as OpenAPIV3.SchemaObject).default = 1;
          }
          if (['totalElements', 'pageStart'].includes(key)) {
            (property as OpenAPIV3.SchemaObject).default = 0;
          }
          if ((property as OpenAPIV3.SchemaObject).format === 'date-time') {
            (property as PropertyWithFaker).faker = 'date.recent';
          }
        },
      );
    }
  });
  const data = { components: { schemas }, paths: {} };
  Object.entries(doc.paths).forEach(([path, pattern]) => {
    const matchPath = path.replace(
      /\{\w+\}/g,
      (match) => `:${match.replace(/\{|\}/g, '')}`,
    );
    data.paths[matchPath] = {};
    Object.entries(
      pattern as Record<string, OpenAPIV3.OperationObject>,
    ).forEach(([key, { responses, parameters, requestBody }]) => {
      if (responses) {
        const responsesType = Object.entries(responses).reduce(
          (schemas, [key, response]) => {
            // The original document may be missing the interface type
            schemas[key] = (response as OpenAPIV3.ReferenceObject).$ref
              ? { $ref: (response as OpenAPIV3.ReferenceObject).$ref }
              : (response as OpenAPIV3.ResponseObject).content?.[
                  'application/json'
                ]?.schema ?? (response as OpenAPIV3.ResponseObject).content;
            return schemas;
          },
          {},
        );

        data.paths[matchPath][key] = {
          responses: responsesType,
          parameters,
          requestBody: Object.values(
            (requestBody as OpenAPIV3.RequestBodyObject)?.content ?? {},
          )[0]?.schema,
        };
      }
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
};
