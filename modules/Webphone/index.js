"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

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

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var AUTO_RETRIES_DELAY = [0, 5 * 1000, 10 * 1000, 30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000, 30 * 60 * 1000];
var INACTIVE_SLEEP_DELAY = 1000;
var INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;
var extendedControlStatus = new _Enum["default"](['pending', 'playing', 'stopped']);
var EVENTS = new _Enum["default"](['callRing', 'callStart', 'callEnd', 'callHold', 'callResume', 'beforeCallResume', 'beforeCallEnd', 'callInit']);
var registerErrors = [_webphoneErrors["default"].sipProvisionError, _webphoneErrors["default"].webphoneCountOverLimit, _webphoneErrors["default"].webphoneForbidden, _webphoneErrors["default"].requestTimeout, _webphoneErrors["default"].internalServerError, _webphoneErrors["default"].serverTimeout, _webphoneErrors["default"].unknownError, _webphoneErrors["default"].connectFailed, _webphoneErrors["default"].provisionUpdate, _webphoneErrors["default"].serverConnecting];
/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */

var Webphone = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Client', 'NumberValidate', 'RolesAndPermissions', 'Brand', 'RegionSettings', 'AudioSettings', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
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
        availabilityMonitor = _ref.availabilityMonitor,
        _ref$disconnectOnInac = _ref.disconnectOnInactive,
        disconnectOnInactive = _ref$disconnectOnInac === void 0 ? false : _ref$disconnectOnInac,
        _ref$connectDelay = _ref.connectDelay,
        connectDelay = _ref$connectDelay === void 0 ? 0 : _ref$connectDelay,
        prefix = _ref.prefix,
        options = _objectWithoutProperties(_ref, ["appKey", "appName", "appVersion", "alert", "auth", "client", "rolesAndPermissions", "webphoneLogLevel", "contactMatcher", "numberValidate", "audioSettings", "tabManager", "onCallEnd", "onCallRing", "onCallStart", "onCallResume", "onCallHold", "onCallInit", "onBeforeCallResume", "onBeforeCallEnd", "regionSettings", "brand", "webphoneSDKOptions", "permissionCheck", "availabilityMonitor", "disconnectOnInactive", "connectDelay", "prefix"]);

    _classCallCheck(this, Webphone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Webphone).call(this, _objectSpread({}, options, {
      prefix: prefix,
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "sessionPhoneNumbers", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeSession", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringSession", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringSessions", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "onHoldSessions", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "cachedSessions", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringingCallOnView", _descriptor7, _assertThisInitialized(_this));

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
    _this._availabilityMonitor = availabilityMonitor;
    _this._contactMatcher = contactMatcher;
    _this._tabManager = tabManager;
    _this._webphoneSDKOptions = webphoneSDKOptions || {};
    _this._permissionCheck = permissionCheck;
    _this._reconnectDelays = AUTO_RETRIES_DELAY;
    _this._connectDelay = connectDelay;
    _this._disconnectOnInactive = disconnectOnInactive;
    _this._activeWebphoneKey = "".concat(prefix, "-active-webphone-key");

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
    _this._reconnectAfterSessionEnd = null;
    _this._disconnectInactiveAfterSessionEnd = false;
    _this._tabActive = false;
    _this._connectTimeout = null;
    _this._isFirstRegister = true;

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionPhoneNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this.ready;
        }
      });
    }

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
        if (this._remoteVideo.setSinkId && this._audioSettings.outputDeviceId) {
          this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
        }
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

          _this2._removeCurrentInstanceFromActiveWebphone();
        });
      }

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });

      this._createOtherWebphoneInstanceRegisteredListener();
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      return regeneratorRuntime.async(function _onStateChange$(_context2) {
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

                if (this._remoteVideo && this._remoteVideo.setSinkId) {
                  this._remoteVideo.setSinkId(this._outputDeviceId);
                }
              }

              if (this.ready && this._tabManager && this._tabManager.ready && this._tabActive !== this._tabManager.active) {
                this._tabActive = this._tabManager.active;

                if (this._tabActive) {
                  this._onTabActive();
                }
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
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
    value: function _sipProvision() {
      var response;
      return regeneratorRuntime.async(function _sipProvision$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this._client.service.platform().post('/client-info/sip-provision', {
                sipInfo: [{
                  transport: 'WSS'
                }]
              }));

            case 2:
              response = _context3.sent;
              return _context3.abrupt("return", response.json());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_fetchDL",
    value: function _fetchDL() {
      var response, devices, phoneLines;
      return regeneratorRuntime.async(function _fetchDL$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this._client.account().extension().device().list());

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
      }, null, this);
    }
  }, {
    key: "_removeWebphone",
    value: function _removeWebphone() {
      return regeneratorRuntime.async(function _removeWebphone$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!this._webphone || !this._webphone.userAgent)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              this._webphone.userAgent.stop();

              _context5.prev = 3;
              _context5.next = 6;
              return regeneratorRuntime.awrap(this._waitUnregistered(this._webphone.userAgent));

            case 6:
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](3);
              console.error(_context5.t0);

            case 11:
              try {
                this._webphone.userAgent.removeAllListeners();

                this._webphone.userAgent.transport.removeAllListeners();

                if (this._webphone.userAgent.transport.isConnected()) {
                  this._webphone.userAgent.transport.disconnect();
                }

                if (this._webphone.userAgent.transport.reconnectTimer) {
                  clearTimeout(this._webphone.userAgent.transport.reconnectTimer);
                  this._webphone.userAgent.transport.reconnectTimer = undefined;
                }

                if (this._webphone.userAgent.transport.__clearSwitchBackTimer) {
                  this._webphone.userAgent.transport.__clearSwitchBackTimer();
                }
              } catch (e) {
                console.error(e); // ignore clean listener error
              }

              this._webphone = null;

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[3, 8]]);
    }
  }, {
    key: "_waitUnregistered",
    value: function _waitUnregistered(userAgent) {
      return new Promise(function (resolve, reject) {
        var timeout = setTimeout(function () {
          timeout = null;
          reject(new Error('unregistered timeout'));
        }, 2000);
        userAgent.once('unregistered', function (e) {
          if (timeout) {
            clearTimeout(timeout);
          }

          resolve(e);
        });
      });
    }
  }, {
    key: "_createWebphone",
    value: function _createWebphone(provisionData) {
      var _this3 = this;

      return regeneratorRuntime.async(function _createWebphone$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this._removeWebphone());

            case 2:
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
                enableMidLinesInSDP: (0, _webphoneHelper.isEnableMidLinesInSDP)()
              }, this._webphoneSDKOptions));

              this._webphone.userAgent.audioHelper.loadAudio({
                incoming: _incoming["default"],
                // path to audio file for incoming call
                outgoing: _outgoing["default"] // path to aduotfile for outgoing call

              });

              this._webphone.userAgent.audioHelper.setVolume(this._audioSettings.ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume); // Webphone userAgent registed event


              this._webphone.userAgent.on('registered', function () {
                if (!_this3.connected) {
                  _this3._onWebphoneRegistered(provisionData);
                }
              });

              this._webphone.userAgent.on('unregistered', function (e) {
                console.log('web phone unregistered event', e);

                _this3._onWebphoneUnregistered();
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
                  _this3._alert.warning({
                    message: _webphoneErrors["default"].provisionUpdate,
                    allowDuplicates: false
                  });

                  _this3.connect({
                    force: true,
                    skipDLCheck: true,
                    skipConnectDelay: true
                  });

                  return;
                }

                _this3._reconnectAfterSessionEnd = {
                  reason: _webphoneErrors["default"].provisionUpdate
                };
              }); // websocket transport connecting event


              this._webphone.userAgent.transport.on('connecting', function () {
                // reconnecting event
                console.log('web phone connecting event');

                if (_this3.connected || _this3.connectError) {
                  _this3._alert.warning({
                    message: _webphoneErrors["default"].serverConnecting,
                    allowDuplicates: false
                  });

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
              });

              this._webphone.userAgent.transport.on('transportError', function () {
                console.log('WebSocket transportError occured');
              });

              this._webphone.userAgent.transport.on('wsConnectionError', function () {
                _this3.store.dispatch({
                  type: _this3.actionTypes.connectError
                });
              }); // Timeout to switch back to primary server


              this._webphone.userAgent.transport.on('switchBackProxy', function () {
                if (_this3.sessions.length === 0) {
                  _this3.connect({
                    skipConnectDelay: true,
                    force: true,
                    skipDLCheck: true
                  });

                  return;
                }

                _this3._reconnectAfterSessionEnd = {
                  reason: null
                };
              });

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_connect",
    value: function _connect() {
      var sipProvision;
      return regeneratorRuntime.async(function _connect$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this._auth.loggedIn) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              _context7.prev = 2;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this._sipProvision());

            case 5:
              sipProvision = _context7.sent;
              _context7.next = 16;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](2);
              console.error(_context7.t0, this.connectRetryCounts);

              if (!(_context7.t0 && _context7.t0.message && _context7.t0.message.indexOf('Feature [WebPhone] is not available') > -1)) {
                _context7.next = 14;
                break;
              }

              this._rolesAndPermissions.refreshServiceFeatures();

              return _context7.abrupt("return");

            case 14:
              this._onConnectError({
                errorCode: _webphoneErrors["default"].sipProvisionError,
                statusCode: null,
                ttl: 0
              });

              return _context7.abrupt("return");

            case 16:
              _context7.next = 18;
              return regeneratorRuntime.awrap(this._createWebphone(sipProvision));

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[2, 8]]);
    }
  }, {
    key: "_waitStillTabActive",
    value: function _waitStillTabActive() {
      return regeneratorRuntime.async(function _waitStillTabActive$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(!this._tabManager || this._tabManager.active)) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return");

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap((0, _sleep["default"])(INACTIVE_SLEEP_DELAY));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(this._waitStillTabActive());

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_isAvailiableToConnect",
    value: function _isAvailiableToConnect(_ref2) {
      var force = _ref2.force;

      if (!this.enabled || !this._auth.loggedIn) {
        return false;
      } // do not connect if it is connecting
      // do not reconnect when user disconnected


      if (this.connecting || this.disconnecting || this.inactiveDisconnecting) {
        return false;
      } // do not connect when connected unless force


      if (!force && this.connected) {
        return false;
      }

      return true;
    }
    /**
     * connect a web phone.
     */

  }, {
    key: "connect",
    value: function connect() {
      var _this4 = this;

      var _ref3,
          _ref3$force,
          force,
          _ref3$skipTimeout,
          skipTimeout,
          _ref3$skipConnectDela,
          skipConnectDelay,
          _ref3$skipDLCheck,
          skipDLCheck,
          _ref3$skipTabActiveCh,
          skipTabActiveCheck,
          phoneLines,
          _args8 = arguments;

      return regeneratorRuntime.async(function connect$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref3 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref3$force = _ref3.force, force = _ref3$force === void 0 ? false : _ref3$force, _ref3$skipTimeout = _ref3.skipTimeout, skipTimeout = _ref3$skipTimeout === void 0 ? true : _ref3$skipTimeout, _ref3$skipConnectDela = _ref3.skipConnectDelay, skipConnectDelay = _ref3$skipConnectDela === void 0 ? false : _ref3$skipConnectDela, _ref3$skipDLCheck = _ref3.skipDLCheck, skipDLCheck = _ref3$skipDLCheck === void 0 ? false : _ref3$skipDLCheck, _ref3$skipTabActiveCh = _ref3.skipTabActiveCheck, skipTabActiveCheck = _ref3$skipTabActiveCh === void 0 ? false : _ref3$skipTabActiveCh;

              if ((0, _webphoneHelper.isBrowserSupport)()) {
                _context9.next = 5;
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

              return _context9.abrupt("return");

            case 5:
              if (this._isAvailiableToConnect({
                force: force
              })) {
                _context9.next = 7;
                break;
              }

              return _context9.abrupt("return");

            case 7:
              if (skipTabActiveCheck) {
                _context9.next = 10;
                break;
              }

              _context9.next = 10;
              return regeneratorRuntime.awrap(this._waitStillTabActive());

            case 10:
              if (this._isAvailiableToConnect({
                force: force
              })) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return");

            case 12:
              // when last connect is connect error, use reconnect (will show connecting badge)
              this.store.dispatch({
                type: this.connectError || force ? this.actionTypes.reconnect : this.actionTypes.connect
              });

              if (!(!skipConnectDelay && this._connectDelay > 0)) {
                _context9.next = 16;
                break;
              }

              _context9.next = 16;
              return regeneratorRuntime.awrap((0, _sleep["default"])(this._connectDelay));

            case 16:
              if (skipDLCheck) {
                _context9.next = 30;
                break;
              }

              _context9.prev = 17;

              if (this._auth.loggedIn) {
                _context9.next = 20;
                break;
              }

              return _context9.abrupt("return");

            case 20:
              _context9.next = 22;
              return regeneratorRuntime.awrap(this._fetchDL());

            case 22:
              phoneLines = _context9.sent;

              if (phoneLines.length === 0) {
                this._alert.warning({
                  message: _webphoneErrors["default"].noOutboundCallWithoutDL
                });
              }

              _context9.next = 30;
              break;

            case 26:
              _context9.prev = 26;
              _context9.t0 = _context9["catch"](17);
              console.error('fetch DL failed', _context9.t0);

              this._alert.warning({
                message: _webphoneErrors["default"].checkDLError,
                allowDuplicates: false
              });

            case 30:
              if (!(this.disconnected || this.disconnecting || !this._auth.loggedIn)) {
                _context9.next = 32;
                break;
              }

              return _context9.abrupt("return");

            case 32:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }

              if (!(force || skipTimeout)) {
                _context9.next = 37;
                break;
              }

              _context9.next = 36;
              return regeneratorRuntime.awrap(this._connect());

            case 36:
              return _context9.abrupt("return");

            case 37:
              this._connectTimeout = setTimeout(function () {
                _this4._connectTimeout = null;

                _this4._connect();
              }, this._getConnectTimeoutTtl());

            case 38:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this, [[17, 26]]);
    }
  }, {
    key: "_reconnectWebphoneIfNecessaryOnSessionsEmpty",
    value: function _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
      if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
        if (this._reconnectAfterSessionEnd.reason) {
          this._alert.warning({
            message: this._reconnectAfterSessionEnd.reason,
            allowDuplicates: false
          });
        }

        this._reconnectAfterSessionEnd = null;
        this.connect({
          skipConnectDelay: true,
          force: true,
          skipDLCheck: true
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
    value: function _onConnectError(_ref4) {
      var errorCode, statusCode, ttl;
      return regeneratorRuntime.async(function _onConnectError$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              errorCode = _ref4.errorCode, statusCode = _ref4.statusCode, ttl = _ref4.ttl;

              if (!(this.connectRetryCounts > 2 || this.reconnecting || this.connected || this.connectError)) {
                _context10.next = 11;
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


              _context10.next = 7;
              return regeneratorRuntime.awrap((0, _sleep["default"])(this._getConnectTimeoutTtl()));

            case 7:
              if (this.connectError) {
                _context10.next = 9;
                break;
              }

              return _context10.abrupt("return");

            case 9:
              this.connect({
                skipConnectDelay: true,
                force: true,
                skipDLCheck: true
              });
              return _context10.abrupt("return");

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

              this.connect({
                skipDLCheck: true,
                skipConnectDelay: true,
                skipTimeout: false
              });

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onWebphoneRegistered",
    value: function _onWebphoneRegistered(provisionData) {
      this.store.dispatch({
        type: this.actionTypes.registered,
        device: provisionData.device
      });

      this._alert.info({
        message: _webphoneErrors["default"].connected
      });

      this._hideRegisterErrorAlert();

      this._setCurrentInstanceAsActiveWebphone();
    }
  }, {
    key: "_onWebphoneUnregistered",
    value: function _onWebphoneUnregistered() {
      this._removeCurrentInstanceFromActiveWebphone();

      if (this.disconnecting || this.inactiveDisconnecting || this.disconnected || this.inactive) {
        // unregister by our app
        return;
      } // unavailable, unregistered by some errors


      this.store.dispatch({
        type: this.actionTypes.connectError
      });
    }
  }, {
    key: "_setCurrentInstanceAsActiveWebphone",
    value: function _setCurrentInstanceAsActiveWebphone() {
      if (this._disconnectOnInactive && this._tabManager) {
        localStorage.setItem(this._activeWebphoneKey, this._tabManager.id);
      }
    }
  }, {
    key: "_removeCurrentInstanceFromActiveWebphone",
    value: function _removeCurrentInstanceFromActiveWebphone() {
      if (this._disconnectOnInactive && this._tabManager) {
        var activeWebphoneInstance = localStorage.getItem(this._activeWebphoneKey);

        if (activeWebphoneInstance === this._tabManager.id) {
          localStorage.removeItem(this._activeWebphoneKey);
        }
      }
    }
  }, {
    key: "_createOtherWebphoneInstanceRegisteredListener",
    value: function _createOtherWebphoneInstanceRegisteredListener() {
      var _this5 = this;

      if (!this._disconnectOnInactive || !this._tabManager) {
        return;
      } // disconnect to inactive when other tabs' web phone connected


      window.addEventListener('storage', function (e) {
        if (e.key !== _this5._activeWebphoneKey) {
          return;
        }

        if (!_this5.connected || !document.hidden) {
          return;
        }

        if (e.newValue === _this5._tabManager.id) {
          return;
        }

        if (_this5.sessions.length === 0) {
          _this5._disconnectToInactive();

          return;
        }

        _this5._disconnectInactiveAfterSessionEnd = true;
      });
    }
  }, {
    key: "_disconnectToInactive",
    value: function _disconnectToInactive() {
      return regeneratorRuntime.async(function _disconnectToInactive$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.disconnectOnInactive
              });
              _context11.next = 3;
              return regeneratorRuntime.awrap(this._removeWebphone());

            case 3:
              this.store.dispatch({
                type: this.actionTypes.unregisteredOnInactive
              });

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_makeWebphoneInactiveOnSessionsEmpty",
    value: function _makeWebphoneInactiveOnSessionsEmpty() {
      if (this._disconnectInactiveAfterSessionEnd && this.sessions.length === 0) {
        this._disconnectInactiveAfterSessionEnd = false;

        if (!document.hidden) {
          // set to active
          if (this._tabManager && this._tabManager.active) {
            this._setCurrentInstanceAsActiveWebphone();
          }

          return;
        }

        this._disconnectToInactive();
      }
    }
  }, {
    key: "_onTabActive",
    value: function _onTabActive() {
      if (!this._disconnectOnInactive) {
        return;
      }

      if (this.connected) {
        this._setCurrentInstanceAsActiveWebphone();

        return;
      }

      if (this.inactive) {
        this.connect({
          skipDLCheck: true,
          force: true,
          skipTabActiveCheck: true
        });
      }
    }
  }, {
    key: "_hideConnectingAlert",
    value: function _hideConnectingAlert() {
      var alertIds = this._alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i] && m.payload && m.payload.isConnecting === true) return true;
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
    value: function _hideConnectFailedAlert() {
      var alertIds;
      return regeneratorRuntime.async(function _hideConnectFailedAlert$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              alertIds = this._alert.messages.filter(function (m) {
                for (var i = 0, len = registerErrors.length; i < len; i += 1) {
                  if (m.message === registerErrors[i] && !m.payload.isConnecting) return true;
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
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_hideRegisterErrorAlert",
    value: function _hideRegisterErrorAlert() {
      var alertIds = this._alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i]) return true;
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
      var _this6 = this;

      return regeneratorRuntime.async(function _disconnect$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (!(this.disconnected || this.disconnecting)) {
                _context13.next = 2;
                break;
              }

              return _context13.abrupt("return");

            case 2:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }

              this.store.dispatch({
                type: this.actionTypes.disconnect
              });

              if (!this._webphone) {
                _context13.next = 10;
                break;
              }

              this._sessions.forEach(function (session) {
                _this6.hangup(session);
              });

              _context13.next = 8;
              return regeneratorRuntime.awrap(this._removeWebphone());

            case 8:
              this._sessions = new Map();

              this._updateSessions();

            case 10:
              this.store.dispatch({
                type: this.actionTypes.unregistered
              });

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      return regeneratorRuntime.async(function disconnect$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this._disconnect());

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_playExtendedControls",
    value: function _playExtendedControls(session) {
      var controls, i, len;
      return regeneratorRuntime.async(function _playExtendedControls$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              session.__rc_extendedControlStatus = extendedControlStatus.playing;
              controls = session.__rc_extendedControls.slice();
              i = 0, len = controls.length;

            case 3:
              if (!(i < len)) {
                _context15.next = 18;
                break;
              }

              if (!(session.__rc_extendedControlStatus === extendedControlStatus.playing)) {
                _context15.next = 14;
                break;
              }

              if (!(controls[i] === ',')) {
                _context15.next = 10;
                break;
              }

              _context15.next = 8;
              return regeneratorRuntime.awrap((0, _sleep["default"])(2000));

            case 8:
              _context15.next = 12;
              break;

            case 10:
              _context15.next = 12;
              return regeneratorRuntime.awrap(this._sendDTMF(controls[i], session));

            case 12:
              _context15.next = 15;
              break;

            case 14:
              return _context15.abrupt("return");

            case 15:
              i += 1;
              _context15.next = 3;
              break;

            case 18:
              session.__rc_extendedControlStatus = extendedControlStatus.stopped;

            case 19:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onAccepted",
    value: function _onAccepted(session) {
      var _this7 = this;

      session.on('accepted', function (incomingResponse) {
        if (session.__rc_callStatus === _sessionStatus["default"].finished) {
          return;
        }

        console.log('accepted');
        session.__rc_callStatus = _sessionStatus["default"].connected;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this7._onCallStart(session);

        if (session.__rc_extendedControls && session.__rc_extendedControlStatus === extendedControlStatus.pending) {
          _this7._playExtendedControls(session);
        }
      });
      session.on('progress', function (incomingResponse) {
        console.log('progress...');
        session.__rc_callStatus = _sessionStatus["default"].connecting;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this7._updateSessions();
      });
      session.on('rejected', function () {
        console.log('rejected');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this7._onCallEnd(session);
      });
      session.on('failed', function (response, cause) {
        console.log('Event: Failed');
        console.log(cause);
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this7._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this7._onCallEnd(session);
      });
      session.on('cancel', function () {
        console.log('Event: Cancel');
        session.__rc_callStatus = _sessionStatus["default"].finished;

        _this7._onCallEnd(session);
      });
      session.on('refer', function () {
        console.log('Event: Refer');
      });
      session.on('replaced', function (newSession) {
        console.log('Event: replaced', newSession);
        session.__rc_callStatus = _sessionStatus["default"].replaced;
        newSession.__rc_callStatus = _sessionStatus["default"].connected;
        newSession.__rc_direction = _callDirections["default"].inbound;

        _this7._addSession(newSession);

        _this7._onAccepted(newSession);
      });
      session.on('muted', function () {
        console.log('Event: Muted');
        session.__rc_isOnMute = true;
        session.__rc_callStatus = _sessionStatus["default"].onMute;

        _this7._updateSessions();
      });
      session.on('unmuted', function () {
        console.log('Event: Unmuted');
        session.__rc_isOnMute = false;
        session.__rc_callStatus = _sessionStatus["default"].connected;

        _this7._updateSessions();
      });
      session.on('SessionDescriptionHandler-created', function () {
        session.sessionDescriptionHandler.on('userMediaFailed', function () {
          _this7._audioSettings.onGetUserMediaError();
        });
      });
    }
  }, {
    key: "_onInvite",
    value: function _onInvite(session) {
      var _this8 = this;

      session.__rc_creationTime = Date.now();
      session.__rc_lastActiveTime = Date.now();
      session.__rc_direction = _callDirections["default"].inbound;
      session.__rc_callStatus = _sessionStatus["default"].connecting;
      (0, _webphoneHelper.extractHeadersData)(session, session.request.headers);
      session.on('rejected', function () {
        console.log('Event: Rejected');

        _this8._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');

        _this8._onCallEnd(session);
      });

      this._onCallRing(session);
    }
  }, {
    key: "answer",
    value: function answer(sessionId) {
      var sipSession, session;
      return regeneratorRuntime.async(function answer$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              sipSession = this._sessions.get(sessionId);
              session = this.sessions.find(function (session) {
                return session.id === sessionId;
              });

              if (!(!session || !(0, _webphoneHelper.isRing)(session))) {
                _context16.next = 4;
                break;
              }

              return _context16.abrupt("return");

            case 4:
              _context16.prev = 4;
              _context16.next = 7;
              return regeneratorRuntime.awrap(this._holdOtherSession(sessionId));

            case 7:
              this._onAccepted(sipSession, 'inbound');

              _context16.next = 10;
              return regeneratorRuntime.awrap(sipSession.accept(this.acceptOptions));

            case 10:
              this.store.dispatch({
                // for track
                type: this.actionTypes.callAnswer
              });
              _context16.next = 18;
              break;

            case 13:
              _context16.prev = 13;
              _context16.t0 = _context16["catch"](4);
              console.log('Accept failed');
              console.error(_context16.t0);

              if (_context16.t0.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
                // FIXME:
                // 2 means the call is answered
                this._onCallEnd(sipSession);
              }

            case 18:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this, [[4, 13]]);
    }
  }, {
    key: "reject",
    value: function reject(sessionId) {
      var session;
      return regeneratorRuntime.async(function reject$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (!(!session || session.__rc_callStatus === _sessionStatus["default"].finished)) {
                _context17.next = 3;
                break;
              }

              return _context17.abrupt("return");

            case 3:
              _context17.prev = 3;
              _context17.next = 6;
              return regeneratorRuntime.awrap(session.reject());

            case 6:
              _context17.next = 12;
              break;

            case 8:
              _context17.prev = 8;
              _context17.t0 = _context17["catch"](3);
              console.error(_context17.t0);

              this._onCallEnd(session);

            case 12:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this, [[3, 8]]);
    }
  }, {
    key: "resume",
    value: function resume(sessionId) {
      return regeneratorRuntime.async(function resume$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.unhold(sessionId));

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "forward",
    value: function forward(sessionId, forwardNumber) {
      var _this9 = this;

      var session, validatedResult, validPhoneNumber;
      return regeneratorRuntime.async(function forward$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context19.next = 3;
                break;
              }

              return _context19.abrupt("return", false);

            case 3:
              _context19.prev = 3;

              if (this._permissionCheck) {
                _context19.next = 9;
                break;
              }

              validatedResult = (0, _validateNumbers["default"])([forwardNumber], this._regionSettings, this._brand.id);
              validPhoneNumber = validatedResult[0];
              _context19.next = 16;
              break;

            case 9:
              _context19.next = 11;
              return regeneratorRuntime.awrap(this._numberValidate.validateNumbers([forwardNumber]));

            case 11:
              validatedResult = _context19.sent;

              if (validatedResult.result) {
                _context19.next = 15;
                break;
              }

              validatedResult.errors.forEach(function (error) {
                _this9._alert.warning({
                  message: _callErrors["default"][error.type],
                  payload: {
                    phoneNumber: error.phoneNumber
                  }
                });
              });
              return _context19.abrupt("return", false);

            case 15:
              validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;

            case 16:
              session.__rc_isForwarded = true;
              _context19.next = 19;
              return regeneratorRuntime.awrap(session.forward(validPhoneNumber, this.acceptOptions));

            case 19:
              console.log('Forwarded');

              this._onCallEnd(session);

              return _context19.abrupt("return", true);

            case 24:
              _context19.prev = 24;
              _context19.t0 = _context19["catch"](3);
              console.error(_context19.t0);

              this._alert.warning({
                message: _webphoneErrors["default"].forwardError
              });

              return _context19.abrupt("return", false);

            case 29:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this, [[3, 24]]);
    }
  }, {
    key: "mute",
    value: function mute(sessionId) {
      var _this10 = this;

      return regeneratorRuntime.async(function mute$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;

              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_isOnMute = true;
                session.mute();

                _this10._updateSessions();
              });

              return _context20.abrupt("return", true);

            case 5:
              _context20.prev = 5;
              _context20.t0 = _context20["catch"](0);
              console.error(_context20.t0);

              this._alert.warning({
                message: _webphoneErrors["default"].muteError
              });

              return _context20.abrupt("return", false);

            case 10:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this, [[0, 5]]);
    }
  }, {
    key: "unmute",
    value: function unmute(sessionId) {
      var _this11 = this;

      return regeneratorRuntime.async(function unmute$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_isOnMute = false;
                session.unmute();

                _this11._updateSessions();
              });

            case 1:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hold",
    value: function hold(sessionId) {
      var session;
      return regeneratorRuntime.async(function hold$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context22.next = 3;
                break;
              }

              return _context22.abrupt("return", false);

            case 3:
              if (!session.localHold) {
                _context22.next = 5;
                break;
              }

              return _context22.abrupt("return", true);

            case 5:
              _context22.prev = 5;
              _context22.next = 8;
              return regeneratorRuntime.awrap(session.hold());

            case 8:
              session.__rc_callStatus = _sessionStatus["default"].onHold;

              this._updateSessions();

              this._onCallHold(session);

              return _context22.abrupt("return", true);

            case 14:
              _context22.prev = 14;
              _context22.t0 = _context22["catch"](5);
              console.error('hold error:', _context22.t0);

              this._alert.warning({
                message: _webphoneErrors["default"].holdError
              });

              return _context22.abrupt("return", false);

            case 19:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this, [[5, 14]]);
    }
  }, {
    key: "_holdOtherSession",
    value: function _holdOtherSession(currentSessionId) {
      var _this12 = this;

      return regeneratorRuntime.async(function _holdOtherSession$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(Promise.all(Array.from(this._sessions, function _callee(_ref5) {
                var _ref6, sessionId, session;

                return regeneratorRuntime.async(function _callee$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _ref6 = _slicedToArray(_ref5, 2), sessionId = _ref6[0], session = _ref6[1];

                        if (!(currentSessionId === sessionId)) {
                          _context23.next = 3;
                          break;
                        }

                        return _context23.abrupt("return");

                      case 3:
                        if (!session.localHold) {
                          _context23.next = 5;
                          break;
                        }

                        return _context23.abrupt("return");

                      case 5:
                        if (!(session.__rc_callStatus === _sessionStatus["default"].connecting)) {
                          _context23.next = 7;
                          break;
                        }

                        return _context23.abrupt("return");

                      case 7:
                        _context23.prev = 7;
                        _context23.next = 10;
                        return regeneratorRuntime.awrap(session.hold());

                      case 10:
                        _context23.next = 16;
                        break;

                      case 12:
                        _context23.prev = 12;
                        _context23.t0 = _context23["catch"](7);
                        console.error('Hold call fail');
                        throw _context23.t0;

                      case 16:
                        session.__rc_callStatus = _sessionStatus["default"].onHold;

                        _this12._onCallHold(session);

                      case 18:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, null, null, [[7, 12]]);
              })));

            case 2:
              // update cached sessions
              this.store.dispatch({
                type: this.actionTypes.onholdCachedSession
              });

            case 3:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "unhold",
    value: function unhold(sessionId) {
      var session;
      return regeneratorRuntime.async(function unhold$(_context25) {
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

              if (!session.localHold) {
                _context25.next = 13;
                break;
              }

              _context25.next = 7;
              return regeneratorRuntime.awrap(this._holdOtherSession(session.id));

            case 7:
              this._onBeforeCallResume(session);

              _context25.next = 10;
              return regeneratorRuntime.awrap(session.unhold());

            case 10:
              session.__rc_callStatus = _sessionStatus["default"].connected;

              this._updateSessions();

              this._onCallResume(session);

            case 13:
              _context25.next = 18;
              break;

            case 15:
              _context25.prev = 15;
              _context25.t0 = _context25["catch"](3);
              console.log(_context25.t0);

            case 18:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this, [[3, 15]]);
    }
  }, {
    key: "startRecord",
    value: function startRecord(sessionId) {
      var session;
      return regeneratorRuntime.async(function startRecord$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context26.next = 3;
                break;
              }

              return _context26.abrupt("return");

            case 3:
              if (!(session.__rc_callStatus === _sessionStatus["default"].connecting)) {
                _context26.next = 5;
                break;
              }

              return _context26.abrupt("return");

            case 5:
              _context26.prev = 5;
              session.__rc_recordStatus = _recordStatus["default"].pending;

              this._updateSessions();

              _context26.next = 10;
              return regeneratorRuntime.awrap(session.startRecord());

            case 10:
              session.__rc_recordStatus = _recordStatus["default"].recording;

              this._updateSessions();

              _context26.next = 25;
              break;

            case 14:
              _context26.prev = 14;
              _context26.t0 = _context26["catch"](5);
              console.error(_context26.t0);
              session.__rc_recordStatus = _recordStatus["default"].idle;

              this._updateSessions(); // Recording has been disabled


              if (!(_context26.t0 && _context26.t0.code === -5)) {
                _context26.next = 24;
                break;
              }

              this._alert.danger({
                message: _webphoneErrors["default"].recordDisabled
              }); // Disabled phone recording


              session.__rc_recordStatus = _recordStatus["default"].noAccess;

              this._updateSessions();

              return _context26.abrupt("return");

            case 24:
              this._alert.danger({
                message: _webphoneErrors["default"].recordError,
                payload: {
                  errorCode: _context26.t0.code
                }
              });

            case 25:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this, [[5, 14]]);
    }
  }, {
    key: "stopRecord",
    value: function stopRecord(sessionId) {
      var session;
      return regeneratorRuntime.async(function stopRecord$(_context27) {
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
              session.__rc_recordStatus = _recordStatus["default"].pending;

              this._updateSessions();

              _context27.next = 8;
              return regeneratorRuntime.awrap(session.stopRecord());

            case 8:
              session.__rc_recordStatus = _recordStatus["default"].idle;

              this._updateSessions();

              _context27.next = 17;
              break;

            case 12:
              _context27.prev = 12;
              _context27.t0 = _context27["catch"](3);
              console.error(_context27.t0);
              session.__rc_recordStatus = _recordStatus["default"].recording;

              this._updateSessions();

            case 17:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this, [[3, 12]]);
    }
  }, {
    key: "park",
    value: function park(sessionId) {
      var session;
      return regeneratorRuntime.async(function park$(_context28) {
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
              return regeneratorRuntime.awrap(session.park());

            case 6:
              console.log('Parked');
              _context28.next = 12;
              break;

            case 9:
              _context28.prev = 9;
              _context28.t0 = _context28["catch"](3);
              console.error(_context28.t0);

            case 12:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this, [[3, 9]]);
    }
  }, {
    key: "transfer",
    value: function transfer(transferNumber, sessionId) {
      var _this13 = this;

      var session, numberResult, validPhoneNumber;
      return regeneratorRuntime.async(function transfer$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context29.next = 3;
                break;
              }

              return _context29.abrupt("return");

            case 3:
              _context29.prev = 3;
              session.__rc_isOnTransfer = true;

              this._updateSessions();

              if (this._permissionCheck) {
                _context29.next = 11;
                break;
              }

              numberResult = (0, _validateNumbers["default"])([transferNumber], this._regionSettings, this._brand.id);
              validPhoneNumber = numberResult && numberResult[0];
              _context29.next = 20;
              break;

            case 11:
              _context29.next = 13;
              return regeneratorRuntime.awrap(this._numberValidate.validateNumbers([transferNumber]));

            case 13:
              numberResult = _context29.sent;

              if (numberResult.result) {
                _context29.next = 19;
                break;
              }

              numberResult.errors.forEach(function (error) {
                _this13._alert.warning({
                  message: _callErrors["default"][error.type],
                  payload: {
                    phoneNumber: error.phoneNumber
                  }
                });
              });
              session.__rc_isOnTransfer = false;

              this._updateSessions();

              return _context29.abrupt("return");

            case 19:
              validPhoneNumber = numberResult.numbers[0] && numberResult.numbers[0].e164;

            case 20:
              _context29.next = 22;
              return regeneratorRuntime.awrap(session.transfer(validPhoneNumber));

            case 22:
              session.__rc_isOnTransfer = false;

              this._updateSessions();

              this._onCallEnd(session);

              _context29.next = 33;
              break;

            case 27:
              _context29.prev = 27;
              _context29.t0 = _context29["catch"](3);
              console.error(_context29.t0);
              session.__rc_isOnTransfer = false;

              this._updateSessions();

              this._alert.danger({
                message: _webphoneErrors["default"].transferError
              });

            case 33:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this, [[3, 27]]);
    }
  }, {
    key: "transferWarm",
    value: function transferWarm(transferNumber, sessionId) {
      var _this14 = this;

      var session, newSession;
      return regeneratorRuntime.async(function transferWarm$(_context31) {
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
              _context31.next = 6;
              return regeneratorRuntime.awrap(session.hold());

            case 6:
              newSession = session.ua.invite(transferNumber, {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions
              });
              newSession.once('accepted', function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.prev = 0;
                        _context30.next = 3;
                        return regeneratorRuntime.awrap(session.warmTransfer(newSession));

                      case 3:
                        console.log('Transferred');

                        _this14._onCallEnd(session);

                        _context30.next = 10;
                        break;

                      case 7:
                        _context30.prev = 7;
                        _context30.t0 = _context30["catch"](0);
                        console.error(_context30.t0);

                      case 10:
                      case "end":
                        return _context30.stop();
                    }
                  }
                }, null, null, [[0, 7]]);
              });
              _context31.next = 13;
              break;

            case 10:
              _context31.prev = 10;
              _context31.t0 = _context31["catch"](3);
              console.error(_context31.t0);

            case 13:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this, [[3, 10]]);
    }
  }, {
    key: "flip",
    value: function flip(flipValue, sessionId) {
      var session;
      return regeneratorRuntime.async(function flip$(_context32) {
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
              _context32.next = 6;
              return regeneratorRuntime.awrap(session.flip(flipValue));

            case 6:
              // this._onCallEnd(session);
              session.__rc_isOnFlip = true;
              console.log('Flipped');
              _context32.next = 15;
              break;

            case 10:
              _context32.prev = 10;
              _context32.t0 = _context32["catch"](3);
              session.__rc_isOnFlip = false;

              this._alert.warning({
                message: _webphoneErrors["default"].flipError
              });

              console.error(_context32.t0);

            case 15:
              this._updateSessions();

            case 16:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this, [[3, 10]]);
    }
  }, {
    key: "_sendDTMF",
    value: function _sendDTMF(dtmfValue, session) {
      return regeneratorRuntime.async(function _sendDTMF$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.prev = 0;
              _context33.next = 3;
              return regeneratorRuntime.awrap(session.dtmf(dtmfValue, 100));

            case 3:
              _context33.next = 8;
              break;

            case 5:
              _context33.prev = 5;
              _context33.t0 = _context33["catch"](0);
              console.error(_context33.t0);

            case 8:
            case "end":
              return _context33.stop();
          }
        }
      }, null, null, [[0, 5]]);
    }
  }, {
    key: "sendDTMF",
    value: function sendDTMF(dtmfValue, sessionId) {
      var session;
      return regeneratorRuntime.async(function sendDTMF$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (!session) {
                _context34.next = 4;
                break;
              }

              _context34.next = 4;
              return regeneratorRuntime.awrap(this._sendDTMF(dtmfValue, session));

            case 4:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hangup",
    value: function hangup(sessionId) {
      var session;
      return regeneratorRuntime.async(function hangup$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context35.next = 3;
                break;
              }

              return _context35.abrupt("return");

            case 3:
              _context35.prev = 3;

              this._onBeforeCallEnd(session);

              _context35.next = 7;
              return regeneratorRuntime.awrap(session.terminate());

            case 7:
              _context35.next = 13;
              break;

            case 9:
              _context35.prev = 9;
              _context35.t0 = _context35["catch"](3);
              console.error(_context35.t0);

              this._onCallEnd(session);

            case 13:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this, [[3, 9]]);
    }
  }, {
    key: "toVoiceMail",
    value: function toVoiceMail(sessionId) {
      var session;
      return regeneratorRuntime.async(function toVoiceMail$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context36.next = 3;
                break;
              }

              return _context36.abrupt("return");

            case 3:
              _context36.prev = 3;
              session.__rc_isToVoicemail = true;
              _context36.next = 7;
              return regeneratorRuntime.awrap(session.toVoicemail());

            case 7:
              _context36.next = 14;
              break;

            case 9:
              _context36.prev = 9;
              _context36.t0 = _context36["catch"](3);
              console.error(_context36.t0);

              this._onCallEnd(session);

              this._alert.warning({
                message: _webphoneErrors["default"].toVoiceMailError
              });

            case 14:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this, [[3, 9]]);
    }
  }, {
    key: "replyWithMessage",
    value: function replyWithMessage(sessionId, replyOptions) {
      var session;
      return regeneratorRuntime.async(function replyWithMessage$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              session = this._sessions.get(sessionId);

              if (session) {
                _context37.next = 3;
                break;
              }

              return _context37.abrupt("return");

            case 3:
              _context37.prev = 3;
              session.__rc_isReplied = true;
              _context37.next = 7;
              return regeneratorRuntime.awrap(session.replyWithMessage(replyOptions));

            case 7:
              _context37.next = 13;
              break;

            case 9:
              _context37.prev = 9;
              _context37.t0 = _context37["catch"](3);
              console.error(_context37.t0);

              this._onCallEnd(session);

            case 13:
            case "end":
              return _context37.stop();
          }
        }
      }, null, this, [[3, 9]]);
    }
  }, {
    key: "_sessionHandleWithId",
    value: function _sessionHandleWithId(sessionId, func) {
      var session = this._sessions.get(sessionId);

      if (!session) {
        return null;
      }

      return func(session);
    }
  }, {
    key: "_invite",
    value: function _invite(toNumber, _ref7) {
      var inviteOptions, extendedControls, phoneLines, session;
      return regeneratorRuntime.async(function _invite$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              inviteOptions = _ref7.inviteOptions, extendedControls = _ref7.extendedControls;

              if (this._webphone) {
                _context38.next = 4;
                break;
              }

              this._alert.warning({
                message: this.errorCode
              });

              return _context38.abrupt("return", null);

            case 4:
              if (!(toNumber.length > 6 && (!this._availabilityMonitor || !this._availabilityMonitor.isVoIPOnlyMode))) {
                _context38.next = 11;
                break;
              }

              _context38.next = 7;
              return regeneratorRuntime.awrap(this._fetchDL());

            case 7:
              phoneLines = _context38.sent;

              if (!(phoneLines.length === 0)) {
                _context38.next = 11;
                break;
              }

              this._alert.warning({
                message: _webphoneErrors["default"].noOutboundCallWithoutDL
              });

              return _context38.abrupt("return", null);

            case 11:
              _context38.next = 13;
              return regeneratorRuntime.awrap(this._holdOtherSession());

            case 13:
              session = this._webphone.userAgent.invite(toNumber, inviteOptions);
              session.__rc_direction = _callDirections["default"].outbound;
              session.__rc_callStatus = _sessionStatus["default"].connecting;
              session.__rc_creationTime = Date.now();
              session.__rc_lastActiveTime = Date.now();
              session.__rc_fromNumber = inviteOptions.fromNumber;
              session.__rc_extendedControls = extendedControls;
              session.__rc_extendedControlStatus = extendedControlStatus.pending;

              this._onAccepted(session);

              this._onCallInit(session);

              return _context38.abrupt("return", session);

            case 24:
            case "end":
              return _context38.stop();
          }
        }
      }, null, this);
    }
    /**
     * start an outbound call.
     * @param {toNumber} recipient number
     * @param {fromNumber} call Id
     * @param {homeCountryId} homeCountry Id
     */

  }, {
    key: "makeCall",
    value: function makeCall(_ref8) {
      var toNumber, fromNumber, homeCountryId, extendedControls, inviteOptions, result;
      return regeneratorRuntime.async(function makeCall$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              toNumber = _ref8.toNumber, fromNumber = _ref8.fromNumber, homeCountryId = _ref8.homeCountryId, extendedControls = _ref8.extendedControls;
              inviteOptions = {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                fromNumber: fromNumber,
                homeCountryId: homeCountryId
              };
              _context39.next = 4;
              return regeneratorRuntime.awrap(this._invite(toNumber, {
                inviteOptions: inviteOptions,
                extendedControls: extendedControls
              }));

            case 4:
              result = _context39.sent;
              return _context39.abrupt("return", result);

            case 6:
            case "end":
              return _context39.stop();
          }
        }
      }, null, this);
    }
    /**
     * switch a active call into web phone session.
     */

  }, {
    key: "switchCall",
    value: function switchCall(_ref9, homeCountryId) {
      var id, from, direction, to, sipData, extraHeaders, toNumber, fromNumber, inviteOptions, session;
      return regeneratorRuntime.async(function switchCall$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              id = _ref9.id, from = _ref9.from, direction = _ref9.direction, to = _ref9.to, sipData = _ref9.sipData;
              extraHeaders = [];
              extraHeaders.push("Replaces: ".concat(id, ";to-tag=").concat(sipData.fromTag, ";from-tag=").concat(sipData.toTag));
              extraHeaders.push('RC-call-type: replace');
              toNumber = direction === _callDirections["default"].outbound ? to.phoneNumber : from.phoneNumber;
              fromNumber = direction === _callDirections["default"].outbound ? from.phoneNumber : to.phoneNumber;
              inviteOptions = {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                fromNumber: fromNumber,
                homeCountryId: homeCountryId,
                extraHeaders: extraHeaders
              };
              _context40.next = 9;
              return regeneratorRuntime.awrap(this._invite(toNumber, {
                inviteOptions: inviteOptions
              }));

            case 9:
              session = _context40.sent;
              return _context40.abrupt("return", session);

            case 11:
            case "end":
              return _context40.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateSessionMatchedContact",
    value: function updateSessionMatchedContact(sessionId, contact) {
      var _this15 = this;

      return regeneratorRuntime.async(function updateSessionMatchedContact$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_contactMatch = contact;

                _this15._updateSessions();
              });

            case 1:
            case "end":
              return _context41.stop();
          }
        }
      }, null, this);
    }
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
    value: function toggleMinimized(sessionId) {
      var _this16 = this;

      return regeneratorRuntime.async(function toggleMinimized$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_minimized = !session.__rc_minimized;

                _this16._updateSessions();
              });

            case 1:
            case "end":
              return _context42.stop();
          }
        }
      }, null, this);
    }
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

      this._makeWebphoneInactiveOnSessionsEmpty();
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
      this.store.dispatch({
        type: this.actionTypes.callResume,
        session: normalizedSession
      });

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
    value: function showAlert() {
      return regeneratorRuntime.async(function showAlert$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              if (this.errorCode) {
                _context43.next = 2;
                break;
              }

              return _context43.abrupt("return");

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
              return _context43.stop();
          }
        }
      }, null, this);
    }
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
  }, {
    key: "sessions",
    get: function get() {
      return this.state.sessions;
    }
  }, {
    key: "lastEndedSessions",
    get: function get() {
      return this.state.lastEndedSessions;
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
    key: "device",
    get: function get() {
      return this.state.device;
    }
  }, {
    key: "disconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].disconnecting;
    }
  }, {
    key: "inactiveDisconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].inactiveDisconnecting;
    }
  }, {
    key: "inactive",
    get: function get() {
      return this.connectionStatus === _connectionStatus["default"].inactive;
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
    /*
     * Together with `CallingSettings` module to check if webphone is
     * Unavailable.
     */

  }, {
    key: "isUnavailable",
    get: function get() {
      return this.ready && this._auth.loggedIn && (!this._audioSettings.userMedia || this.reconnecting || this.connectError || this.inactive);
    }
  }]);

  return Webphone;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_sipProvision", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sipProvision"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disconnect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "disconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resume", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "park", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "park"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferWarm", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "transferWarm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendDTMF", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangup", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "hangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoiceMail", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoiceMail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "switchCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionMatchedContact", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionMatchedContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSessionCaching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearSessionCaching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMinimized", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sessionPhoneNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this17 = this;

    return [function () {
      return _this17.sessions;
    }, function (sessions) {
      var outputs = [];
      sessions.forEach(function (session) {
        outputs.push(session.to);
        outputs.push(session.from);
      });
      return outputs;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this18 = this;

    return [function () {
      return _this18.activeSessionId;
    }, function () {
      return _this18.sessions;
    }, function (activeSessionId, sessions) {
      if (!activeSessionId) {
        return null;
      }

      var activeSession = (0, _ramda.find)(function (session) {
        return session.id === activeSessionId;
      }, sessions);
      return activeSession;
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this19 = this;

    return [function () {
      return _this19.ringSessionId;
    }, function () {
      return _this19.sessions;
    }, function (ringSessionId, sessions) {
      if (!ringSessionId) {
        return null;
      }

      var ringSession = (0, _ramda.find)(function (session) {
        return session.id === ringSessionId;
      }, sessions);
      return ringSession;
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this20 = this;

    return [function () {
      return _this20.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isRing)(session);
      }, sessions);
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "onHoldSessions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this21 = this;

    return [function () {
      return _this21.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isOnHold)(session);
      }, sessions);
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cachedSessions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this22 = this;

    return [function () {
      return _this22.sessions;
    }, function (sessions) {
      return (0, _ramda.filter)(function (session) {
        return session.cached;
      }, sessions);
    }];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ringingCallOnView", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this23 = this;

    return [function () {
      return _this23.ringSessions;
    }, function (sessions) {
      return (0, _ramda.find)(function (session) {
        return !session.minimized;
      }, sessions);
    }];
  }
})), _class2)) || _class);
exports["default"] = Webphone;
//# sourceMappingURL=index.js.map
