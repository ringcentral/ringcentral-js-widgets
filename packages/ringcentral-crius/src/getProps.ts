/* eslint-disable @typescript-eslint/no-unused-vars */
const STRING_CAMELIZE_REGEXP_1 = /(-|_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;

const camelize = (key: string) => {
  return key
    .replace(STRING_CAMELIZE_REGEXP_1, (match, separator, chr) =>
      chr ? chr.toUpperCase() : '',
    )
    .replace(STRING_CAMELIZE_REGEXP_2, (match, separator, chr) =>
      match.toLowerCase(),
    );
};

const getProps = <T extends Record<string, any>>(
  example: Record<string, any>,
  props: T,
) => {
  const camelizeObj: Record<string, any> = Object.keys(example).reduce(
    (prev, key) => {
      return {
        ...prev,
        [camelize(key)]: example[key],
      };
    },
    {},
  );

  return Object.keys({ ...camelizeObj, ...props }).reduce((prev, key) => {
    const value = props[key] === undefined ? camelizeObj[key] : props[key];
    return {
      ...prev,
      [key]: value,
    };
  }, {}) as T;
};

export { getProps };
