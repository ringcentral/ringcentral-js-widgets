"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.StyledCollapse = exports.KeyPadCloseButton = exports.Footer = exports.Backdrop = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _styledComponents = _interopRequireWildcard(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");

var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");

var _radius = require("@ringcentral/juno/es6/foundation/styles/radius.js");

var _Collapse = require("@ringcentral/juno/es6/components/Transitions/Collapse/Collapse.js");

var _DialPad = require("@ringcentral/juno/es6/components/Dialer/DialPad/DialPad.js");

var _DialTextField = require("@ringcentral/juno/es6/components/Dialer/DialTextField/DialTextField.js");

var _Paper = require("@ringcentral/juno/es6/components/Paper/Paper.js");

var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");

var _px = require("@ringcentral/juno/es6/foundation/styles/px.js");

var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo");

var _variables = require("../../../../scss/variables");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Wrapper = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var open = _ref.open;
  return open ? '0' : (0, _px.px)(_BasicCallInfo.KeyPadHeight);
}, function (_ref2) {
  var open = _ref2.open;
  return open ? 3 : 2;
});

exports.Wrapper = Wrapper;

var Backdrop = _styledComponents["default"].div(_templateObject2(), function (_ref3) {
  var open = _ref3.open;
  return open ? "calc(-100vh - 64px)" : '0';
}, (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'b05'), '72'));

exports.Backdrop = Backdrop;
var StyledCollapse = (0, _styledComponents["default"])(_Collapse.RcCollapse)(_templateObject3(), function (_ref4) {
  var open = _ref4.open;
  return open ? 'default' : 'pointer';
}, (0, _newPalette.palette2)('neutral', 'l02'), (0, _newPalette.palette2)('neutral', 'f01'), _Paper.RcPaper, (0, _radius.radius)('zero'), function (_ref5) {
  var open = _ref5.open;
  return open ? (0, _styledComponents.css)(_templateObject4(), (0, _variables.pageSpace)('padding')) : (0, _styledComponents.css)(_templateObject5());
}, _DialTextField.RcDialTextField, (0, _newPalette.palette2)('neutral', 'l02'), _DialPad.RcDialPad);
exports.StyledCollapse = StyledCollapse;

var Footer = _styledComponents["default"].div(_templateObject6(), _flexCenter.flexCenterStyle, function (_ref6) {
  var keypadOpenHover = _ref6.keypadOpenHover;
  return keypadOpenHover ? (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'b04'), '08') : '#fff';
});

exports.Footer = Footer;

var KeyPadCloseButton = _styledComponents["default"].div(_templateObject7());

exports.KeyPadCloseButton = KeyPadCloseButton;
//# sourceMappingURL=KeyPadWrapper.js.map
