"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferPage = exports.StyledRcDialPad = exports.DialerWrapper = exports.DefaultIconWrap = exports.DefaultIconGroup = exports.DefaultIcon = exports.CommunicationSetupPanelWrap = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledRcDialPad = exports.StyledRcDialPad = (0, _juno.styled)(_juno.RcDialPad)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  [sf-classic] & {\n    height: 90%;\n  }\n"])));

// TODO: check withTabs
var DialerWrapper = exports.DialerWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", " 44px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  [sf-classic] & {\n    height: 70%;\n    margin: ", " 10px;\n  }\n"])), (0, _juno.spacing)(6), (0, _juno.spacing)(2));
var DefaultIconWrap = exports.DefaultIconWrap = _juno.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex: 1;\n  text-align: center;\n"])));
var DefaultIconGroup = exports.DefaultIconGroup = (0, _juno.styled)(_juno.RcIconButtonGroup)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n\n  [sf-classic] & {\n    padding-left: ", ";\n    padding-right: ", ";\n  }\n"])), (0, _juno.spacing)(1), (0, _juno.spacing)(1));
var DefaultIcon = exports.DefaultIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  border: 1px solid;\n  margin-bottom: ", ";\n"])), (0, _juno.palette2)('neutral', 'f01'), (0, _juno.radius)('circle'), (0, _juno.spacing)(2), (0, _juno.spacing)(1));
var TransferPage = exports.TransferPage = _juno.styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  height: 100%;\n  background-color: ", ";\n"])), (0, _juno.palette2)('neutral', 'b01'));
var CommunicationSetupPanelWrap = exports.CommunicationSetupPanelWrap = _juno.styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  max-height: calc(100% - 44px);\n  height: calc(100% - 44px);\n"])));
//# sourceMappingURL=StyledTransferPanel.js.map
