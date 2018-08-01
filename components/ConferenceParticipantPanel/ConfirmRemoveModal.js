'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConfirmRemoveModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CloseIcon = require('../../assets/images/CloseIcon.svg');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfirmRemoveModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onRemove = _ref.onRemove,
      onCancel = _ref.onCancel,
      detail = _ref.detail;

  if (!detail) {
    return null;
  }
  if (detail.calleeType === _calleeTypes2.default.contacts) {
    detail = detail.toUserName;
  } else {
    detail = detail.partyNumber;
  }
  return _react2.default.createElement(
    _Modal2.default,
    {
      show: show,
      headerClassName: _styles2.default.header,
      currentLocale: currentLocale,
      className: _styles2.default.ConfirmRemoveModal,
      modalClassName: _styles2.default.ConfirmRemoveModal,
      title: _i18n2.default.getString('removeParticipant', currentLocale),
      onConfirm: onRemove,
      onCancel: onCancel,
      clickOutToClose: true,
      contentClassName: _styles2.default.contentText,
      textConfirm: _i18n2.default.getString('remove', currentLocale)
    },
    _react2.default.createElement(
      'p',
      null,
      _i18n2.default.getString('confirmStr1', currentLocale),
      _react2.default.createElement(
        'span',
        null,
        ' ' + detail + ' '
      ),
      _i18n2.default.getString('confirmStr2', currentLocale)
    )
  );
}

ConfirmRemoveModal.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  show: _propTypes2.default.bool.isRequired,
  onCancel: _propTypes2.default.func,
  onRemove: _propTypes2.default.func,
  detail: _propTypes2.default.object
};

ConfirmRemoveModal.defaultProps = {
  onRemove: function onRemove() {},
  onCancel: function onCancel() {},

  detail: null
};
//# sourceMappingURL=ConfirmRemoveModal.js.map
