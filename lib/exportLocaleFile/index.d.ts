interface ExportLocaleFileParams {
    sourceRelativePath: string;
    sourceFolder?: string;
    sourceLocale?: string;
}
export default function exportLocaleFile({ sourceRelativePath, sourceFolder, sourceLocale, }: ExportLocaleFileParams): Record<string, any>;
export {};
