interface ImportLocaleFileParams {
    targetLocale: string;
    targetRelativePath: string;
    sourceFolder?: string;
    sourceLocale?: string;
    disableEslint?: boolean;
    rawData?: Record<string, any>;
}
export default function importLocaleFile({ targetLocale, targetRelativePath, sourceFolder, sourceLocale, disableEslint, rawData, }: ImportLocaleFileParams): Promise<void>;
export {};
