"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastItemView = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _contexts = require("../../ToastView/ToastItemView/contexts");
var _ToastItemPanel = require("./ToastItemPanel");
var _excluded = ["toast", "payload", "onClose"],
  _excluded2 = ["disableEscapeKeyDown", "disableBackdropClick", "message", "allowDuplicates", "action"];
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ToastItemView = exports.ToastItemView = (_dec = (0, _nextCore.injectable)({
  name: 'ToastItemView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ToastItemViewOptions')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof ToastItemViewOptions === "undefined" ? Object : ToastItemViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcViewModule) {
  function ToastItemView(_toastItemViewOptions) {
    var _this;
    _classCallCheck(this, ToastItemView);
    _this = _callSuper(this, ToastItemView);
    _this._toastItemViewOptions = _toastItemViewOptions;
    return _this;
  }
  _inherits(ToastItemView, _RcViewModule);
  return _createClass(ToastItemView, [{
    key: "component",
    value: function component(_ref) {
      var toast = _ref.toast,
        payload = _ref.payload,
        onClose = _ref.onClose,
        props = _objectWithoutProperties(_ref, _excluded);
      var ViewModule = toast.options.view;
      var isComponent = typeof ViewModule === 'function';
      var Action = isComponent ? undefined : ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.action;
      var _ref2 = (0, _nextCore.useConnector)(function () {
          return toast.getPureProps(payload || {});
        }),
        disableEscapeKeyDown = _ref2.disableEscapeKeyDown,
        disableBackdropClick = _ref2.disableBackdropClick,
        message = _ref2.message,
        allowDuplicates = _ref2.allowDuplicates,
        action = _ref2.action,
        toastProps = _objectWithoutProperties(_ref2, _excluded2);
      var contextProps = {
        toastMode: true,
        props: _objectSpread(_objectSpread(_objectSpread({}, props), toastProps), {}, {
          disableEscapeKeyDown: disableEscapeKeyDown,
          disableBackdropClick: disableBackdropClick,
          message: message,
          payload: payload,
          onClose: onClose
        }),
        action: {
          close: function close(reason) {
            onClose === null || onClose === void 0 ? void 0 : onClose(reason);
          }
        }
      };
      var nonAction = action === null || Action === null;
      return /*#__PURE__*/_react["default"].createElement(_contexts.ToastItemViewContext.Provider, {
        value: contextProps
      }, /*#__PURE__*/_react["default"].createElement(_ToastItemPanel.ToastItemPanel, _extends({}, props, toastProps, {
        payload: payload,
        message: message,
        action: nonAction ? null : Action ? /*#__PURE__*/_react["default"].createElement(Action, null) : undefined
      }), ViewModule ? isComponent ? /*#__PURE__*/_react["default"].createElement(ViewModule, null) : /*#__PURE__*/_react["default"].createElement(ViewModule.component, null) : message));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ToastItem.view.js.map
