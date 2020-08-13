import {
  Step as BaseStep,
  StepFunction as BaseStepFunction,
  autorun,
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
  if (!isCriusFlow(Action) && typeof Action !== 'undefined') {
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
  run() {
    return testBuild.call(this);
  }
}

class Given extends BaseGiven {
  run() {
    return testBuild.call(this);
  }
}

class When extends BaseWhen {
  run() {
    return testBuild.call(this);
  }
}

class Then extends BaseThen {
  run() {
    return testBuild.call(this);
  }
}

class And extends BaseAnd {
  run() {
    return testBuild.call(this);
  }
}

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
};
