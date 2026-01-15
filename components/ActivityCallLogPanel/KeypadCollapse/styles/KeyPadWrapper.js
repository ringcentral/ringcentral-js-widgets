"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.StyledCollapse = exports.KeyPadCloseButton = exports.Footer = exports.Backdrop = void 0;
var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo");
var _juno = require("@ringcentral/juno");
var _variables = require("../../../../scss/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Wrapper = exports.Wrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  height: ", ";\n  z-index: ", ";\n"])), function (_ref) {
  var open = _ref.open;
  return open ? '0' : (0, _juno.px)(_BasicCallInfo.KeyPadHeight);
}, function (_ref2) {
  var open = _ref2.open;
  return open ? 3 : 2;
});
var Backdrop = exports.Backdrop = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: ", ";\n  right: 0;\n  bottom: 0;\n  background: ", ";\n"])), function (_ref3) {
  var open = _ref3.open;
  return open ? "calc(-100vh - 64px)" : '0';
}, (0, _juno.setOpacity)((0, _juno.palette2)('neutral', 'b05'), '72'));
var StyledCollapse = exports.StyledCollapse = (0, _juno.styled)(_juno.RcCollapse)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.15);\n  cursor: ", ";\n  border-bottom: 1px solid ", ";\n  background: ", ";\n\n  ", " {\n    border-radius: ", ";\n    ", ";\n  }\n\n  ", " {\n    border-bottom: 1px solid ", ";\n  }\n\n  ", " {\n    padding: 17px 21.3px 6px;\n    [sf-classic] & {\n      padding: 17px 0 6px;\n    }\n  }\n"])), function (_ref4) {
  var open = _ref4.open;
  return open ? 'default' : 'pointer';
}, (0, _juno.palette2)('neutral', 'l02'), (0, _juno.palette2)('neutral', 'f01'), _juno.RcPaper, (0, _juno.radius)('zero'), function (_ref5) {
  var open = _ref5.open;
  return open ? (0, _juno.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n            ", "\n          "])), (0, _variables.pageSpace)('padding')) : (0, _juno.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          "])));
}, _juno.RcDialTextField, (0, _juno.palette2)('neutral', 'l02'), _juno.RcDialPad);
var Footer = exports.Footer = _juno.styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  ", ";\n  height: 32px;\n  background-color: ", ";\n"])), _juno.flexCenterStyle, function (_ref6) {
  var keypadOpenHover = _ref6.keypadOpenHover;
  return keypadOpenHover ? (0, _juno.setOpacity)((0, _juno.palette2)('neutral', 'b04'), '08') : '#fff';
});
var KeyPadCloseButton = exports.KeyPadCloseButton = _juno.styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  float: right;\n  padding-top: 8px;\n"])));
//# sourceMappingURL=KeyPadWrapper.js.map
