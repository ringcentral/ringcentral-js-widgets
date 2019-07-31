"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseLocaleFile;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _ramda = require("ramda");

var _parser = require("@babel/parser");

var _generator = _interopRequireDefault(require("@babel/generator"));

var _extractAnnotations2 = _interopRequireDefault(require("../extractAnnotations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint { no-eval: 0 } */
function parseLocaleFile(rawContent) {
  var data = new Map();

  var _extractAnnotations = (0, _extractAnnotations2["default"])(rawContent),
      content = _extractAnnotations.content,
      annotations = _extractAnnotations.annotations;

  var ast = (0, _parser.parse)(content, {
    sourceType: 'module'
  });
  var defaultExport = (0, _ramda.find)(function (item) {
    return item.type === 'ExportDefaultDeclaration';
  }, ast.program.body);

  if (defaultExport && defaultExport.declaration.type === 'ObjectExpression') {
    (0, _ramda.forEach)(function (prop) {
      // get raw key from source content
      var key = content.substring(prop.key.start, prop.key.end); // wrap key in [] if needed

      if (prop.key.type !== 'StringLiteral' && prop.key.type !== 'Identifier' && prop.key.type !== 'NumericLiteral') {
        key = "[".concat(key, "]");
      } // evaluate value to convert template literals or string concats into single string literal


      var value = eval((0, _generator["default"])(prop.value).code);
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
