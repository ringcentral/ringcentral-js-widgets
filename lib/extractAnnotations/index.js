'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = extractAnnotations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractAnnotations(content) {
  var annotationRegExp = /\/\/ @key: @#@(.*)@#@.*?@source: @#@(.*)@#@/g;
  var annotations = new _map2.default();
  var match = void 0;
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
