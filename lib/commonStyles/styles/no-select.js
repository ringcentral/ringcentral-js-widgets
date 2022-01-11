"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noSelectStyle = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  user-select: none;\n  user-drag: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var noSelectStyle = (0, _styledComponents.css)(_templateObject());
exports.noSelectStyle = noSelectStyle;
//# sourceMappingURL=no-select.js.map
