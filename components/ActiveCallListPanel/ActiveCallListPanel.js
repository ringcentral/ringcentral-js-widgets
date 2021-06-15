"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallListPanel = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SmallCallControl = require("../SmallCallControl");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");

var _SelectList = require("../SelectList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActiveCallListPanel = function ActiveCallListPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      isOnMute = _ref.isOnMute,
      showMuteButton = _ref.showMuteButton,
      callList = _ref.callList,
      goBack = _ref.goBack,
      _onHangup = _ref.onHangup,
      _onUnHold = _ref.onUnHold,
      _onHold = _ref.onHold,
      onMute = _ref.onMute,
      onUnmute = _ref.onUnmute,
      userName = _ref.userName,
      isInbound = _ref.isInbound;

  var callListRender = function callListRender() {
    if (callList.length < 2) return null;

    var _callList = _toArray(callList),
        everyoneCaller = _callList[0],
        ownCall = _callList[1],
        transferCalls = _callList.slice(2);

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].item,
      "data-sign": "callItem"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].emphasisCallInfo
    }, _i18n["default"].getString('everyone', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].controlButtons
    }, /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HangUpButton, {
      currentLocale: currentLocale,
      onHangup: function onHangup() {
        return _onHangup(everyoneCaller);
      },
      className: _styles["default"].button,
      size: "small"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].item,
      "data-sign": "callItem"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].otherCallInfo, _styles["default"].children)
    }, (0, _FormatPhoneNumber.formatPhoneNumber)({
      phoneNumber: everyoneCaller.session.phone,
      currentLocale: currentLocale
    }), "(".concat(_i18n["default"].getString(isInbound ? 'caller' : 'callee', currentLocale), ")")), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].controlButtons
    }, /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HoldCallButton, {
      currentLocale: currentLocale,
      isOnHold: everyoneCaller.isHold,
      onUnHold: function onUnHold() {
        return _onUnHold(everyoneCaller);
      },
      onHold: function onHold() {
        return _onHold(everyoneCaller);
      },
      className: _styles["default"].button,
      size: "small"
    }), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HangUpButton, {
      currentLocale: currentLocale,
      onHangup: function onHangup() {
        return _onHangup(everyoneCaller);
      },
      className: _styles["default"].button,
      size: "small"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].item,
      "data-sign": "callItem"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].emphasisCallInfo, _styles["default"].children)
    }, "".concat(ownCall.agentName || userName || '', "(").concat(_i18n["default"].getString('me', currentLocale), ")")), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].controlButtons
    }, showMuteButton && /*#__PURE__*/_react["default"].createElement(_SmallCallControl.MuteCallButton, {
      isOnMute: isOnMute,
      onMute: onMute,
      onUnmute: onUnmute,
      currentLocale: currentLocale,
      className: _styles["default"].button,
      size: "small"
    }), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HangUpButton, {
      currentLocale: currentLocale,
      onHangup: function onHangup() {
        return _onHangup(ownCall);
      },
      className: _styles["default"].button,
      size: "small"
    }))), transferCalls.map(function (callItem, key) {
      var _callItem$session$tra, _callItem$session$tra2;

      var destination = (_callItem$session$tra = callItem.session.transferSessions) === null || _callItem$session$tra === void 0 ? void 0 : (_callItem$session$tra2 = _callItem$session$tra[callItem.session.sessionId]) === null || _callItem$session$tra2 === void 0 ? void 0 : _callItem$session$tra2.destination;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].item,
        "data-sign": "callItem",
        key: key
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])(_styles["default"].otherCallInfo, _styles["default"].children)
      }, (0, _FormatPhoneNumber.formatPhoneNumber)({
        phoneNumber: destination,
        currentLocale: currentLocale
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].controlButtons
      }, /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HoldCallButton, {
        currentLocale: currentLocale,
        isOnHold: callItem.isHold,
        onUnHold: function onUnHold() {
          return _onUnHold(callItem);
        },
        onHold: function onHold() {
          return _onHold(callItem);
        },
        className: _styles["default"].button,
        size: "small"
      }), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HangUpButton, {
        currentLocale: currentLocale,
        onHangup: function onHangup() {
          return _onHangup(callItem);
        },
        className: _styles["default"].button,
        size: "small"
      })));
    }));
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_SelectList.BackHeader, {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('activeCall', currentLocale),
    onBackClick: goBack
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list,
    "data-sign": "callList"
  }, callListRender()));
};

exports.ActiveCallListPanel = ActiveCallListPanel;
//# sourceMappingURL=ActiveCallListPanel.js.map
