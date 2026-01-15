"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.some");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettings = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _audioSettingsErrors = require("./audioSettingsErrors");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, {
      mediaDevices: {}
    });
  }
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia =
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (navigator.mediaDevices.getUserMedia === undefined &&
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return new Promise(function (resolve, reject) {
        // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}
polyfillGetUserMedia();
var DEFAULT_VALUE = {
  // TODO: Remember to discuss migration plans if we change these properties. Changes that cause the volume settings to change can upset users.
  ringtoneVolume: 0.5,
  callVolume: 0.5,
  outputDeviceId: 'default',
  inputDeviceId: 'default',
  ringtoneDeviceId: 'default',
  hasAutoPrompted: false,
  /**
   * automatic gain control (AGC)
   * Automatic gain control is a feature in which a sound source automatically manages
   * changes in the volume of its source media to maintain a steady overall volume level.
   * This feature is typically used on microphones, although it can be provided by other
   * input sources as well.
   */
  isAGCEnabled: false
};
var AudioSettings = (_dec = (0, _di.Module)({
  name: 'AudioSettings',
  deps: ['Auth', 'Alert', 'Storage', 'AppFeatures', {
    dep: 'AudioSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var availableDevices = _ref.availableDevices;
  return [availableDevices];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var availableDevices = _ref2.availableDevices;
  return [availableDevices];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var availableDevices = _ref3.availableDevices;
  return [availableDevices];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AudioSettings, _RcModuleV);
  var _super = _createSuper(AudioSettings);
  function AudioSettings(deps) {
    var _this$_deps$audioSett, _this$_deps$audioSett2;
    var _this;
    _classCallCheck(this, AudioSettings);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'AudioSettings',
      enableCache: true
    });
    _this._getUserMediaPromise = null;
    _this._showCheckMediaAlert = void 0;
    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "availableDevices", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "hasUserMedia", _descriptor3, _assertThisInitialized(_this));
    _this._showCheckMediaAlert = (_this$_deps$audioSett = (_this$_deps$audioSett2 = _this._deps.audioSettingsOptions) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.showCheckMediaAlert) !== null && _this$_deps$audioSett !== void 0 ? _this$_deps$audioSett : false;
    return _this;
  }
  _createClass(AudioSettings, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      // We add more properties to the data object
      // need to check is there any key not exist value
      // if so assign the data to default value
      if (Object.keys(DEFAULT_VALUE).some(function (key) {
        return _this2.data[key] === undefined;
      })) {
        var _this$ringtoneVolume, _this$callVolume, _this$outputDeviceId, _this$inputDeviceId, _this$isAGCEnabled, _this$ringtoneDeviceI;
        this._setData({
          ringtoneVolume: (_this$ringtoneVolume = this.ringtoneVolume) !== null && _this$ringtoneVolume !== void 0 ? _this$ringtoneVolume : DEFAULT_VALUE.ringtoneVolume,
          callVolume: (_this$callVolume = this.callVolume) !== null && _this$callVolume !== void 0 ? _this$callVolume : DEFAULT_VALUE.callVolume,
          outputDeviceId: (_this$outputDeviceId = this.outputDeviceId) !== null && _this$outputDeviceId !== void 0 ? _this$outputDeviceId : DEFAULT_VALUE.outputDeviceId,
          inputDeviceId: (_this$inputDeviceId = this.inputDeviceId) !== null && _this$inputDeviceId !== void 0 ? _this$inputDeviceId : DEFAULT_VALUE.inputDeviceId,
          isAGCEnabled: (_this$isAGCEnabled = this.isAGCEnabled) !== null && _this$isAGCEnabled !== void 0 ? _this$isAGCEnabled : DEFAULT_VALUE.isAGCEnabled,
          ringtoneDeviceId: (_this$ringtoneDeviceI = this.ringtoneDeviceId) !== null && _this$ringtoneDeviceI !== void 0 ? _this$ringtoneDeviceI : DEFAULT_VALUE.ringtoneDeviceId
        });
      }
      (0, _core.watch)(this, function () {
        return [_this2.isAGCEnabled, _this2.hasUserMedia];
      }, function () {
        if (_this2.hasUserMedia) {
          _this2.setAutoGainControl(_this2.isAGCEnabled);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "setHasAutoPrompted",
    value: function setHasAutoPrompted() {
      this.data.hasAutoPrompted = true;
    }
  }, {
    key: "setUserMediaError",
    value: function setUserMediaError() {
      this.hasUserMedia = false;
      this.availableDevices = [];
      this.data.outputDeviceId = 'default';
      this.data.inputDeviceId = 'default';
      this.data.ringtoneDeviceId = 'default';
    }
  }, {
    key: "setUserMediaSuccess",
    value: function setUserMediaSuccess() {
      this.hasUserMedia = true;
    }
  }, {
    key: "setAvailableDevices",
    value: function setAvailableDevices(devices) {
      var _this3 = this;
      this.availableDevices = devices;
      var isOutputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this3.data.outputDeviceId && device.kind === 'audiooutput';
      }, devices);
      if (!isOutputDeviceExist) {
        // For Firefox, don't have default device id
        var hasDefaultDevice = (0, _ramda.find)(function (device) {
          return device.deviceId === 'default' && device.kind === 'audiooutput';
        }, devices);
        var firstDevice = (0, _ramda.find)(function (device) {
          return device.kind === 'audiooutput';
        }, devices);
        if (!hasDefaultDevice && firstDevice) {
          this.data.outputDeviceId = firstDevice.deviceId;
          this.data.ringtoneDeviceId = firstDevice.deviceId;
        } else {
          this.data.outputDeviceId = 'default';
          this.data.ringtoneDeviceId = 'default';
        }
      }
      var isInputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this3.data.inputDeviceId && device.kind === 'audioinput';
      }, devices);
      if (!isInputDeviceExist) {
        // For Firefox, don't have default device id
        var _hasDefaultDevice = (0, _ramda.find)(function (device) {
          return device.deviceId === 'default' && device.kind === 'audioinput';
        }, devices);
        var _firstDevice = (0, _ramda.find)(function (device) {
          return device.kind === 'audioinput';
        }, devices);
        if (!_hasDefaultDevice && _firstDevice) {
          this.data.inputDeviceId = _firstDevice.deviceId;
        } else {
          this.data.inputDeviceId = 'default';
        }
      }
    }
  }, {
    key: "_setData",
    value: function _setData(_ref4) {
      var _ref4$ringtoneVolume = _ref4.ringtoneVolume,
        ringtoneVolume = _ref4$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref4$ringtoneVolume,
        _ref4$callVolume = _ref4.callVolume,
        callVolume = _ref4$callVolume === void 0 ? this.callVolume : _ref4$callVolume,
        _ref4$outputDeviceId = _ref4.outputDeviceId,
        outputDeviceId = _ref4$outputDeviceId === void 0 ? this.outputDeviceId : _ref4$outputDeviceId,
        _ref4$inputDeviceId = _ref4.inputDeviceId,
        inputDeviceId = _ref4$inputDeviceId === void 0 ? this.inputDeviceId : _ref4$inputDeviceId,
        _ref4$ringtoneDeviceI = _ref4.ringtoneDeviceId,
        ringtoneDeviceId = _ref4$ringtoneDeviceI === void 0 ? this.ringtoneDeviceId : _ref4$ringtoneDeviceI,
        _ref4$isAGCEnabled = _ref4.isAGCEnabled,
        isAGCEnabled = _ref4$isAGCEnabled === void 0 ? this.isAGCEnabled : _ref4$isAGCEnabled;
      this.data.outputDeviceId = outputDeviceId;
      this.data.inputDeviceId = inputDeviceId;
      this.data.isAGCEnabled = isAGCEnabled;
      this.data.ringtoneDeviceId = ringtoneDeviceId;
      this.data.ringtoneVolume = Math.min(1, Math.max(0, ringtoneVolume));
      this.data.callVolume = Math.min(1, Math.max(0, callVolume));
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this4 = this;
      // Check audio permissions every time app client starts
      if (this.supportDevices) {
        this._checkDevices();
      }
      this.parentModule.store.subscribe(function () {
        if (_this4.ready && _this4._deps.auth.loggedIn && _this4._deps.appFeatures.isWebPhoneEnabled && !_this4.userMedia) {
          // Make sure it only prompts once
          if (_this4.hasAutoPrompted) return;
          _this4.markAutoPrompted();
          _this4.getUserMedia();
        }
      });
    }
  }, {
    key: "markAutoPrompted",
    value: function () {
      var _markAutoPrompted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setHasAutoPrompted();
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function markAutoPrompted() {
        return _markAutoPrompted.apply(this, arguments);
      }
      return markAutoPrompted;
    }()
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this5 = this;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _get(_getPrototypeOf(AudioSettings.prototype), "_initModule", this).call(this);
                if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
                  navigator.mediaDevices.addEventListener('devicechange', function () {
                    _this5._checkDevices();
                  });
                }
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _initModule() {
        return _initModule2.apply(this, arguments);
      }
      return _initModule;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.supportDevices) {
                  _context3.next = 3;
                  break;
                }
                _context3.next = 3;
                return this._checkDevices();
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "setAutoGainControl",
    value: function () {
      var _setAutoGainControl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(isAGCEnabled) {
        var constraints;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                constraints = isAGCEnabled ? {
                  autoGainControl: true
                } : {
                  autoGainControl: false,
                  /**
                   * https://stackoverflow.com/questions/44307432/how-to-disable-system-audio-enhancements-using-webrtc
                   * disable system audio enhancements using webRTC
                   */
                  googAutoGainControl: false,
                  googAutoGainControl2: false
                };
                _context4.next = 4;
                return navigator.mediaDevices.getUserMedia({
                  audio: constraints
                });
              case 4:
                _context4.next = 9;
                break;
              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                console.warn("setAutoGainControl error:", _context4.t0);
              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));
      function setAutoGainControl(_x) {
        return _setAutoGainControl.apply(this, arguments);
      }
      return setAutoGainControl;
    }()
  }, {
    key: "_checkDevices",
    value: function () {
      var _checkDevices2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var devices;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return navigator.mediaDevices.enumerateDevices();
              case 2:
                devices = _context5.sent;
                this.setAvailableDevices(devices.map(function (d) {
                  return {
                    deviceId: d.deviceId,
                    kind: d.kind,
                    label: d.label,
                    groupId: d.groupId
                  };
                }));
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _checkDevices() {
        return _checkDevices2.apply(this, arguments);
      }
      return _checkDevices;
    }()
  }, {
    key: "getUserMedia",
    value: function () {
      var _getUserMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var stream;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (navigator.mediaDevices.getUserMedia) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                _context6.prev = 2;
                if (!this._getUserMediaPromise) {
                  this._getUserMediaPromise = navigator.mediaDevices.getUserMedia({
                    audio: true
                  });
                }
                _context6.next = 6;
                return this._getUserMediaPromise;
              case 6:
                stream = _context6.sent;
                this._getUserMediaPromise = null;
                _context6.next = 10;
                return this._onGetUserMediaSuccess();
              case 10:
                if (typeof stream.getTracks === 'function') {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                } else if (typeof stream.stop === 'function') {
                  // TODO: check type;
                  stream.stop();
                }
                _context6.next = 17;
                break;
              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](2);
                this._getUserMediaPromise = null;
                this.onGetUserMediaError();
              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 13]]);
      }));
      function getUserMedia() {
        return _getUserMedia.apply(this, arguments);
      }
      return getUserMedia;
    }()
  }, {
    key: "_onGetUserMediaSuccess",
    value: function () {
      var _onGetUserMediaSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var userMediaAlert;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userMediaAlert = (0, _ramda.find)(function (item) {
                  return item.message === _audioSettingsErrors.audioSettingsErrors.userMediaPermission || item.message === _audioSettingsErrors.audioSettingsErrors.checkMediaPermission;
                }, this._deps.alert.messages);
                if (userMediaAlert) {
                  this._deps.alert.dismiss(userMediaAlert.id);
                }
                this.setUserMediaSuccess();
                _context7.next = 5;
                return this._checkDevices();
              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _onGetUserMediaSuccess() {
        return _onGetUserMediaSuccess2.apply(this, arguments);
      }
      return _onGetUserMediaSuccess;
    }()
  }, {
    key: "showPermissionAlert",
    value: function () {
      var _showPermissionAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ttl) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this._showCheckMediaAlert) {
                  this._deps.alert.warning({
                    message: _audioSettingsErrors.audioSettingsErrors.checkMediaPermission,
                    allowDuplicates: false,
                    ttl: 0
                  });
                } else {
                  this._deps.alert.danger({
                    message: _audioSettingsErrors.audioSettingsErrors.userMediaPermission,
                    allowDuplicates: false,
                    ttl: ttl
                  });
                }
              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function showPermissionAlert(_x2) {
        return _showPermissionAlert.apply(this, arguments);
      }
      return showPermissionAlert;
    }()
  }, {
    key: "onGetUserMediaError",
    value: function () {
      var _onGetUserMediaError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.setUserMediaError();
                this.showPermissionAlert();
              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function onGetUserMediaError() {
        return _onGetUserMediaError.apply(this, arguments);
      }
      return onGetUserMediaError;
    }()
  }, {
    key: "checkAudioAvailable",
    value: function () {
      var _checkAudioAvailable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(options) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.userMedia) {
                  _context10.next = 4;
                  break;
                }
                this.showPermissionAlert(30 * 1000);
                if (options.checkIfNoDevices) {
                  _context10.next = 4;
                  break;
                }
                return _context10.abrupt("return");
              case 4:
                this.getUserMedia();
              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function checkAudioAvailable(_x3) {
        return _checkAudioAvailable.apply(this, arguments);
      }
      return checkAudioAvailable;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_ref5) {
        var _ref5$ringtoneVolume, ringtoneVolume, _ref5$callVolume, callVolume, _ref5$outputDeviceId, outputDeviceId, _ref5$inputDeviceId, inputDeviceId, _ref5$ringtoneDeviceI, ringtoneDeviceId, _ref5$isAGCEnabled, isAGCEnabled;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref5$ringtoneVolume = _ref5.ringtoneVolume, ringtoneVolume = _ref5$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref5$ringtoneVolume, _ref5$callVolume = _ref5.callVolume, callVolume = _ref5$callVolume === void 0 ? this.callVolume : _ref5$callVolume, _ref5$outputDeviceId = _ref5.outputDeviceId, outputDeviceId = _ref5$outputDeviceId === void 0 ? this.outputDeviceId : _ref5$outputDeviceId, _ref5$inputDeviceId = _ref5.inputDeviceId, inputDeviceId = _ref5$inputDeviceId === void 0 ? this.inputDeviceId : _ref5$inputDeviceId, _ref5$ringtoneDeviceI = _ref5.ringtoneDeviceId, ringtoneDeviceId = _ref5$ringtoneDeviceI === void 0 ? this.ringtoneDeviceId : _ref5$ringtoneDeviceI, _ref5$isAGCEnabled = _ref5.isAGCEnabled, isAGCEnabled = _ref5$isAGCEnabled === void 0 ? this.isAGCEnabled : _ref5$isAGCEnabled;
                this._setData({
                  ringtoneVolume: ringtoneVolume,
                  callVolume: callVolume,
                  outputDeviceId: outputDeviceId,
                  inputDeviceId: inputDeviceId,
                  ringtoneDeviceId: ringtoneDeviceId,
                  isAGCEnabled: isAGCEnabled
                });
              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function setData(_x4) {
        return _setData2.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "outputDeviceId",
    get: function get() {
      return this.data.outputDeviceId;
    }
  }, {
    key: "outputDevice",
    get: function get() {
      var _this6 = this;
      return (0, _ramda.find)(function (device) {
        return device.kind === 'audiooutput' && device.deviceId === _this6.outputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "inputDeviceId",
    get: function get() {
      return this.data.inputDeviceId;
    }
  }, {
    key: "isAGCEnabled",
    get: function get() {
      return this.data.isAGCEnabled;
    }
  }, {
    key: "inputDevice",
    get: function get() {
      var _this7 = this;
      return (0, _ramda.find)(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this7.inputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "ringtoneDeviceId",
    get: function get() {
      return this.data.ringtoneDeviceId;
    }
  }, {
    key: "supportDevices",
    get: function get() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }
  }, {
    key: "availableOutputDevices",
    get: function get() {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audiooutput';
      }, this.availableDevices);
    }
  }, {
    key: "availableRingtoneDevices",
    get: function get() {
      var ringtoneDevices = (0, _ramda.filter)(function (device) {
        return device.kind === 'audiooutput';
      }, this.availableDevices);
      return ringtoneDevices.length > 0 ? ringtoneDevices.concat({
        deviceId: 'off',
        groupId: '',
        kind: 'audiooutput',
        label: ''
      }) : [];
    }
  }, {
    key: "availableInputDevices",
    get: function get() {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audioinput';
      }, this.availableDevices);
    }
  }, {
    key: "ringtoneVolume",
    get: function get() {
      return this.data.ringtoneVolume;
    }
  }, {
    key: "callVolume",
    get: function get() {
      return this.data.callVolume;
    }
  }, {
    key: "hasAutoPrompted",
    get: function get() {
      return this.data.hasAutoPrompted;
    }
  }, {
    key: "userMedia",
    get: function get() {
      var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
      if (isFirefox) {
        return true;
      }
      // this detection method may not work in the future
      // currently there is no good way to detect this
      return !!(this.availableDevices.length && this.availableDevices[0].label !== '');
    }
  }, {
    key: "isSupportAGC",
    get: function get() {
      try {
        var constraints = navigator.mediaDevices.getSupportedConstraints();
        return !!constraints.autoGainControl;
      } catch (err) {
        console.error('failed to get autoGainControl support:', err);
        return false;
      }
    }
  }]);
  return AudioSettings;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_VALUE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "availableDevices", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hasUserMedia", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setHasAutoPrompted", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setHasAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAvailableDevices", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAvailableDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAutoPrompted", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "markAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoGainControl", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoGainControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkDevices", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onGetUserMediaSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onGetUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showPermissionAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showPermissionAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onGetUserMediaError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onGetUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAudioAvailable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAudioAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableOutputDevices", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableOutputDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRingtoneDevices", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRingtoneDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableInputDevices", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "availableInputDevices"), _class2.prototype)), _class2)) || _class);
exports.AudioSettings = AudioSettings;
//# sourceMappingURL=AudioSettings.js.map
