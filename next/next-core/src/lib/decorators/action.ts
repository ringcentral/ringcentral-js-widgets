/* eslint-disable @typescript-eslint/no-explicit-any */
import { action as originalAction, getRef } from 'reactant-share';

export const action =
  process.env.NODE_ENV === 'development'
    ? (
        target: object,
        key: string,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => void>,
      ) => {
        // in development mode, check the action call frequency
        const originalMethod = descriptor.value!;
        if (typeof originalMethod !== 'function') {
          throw new Error(
            `${String(
              key,
            )} can only be decorated by '@action' as a class method.`,
          );
        }
        let count = 100;
        let time = Date.now();
        descriptor.value = function (this: any, ...args: any[]) {
          if (count-- === 0) {
            count = 100;
            if (Date.now() - time < 5000) {
              throw new Error(
                `${getRef(this).identifier}.${key} is called too many times`,
              );
            }
            time = Date.now();
          }
          return originalMethod.apply(this, args);
        };
        return originalAction(target, key, descriptor);
      }
    : originalAction;
