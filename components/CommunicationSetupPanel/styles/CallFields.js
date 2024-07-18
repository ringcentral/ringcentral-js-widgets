"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledToInputWrapper = exports.StyledRecipientsWrapper = exports.StyledRcDialTextField = exports.StyledRcChip = exports.RootWrapper = exports.ResultContainer = exports.FullSizeWrapper = exports.FieldLine = exports.CallFields = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      justify-content: flex-start;\n      align-items: flex-start;\n      flex-wrap: wrap;\n\n      ", " {\n        flex: 1 1 0%;\n        min-width: 50px;\n      }\n\n      ", " {\n        width: auto;\n        display: contents;\n      }\n    "]);
  _templateObject10 = function _templateObject10() {
    return data;
  };
  return data;
}
function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  min-width: 0;\n  max-height: 122px;\n  overflow-y: auto;\n  overflow-x: hidden;\n\n  ", "\n"]);
  _templateObject9 = function _templateObject9() {
    return data;
  };
  return data;
}
function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  input {\n    text-overflow: ellipsis;\n    min-width: 20px;\n  }\n  min-height: 32px;\n  [sf-classic] & {\n    min-height: 28px;\n  }\n"]);
  _templateObject8 = function _templateObject8() {
    return data;
  };
  return data;
}
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: inline-flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  max-height: 122px;\n"]);
  _templateObject7 = function _templateObject7() {
    return data;
  };
  return data;
}
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  margin: 2px 0;\n  padding: 0;\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: nowrap;\n  &:nth-child(1) {\n    align-items: flex-start;\n    p {\n      margin-top: ", ";\n      [sf-classic] & {\n        margin-top: 3px;\n      }\n    }\n  }\n  &:nth-child(2) {\n    align-items: center;\n  }\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  z-index: 10;\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 10px;\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n  ", " {\n    width: 46px;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CallFields = _juno.styled.div(_templateObject(), (0, _juno.spacing)(5), (0, _juno.palette2)('nav', 'line'), _juno.RcText);
exports.CallFields = CallFields;
var RootWrapper = _juno.styled.div(_templateObject2(), _commonStyles.fullSizeStyle);
exports.RootWrapper = RootWrapper;
var FullSizeWrapper = _juno.styled.div(_templateObject3());
exports.FullSizeWrapper = FullSizeWrapper;
var ResultContainer = _juno.styled.div(_templateObject4(), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'b01'));
exports.ResultContainer = ResultContainer;
var FieldLine = _juno.styled.div(_templateObject5(), (0, _juno.spacing)(1));
exports.FieldLine = FieldLine;
var StyledRcChip = (0, _juno.styled)(_juno.RcChip)(_templateObject6());
exports.StyledRcChip = StyledRcChip;
var StyledRecipientsWrapper = _juno.styled.div(_templateObject7());
exports.StyledRecipientsWrapper = StyledRecipientsWrapper;
var StyledRcDialTextField = (0, _juno.styled)(_juno.RcDialTextField)(_templateObject8());
exports.StyledRcDialTextField = StyledRcDialTextField;
var StyledToInputWrapper = _juno.styled.div(_templateObject9(), function (_ref) {
  var inputFullWidth = _ref.inputFullWidth;
  return inputFullWidth && (0, _juno.css)(_templateObject10(), StyledRcDialTextField, StyledRecipientsWrapper);
});
exports.StyledToInputWrapper = StyledToInputWrapper;
//# sourceMappingURL=CallFields.js.map
