"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
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
exports.ListSelectionView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _class, _descriptor, _descriptor2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * common list selection, let you can easy select multiple items once easily.
 */
var ListSelectionView = exports.ListSelectionView = (_dec = Reflect.metadata("design:type", Function), _dec2 = Reflect.metadata("design:paramtypes", [Boolean]), _dec3 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = (0, _nextCore.computed)(function (that) {
  return [that.selectedIdsMap];
}), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _class = /*#__PURE__*/function (_RcViewModule) {
  function ListSelectionView() {
    var _this;
    _classCallCheck(this, ListSelectionView);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ListSelectionView, [].concat(args));
    _initializerDefineProperty(_this, "selectedMode", _descriptor, _this);
    _initializerDefineProperty(_this, "selectedIdsMap", _descriptor2, _this);
    return _this;
  }
  _inherits(ListSelectionView, _RcViewModule);
  return _createClass(ListSelectionView, [{
    key: "getSelectedKey",
    value:
    /**
     * getter of that map key
     * @default (item) => item.id
     */
    function getSelectedKey(curr) {
      return curr['id'];
    }
  }, {
    key: "setSelectedMode",
    value: function setSelectedMode(val) {
      this.selectedMode = val;
    }
  }, {
    key: "_setSelectedMessageIdsMap",
    value: function _setSelectedMessageIdsMap(map) {
      this.selectedIdsMap = map;
    }
  }, {
    key: "toggleSelectedMessageIds",
    value: function toggleSelectedMessageIds(id, state) {
      this.selectedIdsMap[id] = state;
    }
  }, {
    key: "clearAllSelectedIdsMap",
    value: function clearAllSelectedIdsMap() {
      this.selectedIdsMap = {};
    }
  }, {
    key: "checkedIds",
    get: function get() {
      return Object.entries(this.selectedIdsMap).reduce(function (acc, curr) {
        var _curr = _slicedToArray(curr, 2),
          key = _curr[0],
          value = _curr[1];
        if (value) {
          acc.push(key);
        }
        return acc;
      }, []);
    }

    /**
     * @returns is that have set any state
     */
  }, {
    key: "leaveSelectedMode",
    value: function leaveSelectedMode() {
      if (this.selectedMode) {
        this.setSelectedMode(false);
      }
      if (Object.keys(this.selectedIdsMap).length > 0) {
        this.clearAllSelectedIdsMap();
      }
    }

    /**
     * multiple select behaviors can view here https://react-spectrum.adobe.com/react-aria/useTable.html#multiple-selection
     */
  }, {
    key: "selectAll",
    value: function selectAll(items, indeterminate) {
      if (indeterminate) {
        this._addAllSelectedIdsMap(items);
      } else {
        if (this.checkedIds.length === 0) {
          this._addAllSelectedIdsMap(items);
        } else {
          this.clearAllSelectedIdsMap();
        }
      }
    }
  }, {
    key: "_addAllSelectedIdsMap",
    value: function _addAllSelectedIdsMap(items) {
      var _this2 = this;
      var selectAllMap = items.reduce(function (acc, curr) {
        acc[_this2.getSelectedKey(curr)] = true;
        return acc;
      }, {});
      this._setSelectedMessageIdsMap(selectAllMap);
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class.prototype, "selectedMode", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "setSelectedMode", [_nextCore.action, _dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "setSelectedMode"), _class.prototype), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedIdsMap", [_nextCore.state, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class.prototype, "_setSelectedMessageIdsMap", [_nextCore.action, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "_setSelectedMessageIdsMap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleSelectedMessageIds", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class.prototype, "toggleSelectedMessageIds"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearAllSelectedIdsMap", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class.prototype, "clearAllSelectedIdsMap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "checkedIds", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class.prototype, "checkedIds"), _class.prototype), _class);
//# sourceMappingURL=ListSelection.view.js.map
