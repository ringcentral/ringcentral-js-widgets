"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _react = _interopRequireWildcard(require("react"));
var _ActionMenuList = _interopRequireDefault(require("../ActionMenuList"));
var _SlideMenu = _interopRequireDefault(require("../SlideMenu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var ActionMenu = /*#__PURE__*/function (_Component) {
  function ActionMenu() {
    _classCallCheck(this, ActionMenu);
    return _callSuper(this, ActionMenu, arguments);
  }
  _inherits(ActionMenu, _Component);
  return _createClass(ActionMenu, [{
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this$props = this.props,
        reference = _this$props.reference,
        className = _this$props.className,
        currentLocale = _this$props.currentLocale,
        onLog = _this$props.onLog,
        isLogged = _this$props.isLogged,
        isLogging = _this$props.isLogging,
        isCreating = _this$props.isCreating,
        onViewEntity = _this$props.onViewEntity,
        onCreateEntity = _this$props.onCreateEntity,
        createEntityTypes = _this$props.createEntityTypes,
        hasEntity = _this$props.hasEntity,
        onClickToDial = _this$props.onClickToDial,
        onClickToSms = _this$props.onClickToSms,
        phoneNumber = _this$props.phoneNumber,
        disableLinks = _this$props.disableLinks,
        disableCallButton = _this$props.disableCallButton,
        disableClickToDial = _this$props.disableClickToDial,
        addLogTitle = _this$props.addLogTitle,
        editLogTitle = _this$props.editLogTitle,
        callTitle = _this$props.callTitle,
        textTitle = _this$props.textTitle,
        createEntityTitle = _this$props.createEntityTitle,
        viewEntityTitle = _this$props.viewEntityTitle,
        onDelete = _this$props.onDelete,
        deleteTitle = _this$props.deleteTitle,
        onMark = _this$props.onMark,
        onUnmark = _this$props.onUnmark,
        marked = _this$props.marked,
        markTitle = _this$props.markTitle,
        externalViewEntity = _this$props.externalViewEntity,
        externalHasEntity = _this$props.externalHasEntity,
        disableClickToSms = _this$props.disableClickToSms,
        withAnimation = _this$props.withAnimation,
        selectedMatchContactType = _this$props.selectedMatchContactType,
        showChooseEntityModal = _this$props.showChooseEntityModal,
        shouldHideEntityButton = _this$props.shouldHideEntityButton,
        extended = _this$props.extended,
        onToggle = _this$props.onToggle,
        extendIconClassName = _this$props.extendIconClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: reference
      }, /*#__PURE__*/_react["default"].createElement(_SlideMenu["default"]
      // @ts-expect-error TS(2322): Type '{ children: Element; extended: boolean | und... Remove this comment to see the full error message
      , {
        extended: extended,
        onToggle: onToggle,
        className: className,
        extendIconClassName: extendIconClassName,
        minHeight: 0,
        maxHeight: 53,
        withAnimation: withAnimation
      }, /*#__PURE__*/_react["default"].createElement(_ActionMenuList["default"]
      // @ts-expect-error TS(2322): Type '{ onLog: ((...args: any[]) => any) | undefin... Remove this comment to see the full error message
      , {
        onLog: onLog,
        isLogged: isLogged,
        isLogging: isLogging,
        isCreating: isCreating,
        selectedMatchContactType: selectedMatchContactType,
        onViewEntity: onViewEntity,
        onCreateEntity: onCreateEntity,
        createEntityTypes: createEntityTypes,
        hasEntity: hasEntity,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        shouldHideEntityButton: shouldHideEntityButton,
        disableClickToDial: disableClickToDial,
        addLogTitle: addLogTitle,
        editLogTitle: editLogTitle,
        textTitle: textTitle,
        callTitle: callTitle,
        createEntityTitle: createEntityTitle,
        viewEntityTitle: viewEntityTitle,
        currentLocale: currentLocale,
        onDelete: onDelete,
        deleteTitle: deleteTitle,
        onMark: onMark,
        onUnmark: onUnmark,
        marked: marked,
        markTitle: markTitle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        disableClickToSms: disableClickToSms,
        showChooseEntityModal: showChooseEntityModal
      })));
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActionMenu.defaultProps = {
  extended: undefined,
  onToggle: undefined,
  reference: undefined,
  className: undefined,
  extendIconClassName: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  isCreating: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  createEntityTypes: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
  withAnimation: true,
  selectedMatchContactType: '',
  showChooseEntityModal: true,
  shouldHideEntityButton: function shouldHideEntityButton() {
    return false;
  }
};
var _default = exports["default"] = ActionMenu;
//# sourceMappingURL=index.js.map
