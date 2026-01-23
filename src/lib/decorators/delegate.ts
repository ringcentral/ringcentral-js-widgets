/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable func-names */
import { EmitParameter, delegate as originalDelegate } from 'reactant-share';

import { delegateMainClient } from './delegateMainClient';
import { parallel } from './parallel';
import { parallelClients } from './parallelClients';
import { proxify } from './proxify';

type FunctionKeys<T> = Exclude<
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T],
  void
>;

type Options<
  O extends EmitParameter<any>['respond'],
  P extends DelegateTypes = 'server',
> = {
  /**
   * The target port to execute the method.
   */
  target?: P;
} & (P extends 'server'
  ? { respond?: O } & Pick<
      EmitParameter<any>,
      Exclude<keyof EmitParameter<any>, 'name' | '_extra' | 'respond'>
    >
  : {});

type ProxyArgs<
  F extends (...args: any[]) => any,
  O extends EmitParameter<any>['respond'],
  P extends DelegateTypes = 'server',
> = Parameters<F> extends []
  ? [
      /**
       * Pass in the parameters for this method.
       */
      args?: Parameters<F>,
      /**
       * proxy execution options
       */
      options?: Options<O, P>,
    ]
  : [
      /**
       * Pass in the parameters for this method.
       */
      args: Parameters<F>,
      /**
       * proxy execution options
       */
      options?: Options<O, P>,
    ];

type DelegateTypes = 'mainClient' | 'clients' | 'all' | 'server';

const generateDelegate =
  (type: DelegateTypes, isDecorator = true) =>
  (
    target: any,
    key: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) => {
    switch (type) {
      case 'mainClient':
        return delegateMainClient(target, key, descriptor, isDecorator);
      case 'clients':
        return parallelClients(target, key, descriptor, isDecorator);
      case 'all':
        return parallel(target, key, descriptor, isDecorator);
      case 'server':
        return proxify(target, key, descriptor);
      default:
        throw new Error(`Unsupported delegate type '${type}'`);
    }
  };

function delegate<
  T extends Record<string | number | symbol, any>,
  K extends FunctionKeys<T>,
  O extends EmitParameter<any>['respond'],
  P extends DelegateTypes = 'server',
>(
  /**
   * Designate an execution module from the server side.
   */
  module: T,
  /**
   * Specify the name of a method in this module.
   */
  key: K,
  ...args: ProxyArgs<T[K], O, P>
): P extends 'all' | 'clients'
  ? void
  : O extends false
  ? void
  : ReturnType<T[K]> extends Promise<infer R>
  ? Promise<R>
  : Promise<ReturnType<T[K]>>;
function delegate(
  type: DelegateTypes,
): (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
) => TypedPropertyDescriptor<(...args: any) => Promise<any>>;
/**
 * delegate execution to `'mainClient' | 'clients' | 'all' | 'server'`
 *
 * @example
 *
 * Using function(target is 'server' by default):
 *
 * ```ts
 * await delegate(this.counter, 'increment'); // without function args
 * await delegate(this.counter, 'decrement', [1]); // function args is [1].
 * delegate(this.counter, 'decrement', [1], { target: 'all' }); // Unless the target is 'server', there are no more options available.
 * ```
 * Using decorator:
 *
 * ```ts
 * delegate('mainClient'); // make the method run in the main client port(always only have one client)
 * delegate('clients'); // make the method run in all clients port
 * delegate('all'); // make the method run in both all clients and server port
 * delegate('server'); // make the method run in server port
 * ```
 */
function delegate(...args: any[]) {
  if (typeof args[0] === 'string') {
    // it's a decorator
    const type = args[0] as DelegateTypes;
    return generateDelegate(type);
  } else if (typeof args[0] === 'object') {
    // it's a function
    const type = (args[3]?.target as DelegateTypes) ?? 'server';
    if (type !== 'server') {
      const { value } = generateDelegate(type, false)(args[0], args[1], {
        value: args[0][args[1]],
      });
      return value!.apply(args[0], args[2]);
    }
    return originalDelegate(...(args as Parameters<typeof originalDelegate>));
  }
  throw new Error(`
    The first parameter of the delegate decorator must be a string or object.
  `);
}

export { delegate };
