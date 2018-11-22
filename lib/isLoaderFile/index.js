"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLoaderFile;
var loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
var noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;

function isLoaderFile(content) {
  return loaderRegExp.test(content);
}

function noChunks(content) {
  return noChunkRegExp.test(content);
}
exports.isLoaderFile = isLoaderFile;
exports.noChunks = noChunks;
//# sourceMappingURL=index.js.map
