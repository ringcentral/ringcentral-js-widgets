'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('../../lib/di');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getAudioSettingsReducer = require('./getAudioSettingsReducer');

var _getAudioSettingsReducer2 = _interopRequireDefault(_getAudioSettingsReducer);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

var _audioSettingsErrors = require('./audioSettingsErrors');

var _audioSettingsErrors2 = _interopRequireDefault(_audioSettingsErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @class
 * @description AudioSettings module.
 */
var AudioSettings = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Storage']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(AudioSettings, _RcModule);

  function AudioSettings(_ref) {
    var storage = _ref.storage,
        alert = _ref.alert,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage', 'alert']);
    (0, _classCallCheck3.default)(this, AudioSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioSettings.__proto__ || (0, _getPrototypeOf2.default)(AudioSettings)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._storage = _ensureExist2.default.call(_this, storage, 'storage');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._storageKey = 'audioSettings';
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getStorageReducer2.default)(_this.actionTypes)
    });
    _this._reducer = (0, _getAudioSettingsReducer2.default)(_this.actionTypes);

    _this.addSelector('availableOutputDevices', function () {
      return _this.state.availableDevices;
    }, function (devices) {
      return _ramda2.default.filter(function (device) {
        return device.kind === 'audiooutput';
      }, devices);
    });
    _this.addSelector('availableInputDevices', function () {
      return _this.state.availableDevices;
    }, function (devices) {
      return _ramda2.default.filter(function (device) {
        return device.kind === 'audioinput';
      }, devices);
    });
    return _this;
  }

  (0, _createClass3.default)(AudioSettings, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
      if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
        navigator.mediaDevices.addEventListener('devicechange', function () {
          _this2._checkDevices();
        });
      }
    }
  }, {
    key: 'initializeProxy',
    value: function initializeProxy() {
      // TODO: remove following user media check
      this.getUserMedia();
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this.pending && this._storage.ready);
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !!(this.ready && !this._storage.ready);
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!this.supportDevices) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._checkDevices();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 9;
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
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_checkDevices',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var devices;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return navigator.mediaDevices.enumerateDevices();

              case 2:
                devices = _context2.sent;

                this.store.dispatch({
                  type: this.actionTypes.setAvailableDevices,
                  devices: devices
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _checkDevices() {
        return _ref3.apply(this, arguments);
      }

      return _checkDevices;
    }()
  }, {
    key: 'getUserMedia',
    value: function getUserMedia() {
      var _this3 = this;

      return new _promise2.default(function (resolve) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
          navigator.getUserMedia({
            audio: true
          }, function (stream) {
            _this3._onGetUserMediaSuccess();
            if (typeof stream.stop === 'function') {
              stream.stop();
            } else {
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
            }
            resolve();
          }, function (error) {
            _this3._onGetUserMediaError(error);
            resolve();
          });
        }
      });
    }
  }, {
    key: '_onGetUserMediaSuccess',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var userMediaAlert;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userMediaAlert = _ramda2.default.find(function (item) {
                  return item.message === _audioSettingsErrors2.default.userMediaPermission;
                }, this._alert.messages);

                if (userMediaAlert) {
                  this._alert.dismiss(userMediaAlert.id);
                }
                this.store.dispatch({
                  type: this.actionTypes.getUserMediaSuccess
                });
                this._checkDevices();

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onGetUserMediaSuccess() {
        return _ref4.apply(this, arguments);
      }

      return _onGetUserMediaSuccess;
    }()
  }, {
    key: '_onGetUserMediaError',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(error) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.getUserMediaError,
                  error: error
                });
                this._alert.danger({
                  message: _audioSettingsErrors2.default.userMediaPermission,
                  ttl: 0,
                  allowDuplicates: false
                });

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _onGetUserMediaError(_x) {
        return _ref5.apply(this, arguments);
      }

      return _onGetUserMediaError;
    }()
  }, {
    key: 'showAlert',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.userMedia) {
                  this._alert.danger({
                    message: _audioSettingsErrors2.default.userMediaPermission,
                    ttl: 0,
                    allowDuplicates: false
                  });
                }

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function showAlert() {
        return _ref6.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: 'setData',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref8) {
        var _ref8$dialButtonVolum = _ref8.dialButtonVolume,
            dialButtonVolume = _ref8$dialButtonVolum === undefined ? this.dialButtonVolume : _ref8$dialButtonVolum,
            _ref8$dialButtonMuted = _ref8.dialButtonMuted,
            dialButtonMuted = _ref8$dialButtonMuted === undefined ? this.dialButtonMuted : _ref8$dialButtonMuted,
            _ref8$ringtoneVolume = _ref8.ringtoneVolume,
            ringtoneVolume = _ref8$ringtoneVolume === undefined ? this.ringtoneVolume : _ref8$ringtoneVolume,
            _ref8$ringtoneMuted = _ref8.ringtoneMuted,
            ringtoneMuted = _ref8$ringtoneMuted === undefined ? this.ringtoneMuted : _ref8$ringtoneMuted,
            _ref8$callVolume = _ref8.callVolume,
            callVolume = _ref8$callVolume === undefined ? this.callVolume : _ref8$callVolume,
            _ref8$outputDeviceId = _ref8.outputDeviceId,
            outputDeviceId = _ref8$outputDeviceId === undefined ? this.outputDeviceId : _ref8$outputDeviceId,
            _ref8$inputDeviceId = _ref8.inputDeviceId,
            inputDeviceId = _ref8$inputDeviceId === undefined ? this.inputDeviceId : _ref8$inputDeviceId;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
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

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setData(_x2) {
        return _ref7.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: 'outputDeviceId',
    get: function get() {
      return this._storage.getItem(this._storageKey).outputDeviceId;
    }
  }, {
    key: 'outputDevice',
    get: function get() {
      var _this4 = this;

      return _ramda2.default.find(function (device) {
        return device.kind === 'audiooutput' && device.deviceId === _this4.outputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: 'inputDeviceId',
    get: function get() {
      return this._storage.getItem(this._storageKey).inputDeviceId;
    }
  }, {
    key: 'inputDevice',
    get: function get() {
      var _this5 = this;

      return _ramda2.default.find(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this5.inputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: 'supportDevices',
    get: function get() {
      return !!(HTMLMediaElement.prototype.setSinkId && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }
  }, {
    key: 'availableDevices',
    get: function get() {
      return this.state.availableDevices;
    }
  }, {
    key: 'availableOutputDevices',
    get: function get() {
      return this._selectors.availableOutputDevices();
    }
  }, {
    key: 'availableInputDevices',
    get: function get() {
      return this._selectors.availableInputDevices();
    }
  }, {
    key: 'cacheData',
    get: function get() {
      return this._storage.getItem(this._storageKey) || {};
    }
  }, {
    key: 'dialButtonVolume',
    get: function get() {
      return this.cacheData.dialButtonVolume;
    }
  }, {
    key: 'dialButtonMuted',
    get: function get() {
      return this.cacheData.dialButtonMuted;
    }
  }, {
    key: 'ringtoneVolume',
    get: function get() {
      return this.cacheData.ringtoneVolume;
    }
  }, {
    key: 'ringtoneMuted',
    get: function get() {
      return this.cacheData.ringtoneMuted;
    }
  }, {
    key: 'callVolume',
    get: function get() {
      return this.cacheData.callVolume;
    }
  }, {
    key: 'userMedia',
    get: function get() {
      // this detection method may not work in the future
      // currently there is no good way to detect this
      return !!(this.availableDevices.length && this.availableDevices[0].label !== '');
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return AudioSettings;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, '_onGetUserMediaSuccess', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_onGetUserMediaSuccess'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onGetUserMediaError', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_onGetUserMediaError'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'showAlert', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'showAlert'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setData'), _class2.prototype)), _class2)) || _class);
exports.default = AudioSettings;
//# sourceMappingURL=index.js.map
