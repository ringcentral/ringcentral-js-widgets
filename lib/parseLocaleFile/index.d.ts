interface ParsedLocaleData {
    key: string;
    value: any;
    source: any;
}
interface ParseLocaleFileResult {
    content: string;
    annotations: Map<string, any>;
    ast: any;
    data: Map<string, ParsedLocaleData>;
}
export default function parseLocaleFile(rawContent: string): ParseLocaleFileResult;
export {};
