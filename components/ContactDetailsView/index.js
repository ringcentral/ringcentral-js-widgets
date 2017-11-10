'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var ContactDetailsView = function (_Component) {
  (0, _inherits3.default)(ContactDetailsView, _Component);

  function ContactDetailsView() {
    (0, _classCallCheck3.default)(this, ContactDetailsView);
    return (0, _possibleConstructorReturn3.default)(this, (ContactDetailsView.__proto__ || (0, _getPrototypeOf2.default)(ContactDetailsView)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContactDetailsView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getAvatarUrl(this.props.contactItem);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          showSpinner = _props.showSpinner,
          contactItem = _props.contactItem,
          getAvatarUrl = _props.getAvatarUrl,
          getPresence = _props.getPresence,
          onBackClick = _props.onBackClick,
          onClickToSMS = _props.onClickToSMS,
          onClickToDial = _props.onClickToDial,
          onClickToGmail = _props.onClickToGmail;

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
  }]);
  return ContactDetailsView;
}(_react.Component);

exports.default = ContactDetailsView;


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
