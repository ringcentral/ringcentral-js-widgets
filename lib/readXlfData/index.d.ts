interface TranslationUnit {
    value: string;
    source: string;
}
interface ReadXlfDataParams {
    localizationFolder: string;
    translationLocales: readonly string[];
}
export default function readXlfData({ localizationFolder, translationLocales, }: ReadXlfDataParams): Record<string, Record<string, Record<string, TranslationUnit>>>;
export {};
