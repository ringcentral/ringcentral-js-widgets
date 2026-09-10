interface ExtractAnnotationsResult {
    content: string;
    annotations: Map<string, any>;
}
export default function extractAnnotations(content: string): ExtractAnnotationsResult;
export {};
