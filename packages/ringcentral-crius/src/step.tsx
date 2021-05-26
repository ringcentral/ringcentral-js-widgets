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
import { isCriusNode } from 'crius-is';
import { combine } from './combine';
import { TestType, testTypes } from './constant';

export { beforeEach, afterEach } from 'crius-test';

interface BuilderProps {
  desc: string;
  // TODO: fix type for all feature file
  action?: any;
}

global.beforeEach?.(() => {
  global.instance = null;
});

global.afterEach?.(async () => {
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
        return global.instance?.phone ?? null;
      },
      get app() {
        return global.instance?.app ?? null;
      },
      get mockServer() {
        return global.mockServer;
      },
      payload: {},
    };
  }
}

function testBuild(this: BaseScenario): any {
  let Action: any = this.props.action;
  if (
    Object.hasOwnProperty.call(this.props, 'action') &&
    typeof Action === 'undefined'
  ) {
    throw new Error(
      `The action of Step with desc '${this.props.desc}' is 'undefined'.`,
    );
  } else if (!isCriusNode(Action) && typeof Action !== 'undefined') {
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
      {isCriusNode(Action) || Array.isArray(Action) ? Action : <Action />}
      {this.props.children}
    </>
  );
}

class Scenario<P = {}, C = {}> extends BaseScenario<BuilderProps & P, C> {
  run(): any {
    return testBuild.call(this);
  }

  render = (): any => null;
  setState = (): any => null;
  forceUpdate = (): any => null;
  state: any;
  refs: any;
}

class Given<P = {}, C = {}> extends BaseGiven<BuilderProps & P, C> {
  run(): any {
    return testBuild.call(this);
  }

  render = (): any => null;
  setState = (): any => null;
  forceUpdate = (): any => null;
  state: any;
  refs: any;
}

class When<P = {}, C = {}> extends BaseWhen<BuilderProps & P, C> {
  run(): any {
    return testBuild.call(this);
  }

  render = (): any => null;
  setState = (): any => null;
  forceUpdate = (): any => null;
  state: any;
  refs: any;
}

class Then<P = {}, C = {}> extends BaseThen<BuilderProps & P, C> {
  run(): any {
    return testBuild.call(this);
  }

  render = (): any => null;
  setState = (): any => null;
  forceUpdate = (): any => null;
  state: any;
  refs: any;
}

class And<P = {}, C = {}> extends BaseAnd<BuilderProps & P, C> {
  run(): any {
    return testBuild.call(this);
  }

  render = (): any => null;
  setState = (): any => null;
  forceUpdate = (): any => null;
  state: any;
  refs: any;
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
