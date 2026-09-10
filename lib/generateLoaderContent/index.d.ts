interface GLCOptions {
    files: string[];
    chunk?: boolean | ((locale: string) => boolean);
    supportedLocales?: string[];
    pseudo?: boolean;
}
/**
 * @function
 * @description Generate js code for localeLoader according the files listed.
 * @param {GLCOptions} options
 */
export default function generateLoaderContent({ files, chunk, supportedLocales, pseudo, }: GLCOptions): string;
export {};
