"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubInfoWrapper = exports.SubInfoName = exports.StyledTransferSwitchButton = exports.StyledSubSide = exports.StyledSubRecordingIndicator = exports.StyledSide = exports.StyleSubBox = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n"]);
  _templateObject7 = function _templateObject7() {
    return data;
  };
  return data;
}
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n  color: ", ";\n  font-size: ", ";\n  margin-bottom: ", ";\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  line-height: 16px;\n  justify-content: flex-end;\n  margin-bottom: 6px;\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: ", ";\n  margin-top: ", ";\n  z-index: 1;\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin: 0 10px;\n  font-size: ", ";\n  color: #212121;\n  flex-grow: 1;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  align-items: center;\n  padding-bottom: 1px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var SubInfoWrapper = _juno.styled.div(_templateObject(), _commonStyles.fullSizeStyle);
exports.SubInfoWrapper = SubInfoWrapper;
var SubInfoName = (0, _juno.styled)(_juno.RcText)(_templateObject2(), function (_ref) {
  var $isWide = _ref.$isWide;
  return $isWide ? '18px' : "".concat((0, _juno.spacing)(2));
});
exports.SubInfoName = SubInfoName;
var StyledTransferSwitchButton = (0, _juno.styled)(_juno.RcIconButton)(_templateObject3(), (0, _juno.spacing)(5), (0, _juno.spacing)(-4));
exports.StyledTransferSwitchButton = StyledTransferSwitchButton;
var StyledSide = _juno.styled.div(_templateObject4());
exports.StyledSide = StyledSide;
var StyleSubBox = _juno.styled.div(_templateObject5());
exports.StyleSubBox = StyleSubBox;
var StyledSubSide = _juno.styled.div(_templateObject6(), (0, _juno.palette2)('neutral', 'f03'), (0, _juno.spacing)(3), (0, _juno.spacing)(1));
exports.StyledSubSide = StyledSubSide;
var StyledSubRecordingIndicator = _juno.styled.div(_templateObject7(), (0, _juno.spacing)(1));
exports.StyledSubRecordingIndicator = StyledSubRecordingIndicator;
//# sourceMappingURL=LogBaseInfo.js.map
