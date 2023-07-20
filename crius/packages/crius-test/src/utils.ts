export function compileString(template: string, params: object): string {
  const renderTemplate = new Function(
    ...Object.keys(params),
    `return \`${template}\``,
  );
  return renderTemplate(...Object.values(params));
}

export const errerMessage = `
  Unexpected string formats, for example:
  \`
  | fooField  | barField  |
  | 'test_a'  | true      |
  | 'test_b'  | false     |
  \`
  Parse to:
  [
    {
      fooField: 'test_a',
      barField: true,
    },
    {
      fooField: 'test_b',
      barField: false,
    }
  ]
`;

export function parserString(text: string): Array<{ [K: string]: string }> {
  const rawArray = text
    .split('|')
    .map((text) => (typeof text === 'string' ? text.trim() : text));
  const dataArray = rawArray.filter((i) => i);
  const length = rawArray.length - dataArray.length - 1;
  const keyLength = dataArray.length / length;
  const arr: Array<{ [K: string]: string }> = [];
  for (let l = length; l-- > 1; ) {
    arr[l - 1] = {};
    for (let k = keyLength; k-- > 0; ) {
      if (typeof dataArray[k] === 'undefined') {
        throw new Error(errerMessage);
      }
      let value: any;
      try {
        value = eval(`(${dataArray[l * keyLength + k]})`);
      } catch (e) {
        console.error(`Eval Error: (${dataArray[l * keyLength + k]})`);
        throw e;
      }
      arr[l - 1][dataArray[k]] = value;
    }
  }
  return arr;
}
