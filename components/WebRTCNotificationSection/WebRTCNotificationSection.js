"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebRTCNotificationSection = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));
var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _MoreActionWithIncomingCall = require("../CallLogCallCtrlComponent/MoreActionWithIncomingCall");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 170px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ForwardActiveList = _juno.styled.div(_templateObject());
var WebRTCNotificationSection = function WebRTCNotificationSection(_ref) {
  var call = _ref.call,
    onCloseNotification = _ref.onCloseNotification,
    currentNotificationIdentify = _ref.currentNotificationIdentify,
    logName = _ref.logName,
    subContactNameDisplay = _ref.subContactNameDisplay,
    currentLocale = _ref.currentLocale,
    isWide = _ref.isWide,
    onIgnore = _ref.onIgnore,
    endAndAnswer = _ref.endAndAnswer,
    holdAndAnswer = _ref.holdAndAnswer,
    toVoicemail = _ref.toVoicemail,
    hasActiveSession = _ref.hasActiveSession,
    answer = _ref.answer,
    forwardingNumbers = _ref.forwardingNumbers,
    onForward = _ref.onForward,
    _ref$clickForwardTrac = _ref.clickForwardTrack,
    clickForwardTrack = _ref$clickForwardTrac === void 0 ? function () {} : _ref$clickForwardTrac,
    renderCallNotificationAvatar = _ref.renderCallNotificationAvatar,
    displayEntity = _ref.displayEntity,
    entityType = _ref.entityType,
    getAvatarUrl = _ref.getAvatarUrl,
    entityDetailLink = _ref.entityDetailLink,
    openEntityDetailLinkTrack = _ref.openEntityDetailLinkTrack,
    _reply = _ref.reply,
    enableReply = _ref.enableReply,
    _ref$disableLinks = _ref.disableLinks,
    disableLinks = _ref$disableLinks === void 0 ? false : _ref$disableLinks;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var _useState3 = (0, _react.useState)(displayEntity === null || displayEntity === void 0 ? void 0 : displayEntity.profileImageUrl),
    _useState4 = _slicedToArray(_useState3, 2),
    avatarUrl = _useState4[0],
    setAvatarUrl = _useState4[1];
  (0, _react.useEffect)(function () {
    if (currentNotificationIdentify) {
      var result = call.result;
      if (result) {
        onCloseNotification();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call.result]);
  (0, _react.useEffect)(function () {
    if (displayEntity && displayEntity.hasProfileImage) {
      getAvatarUrl(displayEntity).then(function (url) {
        setAvatarUrl(url);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayEntity]);
  var displayMatchedEntity = displayEntity ? _objectSpread(_objectSpread({}, displayEntity), {}, {
    profileImageUrl: avatarUrl
  }) : null;
  var renderLogSection = function renderLogSection() {
    var telephonySessionId = call.telephonySessionId;
    var handleClick = function handleClick(event) {
      clickForwardTrack();
      // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
      setAnchorEl(event.currentTarget);
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].layer
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "inboundNotification",
      className: (0, _clsx2["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].content)
    }, renderCallNotificationAvatar === null || renderCallNotificationAvatar === void 0 ? void 0 : renderCallNotificationAvatar(displayMatchedEntity, entityType), /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "inboundNotificationLogName",
      title: logName,
      className: _styles["default"].contact
    }, entityDetailLink ? /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      variant: "inherit",
      onClick: function onClick() {
        window.open(entityDetailLink, '_blank');
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        openEntityDetailLinkTrack();
      }
    }, logName) : logName), subContactNameDisplay && /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "subName",
      className: _styles["default"].number
    }, subContactNameDisplay), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].control
    }, /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _clsx2["default"])(_styles["default"].buttonsGroup, _defineProperty({}, _styles["default"].singleCallCtrl, !hasActiveSession))
    }, /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "ignore",
      icon: _junoIcon.Ignore,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      className: _styles["default"].button,
      onClick: function onClick() {
        return onIgnore(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('ignore', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('ignore', currentLocale))), /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, enableReply ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MoreActionWithIncomingCall.MoreActionWithIncomingCall, {
      currentLocale: currentLocale,
      disabled: disableLinks,
      forwardingNumbers: forwardingNumbers,
      forward: ( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phoneNumber) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", onForward(phoneNumber, telephonySessionId));
                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()),
      enableReply: true,
      reply: function reply() {
        return _reply === null || _reply === void 0 ? void 0 : _reply(telephonySessionId);
      },
      clickForwardTrack: clickForwardTrack,
      isWebRTCNotification: true
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('more', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('more', currentLocale))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: !anchorEl ? 'forward' : 'forwardActive',
      icon: _Forward_white["default"],
      className: _styles["default"].button,
      onClick: handleClick
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('forward', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('forward', currentLocale)))), !isWide && hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: (0, _clsx2["default"])(_styles["default"].callButton, _styles["default"].voicemail)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _junoIcon.Voicemail,
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].hangup),
      showBorder: false,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: function onClick() {
        return toVoicemail(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('toVoicemail', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('toVoicemail', currentLocale)))), /*#__PURE__*/_react["default"].createElement("ul", {
      className: _styles["default"].buttonsGroup
    }, !hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: (0, _clsx2["default"])(_styles["default"].callButton, _styles["default"].answerButton)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "answer",
      icon: _Answer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].answer),
      showBorder: false,
      onClick: function onClick() {
        return answer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('answer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('answer', currentLocale))), hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "endAndAnswer",
      icon: _EndAnswer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].multipleButton),
      showBorder: false,
      iconWidth: 500,
      iconHeight: 500,
      iconX: 0,
      iconY: 0,
      onClick: function onClick() {
        return endAndAnswer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('endAndAnswer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('endAndAnswer', currentLocale))), (isWide || !hasActiveSession) && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _junoIcon.Voicemail,
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].hangup),
      showBorder: false,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: function onClick() {
        return toVoicemail(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('toVoicemail', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('toVoicemail', currentLocale))), hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "holdAndAnswer",
      icon: _HoldAnswer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].multipleButton),
      showBorder: false,
      iconWidth: 500,
      iconHeight: 500,
      iconX: 0,
      iconY: 0,
      onClick: function onClick() {
        return holdAndAnswer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('holdAndAnswer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('holdAndAnswer', currentLocale)))))));
  };
  var renderForwardList = function renderForwardList() {
    var handleClose = function handleClose() {
      setAnchorEl(null);
    };
    var forward = function forward(e) {
      e.stopPropagation();
      handleClose();
      // TODO: check that type, should switch to getAttribute
      // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
      var selectedValue = e.currentTarget.attributes['data-value'].value;
      onForward(selectedValue, call === null || call === void 0 ? void 0 : call.telephonySessionId);
    };
    var forwardList = forwardingNumbers.map(function (phoneNumber) {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: forward
      };
    });
    forwardList.push({
      key: 'custom',
      text: _i18n["default"].getString('custom', currentLocale),
      subText: null,
      onClick: forward
    });
    return /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
      anchorOrigin: {
        vertical: 'center',
        horizontal: isWide ? 'left' : 'center'
      },
      transformOrigin: {
        vertical: 'center',
        horizontal: isWide ? 'right' : 'center'
      },
      marginThreshold: isWide ? 0 : 15,
      anchorEl: anchorEl,
      open: !!anchorEl,
      onClose: function onClose() {
        return handleClose();
      },
      classes: {
        paper: _styles["default"].forwardPopover
      }
    }, /*#__PURE__*/_react["default"].createElement(ForwardActiveList, {
      "data-sign": "forwardActiveList"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, forwardList.map(function (_ref3) {
      var text = _ref3.text,
        subText = _ref3.subText,
        onClick = _ref3.onClick,
        key = _ref3.key;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: key,
        onClick: onClick,
        "data-value": key
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].moreActionItem,
        "data-sign": key
      }, text && /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].actionText
      }, text), subText && /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].subText
      }, subText, " ")));
    }))));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderLogSection(), renderForwardList());
};
exports.WebRTCNotificationSection = WebRTCNotificationSection;
//# sourceMappingURL=WebRTCNotificationSection.js.map
