export default function ensureExist<T>(
  this: any,
  module: T,
  moduleName: keyof T,
) {
  if (!module) {
    throw new Error(
      // @ts-expect-error TS(2731): Implicit conversion of a 'symbol' to a 'string' wi... Remove this comment to see the full error message
      `'${moduleName}' is a required dependency for '${this.constructor.name}'`,
    );
  }
  return module;
}
