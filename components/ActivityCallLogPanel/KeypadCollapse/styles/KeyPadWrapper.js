"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyPadCloseButton = exports.Footer = exports.StyledCollapse = exports.Backdrop = exports.Wrapper = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _variables = require("../../../../scss/variables");

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  float: right;\n  padding-top: 8px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  height: 32px;\n  background-color: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            ", "\n          "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.15);\n  cursor: ", ";\n  border-bottom: 1px solid ", ";\n  background: ", ";\n\n  ", " {\n    border-radius: ", ";\n    ", ";\n  }\n\n  ", " {\n    border-bottom: 1px solid ", ";\n  }\n\n  ", " {\n    padding: 17px 21.3px 6px;\n    [sf-classic] & {\n      padding: 17px 0 6px;\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: ", ";\n  right: 0;\n  bottom: 0;\n  background: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  height: ", ";\n  z-index: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Wrapper = _juno.styled.div(_templateObject(), function (_ref) {
  var open = _ref.open;
  return open ? '0' : '32px';
}, (0, _juno.zIndex)('popup'));

exports.Wrapper = Wrapper;

var Backdrop = _juno.styled.div(_templateObject2(), function (_ref2) {
  var open = _ref2.open;
  return open ? "calc(-100vh - 64px)" : '0';
}, (0, _juno.setOpacity)((0, _juno.palette2)('bg', 'transparentDark'), '72'));

exports.Backdrop = Backdrop;
var StyledCollapse = (0, _juno.styled)(_juno.RcCollapse)(_templateObject3(), function (_ref3) {
  var open = _ref3.open;
  return open ? 'default' : 'pointer';
}, (0, _juno.palette2)('neutral', 'l02'), (0, _juno.palette2)('neutral', 'f01'), _juno.RcPaper, (0, _juno.radius)('zero'), function (_ref4) {
  var open = _ref4.open;
  return open ? (0, _juno.css)(_templateObject4(), (0, _variables.pageSpace)('padding')) : (0, _juno.css)(_templateObject5());
}, _juno.RcDialTextField, (0, _juno.palette2)('neutral', 'l02'), _juno.RcDialPad);
exports.StyledCollapse = StyledCollapse;

var Footer = _juno.styled.div(_templateObject6(), _juno.flexCenterStyle, function (_ref5) {
  var keypadOpenHover = _ref5.keypadOpenHover;
  return keypadOpenHover ? (0, _juno.setOpacity)((0, _juno.palette2)('neutral', 'b04'), '08') : '#fff';
});

exports.Footer = Footer;

var KeyPadCloseButton = _juno.styled.div(_templateObject7());

exports.KeyPadCloseButton = KeyPadCloseButton;
//# sourceMappingURL=KeyPadWrapper.js.map
