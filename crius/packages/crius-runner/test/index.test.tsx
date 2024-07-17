import Crius, { StepFunction } from 'crius';

import { run } from '../src';

test('runner with JSX', async () => {
  const result: string[] = [];
  class Foo extends Crius.Step<{ foo: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve, 100));
      result.push(this.props.foo);
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const FooBar: StepFunction<{ fooBar: string }, { aa: string }> = async (
    props,
  ) => void result.push(props.fooBar);
  await run(
    <Bar bar="bar">
      <Foo foo="foo" />
      <FooBar fooBar="fooBar" />
    </Bar>,
  );
  expect(result).toEqual(['bar', 'foo', 'fooBar']);
});

test('runner with JSX fragment', async () => {
  const result: string[] = [];
  class Foo extends Crius.Step<{ foo: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve, 100));
      result.push(this.props.foo);
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      const A = (
        <>
          {this.props.children}
          <>
            {async () => {
              await new Promise((resolve) => setTimeout(resolve));
              result.push(this.props.bar);
            }}
            {this.props.children}
            {this.props.children}
          </>
        </>
      );
      return A;
    }
  }
  await run(
    <Bar bar="bar">
      <Foo foo="foo" />
    </Bar>,
  );
  expect(result).toEqual(['bar', 'foo', 'bar', 'foo', 'foo']);
});

test('runner with JSX', async () => {
  const result: string[] = [];
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const FooBar: StepFunction<{ fooBar: string }> = (props) =>
    void result.push(props.fooBar);
  await run(
    <Bar bar="bar">
      {async () => result.push('foo')}
      <FooBar fooBar="fooBar" />
    </Bar>,
  );
  expect(result).toEqual(['bar', 'foo', 'fooBar']);
});

test('runner fragment with JSX', async () => {
  const result: string[] = [];
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const FooBar: StepFunction<{ fooBar: string }> = (props) =>
    void result.push(props.fooBar);
  const testcase = (
    <>
      <Bar bar="bar">
        <FooBar fooBar="fooBar1" />
      </Bar>
      <>
        {async () => {
          await new Promise((resolve) => setTimeout(resolve));
          result.push('test');
        }}
        <FooBar fooBar="fooBar2" />
      </>
      <>
        <>
          {async () => {
            await new Promise((resolve) => setTimeout(resolve));
            await run(<FooBar fooBar="fooBar3" />);
          }}
        </>
      </>
    </>
  );
  await run(testcase);
  expect(result).toEqual(['bar', 'fooBar1', 'test', 'fooBar2', 'fooBar3']);
});

test('runner deep step with JSX', async () => {
  const result: string[] = [];
  const FooBar: StepFunction<{ fooBar: string }> = (props) =>
    void result.push(props.fooBar);
  class Foo extends Crius.Step<{ foo: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.foo);
      return this.props.children;
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
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
  await run(<Bar bar="bar" />);
  expect(result).toEqual(['bar', 'foo', 'fooBar0', 'fooBar1']);
});

test('runner deep step with function child', async () => {
  const result: string[] = [];
  const FooBar: StepFunction<{ fooBar: string }> = (props) =>
    void result.push(props.fooBar);
  class Foo extends Crius.Step<{ foo: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.foo);
      return this.props.children;
    }
  }

  const FooBar0 = (options: { value?: string }) =>
    result.push(options.value ?? 'fooBar0');
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return (
        <Foo foo="foo">
          {async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return <FooBar0 value="test" />;
          }}
          {await (async () => {
            return <FooBar0 />;
          })()}
          <FooBar fooBar="fooBar1" />
        </Foo>
      );
    }
  }
  await run(<Bar bar="bar" />);
  expect(result).toEqual(['bar', 'foo', 'test', 'fooBar0', 'fooBar1']);
});
