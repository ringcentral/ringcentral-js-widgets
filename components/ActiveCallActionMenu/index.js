"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Button = require("../Button");
var _EntityButton = _interopRequireDefault(require("../EntityButton"));
var _LogButton = _interopRequireDefault(require("../LogButton"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ActiveCallActionMenu = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallActionMenu, _Component);
  var _super = _createSuper(ActiveCallActionMenu);
  function ActiveCallActionMenu(props) {
    var _this;
    _classCallCheck(this, ActiveCallActionMenu);
    _this = _super.call(this, props);
    _this.captureClick = void 0;
    _this.captureClick = function (e) {
      // e.captureClick = this.props.captureClick;
      if (_this.props.stopPropagation) {
        e.stopPropagation();
      }
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ActiveCallActionMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        className = _this$props.className,
        onClickToSms = _this$props.onClickToSms,
        disableLinks = _this$props.disableLinks,
        phoneNumber = _this$props.phoneNumber,
        textTitle = _this$props.textTitle,
        onLog = _this$props.onLog,
        isLogged = _this$props.isLogged,
        isLogging = _this$props.isLogging,
        currentLocale = _this$props.currentLocale,
        addLogTitle = _this$props.addLogTitle,
        editLogTitle = _this$props.editLogTitle,
        hasEntity = _this$props.hasEntity,
        onViewEntity = _this$props.onViewEntity,
        onCreateEntity = _this$props.onCreateEntity,
        createEntityTitle = _this$props.createEntityTitle,
        viewEntityTitle = _this$props.viewEntityTitle;
      var smsButton = onClickToSms ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: (0, _clsx["default"])(_styles["default"].actionButton, _styles["default"].sms),
        onClick: onClickToSms,
        disabled: disableLinks || !phoneNumber
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _DynamicsFont["default"].composeText,
        title: textTitle
      })) : null;
      var logButton = onLog ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: (0, _clsx["default"])(_styles["default"].actionButton, _styles["default"].log),
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging
        // @ts-expect-error TS(2322): Type '{ className: string; onLog: (...args: any[])... Remove this comment to see the full error message
        ,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var entityButton;
      if (hasEntity && onViewEntity) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: (0, _clsx["default"])(_styles["default"].actionButton, _styles["default"].entity),
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
          className: (0, _clsx["default"])(_styles["default"].actionButton, _styles["default"].addContact),
          onClick: onCreateEntity,
          disabled: disableLinks || !phoneNumber
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: _DynamicsFont["default"].add2,
          title: createEntityTitle
        }));
      } else {
        entityButton = null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        onClick: this.captureClick
      }, smsButton, entityButton, logButton);
    }
  }]);
  return ActiveCallActionMenu;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActiveCallActionMenu.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  textTitle: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  stopPropagation: false,
  onCreateEntity: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  onViewEntity: undefined,
  hasEntity: false
};
var _default = ActiveCallActionMenu;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
