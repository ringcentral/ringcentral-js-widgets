import {
  Step as BaseStep,
  autorun,
  title,
  examples,
  Scenario,
  Given,
  When,
  Then,
  afterEach,
  beforeEach,
  plugins,
  StepFunction,
} from '../src';
import { params } from '../src/decorators';

const result: string[] = [];
@beforeEach((props, context, step) => {
  result.push(step.name, 'beforeEach');
})
@afterEach((props, context, step) => {
  result.push(step.name, 'afterEach');
})
@plugins<{}, { s: string }>([
  {
    beforeEach(props, context, step) {
      result.push(step.name, 'plugins beforeEach');
    },
    afterEach(props, context, step) {
      result.push(step.name, 'plugins afterEach');
    },
  },
  {
    beforeEach(props, context, step) {
      result.push(step.name, 'plugins beforeEach');
    },
    afterEach(props, context, step) {
      result.push(step.name, 'plugins afterEach');
    },
  },
])
class Step<P = {}, C = {}> extends BaseStep<
  P,
  C & { s: string; readonly a: number }
> {
  static get context(): { s: string; readonly a: number } {
    return {
      s: '1',
      get a() {
        return 2;
      },
    };
  }
}

const mockTest = async (title: string, cb: (...args: any[]) => void) =>
  await cb();
@autorun(test)
@params((params) => params.slice(0, 1))
@title('Send ${smsMessage} message on compose text page')
class SendSMS1 extends Step {
  async stepDidEnd() {
    expect(result).toEqual([
      'SendSMS1',
      'beforeEach',
      'SendSMS1',
      'plugins beforeEach',
      'SendSMS1',
      'plugins beforeEach',
      'Scenario',
      'beforeEach',
      'Scenario',
      'plugins beforeEach',
      'Scenario',
      'plugins beforeEach',
      'EntryPoint',
      'beforeEach',
      'EntryPoint',
      'plugins beforeEach',
      'EntryPoint',
      'plugins beforeEach',
      'Prepare',
      'beforeEach',
      'Prepare',
      'plugins beforeEach',
      'Prepare',
      'plugins beforeEach',
      'run Prepare',
      'Prepare',
      'plugins afterEach',
      'Prepare',
      'plugins afterEach',
      'Prepare',
      'afterEach',
      'Entry',
      'beforeEach',
      'Entry',
      'plugins beforeEach',
      'Entry',
      'plugins beforeEach',
      'Entry',
      'plugins afterEach',
      'Entry',
      'plugins afterEach',
      'Entry',
      'afterEach',
      'UT',
      'beforeEach',
      'UT',
      'plugins beforeEach',
      'UT',
      'plugins beforeEach',
      'run UT 1',
      'run UT 2',
      'UT',
      'plugins afterEach',
      'UT',
      'plugins afterEach',
      'UT',
      'afterEach',
      'IT',
      'beforeEach',
      'IT',
      'plugins beforeEach',
      'IT',
      'plugins beforeEach',
      'run IT',
      'IT',
      'plugins afterEach',
      'IT',
      'plugins afterEach',
      'IT',
      'afterEach',
      'Login',
      'beforeEach',
      'Login',
      'plugins beforeEach',
      'Login',
      'plugins beforeEach',
      'Send aaa message on compose text page',
      'run Login',
      'Login',
      'plugins afterEach',
      'Login',
      'plugins afterEach',
      'Login',
      'afterEach',
      'EntryPoint',
      'plugins afterEach',
      'EntryPoint',
      'plugins afterEach',
      'EntryPoint',
      'afterEach',
      'Given',
      'beforeEach',
      'Given',
      'plugins beforeEach',
      'Given',
      'plugins beforeEach',
      'NavigateToComposeText',
      'beforeEach',
      'NavigateToComposeText',
      'plugins beforeEach',
      'NavigateToComposeText',
      'plugins beforeEach',
      'NavigateToComposeText',
      'plugins afterEach',
      'NavigateToComposeText',
      'plugins afterEach',
      'NavigateToComposeText',
      'afterEach',
      'Given',
      'plugins afterEach',
      'Given',
      'plugins afterEach',
      'Given',
      'afterEach',
      'When',
      'beforeEach',
      'When',
      'plugins beforeEach',
      'When',
      'plugins beforeEach',
      'TextSmsMessage',
      'beforeEach',
      'TextSmsMessage',
      'plugins beforeEach',
      'TextSmsMessage',
      'plugins beforeEach',
      'run CheckSmsMessage TextSmsMessageProps',
      'TextSmsMessage',
      'plugins afterEach',
      'TextSmsMessage',
      'plugins afterEach',
      'TextSmsMessage',
      'afterEach',
      'When',
      'plugins afterEach',
      'When',
      'plugins afterEach',
      'When',
      'afterEach',
      'Then',
      'beforeEach',
      'Then',
      'plugins beforeEach',
      'Then',
      'plugins beforeEach',
      'CheckSmsMessage',
      'beforeEach',
      'CheckSmsMessage',
      'plugins beforeEach',
      'CheckSmsMessage',
      'plugins beforeEach',
      'run CheckSmsMessage test',
      'CheckSmsMessage',
      'plugins afterEach',
      'CheckSmsMessage',
      'plugins afterEach',
      'CheckSmsMessage',
      'afterEach',
      'Then',
      'plugins afterEach',
      'Then',
      'plugins afterEach',
      'Then',
      'afterEach',
      'Scenario',
      'plugins afterEach',
      'Scenario',
      'plugins afterEach',
      'Scenario',
      'afterEach',
    ]);
  }

