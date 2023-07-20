import { parserString, compileString, errerMessage } from '../src/utils';

test('test `parserString`', () => {
  const object = parserString(`
    | accountTag   | isContactType | smsMessage          | sum          |
    | 'us'         | false         | {a:1}               | 1            |
    | 'uk'         | true          | {}                  | 1234         |
    | 'ca'         | null          | {b:{e:undefined}}   | -1.234       |
    | 'ca'         | undefined     | [{b:{e:undefined}}] | 0.1          |
  `);
  expect(object).toEqual([
    {
      smsMessage: { a: 1 },
      isContactType: false,
      accountTag: 'us',
      sum: 1,
    },
    {
      smsMessage: {},
      isContactType: true,
      accountTag: 'uk',
      sum: 1234,
    },
    {
      smsMessage: { b: { e: undefined } },
      isContactType: null,
      accountTag: 'ca',
      sum: -1.234,
    },
    {
      smsMessage: [{ b: { e: undefined } }],
      isContactType: undefined,
      accountTag: 'ca',
      sum: 0.1,
    },
  ]);
});

test('test `parserString` with Error', () => {
  const samples = [
    `
      | accountTag   | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca           | all         | xxx        | |
    `,
    `
      | accountTag  | | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca           | all         | xxx        |
    `,
    `
      | accountTag  | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca      ||   |  all         | aaa        |
    `,
    `
      | accountTag  | contactType | smsMessage |
      | us           | personal    | aaa        |
    `,
  ];
  for (const item of samples) {
    const index = samples.indexOf(item);
    try {
      parserString(item);
    } catch (e) {
      if (index < 2) {
        expect(e.toString().replace(/\s+/g, '')).toEqual(
          new Error(errerMessage).toString().replace(/\s+/g, ''),
        );
      } else {
        expect(e.toString()).toEqual(`ReferenceError: aaa is not defined`);
      }
    }
  }
});

test('test `compileString`', () => {
  expect(
    compileString('test ${a}', {
      a: '1',
    }),
  ).toEqual('test 1');
  expect(
    compileString('test ${a} test', {
      a: 1,
    }),
  ).toEqual('test 1 test');
  expect(
    compileString('test ${a} ${b} test', {
      a: "'1'",
      b: true,
    }),
  ).toEqual(`test '1' true test`);
  expect(
    compileString('test ${a} ${b} test', {
      a: {},
      b: [],
    }),
  ).toEqual(`test [object Object]  test`);
  try {
    compileString('test ${a} ${b} test', {});
  } catch (e) {
    expect(e.toString()).toEqual('ReferenceError: a is not defined');
  }
});
