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

var ContactDetailsView = function (_PureComponent) {
  (0, _inherits3.default)(ContactDetailsView, _PureComponent);

  function ContactDetailsView() {
    (0, _classCallCheck3.default)(this, ContactDetailsView);
    return (0, _possibleConstructorReturn3.default)(this, (ContactDetailsView.__proto__ || (0, _getPrototypeOf2.default)(ContactDetailsView)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContactDetailsView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getContact();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.contactItem && nextProps.contactItem || nextProps.contactItem && nextProps.contactItem.id !== this.props.contactItem.id) {
        this.props.getPresence(nextProps.contactItem);
        this.props.getAvatar(nextProps.contactItem);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearContact();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          showSpinner = _props.showSpinner,
          contactItem = _props.contactItem,
          onBackClick = _props.onBackClick,
          onClickToSMS = _props.onClickToSMS,
          onClickToDial = _props.onClickToDial,
          onClickMailTo = _props.onClickMailTo,
          formatNumber = _props.formatNumber,
          sourceNodeRenderer = _props.sourceNodeRenderer,
          outboundSmsPermission = _props.outboundSmsPermission,
          internalSmsPermission = _props.internalSmsPermission,
          children = _props.children;

      if (!contactItem) return null;
      var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_ContactDetails2.default, {
        currentLocale: currentLocale,
        contactItem: contactItem,
        onClickToSMS: onClickToSMS,
        onClickToDial: onClickToDial,
        onClickMailTo: onClickMailTo,
        formatNumber: formatNumber,
        sourceNodeRenderer: sourceNodeRenderer,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission
      });

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            buttons: [],
            onBackClick: onBackClick,
            className: _styles2.default.header
          },
          _i18n2.default.getString('contactDetails', currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          content,
          children
        )
      );
    }
  }]);
  return ContactDetailsView;
}(_react.PureComponent);

exports.default = ContactDetailsView;


ContactDetailsView.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  contactItem: _propTypes2.default.shape(_ContactDetails.contactItemPropTypes),
  getContact: _propTypes2.default.func.isRequired,
  clearContact: _propTypes2.default.func.isRequired,
  getAvatar: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  onBackClick: _propTypes2.default.func,
  onClickToSMS: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickMailTo: _propTypes2.default.func,
  formatNumber: _propTypes2.default.func.isRequired,
  sourceNodeRenderer: _propTypes2.default.func,
  children: _propTypes2.default.node,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool
};

ContactDetailsView.defaultProps = {
  onBackClick: undefined,
  onClickToSMS: undefined,
  onClickToDial: undefined,
  children: undefined,
  contactItem: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  },
  outboundSmsPermission: false,
  internalSmsPermission: false
};
//# sourceMappingURL=index.js.map
