"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageSpace = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        padding-left: ", ";\n        padding-right: ", ";\n\n        [sf-classic] & {\n          padding-left: ", ";\n          padding-right: ", ";\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        margin-left: ", ";\n        margin-right: ", ";\n\n        [sf-classic] & {\n          margin-left: ", ";\n          margin-right: ", ";\n        }\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var lightningPageSpace = (0, _juno.spacing)(4);
var classicPageSpace = (0, _juno.spacing)(3);

var pageSpace = function pageSpace() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'margin';
  return type === 'margin' ? (0, _juno.css)(_templateObject(), lightningPageSpace, lightningPageSpace, classicPageSpace, classicPageSpace) : (0, _juno.css)(_templateObject2(), lightningPageSpace, lightningPageSpace, classicPageSpace, classicPageSpace);
};

exports.pageSpace = pageSpace;
//# sourceMappingURL=variables.js.map
