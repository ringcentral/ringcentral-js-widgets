'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

var _MediaObject = require('../MediaObject');

var _MediaObject2 = _interopRequireDefault(_MediaObject);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

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

  return _react2.default.createElement(_MediaObject2.default, {
    containerCls: _styles2.default.participantItem,
    mediaLeft: _react2.default.createElement(
      'div',
      { className: _styles2.default.avatar },
      _react2.default.createElement(_CallAvatar2.default, { isOnConferenceCall: false, avatarUrl: avatarUrl })
    ),
    mediaBody: detail,
    bodyCls: _styles2.default.detail,
    mediaRight: _react2.default.createElement(
      'span',
      { title: _i18n2.default.getString('removeParticipant', currentLocale), className: _styles2.default.webphoneButton },
      _react2.default.createElement(_CircleButton2.default, {
        className: _styles2.default.rejectButton,
        onClick: function onClick(e) {
          e.stopPropagation();
          onRemove();
        },
        iconWidth: 260,
        iconX: 120,
        icon: _End2.default,
        showBorder: false
      })
    )
  });
}

ParticipantItem.propTypes = {
  detail: _propTypes2.default.string.isRequired,
  avatarUrl: _propTypes2.default.string,
  onRemove: _propTypes2.default.func,
  currentLocale: _propTypes2.default.string.isRequired
};

ParticipantItem.defaultProps = {
  avatarUrl: null,
  onRemove: function onRemove(i) {
    return i;
  }
};

exports.default = ParticipantItem;
//# sourceMappingURL=ParticipantItem.js.map
