"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _ramda = require("ramda");

var _events = _interopRequireDefault(require("events"));

var _ringcentralWebPhone = _interopRequireDefault(require("ringcentral-web-phone"));

var _incoming = _interopRequireDefault(require("ringcentral-web-phone/audio/incoming.ogg"));

var _outgoing = _interopRequireDefault(require("ringcentral-web-phone/audio/outgoing.ogg"));

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _connectionStatus = _interopRequireDefault(require("./connectionStatus"));

var _sessionStatus = _interopRequireDefault(require("./sessionStatus"));

var _recordStatus = _interopRequireDefault(require("./recordStatus"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _webphoneErrors = _interopRequireDefault(require("./webphoneErrors"));

var _callErrors = _interopRequireDefault(require("../Call/callErrors"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _validateNumbers = _interopRequireDefault(require("../../lib/validateNumbers"));

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

var _webphoneHelper = require("./webphoneHelper");

var _getWebphoneReducer = _interopRequireDefault(require("./getWebphoneReducer"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var AUTO_RETRIES_DELAY = [0, 5 * 1000, 10 * 1000, 30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000, 30 * 60 * 1000];
var RETRY_DELAY = 5 * 1000;
var INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;
var extendedControlStatus = new _Enum["default"](['pending', 'playing', 'stopped']);
var EVENTS = new _Enum["default"](['callRing', 'callStart', 'callEnd', 'callHold', 'callResume', 'beforeCallResume', 'beforeCallEnd', 'callInit']);
var registerErrors = [_webphoneErrors["default"].sipProvisionError, _webphoneErrors["default"].webphoneCountOverLimit, _webphoneErrors["default"].webphoneForbidden, _webphoneErrors["default"].requestTimeout, _webphoneErrors["default"].internalServerError, _webphoneErrors["default"].serverTimeout, _webphoneErrors["default"].unknownError, _webphoneErrors["default"].connectFailed];
/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */

var Webphone = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Client', 'NumberValidate', 'RolesAndPermissions', 'Brand', 'RegionSettings', 'AudioSettings', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'WebphoneOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Webphone, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brand} params.brand - app brand
   * @param {RegionSettings} params.regionSettings - regionSettings
   * @param {String} params.appKey - app key
   * @param {String} params.appName - app name
   * @param {String} params.appVersion - app version
   * @param {Number} params.webphoneLogLevel - log Level
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance, optional
   * @param {Function} params.onCallEnd - callback on a call end
   * @param {Function} params.onCallRing - callback on a call ring
   * @param {Function} params.onCallStart - callback on a call accpeted by callee
   * @param {Function} params.onCallInit - callback on create a new call
   * @param {Function} params.onCallResume - callback on a call resume
   * @param {Function} params.onCallHold - callback on a call holded
   * @param {Function} params.onBeforeCallResume - callback before a call resume
   * @param {Function} params.onBeforeCallEnd - callback before a call hangup
   * @param {Object} params.webphoneSDKOptions - callback before a call hangup
   */
  function Webphone(_ref) {
    var _context;

    var _this;

    var appKey = _ref.appKey,
        appName = _ref.appName,
        appVersion = _ref.appVersion,
        alert = _ref.alert,
        auth = _ref.auth,
        client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$webphoneLogLevel = _ref.webphoneLogLevel,
        webphoneLogLevel = _ref$webphoneLogLevel === void 0 ? 3 : _ref$webphoneLogLevel,
        contactMatcher = _ref.contactMatcher,
        numberValidate = _ref.numberValidate,
        audioSettings = _ref.audioSettings,
        tabManager = _ref.tabManager,
        onCallEnd = _ref.onCallEnd,
        onCallRing = _ref.onCallRing,
        onCallStart = _ref.onCallStart,
        onCallResume = _ref.onCallResume,
        onCallHold = _ref.onCallHold,
        onCallInit = _ref.onCallInit,
        onBeforeCallResume = _ref.onBeforeCallResume,
        onBeforeCallEnd = _ref.onBeforeCallEnd,
        regionSettings = _ref.regionSettings,
        brand = _ref.brand,
        webphoneSDKOptions = _ref.webphoneSDKOptions,
        _ref$permissionCheck = _ref.permissionCheck,
        permissionCheck = _ref$permissionCheck === void 0 ? true : _ref$permissionCheck,
        options = _objectWithoutProperties(_ref, ["appKey", "appName", "appVersion", "alert", "auth", "client", "rolesAndPermissions", "webphoneLogLevel", "contactMatcher", "numberValidate", "audioSettings", "tabManager", "onCallEnd", "onCallRing", "onCallStart", "onCallResume", "onCallHold", "onCallInit", "onBeforeCallResume", "onBeforeCallEnd", "regionSettings", "brand", "webphoneSDKOptions", "permissionCheck"]);

    _classCallCheck(this, Webphone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Webphone).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "ringingCallOnView", _descriptor, _assertThisInitialized(_this));

    _this._regionSettings = regionSettings;
    _this._brand = brand;
    _this._eventEmitter = new _events["default"]();
    _this._appKey = appKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._alert = alert;
    _this._webphoneLogLevel = webphoneLogLevel;
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._numberValidate = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, numberValidate, 'numberValidate');
    _this._audioSettings = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, audioSettings, 'audioSettings');
    _this._contactMatcher = contactMatcher;
    _this._tabManager = tabManager;
    _this._webphoneSDKOptions = webphoneSDKOptions || {};
    _this._permissionCheck = permissionCheck;
    _this._reconnectDelays = AUTO_RETRIES_DELAY;

    if (typeof onCallEnd === 'function') {
      _this._eventEmitter.on(EVENTS.callEnd, onCallEnd);
    }

    if (typeof onCallRing === 'function') {
      _this._eventEmitter.on(EVENTS.callRing, onCallRing);
    }

    if (typeof onCallStart === 'function') {
      _this._eventEmitter.on(EVENTS.callStart, onCallStart);
    }

    if (typeof onCallResume === 'function') {
      _this._eventEmitter.on(EVENTS.callResume, onCallResume);
    }

    if (typeof onCallHold === 'function') {
      _this._eventEmitter.on(EVENTS.callHold, onCallHold);
    }

    if (typeof onCallInit === 'function') {
      _this._eventEmitter.on(EVENTS.callInit, onCallInit);
    }

    if (typeof onBeforeCallResume === 'function') {
      _this._eventEmitter.on(EVENTS.beforeCallResume, onBeforeCallResume);
    }

    _this._onBeforeCallEndFunctions = [];

    if (typeof onBeforeCallEnd === 'function') {
      _this._eventEmitter.on(EVENTS.beforeCallEnd, onBeforeCallEnd);
    }

    _this._webphone = null;
    _this._remoteVideo = null;
    _this._localVideo = null;
    _this._sessions = new Map();
    _this._reducer = (0, _getWebphoneReducer["default"])(_this.actionTypes);
    _this._needToReconnectAfterSessionEnd = false;
    _this._connectTimeout = null;

    _this.addSelector('sessionPhoneNumbers', function () {
      return _this.sessions;
    }, function (sessions) {
      var outputs = [];
      sessions.forEach(function (session) {
        outputs.push(session.to);
        outputs.push(session.from);
      });
      return outputs;
    });

    _this.addSelector('ringSession', function () {
      return _this.ringSessionId;
    }, function () {
      return _this.sessions;
    }, function (ringSessionId, sessions) {
      if (!ringSessionId) {
        return null;
      }

      var ringSession = (0, _ramda.find)(function (session) {
        return session.id === ringSessionId;
      }, sessions);
      return ringSession;
    });

    _this.addSelector('cachedSessions', function () {
      return _this.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return session.cached;
      }, sessions);
    });

    _this.addSelector('activeSession', function () {
      return _this.activeSessionId;
    }, function () {
      return _this.sessions;
    }, function (activeSessionId, sessions) {
      if (!activeSessionId) {
        return null;
      }

      var activeSession = (0, _ramda.find)(function (session) {
        return session.id === activeSessionId;
      }, sessions);
      return activeSession;
    });

    _this.addSelector('ringSessions', function () {
      return _this.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isRing)(session);
      }, sessions);
    });

    _this.addSelector('onHoldSessions', function () {
      return _this.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isOnHold)(session);
      }, sessions);
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.sessionPhoneNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this.ready;
        }
      });
    }

    _this._isFirstRegister = true;
    return _this;
  }

  _createClass(Webphone, [{
    key: "_prepareVideoElement",
    value: function _prepareVideoElement() {
      this._remoteVideo = document.createElement('video');
      this._remoteVideo.id = 'remoteVideo';

      this._remoteVideo.setAttribute('hidden', 'hidden');

      this._localVideo = document.createElement('video');
      this._localVideo.id = 'localVideo';

      this._localVideo.setAttribute('hidden', 'hidden');

      this._localVideo.setAttribute('muted', 'muted');

      this._localVideo.muted = true;
      document.body.appendChild(this._remoteVideo);
      document.body.appendChild(this._localVideo);
      this._remoteVideo.volume = this._audioSettings.callVolume;

      if (this._audioSettings.supportDevices) {
        this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
      }

      this.store.dispatch({
        type: this.actionTypes.videoElementPrepared
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
          window.addEventListener('load', function () {
            _this2._prepareVideoElement();
          });
        } else {
          this._prepareVideoElement();
        }

        window.addEventListener('unload', function () {
          _this2._disconnect();
        });
      }

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._shouldInit()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                  this.disconnect();
                }

                if (this.ready && (this._ringtoneVolume !== this._audioSettings.ringtoneVolume || this._ringtoneMuted !== this._audioSettings.ringtoneMuted)) {
                  this._ringtoneVolume = this._audioSettings.ringtoneVolume;
                  this._ringtoneMuted = this._audioSettings.ringtoneMuted;

                  if (this._webphone && this._webphone.userAgent) {
                    this._webphone.userAgent.audioHelper.setVolume(this._ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume);
                  }
                }

                if (this.ready && this._callVolume !== this._audioSettings.callVolume) {
                  this._callVolume = this._audioSettings.callVolume;

                  if (this._remoteVideo) {
                    this._remoteVideo.volume = this._audioSettings.callVolume;
                  }
                }

                if (this.ready && this._audioSettings.supportDevices && this._outputDeviceId !== this._audioSettings.outputDeviceId) {
                  this._outputDeviceId = this._audioSettings.outputDeviceId;

                  if (this._remoteVideo) {
                    this._remoteVideo.setSinkId(this._outputDeviceId);
                  }
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._rolesAndPermissions.ready && this._numberValidate.ready && this._audioSettings.ready && (!this._tabManager || this._tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._rolesAndPermissions.ready || !this._numberValidate.ready || !!this._tabManager && !this._tabManager.ready || !this._audioSettings.ready) && this.ready;
    }
  }, {
    key: "_sipProvision",
    value: function () {
      var _sipProvision2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._client.service.platform().post('/client-info/sip-provision', {
                  sipInfo: [{
                    transport: 'WSS'
                  }]
                });

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", response.json());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _sipProvision() {
        return _sipProvision2.apply(this, arguments);
      }

      return _sipProvision;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response, devices, phoneLines;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._client.account().extension().device().list();

              case 2:
                response = _context4.sent;
                devices = response.records;
                phoneLines = [];
                devices.forEach(function (device) {
                  if (!device.phoneLines || device.phoneLines.length === 0) {
                    return;
                  }

                  phoneLines = phoneLines.concat(device.phoneLines);
                });
                return _context4.abrupt("return", phoneLines);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }

      return _fetchDL;
    }()
  }, {
    key: "_removeWebphone",
    value: function _removeWebphone() {
      if (!this._webphone || !this._webphone.userAgent) {
        return;
      }

      this._webphone.userAgent.stop();

      this._webphone.userAgent.unregister();

      this._webphone.userAgent.removeAllListeners();

      this._webphone.userAgent.transport.removeAllListeners();

      this._webphone.userAgent.transport.disconnect();

      this._webphone = null;
    }
  }, {
    key: "_createWebphone",
    value: function _createWebphone(provisionData) {
      var _this3 = this;

      this._removeWebphone();

      this._webphone = new _ringcentralWebPhone["default"](provisionData, _objectSpread({
        appKey: this._appKey,
        appName: this._appName,
        appVersion: this._appVersion,
        uuid: this._auth.endpointId,
        logLevel: this._webphoneLogLevel,
        // error 0, warn 1, log: 2, debug: 3
        audioHelper: {
          enabled: true // enables audio feedback when web phone is ringing or making a call

        },
        media: {
          remote: this._remoteVideo,
          local: this._localVideo
        },
        enableQos: (0, _webphoneHelper.isChrome)(),
        enableMidLinesInSDP: (0, _webphoneHelper.isFirefox)()
      }, this._webphoneSDKOptions));

      this._webphone.userAgent.audioHelper.loadAudio({
        incoming: _incoming["default"],
        // path to audio file for incoming call
        outgoing: _outgoing["default"] // path to aduotfile for outgoing call

      });

      this._webphone.userAgent.audioHelper.setVolume(this._audioSettings.ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume); // Webphone userAgent registed event


      this._webphone.userAgent.on('registered', function () {
        if (!_this3.connected) {
          _this3.store.dispatch({
            type: _this3.actionTypes.registered
          });

          _this3._alert.info({
            message: _webphoneErrors["default"].connected
          });

          _this3._hideRegisterErrorAlert();
        }
      });

      this._webphone.userAgent.on('unregistered', function (e) {
        console.log('web phone unregistered event', e);

        if (_this3.disconnecting) {
          // user unregister
          _this3.store.dispatch({
            type: _this3.actionTypes.unregistered
          });

          return;
        } // unavailable


        _this3.store.dispatch({
          type: _this3.actionTypes.connectError
        });
      });

      this._webphone.userAgent.on('registrationFailed', function (response, cause) {
        console.error('Webphone Register Error:', response, cause); // For 401

        if (!response && cause === 'Connection Error') {
          return;
        }

        var message = response && response.data || response;

        if (message && typeof message === 'string' && _this3._webphone.userAgent.transport.isSipErrorCode(message)) {
          // error is handled in webphone sdk;
          return;
        } // don't handled in connection is disconnecting


        if (_this3.disconnected || _this3.disconnecting) {
          return;
        }

        var errorCode; // limit logic:

        /*
         * Specialties of this flow are next:
         *   6th WebRTC in another browser receives 6th ‘EndpointID’ and 1st ‘InstanceID’,
         *   which has been given previously to the 1st ‘EndpointID’.
         *   It successfully registers on WSX by moving 1st ‘EndpointID’ to a blacklist state.
         *   When 1st WebRTC client re-registers on expiration timeout,
         *   WSX defines that 1st ‘EndpointID’ is blacklisted and responds with ‘SIP/2.0 403 Forbidden,
         *   instance id is intercepted by another registration’ and remove it from black list.
         *   So if 1st WebRTC will send re-register again with the same ‘InstanceID’,
         *   it will be accepted and 6th ‘EndpointID’ will be blacklisted.
         *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
         *   provision again via Platform API and receive new InstanceID)
         */

        var statusCode = response ? response.statusCode || response.status_code : null;

        switch (statusCode) {
          // Webphone account overlimit
          case 603:
            {
              errorCode = _webphoneErrors["default"].webphoneCountOverLimit;
              break;
            }
          // Internal server error

          case 500:
            {
              errorCode = _webphoneErrors["default"].internalServerError;
              break;
            }
          // Timeout

          case 504:
            {
              errorCode = _webphoneErrors["default"].serverTimeout;
              break;
            }

          default:
            {
              errorCode = _webphoneErrors["default"].unknownError;
              break;
            }
        }

        _this3._onConnectError({
          errorCode: errorCode,
          statusCode: statusCode
        });
      });

      this._webphone.userAgent.on('invite', function (session) {
        console.log('UA invite');

        _this3._onInvite(session);
      }); // sip provision expired


      this._webphone.userAgent.on('provisionUpdate', function () {
        if (_this3.sessions.length === 0) {
          _this3._connect({
            skipTimeout: true,
            force: true
          });

          return;
        }

        _this3._needToReconnectAfterSessionEnd = true;
      }); // websocket transport connecting event


      this._webphone.userAgent.transport.on('connecting', function () {
        // reconnecting event
        console.log('web phone connecting event');

        if (_this3.connected || _this3.connectError) {
          _this3.store.dispatch({
            type: _this3.actionTypes.reconnect
          });
        }
      }); // Server connection closed event after 10 time retry with primary server and backup server


      this._webphone.userAgent.transport.on('closed', function () {
        console.log('web phone closed event');

        _this3.store.dispatch({
          type: _this3.actionTypes.setRetryCounts,
          retryCounts: 20
        });

        _this3._onConnectError({
          errorCode: _webphoneErrors["default"].connectFailed,
          ttl: 0
        });
      }); // Timeout to switch back to primary server


      this._webphone.userAgent.transport.on('switchBackProxy', function () {
        if (_this3.sessions.length === 0) {
          _this3._connect({
            skipTimeout: true,
            force: true
          });

          return;
        }

        _this3._needToReconnectAfterSessionEnd = true;
      });
    }
  }, {
    key: "_connect",
    value: function () {
      var _connect2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _this4 = this;

        var _ref2,
            _ref2$skipTimeout,
            skipTimeout,
            _ref2$force,
            force,
            connectFunc,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref2 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, _ref2$skipTimeout = _ref2.skipTimeout, skipTimeout = _ref2$skipTimeout === void 0 ? false : _ref2$skipTimeout, _ref2$force = _ref2.force, force = _ref2$force === void 0 ? false : _ref2$force;

                if (!(!force && (this.connecting || this.disconnecting || this.connected))) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return");

              case 3:
                if (!(this._tabManager && !this._tabManager.active)) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 6;
                return (0, _sleep["default"])(RETRY_DELAY);

              case 6:
                _context6.next = 8;
                return this._connect({
                  skipTimeout: skipTimeout,
                  force: force
                });

              case 8:
                return _context6.abrupt("return");

              case 9:
                if (this._auth.loggedIn) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return");

              case 11:
                // when last connect is connect error, use reconnect (will show connecting badge)
                this.store.dispatch({
                  type: this.connectError || force ? this.actionTypes.reconnect : this.actionTypes.connect
                });

                if (this._connectTimeout) {
                  clearTimeout(this._connectTimeout);
                }

                connectFunc =
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee4() {
                    var sipProvision;
                    return regeneratorRuntime.wrap(function _callee4$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            if (_this4._auth.loggedIn) {
                              _context5.next = 2;
                              break;
                            }

                            return _context5.abrupt("return");

                          case 2:
                            _context5.prev = 2;
                            _context5.next = 5;
                            return _this4._sipProvision();

                          case 5:
                            sipProvision = _context5.sent;
                            _context5.next = 16;
                            break;

                          case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5["catch"](2);
                            console.error(_context5.t0, _this4.connectRetryCounts);

                            if (!(_context5.t0 && _context5.t0.message && _context5.t0.message.indexOf('Feature [WebPhone] is not available') > -1)) {
                              _context5.next = 14;
                              break;
                            }

                            _this4._rolesAndPermissions.refreshServiceFeatures();

                            return _context5.abrupt("return");

                          case 14:
                            _this4._onConnectError({
                              errorCode: _webphoneErrors["default"].sipProvisionError,
                              statusCode: null,
                              ttl: 0
                            });

                            return _context5.abrupt("return");

                          case 16:
                            _this4._createWebphone(sipProvision);

                          case 17:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee4, null, [[2, 8]]);
                  }));

                  return function connectFunc() {
                    return _ref3.apply(this, arguments);
                  };
                }();

                if (!skipTimeout) {
                  _context6.next = 19;
                  break;
                }

                _context6.next = 17;
                return connectFunc();

              case 17:
                _context6.next = 20;
                break;

              case 19:
                this._connectTimeout = setTimeout(function () {
                  _this4._connectTimeout = null;
                  connectFunc();
                }, this._getConnectTimeoutTtl());

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function _connect() {
        return _connect2.apply(this, arguments);
      }

      return _connect;
    }()
    /**
     * connect a web phone.
     */

  }, {
    key: "connect",
    value: function () {
      var _connect3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var phoneLines;
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this._auth.loggedIn && this.enabled && (this.connectionStatus === null || this.disconnected || this.connectError))) {
                  _context7.next = 18;
                  break;
                }

                if ((0, _webphoneHelper.isBrowserSupport)()) {
                  _context7.next = 5;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.connectError,
                  errorCode: _webphoneErrors["default"].browserNotSupported
                });

                this._alert.warning({
                  message: _webphoneErrors["default"].browserNotSupported,
                  ttl: 0
                });

                return _context7.abrupt("return");

              case 5:
                _context7.prev = 5;
                _context7.next = 8;
                return this._fetchDL();

              case 8:
                phoneLines = _context7.sent;

                if (phoneLines.length === 0) {
                  this._alert.warning({
                    message: _webphoneErrors["default"].noOutboundCallWithoutDL
                  });
                }

                _context7.next = 16;
                break;

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](5);
                console.error('fetch DL failed', _context7.t0);

                this._alert.warning({
                  message: _webphoneErrors["default"].checkDLError,
                  allowDuplicates: false
                });

              case 16:
                _context7.next = 18;
                return this._connect({
                  skipTimeout: true
                });

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this, [[5, 12]]);
      }));

      function connect() {
        return _connect3.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "_reconnectWebphoneIfNecessaryOnSessionsEmpty",
    value: function _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
      if (this._needToReconnectAfterSessionEnd && this.sessions.length === 0) {
        this._needToReconnectAfterSessionEnd = false;

        this._connect({
          skipTimeout: true,
          force: true
        });
      }
    }
  }, {
    key: "_getConnectTimeoutTtl",
    value: function _getConnectTimeoutTtl() {
      if (this.connectRetryCounts < 7) {
        return this._reconnectDelays[this.connectRetryCounts];
      }

      return this._reconnectDelays[6];
    }
  }, {
    key: "_onConnectError",
    value: function () {
      var _onConnectError2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref4) {
        var errorCode, statusCode, ttl;
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                errorCode = _ref4.errorCode, statusCode = _ref4.statusCode, ttl = _ref4.ttl;

                if (!(this.connectRetryCounts > 2 || this.reconnecting || this.connected || this.connectError)) {
                  _context8.next = 11;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.connectError,
                  errorCode: errorCode,
                  statusCode: statusCode
                });

                this._alert.danger({
                  message: errorCode,
                  ttl: ttl,
                  allowDuplicates: false,
                  payload: {
                    statusCode: statusCode
                  }
                });

                this._hideConnectingAlert(); // Need to show unavailable badge and reconnect in background when third retry
                // sleep before next reconnect for slient reconnect in background


                _context8.next = 7;
                return (0, _sleep["default"])(this._getConnectTimeoutTtl());

              case 7:
                if (this.connectError) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return");

              case 9:
                this._connect({
                  skipTimeout: true
                });

                return _context8.abrupt("return");

              case 11:
                this.store.dispatch({
                  type: this.actionTypes.connectFailed,
                  errorCode: errorCode,
                  statusCode: statusCode
                });

                if (this.connectRetryCounts === 1) {
                  this._alert.warning({
                    message: errorCode,
                    ttl: ttl,
                    allowDuplicates: false,
                    payload: {
                      statusCode: statusCode,
                      isConnecting: true
                    }
                  });

                  this._hideConnectFailedAlert();
                }

                this._connect();

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function _onConnectError(_x) {
        return _onConnectError2.apply(this, arguments);
      }

      return _onConnectError;
    }()
  }, {
    key: "_hideConnectingAlert",
    value: function _hideConnectingAlert() {
      var alertIds = this._alert.messages.filter(function (m) {
        for (var _i = 0, len = registerErrors.length; _i < len; _i++) {
          if (m.message === registerErrors[_i] && m.payload.isConnecting === true) return true;
        }

        return false;
      }).map(function (m) {
        return m.id;
      });

      if (alertIds.length) {
        this._alert.dismiss(alertIds);
      }
    }
  }, {
    key: "_hideConnectFailedAlert",
    value: function () {
      var _hideConnectFailedAlert2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var alertIds;
        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                alertIds = this._alert.messages.filter(function (m) {
                  for (var _i2 = 0, len = registerErrors.length; _i2 < len; _i2++) {
                    if (m.message === registerErrors[_i2] && !m.payload.isConnecting) return true;
                  }

                  return false;
                }).map(function (m) {
                  return m.id;
                });

                if (alertIds.length) {
                  this._alert.dismiss(alertIds);
                }

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function _hideConnectFailedAlert() {
        return _hideConnectFailedAlert2.apply(this, arguments);
      }

      return _hideConnectFailedAlert;
    }()
  }, {
    key: "_hideRegisterErrorAlert",
    value: function _hideRegisterErrorAlert() {
      var alertIds = this._alert.messages.filter(function (m) {
        for (var _i3 = 0, len = registerErrors.length; _i3 < len; _i3++) {
          if (m.message === registerErrors[_i3]) return true;
        }

        return false;
      }).map(function (m) {
        return m.id;
      });

      if (alertIds.length) {
        this._alert.dismiss(alertIds);
      }
    }
  }, {
    key: "_disconnect",
    value: function _disconnect() {
      var _this5 = this;

      if (this.disconnected || this.disconnecting) {
        return;
      }

      if (this._connectTimeout) {
        clearTimeout(this._connectTimeout);
      }

      this.store.dispatch({
        type: this.actionTypes.disconnect
      });

      if (this._webphone) {
        this._sessions.forEach(function (session) {
          _this5.hangup(session);
        });

        this._removeWebphone();

        this._sessions = new Map();

        this._updateSessions();
      }

      this.store.dispatch({
        type: this.actionTypes.unregistered
      });
    }
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this._disconnect();

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function disconnect() {
        return _disconnect2.apply(this, arguments);
      }

      return disconnect;
    }()
  }, {
    key: "_playExtendedControls",
    value: function () {
      var _playExtendedControls2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(session) {
        var controls, _i4, len;

        return regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                session.__rc_extendedControlStatus = extendedControlStatus.playing;
                controls = session.__rc_extendedControls.slice();
                _i4 = 0, len = controls.length;

              case 3:
                if (!(_i4 < len)) {
                  _context11.next = 18;
                  break;
                }

                if (!(session.__rc_extendedControlStatus === extendedControlStatus.playing)) {
                  _context11.next = 14;
                  break;
                }

                if (!(controls[_i4] === ',')) {
                  _context11.next = 10;
                  break;
                }

                _context11.next = 8;
                return (0, _sleep["default"])(2000);

              case 8:
                _context11.next = 12;
                break;

              case 10:
                _context11.next = 12;
                return this._sendDTMF(controls[_i4], session);

              case 12:
                _context11.next = 15;
                break;

              case 14:
                return _context11.abrupt("return");

              case 15:
                _i4 += 1;
                _context11.next = 3;
                break;

              case 18:
                session.__rc_extendedControlStatus = extendedControlStatus.stopped;

              case 19:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this);
      }));

      function _playExtendedControls(_x2) {
        return _playExtendedControls2.apply(this, arguments);
      }

      return _playExtendedControls;
    }()
  }, {
    key: "_onAccepted",
    value: function _onAccepted(session) {
      var _this6 = this;

      session.on('accepted', function (incomingResponse) {
        if (session.__rc_callStatus === _sessionStatus["default"].finished) {
          return;
        }

        console.log('accepted');
        session.__rc_callStatus = _sessionStatus["default"].connected;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this6._onCallStart(session);

        if (session.__rc_extendedControls && session.__rc_extendedControlStatus === extendedControlStatus.pending) {
          _this6._playExtendedControls(session);
        }
      });
      session.on('progress', function (incomingResponse) {
        console.log('progress...');
        session.__rc_callStatus = _sessionStatus["default"].connecting;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this6._updateSessions();
      });
      session.on('rejected', function () {
        console.log('rejected');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this6._onCallEnd(session);
      });
      session.on('failed', function (response, cause) {
        console.log('Event: Failed');
        console.log(cause);
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this6._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this6._onCallEnd(session);
      });
      session.on('cancel', function () {
        console.log('Event: Cancel');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this6._onCallEnd(session);
      });
      session.on('refer', function () {
        console.log('Event: Refer');
      });
      session.on('replaced', function (newSession) {
        session.__rc_callStatus = _sessionStatus["default"].replaced;
        newSession.__rc_callStatus = _sessionStatus["default"].connected;
        newSession.__rc_direction = _callDirections["default"].inbound;

        _this6._addSession(newSession);

        _this6._onAccepted(newSession);
      });
      session.on('muted', function () {
        console.log('Event: Muted');
        session.__rc_isOnMute = true;
        session.__rc_callStatus = _sessionStatus["default"].onMute;

        _this6._updateSessions();
      });
      session.on('unmuted', function () {
        console.log('Event: Unmuted');
        session.__rc_isOnMute = false;
        session.__rc_callStatus = _sessionStatus["default"].connected;

        _this6._updateSessions();
      });
      session.on('userMediaFailed', function () {
        _this6._audioSettings.onGetUserMediaError();
      });
    }
  }, {
    key: "_onInvite",
    value: function _onInvite(session) {
      var _this7 = this;

      session.__rc_creationTime = Date.now();
      session.__rc_lastActiveTime = Date.now();
      session.__rc_direction = _callDirections["default"].inbound;
      session.__rc_callStatus = _sessionStatus["default"].connecting;
      (0, _webphoneHelper.extractHeadersData)(session, session.request.headers);
      session.on('rejected', function () {
        console.log('Event: Rejected');

        _this7._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');

        _this7._onCallEnd(session);
      });

      this._onCallRing(session);
    }
  }, {
    key: "answer",
    value: function () {
      var _answer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(sessionId) {
        var sipSession, session;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                sipSession = this._sessions.get(sessionId);
                session = this.sessions.find(function (session) {
                  return session.id === sessionId;
                });

                if (!(!session || !(0, _webphoneHelper.isRing)(session))) {
                  _context12.next = 4;
                  break;
                }

                return _context12.abrupt("return");

              case 4:
                _context12.prev = 4;
                _context12.next = 7;
                return this._holdOtherSession(sessionId);

              case 7:
                this._onAccepted(sipSession, 'inbound');

                _context12.next = 10;
                return sipSession.accept(this.acceptOptions);

              case 10:
                this.store.dispatch({
                  // for track
                  type: this.actionTypes.callAnswer
                });
                _context12.next = 18;
                break;

              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](4);
                console.log('Accept failed');
                console.error(_context12.t0);

                if (_context12.t0.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
                  // FIXME:
                  // 2 means the call is answered
                  this._onCallEnd(sipSession);
                }

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this, [[4, 13]]);
      }));

      function answer(_x3) {
        return _answer.apply(this, arguments);
      }

      return answer;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (!(!session || session.__rc_callStatus === _sessionStatus["default"].finished)) {
                  _context13.next = 3;
                  break;
                }

                return _context13.abrupt("return");

              case 3:
                _context13.prev = 3;
                _context13.next = 6;
                return session.reject();

              case 6:
                _context13.next = 12;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](3);
                console.error(_context13.t0);

                this._onCallEnd(session);

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee12, this, [[3, 8]]);
      }));

      function reject(_x4) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "resume",
    value: function () {
      var _resume = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(sessionId) {
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.unhold(sessionId);

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee13, this);
      }));

      function resume(_x5) {
        return _resume.apply(this, arguments);
      }

      return resume;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(sessionId, forwardNumber) {
        var _this8 = this;

        var session, validatedResult, validPhoneNumber;
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context15.next = 3;
                  break;
                }

                return _context15.abrupt("return", false);

              case 3:
                _context15.prev = 3;

                if (this._permissionCheck) {
                  _context15.next = 9;
                  break;
                }

                validatedResult = (0, _validateNumbers["default"])([forwardNumber], this._regionSettings, this._brand.id);
                validPhoneNumber = validatedResult[0];
                _context15.next = 16;
                break;

              case 9:
                _context15.next = 11;
                return this._numberValidate.validateNumbers([forwardNumber]);

              case 11:
                validatedResult = _context15.sent;

                if (validatedResult.result) {
                  _context15.next = 15;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  _this8._alert.warning({
                    message: _callErrors["default"][error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context15.abrupt("return", false);

              case 15:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;

              case 16:
                session.__rc_isForwarded = true;
                _context15.next = 19;
                return session.forward(validPhoneNumber, this.acceptOptions);

              case 19:
                console.log('Forwarded');

                this._onCallEnd(session);

                return _context15.abrupt("return", true);

              case 24:
                _context15.prev = 24;
                _context15.t0 = _context15["catch"](3);
                console.error(_context15.t0);

                this._alert.warning({
                  message: _webphoneErrors["default"].forwardError
                });

                return _context15.abrupt("return", false);

              case 29:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, this, [[3, 24]]);
      }));

      function forward(_x6, _x7) {
        return _forward.apply(this, arguments);
      }

      return forward;
    }()
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(sessionId) {
        var _this9 = this;

        return regeneratorRuntime.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;

                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_isOnMute = true;
                  session.mute();

                  _this9._updateSessions();
                });

                return _context16.abrupt("return", true);

              case 5:
                _context16.prev = 5;
                _context16.t0 = _context16["catch"](0);
                console.error(_context16.t0);

                this._alert.warning({
                  message: _webphoneErrors["default"].muteError
                });

                return _context16.abrupt("return", false);

              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee15, this, [[0, 5]]);
      }));

      function mute(_x8) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16(sessionId) {
        var _this10 = this;

        return regeneratorRuntime.wrap(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_isOnMute = false;
                  session.unmute();

                  _this10._updateSessions();
                });

              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee16, this);
      }));

      function unmute(_x9) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context18.next = 3;
                  break;
                }

                return _context18.abrupt("return", false);

              case 3:
                if (!session.localHold) {
                  _context18.next = 5;
                  break;
                }

                return _context18.abrupt("return", true);

              case 5:
                _context18.prev = 5;
                _context18.next = 8;
                return session.hold();

              case 8:
                session.__rc_callStatus = _sessionStatus["default"].onHold;

                this._updateSessions();

                this._onCallHold(session);

                return _context18.abrupt("return", true);

              case 14:
                _context18.prev = 14;
                _context18.t0 = _context18["catch"](5);
                console.error('hold error:', _context18.t0);

                this._alert.warning({
                  message: _webphoneErrors["default"].holdError
                });

                return _context18.abrupt("return", false);

              case 19:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee17, this, [[5, 14]]);
      }));

      function hold(_x10) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "_holdOtherSession",
    value: function () {
      var _holdOtherSession2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee19(currentSessionId) {
        var _this11 = this;

        return regeneratorRuntime.wrap(function _callee19$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return Promise.all(Array.from(this._sessions,
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee18(_ref5) {
                    var _ref7, sessionId, session;

                    return regeneratorRuntime.wrap(function _callee18$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            _ref7 = _slicedToArray(_ref5, 2), sessionId = _ref7[0], session = _ref7[1];

                            if (!(currentSessionId === sessionId)) {
                              _context19.next = 3;
                              break;
                            }

                            return _context19.abrupt("return");

                          case 3:
                            if (!session.localHold) {
                              _context19.next = 5;
                              break;
                            }

                            return _context19.abrupt("return");

                          case 5:
                            if (!(session.__rc_callStatus === _sessionStatus["default"].connecting)) {
                              _context19.next = 7;
                              break;
                            }

                            return _context19.abrupt("return");

                          case 7:
                            _context19.prev = 7;
                            _context19.next = 10;
                            return session.hold();

                          case 10:
                            _context19.next = 16;
                            break;

                          case 12:
                            _context19.prev = 12;
                            _context19.t0 = _context19["catch"](7);
                            console.error('Hold call fail');
                            throw _context19.t0;

                          case 16:
                            session.__rc_callStatus = _sessionStatus["default"].onHold;

                            _this11._onCallHold(session);

                          case 18:
                          case "end":
                            return _context19.stop();
                        }
                      }
                    }, _callee18, null, [[7, 12]]);
                  }));

                  return function (_x12) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 2:
                // update cached sessions
                this.store.dispatch({
                  type: this.actionTypes.onholdCachedSession
                });

              case 3:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee19, this);
      }));

      function _holdOtherSession(_x11) {
        return _holdOtherSession2.apply(this, arguments);
      }

      return _holdOtherSession;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee20(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee20$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context21.next = 3;
                  break;
                }

                return _context21.abrupt("return");

              case 3:
                _context21.prev = 3;

                if (!session.localHold) {
                  _context21.next = 13;
                  break;
                }

                _context21.next = 7;
                return this._holdOtherSession(session.id);

              case 7:
                this._onBeforeCallResume(session);

                _context21.next = 10;
                return session.unhold();

              case 10:
                session.__rc_callStatus = _sessionStatus["default"].connected;

                this._updateSessions();

                this._onCallResume(session);

              case 13:
                _context21.next = 18;
                break;

              case 15:
                _context21.prev = 15;
                _context21.t0 = _context21["catch"](3);
                console.log(_context21.t0);

              case 18:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee20, this, [[3, 15]]);
      }));

      function unhold(_x13) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee21(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee21$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context22.next = 3;
                  break;
                }

                return _context22.abrupt("return");

              case 3:
                if (!(session.__rc_callStatus === _sessionStatus["default"].connecting)) {
                  _context22.next = 5;
                  break;
                }

                return _context22.abrupt("return");

              case 5:
                _context22.prev = 5;
                session.__rc_recordStatus = _recordStatus["default"].pending;

                this._updateSessions();

                _context22.next = 10;
                return session.startRecord();

              case 10:
                session.__rc_recordStatus = _recordStatus["default"].recording;

                this._updateSessions();

                _context22.next = 25;
                break;

              case 14:
                _context22.prev = 14;
                _context22.t0 = _context22["catch"](5);
                console.error(_context22.t0);
                session.__rc_recordStatus = _recordStatus["default"].idle;

                this._updateSessions(); // Recording has been disabled


                if (!(_context22.t0 && _context22.t0.code === -5)) {
                  _context22.next = 24;
                  break;
                }

                this._alert.danger({
                  message: _webphoneErrors["default"].recordDisabled
                }); // Disabled phone recording


                session.__rc_recordStatus = _recordStatus["default"].noAccess;

                this._updateSessions();

                return _context22.abrupt("return");

              case 24:
                this._alert.danger({
                  message: _webphoneErrors["default"].recordError,
                  payload: {
                    errorCode: _context22.t0.code
                  }
                });

              case 25:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee21, this, [[5, 14]]);
      }));

      function startRecord(_x14) {
        return _startRecord.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee22(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee22$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context23.next = 3;
                  break;
                }

                return _context23.abrupt("return");

              case 3:
                _context23.prev = 3;
                session.__rc_recordStatus = _recordStatus["default"].pending;

                this._updateSessions();

                _context23.next = 8;
                return session.stopRecord();

              case 8:
                session.__rc_recordStatus = _recordStatus["default"].idle;

                this._updateSessions();

                _context23.next = 17;
                break;

              case 12:
                _context23.prev = 12;
                _context23.t0 = _context23["catch"](3);
                console.error(_context23.t0);
                session.__rc_recordStatus = _recordStatus["default"].recording;

                this._updateSessions();

              case 17:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee22, this, [[3, 12]]);
      }));

      function stopRecord(_x15) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "park",
    value: function () {
      var _park = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee23(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee23$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context24.next = 3;
                  break;
                }

                return _context24.abrupt("return");

              case 3:
                _context24.prev = 3;
                _context24.next = 6;
                return session.park();

              case 6:
                console.log('Parked');
                _context24.next = 12;
                break;

              case 9:
                _context24.prev = 9;
                _context24.t0 = _context24["catch"](3);
                console.error(_context24.t0);

              case 12:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee23, this, [[3, 9]]);
      }));

      function park(_x16) {
        return _park.apply(this, arguments);
      }

      return park;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee24(transferNumber, sessionId) {
        var _this12 = this;

        var session, numberResult, validPhoneNumber;
        return regeneratorRuntime.wrap(function _callee24$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context25.next = 3;
                  break;
                }

                return _context25.abrupt("return");

              case 3:
                _context25.prev = 3;
                session.__rc_isOnTransfer = true;

                this._updateSessions();

                if (this._permissionCheck) {
                  _context25.next = 11;
                  break;
                }

                numberResult = (0, _validateNumbers["default"])([transferNumber], this._regionSettings, this._brand.id);
                validPhoneNumber = numberResult && numberResult[0];
                _context25.next = 20;
                break;

              case 11:
                _context25.next = 13;
                return this._numberValidate.validateNumbers([transferNumber]);

              case 13:
                numberResult = _context25.sent;

                if (numberResult.result) {
                  _context25.next = 19;
                  break;
                }

                numberResult.errors.forEach(function (error) {
                  _this12._alert.warning({
                    message: _callErrors["default"][error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                return _context25.abrupt("return");

              case 19:
                validPhoneNumber = numberResult.numbers[0] && numberResult.numbers[0].e164;

              case 20:
                _context25.next = 22;
                return session.transfer(validPhoneNumber);

              case 22:
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                this._onCallEnd(session);

                _context25.next = 33;
                break;

              case 27:
                _context25.prev = 27;
                _context25.t0 = _context25["catch"](3);
                console.error(_context25.t0);
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                this._alert.danger({
                  message: _webphoneErrors["default"].transferError
                });

              case 33:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee24, this, [[3, 27]]);
      }));

      function transfer(_x17, _x18) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "transferWarm",
    value: function () {
      var _transferWarm = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee26(transferNumber, sessionId) {
        var _this13 = this;

        var session, newSession;
        return regeneratorRuntime.wrap(function _callee26$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context27.next = 3;
                  break;
                }

                return _context27.abrupt("return");

              case 3:
                _context27.prev = 3;
                _context27.next = 6;
                return session.hold();

              case 6:
                newSession = session.ua.invite(transferNumber, {
                  sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions
                });
                newSession.once('accepted',
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee25() {
                  return regeneratorRuntime.wrap(function _callee25$(_context26) {
                    while (1) {
                      switch (_context26.prev = _context26.next) {
                        case 0:
                          _context26.prev = 0;
                          _context26.next = 3;
                          return session.warmTransfer(newSession);

                        case 3:
                          console.log('Transferred');

                          _this13._onCallEnd(session);

                          _context26.next = 10;
                          break;

                        case 7:
                          _context26.prev = 7;
                          _context26.t0 = _context26["catch"](0);
                          console.error(_context26.t0);

                        case 10:
                        case "end":
                          return _context26.stop();
                      }
                    }
                  }, _callee25, null, [[0, 7]]);
                })));
                _context27.next = 13;
                break;

              case 10:
                _context27.prev = 10;
                _context27.t0 = _context27["catch"](3);
                console.error(_context27.t0);

              case 13:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee26, this, [[3, 10]]);
      }));

      function transferWarm(_x19, _x20) {
        return _transferWarm.apply(this, arguments);
      }

      return transferWarm;
    }()
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee27(flipValue, sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee27$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context28.next = 3;
                  break;
                }

                return _context28.abrupt("return");

              case 3:
                _context28.prev = 3;
                _context28.next = 6;
                return session.flip(flipValue);

              case 6:
                // this._onCallEnd(session);
                session.__rc_isOnFlip = true;
                console.log('Flipped');
                _context28.next = 15;
                break;

              case 10:
                _context28.prev = 10;
                _context28.t0 = _context28["catch"](3);
                session.__rc_isOnFlip = false;

                this._alert.warning({
                  message: _webphoneErrors["default"].flipError
                });

                console.error(_context28.t0);

              case 15:
                this._updateSessions();

              case 16:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee27, this, [[3, 10]]);
      }));

      function flip(_x21, _x22) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "_sendDTMF",
    value: function () {
      var _sendDTMF2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee28(dtmfValue, session) {
        return regeneratorRuntime.wrap(function _callee28$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.prev = 0;
                _context29.next = 3;
                return session.dtmf(dtmfValue, 100);

              case 3:
                _context29.next = 8;
                break;

              case 5:
                _context29.prev = 5;
                _context29.t0 = _context29["catch"](0);
                console.error(_context29.t0);

              case 8:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee28, null, [[0, 5]]);
      }));

      function _sendDTMF(_x23, _x24) {
        return _sendDTMF2.apply(this, arguments);
      }

      return _sendDTMF;
    }()
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee29(dtmfValue, sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee29$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (!session) {
                  _context30.next = 4;
                  break;
                }

                _context30.next = 4;
                return this._sendDTMF(dtmfValue, session);

              case 4:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee29, this);
      }));

      function sendDTMF(_x25, _x26) {
        return _sendDTMF3.apply(this, arguments);
      }

      return sendDTMF;
    }()
  }, {
    key: "hangup",
    value: function () {
      var _hangup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee30(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee30$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context31.next = 3;
                  break;
                }

                return _context31.abrupt("return");

              case 3:
                _context31.prev = 3;

                this._onBeforeCallEnd(session);

                _context31.next = 7;
                return session.terminate();

              case 7:
                _context31.next = 13;
                break;

              case 9:
                _context31.prev = 9;
                _context31.t0 = _context31["catch"](3);
                console.error(_context31.t0);

                this._onCallEnd(session);

              case 13:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee30, this, [[3, 9]]);
      }));

      function hangup(_x27) {
        return _hangup.apply(this, arguments);
      }

      return hangup;
    }()
  }, {
    key: "toVoiceMail",
    value: function () {
      var _toVoiceMail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee31(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee31$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context32.next = 3;
                  break;
                }

                return _context32.abrupt("return");

              case 3:
                _context32.prev = 3;
                session.__rc_isToVoicemail = true;
                _context32.next = 7;
                return session.toVoicemail();

              case 7:
                _context32.next = 14;
                break;

              case 9:
                _context32.prev = 9;
                _context32.t0 = _context32["catch"](3);
                console.error(_context32.t0);

                this._onCallEnd(session);

                this._alert.warning({
                  message: _webphoneErrors["default"].toVoiceMailError
                });

              case 14:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee31, this, [[3, 9]]);
      }));

      function toVoiceMail(_x28) {
        return _toVoiceMail.apply(this, arguments);
      }

      return toVoiceMail;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee32(sessionId, replyOptions) {
        var session;
        return regeneratorRuntime.wrap(function _callee32$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                session = this._sessions.get(sessionId);

                if (session) {
                  _context33.next = 3;
                  break;
                }

                return _context33.abrupt("return");

              case 3:
                _context33.prev = 3;
                session.__rc_isReplied = true;
                _context33.next = 7;
                return session.replyWithMessage(replyOptions);

              case 7:
                _context33.next = 13;
                break;

              case 9:
                _context33.prev = 9;
                _context33.t0 = _context33["catch"](3);
                console.error(_context33.t0);

                this._onCallEnd(session);

              case 13:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee32, this, [[3, 9]]);
      }));

      function replyWithMessage(_x29, _x30) {
        return _replyWithMessage.apply(this, arguments);
      }

      return replyWithMessage;
    }()
  }, {
    key: "_sessionHandleWithId",
    value: function _sessionHandleWithId(sessionId, func) {
      var session = this._sessions.get(sessionId);

      if (!session) {
        return null;
      }

      return func(session);
    }
    /**
     * start an outbound call.
     * @param {toNumber} recipient number
     * @param {fromNumber} call Id
     * @param {homeCountryId} homeCountry Id
     */

  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee33(_ref9) {
        var toNumber, fromNumber, homeCountryId, extendedControls, phoneLines, session;
        return regeneratorRuntime.wrap(function _callee33$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                toNumber = _ref9.toNumber, fromNumber = _ref9.fromNumber, homeCountryId = _ref9.homeCountryId, extendedControls = _ref9.extendedControls;

                if (this._webphone) {
                  _context34.next = 4;
                  break;
                }

                this._alert.warning({
                  message: this.errorCode
                });

                return _context34.abrupt("return", null);

              case 4:
                _context34.next = 6;
                return this._fetchDL();

              case 6:
                phoneLines = _context34.sent;

                if (!(phoneLines.length === 0)) {
                  _context34.next = 10;
                  break;
                }

                this._alert.warning({
                  message: _webphoneErrors["default"].noOutboundCallWithoutDL
                });

                return _context34.abrupt("return", null);

              case 10:
                _context34.next = 12;
                return this._holdOtherSession();

              case 12:
                session = this._webphone.userAgent.invite(toNumber, {
                  sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                  fromNumber: fromNumber,
                  homeCountryId: homeCountryId
                });
                session.__rc_direction = _callDirections["default"].outbound;
                session.__rc_callStatus = _sessionStatus["default"].connecting;
                session.__rc_creationTime = Date.now();
                session.__rc_lastActiveTime = Date.now();
                session.__rc_fromNumber = fromNumber;
                session.__rc_extendedControls = extendedControls;
                session.__rc_extendedControlStatus = extendedControlStatus.pending;

                this._onAccepted(session);

                this._onCallInit(session);

                return _context34.abrupt("return", session);

              case 23:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee33, this);
      }));

      function makeCall(_x31) {
        return _makeCall.apply(this, arguments);
      }

      return makeCall;
    }()
  }, {
    key: "updateSessionMatchedContact",
    value: function () {
      var _updateSessionMatchedContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee34(sessionId, contact) {
        var _this14 = this;

        return regeneratorRuntime.wrap(function _callee34$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_contactMatch = contact;

                  _this14._updateSessions();
                });

              case 1:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee34, this);
      }));

      function updateSessionMatchedContact(_x32, _x33) {
        return _updateSessionMatchedContact.apply(this, arguments);
      }

      return updateSessionMatchedContact;
    }()
  }, {
    key: "setSessionCaching",
    value: function setSessionCaching(sessionIds) {
      this.store.dispatch({
        type: this.actionTypes.setSessionCaching,
        cachingSessionIds: sessionIds
      });
    }
  }, {
    key: "clearSessionCaching",
    value: function clearSessionCaching() {
      this.store.dispatch({
        type: this.actionTypes.clearSessionCaching,
        sessions: _toConsumableArray(this._sessions.values()).map(_webphoneHelper.normalizeSession)
      });
    }
  }, {
    key: "_updateSessions",
    value: function _updateSessions() {
      this.store.dispatch({
        type: this.actionTypes.updateSessions,
        sessions: _toConsumableArray(this._sessions.values()).map(_webphoneHelper.normalizeSession)
      });
    }
  }, {
    key: "_addSession",
    value: function _addSession(session) {
      this._sessions.set(session.id, session);

      this._updateSessions();
    }
  }, {
    key: "_removeSession",
    value: function _removeSession(session) {
      this._sessions["delete"](session.id);

      this._updateSessions();
    }
  }, {
    key: "toggleMinimized",
    value: function () {
      var _toggleMinimized = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee35(sessionId) {
        var _this15 = this;

        return regeneratorRuntime.wrap(function _callee35$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_minimized = !session.__rc_minimized;

                  _this15._updateSessions();
                });

              case 1:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee35, this);
      }));

      function toggleMinimized(_x34) {
        return _toggleMinimized.apply(this, arguments);
      }

      return toggleMinimized;
    }()
  }, {
    key: "_onCallInit",
    value: function _onCallInit(session) {
      this._addSession(session);

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);
      this.store.dispatch({
        type: this.actionTypes.callInit,
        session: normalizedSession,
        sessions: this.sessions
      });

      if (this._contactMatcher && (!this._tabManager || this._tabManager.active)) {
        this._contactMatcher.triggerMatch();
      }

      this._eventEmitter.emit(EVENTS.callInit, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallStart",
    value: function _onCallStart(session) {
      this._addSession(session);

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);
      this.store.dispatch({
        type: this.actionTypes.callStart,
        session: normalizedSession,
        sessions: this.sessions
      });

      this._eventEmitter.emit(EVENTS.callStart, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallRing",
    value: function _onCallRing(session) {
      this._addSession(session);

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);
      this.store.dispatch({
        type: this.actionTypes.callRing,
        session: normalizedSession,
        sessions: this.sessions
      });

      if (this._contactMatcher && (!this._tabManager || this._tabManager.active)) {
        this._contactMatcher.triggerMatch();
      }

      if (this.activeSession && !(0, _webphoneHelper.isOnHold)(this.activeSession)) {
        this._webphone.userAgent.audioHelper.playIncoming(false);
      }

      this._eventEmitter.emit(EVENTS.callRing, normalizedSession, this.ringSession);
    }
  }, {
    key: "_onBeforeCallEnd",
    value: function _onBeforeCallEnd(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(EVENTS.beforeCallEnd, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallEnd",
    value: function _onCallEnd(session) {
      session.__rc_extendedControlStatus = extendedControlStatus.stopped;
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      if (!normalizedSession) {
        return;
      }

      this._removeSession(session);

      this.store.dispatch({
        type: this.actionTypes.callEnd,
        session: normalizedSession,
        sessions: this.sessions
      });

      this._eventEmitter.emit(EVENTS.callEnd, normalizedSession, this.activeSession, this.ringSession);

      this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
    }
  }, {
    key: "_onBeforeCallResume",
    value: function _onBeforeCallResume(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(EVENTS.beforeCallResume, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallResume",
    value: function _onCallResume(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(EVENTS.callResume, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallHold",
    value: function _onCallHold(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(EVENTS.callHold, normalizedSession, this.activeSession);
    }
    /**
     * Inform user what is happening with webphone,
     * this will be invoked when webphone itself run into error situation
     */

  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee36() {
        return regeneratorRuntime.wrap(function _callee36$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                if (this.errorCode) {
                  _context37.next = 2;
                  break;
                }

                return _context37.abrupt("return");

              case 2:
                this._alert.danger({
                  message: this.errorCode,
                  allowDuplicates: false,
                  payload: {
                    statusCode: this.statusCode
                  }
                });

              case 3:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee36, this);
      }));

      function showAlert() {
        return _showAlert.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: "onCallStart",
    value: function onCallStart(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callStart, handler);
      }
    }
  }, {
    key: "onCallInit",
    value: function onCallInit(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callInit, handler);
      }
    }
  }, {
    key: "onCallRing",
    value: function onCallRing(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callRing, handler);
      }
    }
  }, {
    key: "onCallEnd",
    value: function onCallEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callEnd, handler);
      }
    }
  }, {
    key: "onBeforeCallResume",
    value: function onBeforeCallResume(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.beforeCallResume, handler);
      }
    }
  }, {
    key: "onCallResume",
    value: function onCallResume(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callResume, handler);
      }
    }
  }, {
    key: "onCallHold",
    value: function onCallHold(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.callHold, handler);
      }
    }
  }, {
    key: "onBeforeCallEnd",
    value: function onBeforeCallEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(EVENTS.beforeCallEnd, handler);
      }
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "originalSessions",
    get: function get() {
      return this._sessions;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "ringSessionId",
    get: function get() {
      return this.state.ringSessionId;
    }
  }, {
    key: "activeSessionId",
    get: function get() {
      return this.state.activeSessionId;
    }
    /**
     * Current active session(Outbound and InBound that answered)
     */

  }, {
    key: "activeSession",
    get: function get() {
      return this._selectors.activeSession();
    }
    /**
     * Current ring session(inbound)
     */

  }, {
    key: "ringSession",
    get: function get() {
      return this._selectors.ringSession();
    }
  }, {
    key: "sessions",
    get: function get() {
      return this.state.sessions;
    }
  }, {
    key: "ringSessions",
    get: function get() {
      return this._selectors.ringSessions();
    }
  }, {
    key: "onHoldSessions",
    get: function get() {
      return this._selectors.onHoldSessions();
    }
  }, {
    key: "lastEndedSessions",
    get: function get() {
      return this.state.lastEndedSessions;
    }
  }, {
    key: "cachedSessions",
    get: function get() {
      return this._selectors.cachedSessions();
    }
  }, {
    key: "videoElementPrepared",
    get: function get() {
      return this.state.videoElementPrepared;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._rolesAndPermissions.webphoneEnabled;
    }
  }, {
    key: "connectionStatus",
    get: function get() {
      return this.state.connectionStatus;
    }
  }, {
    key: "connectRetryCounts",
    get: function get() {
      return this.state.connectRetryCounts;
    }
  }, {
    key: "acceptOptions",
    get: function get() {
      return {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: {
              deviceId: this._audioSettings.inputDeviceId
            },
            video: false
          }
        }
      };
    }
  }, {
    key: "isOnTransfer",
    get: function get() {
      return this.activeSession && this.activeSession.isOnTransfer;
    }
  }, {
    key: "errorCode",
    get: function get() {
      return this.state.errorCode;
    }
  }, {
    key: "statusCode",
    get: function get() {
      return this.state.statusCode;
    }
  }, {
    key: "disconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].disconnecting;
    }
  }, {
    key: "connecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].connecting;
    }
  }, {
    key: "reconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].reconnecting;
    }
  }, {
    key: "connected",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].connected;
    }
  }, {
    key: "disconnected",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].disconnected;
    }
  }, {
    key: "connectFailed",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].connectFailed;
    }
  }, {
    key: "connectError",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].connectError;
    }
  }]);

  return Webphone;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_sipProvision", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sipProvision"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disconnect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "disconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resume", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "park", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "park"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferWarm", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "transferWarm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendDTMF", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangup", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "hangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoiceMail", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoiceMail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionMatchedContact", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionMatchedContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSessionCaching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearSessionCaching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMinimized", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ringingCallOnView", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this16 = this;

    return [function () {
      return _this16.ringSessions;
    }, function (sessions) {
      return (0, _ramda.find)(function (session) {
        return !session.minimized;
      }, sessions);
    }];
  }
})), _class2)) || _class);
exports["default"] = Webphone;
//# sourceMappingURL=index.js.map
