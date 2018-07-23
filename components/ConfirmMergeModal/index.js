'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConfirmMergeModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _CloseIcon = require('../../assets/images/CloseIcon.svg');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

var _MergeIntoConferenceIcon = require('../../assets/images/MergeIntoConferenceIcon.svg');

var _MergeIntoConferenceIcon2 = _interopRequireDefault(_MergeIntoConferenceIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfirmMergeModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onMerge = _ref.onMerge,
      onCancel = _ref.onCancel,
      partyProfiles = _ref.partyProfiles;

  var avatarUrls = partyProfiles.map(function (profile) {
    return profile.avatarUrl;
  });
  return _react2.default.createElement(
    _Modal2.default,
    {
      show: show,
      headerClassName: _styles2.default.header,
      currentLocale: currentLocale,
      className: _styles2.default.confirmMergeModal,
      modalClassName: _styles2.default.confirmMergeModal,
      cancelBtnClassName: _styles2.default.cancelBtn,
      confirmBtnClassName: _styles2.default.confirmBtn,
      title: _i18n2.default.getString('confirmation', currentLocale),
      closeBtn: _react2.default.createElement(
        _Button2.default,
        {
          className: _styles2.default.closeBtn,
          onClick: onCancel
        },
        _react2.default.createElement(_CloseIcon2.default, null)
      )
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.contentText },
      _i18n2.default.getString('confirmMergeToConference', currentLocale)
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.contentText },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.avatar },
          _react2.default.createElement(_CallAvatar2.default, {
            avatarUrl: avatarUrls[0],
            isOnConferenceCall: true,
            extraNum: avatarUrls.length - 1 })
        ),
        _react2.default.createElement(
          'span',
          null,
          _i18n2.default.getString('conferenceCall', currentLocale)
        )
      ),
      _react2.default.createElement(
        'span',
        { title: _i18n2.default.getString('mergeToConference', currentLocale), className: _styles2.default.webphoneButton },
        _react2.default.createElement(_CircleButton2.default, {
          className: _styles2.default.mergeButton,
          onClick: function onClick(e) {
            e.stopPropagation();
            onMerge();
          },
          iconWidth: 260,
          iconX: 120,
          icon: _MergeIntoConferenceIcon2.default,
          showBorder: false
        })
      )
    )
  );
}
ConfirmMergeModal.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  show: _propTypes2.default.bool.isRequired,
  onMerge: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  partyProfiles: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

ConfirmMergeModal.defaultProps = {
  onMerge: function onMerge() {},
  onCancel: function onCancel() {},

  partyProfiles: []
};
//# sourceMappingURL=index.js.map
