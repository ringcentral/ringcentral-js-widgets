"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractAnnotations;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

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
