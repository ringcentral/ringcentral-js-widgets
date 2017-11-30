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

var _phoneSources = require('../../enums/phoneSources');

var _phoneSources2 = _interopRequireDefault(_phoneSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayFormatter = function displayFormatter(_ref) {
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

function ContactDisplayItem(_ref2) {
  var entityName = _ref2.entityName,
      entityType = _ref2.entityType,
      phoneNumber = _ref2.phoneNumber,
      sourceIcons = _ref2.sourceIcons;

  var SourceIcon = null;
  if (entityType) {
    if (entityType === _phoneSources2.default.rcContact) {
      SourceIcon = sourceIcons.brandIcon;
    } else {
      SourceIcon = sourceIcons[entityType];
    }
  }
  if (phoneNumber && entityName && SourceIcon) {
    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(SourceIcon, { className: _styles2.default.typeIcon, width: 10, height: 10 }),
      _react2.default.createElement(
        'span',
        { className: _styles2.default.typeName },
        entityName
      )
    );
  } else if (entityName && SourceIcon) {
    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(SourceIcon, { className: _styles2.default.typeIcon, width: 10, height: 10 }),
      _react2.default.createElement(
        'span',
        { className: _styles2.default.typeName },
        entityName
      )
    );
  } else if (entityName) {
    return _react2.default.createElement(
      'span',
      null,
      entityName
    );
  } else if (phoneNumber) {
    return _react2.default.createElement(
      'span',
      null,
      phoneNumber
    );
  }
  return null;
}

ContactDisplayItem.propTypes = {
  entityName: _propTypes2.default.string.isRequired,
  entityType: _propTypes2.default.string.isRequired,
  phoneNumber: _propTypes2.default.string.isRequired,
  sourceIcons: _propTypes2.default.object.isRequired
};

function ContactDisplay(_ref3) {
  var reference = _ref3.reference,
      className = _ref3.className,
      contactMatches = _ref3.contactMatches,
      selected = _ref3.selected,
      onSelectContact = _ref3.onSelectContact,
      disabled = _ref3.disabled,
      isLogging = _ref3.isLogging,
      fallBackName = _ref3.fallBackName,
      enableContactFallback = _ref3.enableContactFallback,
      areaCode = _ref3.areaCode,
      countryCode = _ref3.countryCode,
      phoneNumber = _ref3.phoneNumber,
      currentLocale = _ref3.currentLocale,
      groupNumbers = _ref3.groupNumbers,
      showType = _ref3.showType,
      selectClassName = _ref3.selectClassName,
      showPlaceholder = _ref3.showPlaceholder,
      brand = _ref3.brand,
      stopPropagation = _ref3.stopPropagation,
      _ref3$sourceIcons = _ref3.sourceIcons,
      sourceIcons = _ref3$sourceIcons === undefined ? {} : _ref3$sourceIcons,
      showGroupNumberName = _ref3.showGroupNumberName;

  var contentEl = void 0;
  if (groupNumbers && showGroupNumberName) {
    var groupNames = groupNumbers.map(function (groupNumber) {
      var groupContact = contactMatches.find(function (match) {
        return match.extensionNumber === groupNumber;
      });
      return groupContact && groupContact.name || groupNumber;
    });
    var display = groupNames.join(', ');
    contentEl = _react2.default.createElement(
      'div',
      { title: display, className: _styles2.default.currentName },
      display
    );
  } else if (groupNumbers) {
    var _display = groupNumbers.join(', ');
    contentEl = _react2.default.createElement(
      'div',
      { title: _display, className: _styles2.default.currentName },
      _display
    );
  } else if (contactMatches.length === 0) {
    var _display2 = enableContactFallback && fallBackName || phoneNumber && (0, _formatNumber2.default)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      areaCode: areaCode
    }) || _i18n2.default.getString('unknownNumber', currentLocale);
    var title = enableContactFallback && fallBackName || phoneNumber || '';
    contentEl = _react2.default.createElement(
      'div',
      { title: title, className: _styles2.default.currentName },
      _display2
    );
  } else if (contactMatches.length === 1) {
    var _display3 = contactMatches[0].name;
    var _title = displayFormatter({
      entityName: _display3,
      entityType: contactMatches[0].entityType,
      phoneNumber: phoneNumber,
      brand: brand,
      currentLocale: currentLocale
    });
    contentEl = _react2.default.createElement(
      'div',
      { title: _title, className: _styles2.default.currentName },
      _display3
    );
  } else if (contactMatches.length > 1) {
    var options = [].concat((0, _toConsumableArray3.default)(contactMatches));
    var placeholder = void 0;
    var _selected = selected;
    if (showPlaceholder) {
      placeholder = _i18n2.default.getString('select', currentLocale);
    } else {
      _selected = _selected < 0 ? 0 : _selected;
    }
    contentEl = _react2.default.createElement(_DropdownSelect2.default, {
      reference: reference,
      className: (0, _classnames2.default)(_styles2.default.select, selectClassName),
      value: '' + _selected,
      onChange: onSelectContact,
      disabled: disabled || isLogging,
      options: options,
      placeholder: placeholder,
      renderFunction: function renderFunction(entity) {
        return ContactDisplayItem({
          entityName: entity.name,
          entityType: entity.entityType,
          brand: brand,
          currentLocale: currentLocale,
          sourceIcons: sourceIcons
        });
      },
      renderValue: function renderValue(value) {
        return displayFormatter({
          entityName: options[value].name,
          entityType: showType && options[value].entityType,
          brand: brand,
          currentLocale: currentLocale
        });
      },
      renderTitle: function renderTitle(entity) {
        return entity ? displayFormatter({
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
  stopPropagation: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showGroupNumberName: _propTypes2.default.bool
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
  stopPropagation: true,
  sourceIcons: undefined,
  showGroupNumberName: false
};
//# sourceMappingURL=index.js.map
