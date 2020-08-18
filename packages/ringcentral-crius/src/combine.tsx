import { getProps } from './getProps';

export const combine = (fn: any) => {
  return ((props, context) => {
    const _props = getProps(context.example, props);
    const Fn = fn;
    return <Fn {..._props} />;
  }) as any;
};
