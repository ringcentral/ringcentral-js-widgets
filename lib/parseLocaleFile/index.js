'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = parseLocaleFile;

var _babylon = require('babylon');

var _ramda = require('ramda');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _extractAnnotations2 = require('../extractAnnotations');

var _extractAnnotations3 = _interopRequireDefault(_extractAnnotations2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint { no-eval: 0 } */
function parseLocaleFile(rawContent) {
  var data = new _map2.default();

  var _extractAnnotations = (0, _extractAnnotations3.default)(rawContent),
      content = _extractAnnotations.content,
      annotations = _extractAnnotations.annotations;

  var ast = (0, _babylon.parse)(content, { sourceType: 'module' });

  var defaultExport = (0, _ramda.find)(function (item) {
    return item.type === 'ExportDefaultDeclaration';
  }, ast.program.body);
  if (defaultExport && defaultExport.declaration.type === 'ObjectExpression') {
    (0, _ramda.forEach)(function (prop) {
      // get raw key from source content
      var key = content.substring(prop.key.start, prop.key.end);
      // wrap key in [] if needed
      if (prop.key.type !== 'StringLiteral' && prop.key.type !== 'Identifier') {
        key = '[' + key + ']';
      }
      // evaluate value to convert template literals or string concats into single string literal
      var value = eval((0, _babelGenerator2.default)(prop.value).code);
      var source = annotations.get(key);
      data.set(key, {
        key: key,
        value: value,
        source: source
      });
    }, defaultExport.declaration.properties);
  }

  return {
    content: content,
    annotations: annotations,
    ast: ast,
    data: data
  };
}
//# sourceMappingURL=index.js.map
