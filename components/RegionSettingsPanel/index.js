"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _countryNames = _interopRequireDefault(require("../../lib/countryNames"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _InputField = _interopRequireDefault(require("../InputField"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _SaveButton = _interopRequireDefault(require("../SaveButton"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var RegionSettings = /*#__PURE__*/function (_Component) {
  _inherits(RegionSettings, _Component);
  var _super = _createSuper(RegionSettings);
  function RegionSettings(props) {
    var _this;
    _classCallCheck(this, RegionSettings);
    _this = _super.call(this, props);
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
      return "(+".concat(option.callingCode, ") ").concat(_countryNames["default"].getString(option.isoCode, _this.props.currentLocale));
    };
    _this.renderValue = function (value) {
      var selectedOption = _this.props.availableCountries.find(function (country) {
        return country.isoCode === value;
      });
      if (!selectedOption) {
        return '';
      }
      return "(+".concat(selectedOption.callingCode, ") ").concat(_countryNames["default"].getString(
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
  _createClass(RegionSettings, [{
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
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var hasChanges = this.state.areaCodeValue !== this.props.areaCode || this.state.countryCodeValue !== this.props.countryCode;
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
        className: (0, _classnames["default"])(_styles["default"].root, this.props.className)
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        buttons: [],
        onBackClick: this.onBackClick
      }, _i18n["default"].getString('title', this.props.currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "countryCodeHint",
        className: _styles["default"].hint
      }, _i18n["default"].getString(messageId, this.props.currentLocale)), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('country', this.props.currentLocale)
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
        label: _i18n["default"].getString('areaCode', this.props.currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('areaCodePlaceholder', this.props.currentLocale),
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
  return RegionSettings;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RegionSettings.defaultProps = {
  className: undefined,
  children: undefined,
  onBackButtonClick: undefined,
  canAreaCodeShow: undefined,
  onSave: undefined
};
var _default = RegionSettings;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
