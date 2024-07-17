import { Step, StepFunction, Props, StepType } from 'crius';

import { run, Context } from '../src';

test('base runner without return value', async () => {
  const result: string[] = [];
  class Test extends Step<{ foobar: string }> {
    run() {
      result.push(this.props.foobar);
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual(['foobar']);
});

test('function step', async () => {
  const result: string[] = [];
  const Bar: StepFunction<{ bar: string }> = async (props) => {
    await new Promise((resolve) => setTimeout(resolve));
    result.push(props.bar);
  };
  await run({
    key: 'Bar',
    props: {
      bar: 'bar',
    },
    step: Bar,
  });
  expect(result).toEqual(['bar']);
});

test('base runner with return function', async () => {
  const result: string[] = [];
  class Test extends Step<{ foobar: string }> {
    run() {
      return () => result.push(this.props.foobar);
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual(['foobar']);
});

test('base runner with return async function', async () => {
  const result: string[] = [];
  class Test extends Step<{ foobar: string; foo: string }> {
    run() {
      return async () => (
        await new Promise((resolve) => {
          setTimeout(resolve);
        }).then(() => {
          result.push(this.props.foo);
        }),
        result.push(this.props.foobar)
      );
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
      foo: 'foo',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual(['foo', 'foobar']);
});

test('base runner with return Unexpected Step Types', async () => {
  class Foo extends Step<{ foo: string }> {
    run() {
      return this.props.children;
    }
  }

  for (const value of ['1', 1, true, false, {}, [], null, undefined]) {
    const caseStep = {
      key: 'Test',
      props: {
        children: [],
        foo: 'foo',
      },
      step: Foo,
    };
    try {
      await run(caseStep);
    } catch (error) {
      expect(error).toEqual(new Error('Unexpected Error Crius Step Type.'));
    }
  }
});

test('base runner for crius fragment with crius step class', async () => {
  const result: string[] = [];
  class Foo extends Step<{ foo: string }> {
    run() {
      result.push(this.props.foo);
    }
  }

  const caseStep = {
    key: '',
    props: {
      children: [
        {
          key: 'Foo',
          props: { children: [], foo: 'foo' },
          step: Foo,
        },
      ],
    },
    step: undefined,
  };
  await run(caseStep as any);
  expect(result).toEqual(['foo']);
});

test('base runner for crius fragment with crius step function', async () => {
  const result: string[] = [];

  const Bar: StepFunction<{ bar: string }> = async (props) => {
    await new Promise((resolve) => setTimeout(resolve));
    result.push(props.bar);
  };

  const caseStep = {
    key: '',
    props: {
      children: [
        {
          key: 'Bar',
          props: { children: [], bar: 'bar' },
          step: Bar,
        },
      ],
    },
    step: undefined,
  };
  await run(caseStep as any);
  expect(result).toEqual(['bar']);
});

test('base runner for crius fragment hooks and context with crius step function', async () => {
  const result: string[] = [];
  const beforeEach = <P = {}, C = {}>(
    props: Props<P>,
    context: Context<P, C>,
    step: StepType<P, C>,
  ) => {
    result.push(`beforeEach ${step.name}`);
  };
  const afterEach = <P = {}, C = {}>(
    props: Props<P>,
    context: Context<P, C>,
    step: StepType<P, C>,
  ) => {
    result.push(`afterEach ${step.name}`);
  };
  const Bar: StepFunction<{}, { bar: string }> = async (props, context) => {
    await new Promise((resolve) => setTimeout(resolve));
    result.push(`Bar ${context.bar}`);
    return props.children;
  };

  class Foo extends Step<{}, { bar: string }> {
    run() {
      result.push(`Foo ${this.context.bar}`);
      return this.props.children;
    }
  }

  const caseStep = {
    key: '',
    props: {
      children: [
        {
          key: 'Bar',
          props: {
            children: [
              {
                key: 'Foo',
                props: { children: [] },
                step: Foo,
              },
            ],
          },
          step: Bar,
        },
      ],
    },
    step: undefined,
  };
  await run(
    caseStep as any,
    {
      bar: 'bar',
      beforeEach,
      afterEach,
    } as any,
  );
  expect(result).toEqual([
    'beforeEach Bar',
    'Bar bar',
    'beforeEach Foo',
    'Foo bar',
    'afterEach Foo',
    'afterEach Bar',
  ]);
});
