"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotWrap = exports.DotItem = exports.CloseWrap = exports.CarouselModalDialogInvisibleGlobalStyle = exports.ButtonWrap = void 0;
var _styledComponents = _interopRequireWildcard(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _focusVisible = require("@ringcentral/juno/es6/foundation/styles/focusVisible.js");
var _nonStyleButton = require("@ringcentral/juno/es6/foundation/styles/nonStyleButton.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _radius = require("@ringcentral/juno/es6/foundation/styles/radius.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var inset = 2;
var DotItem = exports.DotItem = _styledComponents["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n\n  ", ";\n\n  &:after {\n    top: -", "px !important;\n    right: -", "px !important;\n    bottom: -", "px !important;\n    left: -", "px !important;\n  }\n\n  ", ";\n  border-radius: ", ";\n  width: 12px;\n  height: 4px;\n  background-color: ", ";\n\n  ", "\n"])), (0, _focusVisible.focusVisibleShadowStyle)('round', (0, _newPalette.palette2)('neutral', 'f11'), false), inset, inset, inset, inset, _nonStyleButton.nonStyleButton, (0, _radius.radius)('round'), (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'f11'), '48'), function (_ref) {
  var active = _ref.active;
  return active && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      width: 35px;\n      background-color: ", ";\n    "])), (0, _newPalette.palette2)('neutral', 'f11'));
});
var DotWrap = exports.DotWrap = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: ", ";\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: ", ";\n"])), (0, _spacing.spacing)(-6), (0, _spacing.spacing)(1));
var CloseWrap = exports.CloseWrap = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: ", ";\n  right: ", ";\n\n  ", " {\n    border: 1px solid ", ";\n  }\n"])), (0, _spacing.spacing)(5), (0, _spacing.spacing)(5), _IconButton.RcIconButton, (0, _newPalette.palette2)('neutral', 'f06'));
var directionStyle = function directionStyle(_ref2) {
  var direction = _ref2.direction;
  return direction === 'left' ? (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        left: 0;\n        transform: translate(-100%, -50%);\n        padding-right: ", ";\n      "])), (0, _spacing.spacing)(6)) : (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        right: 0;\n        transform: translate(100%, -50%);\n        padding-left: ", ";\n      "])), (0, _spacing.spacing)(6));
};
var ButtonWrap = exports.ButtonWrap = _styledComponents["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 50%;\n\n  ", "\n"])), directionStyle);
var CarouselModalDialogInvisibleGlobalStyle = exports.CarouselModalDialogInvisibleGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  .carouselModal-dialog-root {\n    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n\n    pointer-events: none;\n    opacity: 0;\n\n    .RcBackdrop-root {\n      opacity: 0 !important;\n    }\n  }\n"])));
//# sourceMappingURL=carouselModalPanelStyle.js.map
