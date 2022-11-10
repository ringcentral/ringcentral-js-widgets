"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _ContactDisplayItem = require("./ContactDisplayItem");

var _displayFormatter = require("./displayFormatter");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    max-width: 230px;\n\n    span {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  color: ", ";\n  ", ";\n  line-height: 1.3;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  && {\n    padding: 0;\n    font-size: 14px;\n    font-weight: normal;\n    max-width: 100%;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  height: 8px;\n  ", "\n  background-color: ", ";\n  border-radius: ", ";\n  margin-right: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var UnReadDot = _juno.styled.div(_templateObject(), (0, _juno.flexWidth)('8px'), (0, _juno.palette2)('interactive', 'f01'), (0, _juno.radius)('round'), (0, _juno.spacing)(1.5));

var MenuButton = (0, _juno.styled)(_juno.RcButton)(_templateObject2());

var _Title = function _Title(_ref) {
  var children = _ref.children,
      unread = _ref.unread,
      missed = _ref.missed,
      rest = _objectWithoutProperties(_ref, ["children", "unread", "missed"]);

  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    "data-sign": "currentName"
  }), children);
};

var Title = (0, _juno.styled)(_Title)(_templateObject3(), function (_ref2) {
  var unread = _ref2.unread,
      missed = _ref2.missed;
  return (// eslint-disable-next-line no-nested-ternary
    missed ? (0, _juno.palette2)('danger', 'f02') : unread ? (0, _juno.palette2)('interactive', 'f01') : (0, _juno.palette2)('neutral', 'f06')
  );
}, _juno.ellipsis);
var StyledMenu = (0, _juno.styled)(_juno.RcMenu)(_templateObject4(), _juno.RcMenuItem);

