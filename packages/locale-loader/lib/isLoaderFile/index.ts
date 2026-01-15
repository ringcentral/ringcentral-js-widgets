const loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
const noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;
const pseudoRegExp = /\/\*.*?( pseudo ).*?\*\//i;

export default function isLoaderFile(content: string): boolean {
  return loaderRegExp.test(content);
}

export function noChunks(content: string): boolean {
  return noChunkRegExp.test(content);
}

export function isPseudoFile(content: string): boolean {
  return pseudoRegExp.test(content);
}
