"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebRTCNotificationSection = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _Ignore = _interopRequireDefault(require("@ringcentral/juno/icon/Ignore"));

var _Voicemail = _interopRequireDefault(require("@ringcentral/juno/icon/Voicemail"));

var _juno = require("@ringcentral/juno");

var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));

var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));

var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WebRTCNotificationSection = function WebRTCNotificationSection(_ref) {
  var call = _ref.call,
      onCloseNotification = _ref.onCloseNotification,
      currentNotificationIdentify = _ref.currentNotificationIdentify,
      logName = _ref.logName,
      currentLocale = _ref.currentLocale,
      formatPhone = _ref.formatPhone,
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
      clickForwardTrack = _ref$clickForwardTrac === void 0 ? function () {} : _ref$clickForwardTrac;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  (0, _react.useEffect)(function () {
    if (currentNotificationIdentify) {
      var result = call.result;

      if (result) {
        onCloseNotification();
      }
    }
  }, [call.result]);

  var renderLogSection = function renderLogSection() {
    var direction = call.direction,
        to = call.to,
        from = call.from,
        telephonySessionId = call.telephonySessionId;
    var number = direction === _callDirections["default"].outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
    var formatNumber = formatPhone(number);

    var handleClick = function handleClick(event) {
      clickForwardTrack();
      setAnchorEl(event.currentTarget);
    };

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].layer
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "inboundNotification",
      className: (0, _classnames2["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].content)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      title: logName,
      className: _styles["default"].contact
    }, logName), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].number
    }, formatNumber), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].control
    }, /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _classnames2["default"])(_styles["default"].buttonsGroup, _defineProperty({}, _styles["default"].singleCallCtrl, !hasActiveSession))
    }, /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "ignore",
      icon: _Ignore["default"],
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
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: !anchorEl ? 'forward' : 'forwardActive',
      icon: _Forward_white["default"],
      className: _styles["default"].button,
      onClick: handleClick
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('forward', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('forward', currentLocale))), !isWide && hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: (0, _classnames2["default"])(_styles["default"].callButton, _styles["default"].voicemail)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _Voicemail["default"],
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
      icon: _Voicemail["default"],
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
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "forwardActiveList"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, forwardList.map(function (_ref2) {
      var text = _ref2.text,
          subText = _ref2.subText,
          onClick = _ref2.onClick,
          key = _ref2.key;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: key,
        onClick: onClick,
        maxWidth: 170,
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
