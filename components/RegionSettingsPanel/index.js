'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('font-awesome/css/font-awesome.css');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

var _InputLine = require('../InputLine');

var _InputLine2 = _interopRequireDefault(_InputLine);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

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
      var value = e.currentTarget.value.replace(/[^\d]/g, '');
      if (value !== _this.state.areaCodeValue) {
        _this.setState({
          areaCodeValue: value
        });
      }
    };

    _this.onCountryCodeChange = function (e) {
      var value = e.currentTarget.value;
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
        _this.props.onSave({
          areaCode: _this.state.areaCodeValue,
          countryCode: _this.state.countryCodeValue
        });
      }
    };

    _this.onBackClick = function () {
      if (typeof _this.props.onBackButtonClick === 'function') {
        _this.props.onBackButtonClick();
      }
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
      var _this2 = this;

      var buttons = [];
      var hasChanges = this.state.areaCodeValue !== this.props.areaCode || this.state.countryCodeValue !== this.props.countryCode;
      if (this.props.onBackButtonClick) {
        buttons.push({
          label: _react2.default.createElement('i', { className: 'fa fa-chevron-left' }),
          onClick: this.onBackClick,
          placement: 'left'
        });
        buttons.push({
          label: _react2.default.createElement('i', { className: 'fa fa-undo' }),
          onClick: this.onResetClick,
          placement: 'right',
          hidden: !hasChanges
        });
        buttons.push({
          label: _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
          onClick: this.onSaveClick,
          placement: 'right',
          disabled: !hasChanges
        });
      }
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
      var showCountryList = this.props.availableCountries.length > 1;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(
          _Header2.default,
          {
            buttons: buttons
          },
          _i18n2.default.getString('title', this.props.currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(
            _Line2.default,
            null,
            _i18n2.default.getString(messageId, this.props.currentLocale)
          ),
          showCountryList && _react2.default.createElement(
            _InputLine2.default,
            {
              label: _i18n2.default.getString('country', this.props.currentLocale) },
            _react2.default.createElement(
              'select',
              {
                className: _styles2.default.countrySelect,
                value: this.state.countryCodeValue,
                onChange: this.onCountryCodeChange },
              this.props.availableCountries.map(function (c, idx) {
                return _react2.default.createElement(
                  'option',
                  { key: idx, value: c.isoCode },
                  '(+' + c.callingCode + ') ' + _countryNames2.default.getString(c.isoCode, _this2.props.currentLocale)
                );
              })
            )
          ),
          showAreaCode && _react2.default.createElement(
            _InputLine2.default,
            {
              label: _i18n2.default.getString('areaCode', this.props.currentLocale) },
            _react2.default.createElement(_TextInput2.default, {
              placeholder: _i18n2.default.getString('areaCodePlaceholder', this.props.currentLocale),
              maxLength: 3,
              value: this.state.areaCodeValue,
              onChange: this.onAreaCodeChange })
          ),
          this.props.children
        )
      );
    }
  }]);
  return RegionSettings;
}(_react.Component);

exports.default = RegionSettings;


RegionSettings.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onBackButtonClick: _react.PropTypes.func,
  currentLocale: _react.PropTypes.string.isRequired,
  availableCountries: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    isoCode: _react.PropTypes.string,
    callingCode: _react.PropTypes.string
  })).isRequired,
  countryCode: _react.PropTypes.string.isRequired,
  areaCode: _react.PropTypes.string.isRequired,
  onSave: _react.PropTypes.func
};
//# sourceMappingURL=index.js.map
