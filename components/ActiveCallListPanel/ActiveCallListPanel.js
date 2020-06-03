"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallListPanel = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _BackHeaderV = _interopRequireDefault(require("ringcentral-widgets/components/BackHeaderV2"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SmallCallControl = require("../SmallCallControl");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActiveCallListPanel = function ActiveCallListPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goBack = _ref.goBack,
      callList = _ref.callList,
      _onHangup = _ref.onHangup,
      _onUnHold = _ref.onUnHold,
      _onHold = _ref.onHold;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('activeCall', currentLocale),
    onBackClick: goBack,
    className: _styles["default"].backHeader
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list,
    "data-sign": "callList"
  }, callList.map(function (callItem, key) {
    var _callItem$session$tra, _callItem$session$tra2, _callItem$session$tra3;

    var index = key > 1 ? 2 : key;
    var infos = [/*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].emphasisCallInfo
    }, _i18n["default"].getString('everyone', currentLocale)), /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].emphasisCallInfo, _styles["default"].children)
    }, _i18n["default"].getString('justMe', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].otherCallInfo, _styles["default"].children)
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].name
    }, (_callItem$session$tra = (_callItem$session$tra2 = callItem.session.transferSessions) === null || _callItem$session$tra2 === void 0 ? void 0 : (_callItem$session$tra3 = _callItem$session$tra2[callItem.session.sessionId]) === null || _callItem$session$tra3 === void 0 ? void 0 : _callItem$session$tra3.destination) !== null && _callItem$session$tra !== void 0 ? _callItem$session$tra : null), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].phoneNumber
    }))];
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].item,
      "data-sign": "callItem",
      key: key
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].info
    }, infos[index]), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].controlButtons
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].hide)
    }), key > 0 ? /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HoldCallButton, {
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
    }) : /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].hide)
    }), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HandUpButton, {
      currentLocale: currentLocale,
      onHangup: function onHangup() {
        return _onHangup(callItem);
      },
      className: _styles["default"].button,
      size: "small"
    })));
  })));
};

exports.ActiveCallListPanel = ActiveCallListPanel;
//# sourceMappingURL=ActiveCallListPanel.js.map
