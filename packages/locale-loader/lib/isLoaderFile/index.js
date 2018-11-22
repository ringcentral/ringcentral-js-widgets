const loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
const noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;

export default function isLoaderFile(content) {
  return loaderRegExp.test(content);
}

function noChunks(content) {
  return noChunkRegExp.test(content);
}
export {
  isLoaderFile,
  noChunks
};

