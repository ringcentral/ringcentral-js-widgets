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
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Softphone = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.link.js");
var _services = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _bowser = _interopRequireDefault(require("bowser"));
var _callingModes = require("../CallingSettings/callingModes");
var _softphoneStatus = require("./softphoneStatus");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2;
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
var Softphone = exports.Softphone = (_dec = (0, _nextCore.injectable)({
  name: 'Softphone'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('SoftphoneOptions')(target, undefined, 2);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services.ContactMatcher === "undefined" ? Object : _services.ContactMatcher, typeof SoftphoneOptions === "undefined" ? Object : SoftphoneOptions]), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = (0, _nextCore.delegate)('mainClient'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec18 = (0, _nextCore.delegate)('mainClient'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String, String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Softphone(_brand, _contactMatcher, _softphoneOptions) {
    var _this$_softphoneOptio, _this$_softphoneOptio2, _this$_softphoneOptio3;
    var _this;
    _classCallCheck(this, Softphone);
    _this = _callSuper(this, Softphone);
    // TODO: revert the logic
    // this._ignoreModuleReadiness(this._contactMatcher);
    _this._brand = _brand;
    _this._contactMatcher = _contactMatcher;
    _this._softphoneOptions = _softphoneOptions;
    _this._callHandler = void 0;
    _this._extensionMode = void 0;
    _initializerDefineProperty(_this, "connectingPhoneNumber", _descriptor, _this);
    _initializerDefineProperty(_this, "softphoneStatus", _descriptor2, _this);
    _this._extensionMode = (_this$_softphoneOptio = (_this$_softphoneOptio2 = _this._softphoneOptions) === null || _this$_softphoneOptio2 === void 0 ? void 0 : _this$_softphoneOptio2.extensionMode) !== null && _this$_softphoneOptio !== void 0 ? _this$_softphoneOptio : false;
    _this._callHandler = (_this$_softphoneOptio3 = _this._softphoneOptions) === null || _this$_softphoneOptio3 === void 0 ? void 0 : _this$_softphoneOptio3.callHandler;
    return _this;
  }
  _inherits(Softphone, _RcModule);
  return _createClass(Softphone, [{
    key: "startToConnect",
    value: function () {
      var _startToConnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(phoneNumber) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._startToConnect(phoneNumber);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function startToConnect(_x) {
        return _startToConnect2.apply(this, arguments);
      }
      return startToConnect;
    }()
  }, {
    key: "_startToConnect",
    value: function _startToConnect(phoneNumber) {
      this.softphoneStatus = _softphoneStatus.softphoneStatus.connecting;
      this.connectingPhoneNumber = phoneNumber;
    }
  }, {
    key: "connectComplete",
    value: function () {
      var _connectComplete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._connectComplete();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function connectComplete() {
        return _connectComplete2.apply(this, arguments);
      }
      return connectComplete;
    }()
  }, {
    key: "_connectComplete",
    value: function _connectComplete() {
      this.softphoneStatus = _softphoneStatus.softphoneStatus.idle;
      this.connectingPhoneNumber = null;
    }
  }, {
    key: "detectPlatform",
    value: function () {
      var _detectPlatform = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, _bowser["default"].parse(window.navigator && window.navigator.userAgent || 'unknown').platform.type);
          }
        }, _callee3);
      }));
      function detectPlatform() {
        return _detectPlatform.apply(this, arguments);
      }
      return detectPlatform;
    }()
  }, {
    key: "spartanProtocol",
    get: function get() {
      var _this$_brand, _this$_brand$brandCon;
      return (_this$_brand = this._brand) === null || _this$_brand === void 0 ? void 0 : (_this$_brand$brandCon = _this$_brand.brandConfig.callWithSoftphone) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.protocol;
    }

    // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  }, {
    key: "jupiterUniversalLink",
    get: function get() {
      var _this$_brand$brandCon2;
      return (_this$_brand$brandCon2 = this._brand.brandConfig.callWithJupiter) === null || _this$_brand$brandCon2 === void 0 ? void 0 : _this$_brand$brandCon2.link;
    }
  }, {
    key: "jupiterAppName",
    get: function get() {
      var _this$_brand$brandCon3;
      return (_this$_brand$brandCon3 = this._brand.brandConfig.callWithJupiter) === null || _this$_brand$brandCon3 === void 0 ? void 0 : _this$_brand$brandCon3.name;
    }

    // currently we don't have Bt brand uri scheme
  }, {
    key: "jupiterProtocol",
    get: function get() {
      var _this$_brand$brandCon4;
      return (_this$_brand$brandCon4 = this._brand.brandConfig.callWithJupiter) === null || _this$_brand$brandCon4 === void 0 ? void 0 : _this$_brand$brandCon4.protocol;
    }
  }, {
    key: "getMakeCallUri",
    value: function getMakeCallUri(phoneNumber, callingMode) {
      // spartan
      var command = "call?number=".concat(encodeURIComponent(phoneNumber));
      var protocol = this.spartanProtocol;
      var isJupiterUniversalLink = false;
      // jupiter
      var isCallWithJupiter = [_callingModes.callingModes.jupiter, _callingModes.callingModes.jupiterUniversalLink].includes(callingMode);
      if (isCallWithJupiter) {
        // jupiter doesn't recognize encoded string for now
        command = "r/call?number=".concat(phoneNumber);
        isJupiterUniversalLink = !!this._useJupiterUniversalLink(callingMode);
        protocol = isJupiterUniversalLink ? (0, _utils.normalizeUniversalLink)(this.jupiterUniversalLink) : this.jupiterProtocol;
      }
      return {
        command: command,
        protocol: protocol,
        isJupiterUniversalLink: isJupiterUniversalLink,
        uri: "".concat(protocol).concat(command)
      };
    }
  }, {
    key: "_useJupiterUniversalLink",
    value: function _useJupiterUniversalLink(callingMode) {
      var _this$_softphoneOptio4, _this$_softphoneOptio5;
      // rc brand: call with jupiter, use scheme
      // rc brand: call with jupiter web, use universal link
      // partner brand: use universal link
      if (callingMode === _callingModes.callingModes.jupiterUniversalLink) {
        return true;
      }
      return (_this$_softphoneOptio4 = (_this$_softphoneOptio5 = this._softphoneOptions) === null || _this$_softphoneOptio5 === void 0 ? void 0 : _this$_softphoneOptio5.useJupiterUniversalLink) !== null && _this$_softphoneOptio4 !== void 0 ? _this$_softphoneOptio4 : this._brand.brandConfig.allowJupiterUniversalLink;
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(phoneNumber, callingMode) {
        var _this$getMakeCallUri, protocol, command, uri, isJupiterUniversalLink, openLink, frame, _t, _t2, _t3, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.startToConnect(phoneNumber);
            case 1:
              _this$getMakeCallUri = this.getMakeCallUri(phoneNumber, callingMode), protocol = _this$getMakeCallUri.protocol, command = _this$getMakeCallUri.command, uri = _this$getMakeCallUri.uri, isJupiterUniversalLink = _this$getMakeCallUri.isJupiterUniversalLink;
              if (!this._callHandler) {
                _context4.n = 2;
                break;
              }
              this._callHandler({
                callingMode: callingMode,
                protocol: protocol,
                command: command,
                uri: uri,
                isJupiterUniversalLink: isJupiterUniversalLink,
                phoneNumber: phoneNumber
              });
              _context4.n = 11;
              break;
            case 2:
              _t3 = isJupiterUniversalLink || this._extensionMode;
              if (_t3) {
                _context4.n = 4;
                break;
              }
              _context4.n = 3;
              return this.detectPlatform();
            case 3:
              _t4 = _context4.v;
              _t3 = _t4 !== 'desktop';
            case 4:
              _t2 = _t3;
              if (_t2) {
                _context4.n = 5;
                break;
              }
              _t2 = window.ActiveXObject;
            case 5:
              _t = _t2;
              if (_t) {
                _context4.n = 6;
                break;
              }
              _t = 'ActiveXObject' in window;
            case 6:
              openLink = _t;
              if (!openLink) {
                _context4.n = 7;
                break;
              }
              window.open(uri);
              // TODO: fix type
              // @ts-ignore
              _context4.n = 11;
              break;
            case 7:
              if (!window.navigator.msLaunchUri) {
                _context4.n = 8;
                break;
              }
              // to support ie to start the service
              // TODO: fix type
              // @ts-ignore
              window.navigator.msLaunchUri(uri);
              _context4.n = 11;
              break;
            case 8:
              // open via iframe
              frame = document.createElement('iframe');
              frame.style.display = 'none';
              document.body.appendChild(frame);
              _context4.n = 9;
              return (0, _utils.sleep)(100);
            case 9:
              frame.contentWindow.location.href = uri;
              _context4.n = 10;
              return (0, _utils.sleep)(300);
            case 10:
              document.body.removeChild(frame);
            case 11:
              if (!this._contactMatcher) {
                _context4.n = 12;
                break;
              }
              _context4.n = 12;
              return this._contactMatcher.forceMatchNumber({
                phoneNumber: phoneNumber
              });
            case 12:
              this.connectComplete();
            case 13:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function makeCall(_x2, _x3) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectingPhoneNumber", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "softphoneStatus", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _softphoneStatus.softphoneStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "startToConnect", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "startToConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_startToConnect", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_startToConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectComplete", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "connectComplete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connectComplete", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_connectComplete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "detectPlatform", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "detectPlatform"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Softphone.js.map
