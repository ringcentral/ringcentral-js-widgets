'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContactDetailsView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SpinnerOverlay = require('../../components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _BackHeader = require('../../components/BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../../components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _ContactDetails = require('../ContactDetails');

var _ContactDetails2 = _interopRequireDefault(_ContactDetails);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContactDetailsView(_ref) {
  var currentLocale = _ref.currentLocale,
      showSpinner = _ref.showSpinner,
      contactItem = _ref.contactItem,
      getAvatarUrl = _ref.getAvatarUrl,
      getPresence = _ref.getPresence,
      onBackClick = _ref.onBackClick,
      onClickToSMS = _ref.onClickToSMS,
      onClickToDial = _ref.onClickToDial,
      onClickToGmail = _ref.onClickToGmail;

  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_ContactDetails2.default, {
    currentLocale: currentLocale,
    getAvatarUrl: getAvatarUrl,
    getPresence: getPresence,
    contactItem: contactItem,
    onClickToSMS: onClickToSMS,
    onClickToDial: onClickToDial,
    onClickToGmail: onClickToGmail
  });

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(
      _BackHeader2.default,
      {
        buttons: [],
        onBackClick: onBackClick
      },
      _i18n2.default.getString('contactDetails', currentLocale)
    ),
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.content },
      content
    )
  );
}

ContactDetailsView.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  contactItem: _propTypes2.default.shape(_ContactDetails.contactItemPropTypes).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onBackClick: _propTypes2.default.func,
  onClickToSMS: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToGmail: _propTypes2.default.func
};

ContactDetailsView.defaultProps = {
  onBackClick: undefined,
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickToGmail: undefined
};
//# sourceMappingURL=index.js.map
