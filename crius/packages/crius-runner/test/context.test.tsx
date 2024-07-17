import { Step, StepFunction } from 'crius';

import criusRunner from '../src';

test('runner deep step with JSX', async () => {
  const result: string[] = [];
  class StepWithContext<P = {}, C = {}> extends Step<P, C & { bar: string }> {
    run() {}
  }

  interface StepFunctionWithContext<P = {}, C = {}>
    extends StepFunction<P, C & { bar: string }> {}

  const FooBar: StepFunctionWithContext<{ fooBar: string }> = (
    props,
    context,
  ) => {
    result.push(props.fooBar, context.bar);
    return <TestBar />;
  };
  class TestBar1 extends StepWithContext {
    run() {
      result.push(this.context.bar);
    }
  }
  class TestBar extends StepWithContext {
    run() {
      result.push(this.context.bar);
      return <TestBar1 />;
    }
  }
  class Foo extends StepWithContext<{ foo: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.foo);
      return this.props.children;
    }
  }
  class Bar extends StepWithContext<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return (
        <Foo foo="foo">
          {async () => result.push('fooBar0')}
          <FooBar fooBar="fooBar1" />
        </Foo>
      );
    }
  }
  await criusRunner.run(<Bar bar="bar" />, {
    bar: 'bar',
  });
  expect(result).toEqual([
    'bar',
    'foo',
    'fooBar0',
    'fooBar1',
    'bar',
    'bar',
    'bar',
  ]);
});
