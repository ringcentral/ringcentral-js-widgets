"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvManualDialSettingsUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var EvManualDialSettingsUI = (_dec = (0, _di.Module)({
  name: 'EvManualDialSettingsUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'EvAuth']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.callerIds, that._deps.evCall.formGroup.dialoutCallerId];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.availableQueues, that._deps.evCall.formGroup.dialoutQueueId];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.availableCountries, that._deps.evCall.formGroup.dialoutCountryId];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.queue, that.country, that.callerId, that._deps.evCall.formGroup.dialoutRingTime, that._deps.evCall.ringTimeLimit, that._deps.evAuth.callerIds, that._deps.evAuth.availableQueues, that._deps.evAuth.availableCountries, that._deps.evAuth.agentPermissions.allowManualOutboundGates, that._deps.evAuth.agentPermissions.allowManualIntlCalls, that._deps.locale.currentLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(EvManualDialSettingsUI, _ref);
  var _super = _createSuper(EvManualDialSettingsUI);
  function EvManualDialSettingsUI(deps) {
    var _this;
    _classCallCheck(this, EvManualDialSettingsUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._renderProps = void 0;
    return _this;
  }
  _createClass(EvManualDialSettingsUI, [{
    key: "_validate",
    value: function _validate(value) {
      return !(typeof value === 'undefined' || value === null);
    }
  }, {
    key: "_navigateToDialer",
    value: function _navigateToDialer() {
      this._deps.routerInteraction.push('/dialer');
    }
  }, {
    key: "_searchMethod",
    value: function _searchMethod(value, text) {
      return value.toLowerCase().includes(text.toLowerCase());
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._renderProps = props;
      return {
        currentLocale: this._deps.locale.currentLocale,
        settingFields: this.settingFields
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        init: function init() {
          _this2._deps.evCall.resetForm();
        },
        goBack: function goBack() {
          return _this2._navigateToDialer();
        },
        save: function save() {
          _this2._deps.evCall.saveForm();
          _this2._navigateToDialer();
        }
      };
    }
  }, {
    key: "callerId",
    get: function get() {
      var _this3 = this;
      return this._deps.evAuth.callerIds.find(function (_ref2) {
        var number = _ref2.number;
        return number === _this3._deps.evCall.formGroup.dialoutCallerId;
      });
    }
  }, {
    key: "queue",
    get: function get() {
      var _this4 = this;
      return this._deps.evAuth.availableQueues.find(function (queue) {
        return queue.gateId === _this4._deps.evCall.formGroup.dialoutQueueId;
      });
    }
  }, {
    key: "country",
    get: function get() {
      var _this5 = this;
      return this._deps.evAuth.availableCountries.find(function (country) {
        return country.countryId === _this5._deps.evCall.formGroup.dialoutCountryId;
      });
    }
  }, {
    key: "settingFields",
    get: function get() {
      var _this6 = this;
      return [{
        dataSign: 'callerId',
        value: this.callerId.number,
        onChange: function onChange(dialoutCallerId) {
          if (_this6._validate(dialoutCallerId)) {
            _this6._deps.evCall.setFormGroup({
              dialoutCallerId: dialoutCallerId
            });
          }
        },
        select: {
          label: _i18n["default"].getString('callerId', this._deps.locale.currentLocale),
          required: true,
          options: this._deps.evAuth.callerIds,
          getItemValue: function getItemValue(value) {
            return value.number;
          },
          itemRenderer: this._renderProps.renderCallerIdLabel,
          renderValue: this.callerId.description,
          searchOption: function searchOption(value, text) {
            return _this6._searchMethod("".concat(value.description, " ").concat(value.number), text);
          }
        }
      }].concat(_toConsumableArray(this._deps.evAuth.agentPermissions.allowManualOutboundGates ? [{
        dataSign: 'queue',
        value: this.queue.gateId,
        onChange: function onChange(dialoutQueueId) {
          if (_this6._validate(dialoutQueueId)) {
            _this6._deps.evCall.setFormGroup({
              dialoutQueueId: dialoutQueueId
            });
          }
        },
        select: {
          label: _i18n["default"].getString('queue', this._deps.locale.currentLocale),
          required: true,
          options: this._deps.evAuth.availableQueues,
          renderValue: this.queue.gateName,
          itemRenderer: function itemRenderer(value) {
            return _this6._renderProps.renderQueueLabel(_objectSpread(_objectSpread({}, value), {}, {
              currentLocale: _this6._deps.locale.currentLocale
            }));
          },
          getItemValue: function getItemValue(value) {
            return value.gateId;
          },
          searchOption: function searchOption(value, text) {
            return _this6._searchMethod("".concat(value.gateName, " ").concat(value.gateId), text);
          }
        }
      }] : []), _toConsumableArray(this._deps.evAuth.agentPermissions.allowManualIntlCalls ? [{
        dataSign: 'country',
        value: this.country.countryId,
        onChange: function onChange(dialoutCountryId) {
          if (_this6._validate(dialoutCountryId)) {
            _this6._deps.evCall.setFormGroup({
              dialoutCountryId: dialoutCountryId
            });
          }
        },
        select: {
          label: _i18n["default"].getString('country', this._deps.locale.currentLocale),
          required: true,
          options: this._deps.evAuth.availableCountries,
          renderValue: "".concat(this.country.countryName, " (").concat(this.country.countryId, ")"),
          getItemValue: function getItemValue(value) {
            return value.countryId;
          },
          itemRenderer: function itemRenderer(_ref3) {
            var countryId = _ref3.countryId,
              countryName = _ref3.countryName;
            return "".concat(countryName, " (").concat(countryId, ")");
          },
          searchOption: function searchOption(value, text) {
            return _this6._searchMethod("".concat(value.countryName, "(").concat(value.countryId, ")"), text);
          }
        }
      }] : []), [{
        dataSign: 'ringTime',
        value: this._deps.evCall.formGroup.dialoutRingTime,
        onChange: function onChange(dialoutRingTime) {
          _this6._deps.evCall.setFormGroup({
            dialoutRingTime: dialoutRingTime
          });
        },
        onBlur: function onBlur() {
          _this6._deps.evCall.checkDialoutRingTime();
        },
        input: _objectSpread({
          type: 'number',
          label: _i18n["default"].getString('ringTime', this._deps.locale.currentLocale),
          required: true,
          placeholder: _i18n["default"].getString('ringTime', this._deps.locale.currentLocale)
        }, this._deps.evCall.ringTimeLimit)
      }]);
    }
  }]);
  return EvManualDialSettingsUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "callerId", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "queue", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "queue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "country", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "country"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "settingFields", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "settingFields"), _class2.prototype)), _class2)) || _class);
exports.EvManualDialSettingsUI = EvManualDialSettingsUI;
//# sourceMappingURL=EvManualDialSettingsUI.js.map
