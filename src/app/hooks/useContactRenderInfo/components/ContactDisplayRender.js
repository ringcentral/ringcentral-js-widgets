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
exports.ContactDisplayRender = void 0;
exports.renderQueueWithNameText = renderQueueWithNameText;
exports.useGetContactDisplayTextFn = exports.useFormatExtOrPhoneNumber = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.includes.js");
var _FormattedPhoneNumber = require("@ringcentral-integration/micro-auth/src/app/components/FormattedPhoneNumber");
var _nextCore = require("@ringcentral-integration/next-core");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("../i18n");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var ContactDisplayRender = exports.ContactDisplayRender = function ContactDisplayRender(props) {
  var info = props.info,
    callQueueName = props.callQueueName,
    isMissed = props.isMissed;
  if (callQueueName) {
    return renderQueueWithName({
      callQueueName: callQueueName,
      renderInfo: info,
      Renderer: function Renderer(_ref) {
        var prefix = _ref.prefix;
        return /*#__PURE__*/_react["default"].createElement(Element, _extends({}, props, {
          prefix: prefix
        }));
      }
    });
  }
  return /*#__PURE__*/_react["default"].createElement(Element, _extends({}, props, {
    isMissed: isMissed
  }));
};
var Element = function Element(_ref2) {
  var _metadata$contact;
  var info = _ref2.info,
    displayControl = _ref2.displayControl,
    prefix = _ref2.prefix,
    isMissed = _ref2.isMissed;
  var _ref3 = displayControl || {},
    _ref3$maybe = _ref3.maybe,
    displayMaybe = _ref3$maybe === void 0 ? false : _ref3$maybe,
    _ref3$matchCounts = _ref3.matchCounts,
    displayMatchCounts = _ref3$matchCounts === void 0 ? false : _ref3$matchCounts,
    _ref3$viewable = _ref3.viewable,
    _viewable = _ref3$viewable === void 0 ? false : _ref3$viewable,
    _ref3$align = _ref3.align,
    align = _ref3$align === void 0 ? 'left' : _ref3$align;
  var integrationConfig = (0, _nextCore.useContainer)('IntegrationConfig');
  var formattedPhoneNumberFn = (0, _FormattedPhoneNumber.useFormattedPhoneNumberFn)();
  if (info.type === 'phoneNumber') {
    var formattedPhoneNumber = formattedPhoneNumberFn(info.displayName);
    return /*#__PURE__*/_react["default"].createElement("div", {
      title: formattedPhoneNumber,
      className: "truncate"
    }, formattedPhoneNumber);
  }
  var _ref4 = integrationConfig || {},
    onViewEntity = _ref4.onViewEntity,
    viewableEntityTypes = _ref4.viewableEntityTypes;
  var displayName = info.displayName,
    metadata = info.metadata,
    type = info.type;
  var resultDisplayName = displayMaybe && (metadata === null || metadata === void 0 ? void 0 : metadata.showMaybe) ? (0, _i18n.t)('maybe', {
    contactName: displayName
  }) : displayName;
  var viewable = _viewable && onViewEntity && (metadata === null || metadata === void 0 ? void 0 : metadata.contact) && (viewableEntityTypes === null || viewableEntityTypes === void 0 ? void 0 : viewableEntityTypes.includes(metadata === null || metadata === void 0 ? void 0 : (_metadata$contact = metadata.contact) === null || _metadata$contact === void 0 ? void 0 : _metadata$contact.type));
  var Component = viewable ? 'a' : 'span';
  var main = /*#__PURE__*/_react["default"].createElement(Component, _extends({
    className: (0, _clsx["default"])('truncate self-stretch', viewable && 'cursor-pointer hover:underline', isMissed && 'typography-subtitleBold'),
    title: resultDisplayName,
    "data-sign": (metadata === null || metadata === void 0 ? void 0 : metadata.queueName) ? "queueName-".concat(type) : type
  }, viewable ? {
    // add a empty href to make the component able to clickable and focusable
    href: '',
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      onViewEntity(metadata.contact);
    }
  } : {}), resultDisplayName);

  // when be server name, display the hint icon for user to know that is server name not contact
  var showServerCallerId = (metadata === null || metadata === void 0 ? void 0 : metadata.serverName) && !(metadata === null || metadata === void 0 ? void 0 : metadata.queueName) && type === 'callerIdName';
  var numberOfMatches = metadata === null || metadata === void 0 ? void 0 : metadata.numberOfMatches;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _springUi.twMerge)('inline-flex flex-col min-w-0 max-w-full', align === 'center' ? 'items-center' : 'items-start')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "inline-flex items-center gap-1 max-w-full truncate"
  }, prefix, showServerCallerId ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, main, /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: (0, _i18n.t)('callerId')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    "data-sign": "callerIdHint",
    symbol: _springIcon.InfoMd,
    size: "small",
    className: "text-neutral-b2"
  }))) : main), displayMatchCounts && numberOfMatches && numberOfMatches > 1 ? /*#__PURE__*/_react["default"].createElement(_springUi.Tag, {
    color: "neutral",
    variant: "inverted",
    className: "shrink-0 w-fit max-w-20 my-1"
  }, (0, _i18n.t)('matches', {
    numberOfMatches: numberOfMatches
  })) : null);
};
function renderQueueWithName(_ref5) {
  var _renderInfo$matchedCo;
  var callQueueName = _ref5.callQueueName,
    renderInfo = _ref5.renderInfo,
    Renderer = _ref5.Renderer;
  var queueName = /*#__PURE__*/_react["default"].createElement("span", {
    className: "truncate",
    "data-sign": "queueName",
    title: callQueueName
  }, callQueueName);
  var queueNameDisplay = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, queueName, ' - ');
  switch (renderInfo.type) {
    case 'callerIdName':
      return /*#__PURE__*/_react["default"].createElement(Renderer, {
        prefix: queueNameDisplay
      });
    case 'contact':
      // when be queue number contact, only show the queue name
      if ((_renderInfo$matchedCo = renderInfo.matchedContact) === null || _renderInfo$matchedCo === void 0 ? void 0 : _renderInfo$matchedCo.isCallQueueNumber) {
        return /*#__PURE__*/_react["default"].createElement(Renderer, null);
      }
      return /*#__PURE__*/_react["default"].createElement(Renderer, {
        prefix: queueNameDisplay
      });
    case 'unknown':
    case 'phoneNumber':
    case 'extensionNumber':
    default:
      return queueName;
  }
}
function renderQueueWithNameText(_ref6) {
  var _renderInfo$matchedCo2;
  var callQueueName = _ref6.callQueueName,
    renderInfo = _ref6.renderInfo;
  switch (renderInfo.type) {
    case 'callerIdName':
      return "".concat(callQueueName, " - ").concat(renderInfo.displayName);
    case 'contact':
      // when be queue number contact, only show the queue name
      if ((_renderInfo$matchedCo2 = renderInfo.matchedContact) === null || _renderInfo$matchedCo2 === void 0 ? void 0 : _renderInfo$matchedCo2.isCallQueueNumber) {
        return renderInfo.displayName;
      }
      return "".concat(callQueueName, " - ").concat(renderInfo.displayName);
    case 'unknown':
    case 'phoneNumber':
    case 'extensionNumber':
    default:
      return callQueueName;
  }
}
var useFormatExtOrPhoneNumber = exports.useFormatExtOrPhoneNumber = function useFormatExtOrPhoneNumber() {
  var callerInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var hideBlocked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var formattedPhoneNumberFn = (0, _FormattedPhoneNumber.useFormattedPhoneNumberFn)();
  return (0, _react.useMemo)(function () {
    if (!callerInfo.extensionNumber && !callerInfo.phoneNumber) {
      if (hideBlocked) return '';
      return (0, _i18n.t)('Blocked');
    }
    return callerInfo.extensionNumber ? "".concat((0, _i18n.t)('ext'), " ").concat(formattedPhoneNumberFn(callerInfo.extensionNumber)) : formattedPhoneNumberFn(callerInfo.phoneNumber);
  }, [hideBlocked, callerInfo.extensionNumber, callerInfo.phoneNumber, formattedPhoneNumberFn]);
};
var useGetContactDisplayTextFn = exports.useGetContactDisplayTextFn = function useGetContactDisplayTextFn() {
  var formattedPhoneNumberFn = (0, _FormattedPhoneNumber.useFormattedPhoneNumberFn)();
  return (0, _react.useCallback)(function (_ref7) {
    var renderInfo = _ref7.renderInfo,
      callQueueName = _ref7.callQueueName;
    if (callQueueName) {
      return renderQueueWithNameText({
        callQueueName: callQueueName,
        renderInfo: renderInfo
      });
    }
    if (renderInfo.type === 'phoneNumber') {
      var formattedPhoneNumber = formattedPhoneNumberFn(renderInfo.displayName);
      return formattedPhoneNumber;
    }
    return renderInfo.displayName;
  }, [formattedPhoneNumberFn]);
};
//# sourceMappingURL=ContactDisplayRender.js.map
