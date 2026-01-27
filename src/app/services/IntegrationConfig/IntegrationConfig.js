"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationConfig = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.string.includes.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _class;
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
var DEFAULT_VIEWABLE_ENTITY_TYPES = ['company', 'personal'];
var IntegrationConfig = exports.IntegrationConfig = (_dec = (0, _nextCore.injectable)({
  name: 'IntegrationConfig'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('IntegrationConfigOptions')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof IntegrationConfigOptions === "undefined" ? Object : IntegrationConfigOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcModule) {
  function IntegrationConfig(_integrationConfigOptions) {
    var _this;
    _classCallCheck(this, IntegrationConfig);
    _this = _callSuper(this, IntegrationConfig);
    _this._integrationConfigOptions = _integrationConfigOptions;
    return _this;
  }

  /**
   * Get the name of the third party app
   */
  _inherits(IntegrationConfig, _RcModule);
  return _createClass(IntegrationConfig, [{
    key: "name",
    get: function get() {
      var _this$_integrationCon;
      var name = (_this$_integrationCon = this._integrationConfigOptions) === null || _this$_integrationCon === void 0 ? void 0 : _this$_integrationCon.name;
      return name;
    }

    /**
     * Get the search source key
     */
  }, {
    key: "key",
    get: function get() {
      var _this$_integrationCon2;
      var key = (_this$_integrationCon2 = this._integrationConfigOptions) === null || _this$_integrationCon2 === void 0 ? void 0 : _this$_integrationCon2.key;
      if (process.env.NODE_ENV !== 'production' && !key) {
        throw new Error('key is not allowed to be undefined in development mode');
      }
      return key;
    }

    /**
     * Get the viewable entity types with default fallback
     */
  }, {
    key: "viewableEntityTypes",
    get: function get() {
      var _this$_integrationCon3, _this$_integrationCon4;
      return (_this$_integrationCon3 = (_this$_integrationCon4 = this._integrationConfigOptions) === null || _this$_integrationCon4 === void 0 ? void 0 : _this$_integrationCon4.viewableEntityTypes) !== null && _this$_integrationCon3 !== void 0 ? _this$_integrationCon3 : DEFAULT_VIEWABLE_ENTITY_TYPES;
    }
  }, {
    key: "supportViewEntity",
    get: function get() {
      var _this$_integrationCon5;
      return Boolean((_this$_integrationCon5 = this._integrationConfigOptions) === null || _this$_integrationCon5 === void 0 ? void 0 : _this$_integrationCon5.onViewEntity);
    }
  }, {
    key: "supportCreateEntity",
    get: function get() {
      var _this$_integrationCon6;
      return Boolean((_this$_integrationCon6 = this._integrationConfigOptions) === null || _this$_integrationCon6 === void 0 ? void 0 : _this$_integrationCon6.onCreateEntity);
    }

    /**
     * the tooltip of the create new entity button use in many places that support create new entity
     */
  }, {
    key: "createNewEntityTooltip",
    get: function get() {
      var _this$_integrationCon7;
      return ((_this$_integrationCon7 = this._integrationConfigOptions) === null || _this$_integrationCon7 === void 0 ? void 0 : _this$_integrationCon7.createNewEntityTooltip) || (0, _i18n.t)('createNew');
    }

    /**
     * Get the onViewLog callback
     */
  }, {
    key: "onViewLog",
    get: function get() {
      var _this$_integrationCon8;
      return (_this$_integrationCon8 = this._integrationConfigOptions) === null || _this$_integrationCon8 === void 0 ? void 0 : _this$_integrationCon8.onViewLog;
    }

    /**
     * Get the onCreateEntity callback
     */
  }, {
    key: "onCreateEntity",
    get: function get() {
      var _this$_integrationCon9;
      return (_this$_integrationCon9 = this._integrationConfigOptions) === null || _this$_integrationCon9 === void 0 ? void 0 : _this$_integrationCon9.onCreateEntity;
    }

    /**
     * Get the onViewEntity callback
     */
  }, {
    key: "onViewEntity",
    get: function get() {
      var _this$_integrationCon0;
      return (_this$_integrationCon0 = this._integrationConfigOptions) === null || _this$_integrationCon0 === void 0 ? void 0 : _this$_integrationCon0.onViewEntity;
    }

    /**
     * Get the viewExternalEntity callback
     */
  }, {
    key: "viewExternalEntity",
    get: function get() {
      var _this$_integrationCon1;
      return (_this$_integrationCon1 = this._integrationConfigOptions) === null || _this$_integrationCon1 === void 0 ? void 0 : _this$_integrationCon1.viewExternalEntity;
    }

    /**
     * Get the onCreateLog callback
     */
  }, {
    key: "onCreateLog",
    get: function get() {
      var _this$_integrationCon10;
      return (_this$_integrationCon10 = this._integrationConfigOptions) === null || _this$_integrationCon10 === void 0 ? void 0 : _this$_integrationCon10.onCreateLog;
    }
  }, {
    key: "getActionButtons",
    value: function getActionButtons(_ref) {
      var dialToPhoneNumber = _ref.dialToPhoneNumber,
        matchedContact = _ref.matchedContact,
        disabled = _ref.disabled,
        isLogged = _ref.isLogged;
      var actions = [];
      if (dialToPhoneNumber) {
        if ((matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.type) && this.viewableEntityTypes.includes(matchedContact.type)) {
          if (this.supportViewEntity && !isLogged) {
            actions.push({
              type: 'viewEntity',
              disabled: disabled
            });
          }
        } else {
          if (this.supportCreateEntity) {
            actions.push({
              type: 'addEntity',
              disabled: disabled
            });
          }
        }
      }
      return actions;
    }
  }]);
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=IntegrationConfig.js.map
