"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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
exports["default"] = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _getRegionSettingsReducer = _interopRequireWildcard(require("./getRegionSettingsReducer"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _regionSettingsMessages = _interopRequireDefault(require("../RegionSettings/regionSettingsMessages"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _validateAreaCode = _interopRequireDefault(require("../../lib/validateAreaCode"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _dec, _class, _class2, _descriptor;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var RegionSettings = (
/**
 * @class
 * @description Region settings managing module
 */
_dec = (0, _di.Module)({
  deps: ['Brand', 'Alert', 'DialingPlan', 'ExtensionInfo', 'Storage', {
    dep: 'TabManager',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(RegionSettings, _RcModule);

  var _super = _createSuper(RegionSettings);

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
    var _this;

    var brand = _ref.brand,
        storage = _ref.storage,
        extensionInfo = _ref.extensionInfo,
        dialingPlan = _ref.dialingPlan,
        alert = _ref.alert,
        tabManager = _ref.tabManager,
        options = _objectWithoutProperties(_ref, ["brand", "storage", "extensionInfo", "dialingPlan", "alert", "tabManager"]);

    _classCallCheck(this, RegionSettings);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "availableCountries", _descriptor, _assertThisInitialized(_this));

    _this._brand = brand;
    _this._storage = storage;
    _this._alert = alert;
    _this._dialingPlan = dialingPlan;
    _this._extensionInfo = extensionInfo;
    _this._tabManager = tabManager;
    _this._countryCodeKey = 'regionSettingsCountryCode';
    _this._areaCodeKey = 'regionSettingsAreaCode';
    _this._reducer = (0, _getRegionSettingsReducer["default"])(_this.actionTypes);

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

  _createClass(RegionSettings, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._storage.ready && _this2._dialingPlan.ready && _this2._extensionInfo.ready && _this2.status === _moduleStatuses["default"].pending)) {
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
                _this2._processedPlans = _this2.availableCountries;

                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess
                });

                _context.next = 18;
                break;

              case 9:
                if (!((!_this2._storage.ready || !_this2._dialingPlan.ready || !_this2._extensionInfo.ready) && _this2.ready)) {
                  _context.next = 13;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.resetSuccess
                });

                _context.next = 18;
                break;

              case 13:
                if (!(_this2.ready && _this2._processedPlans !== _this2.availableCountries)) {
                  _context.next = 18;
                  break;
                }

                _this2._processedPlans = _this2.availableCountries;

                if (!(!_this2._tabManager || _this2._tabManager.active)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return _this2.checkRegionSettings();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, {
    key: "_alertSettingsChanged",
    value: function _alertSettingsChanged() {
      this._alert.warning({
        allowDuplicates: false,
        message: _regionSettingsMessages["default"].dialingPlansChanged,
        ttl: 0
      });
    }
  }, {
    key: "checkRegionSettings",
    value: function () {
      var _checkRegionSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var countryCode, country;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                countryCode = this._storage.getItem(this._countryCodeKey);

                if (countryCode && !(0, _ramda.find)(function (plan) {
                  return plan.isoCode === countryCode;
                }, this.availableCountries)) {
                  countryCode = null;

                  if (this._brand.id === '1210') {
                    this._alertSettingsChanged();
                  }
                }

                if (!countryCode) {
                  country = (0, _ramda.find)(function (plan) {
                    return plan.isoCode === _this3._extensionInfo.country.isoCode;
                  }, this.availableCountries) || this.availableCountries[0];
                  countryCode = country && country.isoCode;
                  this.store.dispatch({
                    type: this.actionTypes.setData,
                    countryCode: countryCode,
                    areaCode: ''
                  });
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkRegionSettings() {
        return _checkRegionSettings.apply(this, arguments);
      }

      return checkRegionSettings;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var areaCode, countryCode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                areaCode = _ref3.areaCode, countryCode = _ref3.countryCode;

                if ((0, _validateAreaCode["default"])(areaCode)) {
                  _context3.next = 4;
                  break;
                }

                this._alert.danger({
                  message: _regionSettingsMessages["default"].areaCodeInvalid
                });

                return _context3.abrupt("return");

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.setData,
                  countryCode: countryCode,
                  areaCode: areaCode && areaCode.trim()
                });

                this._alert.info({
                  message: _regionSettingsMessages["default"].saveSuccess
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setData(_x) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: "setCountryCode",
    value: function setCountryCode(countryCode) {
      this.setData({
        countryCode: countryCode
      });
    }
  }, {
    key: "setAreaCode",
    value: function setAreaCode(areaCode) {
      this.setData({
        areaCode: areaCode
      });
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "showReginSetting",
    get: function get() {
      if (this.availableCountries.length > 1) {
        return true;
      }

      if (this.availableCountries.length === 1 && (this.availableCountries[0].isoCode === 'US' || this.availableCountries[0].isoCode === 'CA')) {
        return true;
      }

      return false;
    }
  }, {
    key: "countryCode",
    get: function get() {
      return this._storage.getItem(this._countryCodeKey) || 'US';
    }
  }, {
    key: "areaCode",
    get: function get() {
      return this._storage.getItem(this._areaCodeKey) || '';
    }
  }, {
    key: "homeCountryId",
    get: function get() {
      var _this4 = this;

      var homeCountry = this.availableCountries.find(function (country) {
        return country.isoCode === _this4.countryCode;
      });
      var homeCountryId = homeCountry && homeCountry.id || '1';
      return homeCountryId;
    }
  }]);

  return RegionSettings;
}(_RcModule2["default"]), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._dialingPlan.plans;
    }, function () {
      return _this5._extensionInfo.country;
    }, function (plans, country) {
      if (plans && plans.length > 0) {
        return plans;
      }

      return country && [country] || [];
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "checkRegionSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "checkRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype)), _class2)) || _class);
exports["default"] = RegionSettings;
//# sourceMappingURL=index.js.map
