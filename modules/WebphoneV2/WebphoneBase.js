"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebphoneBase = exports.DEFAULT_AUDIO = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _events = require("events");

var _ringcentralWebPhone = _interopRequireDefault(require("ringcentral-web-phone"));

var _incoming = _interopRequireDefault(require("ringcentral-web-phone/audio/incoming.ogg"));

var _outgoing = _interopRequireDefault(require("ringcentral-web-phone/audio/outgoing.ogg"));

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _connectionStatus = require("./connectionStatus");

var _webphoneErrors = require("./webphoneErrors");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _webphoneHelper = require("./webphoneHelper");

var _Analytics = require("../Analytics");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_AUDIO = 'default';
exports.DEFAULT_AUDIO = DEFAULT_AUDIO;
var AUTO_RETRIES_DELAY = [0, 5 * 1000, 10 * 1000, 30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000, 30 * 60 * 1000];
var INACTIVE_SLEEP_DELAY = 1000;
var registerErrors = [_webphoneErrors.webphoneErrors.sipProvisionError, _webphoneErrors.webphoneErrors.webphoneCountOverLimit, _webphoneErrors.webphoneErrors.webphoneForbidden, _webphoneErrors.webphoneErrors.requestTimeout, _webphoneErrors.webphoneErrors.internalServerError, _webphoneErrors.webphoneErrors.serverTimeout, _webphoneErrors.webphoneErrors.unknownError, _webphoneErrors.webphoneErrors.connectFailed, _webphoneErrors.webphoneErrors.provisionUpdate, _webphoneErrors.webphoneErrors.serverConnecting];
/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */

