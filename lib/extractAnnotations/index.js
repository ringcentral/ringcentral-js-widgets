"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractAnnotations;

function extractAnnotations(content) {
  var annotationRegExp = /\/\/ @key: @#@(.*)@#@.*?@source: @#@(.*)@#@/g;
  var annotations = new Map();
  var match;
  /* eslint { 'no-cond-assign': 0 } */

  while ((match = annotationRegExp.exec(content)) !== null) {
    annotations.set(JSON.parse(match[1]), JSON.parse(match[2]));
  }

  return {
    content: content.replace(annotationRegExp, ''),
    annotations: annotations
  };
}
//# sourceMappingURL=index.js.map
