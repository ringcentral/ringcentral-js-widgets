import {
  autorun,
  title,
  examples,
  beforeEach,
  afterEach,
  plugins,
  params,
} from '../src/decorators';
import { Step } from '../src/step';

test('test @autorun', async () => {
  const testFn = jest.fn();
  const _test = (title: string, callback: (...args: any[]) => void) =>
    callback();
  await new Promise((resolve) => {
    autorun(_test)(
      class extends Step {
        run() {
          testFn();
          resolve();
        }
      },
    );
  }).then(() => {
    expect(testFn.mock.calls.length).toBe(1);
  });
});

test('test @title', () => {
  @title('bar title')
  class Bar extends Step {}

  expect(Bar.title).toEqual('bar title');
  for (const item of [null, undefined]) {
    try {
      @title(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual('Error: Test case title is required.');
    }
  }
});

test('test @examples', () => {
  class Bar extends Step {
    @(examples`
      | accountTag     | contactType   | smsMessage   |
      | 'us'           | false         | 1            |
    `)
    run() {}
  }

  expect(Bar.examples).toEqual([
    {
      accountTag: 'us',
      contactType: false,
      smsMessage: 1,
    },
  ]);

  class Foo extends Step {
    @examples(`
    | accountTag | contactType   | smsMessage |
    | ['2']      | {a:undefined} | null       |
  `)
    run() {}
  }

  expect(Foo.examples).toEqual([
    {
      accountTag: ['2'],
      contactType: { a: undefined },
      smsMessage: null,
    },
  ]);

  class FooBar extends Step {
    @examples([
      {
        accountTag: 'us',
        contactType: 'personal',
        smsMessage: 'aaa',
      },
    ])
    run() {}
  }

  expect(FooBar.examples).toEqual([
    {
      accountTag: 'us',
      contactType: 'personal',
      smsMessage: 'aaa',
    },
  ]);

  for (const item of [
    undefined,
    null,
    1,
    true,
    [null],
    [undefined],
    [1],
    [true],
  ]) {
    try {
      class FooBar extends Step {
        @examples(item as any)
        run() {}
      }
    } catch (e) {
      expect(e.toString()).toEqual(
        'Error: "@examples" argument error, it must be an object or a string.',
      );
    }
  }
});

test('test @beforeEach', () => {
  const callback = (props: any, context: any, step: any) => {};
  @beforeEach(callback)
  class FooBar<P = {}, C = {}> extends Step<P, C> {}

  expect(FooBar.beforeEach).toEqual(callback);

  for (const item of [undefined, null, 1, true, '1', {}, []]) {
    try {
      @beforeEach(item as any)
      class FooBar<P = {}, C = {}> extends Step<P, C> {}
    } catch (e) {
      expect(e.toString()).toEqual(
        'Error: "@beforeEach" argument error, it must be a function.',
      );
    }
  }
});

test('test @afterEach', () => {
  const callback = (props: any, context: any, step: any) => {};
  @afterEach(callback)
  class FooBar<P = {}, C = {}> extends Step<P, C> {}

  expect(FooBar.afterEach).toEqual(callback);

  for (const item of [undefined, null, 1, true, '1', {}, []]) {
    try {
      @afterEach(item as any)
      class FooBar<P = {}, C = {}> extends Step<P, C> {}
    } catch (e) {
      expect(e.toString()).toEqual(
        'Error: "@afterEach" argument error, it must be a function.',
      );
    }
  }
});

test('test @plugins', () => {
  const callback = (props: any, context: any, step: any) => {};
  @plugins([
    {
      beforeEach: callback,
      afterEach: callback,
    },
  ])
  class FooBar<P = {}, C = {}> extends Step<P, C> {}

  expect(FooBar.plugins![0].beforeEach).toEqual(callback);
  expect(FooBar.plugins![0].afterEach).toEqual(callback);
});

test('test @params', () => {
  const callback = (paramsList: any[]) => paramsList;
  @params(callback)
  class Bar extends Step {}

  expect(Bar.handleParams).toEqual(callback);
  for (const item of [null, undefined, 1, {}, [], true, '', 'foo']) {
    try {
      @params(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual(
        'Error: "@params" argument error, it must be a function.',
      );
    }
  }
});
