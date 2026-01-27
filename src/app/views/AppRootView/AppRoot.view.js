"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRootView = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireDefault(require("react"));
var _services = require("../../services");
var _ModalView = require("../ModalView");
var _ToastView = require("../ToastView");
var _globalStyle = require("../globalStyle");
var _uiErrorIgnorer = require("./uiErrorIgnorer");
var _dec, _dec2, _dec3, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var AppRootView = exports.AppRootView = (_dec = (0, _nextCore.injectable)({
  name: 'AppRootView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _ModalView.ModalView === "undefined" ? Object : _ModalView.ModalView, typeof _ToastView.ToastView === "undefined" ? Object : _ToastView.ToastView, typeof _services.EnsureAudio === "undefined" ? Object : _services.EnsureAudio]), _dec(_class = _dec2(_class = _dec3(_class = /*#__PURE__*/function (_RcViewModule) {
  function AppRootView(_modalView, _toastView, _ensureAudio) {
    var _this;
    _classCallCheck(this, AppRootView);
    _this = _callSuper(this, AppRootView);

    // only safari need to ensure audio permission
    // safari not allow non any user interaction to play audio
    _this._modalView = _modalView;
    _this._toastView = _toastView;
    _this._ensureAudio = _ensureAudio;
    if ((0, _utils.isSafari)()) {
      _this._ensureAudio.ensure();
    }
    if (!_nextCore.isSharedWorker) {
      (0, _uiErrorIgnorer.uiErrorIgnorer)();
    }
    return _this;
  }
  _inherits(AppRootView, _RcViewModule);
  return _createClass(AppRootView, [{
    key: "component",
    value: function component(_ref) {
      var children = _ref.children,
        ModalViewProps = _ref.ModalViewProps,
        ToastViewProps = _ref.ToastViewProps,
        _ref$usingGlobalStyle = _ref.usingGlobalStyle,
        usingGlobalStyle = _ref$usingGlobalStyle === void 0 ? true : _ref$usingGlobalStyle;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, usingGlobalStyle && /*#__PURE__*/_react["default"].createElement(_globalStyle.GlobalStyle, null), children, /*#__PURE__*/_react["default"].createElement(this._modalView.component, ModalViewProps), /*#__PURE__*/_react["default"].createElement(this._toastView.component, ToastViewProps));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class);
//# sourceMappingURL=AppRoot.view.js.map
