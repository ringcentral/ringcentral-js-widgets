/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StepFunction } from '../src';
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '../src';

test('base builder with examples', async () => {
  const jestFn = jest.fn();
  const runner = async () => {
    const Login: StepFunction<any> = (props) => jestFn('Login', props.foo);
    const FooBar: StepFunction<any> = (props) => jestFn('FooBar', props.foo);
    const Navigate: StepFunction<any> = (props) =>
      jestFn('Navigate', props.foo);
    const AddTodo: StepFunction<any> = (props) => jestFn('AddTodo', props.foo);
    const CheckTodo: StepFunction<any> = (props) => {
      jestFn('CheckTodo', props.foo);
    };

    let result: Promise<void>;

    @autorun((_: string, fn: () => Promise<void>) => {
      result = fn();
    })
    @title('Test user add todo item')
    class TestTodoList extends Step {
      @examples(`
        | foo   |
        | 'bar' |
      `)
      run() {
        return (
          <Scenario desc="user login website" action={[Login, <FooBar />]}>
            <Given desc="user navigate to list page" action={[Navigate]} />
            <When
              desc='user type "read book" in input field and click "add" button'
              action={AddTodo}
            />
            <Then
              desc='user should see "read book" todo item in todo list'
              action={<CheckTodo />}
            />
          </Scenario>
        );
      }
    }

    await result!;
  };

  await runner();
  expect(jestFn.mock.calls).toEqual([
    ['Login', 'bar'],
    ['FooBar', undefined],
    ['Navigate', 'bar'],
    ['AddTodo', 'bar'],
    ['CheckTodo', undefined],
  ]);
});

test('base builder with error action type', () => {
  @autorun((_: string, fn: () => Promise<void>) => {
    fn().catch((e: Error) => {
      expect(e.toString()).toContain(`it's not a valid crius step`);
    });
  })
  @title('Test user add todo item')
  class TestTodoList extends Step {
    run() {
      return (
        <Scenario desc="user login website" action={[[Login]]}>
          <Given desc="user navigate to list page" action={Navigate} />
          <When
            desc='user type "read book" in input field and click "add" button'
            action={AddTodo}
          />
          <Then
            desc='user should see "read book" todo item in todo list'
            action={[CheckTodo]}
          />
        </Scenario>
      );
    }
  }

  const Login = () => {};
  const Navigate = () => {};
  const AddTodo = () => {};
  const CheckTodo = () => {};
});