var ContactDisplay = function ContactDisplay(_ref3) {
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
      currentSiteCode = _ref3.currentSiteCode,
      isMultipleSiteEnabled = _ref3.isMultipleSiteEnabled,
      groupNumbers = _ref3.groupNumbers,
      showType = _ref3.showType,
      selectClassName = _ref3.selectClassName,
      selectedClassName = _ref3.selectedClassName,
      showPlaceholder = _ref3.showPlaceholder,
      placeholder = _ref3.placeholder,
      brand = _ref3.brand,
      stopPropagation = _ref3.stopPropagation,
      _ref3$sourceIcons = _ref3.sourceIcons,
      sourceIcons = _ref3$sourceIcons === void 0 ? {} : _ref3$sourceIcons,
      phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer,
      showGroupNumberName = _ref3.showGroupNumberName,
      contactName = _ref3.contactName,
      subContactName = _ref3.subContactName,
      isOnConferenceCall = _ref3.isOnConferenceCall,
      iconClassName = _ref3.iconClassName,
      dropdownRenderFunction = _ref3.dropdownRenderFunction,
      dropdownClassName = _ref3.dropdownClassName,
      unread = _ref3.unread,
      missed = _ref3.missed;
  var phoneNumberAfterFormat = (0, _formatNumber["default"])({
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    areaCode: areaCode,
    siteCode: currentSiteCode,
    isMultipleSiteEnabled: isMultipleSiteEnabled
  });

  var unreadDot = unread && /*#__PURE__*/_react["default"].createElement(UnReadDot, {
    "data-sign": "unread",
    "aria-label": "unread"
  });

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var handleClick = function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    return setAnchorEl(null);
  };

  var contentEl = function () {
    if (isOnConferenceCall) {
      var confStr = _i18n["default"].getString('conferenceCall', currentLocale);

      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: confStr,
        unread: unread,
        missed: missed
      }, unreadDot, confStr);
    }

    if (contactName) {
      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: subContactName ? "".concat(contactName.title || contactName).concat(subContactName.title) : contactName.title || contactName,
        unread: unread,
        missed: missed
      }, unreadDot, contactName.tag || contactName, subContactName && subContactName.tag);
    }

    if (groupNumbers && showGroupNumberName) {
      var groupNames = groupNumbers.map(function (groupNumber) {
        var groupContact = contactMatches.find(function (match) {
          return match.extensionNumber === groupNumber;
        });
        return groupContact && groupContact.name || groupNumber;
      });
      var display = groupNames.join(', ');
      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: display,
        unread: unread,
        missed: missed
      }, unreadDot, display);
    }

    if (groupNumbers) {
      var _display = groupNumbers.join(', ');

      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: _display,
        unread: unread,
        missed: missed
      }, unreadDot, _display);
    }

    if (contactMatches.length === 0) {
      var _display2 = enableContactFallback && fallBackName || phoneNumberAfterFormat || _i18n["default"].getString('unknownNumber', currentLocale);

      var title = enableContactFallback && fallBackName || phoneNumberAfterFormat || '';
      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: title,
        unread: unread,
        missed: missed
      }, unreadDot, _display2);
    }

    if (contactMatches.length === 1) {
      var _display3 = contactMatches[0].name;

      var _title = (0, _displayFormatter.displayFormatter)({
        entityName: _display3,
        entityType: contactMatches[0].entityType,
        phoneNumber: phoneNumberAfterFormat,
        brand: brand,
        currentLocale: currentLocale,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      });

      return /*#__PURE__*/_react["default"].createElement(Title, {
        title: _title,
        unread: unread,
        missed: missed
      }, unreadDot, _display3);
    }

    if (contactMatches.length > 1) {
      var entities = _toConsumableArray(contactMatches);

      var currPlaceholder;
      var _selected = selected;

      if (showPlaceholder) {
        currPlaceholder = placeholder || _i18n["default"].getString('select', currentLocale);
      } else {
        _selected = _selected < 0 ? 0 : _selected;
      }

      var curr = entities[_selected];
      var value = (0, _displayFormatter.displayFormatter)({
        entityName: curr === null || curr === void 0 ? void 0 : curr.name,
        entityType: showType && curr.entityType,
        brand: brand,
        currentLocale: currentLocale,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      });

      var _title2 = curr ? (0, _displayFormatter.displayFormatter)({
        entityName: curr.name,
        entityType: curr.entityType,
        phoneNumber: phoneNumberAfterFormat,
        brand: brand,
        currentLocale: currentLocale,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      }) : phoneNumberAfterFormat;

      var open = Boolean(anchorEl);
      var items = currPlaceholder ? [{}].concat(_toConsumableArray(entities)) : entities;
      return /*#__PURE__*/_react["default"].createElement(Title, {
        unread: unread,
        missed: missed
      }, /*#__PURE__*/_react["default"].createElement(MenuButton, {
        variant: "plain",
        "data-sign": "menuButton",
        color: unread ? 'interactive.f01' : 'neutral.f06',
        onClick: handleClick,
        disabled: disabled || isLogging,
        title: _title2,
        endIcon: /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
          symbol: open ? _icon.ArrowUp2 : _icon.ArrowDown2,
          size: "small",
          color: "neutral.f04"
        })
      }, unreadDot, /*#__PURE__*/_react["default"].createElement(Title, {
        unread: unread,
        missed: missed
      }, selected > -1 ? value : currPlaceholder)), /*#__PURE__*/_react["default"].createElement(StyledMenu, {
        open: open,
        anchorEl: anchorEl,
        onClose: function onClose(e, reason) {
          // stop event propagation to prevent click event on item
          if (reason === 'backdropClick') {
            e.stopPropagation();
          }

          handleClose();
        },
        "aria-label": "choice a presence state"
      }, items.map(function (entity, i) {
        var title = entity ? (0, _displayFormatter.displayFormatter)({
          entityName: entity.name,
          entityType: entity.entityType,
          phoneNumber: phoneNumberAfterFormat,
          brand: brand,
          currentLocale: currentLocale,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        }) : phoneNumberAfterFormat;
        var itemValue = (0, _displayFormatter.displayFormatter)({
          entityName: entity.name,
          entityType: showType && entity.entityType,
          brand: brand,
          currentLocale: currentLocale,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        });
        var isPlaceholder = showPlaceholder && i === 0;

        var child = function () {
          if (isPlaceholder) {
            return currPlaceholder;
          }

          return dropdownRenderFunction ? dropdownRenderFunction(entity) : /*#__PURE__*/_react["default"].createElement(_ContactDisplayItem.ContactDisplayItem, {
            entityName: entity.name,
            entityType: entity.entityType,
            sourceIcons: sourceIcons
          });
        }();

        return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
          title: title,
          value: itemValue,
          key: i,
          selected: value === itemValue,
          onClick: function onClick(e) {
            e.preventDefault();
            e.stopPropagation();

            if (isPlaceholder) {// TODO: should check that feature in salesforce
              // do nothing
            } else {
              onSelectContact(entity, i);
            }

            handleClose();
          }
        }, child);
      })));
    }
  }();

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, contentEl);
};

ContactDisplay.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  isOnConferenceCall: false,
  disabled: false,
  fallBackName: '',
  showType: true,
  showPlaceholder: true,
  placeholder: '',
  stopPropagation: true,
  showGroupNumberName: false,
  iconClassName: null,
  dropdownClassName: null
};
var _default = ContactDisplay;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
