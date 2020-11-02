import {
  Step as BaseStep,
  StepFunction as BaseStepFunction,
  autorun as baseAutorun,
  title,
  Scenario as BaseScenario,
  Given as BaseGiven,
  When as BaseWhen,
  Then as BaseThen,
  And as BaseAnd,
  examples,
} from 'crius-test';
import { isCriusFlow } from 'crius-is';
import { combine } from './combine';
import { TestType, testTypes } from './constant';

export { beforeEach } from 'crius-test';

beforeEach(() => {
  global.instance = null;
});

afterEach(async () => {
  try {
    if (global.mockServer && typeof global.mockServer.stop === 'function') {
      global.mockServer.stop();
    }
  } catch (e) {
    //
  }
});

class Step<P = {}, C = {}> extends BaseStep<P, C> {
  static priority?: string;
  static type?: string;
  static status?: string;
  static get context() {
    return {
      get phone() {
        return global.instance.phone;
      },
      get mockServer() {
        return global.mockServer;
      },
      payload: {},
    };
  }
}

function testBuild(this: BaseScenario) {
  let Action = this.props.action;
  if (
    Object.hasOwnProperty.call(this.props, 'action') &&
    typeof Action === 'undefined'
  ) {
    throw new Error(
      `The action of Step with desc '${this.props.desc}' is 'undefined'.`,
    );
  } else if (!isCriusFlow(Action) && typeof Action !== 'undefined') {
    if (Array.isArray(Action)) {
      Action = Action.map((item) => {
        const Item = combine(item);
        return <Item />;
      });
    } else {
      Action = combine(Action);
    }
  }
  return (
    <>
      {isCriusFlow(Action) || Array.isArray(Action) ? Action : <Action />}
      {this.props.children}
    </>
  );
}

class Scenario extends BaseScenario {
  run(): any {
    return testBuild.call(this);
  }
}

class Given extends BaseGiven {
  run(): any {
    return testBuild.call(this);
  }
}

class When extends BaseWhen {
  run(): any {
    return testBuild.call(this);
  }
}

class Then extends BaseThen {
  run(): any {
    return testBuild.call(this);
  }
}

class And extends BaseAnd {
  run(): any {
    return testBuild.call(this);
  }
}

const autorun = (_test: Function) => (_target: object) => {
  if (
    process.env.TEST_TYPE &&
    !testTypes.includes(process.env.TEST_TYPE as TestType)
  ) {
    throw new Error(
      `'TEST_TYPE' value should be in ${JSON.stringify(testTypes)}.`,
    );
  }
  const skipTest =
    process.env.TEST_TYPE &&
    process.env.TEST_TYPE !== (_target as typeof Step).type &&
    (_test as jest.It).skip;
  return baseAutorun(skipTest || _test)(_target);
};

export interface StepFunction<P = {}, C = {}> extends BaseStepFunction<P, C> {}

export {
  Step,
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  examples,
  BaseStep,
  testBuild,
};
