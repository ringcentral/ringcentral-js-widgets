"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebRTCNotificationSection = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");

var _MenuList = require("@ringcentral/juno/es6/components/Menu/MenuList/MenuList.js");

var _Popover = require("@ringcentral/juno/es6/components/Popover/Popover.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");

var _Ignore = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Ignore.js"));

var _Voicemail = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Voicemail.js"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));

var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));

var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 170px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ForwardActiveList = _styledComponents["default"].div(_templateObject());

var WebRTCNotificationSection = function WebRTCNotificationSection(_ref) {
  var call = _ref.call,
      onCloseNotification = _ref.onCloseNotification,
      currentNotificationIdentify = _ref.currentNotificationIdentify,
      logName = _ref.logName,
      subContactNameDisplay = _ref.subContactNameDisplay,
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
      clickForwardTrack = _ref$clickForwardTrac === void 0 ? function () {} : _ref$clickForwardTrac,
      renderCallNotificationAvatar = _ref.renderCallNotificationAvatar,
      displayEntity = _ref.displayEntity,
      entityType = _ref.entityType,
      getAvatarUrl = _ref.getAvatarUrl,
      entityDetailLink = _ref.entityDetailLink;

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
  }, [call.result]);
  (0, _react.useEffect)(function () {
    if (displayEntity && displayEntity.hasProfileImage && !displayEntity.profileImageUrl) {
      getAvatarUrl(displayEntity).then(function (url) {
        setAvatarUrl(url);
      });
    }
  }, [displayEntity]);
  var displayMatchedEntity = displayEntity ? _objectSpread(_objectSpread({}, displayEntity), {}, {
    profileImageUrl: avatarUrl
  }) : null;

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
    }, renderCallNotificationAvatar === null || renderCallNotificationAvatar === void 0 ? void 0 : renderCallNotificationAvatar(displayMatchedEntity, entityType), /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "logName",
      title: logName,
      className: _styles["default"].contact
    }, entityDetailLink ? /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
      variant: "inherit",
      onClick: function onClick() {
        return window.open(entityDetailLink, '_blank');
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
      handleClose(); // TODO: check that type, should switch to getAttribute

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
    return /*#__PURE__*/_react["default"].createElement(_Popover.RcPopover, {
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
    }, /*#__PURE__*/_react["default"].createElement(_MenuList.RcMenuList, null, forwardList.map(function (_ref2) {
      var text = _ref2.text,
          subText = _ref2.subText,
          onClick = _ref2.onClick,
          key = _ref2.key;
      return /*#__PURE__*/_react["default"].createElement(_MenuItem.RcMenuItem, {
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
