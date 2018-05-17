import xml from 'xml-js';
import fs from 'fs-extra';
import path from 'path';
import { reduce } from 'ramda';

function extractKey(str) {
  return str.substring(1, str.length - 1);
}

function extractXlfData({ locale, content }) {
  const data = xml.xml2js(content, { compact: true });
  if (
    data.xliff &&
    data.xliff.file
  ) {
    const files = Array.isArray(data.xliff.file) ?
      data.xliff.file :
      [data.xliff.file];
    return reduce(
      (output, fileData) => {
        if (
          fileData._attributes &&
          fileData._attributes['target-language'] === locale &&
          fileData.body &&
          fileData.body['trans-unit']
        ) {
          const fileName = fileData._attributes.original;

          const units = Array.isArray(fileData.body['trans-unit']) ?
            fileData.body['trans-unit'] :
            [fileData.body['trans-unit']];
          output[fileName] = reduce(
            (fileOutput, unit) => {
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
            {},
            units,
          );
        }
        return output;
      },
      {},
      files,
    );
  }
  return {};
}


export default function readXlfData({
  localizationFolder,
  supportedLocales,
}) {
  return reduce(
    (data, locale) => {
      const fileName = `${locale}.xlf`;
      const filePath = path.resolve(localizationFolder, fileName);
      if ((fs.existsSync(filePath)) && (fs.statSync(filePath)).isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        data[locale] = extractXlfData({ locale, content });
      }
      return data;
    },
    {},
    supportedLocales
  );
}
