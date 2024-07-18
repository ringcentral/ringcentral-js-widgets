"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactVirtualized = require("react-virtualized");
var _GlipGroupItem = _interopRequireDefault(require("../GlipGroupItem"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var GlipGroupList = /*#__PURE__*/function (_PureComponent) {
  _inherits(GlipGroupList, _PureComponent);
  var _super = _createSuper(GlipGroupList);
  function GlipGroupList(props) {
    var _this;
    _classCallCheck(this, GlipGroupList);
    _this = _super.call(this, props);
    _this._rowRenderer = function (_ref) {
      var index = _ref.index,
        key = _ref.key,
        style = _ref.style;
      var group = _this.props.groups[index];
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: key,
        style: style
      }, /*#__PURE__*/_react["default"].createElement(_GlipGroupItem["default"], {
        group: group,
        active: group.id === _this.props.currentGroupId,
        onSelectGroup: function onSelectGroup() {
          _this.props.onSelectGroup(group.id);
        },
        className: _styles["default"].item
      }));
    };
    _this._rowHeight = 75;
    _this._list = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(GlipGroupList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.groups !== prevProps.groups || this.props.currentGroupId !== prevProps.currentGroupId) {
        if (this._list && this._list.current) {
          this._list.current.forceUpdateGrid();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        groups = _this$props.groups,
        width = _this$props.width,
        height = _this$props.height,
        className = _this$props.className;
      return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.List, {
        ref: this._list,
        className: className,
        width: width,
        height: height,
        rowCount: groups.length,
        rowHeight: 75,
        rowRenderer: this._rowRenderer
      });
    }
  }]);
  return GlipGroupList;
}(_react.PureComponent);
exports["default"] = GlipGroupList;
GlipGroupList.propTypes = {
  className: _propTypes["default"].string,
  groups: _propTypes["default"].array,
  onSelectGroup: _propTypes["default"].func.isRequired,
  currentGroupId: _propTypes["default"].string,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};
GlipGroupList.defaultProps = {
  className: undefined,
  groups: [],
  currentGroupId: undefined
};
//# sourceMappingURL=index.js.map
