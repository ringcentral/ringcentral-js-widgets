"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContactDisplay;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

var _phoneSources = _interopRequireDefault(require("../../enums/phoneSources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var displayFormatter = function displayFormatter(_ref) {
  var entityName = _ref.entityName,
      entityType = _ref.entityType,
      phoneNumber = _ref.phoneNumber,
      phoneType = _ref.phoneType,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer;
  var typeName;

  if (entityType) {
    typeName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : (0, _formatMessage.default)(_phoneSourceNames.default.getString(entityType, currentLocale), {
      brand: brand
    });
  }

  if (phoneNumber && entityName && entityType) {
    return "".concat(entityName, " | ").concat(typeName, " ").concat(phoneNumber);
  } else if (entityName && entityType) {
    return "".concat(entityName, " | ").concat(typeName);
  } else if (entityName) {
    return entityName;
  } else if (phoneNumber) {
    return "".concat(phoneNumber);
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
    if (entityType === _phoneSources.default.rcContact) {
      SourceIcon = sourceIcons.brandIcon;
    } else {
      SourceIcon = sourceIcons[entityType];
    }
  }

  if (phoneNumber && entityName !== undefined && SourceIcon) {
    return _react.default.createElement("span", null, _react.default.createElement(SourceIcon, {
      className: _styles.default.typeIcon,
      width: 10,
      height: 10
    }), _react.default.createElement("span", {
      className: _styles.default.typeName
    }, entityName));
  } else if (entityName !== undefined && SourceIcon) {
    return _react.default.createElement("span", null, _react.default.createElement(SourceIcon, {
      className: _styles.default.typeIcon,
      width: 10,
      height: 10
    }), _react.default.createElement("span", {
      className: _styles.default.typeName
    }, entityName));
  } else if (entityName !== undefined) {
    return _react.default.createElement("span", null, entityName);
  } else if (phoneNumber) {
    return _react.default.createElement("span", null, phoneNumber);
  }

  return null;
}

ContactDisplayItem.propTypes = {
  entityName: _propTypes.default.string.isRequired,
  entityType: _propTypes.default.string.isRequired,
  phoneNumber: _propTypes.default.string.isRequired,
  sourceIcons: _propTypes.default.object.isRequired
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
      selectedClassName = _ref3.selectedClassName,
      showPlaceholder = _ref3.showPlaceholder,
      brand = _ref3.brand,
      stopPropagation = _ref3.stopPropagation,
      _ref3$sourceIcons = _ref3.sourceIcons,
      sourceIcons = _ref3$sourceIcons === void 0 ? {} : _ref3$sourceIcons,
      phoneTypeRenderer = _ref3.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer,
      showGroupNumberName = _ref3.showGroupNumberName,
      contactName = _ref3.contactName,
      isOnConferenceCall = _ref3.isOnConferenceCall,
      iconClassName = _ref3.iconClassName;
  var contentEl;

  if (isOnConferenceCall) {
    var confStr = _i18n.default.getString('conferenceCall', currentLocale);

    contentEl = _react.default.createElement("div", {
      title: confStr,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, confStr);
  } else if (contactName) {
    contentEl = _react.default.createElement("div", {
      title: contactName,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, contactName);
  } else if (groupNumbers && showGroupNumberName) {
    var groupNames = groupNumbers.map(function (groupNumber) {
      var groupContact = contactMatches.find(function (match) {
        return match.extensionNumber === groupNumber;
      });
      return groupContact && groupContact.name || groupNumber;
    });
    var display = groupNames.join(', ');
    contentEl = _react.default.createElement("div", {
      title: display,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, display);
  } else if (groupNumbers) {
    var _display = groupNumbers.join(', ');

    contentEl = _react.default.createElement("div", {
      title: _display,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, _display);
  } else if (contactMatches.length === 0) {
    var _display2 = enableContactFallback && fallBackName || phoneNumber && (0, _formatNumber.default)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      areaCode: areaCode
    }) || _i18n.default.getString('unknownNumber', currentLocale);

    var title = enableContactFallback && fallBackName || phoneNumber || '';
    contentEl = _react.default.createElement("div", {
      title: title,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, _display2);
  } else if (contactMatches.length === 1) {
    var _display3 = contactMatches[0].name;

    var _title = displayFormatter({
      entityName: _display3,
      entityType: contactMatches[0].entityType,
      phoneNumber: phoneNumber,
      brand: brand,
      currentLocale: currentLocale,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer
    });

    contentEl = _react.default.createElement("div", {
      title: _title,
      "data-sign": "currentName",
      className: _styles.default.currentName
    }, _display3);
  } else if (contactMatches.length > 1) {
    var options = _toConsumableArray(contactMatches);

    var placeholder;
    var _selected = selected;

    if (showPlaceholder) {
      placeholder = _i18n.default.getString('select', currentLocale);
    } else {
      _selected = _selected < 0 ? 0 : _selected;
    }

    contentEl = _react.default.createElement(_DropdownSelect.default, {
      reference: reference,
      className: (0, _classnames.default)(_styles.default.select, selectClassName),
      selectedClassName: (0, _classnames.default)(_styles.default.selectedValue, selectedClassName),
      buttonStyle: _styles.default.button,
      iconClassName: (0, _classnames.default)(_styles.default.icon, iconClassName),
      value: _selected,
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
          currentLocale: currentLocale,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        });
      },
      renderTitle: function renderTitle(entity) {
        return entity ? displayFormatter({
          entityName: entity.name,
          entityType: entity.entityType,
          phoneNumber: phoneNumber,
          brand: brand,
          currentLocale: currentLocale,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        }) : phoneNumber;
      },
      dropdownAlign: "left",
      titleEnabled: true,
      noPadding: true,
      stopPropagation: stopPropagation
    });
  }

  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.root, className)
  }, contentEl);
}

ContactDisplay.propTypes = {
  isOnConferenceCall: _propTypes.default.bool,
  reference: _propTypes.default.func,
  className: _propTypes.default.string,
  contactMatches: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  selected: _propTypes.default.number.isRequired,
  onSelectContact: _propTypes.default.func,
  disabled: _propTypes.default.bool.isRequired,
  isLogging: _propTypes.default.bool.isRequired,
  fallBackName: _propTypes.default.string,
  enableContactFallback: _propTypes.default.bool,
  areaCode: _propTypes.default.string.isRequired,
  countryCode: _propTypes.default.string.isRequired,
  phoneNumber: _propTypes.default.string,
  currentLocale: _propTypes.default.string.isRequired,
  groupNumbers: _propTypes.default.arrayOf(_propTypes.default.string),
  showType: _propTypes.default.bool,
  selectClassName: _propTypes.default.string,
  selectedClassName: _propTypes.default.string,
  showPlaceholder: _propTypes.default.bool,
  brand: _propTypes.default.string,
  stopPropagation: _propTypes.default.bool,
  sourceIcons: _propTypes.default.object,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  showGroupNumberName: _propTypes.default.bool,
  contactName: _propTypes.default.any,
  iconClassName: _propTypes.default.string
};
ContactDisplay.defaultProps = {
  isOnConferenceCall: false,
  reference: undefined,
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
  enableContactFallback: undefined,
  showType: true,
  selectClassName: undefined,
  selectedClassName: undefined,
  showPlaceholder: true,
  brand: undefined,
  stopPropagation: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  contactName: undefined,
  iconClassName: null
};
//# sourceMappingURL=index.js.map
