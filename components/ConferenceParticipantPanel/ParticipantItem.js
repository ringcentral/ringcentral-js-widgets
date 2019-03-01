"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _MediaObject = _interopRequireDefault(require("../MediaObject"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: extract the common stucture from `CallItem` & `ActiveCallItem` and this one, since they
 * are just `Media Objects`.
 */
function ParticipantItem(_ref) {
  var detail = _ref.detail,
      avatarUrl = _ref.avatarUrl,
      onRemove = _ref.onRemove,
      currentLocale = _ref.currentLocale;
  return _react.default.createElement(_MediaObject.default, {
    containerCls: _styles.default.participantItem,
    mediaLeft: _react.default.createElement("div", {
      className: _styles.default.avatar
    }, _react.default.createElement(_CallAvatar.default, {
      isOnConferenceCall: false,
      avatarUrl: avatarUrl
    })),
    mediaBody: _react.default.createElement("div", {
      title: detail,
      className: _styles.default.detail
    }, detail),
    mediaRight: _react.default.createElement("span", {
      title: _i18n.default.getString('removeParticipant', currentLocale),
      className: _styles.default.webphoneButton
    }, _react.default.createElement(_CircleButton.default, {
      className: _styles.default.rejectButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        onRemove();
      },
      iconWidth: 260,
      iconX: 120,
      icon: _End.default,
      showBorder: false
    }))
  });
}

ParticipantItem.propTypes = {
  detail: _propTypes.default.string.isRequired,
  avatarUrl: _propTypes.default.string,
  onRemove: _propTypes.default.func,
  currentLocale: _propTypes.default.string.isRequired
};
ParticipantItem.defaultProps = {
  avatarUrl: null,
  onRemove: function onRemove(i) {
    return i;
  }
};
var _default = ParticipantItem;
exports.default = _default;
//# sourceMappingURL=ParticipantItem.js.map
