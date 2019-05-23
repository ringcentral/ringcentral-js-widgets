export declare function defaultGetFunction(item: any): any;
export default class HashMap {
    constructor(definition: any);
    static getKey(map: any, value: any): any;
    static hasValue(map: any, value: any): any;
    static fromSet({ set, getKey, getValue }: {
        set: any;
        getKey?: typeof defaultGetFunction;
        getValue?: typeof defaultGetFunction;
    }): HashMap;
}
