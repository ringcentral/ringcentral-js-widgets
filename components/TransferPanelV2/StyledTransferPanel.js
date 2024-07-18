"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferPage = exports.StyledRcDialPad = exports.DialerWrapper = exports.DefaultIconWrap = exports.DefaultIconGroup = exports.DefaultIcon = exports.CommunicationSetupPanelWrap = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  max-height: calc(100% - 44px);\n  height: calc(100% - 44px);\n"]);
  _templateObject7 = function _templateObject7() {
    return data;
  };
  return data;
}
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  background-color: ", ";\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  border: 1px solid;\n  margin-bottom: ", ";\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n\n  [sf-classic] & {\n    padding-left: ", ";\n    padding-right: ", ";\n  }\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  text-align: center;\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", " 44px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  [sf-classic] & {\n    height: 70%;\n    margin: ", " 10px;\n  }\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  [sf-classic] & {\n    height: 90%;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledRcDialPad = (0, _juno.styled)(_juno.RcDialPad)(_templateObject());

// TODO: check withTabs
exports.StyledRcDialPad = StyledRcDialPad;
var DialerWrapper = _juno.styled.div(_templateObject2(), (0, _juno.spacing)(6), (0, _juno.spacing)(2));
exports.DialerWrapper = DialerWrapper;
var DefaultIconWrap = _juno.styled.div(_templateObject3());
exports.DefaultIconWrap = DefaultIconWrap;
var DefaultIconGroup = (0, _juno.styled)(_juno.RcIconButtonGroup)(_templateObject4(), (0, _juno.spacing)(1), (0, _juno.spacing)(1));
exports.DefaultIconGroup = DefaultIconGroup;
var DefaultIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject5(), (0, _juno.palette2)('neutral', 'f01'), (0, _juno.radius)('circle'), (0, _juno.spacing)(2), (0, _juno.spacing)(1));
exports.DefaultIcon = DefaultIcon;
var TransferPage = _juno.styled.div(_templateObject6(), (0, _juno.palette2)('neutral', 'b01'));
exports.TransferPage = TransferPage;
var CommunicationSetupPanelWrap = _juno.styled.div(_templateObject7());
exports.CommunicationSetupPanelWrap = CommunicationSetupPanelWrap;
//# sourceMappingURL=StyledTransferPanel.js.map
