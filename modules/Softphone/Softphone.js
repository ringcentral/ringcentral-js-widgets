"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.link");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Softphone = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _bowser = _interopRequireDefault(require("bowser"));
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _callingModes = require("../CallingSettings/callingModes");
var _softphoneStatus = require("./softphoneStatus");
var _dec, _class, _class2, _descriptor, _descriptor2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * @class
 * @description Softphone module to call softphone
 */
var Softphone = (_dec = (0, _di.Module)({
  name: 'Softphone',
  deps: ['Brand', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'SoftphoneOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Softphone, _RcModuleV);
  var _super = _createSuper(Softphone);
  function Softphone(deps) {
    var _this$_deps$softphone, _this$_deps$softphone2, _this$_deps$softphone3;
    var _this;
    _classCallCheck(this, Softphone);
    _this = _super.call(this, {
      deps: deps
    });
    // @ts-expect-error TS(2345): Argument of type 'ContactMatcher<Entity, Deps> | u... Remove this comment to see the full error message
    _this._callHandler = void 0;
    _this._extensionMode = void 0;
    _initializerDefineProperty(_this, "connectingPhoneNumber", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "softphoneStatus", _descriptor2, _assertThisInitialized(_this));
    _this._ignoreModuleReadiness(deps.contactMatcher);
    _this._extensionMode = (_this$_deps$softphone = (_this$_deps$softphone2 = _this._deps.softphoneOptions) === null || _this$_deps$softphone2 === void 0 ? void 0 : _this$_deps$softphone2.extensionMode) !== null && _this$_deps$softphone !== void 0 ? _this$_deps$softphone : false;
    // @ts-expect-error TS(2322): Type '((context: CallHandlerContext) => any) | und... Remove this comment to see the full error message
    _this._callHandler = (_this$_deps$softphone3 = _this._deps.softphoneOptions) === null || _this$_deps$softphone3 === void 0 ? void 0 : _this$_deps$softphone3.callHandler;
    return _this;
  }
  _createClass(Softphone, [{
    key: "startToConnect",
    value: function startToConnect(phoneNumber) {
      this.softphoneStatus = _softphoneStatus.softphoneStatus.connecting;
      this.connectingPhoneNumber = phoneNumber;
    }
  }, {
    key: "connectComplete",
    value: function connectComplete() {
      this.softphoneStatus = _softphoneStatus.softphoneStatus.idle;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      this.connectingPhoneNumber = null;
    }
  }, {
    key: "detectPlatform",
    value: function detectPlatform() {
      return _bowser["default"].parse(window.navigator && window.navigator.userAgent || 'unknown').platform.type;
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
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        isJupiterUniversalLink = this._useJupiterUniversalLink(callingMode);
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
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
      var _this$_deps$softphone4, _this$_deps$softphone5;
      // rc brand: call with jupiter, use scheme
      // rc brand: call with jupiter web, use universal link
      // partner brand: use universal link
      if (callingMode === _callingModes.callingModes.jupiterUniversalLink) {
        return true;
      }
      return (_this$_deps$softphone4 = (_this$_deps$softphone5 = this._deps.softphoneOptions) === null || _this$_deps$softphone5 === void 0 ? void 0 : _this$_deps$softphone5.useJupiterUniversalLink) !== null && _this$_deps$softphone4 !== void 0 ? _this$_deps$softphone4 : this._deps.brand.brandConfig.allowJupiterUniversalLink;
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phoneNumber, callingMode) {
        var _this$getMakeCallUri, protocol, command, uri, isJupiterUniversalLink, openLink, frame;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.startToConnect(phoneNumber);
                _this$getMakeCallUri = this.getMakeCallUri(phoneNumber, callingMode), protocol = _this$getMakeCallUri.protocol, command = _this$getMakeCallUri.command, uri = _this$getMakeCallUri.uri, isJupiterUniversalLink = _this$getMakeCallUri.isJupiterUniversalLink;
                if (!this._callHandler) {
                  _context.next = 6;
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
                _context.next = 24;
                break;
              case 6:
                /**
                 * 1. Use window.open in extension background scripts to avoid crashing Browsers
                 * 2. Use window.open in non-desktop platforms
                 * 3. to support ie on Windows < 8
                 * 4. for Jupiter universal link, should open link directly
                 */
                openLink = isJupiterUniversalLink || this._extensionMode || this.detectPlatform() !== 'desktop' || window.ActiveXObject || 'ActiveXObject' in window;
                if (!openLink) {
                  _context.next = 11;
                  break;
                }
                window.open(uri);
                // @ts-expect-error TS(2339): Property 'msLaunchUri' does not exist on type 'Nav... Remove this comment to see the full error message
                _context.next = 24;
                break;
              case 11:
                if (!window.navigator.msLaunchUri) {
                  _context.next = 15;
                  break;
                }
                // to support ie to start the service
                // @ts-expect-error TS(2339): Property 'msLaunchUri' does not exist on type 'Nav... Remove this comment to see the full error message
                window.navigator.msLaunchUri(uri);
                _context.next = 24;
                break;
              case 15:
                // open via iframe
                frame = document.createElement('iframe');
                frame.style.display = 'none';
                document.body.appendChild(frame);
                _context.next = 20;
                return (0, _utils.sleep)(100);
              case 20:
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                frame.contentWindow.location.href = uri;
                _context.next = 23;
                return (0, _utils.sleep)(300);
              case 23:
                document.body.removeChild(frame);
              case 24:
                if (!this._deps.contactMatcher) {
                  _context.next = 27;
                  break;
                }
                _context.next = 27;
                return this._deps.contactMatcher.forceMatchNumber({
                  phoneNumber: phoneNumber
                });
              case 27:
                this.connectComplete();
              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function makeCall(_x, _x2) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "spartanProtocol",
    get: function get() {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      return this._deps.brand.brandConfig.callWithSoftphone.protocol;
    } // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  }, {
    key: "jupiterUniversalLink",
    get: function get() {
      var _this$_deps$brand$bra;
      return (_this$_deps$brand$bra = this._deps.brand.brandConfig.callWithJupiter) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.link;
    }
  }, {
    key: "jupiterAppName",
    get: function get() {
      var _this$_deps$brand$bra2;
      return (_this$_deps$brand$bra2 = this._deps.brand.brandConfig.callWithJupiter) === null || _this$_deps$brand$bra2 === void 0 ? void 0 : _this$_deps$brand$bra2.name;
    } // currently we don't have Bt brand uri scheme
  }, {
    key: "jupiterProtocol",
    get: function get() {
      var _this$_deps$brand$bra3;
      return (_this$_deps$brand$bra3 = this._deps.brand.brandConfig.callWithJupiter) === null || _this$_deps$brand$bra3 === void 0 ? void 0 : _this$_deps$brand$bra3.protocol;
    }
  }]);
  return Softphone;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectingPhoneNumber", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "softphoneStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _softphoneStatus.softphoneStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "startToConnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "startToConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectComplete", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectComplete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype)), _class2)) || _class);
exports.Softphone = Softphone;
//# sourceMappingURL=Softphone.js.map
