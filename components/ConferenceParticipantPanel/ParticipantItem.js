"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _MediaObject = _interopRequireDefault(require("../MediaObject"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ParticipantItem = function ParticipantItem(_ref) {
  var detail = _ref.detail,
      avatarUrl = _ref.avatarUrl,
      onRemove = _ref.onRemove,
      currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement(_MediaObject["default"], {
    containerCls: _styles["default"].participantItem,
    bodyCls: _styles["default"].mediaBodyCls,
    mediaLeft: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].avatar
    }, /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      isOnConferenceCall: false,
      avatarUrl: avatarUrl
    })),
    mediaBody: /*#__PURE__*/_react["default"].createElement("div", {
      title: detail,
      className: _styles["default"].detail
    }, detail),
    mediaRight: /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('removeParticipant', currentLocale),
      className: _styles["default"].webphoneButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: _styles["default"].rejectButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        onRemove();
      },
      iconWidth: 260,
      iconX: 120,
      icon: _End["default"],
      showBorder: false
    }))
  });
};

ParticipantItem.defaultProps = {
  avatarUrl: null,
  onRemove: function onRemove(i) {
    return i;
  }
};
var _default = ParticipantItem;
exports["default"] = _default;
//# sourceMappingURL=ParticipantItem.js.map
