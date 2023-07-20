import { Step } from '../src';

test('instance Step', () => {
  class Foo extends Step {
    run() {}
  }
  const foo = new Foo(
    {
      children: [],
    },
    {},
  );
  expect(foo).toEqual({
    props: { children: [] },
    context: {},
  });
});
