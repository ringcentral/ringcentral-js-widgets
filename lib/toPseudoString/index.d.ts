export type ToPseudoStringParams = {
    str: string;
    padRatio?: number;
    padChar?: string;
};
export declare const charMap: {
    readonly a: 229;
    readonly b: 384;
    readonly c: 231;
    readonly d: 240;
    readonly e: 233;
    readonly f: 402;
    readonly g: 285;
    readonly h: 293;
    readonly i: 238;
    readonly j: 309;
    readonly k: 311;
    readonly l: 316;
    readonly m: 625;
    readonly n: 241;
    readonly o: 246;
    readonly p: 254;
    readonly q: 491;
    readonly r: 341;
    readonly s: 353;
    readonly t: 355;
    readonly u: 251;
    readonly v: 7805;
    readonly w: 373;
    readonly x: 7819;
    readonly y: 253;
    readonly z: 382;
    readonly A: 197;
    readonly B: 385;
    readonly C: 199;
    readonly D: 208;
    readonly E: 201;
    readonly F: 401;
    readonly G: 284;
    readonly H: 292;
    readonly I: 206;
    readonly J: 308;
    readonly K: 310;
    readonly L: 315;
    readonly M: 7744;
    readonly N: 209;
    readonly O: 214;
    readonly P: 222;
    readonly Q: 490;
    readonly R: 340;
    readonly S: 352;
    readonly T: 354;
    readonly U: 219;
    readonly V: 7804;
    readonly W: 372;
    readonly X: 7818;
    readonly Y: 221;
    readonly Z: 381;
};
export declare function toAccentString(str: string): string;
export declare function processVars(str: string): string;
export declare function padString({ str, padRatio, padChar, }?: {
    str?: string;
    padRatio?: number;
    padChar?: string;
}): string;
export default function toPseudoString({ str, padRatio, padChar, }: ToPseudoStringParams): string;
