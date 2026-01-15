"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PageHeader = require("../BackHeader/PageHeader");
var _ContactDetails = require("../ContactDetails");
var _Panel = _interopRequireDefault(require("../Panel"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var MessageHolder = function MessageHolder(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].placeholder
  }, children);
};
var ContactDetailsView = exports.ContactDetailsView = function ContactDetailsView(_ref2) {
  var children = _ref2.children,
    contact = _ref2.contact,
    currentLocale = _ref2.currentLocale,
    isMultipleSiteEnabled = _ref2.isMultipleSiteEnabled,
    isCallButtonDisabled = _ref2.isCallButtonDisabled,
    disableLinks = _ref2.disableLinks,
    showSpinner = _ref2.showSpinner,
    formatNumber = _ref2.formatNumber,
    canCallButtonShow = _ref2.canCallButtonShow,
    canTextButtonShow = _ref2.canTextButtonShow,
    onBackClick = _ref2.onBackClick,
    onVisitPage = _ref2.onVisitPage,
    onLeavingPage = _ref2.onLeavingPage,
    onClickMailTo = _ref2.onClickMailTo,
    onClickToDial = _ref2.onClickToDial,
    onClickToSMS = _ref2.onClickToSMS,
    sourceNodeRenderer = _ref2.sourceNodeRenderer,
    getPresence = _ref2.getPresence;
  (0, _react.useEffect)(function () {
    onVisitPage === null || onVisitPage === void 0 ? void 0 : onVisitPage();
    return onLeavingPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var content = null;
  if (showSpinner) {
    content = /*#__PURE__*/_react["default"].createElement(MessageHolder, null, _i18n["default"].getString('loadingContact', currentLocale));
  } else if (!contact) {
    content = /*#__PURE__*/_react["default"].createElement(MessageHolder, null, _i18n["default"].getString('contactNotFound', currentLocale));
  } else {
    content = /*#__PURE__*/_react["default"].createElement(_ContactDetails.ContactDetails, {
      currentLocale: currentLocale,
      contact: contact,
      canCallButtonShow: canCallButtonShow,
      canTextButtonShow: canTextButtonShow,
      onClickToSMS: onClickToSMS,
      onClickToDial: onClickToDial,
      isMultipleSiteEnabled: isMultipleSiteEnabled,
      isCallButtonDisabled: isCallButtonDisabled,
      disableLinks: disableLinks,
      onClickMailTo: onClickMailTo,
      formatNumber: formatNumber,
      sourceNodeRenderer: sourceNodeRenderer,
      getPresence: getPresence
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBackClick,
    className: _styles["default"].header
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, _i18n["default"].getString('contactDetails', currentLocale)), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content, children));
};
//# sourceMappingURL=ContactDetailsView.js.map
