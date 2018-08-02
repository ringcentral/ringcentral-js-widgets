import { parse } from 'babylon';
import { find, forEach } from 'ramda';
import generate from 'babel-generator';
import extractAnnotations from '../extractAnnotations';

/* eslint { no-eval: 0 } */
export default function parseLocaleFile(rawContent) {
  const data = new Map();
  const { content, annotations } = extractAnnotations(rawContent);
  const ast = parse(content, { sourceType: 'module' });

  const defaultExport = find(
    item => item.type === 'ExportDefaultDeclaration',
    ast.program.body,
  );
  if (defaultExport && defaultExport.declaration.type === 'ObjectExpression') {
    forEach((prop) => {
      // get raw key from source content
      let key = content.substring(prop.key.start, prop.key.end);
      // wrap key in [] if needed
      if (
        prop.key.type !== 'StringLiteral' &&
        prop.key.type !== 'Identifier' &&
        prop.key.type !== 'NumericLiteral'
      ) {
        key = `[${key}]`;
      }
      // evaluate value to convert template literals or string concats into single string literal
      const value = eval(generate(prop.value).code);
      const source = annotations.get(key);

      data.set(
        key,
        {
          key,
          value,
          source
        }
      );
    }, defaultExport.declaration.properties);
  }

  return {
    content,
    annotations,
    ast,
    data,
  };
}
