import { CriusElement, Step } from 'crius';

import { run } from '../src';
import { handleContext } from '../src/context';

test('base runner with step class for context', async () => {
  const result: string[] = [];
  class Foo extends Step<{ foo: string }, { bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  const caseStep = {
    key: 'Foo',
    props: {
      children: [],
      foo: '1',
    },
    step: Foo,
  };
  await run(caseStep, { bar: 'bar' });
  expect(result).toEqual(['bar']);
});

test('base runner with extended step class for context', async () => {
  const result: string[] = [];
  class Foo<P = {}, C = {}> extends Step<
    P & { foo: string },
    C & { bar: string }
  > {
    run() {}
  }

  class Foo1 extends Foo<{ foo1: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  await run(
    {
      key: 'Foo1',
      props: {
        foo1: '1',
        foo: '1',
        children: [],
      },
      step: Foo1,
    },
    { bar: 'bar' },
  );
  expect(result).toEqual(['bar']);
});

test('base runner with deep step class for context', async () => {
  const result: string[] = [];
  class Foo<P = {}, C = {}> extends Step<
    P & { foo: string },
    C & { bar: string }
  > {
    run() {}
  }

  class Foo1 extends Foo<{ foo1: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  class Bar extends Foo {
    run() {
      result.push(this.context.bar);
    }
  }

  await run(
    {
      key: 'Foo1',
      props: {
        children: [
          {
            key: 'Bar',
            props: { children: [] },
            step: Bar,
          },
        ],
        foo1: '1',
        foo: '1',
      },
      step: Foo1,
    },
    { bar: 'bar' },
  );
  expect(result).toEqual(['bar', 'bar']);
});

test('handleContext empty context', () => {
  const context = handleContext({});
  expect(Object.keys(context)).toEqual([]);
});

test('handleContext fix afterEach context', () => {
  const beforeEach = () => {};
  const afterEach = () => {};
  const context = handleContext({
    beforeEach,
  });
  expect(Object.keys(context)).toEqual(['beforeEach']);
  expect(context.beforeEach).toEqual(beforeEach);
  expect(context.afterEach).toBeFalsy();
  try {
    context.afterEach = afterEach;
  } catch (e) {
    expect(e.toString()).toEqual(
      `TypeError: Cannot assign to read only property 'afterEach' of object '#<Object>'`,
    );
    expect(context.afterEach).not.toEqual(afterEach);
  }
});

test('handleContext fix beforeEach context', () => {
  const beforeEach = () => {};
  const afterEach = () => {};
  const context = handleContext({
    afterEach,
  });
  expect(Object.keys(context)).toEqual(['afterEach']);
  expect(context.afterEach).toEqual(afterEach);
  expect(context.beforeEach).toBeFalsy();
  try {
    context.beforeEach = beforeEach;
  } catch (e) {
    expect(e.toString()).toEqual(
      `TypeError: Cannot assign to read only property 'beforeEach' of object '#<Object>'`,
    );
    expect(context.beforeEach).not.toEqual(beforeEach);
  }
});

test('handleContext fix beforeEach &  afterEach context', () => {
  const beforeEach = jest.fn((props, context, step) => {});
  const afterEach = jest.fn((props, context, step) => {});
  const context = handleContext({
    beforeEach,
    afterEach,
  });
  expect(Object.keys(context)).toEqual(['beforeEach', 'afterEach']);
  class Foo extends Step {
    run() {}
  }
  const step1 = () => {};
  const step2 = new Foo({}, {});
  context.beforeEach!({ children: [] }, {}, step1);
  context.afterEach!({ children: [] }, {}, step2);
  expect(beforeEach.mock.calls[0]).toEqual([{ children: [] }, {}, step1]);
  expect(afterEach.mock.calls[0]).toEqual([{ children: [] }, {}, step2]);
});
