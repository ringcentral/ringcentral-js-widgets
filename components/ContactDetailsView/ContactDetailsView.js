"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _ContactDetails = require("../ContactDetails");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MessageHolder = function MessageHolder(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].placeholder
  }, children);
};

var ContactDetailsView = function ContactDetailsView(_ref2) {
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
      sourceNodeRenderer = _ref2.sourceNodeRenderer;
  (0, _react.useEffect)(function () {
    if (typeof onVisitPage === 'function') {
      onVisitPage();
    }

    return function () {
      if (typeof onLeavingPage === 'function') {
        onLeavingPage();
      }
    };
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
      sourceNodeRenderer: sourceNodeRenderer
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackClick,
    className: _styles["default"].header
  }, _i18n["default"].getString('contactDetails', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content, children));
};

exports.ContactDetailsView = ContactDetailsView;
//# sourceMappingURL=ContactDetailsView.js.map
