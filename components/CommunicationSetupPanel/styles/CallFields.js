"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledToInputWrapper = exports.StyledRecipientsWrapper = exports.StyledRcDialTextField = exports.StyledRcChip = exports.RootWrapper = exports.ResultContainer = exports.FullSizeWrapper = exports.FieldLine = exports.CallFields = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _commonStyles = require("../../../lib/commonStyles");

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  margin: 2px 0;\n  padding: 0;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  min-height: 32px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: inline-flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  overflow-y: auto;\n  max-height: 122px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  z-index: 20;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CallFields = _juno.styled.div(_templateObject(), (0, _juno.spacing)(5), (0, _juno.palette2)('nav', 'line'), _juno.RcText);

exports.CallFields = CallFields;

var RootWrapper = _juno.styled.div(_templateObject2(), _commonStyles.fullSizeStyle);

exports.RootWrapper = RootWrapper;

var FullSizeWrapper = _juno.styled.div(_templateObject3(), _commonStyles.fullSizeStyle);

exports.FullSizeWrapper = FullSizeWrapper;

var ResultContainer = _juno.styled.div(_templateObject4(), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'b01'));

exports.ResultContainer = ResultContainer;

var FieldLine = _juno.styled.div(_templateObject5());

exports.FieldLine = FieldLine;

var StyledToInputWrapper = _juno.styled.div(_templateObject6());

exports.StyledToInputWrapper = StyledToInputWrapper;

var StyledRecipientsWrapper = _juno.styled.div(_templateObject7());

exports.StyledRecipientsWrapper = StyledRecipientsWrapper;
var StyledRcDialTextField = (0, _juno.styled)(_juno.RcDialTextField)(_templateObject8());
exports.StyledRcDialTextField = StyledRcDialTextField;
var StyledRcChip = (0, _juno.styled)(_juno.RcChip)(_templateObject9());
exports.StyledRcChip = StyledRcChip;
//# sourceMappingURL=CallFields.js.map
