"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcTextWrapper = exports.RcLinkWrapper = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 13px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 13px;\n  width: 219px;\n  [sf-classic] & {\n    font-size: 12px;\n    width: 175px;\n  }\n  & p {\n    margin-bottom: 25px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RcTextWrapper = _styledComponents["default"].div(_templateObject());

exports.RcTextWrapper = RcTextWrapper;

var RcLinkWrapper = _styledComponents["default"].div(_templateObject2());

exports.RcLinkWrapper = RcLinkWrapper;
//# sourceMappingURL=DialerPanelWrapper.js.map
