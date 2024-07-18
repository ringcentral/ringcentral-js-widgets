import type { StepFunction } from 'crius-test';

import { getProps } from './getProps';

export const combine = (fn: StepFunction) => {
  return ((props, context) => {
    const _props = getProps(context.example, props);
    const Fn = fn;
    const type = typeof fn;
    if (type !== 'function' && type !== 'boolean' && type !== 'undefined') {
      throw new Error(
        `${toString.call(fn)}: ${fn} \n  it's not a valid crius step \n`,
      );
    }
    return <Fn {..._props} />;
  }) as StepFunction;
};
