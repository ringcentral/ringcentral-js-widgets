"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvManualDialSettingsUI = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var EvManualDialSettingsUI = exports.EvManualDialSettingsUI = (_dec = (0, _di.Module)({
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
  function EvManualDialSettingsUI(deps) {
    var _this;
    _classCallCheck(this, EvManualDialSettingsUI);
    _this = _callSuper(this, EvManualDialSettingsUI, [{
      deps: deps
    }]);
    _this._renderProps = void 0;
    return _this;
  }
  _inherits(EvManualDialSettingsUI, _ref);
  return _createClass(EvManualDialSettingsUI, [{
    key: "callerId",
    get: function get() {
      var _this2 = this;
      return this._deps.evAuth.callerIds.find(function (_ref2) {
        var number = _ref2.number;
        return number === _this2._deps.evCall.formGroup.dialoutCallerId;
      });
    }
  }, {
    key: "queue",
    get: function get() {
      var _this3 = this;
      return this._deps.evAuth.availableQueues.find(function (queue) {
        return queue.gateId === _this3._deps.evCall.formGroup.dialoutQueueId;
      });
    }
  }, {
    key: "country",
    get: function get() {
      var _this4 = this;
      return this._deps.evAuth.availableCountries.find(function (country) {
        return country.countryId === _this4._deps.evCall.formGroup.dialoutCountryId;
      });
    }
  }, {
    key: "settingFields",
    get: function get() {
      var _this5 = this;
      return [{
        dataSign: 'callerId',
        value: this.callerId.number,
        onChange: function onChange(dialoutCallerId) {
          if (_this5._validate(dialoutCallerId)) {
            _this5._deps.evCall.setFormGroup({
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
            return _this5._searchMethod("".concat(value.description, " ").concat(value.number), text);
          }
        }
      }].concat(_toConsumableArray(this._deps.evAuth.agentPermissions.allowManualOutboundGates ? [{
        dataSign: 'queue',
        value: this.queue.gateId,
        onChange: function onChange(dialoutQueueId) {
          if (_this5._validate(dialoutQueueId)) {
            _this5._deps.evCall.setFormGroup({
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
            return _this5._renderProps.renderQueueLabel(_objectSpread(_objectSpread({}, value), {}, {
              currentLocale: _this5._deps.locale.currentLocale
            }));
          },
          getItemValue: function getItemValue(value) {
            return value.gateId;
          },
          searchOption: function searchOption(value, text) {
            return _this5._searchMethod("".concat(value.gateName, " ").concat(value.gateId), text);
          }
        }
      }] : []), _toConsumableArray(this._deps.evAuth.agentPermissions.allowManualIntlCalls ? [{
        dataSign: 'country',
        value: this.country.countryId,
        onChange: function onChange(dialoutCountryId) {
          if (_this5._validate(dialoutCountryId)) {
            _this5._deps.evCall.setFormGroup({
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
            return _this5._searchMethod("".concat(value.countryName, "(").concat(value.countryId, ")"), text);
          }
        }
      }] : []), [{
        dataSign: 'ringTime',
        value: this._deps.evCall.formGroup.dialoutRingTime,
        onChange: function onChange(dialoutRingTime) {
          _this5._deps.evCall.setFormGroup({
            dialoutRingTime: dialoutRingTime
          });
        },
        onBlur: function onBlur() {
          _this5._deps.evCall.checkDialoutRingTime();
        },
        input: _objectSpread({
          type: 'number',
          label: _i18n["default"].getString('ringTime', this._deps.locale.currentLocale),
          required: true,
          placeholder: _i18n["default"].getString('ringTime', this._deps.locale.currentLocale)
        }, this._deps.evCall.ringTimeLimit)
      }]);
    }
  }, {
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
      var _this6 = this;
      return {
        init: function init() {
          _this6._deps.evCall.resetForm();
        },
        goBack: function goBack() {
          return _this6._navigateToDialer();
        },
        save: function save() {
          _this6._deps.evCall.saveForm();
          _this6._navigateToDialer();
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "callerId", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "callerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "queue", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "queue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "country", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "country"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "settingFields", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "settingFields"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvManualDialSettingsUI.js.map
