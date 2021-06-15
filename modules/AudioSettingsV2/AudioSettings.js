"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettings = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.assign");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _audioSettingsErrors = require("./audioSettingsErrors");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, {
      mediaDevices: {}
    });
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
var AudioSettings = (_dec = (0, _di.Module)({
  name: 'AudioSettings',
  deps: ['Auth', 'Alert', 'Storage', 'ExtensionFeatures', {
    dep: 'AudioSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var availableDevices = _ref.availableDevices;
  return [availableDevices];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var availableDevices = _ref2.availableDevices;
  return [availableDevices];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AudioSettings, _RcModuleV);

  var _super = _createSuper(AudioSettings);

  function AudioSettings(deps) {
    var _this;

    _classCallCheck(this, AudioSettings);

    _this = _super.call(this, {
      deps: deps,
      storageKey: 'AudioSettings',
      enableCache: true
    });
    /* migration storage v1 to v2 */

    _this._getUserMediaPromise = null;

    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "availableDevices", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "hasUserMedia", _descriptor3, _assertThisInitialized(_this));

    if (_this._deps.storage) {
      var _this$_deps$storage$m;

      _this._deps.storage.migrationMapping = (_this$_deps$storage$m = _this._deps.storage.migrationMapping) !== null && _this$_deps$storage$m !== void 0 ? _this$_deps$storage$m : {};
      _this._deps.storage.migrationMapping['AudioSettings-data'] = 'audioSettings';
    }
    /* migration storage v1 to v2 */


    return _this;
  }

  _createClass(AudioSettings, [{
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
    }
  }, {
    key: "setUserMediaSuccess",
    value: function setUserMediaSuccess() {
      this.hasUserMedia = true;
    }
  }, {
    key: "setAvailableDevices",
    value: function setAvailableDevices(devices) {
      var _this2 = this;

      this.availableDevices = devices;
      var isOutputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this2.data.outputDeviceId && device.kind === 'audiooutput';
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
        } else {
          this.data.outputDeviceId = 'default';
        }
      }

      var isInputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this2.data.inputDeviceId && device.kind === 'audioinput';
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
    value: function _setData(_ref3) {
      var _ref3$dialButtonVolum = _ref3.dialButtonVolume,
          dialButtonVolume = _ref3$dialButtonVolum === void 0 ? this.dialButtonVolume : _ref3$dialButtonVolum,
          _ref3$dialButtonMuted = _ref3.dialButtonMuted,
          dialButtonMuted = _ref3$dialButtonMuted === void 0 ? this.dialButtonMuted : _ref3$dialButtonMuted,
          _ref3$ringtoneVolume = _ref3.ringtoneVolume,
          ringtoneVolume = _ref3$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref3$ringtoneVolume,
          _ref3$ringtoneMuted = _ref3.ringtoneMuted,
          ringtoneMuted = _ref3$ringtoneMuted === void 0 ? this.ringtoneMuted : _ref3$ringtoneMuted,
          _ref3$callVolume = _ref3.callVolume,
          callVolume = _ref3$callVolume === void 0 ? this.callVolume : _ref3$callVolume,
          _ref3$outputDeviceId = _ref3.outputDeviceId,
          outputDeviceId = _ref3$outputDeviceId === void 0 ? this.outputDeviceId : _ref3$outputDeviceId,
          _ref3$inputDeviceId = _ref3.inputDeviceId,
          inputDeviceId = _ref3$inputDeviceId === void 0 ? this.inputDeviceId : _ref3$inputDeviceId;
      this.data.outputDeviceId = outputDeviceId;
      this.data.inputDeviceId = inputDeviceId;
      this.data.dialButtonVolume = Math.min(1, Math.max(0, dialButtonVolume));
      this.data.dialButtonMuted = !!dialButtonMuted;
      this.data.ringtoneVolume = Math.min(1, Math.max(0, ringtoneVolume));
      this.data.ringtoneMuted = !!ringtoneMuted;
      this.data.callVolume = Math.min(1, Math.max(0.1, callVolume));
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this3 = this;

      // Check audio permissions everytime app client starts
      if (this.supportDevices) {
        this._checkDevices();
      }

      this.parentModule.store.subscribe(function () {
        if (_this3.ready && _this3._deps.auth.loggedIn && _this3._deps.extensionFeatures.isWebPhoneEnabled && !_this3.userMedia) {
          // Make sure it only prompts once
          if (_this3.hasAutoPrompted) return;

          _this3.markAutoPrompted();

          _this3.getUserMedia();
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
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _get(_getPrototypeOf(AudioSettings.prototype), "_initModule", this).call(this);

                if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
                  navigator.mediaDevices.addEventListener('devicechange', function () {
                    _this4._checkDevices();
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
    key: "_checkDevices",
    value: function () {
      var _checkDevices2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var devices;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return navigator.mediaDevices.enumerateDevices();

              case 2:
                devices = _context4.sent;
                this.setAvailableDevices( // TODO formatting for devices info instances and replace JSON APIs.
                devices.map(function (d) {
                  return JSON.parse(JSON.stringify(d));
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _checkDevices() {
        return _checkDevices2.apply(this, arguments);
      }

      return _checkDevices;
    }()
  }, {
    key: "getUserMedia",
    value: function () {
      var _getUserMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var stream;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
                return this._getUserMediaPromise;

              case 6:
                stream = _context5.sent;
                this._getUserMediaPromise = null;
                _context5.next = 10;
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

                _context5.next = 17;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](2);
                this._getUserMediaPromise = null;
                this.onGetUserMediaError();

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 13]]);
      }));

      function getUserMedia() {
        return _getUserMedia.apply(this, arguments);
      }

      return getUserMedia;
    }()
  }, {
    key: "_onGetUserMediaSuccess",
    value: function () {
      var _onGetUserMediaSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var userMediaAlert;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userMediaAlert = (0, _ramda.find)(function (item) {
                  return item.message === _audioSettingsErrors.audioSettingsErrors.userMediaPermission;
                }, this._deps.alert.messages);

                if (userMediaAlert) {
                  this._deps.alert.dismiss(userMediaAlert.id);
                }

                this.setUserMediaSuccess();
                _context6.next = 5;
                return this._checkDevices();

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onGetUserMediaSuccess() {
        return _onGetUserMediaSuccess2.apply(this, arguments);
      }

      return _onGetUserMediaSuccess;
    }()
  }, {
    key: "onGetUserMediaError",
    value: function () {
      var _onGetUserMediaError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.setUserMediaError();

                this._deps.alert.danger({
                  message: _audioSettingsErrors.audioSettingsErrors.userMediaPermission,
                  allowDuplicates: false
                });

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onGetUserMediaError() {
        return _onGetUserMediaError.apply(this, arguments);
      }

      return onGetUserMediaError;
    }()
  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.userMedia) {
                  this._deps.alert.danger({
                    message: _audioSettingsErrors.audioSettingsErrors.userMediaPermission,
                    allowDuplicates: false,
                    ttl: 30 * 1000
                  });
                }

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function showAlert() {
        return _showAlert.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref4) {
        var _ref4$dialButtonVolum, dialButtonVolume, _ref4$dialButtonMuted, dialButtonMuted, _ref4$ringtoneVolume, ringtoneVolume, _ref4$ringtoneMuted, ringtoneMuted, _ref4$callVolume, callVolume, _ref4$outputDeviceId, outputDeviceId, _ref4$inputDeviceId, inputDeviceId;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref4$dialButtonVolum = _ref4.dialButtonVolume, dialButtonVolume = _ref4$dialButtonVolum === void 0 ? this.dialButtonVolume : _ref4$dialButtonVolum, _ref4$dialButtonMuted = _ref4.dialButtonMuted, dialButtonMuted = _ref4$dialButtonMuted === void 0 ? this.dialButtonMuted : _ref4$dialButtonMuted, _ref4$ringtoneVolume = _ref4.ringtoneVolume, ringtoneVolume = _ref4$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref4$ringtoneVolume, _ref4$ringtoneMuted = _ref4.ringtoneMuted, ringtoneMuted = _ref4$ringtoneMuted === void 0 ? this.ringtoneMuted : _ref4$ringtoneMuted, _ref4$callVolume = _ref4.callVolume, callVolume = _ref4$callVolume === void 0 ? this.callVolume : _ref4$callVolume, _ref4$outputDeviceId = _ref4.outputDeviceId, outputDeviceId = _ref4$outputDeviceId === void 0 ? this.outputDeviceId : _ref4$outputDeviceId, _ref4$inputDeviceId = _ref4.inputDeviceId, inputDeviceId = _ref4$inputDeviceId === void 0 ? this.inputDeviceId : _ref4$inputDeviceId;

                this._setData({
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
        }, _callee9, this);
      }));

      function setData(_x) {
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
      var _this5 = this;

      return (0, _ramda.find)(function (device) {
        return device.kind === 'audiooutput' && device.deviceId === _this5.outputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "inputDeviceId",
    get: function get() {
      return this.data.inputDeviceId;
    }
  }, {
    key: "inputDevice",
    get: function get() {
      var _this6 = this;

      return (0, _ramda.find)(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this6.inputDeviceId;
      }, this.availableDevices);
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
    key: "availableInputDevices",
    get: function get() {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audioinput';
      }, this.availableDevices);
    }
  }, {
    key: "dialButtonVolume",
    get: function get() {
      return this.data.dialButtonVolume;
    }
  }, {
    key: "dialButtonMuted",
    get: function get() {
      return this.data.dialButtonMuted;
    }
  }, {
    key: "ringtoneVolume",
    get: function get() {
      return this.data.ringtoneVolume;
    }
  }, {
    key: "ringtoneMuted",
    get: function get() {
      return this.data.ringtoneMuted;
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
      } // this detection method may not work in the future
      // currently there is no good way to detect this


      return !!(this.availableDevices.length && this.availableDevices[0].label !== '');
    }
  }]);

  return AudioSettings;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      dialButtonVolume: 1,
      dialButtonMuted: false,
      ringtoneVolume: 0.3,
      ringtoneMuted: false,
      callVolume: 1,
      outputDeviceId: 'default',
      inputDeviceId: 'default',
      hasAutoPrompted: false
    };
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
}), _applyDecoratedDescriptor(_class2.prototype, "setHasAutoPrompted", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setHasAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAvailableDevices", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAvailableDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAutoPrompted", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "markAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkDevices", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onGetUserMediaSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onGetUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onGetUserMediaError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onGetUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableOutputDevices", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableOutputDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableInputDevices", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableInputDevices"), _class2.prototype)), _class2)) || _class);
exports.AudioSettings = AudioSettings;
//# sourceMappingURL=AudioSettings.js.map
