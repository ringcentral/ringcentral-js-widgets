'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PhoneNumber(_ref) {
  var formatPhone = _ref.formatPhone,
      usageType = _ref.usageType,
      currentLocale = _ref.currentLocale,
      phoneNumber = _ref.phoneNumber;

  var usageTypeDom = usageType ? _react2.default.createElement(
    'span',
    { className: _styles2.default.usageType },
    _i18n2.default.getString(usageType, currentLocale)
  ) : null;
  return _react2.default.createElement(
    'span',
    { className: _styles2.default.phoneNumber },
    _react2.default.createElement(
      'span',
      null,
      formatPhone(phoneNumber)
    ),
    usageTypeDom
  );
}

PhoneNumber.propTypes = {
  formatPhone: _propTypes2.default.func.isRequired,
  phoneNumber: _propTypes2.default.string,
  usageType: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired
};

PhoneNumber.defaultProps = {
  phoneNumber: null,
  usageType: null
};
function FromField(_ref2) {
  var className = _ref2.className,
      fromNumber = _ref2.fromNumber,
      fromNumbers = _ref2.fromNumbers,
      onChange = _ref2.onChange,
      formatPhone = _ref2.formatPhone,
      hidden = _ref2.hidden,
      showAnonymous = _ref2.showAnonymous,
      currentLocale = _ref2.currentLocale;

  if (hidden) {
    return null;
  }
  var options = [].concat((0, _toConsumableArray3.default)(fromNumbers));
  if (showAnonymous) {
    options.push({
      phoneNumber: 'anonymous'
    });
  }
  return _react2.default.createElement(_DropdownSelect2.default, {
    className: (0, _classnames2.default)(_styles2.default.root, className),
    iconClassName: _styles2.default.selectIcon,
    value: fromNumber,
    label: _i18n2.default.getString('from', currentLocale) + ':',
    onChange: onChange,
    options: options,
    renderValue: function renderValue(value) {
      if (value === 'anonymous') {
        return _react2.default.createElement(
          'span',
          null,
          _i18n2.default.getString('Blocked', currentLocale)
        );
      }
      return _react2.default.createElement(PhoneNumber, {
        formatPhone: formatPhone,
        phoneNumber: value,
        currentLocale: currentLocale
      });
    },
    valueFunction: function valueFunction(option) {
      return option.phoneNumber;
    },
    renderFunction: function renderFunction(option) {
      if (option.phoneNumber === 'anonymous') {
        return _react2.default.createElement(
          'span',
          null,
          _i18n2.default.getString('Blocked', currentLocale)
        );
      }
      return _react2.default.createElement(PhoneNumber, {
        formatPhone: formatPhone,
        phoneNumber: option.phoneNumber,
        usageType: option.usageType,
        currentLocale: currentLocale
      });
    }
  });
}

FromField.propTypes = {
  fromNumber: _propTypes2.default.string,
  formatPhone: _propTypes2.default.func.isRequired,
  fromNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    usageType: _propTypes2.default.string
  })).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  hidden: _propTypes2.default.bool.isRequired,
  showAnonymous: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true
};

exports.default = FromField;
//# sourceMappingURL=index.js.map
