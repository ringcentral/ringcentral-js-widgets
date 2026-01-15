"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isLoaderFile;
exports.noChunks = noChunks;
exports.isPseudoFile = isPseudoFile;
const loaderRegExp = /\/\*.*( loadLocale ).*?\*\//i;
const noChunkRegExp = /\/\*.*?( noChunk ).*?\*\//i;
const pseudoRegExp = /\/\*.*?( pseudo ).*?\*\//i;
function isLoaderFile(content) {
    return loaderRegExp.test(content);
}
function noChunks(content) {
    return noChunkRegExp.test(content);
}
function isPseudoFile(content) {
    return pseudoRegExp.test(content);
}
//# sourceMappingURL=index.js.map