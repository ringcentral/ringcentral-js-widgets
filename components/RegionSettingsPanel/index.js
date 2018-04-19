'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _InputField = require('../InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _SaveButton = require('../SaveButton');

var _SaveButton2 = _interopRequireDefault(_SaveButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _countryNames = require('../../lib/countryNames');

var _countryNames2 = _interopRequireDefault(_countryNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegionSettings = function (_Component) {
  (0, _inherits3.default)(RegionSettings, _Component);

  function RegionSettings(props) {
    (0, _classCallCheck3.default)(this, RegionSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RegionSettings.__proto__ || (0, _getPrototypeOf2.default)(RegionSettings)).call(this, props));

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
        var showAreaCode = ['CA', 'US'].includes(_this.state.countryCodeValue);
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
      return '(+' + option.callingCode + ') ' + _countryNames2.default.getString(option.isoCode, _this.props.currentLocale);
    };

    _this.renderValue = function (value) {
      var selectedOption = _this.props.availableCountries.find(function (country) {
        return country.isoCode === value;
      });
      if (!selectedOption) {
        return '';
      }
      return '(+' + selectedOption.callingCode + ') ' + _countryNames2.default.getString(selectedOption.isoCode, _this.props.currentLocale);
    };

    _this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode
    };
    return _this;
  }

  (0, _createClass3.default)(RegionSettings, [{
    key: 'componentWillReceiveProps',
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
    key: 'render',
    value: function render() {
      var hasChanges = this.state.areaCodeValue !== this.props.areaCode || this.state.countryCodeValue !== this.props.countryCode;
      var hasNA = !!this.props.availableCountries.find(function (c) {
        return c.isoCode === 'US';
      }) || !!this.props.availableCountries.find(function (c) {
        return c.isoCode === 'CA';
      });
      var messageId = void 0;
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

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            buttons: [],
            onBackClick: this.onBackClick
          },
          _i18n2.default.getString('title', this.props.currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.hint },
            _i18n2.default.getString(messageId, this.props.currentLocale)
          ),
          _react2.default.createElement(
            _InputField2.default,
            {
              label: _i18n2.default.getString('country', this.props.currentLocale) },
            _react2.default.createElement(_DropdownSelect2.default, {
              className: _styles2.default.select,
              value: this.state.countryCodeValue,
              onChange: this.onCountryCodeChange,
              options: this.props.availableCountries,
              dropdownAlign: 'left',
              valueFunction: function valueFunction(option) {
                return option.isoCode;
              },
              renderFunction: this.renderHandler,
              renderValue: this.renderValue,
              titleEnabled: true
            })
          ),
          showAreaCode && _react2.default.createElement(
            _InputField2.default,
            {
              label: _i18n2.default.getString('areaCode', this.props.currentLocale) },
            _react2.default.createElement(_TextInput2.default, {
              placeholder: _i18n2.default.getString('areaCodePlaceholder', this.props.currentLocale),
              maxLength: 3,
              filter: this.areaCodeInputFilter,
              value: this.state.areaCodeValue,
              onChange: this.onAreaCodeChange })
          ),
          _react2.default.createElement(_SaveButton2.default, {
            currentLocale: this.props.currentLocale,
            onClick: this.onSaveClick,
            disabled: !hasChanges
          }),
          this.props.children
        )
      );
    }
  }]);
  return RegionSettings;
}(_react.Component);

exports.default = RegionSettings;


RegionSettings.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onBackButtonClick: _propTypes2.default.func,
  currentLocale: _propTypes2.default.string.isRequired,
  availableCountries: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    isoCode: _propTypes2.default.string,
    callingCode: _propTypes2.default.string
  })).isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  onSave: _propTypes2.default.func
};

RegionSettings.defaultProps = {
  className: undefined,
  children: undefined,
  onBackButtonClick: undefined,
  onSave: undefined
};
//# sourceMappingURL=index.js.map
