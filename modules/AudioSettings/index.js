"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getAudioSettingsReducer = _interopRequireDefault(require("./getAudioSettingsReducer"));

var _getStorageReducer = _interopRequireDefault(require("./getStorageReducer"));

var _audioSettingsErrors = _interopRequireDefault(require("./audioSettingsErrors"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  if (navigator.mediaDevices.getUserMedia === undefined && navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return new Promise(function (resolve, reject) {
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}

polyfillGetUserMedia();
/**
 * @class
 * @description AudioSettings module.
 */

var AudioSettings = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Storage', 'RolesAndPermissions']
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(AudioSettings, _RcModule);

  function AudioSettings(_ref) {
    var _context;

    var _this;

    var auth = _ref.auth,
        alert = _ref.alert,
        storage = _ref.storage,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["auth", "alert", "storage", "rolesAndPermissions"]);

    _classCallCheck(this, AudioSettings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioSettings).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "availableOutputDevices", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "availableInputDevices", _descriptor2, _assertThisInitialized(_this));

    _this._storage = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, storage, 'storage');
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._alert = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, alert, 'alert');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._storageKey = 'audioSettings';

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getStorageReducer["default"])(_this.actionTypes)
    });

    _this._reducer = (0, _getAudioSettingsReducer["default"])(_this.actionTypes);
    return _this;
  }

  _createClass(AudioSettings, [{
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this2 = this;

      // Check audio permissions everytime app client starts
      if (this.supportDevices) {
        this._checkDevices();
      }

      this.store.subscribe(function () {
        if (_this2.ready && _this2._auth.loggedIn && _this2._rolesAndPermissions.webphoneEnabled && !_this2.userMedia) {
          // Make sure it only prompts once
          if (_this2.hasAutoPrompted) return;

          _this2.markAutoPrompted();

          _this2.getUserMedia();
        }
      });
    }
  }, {
    key: "markAutoPrompted",
    value: function markAutoPrompted() {
      return regeneratorRuntime.async(function markAutoPrompted$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.autoPrompted
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;

      this.store.subscribe(function () {
        return _this3._onStateChange();
      });

      if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
        navigator.mediaDevices.addEventListener('devicechange', function () {
          _this3._checkDevices();
        });
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && this._storage.ready && this._auth.ready && this._rolesAndPermissions.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(this.ready && (!this._auth.ready || !this._storage.ready || !this._rolesAndPermissions.ready));
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      return regeneratorRuntime.async(function _onStateChange$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this._shouldInit()) {
                _context3.next = 8;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.init
              });

              if (!this.supportDevices) {
                _context3.next = 5;
                break;
              }

              _context3.next = 5;
              return regeneratorRuntime.awrap(this._checkDevices());

            case 5:
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context3.next = 9;
              break;

            case 8:
              if (this._shouldReset()) {
                this.store.dispatch({
                  type: this.actionTypes.reset
                });
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
              }

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_checkDevices",
    value: function _checkDevices() {
      var devices;
      return regeneratorRuntime.async(function _checkDevices$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(navigator.mediaDevices.enumerateDevices());

            case 2:
              devices = _context4.sent;
              this.store.dispatch({
                type: this.actionTypes.setAvailableDevices,
                // TODO formatting for devices info instances and replace JSON APIs.
                devices: devices.map(function (d) {
                  return JSON.parse(JSON.stringify(d));
                })
              });

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserMedia",
    value: function getUserMedia() {
      var stream;
      return regeneratorRuntime.async(function getUserMedia$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (navigator.mediaDevices.getUserMedia) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _context5.prev = 2;

              if (!this._getUserMediaPromise) {
                this._getUserMediaPromise = navigator.mediaDevices.getUserMedia({
                  audio: true
                });
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(this._getUserMediaPromise);

            case 6:
              stream = _context5.sent;
              this._getUserMediaPromise = null;
              _context5.next = 10;
              return regeneratorRuntime.awrap(this._onGetUserMediaSuccess());

            case 10:
              if (typeof stream.getTracks === 'function') {
                stream.getTracks().forEach(function (track) {
                  track.stop();
                });
              } else if (typeof stream.stop === 'function') {
                stream.stop();
              }

              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](2);
              this._getUserMediaPromise = null;
              this.onGetUserMediaError(_context5.t0);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[2, 13]]);
    }
  }, {
    key: "_onGetUserMediaSuccess",
    value: function _onGetUserMediaSuccess() {
      var userMediaAlert;
      return regeneratorRuntime.async(function _onGetUserMediaSuccess$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userMediaAlert = (0, _ramda.find)(function (item) {
                return item.message === _audioSettingsErrors["default"].userMediaPermission;
              }, this._alert.messages);

              if (userMediaAlert) {
                this._alert.dismiss(userMediaAlert.id);
              }

              this.store.dispatch({
                type: this.actionTypes.getUserMediaSuccess
              });
              _context6.next = 5;
              return regeneratorRuntime.awrap(this._checkDevices());

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "onGetUserMediaError",
    value: function onGetUserMediaError(error) {
      return regeneratorRuntime.async(function onGetUserMediaError$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.getUserMediaError,
                error: error
              });

              this._alert.danger({
                message: _audioSettingsErrors["default"].userMediaPermission,
                allowDuplicates: false
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "showAlert",
    value: function showAlert() {
      return regeneratorRuntime.async(function showAlert$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!this.userMedia) {
                this._alert.danger({
                  message: _audioSettingsErrors["default"].userMediaPermission,
                  allowDuplicates: false,
                  ttl: 30 * 1000
                });
              }

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setData",
    value: function setData(_ref2) {
      var _ref2$dialButtonVolum, dialButtonVolume, _ref2$dialButtonMuted, dialButtonMuted, _ref2$ringtoneVolume, ringtoneVolume, _ref2$ringtoneMuted, ringtoneMuted, _ref2$callVolume, callVolume, _ref2$outputDeviceId, outputDeviceId, _ref2$inputDeviceId, inputDeviceId;

      return regeneratorRuntime.async(function setData$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref2$dialButtonVolum = _ref2.dialButtonVolume, dialButtonVolume = _ref2$dialButtonVolum === void 0 ? this.dialButtonVolume : _ref2$dialButtonVolum, _ref2$dialButtonMuted = _ref2.dialButtonMuted, dialButtonMuted = _ref2$dialButtonMuted === void 0 ? this.dialButtonMuted : _ref2$dialButtonMuted, _ref2$ringtoneVolume = _ref2.ringtoneVolume, ringtoneVolume = _ref2$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref2$ringtoneVolume, _ref2$ringtoneMuted = _ref2.ringtoneMuted, ringtoneMuted = _ref2$ringtoneMuted === void 0 ? this.ringtoneMuted : _ref2$ringtoneMuted, _ref2$callVolume = _ref2.callVolume, callVolume = _ref2$callVolume === void 0 ? this.callVolume : _ref2$callVolume, _ref2$outputDeviceId = _ref2.outputDeviceId, outputDeviceId = _ref2$outputDeviceId === void 0 ? this.outputDeviceId : _ref2$outputDeviceId, _ref2$inputDeviceId = _ref2.inputDeviceId, inputDeviceId = _ref2$inputDeviceId === void 0 ? this.inputDeviceId : _ref2$inputDeviceId;
              this.store.dispatch({
                type: this.actionTypes.setData,
                dialButtonVolume: dialButtonVolume,
                dialButtonMuted: dialButtonMuted,
                ringtoneVolume: ringtoneVolume,
                ringtoneMuted: ringtoneMuted,
                callVolume: callVolume,
                outputDeviceId: outputDeviceId,
                inputDeviceId: inputDeviceId
              });

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "outputDeviceId",
    get: function get() {
      return this._storage.getItem(this._storageKey).outputDeviceId;
    }
  }, {
    key: "outputDevice",
    get: function get() {
      var _this4 = this;

      return (0, _ramda.find)(function (device) {
        return device.kind === 'audiooutput' && device.deviceId === _this4.outputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "inputDeviceId",
    get: function get() {
      return this._storage.getItem(this._storageKey).inputDeviceId;
    }
  }, {
    key: "inputDevice",
    get: function get() {
      var _this5 = this;

      return (0, _ramda.find)(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this5.inputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "supportDevices",
    get: function get() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }
  }, {
    key: "availableDevices",
    get: function get() {
      return this.state.availableDevices;
    }
  }, {
    key: "cacheData",
    get: function get() {
      return this._storage.getItem(this._storageKey) || {};
    }
  }, {
    key: "dialButtonVolume",
    get: function get() {
      return this.cacheData.dialButtonVolume;
    }
  }, {
    key: "dialButtonMuted",
    get: function get() {
      return this.cacheData.dialButtonMuted;
    }
  }, {
    key: "ringtoneVolume",
    get: function get() {
      return this.cacheData.ringtoneVolume;
    }
  }, {
    key: "ringtoneMuted",
    get: function get() {
      return this.cacheData.ringtoneMuted;
    }
  }, {
    key: "callVolume",
    get: function get() {
      return this.cacheData.callVolume;
    }
  }, {
    key: "userMedia",
    get: function get() {
      var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

      if (isFirefox) {
        return true;
      } // this detection method may not work in the future
      // currently there is no good way to detect this


      return !!(this.availableDevices.length && this.availableDevices[0].label !== '');
    }
  }, {
    key: "hasAutoPrompted",
    get: function get() {
      return this.cacheData.hasAutoPrompted;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return AudioSettings;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "markAutoPrompted", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "markAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkDevices", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onGetUserMediaSuccess", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onGetUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onGetUserMediaError", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onGetUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "availableOutputDevices", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.state.availableDevices;
    }, function (devices) {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audiooutput';
      }, devices);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "availableInputDevices", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.state.availableDevices;
    }, function (devices) {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audioinput';
      }, devices);
    }];
  }
})), _class2)) || _class);
exports["default"] = AudioSettings;
//# sourceMappingURL=index.js.map
