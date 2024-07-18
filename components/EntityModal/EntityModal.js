"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _i18n = _interopRequireDefault(require("./i18n"));
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } /* eslint-disable jsx-a11y/label-has-associated-control */
var EntityModal = /*#__PURE__*/function (_Component) {
  _inherits(EntityModal, _Component);
  var _super = _createSuper(EntityModal);
  function EntityModal(props) {
    var _this;
    _classCallCheck(this, EntityModal);
    _this = _super.call(this, props);
    _this.onCancel = void 0;
    _this.onCreate = void 0;
    _this.onRadioChange = void 0;
    _this.state = {
      selected: props.entities[0]
    };
    _this.onCancel = function () {
      if (typeof _this.props.onCancel === 'function') {
        _this.props.onCancel();
      }
    };
    _this.onCreate = function () {
      if (typeof _this.props.onCreate === 'function') {
        _this.props.onCreate(_this.state.selected);
      }
    };
    _this.onRadioChange = function (e) {
      _this.setState({
        selected: e.target.value
      });
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(EntityModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        entities = _this$props.entities,
        show = _this$props.show,
        currentLocale = _this$props.currentLocale;
      return /*#__PURE__*/_react["default"].createElement(_Modal["default"]
      // @ts-expect-error TS(2322): Type '{ children: Element[]; show: boolean | undef... Remove this comment to see the full error message
      , {
        show: show,
        title: _i18n["default"].getString('chooseEntity', currentLocale),
        onConfirm: this.onCreate,
        onCancel: this.onCancel,
        textConfirm: _i18n["default"].getString('create', currentLocale),
        currentLocale: currentLocale,
        clickOutToClose: true,
        dataSign: "createEntityModal"
      }, entities.map(function (entityType, idx) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].radio,
          key: idx
        }, /*#__PURE__*/_react["default"].createElement("label", {
          "data-sign": "entityOption-".concat(entityType)
        }, /*#__PURE__*/_react["default"].createElement("input", {
          type: "radio",
          value: entityType,
          checked: entityType === _this2.state.selected,
          onChange: _this2.onRadioChange
        }), _i18n["default"].getString(entityType, currentLocale)));
      }));
    }
  }]);
  return EntityModal;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
EntityModal.defaultProps = {
  show: false,
  entities: ['account', 'lead', 'contact']
};
var _default = EntityModal;
exports["default"] = _default;
//# sourceMappingURL=EntityModal.js.map
