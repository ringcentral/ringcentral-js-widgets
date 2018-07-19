import dedent from 'dedent';
import { transform } from 'babel-settings';
import extractAnnotations from '.';


describe('extractAnnotations', () => {
  const sampleContent = dedent`
    const keyMap = {
      index: 'finger',
    };
    export default {
      whisky: 'vault',
      modern: 'rogue',
      [keyMap.index]: 'pointing'
    };

    // @key: @#@"whisky"@#@ @source: @#@"wizard"@#@
    // @key: @#@"modern"@#@ @source: @#@"rogue"@#@
  `;

  test('extraction', () => {
    expect(() => extractAnnotations(sampleContent)).not.toThrow();
  });
  describe('parsed data', () => {
    const { content, annotations } = extractAnnotations(sampleContent);

    test('should return content without annotations', () => {
      expect(eval(transform(content))).toEqual(eval(transform(sampleContent)));
      expect(/\/\/ @key:/.test(content)).toBe(false);
    });
    test('should return all annotations', () => {
      expect(annotations instanceof Map).toBe(true);
      expect(annotations.get('whisky')).toBe('wizard');
      expect(annotations.get('modern')).toBe('rogue');
    });
  });
});
