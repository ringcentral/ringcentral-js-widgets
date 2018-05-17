import dedent from 'dedent';
import parseLocaleFile from '.';
import extractAnnotations from '../extractAnnotations';

describe('parseLocaleFile', () => {
  const source = dedent`
      const keyMap = {
        index: 'finger',
      };
      export default {
        whisky: 'vault',
        modern: 'rogue',
        'long-name': 'Sabastian',
        concat: 'item1' + ' item2',
        template: \`hello
        world\`,
        [keyMap.index]: 'pointing'
      };

      // @key: @#@"whisky"@#@ @source: @#@"wizard"@#@
      // @key: @#@"modern"@#@ @source: @#@"rogue"@#@
    `;
  test('parsing', () => {
    expect(() => parseLocaleFile(source)).not.toThrow();
  });
  describe('parsed data', () => {
    const parsedData = parseLocaleFile(source);
    const { content, annotations } = extractAnnotations(source);
    test('should contain content without annotations', () => {
      expect(parsedData.content).toBe(content);
    });
    test('should contain ast', () => {
      expect(parsedData.ast).toBeTruthy();
    });
    test('should contain data', () => {
      expect(parsedData.data instanceof Map).toBe(true);
      expect(typeof parsedData.data.get('whisky')).toBe('object');
      expect(parsedData.data.get('whisky').key).toBe('whisky');
      expect(parsedData.data.get('whisky').value).toBe('vault');
      expect(parsedData.data.get('whisky').source).toBe('wizard');
      expect(typeof parsedData.data.get('[keyMap.index]')).toBe('object');
      expect(parsedData.data.get('[keyMap.index]').key).toBe('[keyMap.index]');
      expect(parsedData.data.get('[keyMap.index]').value).toBe('pointing');
      expect(parsedData.data.get('[keyMap.index]').source).toBe(undefined);
    });
    test('should contain annotations', () => {
      expect(parsedData.annotations).toEqual(annotations);
    });
  });
});
