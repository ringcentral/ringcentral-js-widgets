/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateKey } from '../constant';
import type { PropertyDescriptor, Service } from '../interface';

export const state = (
  target: object,
  key: string | symbol,
  descriptor?: PropertyDescriptor<any>,
) => {
  if (typeof key !== 'string') {
    throw new Error(
      `'@state' decorate ${key.toString()} error in ${
        target.constructor.name
      } class, it only supports class properties that decorate keys for string types.`,
    );
  }
  Object.assign(target, {
    [stateKey]: {
      ...(target as Service)[stateKey],
      [key]: undefined,
    },
  });
};
