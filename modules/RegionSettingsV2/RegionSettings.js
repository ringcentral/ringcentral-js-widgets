"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

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
exports.RegionSettings = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _regionSettingsMessages = require("./regionSettingsMessages");

var _validateAreaCode = _interopRequireDefault(require("../../lib/validateAreaCode"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

var RegionSettings = (_dec = (0, _di.Module)({
  name: 'RegionSettings',
  deps: ['Brand', 'Alert', 'DialingPlan', 'ExtensionInfo', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'RegionSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.dialingPlan.plans, that._deps.extensionInfo.country];
}), _dec3 = (0, _core.computed)(function (_ref) {
  var availableCountries = _ref.availableCountries;
  return [availableCountries];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var availableCountries = _ref2.availableCountries,
      countryCode = _ref2.countryCode;
  return [availableCountries, countryCode];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RegionSettings, _RcModuleV);

  var _super = _createSuper(RegionSettings);

  function RegionSettings(deps) {
    var _this;

    _classCallCheck(this, RegionSettings);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'RegionSettings'
    });
    /* migration storage v1 to v2 */

    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));

    if (_this._deps.storage) {
      var _this$_deps$storage$m;

      _this._deps.storage.migrationMapping = (_this$_deps$storage$m = _this._deps.storage.migrationMapping) !== null && _this$_deps$storage$m !== void 0 ? _this$_deps$storage$m : {};
      _this._deps.storage.migrationMapping['RegionSettings-data'] = {
        countryCode: 'regionSettingsCountryCode',
        areaCode: 'regionSettingsAreaCode'
      };
    }
    /* migration storage v1 to v2 */


    return _this;
  }

  _createClass(RegionSettings, [{
    key: "_setData",
    value: function _setData(_ref3) {
      var _ref3$countryCode = _ref3.countryCode,
          countryCode = _ref3$countryCode === void 0 ? this.data.countryCode : _ref3$countryCode,
          _ref3$areaCode = _ref3.areaCode,
          areaCode = _ref3$areaCode === void 0 ? this.data.areaCode : _ref3$areaCode;
      this.data.countryCode = countryCode;
      this.data.areaCode = areaCode;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2.availableCountries;
      }, function () {
        if (_this2.ready && (!_this2._deps.tabManager || _this2._deps.tabManager.active)) {
          _this2.checkRegionSettings();
        }
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (!this._deps.tabManager || this._deps.tabManager.active) {
        this.checkRegionSettings();
      }
    }
  }, {
    key: "_alertSettingsChanged",
    value: function _alertSettingsChanged() {
      this._deps.alert.warning({
        allowDuplicates: false,
        message: _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged,
        ttl: 0
      });
    }
  }, {
    key: "checkRegionSettings",
    value: function () {
      var _checkRegionSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var countryCode, country;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                countryCode = this.countryCode;

                if (countryCode && !(0, _ramda.find)(function (plan) {
                  return plan.isoCode === countryCode;
                }, this.availableCountries)) {
                  countryCode = null;

                  if (this._deps.brand.id === '1210') {
                    this._alertSettingsChanged();
                  }
                }

                if (!countryCode) {
                  country = (0, _ramda.find)(function (plan) {
                    return plan.isoCode === _this3._deps.extensionInfo.country.isoCode;
                  }, this.availableCountries) || this.availableCountries[0];
                  countryCode = country && country.isoCode;

                  this._setData({
                    countryCode: countryCode,
                    areaCode: ''
                  });
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkRegionSettings() {
        return _checkRegionSettings.apply(this, arguments);
      }

      return checkRegionSettings;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var areaCode, countryCode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                areaCode = _ref4.areaCode, countryCode = _ref4.countryCode;

                if ((0, _validateAreaCode["default"])(areaCode)) {
                  _context2.next = 4;
                  break;
                }

                this._deps.alert.danger({
                  message: _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid
                });

                return _context2.abrupt("return");

              case 4:
                this._setData({
                  countryCode: countryCode,
                  areaCode: areaCode && areaCode.trim()
                });

                this._deps.alert.info({
                  message: _regionSettingsMessages.regionSettingsMessages.saveSuccess
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setData(_x) {
        return _setData2.apply(this, arguments);
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
    key: "countryCode",
    get: function get() {
      return this.data.countryCode || 'US';
    }
  }, {
    key: "areaCode",
    get: function get() {
      return this.data.areaCode || '';
    }
  }, {
    key: "availableCountries",
    get: function get() {
      var plans = this._deps.dialingPlan.plans;
      var country = this._deps.extensionInfo.country;

      if (plans && plans.length > 0) {
        return plans;
      }

      return country ? [country] : [];
    }
  }, {
    key: "showRegionSetting",
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
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      countryCode: 'US',
      areaCode: ''
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableCountries", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableCountries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkRegionSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "checkRegionSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showRegionSetting", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "showRegionSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "homeCountryId", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "homeCountryId"), _class2.prototype)), _class2)) || _class);
exports.RegionSettings = RegionSettings;
//# sourceMappingURL=RegionSettings.js.map
