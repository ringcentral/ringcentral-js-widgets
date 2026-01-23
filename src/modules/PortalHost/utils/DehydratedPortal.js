"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DehydratedPortal = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dehydrated function to string with key value `Map<string, HandlerFunction>`
 * provide you a way to trigger event through different runtime instance, like multiple tabs.
 *
 * @example
 * // execute below in different runtime.
 * ```ts
 * type CustomData = {
 *   text: string;
 * }
 * type CustomDehydratedPortalOptions = DehydratedPortalOptions<{
 *   example: string;
 *   onClick: () => void;
 *   value?: string;
 * }, CustomData>
 *
 * const modalInstance = new DehydratedPortal<CustomDehydratedPortalOptions, CustomData>(
 *   {
 *     id: 'uniqueId'
 *     props: ({ text }) => ({
 *       example: `example ${text}`,
 *       onClick: () => {
 *         console.log('🧙 click');
 *       }
 *     })
 *   },
 *   {
 *     value: 'example'
 *   },
 * );
 *
 * modalInstance.open({
 * })
 * console.log(modalInstance.props);
 * // {
 * //    example: 'example',
 * //    onClick: 'onClick',
 * //    value: 'example', // default value will be add into props state
 * // }
 *
 * const modalSet = new Map<string, DehydratedPortal>();
 *
 * modalSet.set(id, modalInstance);
 * ```
 * // Then in another runtime can run the same unique id with event key name
 * ```ts
 * modalSet.get('uniqueId').handlerRegister['onClick'] // log => '🧙 click'
 * ```
 */
var DehydratedPortal = exports.DehydratedPortal = /*#__PURE__*/function () {
  function DehydratedPortal(options) {
    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, DehydratedPortal);
    this.options = options;
    this.defaultProps = defaultProps;
    /**
     * that unique type in whole dehydrated portal system, like `AppView.confirm`
     */
    this.type = void 0;
    /**
     * for type getter only,
     */
    this.payload = void 0;
    this._handlerRegister = new Map();
  }

  /**
   * @private should not use that directly
   */
  return _createClass(DehydratedPortal, [{
    key: "handlerRegister",
    get:
    /**
     * register method Map
     */
    function get() {
      return this._handlerRegister;
    }
  }, {
    key: "getDehydrateState",
    value: function getDehydrateState(id, payload) {
      var props = this.getProps(payload);
      var dehydratedState = this._dehydrateFunctions(_objectSpread(_objectSpread({}, props), {}, {
        id: id
      }));
      return dehydratedState;
    }

    /**
     * @private should not use that directly
     */
  }, {
    key: "getProps",
    value: function getProps(payload) {
      var _this$options$props, _this$options;
      var originalProps = ((_this$options$props = (_this$options = this.options).props) === null || _this$options$props === void 0 ? void 0 : _this$options$props.call(_this$options, payload)) || {};

      // apply default props
      var processedProps = Object.entries(this.defaultProps).reduce(function (acc, _ref) {
        var _key;
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        acc[key] = (_key = originalProps[key]) !== null && _key !== void 0 ? _key : value;
        return acc;
      }, {});
      return _objectSpread(_objectSpread({}, originalProps), processedProps);
    }

    /**
     * @private should not use that directly
     */
  }, {
    key: "getPureProps",
    value: function getPureProps(payload) {
      var currentModalProps = this.getProps(payload);
      return Object.entries(currentModalProps).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        if (typeof value !== 'function') {
          acc[key] = value;
        }
        return acc;
      }, {});
    }

    /**
     * @private should not use that directly
     */
  }, {
    key: "_dehydrateFunctions",
    value: function _dehydrateFunctions(props) {
      var result = _objectSpread({}, props);
      for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key) && typeof props[key] === 'function') {
          this.handlerRegister.set(key, props[key]);
          result[key] = key;
        }
      }
      return result;
    }
  }]);
}();
//# sourceMappingURL=DehydratedPortal.js.map
