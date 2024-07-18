"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UnReadDot = exports.Title = exports.ContactDisplay = void 0;
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactDisplayItem = require("./ContactDisplayItem");
var _displayFormatter = require("./displayFormatter");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
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
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var UnReadDot = _juno.styled.div(_templateObject(), (0, _juno.flexWidth)('8px'), (0, _juno.palette2)('interactive', 'f01'), (0, _juno.radius)('round'), (0, _juno.spacing)(1.5));
exports.UnReadDot = UnReadDot;
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
  return (
    // eslint-disable-next-line no-nested-ternary
    missed ? (0, _juno.palette2)('danger', 'f02') : unread ? (0, _juno.palette2)('interactive', 'f01') : (0, _juno.palette2)('neutral', 'f06')
  );
}, _juno.ellipsis);
exports.Title = Title;
var StyledMenu = (0, _juno.styled)(_juno.RcMenu)(_templateObject4(), _juno.RcMenuItem);
var ContactDisplay = function ContactDisplay(_ref3) {
  var _formatPhone;
  var warmTransferRole = _ref3.warmTransferRole,
    showCallerIdIcon = _ref3.showCallerIdIcon,
    callerIdName = _ref3.callerIdName,
    reference = _ref3.reference,
    className = _ref3.className,
    contactMatches = _ref3.contactMatches,
    selected = _ref3.selected,
    onSelectContact = _ref3.onSelectContact,
    isLogging = _ref3.isLogging,
    enableContactFallback = _ref3.enableContactFallback,
    areaCode = _ref3.areaCode,
    countryCode = _ref3.countryCode,
    phoneNumber = _ref3.phoneNumber,
    currentLocale = _ref3.currentLocale,
    groupNumbers = _ref3.groupNumbers,
    selectClassName = _ref3.selectClassName,
    selectedClassName = _ref3.selectedClassName,
    brand = _ref3.brand,
    _ref3$sourceIcons = _ref3.sourceIcons,
    sourceIcons = _ref3$sourceIcons === void 0 ? {} : _ref3$sourceIcons,
    phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer,
    contactName = _ref3.contactName,
    subContactName = _ref3.subContactName,
    iconClassName = _ref3.iconClassName,
    dropdownRenderFunction = _ref3.dropdownRenderFunction,
    dropdownClassName = _ref3.dropdownClassName,
    unread = _ref3.unread,
    missed = _ref3.missed,
    formatPhone = _ref3.formatPhone,
    _ref3$currentSiteCode = _ref3.currentSiteCode,
    currentSiteCode = _ref3$currentSiteCode === void 0 ? '' : _ref3$currentSiteCode,
    _ref3$isMultipleSiteE = _ref3.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref3$isMultipleSiteE === void 0 ? false : _ref3$isMultipleSiteE,
    _ref3$isOnConferenceC = _ref3.isOnConferenceCall,
    isOnConferenceCall = _ref3$isOnConferenceC === void 0 ? false : _ref3$isOnConferenceC,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    _ref3$fallBackName = _ref3.fallBackName,
    fallBackName = _ref3$fallBackName === void 0 ? '' : _ref3$fallBackName,
    _ref3$showType = _ref3.showType,
    showType = _ref3$showType === void 0 ? true : _ref3$showType,
    _ref3$showPlaceholder = _ref3.showPlaceholder,
    showPlaceholder = _ref3$showPlaceholder === void 0 ? true : _ref3$showPlaceholder,
    _ref3$placeholder = _ref3.placeholder,
    placeholder = _ref3$placeholder === void 0 ? '' : _ref3$placeholder,
    _ref3$stopPropagation = _ref3.stopPropagation,
    stopPropagation = _ref3$stopPropagation === void 0 ? true : _ref3$stopPropagation,
    _ref3$showGroupNumber = _ref3.showGroupNumberName,
    showGroupNumberName = _ref3$showGroupNumber === void 0 ? false : _ref3$showGroupNumber,
    _ref3$maxExtensionNum = _ref3.maxExtensionNumberLength,
    maxExtensionNumberLength = _ref3$maxExtensionNum === void 0 ? 6 : _ref3$maxExtensionNum;
  var phoneNumberAfterFormat = // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  (_formatPhone = formatPhone === null || formatPhone === void 0 ? void 0 : formatPhone(phoneNumber)) !== null && _formatPhone !== void 0 ? _formatPhone : (0, _formatNumber.formatNumber)({
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    areaCode: areaCode,
    siteCode: currentSiteCode,
    isMultipleSiteEnabled: isMultipleSiteEnabled,
    maxExtensionLength: maxExtensionNumberLength
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
      }, unreadDot, contactName.tag || contactName, warmTransferRole, subContactName && subContactName.tag);
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
      var fallBackResult = enableContactFallback && fallBackName;
      var _display2 = callerIdName || fallBackResult || phoneNumberAfterFormat || _i18n["default"].getString('unknownNumber', currentLocale);
      var groupedNameTitle = callerIdName ? "".concat(callerIdName, " | ").concat(phoneNumberAfterFormat) : undefined;
      var title =
      // grouped name with phone number
      groupedNameTitle || fallBackResult || phoneNumberAfterFormat || undefined;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].currentNameContainer
      }, /*#__PURE__*/_react["default"].createElement(Title, {
        title: title,
        unread: unread,
        missed: missed
      }, unreadDot, _display2), showCallerIdIcon && callerIdName && /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
        title: _i18n["default"].getString('callerId', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        "data-sign": "caller-id-name",
        symbol: _junoIcon.IdBorder,
        size: "small",
        color: "neutral.f04"
      })));
    }
    if (contactMatches.length === 1) {
      var _display3 = contactMatches[0].name;
      var _title = (0, _displayFormatter.displayFormatter)({
        entityName: _display3,
        entityType: contactMatches[0].entityType,
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
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
      var currPlaceholder = '';
      var _selected = selected;
      if (showPlaceholder) {
        currPlaceholder = placeholder || _i18n["default"].getString('select', currentLocale);
      } else {
        _selected = _selected < 0 ? 0 : _selected;
      }
      var curr = entities[_selected];
      var value = (0, _displayFormatter.displayFormatter)({
        entityName: curr === null || curr === void 0 ? void 0 : curr.name,
        entityType: showType ? curr.entityType : undefined,
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
        disabled: disabled || isLogging
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        ,
        title: _title2,
        endIcon: /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
          symbol: open ? _junoIcon.ArrowUp2 : _junoIcon.ArrowDown2,
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
          // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
          phoneNumber: phoneNumberAfterFormat,
          brand: brand,
          currentLocale: currentLocale,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        }) : phoneNumberAfterFormat;
        var itemValue = (0, _displayFormatter.displayFormatter)({
          entityName: entity.name,
          entityType: showType ? entity.entityType : undefined,
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
            if (isPlaceholder) {
              // TODO: should check that feature in salesforce
              // do nothing
            } else {
              onSelectContact === null || onSelectContact === void 0 ? void 0 : onSelectContact(entity, i);
            }
            handleClose();
          }
        }, child);
      })));
    }
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, contentEl);
};
exports.ContactDisplay = ContactDisplay;
var _default = ContactDisplay;
exports["default"] = _default;
//# sourceMappingURL=ContactDisplay.js.map
