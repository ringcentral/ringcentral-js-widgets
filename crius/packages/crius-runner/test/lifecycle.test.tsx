import Crius from 'crius';

import { run } from '../src';

test('runner lifecycle with JSX', async () => {
  const result: string[] = [];
  class Foo extends Crius.Step<{ foo: string }> {
    async stepWillStart() {
      result.push('Foo stepWillStart');
    }

    async stepDidEnd() {
      result.push('Foo stepDidEnd');
    }

    async run() {
      await new Promise((resolve) => setTimeout(resolve, 100));
      result.push(this.props.foo);
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
    async stepWillStart() {
      result.push('Bar stepWillStart');
    }

    async stepDidEnd() {
      result.push('Bar stepDidEnd');
    }

    async run() {
      await new Promise((resolve) => setTimeout(resolve));
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  await run(
    <Bar bar="bar">
      <Foo foo="foo" />
    </Bar>,
  );
  expect(result).toEqual([
    'Bar stepWillStart',
    'bar',
    'Foo stepWillStart',
    'foo',
    'Foo stepDidEnd',
    'Bar stepDidEnd',
  ]);
});
