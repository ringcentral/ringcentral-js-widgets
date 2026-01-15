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
exports["default"] = void 0;
exports.formatCountryDisplay = formatCountryDisplay;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _countryNames = _interopRequireDefault(require("../../lib/countryNames"));
var _PageHeader = require("../BackHeader/PageHeader");
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _InputField = _interopRequireDefault(require("../InputField"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _SaveButton = _interopRequireDefault(require("../SaveButton"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
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
function formatCountryDisplay(callingCode, countryName) {
  if (callingCode.includes('+')) {
    return "(".concat(callingCode, ") ").concat(countryName);
  }
  return "(+".concat(callingCode, ") ").concat(countryName);
}
var RegionSettings = /*#__PURE__*/function (_Component) {
  function RegionSettings(props) {
    var _this;
    _classCallCheck(this, RegionSettings);
    _this = _callSuper(this, RegionSettings, [props]);
    _this.onAreaCodeChange = function (e) {
      var value = e.currentTarget.value;
      _this.setState({
        areaCodeValue: _this.areaCodeInputFilter(value)
      });
    };
    _this.onCountryCodeChange = function (option) {
      var value = option.isoCode;
      if (value !== _this.state.countryCodeValue) {
        _this.setState({
          countryCodeValue: value,
          areaCodeValue: ''
        });
      }
    };
    _this.onResetClick = function () {
      _this.setState({
        areaCodeValue: _this.props.areaCode,
        countryCodeValue: _this.props.countryCode
      });
    };
    _this.onSaveClick = function () {
      if (typeof _this.props.onSave === 'function') {
        _this.props.onSave({
          areaCode: _this.canAreaCodeShow() ? _this.state.areaCodeValue : undefined,
          countryCode: _this.state.countryCodeValue
        });
      }
    };
    _this.onBackClick = function () {
      if (typeof _this.props.onBackButtonClick === 'function') {
        _this.props.onBackButtonClick();
      }
    };
    _this.canAreaCodeShow = function () {
      if (typeof _this.props.canAreaCodeShow === 'function') {
        return _this.props.canAreaCodeShow(_this.state.countryCodeValue);
      }
    };
    _this.areaCodeInputFilter = function (value) {
      return value.replace(/[^\d]/g, '');
    };
    _this.renderHandler = function (option) {
      return formatCountryDisplay(option.callingCode, _countryNames["default"].getString(option.isoCode, _this.props.currentLocale));
    };
    _this.renderValue = function (value) {
      var selectedOption = _this.props.availableCountries.find(function (country) {
        return country.isoCode === value;
      });
      if (!selectedOption) {
        return '';
      }
      return formatCountryDisplay(selectedOption.callingCode, _countryNames["default"].getString(
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      selectedOption.isoCode, _this.props.currentLocale));
    };
    _this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(RegionSettings, _Component);
  return _createClass(RegionSettings, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.areaCode !== this.props.areaCode) {
        this.setState({
          areaCodeValue: nextProps.areaCode
        });
      }
      if (nextProps.countryCode !== this.props.countryCode) {
        this.setState({
          countryCodeValue: nextProps.countryCode
        });
      }
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var hasChanges = this.state.areaCodeValue !== this.props.areaCode || this.state.countryCodeValue !== this.props.countryCode;

      // An improvement is created to adjust this message
      // RCINT-38284
      var hasNA = !!this.props.availableCountries.find(function (c) {
        return c.isoCode === 'US';
      }) || !!this.props.availableCountries.find(function (c) {
        return c.isoCode === 'CA';
      });
      var messageId;
      if (this.props.availableCountries.length > 1) {
        if (hasNA) {
          messageId = 'MultiWithNAMessage';
        } else {
          messageId = 'MultiWithoutNAMessage';
        }
      } else if (hasNA) {
        messageId = 'NAOnlyMessage';
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, this.props.className)
      }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
        onClick: this.onBackClick
      }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, (0, _i18n.t)('title')), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "countryCodeHint",
        className: _styles["default"].hint
      }, (0, _i18n.t)(messageId)), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: (0, _i18n.t)('country')
      }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        value: this.state.countryCodeValue,
        onChange: this.onCountryCodeChange,
        options: this.props.availableCountries,
        dropdownAlign: "left",
        valueFunction: function valueFunction(option) {
          return option.isoCode;
        },
        renderFunction: this.renderHandler,
        renderValue: this.renderValue,
        titleEnabled: true
      })), this.canAreaCodeShow() && /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: (0, _i18n.t)('areaCode')
      }, /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        placeholder: (0, _i18n.t)('areaCodePlaceholder'),
        filter: this.areaCodeInputFilter,
        value: this.state.areaCodeValue,
        onChange: this.onAreaCodeChange,
        dataSign: "areaCodeInputField"
      })), /*#__PURE__*/_react["default"].createElement(_SaveButton["default"], {
        currentLocale: this.props.currentLocale,
        onClick: this.onSaveClick,
        disabled: !hasChanges
      }), this.props.children));
    }
  }]);
}(_react.Component);
var _default = exports["default"] = RegionSettings;
//# sourceMappingURL=index.js.map
