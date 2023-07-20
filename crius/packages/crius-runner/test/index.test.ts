import Crius, { Step } from 'crius';
import { run } from '../src';

test('test run for step', async () => {
  const result: string[] = [];
  class Foo extends Step<{ foo: string }> {
    run() {
      result.push(this.props.foo);
    }
  }
  class Bar extends Step<{ bar: string }> {
    run() {
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const dosomething = async () =>
    void (await new Promise((resolve) => setTimeout(resolve)));
  // Test raw JSX code:
  // <Bar>
  //   <Foo/>
  //   {dosomething}
  // </Bar>
  const caseStep = {
    key: 'Bar',
    props: {
      children: [
        {
          key: 'Foo',
          props: { children: [], foo: 'foo' },
          step: Foo,
        },
        dosomething,
      ],
      bar: 'bar',
    },
    step: Bar,
  };
  await run(caseStep);
  expect(result).toEqual(['bar', 'foo']);
});
