const loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
const noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;

export default function isLoaderFile(content) {
  return loaderRegExp.test(content);
}

isLoaderFile.noChunk = function noChunks(content) {
  return noChunkRegExp.test(content);
};