var WebphoneBase = (_dec = (0, _di.Module)({
  name: 'Webphone',
  deps: ['Auth', 'Alert', 'Client', 'NumberValidate', 'RolesAndPermissions', 'Brand', 'RegionSettings', 'AudioSettings', 'Storage', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'WebphoneOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_Analytics.trackEvents.webRTCRegistration), _dec3 = (0, _core.computed)(function (that) {
  return [that.ready, that._deps.audioSettings.ringtoneVolume, that._deps.audioSettings.ringtoneMuted];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.ready, that._deps.audioSettings.supportDevices, that._deps.audioSettings.outputDeviceId];
}), _dec5 = (0, _core.computed)(function (that) {
  var _that$_deps$tabManage, _that$_deps$tabManage2;

  return [that.ready, (_that$_deps$tabManage = that._deps.tabManager) === null || _that$_deps$tabManage === void 0 ? void 0 : _that$_deps$tabManage.ready, (_that$_deps$tabManage2 = that._deps.tabManager) === null || _that$_deps$tabManage2 === void 0 ? void 0 : _that$_deps$tabManage2.active];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(WebphoneBase, _RcModuleV);

  var _super = _createSuper(WebphoneBase);

  function WebphoneBase(deps) {
    var _deps$webphoneOptions;

    var _this;

    _classCallCheck(this, WebphoneBase);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Webphone'
    });
    _this._reconnectDelays = AUTO_RETRIES_DELAY;
    _this._disconnectOnInactive = void 0;
    _this._activeWebphoneKey = void 0;
    _this._webphone = void 0;
    _this._remoteVideo = void 0;
    _this._localVideo = void 0;
    _this._connectTimeout = void 0;
    _this._isFirstRegister = void 0;
    _this._reconnectAfterSessionEnd = void 0;
    _this._disconnectInactiveAfterSessionEnd = void 0;
    _this._eventEmitter = void 0;
    _this._stopWebphoneUserAgentPromise = null;

    _initializerDefineProperty(_this, "videoElementPrepared", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "connectionStatus", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "connectRetryCounts", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "errorCode", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "statusCode", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "device", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor7, _assertThisInitialized(_this));

    _this._disconnectOnInactive = (_deps$webphoneOptions = deps.webphoneOptions.disconnectOnInactive) !== null && _deps$webphoneOptions !== void 0 ? _deps$webphoneOptions : false;
    _this._activeWebphoneKey = "".concat(deps.prefix, "-active-webphone-key");
    _this._webphone = null;
    _this._remoteVideo = null;
    _this._localVideo = null;
    _this._reconnectAfterSessionEnd = null;
    _this._disconnectInactiveAfterSessionEnd = false;
    _this._connectTimeout = null;
    _this._isFirstRegister = true;
    _this._eventEmitter = new _events.EventEmitter();
    return _this;
  }

  _createClass(WebphoneBase, [{
    key: "_setVideoElementPrepared",
    value: function _setVideoElementPrepared(prepared) {
      this.videoElementPrepared = prepared;
    }
  }, {
    key: "_setConnectionStatus",
    value: function _setConnectionStatus(status) {
      this.connectionStatus = status;
    }
  }, {
    key: "_setStateOnConnectError",
    value: function _setStateOnConnectError(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectError;
      this.device = null;

      if (errorCode) {
        this.errorCode = errorCode;
      }

      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "_setStateOnConnectFailed",
    value: function _setStateOnConnectFailed(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectFailed;
      this.device = null;

      if (errorCode) {
        this.errorCode = errorCode;
      }

      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "_setStateOnConnect",
    value: function _setStateOnConnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.connecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "_setStateOnReconnect",
    value: function _setStateOnReconnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.reconnecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "_setStateOnRegistered",
    value: function _setStateOnRegistered(device) {
      this.connectionStatus = _connectionStatus.connectionStatus.connected;
      this.device = device;
      this.errorCode = null;
      this.statusCode = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStateOnUnregistered",
    value: function _setStateOnUnregistered() {
      this.connectionStatus = _connectionStatus.connectionStatus.disconnected;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStateWhenUnregisteredOnInactive",
    value: function _setStateWhenUnregisteredOnInactive() {
      this.connectionStatus = _connectionStatus.connectionStatus.inactive;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStoreOnDisconnect",
    value: function _setStoreOnDisconnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.disconnecting;
      this.device = null;
    }
  }, {
    key: "_setDevice",
    value: function _setDevice(device) {
      this.device = device;
    }
  }, {
    key: "_setRetryCounts",
    value: function _setRetryCounts(retryCounts) {
      this.connectRetryCounts = retryCounts;
    }
  }, {
    key: "_setRingtoneIntoStorage",
    value: function _setRingtoneIntoStorage(incomingAudioFile, incomingAudioDataUrl, outgoingAudioFile, outgoingAudioDataUrl) {
      this.data.incomingAudioFile = incomingAudioFile;
      this.data.incomingAudioDataUrl = incomingAudioDataUrl;
      this.data.outgoingAudioFile = outgoingAudioFile;
      this.data.outgoingAudioDataUrl = outgoingAudioDataUrl;
    }
  }, {
    key: "_setIncomingAudioIntoStorage",
    value: function _setIncomingAudioIntoStorage(fileName, dataUrl) {
      this.data.incomingAudioFile = fileName;
      this.data.incomingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetIncomingAudio",
    value: function _resetIncomingAudio() {
      this.data.incomingAudioFile = DEFAULT_AUDIO;
      this.data.incomingAudioDataUrl = null;
    }
  }, {
    key: "_setOutgoingAudioIntoStorage",
    value: function _setOutgoingAudioIntoStorage(fileName, dataUrl) {
      this.data.outgoingAudioFile = fileName;
      this.data.outgoingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetOutgoingAudio",
    value: function _resetOutgoingAudio() {
      this.data.outgoingAudioFile = DEFAULT_AUDIO;
      this.data.outgoingAudioDataUrl = null;
    }
  }, {
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
      this._remoteVideo.volume = this._deps.audioSettings.callVolume;

      if (this._deps.audioSettings.supportDevices) {
        if (this._remoteVideo.setSinkId && this._deps.audioSettings.outputDeviceId) {
          this._remoteVideo.setSinkId(this._deps.audioSettings.outputDeviceId);
        }
      }

      this._setVideoElementPrepared(true);
    }
  }, {
    key: "initModule",
    value: function () {
      var _initModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
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

                this._createOtherWebphoneInstanceListener();

                _context.next = 4;
                return _get(_getPrototypeOf(WebphoneBase.prototype), "initModule", this).call(this);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initModule() {
        return _initModule.apply(this, arguments);
      }

      return initModule;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;

      this._deps.auth.addBeforeLogoutHandler( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3._disconnect();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));

      (0, _core.watch)(this, function () {
        return _this3.shouldUpdateRingtoneVolume;
      }, function () {
        if (_this3.ready && _this3._webphone && _this3._webphone.userAgent) {
          var ringtoneMuted = _this3._deps.audioSettings.ringtoneMuted;

          _this3._webphone.userAgent.audioHelper.setVolume(ringtoneMuted ? 0 : _this3._deps.audioSettings.ringtoneVolume);
        }
      });
      (0, _core.watch)(this, function () {
        return _this3._deps.audioSettings.callVolume;
      }, function () {
        if (_this3.ready && _this3._remoteVideo) {
          _this3._remoteVideo.volume = _this3._deps.audioSettings.callVolume;
        }
      });
      (0, _core.watch)(this, function () {
        return _this3.shouldSetSinkId;
      }, function () {
        if (_this3.ready && _this3._deps.audioSettings.supportDevices && _this3._remoteVideo && _this3._remoteVideo.setSinkId) {
          _this3._remoteVideo.setSinkId(_this3._deps.audioSettings.outputDeviceId);
        }
      });
      (0, _core.watch)(this, function () {
        return _this3.shouldTriggerOnTabActive;
      }, function () {
        var _this3$_deps$tabManag, _this3$_deps$tabManag2;

        if (_this3.ready && ((_this3$_deps$tabManag = _this3._deps.tabManager) === null || _this3$_deps$tabManag === void 0 ? void 0 : _this3$_deps$tabManag.ready) && ((_this3$_deps$tabManag2 = _this3._deps.tabManager) === null || _this3$_deps$tabManag2 === void 0 ? void 0 : _this3$_deps$tabManag2.active)) {
          _this3._onTabActive();
        }
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this._deps.rolesAndPermissions.ready && this._deps.numberValidate.ready && this._deps.audioSettings.ready && this._deps.storage.ready && (!this._deps.tabManager || this._deps.tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._deps.auth.loggedIn || !this._deps.rolesAndPermissions.ready || !this._deps.numberValidate.ready || !!this._deps.tabManager && !this._deps.tabManager.ready || !this._deps.audioSettings.ready) && this.ready;
    }
  }, {
    key: "_sipProvision",
    value: function () {
      var _sipProvision2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._deps.client.service.platform().post('/restapi/v1.0/client-info/sip-provision', {
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
        }, _callee3, this);
      }));

      function _sipProvision() {
        return _sipProvision2.apply(this, arguments);
      }

      return _sipProvision;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var response, devices, phoneLines;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.client.account().extension().device().list();

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
        }, _callee4, this);
      }));

      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }

      return _fetchDL;
    }()
  }, {
    key: "_removeWebphone",
    value: function () {
      var _removeWebphone2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this._webphone || !this._webphone.userAgent)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                this._stopWebphoneUserAgentPromise = this._waitUnregistered(this._webphone.userAgent);

                this._webphone.userAgent.stop();

                _context5.prev = 4;
                _context5.next = 7;
                return this._stopWebphoneUserAgentPromise;

              case 7:
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](4);
                console.error(_context5.t0);

              case 12:
                this._stopWebphoneUserAgentPromise = null;

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

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 9]]);
      }));

      function _removeWebphone() {
        return _removeWebphone2.apply(this, arguments);
      }

      return _removeWebphone;
    }()
  }, {
    key: "_waitUnregistered",
    value: function _waitUnregistered(userAgent) {
      return new Promise(function (resolve, reject) {
        var timeout = setTimeout(function () {
          timeout = null;
          reject(new Error('unregistered timeout'));
        }, 2000);
        userAgent.once('unregistered', function () {
          if (timeout) {
            clearTimeout(timeout);
          }

          resolve();
        });
      });
    }
  }, {
    key: "_createWebphone",
    value: function () {
      var _createWebphone2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(provisionData) {
        var _this$_deps$webphoneO,
            _this$_deps$webphoneO2,
            _this4 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._removeWebphone();

              case 2:
                this._webphone = new _ringcentralWebPhone["default"](provisionData, _objectSpread({
                  appKey: this._deps.webphoneOptions.appKey,
                  appName: this._deps.webphoneOptions.appName,
                  appVersion: this._deps.webphoneOptions.appVersion,
                  uuid: this._deps.auth.endpointId,
                  logLevel: (_this$_deps$webphoneO = this._deps.webphoneOptions.webphoneLogLevel) !== null && _this$_deps$webphoneO !== void 0 ? _this$_deps$webphoneO : 1,
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
                }, (_this$_deps$webphoneO2 = this._deps.webphoneOptions.webphoneSDKOptions) !== null && _this$_deps$webphoneO2 !== void 0 ? _this$_deps$webphoneO2 : {}));
                this.loadAudio();

                this._webphone.userAgent.audioHelper.setVolume(this._deps.audioSettings.ringtoneMuted ? 0 : this._deps.audioSettings.ringtoneVolume); // Webphone userAgent registered event


                this._webphone.userAgent.on('registered', function () {
                  if (!_this4.connected) {
                    _this4._onWebphoneRegistered(provisionData);
                  }
                });

                this._webphone.userAgent.on('unregistered', function (e) {
                  console.log('web phone unregistered event', e);

                  _this4._onWebphoneUnregistered();
                });

                this._webphone.userAgent.on('registrationFailed', function (response, cause) {
                  console.error('Webphone Register Error:', response, cause); // For 401

                  if (!response && cause === 'Connection Error') {
                    return;
                  }

                  var message = response && response.data || response;

                  if (message && typeof message === 'string' && _this4._webphone.userAgent.transport.isSipErrorCode(message)) {
                    // error is handled in webphone sdk;
                    return;
                  } // don't handled in connection is disconnecting


                  if (_this4.disconnected || _this4.disconnecting) {
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
                    // Webphone account over limit
                    case 603:
                      {
                        errorCode = _webphoneErrors.webphoneErrors.webphoneCountOverLimit;
                        break;
                      }
                    // Internal server error

                    case 500:
                      {
                        errorCode = _webphoneErrors.webphoneErrors.internalServerError;
                        break;
                      }
                    // Timeout

                    case 504:
                      {
                        errorCode = _webphoneErrors.webphoneErrors.serverTimeout;
                        break;
                      }

                    default:
                      {
                        errorCode = _webphoneErrors.webphoneErrors.unknownError;
                        break;
                      }
                  }

                  _this4._onConnectError({
                    errorCode: errorCode,
                    statusCode: statusCode
                  });
                });

                this._webphone.userAgent.on('invite', function (session) {
                  console.log('UA invite');

                  _this4._onInvite(session);
                }); // this._webphone.userAgent.on('inviteSent', (session) => {
                //   console.log('UA invite');
                //   this._addSession(session as WebphoneSession);
                // });
                // sip provision expired


                this._webphone.userAgent.on('provisionUpdate', function () {
                  if (Object.keys(_this4.originalSessions).length === 0) {
                    _this4._deps.alert.warning({
                      message: _webphoneErrors.webphoneErrors.provisionUpdate,
                      allowDuplicates: false
                    });

                    _this4.connect({
                      force: true,
                      skipDLCheck: true,
                      skipConnectDelay: true
                    });

                    return;
                  }

                  _this4._reconnectAfterSessionEnd = {
                    reason: _webphoneErrors.webphoneErrors.provisionUpdate
                  };
                }); // websocket transport connecting event


                this._webphone.userAgent.transport.on('connecting', function () {
                  // reconnecting event
                  console.log('web phone connecting event');

                  if (_this4.connected || _this4.connectError) {
                    _this4._deps.alert.warning({
                      message: _webphoneErrors.webphoneErrors.serverConnecting,
                      allowDuplicates: false
                    });

                    _this4._setStateOnReconnect();
                  }
                }); // Server connection closed event after 10 time retry with primary server and backup server


                this._webphone.userAgent.transport.on('closed', function () {
                  console.log('web phone closed event');

                  _this4._setRetryCounts(20);

                  _this4._onConnectError({
                    errorCode: _webphoneErrors.webphoneErrors.connectFailed,
                    ttl: 0
                  });
                });

                this._webphone.userAgent.transport.on('transportError', function () {
                  console.log('WebSocket transportError occurred');
                });

                this._webphone.userAgent.transport.on('wsConnectionError', function () {
                  _this4._setConnectionStatus(_connectionStatus.connectionStatus.connectError);
                }); // Timeout to switch back to primary server


                this._webphone.userAgent.transport.on('switchBackProxy', function () {
                  if (Object.keys(_this4.originalSessions).length === 0) {
                    _this4.connect({
                      skipConnectDelay: true,
                      force: true,
                      skipDLCheck: true
                    });

                    return;
                  }

                  _this4._reconnectAfterSessionEnd = {
                    reason: null
                  };
                });

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _createWebphone(_x) {
        return _createWebphone2.apply(this, arguments);
      }

      return _createWebphone;
    }() // eslint-disable-next-line

  }, {
    key: "_onInvite",
    value: function _onInvite(session) {// override
    }
  }, {
    key: "_connect",
    value: function () {
      var _connect2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var sipProvision;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this._deps.auth.loggedIn) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                _context7.prev = 2;
                _context7.next = 5;
                return this._sipProvision();

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

                this._deps.rolesAndPermissions.refreshServiceFeatures();

                return _context7.abrupt("return");

              case 14:
                this._onConnectError({
                  errorCode: _webphoneErrors.webphoneErrors.sipProvisionError,
                  statusCode: null,
                  ttl: 0
                });

                return _context7.abrupt("return");

              case 16:
                _context7.next = 18;
                return this._createWebphone(sipProvision);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 8]]);
      }));

      function _connect() {
        return _connect2.apply(this, arguments);
      }

      return _connect;
    }()
  }, {
    key: "_waitStillTabActive",
    value: function () {
      var _waitStillTabActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!this._deps.tabManager || this._deps.tabManager.active)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                _context8.next = 4;
                return (0, _sleep["default"])(INACTIVE_SLEEP_DELAY);

              case 4:
                _context8.next = 6;
                return this._waitStillTabActive();

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _waitStillTabActive() {
        return _waitStillTabActive2.apply(this, arguments);
      }

      return _waitStillTabActive;
    }()
  }, {
    key: "_isAvailableToConnect",
    value: function _isAvailableToConnect(_ref2) {
      var force = _ref2.force;

      if (!this.enabled || !this._deps.auth.loggedIn) {
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
    value: function () {
      var _connect3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this$_deps$webphoneO3,
            _this5 = this;

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
            connectDelay,
            phoneLines,
            _args9 = arguments;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref3 = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, _ref3$force = _ref3.force, force = _ref3$force === void 0 ? false : _ref3$force, _ref3$skipTimeout = _ref3.skipTimeout, skipTimeout = _ref3$skipTimeout === void 0 ? true : _ref3$skipTimeout, _ref3$skipConnectDela = _ref3.skipConnectDelay, skipConnectDelay = _ref3$skipConnectDela === void 0 ? false : _ref3$skipConnectDela, _ref3$skipDLCheck = _ref3.skipDLCheck, skipDLCheck = _ref3$skipDLCheck === void 0 ? false : _ref3$skipDLCheck, _ref3$skipTabActiveCh = _ref3.skipTabActiveCheck, skipTabActiveCheck = _ref3$skipTabActiveCh === void 0 ? false : _ref3$skipTabActiveCh;

                if ((0, _webphoneHelper.isBrowserSupport)()) {
                  _context9.next = 5;
                  break;
                }

                this._setStateOnConnectError(_webphoneErrors.webphoneErrors.browserNotSupported, null);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.browserNotSupported,
                  ttl: 0
                });

                return _context9.abrupt("return");

              case 5:
                if (this._isAvailableToConnect({
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
                return this._waitStillTabActive();

              case 10:
                if (this._isAvailableToConnect({
                  force: force
                })) {
                  _context9.next = 12;
                  break;
                }

                return _context9.abrupt("return");

              case 12:
                // when last connect is connect error, use reconnect (will show connecting badge)
                if (this.connectError || force) {
                  this._setStateOnReconnect();
                } else {
                  this._setStateOnConnect();
                }

                connectDelay = (_this$_deps$webphoneO3 = this._deps.webphoneOptions.connectDelay) !== null && _this$_deps$webphoneO3 !== void 0 ? _this$_deps$webphoneO3 : 0;

                if (!(!skipConnectDelay && connectDelay > 0)) {
                  _context9.next = 17;
                  break;
                }

                _context9.next = 17;
                return (0, _sleep["default"])(connectDelay);

              case 17:
                if (skipDLCheck) {
                  _context9.next = 31;
                  break;
                }

                _context9.prev = 18;

                if (this._deps.auth.loggedIn) {
                  _context9.next = 21;
                  break;
                }

                return _context9.abrupt("return");

              case 21:
                _context9.next = 23;
                return this._fetchDL();

              case 23:
                phoneLines = _context9.sent;

                if (phoneLines.length === 0) {
                  this._deps.alert.warning({
                    message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
                  });
                }

                _context9.next = 31;
                break;

              case 27:
                _context9.prev = 27;
                _context9.t0 = _context9["catch"](18);
                console.error('fetch DL failed', _context9.t0);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.checkDLError,
                  allowDuplicates: false
                });

              case 31:
                if (!(this.disconnected || this.disconnecting || !this._deps.auth.loggedIn)) {
                  _context9.next = 33;
                  break;
                }

                return _context9.abrupt("return");

              case 33:
                if (this._connectTimeout) {
                  clearTimeout(this._connectTimeout);
                }

                if (!(force || skipTimeout)) {
                  _context9.next = 38;
                  break;
                }

                _context9.next = 37;
                return this._connect();

              case 37:
                return _context9.abrupt("return");

              case 38:
                this._connectTimeout = setTimeout(function () {
                  _this5._connectTimeout = null;

                  _this5._connect();
                }, this._getConnectTimeoutTtl());

              case 39:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[18, 27]]);
      }));

      function connect() {
        return _connect3.apply(this, arguments);
      }

      return connect;
    }()
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
      var _onConnectError2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref4) {
        var errorCode, statusCode, ttl;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                errorCode = _ref4.errorCode, statusCode = _ref4.statusCode, ttl = _ref4.ttl;

                if (!(this.connectRetryCounts > 2 || this.reconnecting || this.connected || this.connectError)) {
                  _context10.next = 11;
                  break;
                }

                this._setStateOnConnectError(errorCode, statusCode);

                this._deps.alert.danger({
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
                return (0, _sleep["default"])(this._getConnectTimeoutTtl());

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
                this._setStateOnConnectFailed(errorCode, statusCode);

                if (this.connectRetryCounts === 1) {
                  this._deps.alert.warning({
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
        }, _callee10, this);
      }));

      function _onConnectError(_x2) {
        return _onConnectError2.apply(this, arguments);
      }

      return _onConnectError;
    }()
  }, {
    key: "_onWebphoneRegistered",
    value: function _onWebphoneRegistered(provisionData) {
      this._setStateOnRegistered(provisionData.device);

      this._deps.alert.info({
        message: _webphoneErrors.webphoneErrors.connected
      });

      this._hideRegisterErrorAlert();

      this._setCurrentInstanceAsActiveWebphone();
    }
  }, {
    key: "_onWebphoneUnregistered",
    value: function _onWebphoneUnregistered() {
      this._removeCurrentInstanceFromActiveWebphone();

      if (this.disconnecting || this.inactiveDisconnecting || this.disconnected || this.inactive || !!this._stopWebphoneUserAgentPromise) {
        // unregister by our app
        return;
      } // unavailable, unregistered by some errors


      this._setStateOnConnectError();
    }
  }, {
    key: "_setCurrentInstanceAsActiveWebphone",
    value: function _setCurrentInstanceAsActiveWebphone() {
      if (this._disconnectOnInactive && this._deps.tabManager) {
        localStorage.setItem(this._activeWebphoneKey, this._deps.tabManager.id);
      }
    }
  }, {
    key: "_removeCurrentInstanceFromActiveWebphone",
    value: function _removeCurrentInstanceFromActiveWebphone() {
      if (this._disconnectOnInactive && this._deps.tabManager) {
        var activeWebphoneInstance = localStorage.getItem(this._activeWebphoneKey);

        if (activeWebphoneInstance === this._deps.tabManager.id) {
          localStorage.removeItem(this._activeWebphoneKey);
        }
      }
    }
  }, {
    key: "_createOtherWebphoneInstanceListener",
    value: function _createOtherWebphoneInstanceListener() {
      var _this6 = this;

      if (!this._disconnectOnInactive || !this._deps.tabManager) {
        return;
      }

      window.addEventListener('storage', function (e) {
        _this6._onStorageChangeEvent(e);
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      // disconnect to inactive when other tabs' web phone connected
      if (e.key === this._activeWebphoneKey) {
        if (!this.connected || !document.hidden) {
          return;
        }

        if (e.newValue === this._deps.tabManager.id) {
          return;
        }

        if (Object.keys(this.originalSessions).length === 0) {
          this._disconnectToInactive();

          return;
        }

        this._disconnectInactiveAfterSessionEnd = true;
      }
    }
  }, {
    key: "_disconnectToInactive",
    value: function () {
      var _disconnectToInactive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._setConnectionStatus(_connectionStatus.connectionStatus.inactiveDisconnecting);

                this._setDevice(null);

                _context11.next = 4;
                return this._removeWebphone();

              case 4:
                this._setStateWhenUnregisteredOnInactive();

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _disconnectToInactive() {
        return _disconnectToInactive2.apply(this, arguments);
      }

      return _disconnectToInactive;
    }()
  }, {
    key: "_makeWebphoneInactiveOnSessionsEmpty",
    value: function _makeWebphoneInactiveOnSessionsEmpty() {
      if (this._disconnectInactiveAfterSessionEnd && Object.keys(this.originalSessions).length === 0) {
        this._disconnectInactiveAfterSessionEnd = false;

        if (!document.hidden) {
          // set to active
          if (this._deps.tabManager && this._deps.tabManager.active) {
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
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i] && m.payload && m.payload.isConnecting === true) return true;
        }

        return false;
      }).map(function (m) {
        return m.id;
      });

      if (alertIds.length) {
        this._deps.alert.dismiss(alertIds);
      }
    }
  }, {
    key: "_hideConnectFailedAlert",
    value: function () {
      var _hideConnectFailedAlert2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var alertIds;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                alertIds = this._deps.alert.messages.filter(function (m) {
                  for (var i = 0, len = registerErrors.length; i < len; i += 1) {
                    if (m.message === registerErrors[i] && !m.payload.isConnecting) return true;
                  }

                  return false;
                }).map(function (m) {
                  return m.id;
                });

                if (alertIds.length) {
                  this._deps.alert.dismiss(alertIds);
                }

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _hideConnectFailedAlert() {
        return _hideConnectFailedAlert2.apply(this, arguments);
      }

      return _hideConnectFailedAlert;
    }()
  }, {
    key: "_hideRegisterErrorAlert",
    value: function _hideRegisterErrorAlert() {
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i]) return true;
        }

        return false;
      }).map(function (m) {
        return m.id;
      });

      if (alertIds.length) {
        this._deps.alert.dismiss(alertIds);
      }
    }
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
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

                this._setStoreOnDisconnect();

                if (!this._webphone) {
                  _context13.next = 7;
                  break;
                }

                _context13.next = 7;
                return this._removeWebphone();

              case 7:
                this._setStateOnUnregistered();

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }

      return _disconnect;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._disconnect();

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function disconnect() {
        return _disconnect3.apply(this, arguments);
      }

      return disconnect;
    }()
    /**
     * Inform user what is happening with webphone,
     * this will be invoked when webphone itself run into error situation
     */

  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (this.errorCode) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return");

              case 2:
                this._deps.alert.danger({
                  message: this.errorCode,
                  allowDuplicates: false,
                  payload: {
                    statusCode: this.statusCode
                  }
                });

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function showAlert() {
        return _showAlert.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      if (this._webphone && this._webphone.userAgent && this._webphone.userAgent.audioHelper) {
        this._webphone.userAgent.audioHelper.loadAudio({
          incoming: this.incomingAudio,
          outgoing: this.outgoingAudio
        });
      }
    }
  }, {
    key: "setOutgoingAudio",
    value: function () {
      var _setOutgoingAudio = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_ref5) {
        var fileName, dataUrl;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                fileName = _ref5.fileName, dataUrl = _ref5.dataUrl;

                // TODO validate filePath?
                this._setOutgoingAudioIntoStorage(fileName, dataUrl);

                this.loadAudio();

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function setOutgoingAudio(_x3) {
        return _setOutgoingAudio.apply(this, arguments);
      }

      return setOutgoingAudio;
    }()
  }, {
    key: "resetOutgoingAudio",
    value: function () {
      var _resetOutgoingAudio2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                this._resetOutgoingAudio();

                this.loadAudio();

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function resetOutgoingAudio() {
        return _resetOutgoingAudio2.apply(this, arguments);
      }

      return resetOutgoingAudio;
    }()
  }, {
    key: "setIncomingAudio",
    value: function () {
      var _setIncomingAudio = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_ref6) {
        var fileName, dataUrl;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                fileName = _ref6.fileName, dataUrl = _ref6.dataUrl;

                // TODO validate filePath?
                this._setIncomingAudioIntoStorage(fileName, dataUrl);

                this.loadAudio();

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function setIncomingAudio(_x4) {
        return _setIncomingAudio.apply(this, arguments);
      }

      return setIncomingAudio;
    }()
  }, {
    key: "resetIncomingAudio",
    value: function () {
      var _resetIncomingAudio2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                this._resetIncomingAudio();

                this.loadAudio();

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function resetIncomingAudio() {
        return _resetIncomingAudio2.apply(this, arguments);
      }

      return resetIncomingAudio;
    }()
  }, {
    key: "setRingtone",
    value: function () {
      var _setRingtone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_ref7) {
        var incomingAudio, incomingAudioFile, outgoingAudio, outgoingAudioFile, isIncomingDefault, isOutgoingDefault;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                incomingAudio = _ref7.incomingAudio, incomingAudioFile = _ref7.incomingAudioFile, outgoingAudio = _ref7.outgoingAudio, outgoingAudioFile = _ref7.outgoingAudioFile;
                isIncomingDefault = incomingAudioFile === DEFAULT_AUDIO && incomingAudio === _incoming["default"];
                isOutgoingDefault = outgoingAudioFile === DEFAULT_AUDIO && outgoingAudio === _outgoing["default"];

                this._setRingtoneIntoStorage(isIncomingDefault ? null : incomingAudio, isIncomingDefault ? DEFAULT_AUDIO : incomingAudioFile, isOutgoingDefault ? null : outgoingAudio, isOutgoingDefault ? DEFAULT_AUDIO : outgoingAudioFile);

                this.loadAudio();

              case 5:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function setRingtone(_x5) {
        return _setRingtone.apply(this, arguments);
      }

      return setRingtone;
    }()
  }, {
    key: "incomingAudioFile",
    get: function get() {
      return this.data.incomingAudioFile;
    }
  }, {
    key: "incomingAudioDataUrl",
    get: function get() {
      return this.data.incomingAudioDataUrl;
    }
  }, {
    key: "outgoingAudioFile",
    get: function get() {
      return this.data.outgoingAudioFile;
    }
  }, {
    key: "outgoingAudioDataUrl",
    get: function get() {
      return this.data.outgoingAudioDataUrl;
    }
  }, {
    key: "shouldUpdateRingtoneVolume",
    get: function get() {
      return [this.ready, this._deps.audioSettings.ringtoneVolume, this._deps.audioSettings.ringtoneMuted];
    }
  }, {
    key: "shouldSetSinkId",
    get: function get() {
      return [this.ready, this._deps.audioSettings.supportDevices, this._deps.audioSettings.outputDeviceId];
    }
  }, {
    key: "shouldTriggerOnTabActive",
    get: function get() {
      var _this$_deps$tabManage, _this$_deps$tabManage2;

      return [this.ready, (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.ready, (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active];
    }
  }, {
    key: "originalSessions",
    get: function get() {
      var _this$_webphone$userA, _this$_webphone;

      return (_this$_webphone$userA = (_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.userAgent.sessions) !== null && _this$_webphone$userA !== void 0 ? _this$_webphone$userA : {};
    } // for backward compatibility v1

  }, {
    key: "_sessions",
    get: function get() {
      return new Map(Object.entries(this.originalSessions));
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._deps.rolesAndPermissions.webphoneEnabled;
    }
  }, {
    key: "disconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnecting;
    }
  }, {
    key: "inactiveDisconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactiveDisconnecting;
    }
  }, {
    key: "inactive",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactive;
    }
  }, {
    key: "connecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connecting;
    }
  }, {
    key: "reconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.reconnecting;
    }
  }, {
    key: "connected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connected;
    }
  }, {
    key: "disconnected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnected;
    }
  }, {
    key: "connectFailed",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectFailed;
    }
  }, {
    key: "connectError",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectError;
    }
    /*
     * Together with `CallingSettings` module to check if webphone is
     * Unavailable.
     */

  }, {
    key: "isUnavailable",
    get: function get() {
      return this.ready && this._deps.auth.loggedIn && (!this._deps.audioSettings.userMedia || this.reconnecting || this.connectError || this.inactive);
    }
  }, {
    key: "incomingAudio",
    get: function get() {
      return this.incomingAudioDataUrl || this.defaultIncomingAudio;
    }
  }, {
    key: "outgoingAudio",
    get: function get() {
      return this.outgoingAudioDataUrl || this.defaultOutgoingAudio;
    }
  }, {
    key: "defaultIncomingAudio",
    get: function get() {
      return _incoming["default"];
    }
  }, {
    key: "defaultOutgoingAudio",
    get: function get() {
      return _outgoing["default"];
    }
  }, {
    key: "defaultIncomingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }, {
    key: "defaultOutgoingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }]);

  return WebphoneBase;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "videoElementPrepared", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectionStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _connectionStatus.connectionStatus.disconnected;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "connectRetryCounts", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "errorCode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "statusCode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "device", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setVideoElementPrepared", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setVideoElementPrepared"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setConnectionStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setConnectionStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectFailed", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectFailed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnReconnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnReconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnRegistered", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnRegistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnUnregistered", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnUnregistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStoreOnDisconnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStoreOnDisconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setDevice", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRetryCounts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRetryCounts"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      incomingAudioFile: DEFAULT_AUDIO,
      incomingAudioDataUrl: null,
      outgoingAudioFile: DEFAULT_AUDIO,
      outgoingAudioDataUrl: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setRingtoneIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRingtoneIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetIncomingAudio", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetOutgoingAudio", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldSetSinkId", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldSetSinkId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldTriggerOnTabActive", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldTriggerOnTabActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sipProvision", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sipProvision"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disconnect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "disconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOutgoingAudio", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOutgoingAudio", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIncomingAudio", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetIncomingAudio", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRingtone", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingtone"), _class2.prototype)), _class2)) || _class);
exports.WebphoneBase = WebphoneBase;
//# sourceMappingURL=WebphoneBase.js.map
