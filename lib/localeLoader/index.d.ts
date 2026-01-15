interface LoaderContext {
    async: () => (error: Error | null, result: string) => void;
    context: string;
}
/**
 *
 * locale loader can work with options like below
 * ```
 * {
 *   loader: '@ringcentral-integration/locale-loader',
 *   options: {
 *     supportedLocales,
 *     chunk,
 *   },
 * }
 * ```
 *
 * - `supportedLocales` to support locales
 * * `chunk`
 *   * be `boolean` will toggle that chunk mode.
 *   * be `function` can be method with `(locale: string) => boolean`, provide you a way to specify which language be chunked.
 *
 * @example
 * ```ts
 * chunk: (local: string) => {
 *   return local !== 'en-US'; // en-US will not be chunked, that will be package into main script directly
 * }
 * ```
 */
export default function localeLoader(this: LoaderContext, content: string): void;
export {};
