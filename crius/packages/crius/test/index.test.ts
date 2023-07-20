import { Step, createFlow } from '../src';

test('base import Step', () => {
  class Foo extends Step {
    run() {}
  }
  class Bar extends Step {
    run() {
      return createFlow(Foo, {});
    }
  }
  const bar = createFlow(Bar, {});
  expect(bar).toEqual({
    key: 'Bar',
    props: { children: [] },
    step: Bar,
  });
});

test('base composition Step', () => {
  class Foo extends Step<{ test: number }> {
    run() {}
  }
  class Bar extends Step<{ test?: number }> {
    run() {}
  }
  const doSomething = async () =>
    void (await new Promise((resolve) => setTimeout(resolve)));
  const bar = createFlow(
    Bar,
    { test: 1 },
    createFlow(Foo, { test: 2 }),
    doSomething,
  );
  expect(bar).toEqual({
    key: 'Bar',
    props: {
      children: [
        {
          key: 'Foo',
          props: { children: [], test: 2 },
          step: Foo,
        },
        doSomething,
      ],
      test: 1,
    },
    step: Bar,
  });
});
