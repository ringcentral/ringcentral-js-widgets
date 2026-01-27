"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
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
exports.SpringAppRootView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _components = require("../../components");
var _services = require("../../services");
var _SpringModalView = require("../SpringModalView");
var _SpringToastView = require("../SpringToastView");
var _uiErrorIgnorer = require("./uiErrorIgnorer");
var _viewTransition = require("./viewTransition");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var verticalContentStyles = 'flex flex-col overflow-auto relative w-full';
/**
 * spring app root view, include modal view and toast view
 */
var SpringAppRootView = exports.SpringAppRootView = (_dec = (0, _nextCore.injectable)({
  name: 'SpringAppRootView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('AppRootViewOptions')(target, undefined, 4);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof _SpringModalView.SpringModalView === "undefined" ? Object : _SpringModalView.SpringModalView, typeof _SpringToastView.SpringToastView === "undefined" ? Object : _SpringToastView.SpringToastView, typeof _services.EnsureAudio === "undefined" ? Object : _services.EnsureAudio, typeof AppRootViewOptions === "undefined" ? Object : AppRootViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof PropsWithChildren === "undefined" ? Object : PropsWithChildren]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SpringAppRootView(_root, _modalView, _toastView, _ensureAudio, _appRootViewOptions) {
    var _this;
    _classCallCheck(this, SpringAppRootView);
    _this = _callSuper(this, SpringAppRootView);

    // only safari need to ensure audio permission
    // safari not allow non any user interaction to play audio
    _this._root = _root;
    _this._modalView = _modalView;
    _this._toastView = _toastView;
    _this._ensureAudio = _ensureAudio;
    _this._appRootViewOptions = _appRootViewOptions;
    if ((0, _utils.isSafari)()) {
      _this._ensureAudio.ensure();
    }
    if (!_nextCore.isSharedWorker) {
      (0, _uiErrorIgnorer.uiErrorIgnorer)();
    }
    return _this;
  }
  _inherits(SpringAppRootView, _RcViewModule);
  return _createClass(SpringAppRootView, [{
    key: "Main",
    value: function Main(_ref) {
      var _this2 = this,
        _this$_appRootViewOpt,
        _this$_appRootViewOpt2,
        _this$_appRootViewOpt3,
        _this$_appRootViewOpt4,
        _this$_appRootViewOpt5,
        _this$_appRootViewOpt6;
      var children = _ref.children,
        _ref$overflowHidden = _ref.overflowHidden,
        overflowHidden = _ref$overflowHidden === void 0 ? true : _ref$overflowHidden;
      var _useAppContentRef = (0, _components.useAppContentRef)(),
        mainContentRef = _useAppContentRef.mainContentRef,
        expandedContentRef = _useAppContentRef.expandedContentRef;
      var expanded = (0, _nextCore.useConnector)(function () {
        return _this2._root.expanded;
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])('flex', 'w-full', 'flex-auto', overflowHidden ? 'overflow-hidden' : null)
      }, /*#__PURE__*/_react["default"].createElement("div", _extends({
        id: _viewTransition.VIEW_TRANSITION_CONTAINER_IDENTIFY,
        ref: mainContentRef
      }, (_this$_appRootViewOpt = this._appRootViewOptions) === null || _this$_appRootViewOpt === void 0 ? void 0 : _this$_appRootViewOpt.mainProps, {
        "data-sign": "mainContent",
        className: (0, _clsx["default"])(verticalContentStyles, this._root.expandedLayoutMainClass, (_this$_appRootViewOpt2 = this._appRootViewOptions) === null || _this$_appRootViewOpt2 === void 0 ? void 0 : (_this$_appRootViewOpt3 = _this$_appRootViewOpt2.mainProps) === null || _this$_appRootViewOpt3 === void 0 ? void 0 : _this$_appRootViewOpt3.className)
      }), children), expanded && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Divider, {
        orientation: "vertical",
        className: "flex-none"
      }), /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: expandedContentRef
      }, (_this$_appRootViewOpt4 = this._appRootViewOptions) === null || _this$_appRootViewOpt4 === void 0 ? void 0 : _this$_appRootViewOpt4.expandedProps, {
        "data-sign": "expandedContent",
        className: (0, _clsx["default"])(verticalContentStyles, 'flex-auto', (_this$_appRootViewOpt5 = this._appRootViewOptions) === null || _this$_appRootViewOpt5 === void 0 ? void 0 : (_this$_appRootViewOpt6 = _this$_appRootViewOpt5.expandedProps) === null || _this$_appRootViewOpt6 === void 0 ? void 0 : _this$_appRootViewOpt6.className)
      }))));
    }
  }, {
    key: "component",
    value: function component(_ref2) {
      var children = _ref2.children,
        ModalViewProps = _ref2.ModalViewProps,
        ToastViewProps = _ref2.ToastViewProps,
        header = _ref2.header,
        _ref2$overflowHidden = _ref2.overflowHidden,
        overflowHidden = _ref2$overflowHidden === void 0 ? true : _ref2$overflowHidden;
      return /*#__PURE__*/_react["default"].createElement(_components.AppProvider, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col h-full"
      }, header, /*#__PURE__*/_react["default"].createElement(this.Main, {
        overflowHidden: overflowHidden
      }, children)), /*#__PURE__*/_react["default"].createElement(this._modalView.component, ModalViewProps), /*#__PURE__*/_react["default"].createElement(this._toastView.component, ToastViewProps));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "Main", [_nextCore.autobind, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "Main"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SpringAppRoot.view.js.map
