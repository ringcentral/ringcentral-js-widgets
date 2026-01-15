/**
 * Parameters for the toPseudoString function
 */
export type ToPseudoStringParams = {
    /** The input string to convert to pseudo-localized format */
    str: string;
    /** Ratio of padding to add around the string (default: 0.3) */
    padRatio?: number;
    /**
     * Character to use for padding (default: '~!@#$%^&*')
     */
    padChar?: string;
};
/**
 * Character mapping for converting ASCII characters to accented Unicode characters.
 * This creates a pseudo-localized version of text that maintains readability
 * while clearly indicating it's not the final localized content.
 */
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
/**
 * Converts ASCII characters in a string to their accented Unicode equivalents.
 * This function creates a pseudo-localized version of text that maintains
 * readability while clearly indicating it's not the final localized content.
 *
 * @param str - The input string to convert
 * @returns The string with ASCII characters replaced by accented Unicode characters
 *
 * @example
 * ```typescript
 * toAccentString('Hello World'); // Returns 'Ĥéļļö Ŵöŕļð'
 * ```
 */
export declare function toAccentString(str: string): string;
/**
 * Processes a string by converting variable placeholders (e.g., {name}) to accented text
 * while preserving the placeholder structure. This is useful for pseudo-localization
 * of strings that contain interpolation variables.
 *
 * @param str - The input string containing variable placeholders
 * @returns The string with variable placeholders preserved and other text converted to accented characters
 *
 * @example
 * ```typescript
 * processVars('Hello {name}!'); // Returns 'Ĥéļļö {name}!'
 * processVars('Welcome {user} to {app}'); // Returns 'Ŵéļçöɱé {user} ţö {app}'
 * ```
 */
export declare function processVars(str: string): string;
/**
 * Adds padding around a string using special characters to make it more visible
 * during pseudo-localization testing. The padding helps identify where the
 * localized content begins and ends.
 *
 * @param options - Configuration options for padding
 * @param options.str - The string to pad (defaults to empty string)
 * @param options.padRatio - Ratio of padding length relative to string length (default: 0.3)
 * @param options.padChar - Character to use for padding (default: '~!@#$%^&*')
 * @returns The string wrapped with padding characters
 *
 * @example
 * ```typescript
 * padString({ str: 'Hello' }); // Returns '[~!]Hello[~!]'
 * ```
 */
export declare function padString({ str, padRatio, padChar, }?: {
    str?: string;
    padRatio?: number;
    padChar?: string;
}): string;
export declare function toPseudoString(str: string): string;
/**
 * Converts a string to pseudo-localized format for testing purposes.
 * This function is commonly used in internationalization testing to:
 * - Make it obvious when text hasn't been properly localized
 * - Test UI layout with longer text strings
 * - Preserve variable placeholders and quoted strings
 * - Add visual padding to identify string boundaries
 *
 * The function processes the string in the following order:
 * 1. Preserves quoted strings (single quotes) without modification
 * 2. Processes variable placeholders (e.g., {name}) while converting other text to accented characters
 * 3. Adds padding around the final result
 * 4. Wraps the entire result in square brackets
 *
 * @param params - Configuration parameters for pseudo-localization
 * @param params.str - The input string to convert
 * @param params.padRatio - Ratio of padding to add (default: 0.3)
 * @param params.padChar - Character to use for padding (default: '~!@#$%^&*')
 * @returns The pseudo-localized string wrapped in square brackets
 *
 * @example
 * ```typescript
 * toPseudoString({ str: 'Hello World' });
 * // Returns '[~!@]Ĥéļļö Ŵöŕļð[~!@]'
 *
 * toPseudoString({ str: 'Hello {name}!' });
 * // Returns '[~!@]Ĥéļļö {name}![~!@]'
 *
 * toPseudoString({ str: "Don't click 'Cancel'" });
 * // Returns '[~!@]Ðöñ'ţ çļîçķ 'Cancel'[~!@]'
 * ```
 */
export declare function toPseudoStringWithPadding({ str, padRatio, padChar, }: ToPseudoStringParams): string;
export declare function toHashPseudoString(filePath: string, keyPath: string, value: string): string;
