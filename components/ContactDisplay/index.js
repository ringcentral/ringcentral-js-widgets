'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = ContactDisplay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _phoneSourceNames = require('../../lib/phoneSourceNames');

var _phoneSourceNames2 = _interopRequireDefault(_phoneSourceNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayFomatter = function displayFomatter(_ref) {
  var entityName = _ref.entityName,
      entityType = _ref.entityType,
      phoneNumber = _ref.phoneNumber,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand;

  var typeName = void 0;
  if (entityType) {
    typeName = (0, _formatMessage2.default)(_phoneSourceNames2.default.getString(entityType, currentLocale), { brand: brand });
  }
  if (phoneNumber && entityName && entityType) {
    return entityName + ' | ' + typeName + ' ' + phoneNumber;
  } else if (entityName && entityType) {
    return entityName + ' | ' + typeName;
  } else if (entityName) {
    return entityName;
  } else if (phoneNumber) {
    return '' + phoneNumber;
  }
  return '';
};

function ContactDisplay(_ref2) {
  var reference = _ref2.reference,
      className = _ref2.className,
      contactMatches = _ref2.contactMatches,
      selected = _ref2.selected,
      onSelectContact = _ref2.onSelectContact,
      disabled = _ref2.disabled,
      isLogging = _ref2.isLogging,
      fallBackName = _ref2.fallBackName,
      enableContactFallback = _ref2.enableContactFallback,
      areaCode = _ref2.areaCode,
      countryCode = _ref2.countryCode,
      phoneNumber = _ref2.phoneNumber,
      currentLocale = _ref2.currentLocale,
      groupNumbers = _ref2.groupNumbers,
      showType = _ref2.showType,
      selectClassName = _ref2.selectClassName,
      showPlaceholder = _ref2.showPlaceholder,
      brand = _ref2.brand,
      stopPropagation = _ref2.stopPropagation;

  var contentEl = void 0;
  if (groupNumbers) {
    var display = groupNumbers.join(', ');
    contentEl = _react2.default.createElement(
      'div',
      { title: display },
      display
    );
  } else if (contactMatches.length === 0) {
    var _display = enableContactFallback && fallBackName || phoneNumber && (0, _formatNumber2.default)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      areaCode: areaCode
    }) || _i18n2.default.getString('unknownNumber', currentLocale);
    var title = enableContactFallback && fallBackName || phoneNumber || '';
    contentEl = _react2.default.createElement(
      'div',
      { title: title },
      _display
    );
  } else if (contactMatches.length === 1) {
    var _display2 = contactMatches[0].name;
    var _title = displayFomatter({
      entityName: _display2,
      entityType: contactMatches[0].entityType,
      phoneNumber: phoneNumber
    });
    contentEl = _react2.default.createElement(
      'div',
      { title: _title },
      _display2
    );
  } else if (contactMatches.length > 1) {
    var options = [].concat((0, _toConsumableArray3.default)(contactMatches));
    var placeholder = void 0;
    if (showPlaceholder) {
      placeholder = _i18n2.default.getString('select', currentLocale);
    }
    contentEl = _react2.default.createElement(_DropdownSelect2.default, {
      reference: reference,
      className: (0, _classnames2.default)(_styles2.default.select, selectClassName),
      value: '' + selected,
      onChange: onSelectContact,
      disabled: disabled || isLogging,
      options: options,
      placeholder: placeholder,
      renderFunction: function renderFunction(entity) {
        return displayFomatter({
          entityName: entity.name,
          entityType: entity.entityType,
          brand: brand,
          currentLocale: currentLocale
        });
      },
      renderValue: function renderValue(value) {
        return displayFomatter({
          entityName: options[value].name,
          entityType: showType && options[value].entityType,
          brand: brand,
          currentLocale: currentLocale
        });
      },
      renderTitle: function renderTitle(entity) {
        return entity ? displayFomatter({
          entityName: entity.name,
          entityType: entity.entityType,
          phoneNumber: phoneNumber,
          brand: brand,
          currentLocale: currentLocale
        }) : phoneNumber;
      },
      dropdownAlign: 'left',
      titleEnabled: true,
      noPadding: true,
      stopPropagation: stopPropagation
    });
  }
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, className) },
    contentEl
  );
}
ContactDisplay.propTypes = {
  reference: _propTypes2.default.func,
  className: _propTypes2.default.string,
  contactMatches: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  selected: _propTypes2.default.number.isRequired,
  onSelectContact: _propTypes2.default.func,
  disabled: _propTypes2.default.bool.isRequired,
  isLogging: _propTypes2.default.bool.isRequired,
  fallBackName: _propTypes2.default.string,
  enableContactFallback: _propTypes2.default.bool,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  phoneNumber: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  groupNumbers: _propTypes2.default.arrayOf(_propTypes2.default.string),
  showType: _propTypes2.default.bool,
  selectClassName: _propTypes2.default.string,
  showPlaceholder: _propTypes2.default.bool,
  brand: _propTypes2.default.string,
  stopPropagation: _propTypes2.default.bool
};
ContactDisplay.defaultProps = {
  reference: undefined,
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
  enableContactFallback: undefined,
  showType: true,
  selectClassName: undefined,
  showPlaceholder: true,
  brand: undefined,
  stopPropagation: true
};
//# sourceMappingURL=index.js.map
