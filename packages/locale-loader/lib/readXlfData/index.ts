import fs from 'fs-extra';
import path from 'path';
import { reduce } from 'ramda';
import xml from 'xml-js';

interface ExtractXlfDataParams {
  locale: string;
  content: string;
}

interface TranslationUnit {
  value: string;
  source: string;
}

interface ReadXlfDataParams {
  localizationFolder: string;
  translationLocales: readonly string[];
}

function extractKey(str: string): string {
  return str.substring(1, str.length - 1);
}

function extractXlfData({
  locale,
  content,
}: ExtractXlfDataParams): Record<string, Record<string, TranslationUnit>> {
  const data = xml.xml2js(content, { compact: true }) as any;
  if (data.xliff && data.xliff.file) {
    const files = Array.isArray(data.xliff.file)
      ? data.xliff.file
      : [data.xliff.file];
    return reduce(
      (output, fileData: any) => {
        if (
          fileData._attributes &&
          fileData._attributes['target-language'] === locale &&
          fileData.body &&
          fileData.body['trans-unit']
        ) {
          const fileName = fileData._attributes.original;

          const units = Array.isArray(fileData.body['trans-unit'])
            ? fileData.body['trans-unit']
            : [fileData.body['trans-unit']];
          output[fileName] = reduce(
            (fileOutput, unit: any) => {
              if (
                unit._attributes &&
                unit._attributes.id &&
                unit.target &&
                unit.target._text
              ) {
                fileOutput[extractKey(unit._attributes.id)] = {
                  value: unit.target._text,
                  source: unit.source._text,
                };
              }
              return fileOutput;
            },
            {} as Record<string, TranslationUnit>,
            units,
          );
        }
        return output;
      },
      {} as Record<string, Record<string, TranslationUnit>>,
      files,
    );
  }
  return {};
}

export default function readXlfData({
  localizationFolder,
  translationLocales,
}: ReadXlfDataParams): Record<
  string,
  Record<string, Record<string, TranslationUnit>>
> {
  return reduce(
    (data, locale) => {
      const fileName = `${locale}.xlf`;
      const filePath = path.resolve(localizationFolder, fileName);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        data[locale] = extractXlfData({ locale, content });
      }
      return data;
    },
    {} as Record<string, Record<string, Record<string, TranslationUnit>>>,
    translationLocales,
  );
}
