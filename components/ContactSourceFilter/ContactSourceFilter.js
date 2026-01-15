"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSourceFilter = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactFilter = _interopRequireDefault(require("../../assets/images/ContactFilter.svg"));
var _ContactFilterSolid = _interopRequireDefault(require("../../assets/images/ContactFilterSolid.svg"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  font-size: 13px;\n"])), (0, _juno.spacing)(2));
var ContactSourceFilter = exports.ContactSourceFilter = /*#__PURE__*/function (_Component) {
  function ContactSourceFilter(props) {
    var _this;
    _classCallCheck(this, ContactSourceFilter);
    _this = _callSuper(this, ContactSourceFilter, [props]);
    _this._mounted = false;
    _this.hideList = function () {
      if (_this._mounted) {
        _this.setState({
          unfold: false
        });
        if (typeof _this.props.onUnfoldChange === 'function') {
          _this.props.onUnfoldChange(false);
        }
      }
      window.removeEventListener('click', _this.hideList);
    };
    _this.showList = function () {
      _this.setState({
        unfold: true
      });
      window.addEventListener('click', _this.hideList);
      if (typeof _this.props.onUnfoldChange === 'function') {
        _this.props.onUnfoldChange(true);
      }
    };
    _this.togglePanel = function (evt) {
      evt.stopPropagation();
      if (!_this.state.unfold) {
        _this.showList();
        return;
      }
      _this.hideList();
    };
    _this.emitSelect = function (sourceName) {
      var onSourceSelect = _this.props.onSourceSelect;
      if (onSourceSelect) {
        onSourceSelect(sourceName);
      }
      _this.hideList();
    };
    var unfold = props.unfold !== undefined ? props.unfold : false;
    _this.state = {
      unfold: unfold
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(ContactSourceFilter, _Component);
  return _createClass(ContactSourceFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (!this.state.unfold) {
        window.removeEventListener('click', this.hideList);
      }
    }
  }, {
    key: "getString",
    value: function getString(key, locale) {
      return _i18n["default"].getString(key, locale);
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        currentLocale = _this$props.currentLocale,
        contactSourceNames = _this$props.contactSourceNames,
        selectedSourceName = _this$props.selectedSourceName;
      var isAllSource = selectedSourceName === contactSourceNames[0];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].contactSourceFilter, className),
        "data-sign": "contactSourceFilterButton",
        onClick: this.togglePanel
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "filterIconContainer",
        className: _styles["default"].filterIconContainer
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        ,
        title: this.getString(selectedSourceName, currentLocale)
      }, isAllSource ? /*#__PURE__*/_react["default"].createElement(_ContactFilter["default"], {
        className: (0, _clsx["default"])(_styles["default"].filterIconNode, _styles["default"].iconNoneFill)
      }) : /*#__PURE__*/_react["default"].createElement(_ContactFilterSolid["default"], {
        className: _styles["default"].filterIconNode
      })), !this.state.unfold ? null : /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
        className: _styles["default"].contactSourceList,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        "data-sign": "contactSourceList"
      }, contactSourceNames.map(function (sourceName) {
        return /*#__PURE__*/_react["default"].createElement(StyledListItem, {
          "data-sign": "contactSourceItem",
          component: "div",
          onClick: function onClick() {
            return _this2.emitSelect(sourceName);
          },
          size: "small",
          key: sourceName,
          selected: sourceName === selectedSourceName,
          disableGutters: true
        }, _this2.getString(sourceName, currentLocale));
      })));
    }
  }]);
}(_react.Component);
//# sourceMappingURL=ContactSourceFilter.js.map
