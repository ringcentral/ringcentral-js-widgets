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
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchCallConfirmView = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _ActiveCallItemV = require("@ringcentral-integration/widgets/components/ActiveCallItemV2");
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _react = _interopRequireDefault(require("react"));
var _services2 = require("../../services");
var _i18n = require("./i18n");
var _templateObject, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var modalClasses = {
  paper: 'switch-dialog-paper'
};
var SwitchModalGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .", " {\n    margin: ", ";\n    width: 100%;\n  }\n"])), modalClasses.paper, function (_ref) {
  var $isWide = _ref.$isWide;
  return $isWide ? (0, _spacing.spacing)(4) : (0, _spacing.spacing)(3);
});
var SwitchCallConfirmView = exports.SwitchCallConfirmView = (_dec = (0, _nextCore.injectable)({
  name: 'SwitchCallConfirmView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.Webphone === "undefined" ? Object : _services2.Webphone, typeof _services2.ActiveCallControl === "undefined" ? Object : _services2.ActiveCallControl]), _dec5 = Reflect.metadata("design:type", typeof Call === "undefined" ? Object : Call), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof Call === "undefined" ? Object : Call]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Boolean]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [typeof Call === "undefined" ? Object : Call]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SwitchCallConfirmView(_modalView, _regionSettings, _webphone, _activeCallControl) {
    var _this;
    _classCallCheck(this, SwitchCallConfirmView);
    _this = _callSuper(this, SwitchCallConfirmView);
    _this._modalView = _modalView;
    _this._regionSettings = _regionSettings;
    _this._webphone = _webphone;
    _this._activeCallControl = _activeCallControl;
    _initializerDefineProperty(_this, "contactName", _descriptor, _this);
    _initializerDefineProperty(_this, "call", _descriptor2, _this);
    _initializerDefineProperty(_this, "isWide", _descriptor3, _this);
    _initializerDefineProperty(_this, "switchConfirmModal", _descriptor4, _this);
    return _this;
  }
  _inherits(SwitchCallConfirmView, _RcViewModule);
  return _createClass(SwitchCallConfirmView, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        var _this2$_activeCallCon;
        return (_this2$_activeCallCon = _this2._activeCallControl) === null || _this2$_activeCallCon === void 0 ? void 0 : _this2$_activeCallCon.sessions;
      }, function (sessions) {
        if (_this2.call && ((sessions === null || sessions === void 0 ? void 0 : sessions.length) === 0 || !sessions.find(function (s) {
          var _this2$call;
          return s.sessionId === ((_this2$call = _this2.call) === null || _this2$call === void 0 ? void 0 : _this2$call.sessionId);
        }))) {
          _this2.close();
        }
      });
    }
  }, {
    key: "setContactName",
    value: function setContactName(contactName) {
      this.contactName = contactName;
    }
  }, {
    key: "setCall",
    value: function setCall(call) {
      this.call = call;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber(call) {
      var _call$from, _call$from2, _call$to, _call$to2;
      return (0, _callLogHelpers.isInbound)(call) ? (call === null || call === void 0 ? void 0 : (_call$from = call.from) === null || _call$from === void 0 ? void 0 : _call$from.phoneNumber) || (call === null || call === void 0 ? void 0 : (_call$from2 = call.from) === null || _call$from2 === void 0 ? void 0 : _call$from2.extensionNumber) : (call === null || call === void 0 ? void 0 : (_call$to = call.to) === null || _call$to === void 0 ? void 0 : _call$to.phoneNumber) || (call === null || call === void 0 ? void 0 : (_call$to2 = call.to) === null || _call$to2 === void 0 ? void 0 : _call$to2.extensionNumber);
    }
  }, {
    key: "getContactName",
    value: function getContactName(call) {
      return this.getPhoneNumber(call);
    }
  }, {
    key: "setIsWide",
    value: function setIsWide(isWide) {
      this.isWide = isWide;
    }
  }, {
    key: "open",
    value: function () {
      var _open = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(call) {
        var _this$getContactName;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.setContactName((_this$getContactName = this.getContactName(call)) !== null && _this$getContactName !== void 0 ? _this$getContactName : '');
              this.setCall(call);
              this._modalView.open(this.switchConfirmModal, {
                call: call
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function open(_x) {
        return _open.apply(this, arguments);
      }
      return open;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._modalView.close(this.switchConfirmModal);
              this.setCall(null);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$call;
      return {
        contactName: this.contactName,
        confirmContext: ((_this$call = this.call) === null || _this$call === void 0 ? void 0 : _this$call.isConferenceCall) ? (0, _i18n.t)('conferenceCallSwitchConfirmContext') : (0, _i18n.t)('comfirmContext', {
          displayName: this.contactName
        })
      };
    }
  }, {
    key: "component",
    value: function component() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(SwitchModalGlobalStyle, {
        $isWide: this.isWide
      }), /*#__PURE__*/_react["default"].createElement(_ActiveCallItemV.ModalContent, this.getUIProps()));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "contactName", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "call", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isWide", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setContactName", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "setContactName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCall", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setCall"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "switchConfirmModal", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;
    return this._modalView.create({
      view: this,
      props: function props(_ref2) {
        var call = _ref2.call;
        return {
          classes: modalClasses,
          header: (0, _i18n.t)('callSwitch'),
          confirmButtonText: (0, _i18n.t)('comfirmOKButton'),
          cancelButtonText: (0, _i18n.t)('comfirmCancelButton'),
          onConfirm: function () {
            var _onConfirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    if (!_this3._activeCallControl) {
                      _context3.n = 1;
                      break;
                    }
                    return _context3.a(2, _this3._activeCallControl["switch"](call.telephonySessionId));
                  case 1:
                    // if (!this._webphone) {
                    //   return;
                    // }
                    // await this._webphone.switchCall(
                    //   call,
                    //   this._regionSettings.homeCountryId,
                    // );
                    _this3.close();
                  case 2:
                    return _context3.a(2);
                }
              }, _callee3);
            }));
            function onConfirm() {
              return _onConfirm.apply(this, arguments);
            }
            return onConfirm;
          }(),
          onCancel: function onCancel() {
            _this3.setCall(null);
          }
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsWide", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsWide"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "open", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "open"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "close", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "close"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SwitchCallConfirm.view.js.map
