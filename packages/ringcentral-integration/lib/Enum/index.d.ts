import HashMap from '../HashMap';
export default class Enum extends HashMap {
    constructor(values?: string[], prefix?: string);
}
export declare function prefixEnum({ enumMap, prefix, base }: {
    enumMap: any;
    prefix: any;
    base?: any;
}): any;

export function createEnum<V extends string>(values: V[], prefix?: string): { [K in V]: string };
