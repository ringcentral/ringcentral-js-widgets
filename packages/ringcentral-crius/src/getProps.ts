import { camelize } from 'ringcentral-integration/lib/di/utils/utils';

const getProps = <T>(example, props: T) => {
  const camelizeObj = Object.keys(example).reduce((prev, key) => {
    return {
      ...prev,
      [camelize(key)]: example[key],
    };
  }, {});

  return Object.keys({ ...camelizeObj, ...props }).reduce((prev, key) => {
    const value = props[key] === undefined ? camelizeObj[key] : props[key];
    return {
      ...prev,
      [key]: value,
    };
  }, {}) as T;
};

export { getProps };
