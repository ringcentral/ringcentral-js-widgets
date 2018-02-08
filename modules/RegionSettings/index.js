'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

require('core-js/fn/array/find');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _getRegionSettingsReducer = require('./getRegionSettingsReducer');

var _getRegionSettingsReducer2 = _interopRequireDefault(_getRegionSettingsReducer);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _regionSettingsMessages = require('../RegionSettings/regionSettingsMessages');

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _validateAreaCode = require('../../lib/validateAreaCode');

var _validateAreaCode2 = _interopRequireDefault(_validateAreaCode);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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
 * @description Region settings managing module
 */
var RegionSettings = (_dec = (0, _di.Module)({
  deps: ['Alert', 'DialingPlan', 'ExtensionInfo', 'Storage', { dep: 'TabManager', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(RegionSettings, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Storage} params.storage - storage module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {DialingPlan} params.dialingPlan - dialingPlan module instance
   * @param {Alert} params.alert - alert module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  function RegionSettings(_ref) {
    var storage = _ref.storage,
        extensionInfo = _ref.extensionInfo,
        dialingPlan = _ref.dialingPlan,
        alert = _ref.alert,
        tabManager = _ref.tabManager,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage', 'extensionInfo', 'dialingPlan', 'alert', 'tabManager']);
    (0, _classCallCheck3.default)(this, RegionSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RegionSettings.__proto__ || (0, _getPrototypeOf2.default)(RegionSettings)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._storage = storage;
    _this._alert = alert;
    _this._dialingPlan = dialingPlan;
    _this._extensionInfo = extensionInfo;
    _this._tabManager = tabManager;

    _this._countryCodeKey = 'regionSettingsCountryCode';
    _this._areaCodeKey = 'regionSettingsAreaCode';
    _this._reducer = (0, _getRegionSettingsReducer2.default)(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._countryCodeKey,
      reducer: (0, _getRegionSettingsReducer.getCountryCodeReducer)(_this.actionTypes)
    });
    _this._storage.registerReducer({
      key: _this._areaCodeKey,
      reducer: (0, _getRegionSettingsReducer.getAreaCodeReducer)(_this.actionTypes)
    });

    _this._processedPlans = null;
    return _this;
  }

  (0, _createClass3.default)(RegionSettings, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._storage.ready && _this2._dialingPlan.ready && _this2._extensionInfo.ready && _this2.status === _moduleStatuses2.default.pending)) {
                  _context.next = 9;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.init
                });

                if (!(!_this2._tabManager || _this2._tabManager.active)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return _this2.checkRegionSettings();

              case 5:
                _this2._processedPlans = _this2._dialingPlan.plans;
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });
                _context.next = 18;
                break;

              case 9:
                if (!(!_this2._storage.ready && _this2.ready)) {
                  _context.next = 13;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.resetSuccess
                });
                _context.next = 18;
                break;

              case 13:
                if (!(_this2.ready && _this2._processedPlans !== _this2._dialingPlan.plans)) {
                  _context.next = 18;
                  break;
                }

                _this2._processedPlans = _this2._dialingPlan.plans;

                if (!(!_this2._tabManager || _this2._tabManager.active)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return _this2.checkRegionSettings();

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }, {
    key: '_alertSettingsChanged',
    value: function _alertSettingsChanged() {
      this._alert.warning({
        message: _regionSettingsMessages2.default.dialingPlansChanged,
        ttl: 0
      });
    }
  }, {
    key: 'checkRegionSettings',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        var countryCode, country;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                countryCode = this._storage.getItem(this._countryCodeKey);

                if (countryCode && !this._dialingPlan.plans.find(function (plan) {
                  return plan.isoCode === countryCode;
                })) {
                  countryCode = null;
                  this._alertSettingsChanged();
                }
                if (!countryCode) {
                  country = this._dialingPlan.plans.find(function (plan) {
                    return plan.isoCode === _this3._extensionInfo.country.isoCode;
                  }) || this._dialingPlan.plans[0];

                  countryCode = country && country.isoCode;
                  this.store.dispatch({
                    type: this.actionTypes.setData,
                    countryCode: countryCode,
                    areaCode: ''
                  });
                }

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkRegionSettings() {
        return _ref3.apply(this, arguments);
      }

      return checkRegionSettings;
    }()
  }, {
    key: 'setData',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5) {
        var areaCode = _ref5.areaCode,
            countryCode = _ref5.countryCode;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if ((0, _validateAreaCode2.default)(areaCode)) {
                  _context3.next = 3;
                  break;
                }

                this._alert.danger({
                  message: _regionSettingsMessages2.default.areaCodeInvalid
                });
                return _context3.abrupt('return');

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.setData,
                  countryCode: countryCode,
                  areaCode: areaCode && areaCode.trim()
                });
                this._alert.info({
                  message: _regionSettingsMessages2.default.saveSuccess
                });

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setData(_x) {
        return _ref4.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: 'setCountryCode',
    value: function setCountryCode(countryCode) {
      this.setData({
        countryCode: countryCode
      });
    }
  }, {
    key: 'setAreaCode',
    value: function setAreaCode(areaCode) {
      this.setData({
        areaCode: areaCode
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'availableCountries',
    get: function get() {
      return this._dialingPlan.plans;
    }
  }, {
    key: 'countryCode',
    get: function get() {
      return this._storage.getItem(this._countryCodeKey) || 'US';
    }
  }, {
    key: 'areaCode',
    get: function get() {
      return this._storage.getItem(this._areaCodeKey) || '';
    }
  }]);
  return RegionSettings;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'checkRegionSettings', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'checkRegionSettings'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setData'), _class2.prototype)), _class2)) || _class);
exports.default = RegionSettings;
//# sourceMappingURL=index.js.map
