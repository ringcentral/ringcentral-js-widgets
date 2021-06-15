"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Softphone = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.filter");

var _bowser = _interopRequireDefault(require("bowser"));

var _core = require("@ringcentral-integration/core");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _softphoneStatus = require("./softphoneStatus");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
    _this._callHandler = void 0;
    _this._extensionMode = void 0;

    _initializerDefineProperty(_this, "connectingPhoneNumber", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "softphoneStatus", _descriptor2, _assertThisInitialized(_this));

    _this._extensionMode = (_this$_deps$softphone = (_this$_deps$softphone2 = _this._deps.softphoneOptions) === null || _this$_deps$softphone2 === void 0 ? void 0 : _this$_deps$softphone2.extensionMode) !== null && _this$_deps$softphone !== void 0 ? _this$_deps$softphone : false;
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
      this.connectingPhoneNumber = null;
    }
  }, {
    key: "detectPlatform",
    value: function detectPlatform() {
      return _bowser["default"].parse(window.navigator && window.navigator.userAgent || 'unknown').platform.type;
    }
  }, {
    key: "_shouldInit",
    // TODO: move `ContactMatcher` deps to `Call`
    value: function _shouldInit() {
      var areAllReady = this[_core.noReadyModulesKey].filter(function (module) {
        return module && module[_core.identifierKey] !== 'contactMatcher';
      }).length === 0;
      return areAllReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var areNotReady = this[_core.noReadyModulesKey].filter(function (module) {
        return module && module[_core.identifierKey] !== 'contactMatcher';
      }).length > 0;
      return areNotReady && this.ready;
    } // currently we only have RingCentral App(rc brand)'s & AT&T universal link

  }, {
    key: "getMakeCallUri",
    value: function getMakeCallUri(phoneNumber, callingMode) {
      // spartan
      var command = "call?number=".concat(encodeURIComponent(phoneNumber));
      var protocol = this.spartanProtocol;
      var isJupiterUniversalLink = false; // jupiter

      var isCallWithJupiter = callingMode === _callingModes["default"].jupiter;

      if (isCallWithJupiter) {
        // jupiter doesn't recognize encoded string for now
        command = "r/call?number=".concat(phoneNumber);
        isJupiterUniversalLink = this.useJupiterUniversalLink;
        protocol = isJupiterUniversalLink ? this.jupiterUniversalLink : this.jupiterProtocol;
      }

      return {
        command: command,
        protocol: protocol,
        isJupiterUniversalLink: isJupiterUniversalLink,
        uri: "".concat(protocol).concat(command)
      };
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
                _context.next = 24;
                break;

              case 11:
                if (!window.navigator.msLaunchUri) {
                  _context.next = 15;
                  break;
                }

                // to support ie to start the service
                window.navigator.msLaunchUri(uri);
                _context.next = 24;
                break;

              case 15:
                // open via iframe
                frame = document.createElement('iframe');
                frame.style.display = 'none';
                document.body.appendChild(frame);
                _context.next = 20;
                return (0, _sleep["default"])(100);

              case 20:
                frame.contentWindow.location.href = uri;
                _context.next = 23;
                return (0, _sleep["default"])(300);

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
      switch (this._deps.brand.code) {
        case 'att':
          return 'attvr20://';

        case 'bt':
          return 'rcbtmobile://';

        case 'telus':
          return 'rctelus://';

        default:
          return 'rcmobile://';
      }
    }
  }, {
    key: "jupiterUniversalLink",
    get: function get() {
      switch (this._deps.brand.code) {
        case 'att':
          return 'https://app.officeathand.att.com/';

        case 'bt':
          return null;

        case 'telus':
          return null;

        default:
          return 'https://app.ringcentral.com/';
      }
    } // currently we don't have Bt brand uri scheme

  }, {
    key: "jupiterProtocol",
    get: function get() {
      switch (this._deps.brand.code) {
        case 'att':
          return 'officeathand://';

        case 'bt':
          return null;

        case 'telus':
          return 'rctelus://';

        default:
          return 'rcapp://';
      }
    }
  }, {
    key: "useJupiterUniversalLink",
    get: function get() {
      var _this$_deps$softphone4, _this$_deps$softphone5;

      // rc brand use scheme, partner brand use universal link
      return (_this$_deps$softphone4 = (_this$_deps$softphone5 = this._deps.softphoneOptions) === null || _this$_deps$softphone5 === void 0 ? void 0 : _this$_deps$softphone5.useJupiterUniversalLink) !== null && _this$_deps$softphone4 !== void 0 ? _this$_deps$softphone4 : this._deps.brand.code !== 'rc';
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
