import { Step, StepFunction, createFlow } from '../src';

test('base flow for Step class with default props', () => {
  class Foo extends Step<{ bar?: number }> {
    run() {}
  }
  Foo.prototype.defaultProps = {
    bar: 1,
  };
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 1, children: [] },
    step: Foo,
  });
});

test('base flow for Step class with overriding props', () => {
  class Foo extends Step<{ bar?: number }> {
    run() {}

    get defaultProps() {
      return {
        bar: 1,
      };
    }
  }
  const foo = createFlow(Foo, { bar: 2 });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 2, children: [] },
    step: Foo,
  });
});

test('base flow for Step class with `undefined` overriding props', () => {
  class Foo extends Step<{ bar?: number }> {
    run() {}

    get defaultProps() {
      return {
        bar: 1,
      };
    }
  }
  const foo = createFlow(Foo, { bar: undefined });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: undefined, children: [] },
    step: Foo,
  });
});

test('base flow for Step function with default props', () => {
  const Foo: StepFunction<{ bar?: number }> = () => {};
  Foo.defaultProps = {
    bar: 1,
  };
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 1, children: [] },
    step: Foo,
  });
});

test('base flow for Step function with overriding props', () => {
  const Foo: StepFunction<{ bar?: number }> = () => {};
  Foo.defaultProps = {
    bar: 1,
  };
  const foo = createFlow(Foo, { bar: 2 });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 2, children: [] },
    step: Foo,
  });
});

test('base flow for Step function with `undefined` overriding props', () => {
  const Foo: StepFunction<{ bar?: number }> = () => {};
  Foo.defaultProps = {
    bar: 1,
  };
  const foo = createFlow(Foo, { bar: undefined });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: undefined, children: [] },
    step: Foo,
  });
});
