interface ConsolidateLocaleParams {
    sourceFolder?: string;
    sourceLocale?: string;
    supportedLocales?: string[];
    interactive?: boolean;
    silent?: boolean;
}
export default function consolidateLocale({ sourceFolder, sourceLocale, supportedLocales, interactive, silent, }?: ConsolidateLocaleParams): Promise<void>;
export {};
