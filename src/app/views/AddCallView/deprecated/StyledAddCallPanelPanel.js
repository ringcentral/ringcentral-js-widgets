"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledRcDialPad = exports.DialerWrapper = exports.CommunicationSetupPanelWrap = exports.BodyBottom = exports.AddCallPage = void 0;
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _DialPad = require("@ringcentral/juno/es6/components/Dialer/DialPad/DialPad.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledRcDialPad = exports.StyledRcDialPad = (0, _styledComponents["default"])(_DialPad.RcDialPad)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  [sf-classic] & {\n    height: 90%;\n  }\n"])));

// TODO: check withTabs
var DialerWrapper = exports.DialerWrapper = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", " 44px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  [sf-classic] & {\n    height: 70%;\n    margin: ", " 10px;\n  }\n"])), (0, _spacing.spacing)(6), (0, _spacing.spacing)(2));
var AddCallPage = exports.AddCallPage = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 100%;\n  background-color: ", ";\n"])), (0, _newPalette.palette2)('neutral', 'b01'));
var CommunicationSetupPanelWrap = exports.CommunicationSetupPanelWrap = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  max-height: calc(100% - 44px);\n  height: calc(100% - 44px);\n"])));
var BodyBottom = exports.BodyBottom = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", ";\n  margin-bottom: ", ";\n"])), _flexCenter.flexCenterStyle, (0, _spacing.spacing)(7));
//# sourceMappingURL=StyledAddCallPanelPanel.js.map
