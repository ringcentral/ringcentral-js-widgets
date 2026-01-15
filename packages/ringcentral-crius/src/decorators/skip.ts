import { params } from 'crius-test';

/**
 * when you want skip some `@examples` in test case,
 *
 * use that decorator to filter the examples
 *
 * ```ts
 * \@examples([
 *   { brand: 'rc' },
 *   { brand: 'rc', skipFlag: true },
 *   { brand: 'bt' },
 *   { brand: 'att' },
 *   { brand: 'telus' },
 *   { brand: 'avaya' },
 * ])
 * \@skip({
 *   brand: ['att', 'bt', 'telus', 'avaya'],
 *   skipFlag: true
 * })
 * ```
 *
 * the result will skip the brand inside the array and skipFlag be true
 *
 * so, only the first example 'rc' will be exec
 */
export const skip = (skipParams: Record<string, any>) => {
  return (target: object) => {
    params((testParams: any[]) => {
      return testParams.filter((param) => {
        if (toString.call(skipParams) === '[object Object]') {
          for (const key in skipParams) {
            if (
              param[key] &&
              ((Array.isArray(skipParams[key]) &&
                skipParams[key].includes(param[key])) ||
                skipParams[key] === param[key])
            ) {
              return false;
            }
          }
        }
        return true;
      });
    })(target);
  };
};
