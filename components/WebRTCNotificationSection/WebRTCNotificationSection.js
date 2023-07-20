"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebRTCNotificationSection = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));
var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _MoreActionWithIncomingCall = require("../CallLogCallCtrlComponent/MoreActionWithIncomingCall");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 170px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
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
    if (displayEntity && displayEntity.hasProfileImage && !displayEntity.profileImageUrl) {
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
      className: (0, _classnames2["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].content)
    }, renderCallNotificationAvatar === null || renderCallNotificationAvatar === void 0 ? void 0 : renderCallNotificationAvatar(displayMatchedEntity, entityType), /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "logName",
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
      className: (0, _classnames2["default"])(_styles["default"].buttonsGroup, _defineProperty({}, _styles["default"].singleCallCtrl, !hasActiveSession))
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
      forward: /*#__PURE__*/function () {
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
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
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
      className: (0, _classnames2["default"])(_styles["default"].callButton, _styles["default"].voicemail)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _junoIcon.Voicemail,
      className: (0, _classnames2["default"])(_styles["default"].button, _styles["default"].hangup),
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
      className: (0, _classnames2["default"])(_styles["default"].callButton, _styles["default"].answerButton)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "answer",
      icon: _Answer["default"],
      className: (0, _classnames2["default"])(_styles["default"].button, _styles["default"].answer),
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
      className: (0, _classnames2["default"])(_styles["default"].button, _styles["default"].multipleButton),
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
      className: (0, _classnames2["default"])(_styles["default"].button, _styles["default"].hangup),
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
      className: (0, _classnames2["default"])(_styles["default"].button, _styles["default"].multipleButton),
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
