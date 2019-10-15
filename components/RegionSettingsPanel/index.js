"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.replace");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _SaveButton = _interopRequireDefault(require("../SaveButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _countryNames = _interopRequireDefault(require("../../lib/countryNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RegionSettings =
/*#__PURE__*/
function (_Component) {
  _inherits(RegionSettings, _Component);

  function RegionSettings(props) {
    var _this;

    _classCallCheck(this, RegionSettings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegionSettings).call(this, props));

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
          countryCodeValue: value
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
        var showAreaCode = (0, _ramda.contains)(_this.state.countryCodeValue, ['CA', 'US']);

        _this.props.onSave({
          areaCode: showAreaCode ? _this.state.areaCodeValue : undefined,
          countryCode: _this.state.countryCodeValue
        });
      }
    };

    _this.onBackClick = function () {
      if (typeof _this.props.onBackButtonClick === 'function') {
        _this.props.onBackButtonClick();
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

      return "(+".concat(selectedOption.callingCode, ") ").concat(_countryNames["default"].getString(selectedOption.isoCode, _this.props.currentLocale));
    };

    _this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode
    };
    return _this;
  }

  _createClass(RegionSettings, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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

      var showAreaCode = this.state.countryCodeValue === 'US' || this.state.countryCodeValue === 'CA';
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, this.props.className)
      }, _react["default"].createElement(_BackHeader["default"], {
        buttons: [],
        onBackClick: this.onBackClick
      }, _i18n["default"].getString('title', this.props.currentLocale)), _react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, _react["default"].createElement("div", {
        className: _styles["default"].hint
      }, _i18n["default"].getString(messageId, this.props.currentLocale)), _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('country', this.props.currentLocale)
      }, _react["default"].createElement(_DropdownSelect["default"], {
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
      })), showAreaCode && _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('areaCode', this.props.currentLocale)
      }, _react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('areaCodePlaceholder', this.props.currentLocale),
        maxLength: 3,
        filter: this.areaCodeInputFilter,
        value: this.state.areaCodeValue,
        onChange: this.onAreaCodeChange
      })), _react["default"].createElement(_SaveButton["default"], {
        currentLocale: this.props.currentLocale,
        onClick: this.onSaveClick,
        disabled: !hasChanges
      }), this.props.children));
    }
  }]);

  return RegionSettings;
}(_react.Component);

exports["default"] = RegionSettings;
RegionSettings.propTypes = {
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  onBackButtonClick: _propTypes["default"].func,
  currentLocale: _propTypes["default"].string.isRequired,
  availableCountries: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    isoCode: _propTypes["default"].string,
    callingCode: _propTypes["default"].string
  })).isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  onSave: _propTypes["default"].func
};
RegionSettings.defaultProps = {
  className: undefined,
  children: undefined,
  onBackButtonClick: undefined,
  onSave: undefined
};
//# sourceMappingURL=index.js.map
