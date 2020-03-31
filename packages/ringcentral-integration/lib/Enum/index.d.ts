import HashMap from '../HashMap';

export default class Enum extends HashMap {
  constructor(values?: string[], prefix?: string);
}
export declare function prefixEnum({
  enumMap,
  prefix,
  base,
}: {
  enumMap: any;
  prefix: any;
  base?: any;
}): any;

export function createEnum<V extends string, P>(
  values: V[],
  prefix?: string,
  enumMap?: P,
): { [K in V]: string } & { [K in keyof P]: string };
