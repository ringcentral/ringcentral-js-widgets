import generate from '@babel/generator';
import { parse } from '@babel/parser';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import fs from 'fs-extra';
import path from 'path';
// @ts-ignore
import prettier from 'prettier';

import defaultConfig from '../defaultConfig';
import isLocaleFile, {
  getLocaleFromFilePath,
  replaceLocaleInFilePath,
} from '../isLocaleFile';
import parseLocaleFile from '../parseLocaleFile';

interface ImportLocaleFileParams {
  targetLocale: string;
  targetRelativePath: string;
  sourceFolder?: string;
  sourceLocale?: string;
  disableEslint?: boolean;
  rawData?: Record<string, any>;
}

interface TranslationEntry {
  hasSource?: boolean;
  key: string;
  source?: any;
  value: any;
}

function getAnnotations(source: [string, any][]) {
  return source
    .map(
      ([key, value]) =>
        `// @key: @#@${JSON.stringify(key)}@#@ @source: @#@${JSON.stringify(
          value,
        )}@#@`,
    )
    .join('\n');
}

function normalizeRawData(rawData: Record<string, any> = {}) {
  const output = new Map<string, TranslationEntry>();

  Object.keys(rawData).forEach((key) => {
    const entry = rawData[key];

    if (entry === undefined) {
      return;
    }

    if (
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      ('value' in entry || 'source' in entry)
    ) {
      if (entry.value !== undefined) {
        output.set(key, {
          hasSource: 'source' in entry,
          key,
          source: entry.source,
          value: entry.value,
        });
      }
      return;
    }

    output.set(key, {
      hasSource: false,
      key,
      value: entry,
    });
  });

  return output;
}

function resolveLocalePaths({
  sourceFolder,
  targetRelativePath,
  targetLocale,
  sourceLocale,
}: Required<
  Pick<ImportLocaleFileParams, 'sourceFolder' | 'targetRelativePath'>
> &
  Pick<ImportLocaleFileParams, 'sourceLocale'> & {
    targetLocale: string;
  }) {
  const absoluteInputPath = path.resolve(sourceFolder, targetRelativePath);
  const fileLocale = getLocaleFromFilePath(targetRelativePath);

  if (!fileLocale) {
    throw new Error(
      `options.targetRelativePath must be a valid locale file: '${targetRelativePath}'`,
    );
  }

  const formattedTargetLocale = formatLocale(targetLocale);
  const formattedSourceLocale = formatLocale(
    sourceLocale ||
      (fileLocale === formattedTargetLocale
        ? defaultConfig.sourceLocale
        : fileLocale),
  );

  return {
    sourceLocale: formattedSourceLocale,
    sourcePath:
      fileLocale === formattedSourceLocale
        ? absoluteInputPath
        : replaceLocaleInFilePath(absoluteInputPath, formattedSourceLocale),
    targetPath:
      fileLocale === formattedTargetLocale
        ? absoluteInputPath
        : replaceLocaleInFilePath(absoluteInputPath, formattedTargetLocale),
  };
}

export default async function importLocaleFile({
  targetLocale,
  targetRelativePath,
  sourceFolder = defaultConfig.sourceFolder,
  sourceLocale,
  disableEslint = true,
  rawData = {},
}: ImportLocaleFileParams) {
  if (!targetRelativePath) {
    throw new Error('options.targetRelativePath is missing');
  }

  const { sourceLocale: resolvedSourceLocale, sourcePath, targetPath } =
    resolveLocalePaths({
      sourceFolder,
      sourceLocale,
      targetRelativePath,
      targetLocale,
    });

  if (!isLocaleFile(sourcePath, resolvedSourceLocale)) {
    throw new Error(`'${sourcePath}' is not a valid '${resolvedSourceLocale}' locale file`);
  }
  if (!(await fs.pathExists(sourcePath))) {
    throw new Error(`Source locale file not found: '${sourcePath}'`);
  }

  const sourceData = parseLocaleFile(await fs.readFile(sourcePath, 'utf8'));
  const targetData =
    (await fs.pathExists(targetPath)) && isLocaleFile(targetPath, targetLocale)
      ? parseLocaleFile(await fs.readFile(targetPath, 'utf8'))
      : {
          data: new Map<string, TranslationEntry>(),
        };

  const cleanedData = new Map<string, TranslationEntry>();
  targetData.data.forEach((value: TranslationEntry, key: string) => {
    if (
      sourceData.data.has(key) &&
      sourceData.data.get(key)!.value === value.source
    ) {
      cleanedData.set(key, value);
    }
  });

  const importedData = normalizeRawData(rawData);
  importedData.forEach((value, key) => {
    const sourceEntry = sourceData.data.get(key);
    if (!sourceEntry) {
      return;
    }
    if (value.hasSource && value.source !== sourceEntry.value) {
      return;
    }
    cleanedData.set(key, {
      hasSource: true,
      key,
      source: sourceEntry.value,
      value: value.value,
    });
  });

  const ast = parse(sourceData.content, {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  const annotations = new Map<string, any>();

  function updateObjectExpression(node: any) {
    const properties = node.properties.filter((prop: any) => {
      const wrapInBracket =
        prop.key.type === 'MemberExpression' ||
        prop.key.type === 'TemplateLiteral';
      const key = wrapInBracket
        ? `[${generate(prop.key).code}]`
        : generate(prop.key).code;
      const entry = cleanedData.get(key);
      if (entry && entry.value !== undefined) {
        prop.value = {
          type: 'StringLiteral',
          value: entry.value,
          extra: {
            raw: JSON.stringify(entry.value),
            rawValue: entry.value,
          },
        };
        annotations.set(key, sourceData.data.get(key)!.value);
        return true;
      }
      return false;
    });

    node.properties = properties;
  }

  const defaultExport = ast.program.body.find(
    (item: any) => item.type === 'ExportDefaultDeclaration',
  ) as any;

  if (defaultExport) {
    if (defaultExport.declaration.type === 'ObjectExpression') {
      updateObjectExpression(defaultExport.declaration);
    } else if (defaultExport.declaration.type === 'TSAsExpression') {
      const nested = defaultExport.declaration.expression;
      if (nested.type === 'ObjectExpression') {
        updateObjectExpression(nested);
      }
    }
  }

  const eslint = disableEslint ? '/* eslint-disable */\n' : '';
  const { code } = generate(ast);
  const output = prettier.format(`${eslint}${code}\n\n${getAnnotations(
    Array.from(annotations.entries()),
  )}\n`, {
    parser: 'typescript',
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    bracketSameLine: false,
    endOfLine: 'auto',
  });

  await fs.ensureDir(path.dirname(targetPath));
  await fs.writeFile(targetPath, output);
}
