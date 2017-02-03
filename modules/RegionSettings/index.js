'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

require('core-js/fn/array/find');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _getRegionSettingsReducer = require('./getRegionSettingsReducer');

var _getRegionSettingsReducer2 = _interopRequireDefault(_getRegionSettingsReducer);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _regionSettingsMessages = require('../RegionSettings/regionSettingsMessages');

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _validateAreaCode = require('../../lib/validateAreaCode');

var _validateAreaCode2 = _interopRequireDefault(_validateAreaCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegionSettings = function (_RcModule) {
  (0, _inherits3.default)(RegionSettings, _RcModule);

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
    return _this;
  }

  (0, _createClass3.default)(RegionSettings, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var plans = void 0;
      this.store.subscribe(function () {
        if (_this2._storage.ready && _this2._dialingPlan.ready && _this2._extensionInfo.ready && _this2.status === _moduleStatus2.default.pending) {
          _this2.store.dispatch({
            type: _this2.actionTypes.init
          });
          if (!_this2._tabManager || _this2._tabManager.active) {
            _this2.checkRegionSettings();
          }
          plans = _this2._dialingPlan.plans;
          _this2.store.dispatch({
            type: _this2.actionTypes.initSuccess
          });
        } else if (!_this2._storage.ready && _this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.resetSuccess
          });
        } else if (_this2.ready && plans !== _this2._dialingPlan.plans) {
          plans = _this2._dialingPlan.plans;
          if (!_this2._tabManager || _this2._tabManager.active) {
            _this2.checkRegionSettings();
          }
        }
      });
    }
  }, {
    key: 'checkRegionSettings',
    value: function checkRegionSettings() {
      var _this3 = this;

      var countryCode = this._storage.getItem(this._countryCodeKey);
      if (countryCode && !this._dialingPlan.plans.find(function (plan) {
        return plan.isoCode === countryCode;
      })) {
        countryCode = null;
        this._alert.warning({
          message: _regionSettingsMessages2.default.dialingPlansChanged,
          ttl: 0
        });
      }
      if (!countryCode) {
        countryCode = this._dialingPlan.plans.find(function (plan) {
          return plan.isoCode === _this3._extensionInfo.country.isoCode;
        }).isoCode;
        this.store.dispatch({
          type: this.actionTypes.setData,
          countryCode: countryCode,
          areaCode: ''
        });
      }
    }
  }, {
    key: 'setData',
    value: function setData(_ref2) {
      var areaCode = _ref2.areaCode,
          countryCode = _ref2.countryCode;

      if (!(0, _validateAreaCode2.default)(areaCode)) {
        this._alert.danger({
          message: _regionSettingsMessages2.default.areaCodeInvalid
        });
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.setData,
        countryCode: countryCode,
        areaCode: areaCode && areaCode.trim()
      });
      this._alert.info({
        message: _regionSettingsMessages2.default.saveSuccess
      });
    }
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
      return this.state.status === _moduleStatus2.default.ready;
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
}(_RcModule3.default);

exports.default = RegionSettings;
//# sourceMappingURL=index.js.map
