import {
  Step as BaseStep,
  autorun,
  title,
  examples,
  Scenario,
  Given,
  When,
  Then,
  plugins,
} from 'crius-test';
import logger from '../';

@plugins([logger({ path: 'packages/crius-logger' })])
class Step<P = {}, C = {}> extends BaseStep<P, C> {}

@autorun(test)
@title('Send text message on compose text page')
class Test extends Step<{}, { __logger: object[] }> {
  async stepDidEnd() {
    expect(
      this.context.__logger.filter(({ time }: any) => typeof time !== 'number')
        .length,
    ).toEqual(0);
    expect(
      JSON.parse(
        JSON.stringify(
          this.context.__logger.map(({ time, ...args }: any) => args),
        ),
      ),
    ).toEqual([
      {
        key: 'Test',
        type: 'step',
        status: 'start',
      },
      {
        key: 'Scenario',
        desc: 'user enter entrypoint',
        type: 'builder',
        status: 'start',
      },
      {
        key: 'EntryPoint',
        type: 'step',
        status: 'start',
      },
      {
        key: 'Prepare',
        type: 'step',
        status: 'start',
      },
      {
        key: 'Prepare',
        type: 'step',
        status: 'end',
      },
      {
        key: 'Entry',
        type: 'step',
        status: 'start',
      },
      {
        key: 'Entry',
        type: 'step',
        status: 'end',
      },
      {
        key: 'UT',
        type: 'step',
        status: 'start',
      },
      {
        key: 'UT',
        type: 'step',
        status: 'end',
      },
      {
        key: 'IT',
        type: 'step',
        status: 'start',
      },
      {
        key: 'IT',
        type: 'step',
        status: 'end',
      },
      {
        key: 'Login',
        type: 'step',
        status: 'start',
      },
      {
        key: 'Login',
        type: 'step',
        status: 'end',
      },
      {
        key: 'EntryPoint',
        type: 'step',
        status: 'end',
      },
      {
        key: 'Given',
        desc: 'user navigate to compose text page',
        type: 'builder',
        status: 'start',
      },
      {
        key: 'NavigateToComposeText',
        type: 'step',
        status: 'start',
      },
      {
        key: 'NavigateToComposeText',
        type: 'step',
        status: 'end',
      },
      {
        key: 'Given',
        desc: 'user navigate to compose text page',
        type: 'builder',
        status: 'end',
      },
      {
        key: 'When',
        desc: 'user type aaa in input field',
        type: 'builder',
        status: 'start',
      },
      {
        key: 'TextSmsMessage',
        type: 'step',
        status: 'start',
      },
      {
        key: 'TextSmsMessage',
        type: 'step',
        status: 'end',
      },
      {
        key: 'When',
        desc: 'user type aaa in input field',
        type: 'builder',
        status: 'end',
      },
      {
        key: 'Then',
        desc: 'user should see that input field text is aaa',
        type: 'builder',
        status: 'start',
      },
      {
        key: 'CheckSmsMessage',
        type: 'step',
        status: 'start',
      },
      {
        key: 'CheckSmsMessage',
        type: 'step',
        status: 'end',
      },
      {
        key: 'Then',
        desc: 'user should see that input field text is aaa',
        type: 'builder',
        status: 'end',
      },
      {
        key: 'Scenario',
        desc: 'user enter entrypoint',
        type: 'builder',
        status: 'end',
      },
    ]);
  }

  @(examples`
    | accountTag     | contactType   | smsMessage   |
    | 'us'           | 'personal'    | 'aaa'        |
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
          action={CheckSmsMessage}
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

class NavigateToComposeText extends Step {
  run() {}
}

class TextSmsMessage extends Step<{}, { inputText: string }> {
  run() {
    this.context.inputText = 'inputText';
  }
}

class CheckSmsMessage extends Step<{}, { inputText: string }> {
  run() {
    expect(this.context.inputText).toEqual('inputText');
  }
}

class Prepare extends Step {
  run() {}
}
class Entry extends Step {
  static UT() {}

  static IT() {}

  run() {}
}
const Login = () => {};
