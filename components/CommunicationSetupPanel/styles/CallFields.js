"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledToInputWrapper = exports.StyledRecipientsWrapper = exports.StyledRcDialTextField = exports.StyledRcChip = exports.RootWrapper = exports.ResultContainer = exports.FullSizeWrapper = exports.FieldLine = exports.CallFields = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CallFields = exports.CallFields = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-top: 10px;\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n  ", " {\n    width: 46px;\n  }\n"])), (0, _juno.spacing)(5), (0, _juno.palette2)('nav', 'line'), _juno.RcText);
var RootWrapper = exports.RootWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n"])), _commonStyles.fullSizeStyle);
var FullSizeWrapper = exports.FullSizeWrapper = _juno.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n"])));
var ResultContainer = exports.ResultContainer = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  z-index: 10;\n"])), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'b01'));
var FieldLine = exports.FieldLine = _juno.styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: nowrap;\n  &:nth-child(1) {\n    align-items: flex-start;\n    p {\n      margin-top: ", ";\n      [sf-classic] & {\n        margin-top: 3px;\n      }\n    }\n  }\n  &:nth-child(2) {\n    align-items: center;\n  }\n"])), (0, _juno.spacing)(1));
var StyledRcChip = exports.StyledRcChip = (0, _juno.styled)(_juno.RcChip)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  margin: 2px 0;\n  padding: 0;\n"])));
var StyledRecipientsWrapper = exports.StyledRecipientsWrapper = _juno.styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 100%;\n  display: inline-flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  max-height: 122px;\n"])));
var StyledRcDialTextField = exports.StyledRcDialTextField = (0, _juno.styled)(_juno.RcDialTextField)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  input {\n    text-overflow: ellipsis;\n    min-width: 20px;\n  }\n  min-height: 32px;\n  [sf-classic] & {\n    min-height: 28px;\n  }\n"])));
var StyledToInputWrapper = exports.StyledToInputWrapper = _juno.styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  width: 100%;\n  min-width: 0;\n  max-height: 122px;\n  overflow-y: auto;\n  overflow-x: hidden;\n\n  ", "\n"])), function (_ref) {
  var inputFullWidth = _ref.inputFullWidth;
  return inputFullWidth && (0, _juno.css)(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["\n      display: flex;\n      justify-content: flex-start;\n      align-items: flex-start;\n      flex-wrap: wrap;\n\n      ", " {\n        flex: 1 1 0%;\n        min-width: 50px;\n      }\n\n      ", " {\n        width: auto;\n        display: contents;\n      }\n    "])), StyledRcDialTextField, StyledRecipientsWrapper);
});
//# sourceMappingURL=CallFields.js.map
