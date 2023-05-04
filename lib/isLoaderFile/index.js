"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isLoaderFile;
exports.noChunks = noChunks;
var loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
var noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;

function isLoaderFile(content) {
  return loaderRegExp.test(content);
}

function noChunks(content) {
  return noChunkRegExp.test(content);
}
//# sourceMappingURL=index.js.map
