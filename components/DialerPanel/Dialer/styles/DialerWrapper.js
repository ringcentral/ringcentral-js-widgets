"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialPadWrapper = exports.TextFieldWrapper = exports.DialerWrapper = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _scss = require("../../../../scss");

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 75%;\n  margin: 10px auto 6px;\n\n  [sf-classic] & {\n    width: 90%;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-top: 6px;\n  margin-bottom: 7px;\n\n  ", " {\n    padding-left: ", ";\n    ", ";\n    border-bottom: 1px solid ", ";\n\n    input {\n      margin: 7px 0 !important;\n      text-align: center;\n\n      [sf-classic] & {\n        margin: 5px 0 !important;\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1 1 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DialerWrapper = _juno.styled.div(_templateObject());

exports.DialerWrapper = DialerWrapper;

var TextFieldWrapper = _juno.styled.div(_templateObject2(), _juno.RcDialTextField, function (_ref) {
  var isHaveValue = _ref.isHaveValue;
  return isHaveValue && (0, _juno.spacing)(9);
}, (0, _scss.pageSpace)('margin'), (0, _juno.palette2)('neutral', 'l03'));

exports.TextFieldWrapper = TextFieldWrapper;

var DialPadWrapper = _juno.styled.div(_templateObject3());

exports.DialPadWrapper = DialPadWrapper;
//# sourceMappingURL=DialerWrapper.js.map
