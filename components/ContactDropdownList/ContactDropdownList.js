"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDropdownList = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactItem = require("./ContactItem");
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
var ContactDropdownList = /*#__PURE__*/function (_Component) {
  _inherits(ContactDropdownList, _Component);
  var _super = _createSuper(ContactDropdownList);
  function ContactDropdownList() {
    var _this;
    _classCallCheck(this, ContactDropdownList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.node = void 0;
    return _this;
  }
  _createClass(ContactDropdownList, [{
    key: "UNSAFE_componentWillReceiveProps",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    // eslint-disable-next-line react/no-deprecated
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!nextProps.visibility || nextProps.items.length === 0) {
        return;
      }
      if (nextProps.scrollDirection === 'ArrowDown') {
        if (nextProps.selectedIndex < nextProps.items.length) {
          if (nextProps.selectedIndex > 4 && this.node) {
            this.node.scrollTop += 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }
      if (nextProps.scrollDirection === 'ArrowUp') {
        if (nextProps.selectedIndex > -1) {
          if (nextProps.selectedIndex < nextProps.items.length - 4 && this.node) {
            this.node.scrollTop -= 53;
            this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
          }
        }
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        className = _this$props.className,
        listRef = _this$props.listRef,
        items = _this$props.items,
        selectedIndex = _this$props.selectedIndex,
        formatContactPhone = _this$props.formatContactPhone,
        setSelectedIndex = _this$props.setSelectedIndex,
        addToRecipients = _this$props.addToRecipients,
        titleEnabled = _this$props.titleEnabled,
        visibility = _this$props.visibility,
        phoneTypeRenderer = _this$props.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
        contactInfoRenderer = _this$props.contactInfoRenderer,
        contactPhoneRenderer = _this$props.contactPhoneRenderer;
      if (!visibility || items.length === 0) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _clsx["default"])(_styles["default"].dropdownList, className),
        ref: function ref(c) {
          _this2.node = c;
          if (typeof listRef === 'function') {
            listRef(c);
          }
        },
        "data-sign": "contactDropdownList"
      }, items.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(_ContactItem.ContactItem, {
          currentLocale: currentLocale,
          active: selectedIndex === index,
          name: item.name,
          entityType: item.entityType,
          phoneType: item.phoneType,
          phoneNumber: item.phoneNumber,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          formatContactPhone: formatContactPhone,
          onHover: function onHover() {
            return setSelectedIndex(index);
          },
          onClick: function onClick() {
            return addToRecipients(item);
          },
          key: "".concat(index).concat(item.phoneNumber).concat(item.name).concat(item.phoneType),
          titleEnabled: titleEnabled,
          contactInfoRenderer: contactInfoRenderer,
          contactPhoneRenderer: contactPhoneRenderer
          // @ts-expect-error TS(2339): Property 'doNotCall' does not exist on type '{ nam... Remove this comment to see the full error message
          ,
          doNotCall: item.doNotCall
        });
      }));
    }
  }]);
  return ContactDropdownList;
}(_react.Component);
exports.ContactDropdownList = ContactDropdownList;
//# sourceMappingURL=ContactDropdownList.js.map
