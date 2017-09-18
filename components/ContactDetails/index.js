'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactItemPropTypes = undefined;
exports.default = ContactDetails;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContactDetails(_ref) {
  var currentLocale = _ref.currentLocale,
      contactItem = _ref.contactItem,
      getAvatarUrl = _ref.getAvatarUrl,
      getPresence = _ref.getPresence,
      onClickToSMS = _ref.onClickToSMS,
      onClickToDial = _ref.onClickToDial,
      onClickToGmail = _ref.onClickToGmail;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(
      'p',
      null,
      'Id: ',
      contactItem.id
    ),
    _react2.default.createElement(
      'p',
      null,
      'Type: ',
      contactItem.type
    ),
    _react2.default.createElement(
      'p',
      null,
      'Name: ',
      contactItem.firstName + ' ' + contactItem.lastName
    ),
    contactItem.phoneNumbers.map(function (item, index) {
      return _react2.default.createElement(
        'p',
        { key: index },
        item.phoneType,
        ': ',
        item.phoneNumber
      );
    })
  );
}

var contactItemPropTypes = exports.contactItemPropTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  type: _propTypes2.default.string.isRequired,
  firstName: _propTypes2.default.string,
  lastName: _propTypes2.default.string,
  email: _propTypes2.default.string,
  hasProfileImage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  phoneNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    phoneType: _propTypes2.default.string
  }))
};

ContactDetails.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contactItem: _propTypes2.default.shape(contactItemPropTypes).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onClickToSMS: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToGmail: _propTypes2.default.func
};

ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickToGmail: undefined
};
//# sourceMappingURL=index.js.map