  @(examples`
    | accountTag     | contactType   | smsMessage |
    | 'us'           | 'personal'    | 'aaa'      |
    | 'us_1'         | 'personal_1'  | 'aaa_1'    |
  `)
  run() {
    return (
      <Scenario desc="user enter entrypoint" action={EntryPoint}>
        <Given
          desc="user navigate to compose text page"
          action={NavigateToComposeText}
        />
        <When
          desc="user type ${smsMessage} in input field"
          action={TextSmsMessage}
        />
        <Then
          desc="user should see that input field text is ${smsMessage}"
          action={<CheckSmsMessage s={'1'} />}
        />
      </Scenario>
    );
  }
}

class EntryPoint extends Step {
  run() {
    return (
      <>
        <Prepare />
        <Entry />
        <Entry.UT />
        <Entry.IT />
        <Login />
      </>
    );
  }
}

class NavigateToComposeText extends Step {}

class TextSmsMessage extends Step<{ text?: string }, { inputText: string }> {
  run() {
    result.push(`run CheckSmsMessage ${this.props.text}`);
    this.context.inputText = 'test';
  }
}

TextSmsMessage.prototype.defaultProps = {
  text: 'TextSmsMessageProps',
};

const CheckSmsMessage: StepFunction<{ s: string }, { inputText: string }> = (
  porps,
  context,
) => {
  result.push(`run CheckSmsMessage ${context.inputText}`);
};

class Prepare extends Step {
  run() {
    result.push('run Prepare');
  }
}
class Entry extends Step {
  static UT(props: any, context: any) {
    result.push(`run UT ${context.s}`);
    result.push(`run UT ${context.a}`);
  }

  static IT() {
    result.push('run IT');
  }
}
const Login: StepFunction = (props, context) => {
  result.push(context.title!);
  result.push('run Login');
};

@autorun(test)
@title('run pure AC text')
class Test extends Step {
  @(examples`
    | smsMessage |
    | 'testFoo'  |
  `)
  run() {
    return (
      <Scenario desc="user enter entrypoint">
        <Given desc="user navigate to compose text page" />
        <When desc="user type ${smsMessage} in input field" />
        <Then desc="user should see that input field text is ${smsMessage}" />
      </Scenario>
    );
  }
}

autorun(test)(() => (
  <Scenario desc="user enter entrypoint">
    <Given desc="user navigate to compose text page" />
    <When desc="user type smsMessage in input field" />
    <Then desc="user should see that input field text is smsMessage" />
  </Scenario>
));

@autorun(test)
@title('run pure AC text')
class TestSkip extends Step {
  @(examples`
    | smsMessage |
    | 'testFoo'  |
  `)
  run() {
    return (
      <Scenario desc="user enter entrypoint">
        <Given desc="user navigate to compose text page" />
        <When desc="user type ${smsMessage} in input field" />
        <Then desc="user should see that input field text is ${smsMessage}" />
      </Scenario>
    );
  }
}

@autorun(test)
class TestWithoutTitle extends Step {
  run() {
    return (
      <Scenario desc="user enter entrypoint">
        <Given desc="user navigate to compose text page" />
        <When desc="user type message in input field" />
        <Then desc="user should see that input field text is message" />
      </Scenario>
    );
  }
}

autorun(test)(() => (
  <Scenario desc="user enter entrypoint" action={A1}>
    <Given desc="user navigate to compose text page" />
    <When desc="user type smsMessage in input field" />
    <Then desc="user should see that input field text is smsMessage" />
  </Scenario>
));

const A1 = () => {
  expect('A1').toEqual('A1');
};

@autorun(test)
@title('test action with flow')
class TestWithFlow extends Step {
  @(examples`
    | smsMessage   |
    | 777          |
  `)
  run() {
    return (
      <Scenario
        desc="user enter entrypoint"
        action={<Entry1 url={'foobar.com'} />}
      >
        <Given
          desc="user navigate to compose text page"
          action={
            <>
              <Navigate1 />
            </>
          }
        />
        <When
          desc="user type ${smsMessage} in input field"
          action={<Type1 {...this.context.example} />}
        />
        <Then
          desc="user should see that input field text is ${smsMessage}"
          action={<CheckText1 />}
        />
      </Scenario>
    );
  }
}

const flowArr: string[] = [];

const Entry1: StepFunction<{ url: string }> = (porps) => {
  flowArr.push(porps.url);
};

const Navigate1 = () => {
  flowArr.push('Navigate1');
};

const Type1: StepFunction<{ smsMessage: number }> = ({ smsMessage }) => {
  flowArr.push(`Type1 ${smsMessage}`);
};

const CheckText1: StepFunction = (_, { example }) => {
  flowArr.push(`CheckText1 ${example.smsMessage}`);
  expect(flowArr).toEqual([
    'foobar.com',
    'Navigate1',
    'Type1 777',
    'CheckText1 777',
  ]);
};

const Foo: StepFunction<{ s: string }, { inputText: string }> = (
  porps,
  context,
) => {
  //
};

@autorun(test.skip)
@title('run pure AC text')
class Test1 extends Step {
  @(examples`
    | smsMessage |
    | 'testFoo'  |
  `)
  run() {
    return (
      <Scenario desc="user enter entrypoint">
        <Given desc="user navigate to compose text page" />
        <When desc="user type ${smsMessage} in input field" />
        <Then desc="user should see that input field text is ${smsMessage}" />
      </Scenario>
    );
  }
}
