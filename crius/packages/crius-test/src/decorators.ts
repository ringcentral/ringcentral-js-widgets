import { Props, StepType } from 'crius';
import { isCriusNode } from 'crius-is';
import { run, Context } from 'crius-runner';

import { Step, BaseContext } from './step';
import { parserString, compileString } from './utils';

type Hook = (...args: any) => any;

let hook: Hook;

function setHook(fn: Hook) {
  hook = fn;
}

function autorun(_test: Function) {
  return function (_target: Object) {
    const target = (
      isCriusNode(_target) ? () => target : _target
    ) as typeof Step;
    if (typeof target.examples === 'undefined' || target.examples === null) {
      target.examples = [{}];
    }
    const testParams =
      typeof target.handleParams === 'function'
        ? target.handleParams(target.examples)
        : target.examples;
    for (const example of testParams) {
      const title = compileString(target.title || '', example);
      const baseContext: BaseContext = {
        title,
        example,
        async beforeEach(props, context, step) {
          if (typeof target.beforeEach === 'function') {
            await target.beforeEach(props, context, step);
          }
          if (target.plugins) {
            for (const plugin of target.plugins) {
              if (typeof plugin.beforeEach === 'function') {
                await plugin.beforeEach(props, context, step);
              }
            }
          }
        },
        async afterEach(props, context, step) {
          if (target.plugins) {
            for (const plugin of [...target.plugins].reverse()) {
              if (typeof plugin.afterEach === 'function') {
                await plugin.afterEach(props, context, step);
              }
            }
          }
          if (typeof target.afterEach === 'function') {
            await target.afterEach(props, context, step);
          }
        },
      };
      Object.defineProperties(
        baseContext,
        Object.getOwnPropertyDescriptors(target.context || {}),
      );
      _test(title, async (...args: any) => {
        hook?.(...args);
        await run(
          {
            key: target.name,
            props: { children: [] },
            step: target,
          },
          baseContext,
        );
      });
    }
  };
}

function title(title: string) {
  if (typeof title === 'undefined' || title === null) {
    throw new Error('Test case title is required.');
  }
  return function (target: Object) {
    (target as typeof Step).title = title;
  };
}

function examples<T = TemplateStringsArray | object[] | string | string[]>(
  params: T,
) {
  return function (
    target: Object,
    name: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    if (Array.isArray(params)) {
      if (typeof params[0] === 'string') {
        (target.constructor as typeof Step).examples = parserString(
          params[0] as string,
        );
      } else if (toString.call(params[0]) === '[object Object]') {
        (target.constructor as typeof Step).examples = params as object[];
      } else {
        throw new Error(
          '"@examples" argument error, it must be an object or a string.',
        );
      }
    } else if (typeof params === 'string') {
      (target.constructor as typeof Step).examples = parserString(params);
    } else {
      throw new Error(
        '"@examples" argument error, it must be an object or a string.',
      );
    }
    return descriptor;
  };
}

type HookCallback<P, C> = (
  props: Props<P>,
  context: Context<P, C>,
  step: StepType<P, C>,
) => void;

function beforeEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  if (typeof hookCallback !== 'function') {
    throw new Error('"@beforeEach" argument error, it must be a function.');
  }
  return function (target: typeof Step) {
    target.beforeEach = hookCallback;
  };
}

function afterEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  if (typeof hookCallback !== 'function') {
    throw new Error('"@afterEach" argument error, it must be a function.');
  }
  return function (target: typeof Step) {
    target.afterEach = hookCallback;
  };
}

export type Plugins<P = {}, C = {}> = {
  beforeEach?: HookCallback<P, C>;
  afterEach?: HookCallback<P, C>;
};

function plugins<P = {}, C = {}>(plugins: Array<Plugins<P, C>>) {
  return function (target: typeof Step) {
    target.plugins = plugins;
  };
}

function params(handleParams: (testParams: any[]) => any[]) {
  if (typeof handleParams !== 'function') {
    throw new Error('"@params" argument error, it must be a function.');
  }
  return function (target: Object) {
    (target as typeof Step).handleParams = handleParams;
  };
}

export {
  autorun,
  title,
  examples,
  beforeEach,
  afterEach,
  plugins,
  params,
  setHook,
};
