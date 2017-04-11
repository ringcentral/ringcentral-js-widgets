'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RecipientHeader = require('../RecipientHeader');

var _RecipientHeader2 = _interopRequireDefault(_RecipientHeader);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Recipient(props) {
  return _react2.default.createElement(
    'a',
    { href: '#recipient', className: _styles2.default.recipient, onClick: props.onClick },
    props.name
  );
}

Recipient.propTypes = {
  name: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired
};

function RecipientList(props) {
  var recipients = props.recipients;
  return _react2.default.createElement(
    'div',
    { className: props.className },
    recipients.map(function (receiver) {
      return _react2.default.createElement(Recipient, {
        key: '' + receiver.extensionNumber + receiver.phoneNumber + receiver.name,
        name: props.getRecipientName(receiver),
        onClick: function onClick() {
          return props.setDefaultRecipient(receiver.extensionNumber || receiver.phoneNumber);
        }
      });
    })
  );
}

RecipientList.propTypes = {
  getRecipientName: _react.PropTypes.func.isRequired,
  setDefaultRecipient: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string.isRequired,
  recipients: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string,
    extensionNumber: _react.PropTypes.string,
    name: _react.PropTypes.string
  })).isRequired
};

var RecipientsHeader = function (_Component) {
  (0, _inherits3.default)(RecipientsHeader, _Component);

  function RecipientsHeader(props) {
    (0, _classCallCheck3.default)(this, RecipientsHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecipientsHeader.__proto__ || (0, _getPrototypeOf2.default)(RecipientsHeader)).call(this, props));

    _this.state = {
      showDropdownList: false
    };
    _this.toggleDropdown = function () {
      _this.setState(function (preState) {
        return {
          showDropdownList: !preState.showDropdownList
        };
      });
    };
    _this.setDefaultRecipient = function (phoneNumber) {
      _this.context.changeDefaultRecipient(phoneNumber);
      _this.setState(function (preState) {
        return {
          showDropdownList: !preState.showDropdownList
        };
      });
    };
    return _this;
  }

  (0, _createClass3.default)(RecipientsHeader, [{
    key: 'render',
    value: function render() {
      var recipients = this.props.recipients;
      console.debug('!!!', recipients);
      if (recipients.length === 0) {
        return null;
      }
      var dropdownClass = _styles2.default.dropdownList;
      var dropdownArrowClass = (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.dropdownIcon);
      if (recipients.length === 1) {
        return _react2.default.createElement(
          'h1',
          { className: _styles2.default.container },
          _react2.default.createElement(_RecipientHeader2.default, {
            recipient: recipients[0],
            currentLocale: this.props.currentLocale,
            dropdownClassName: dropdownClass
          })
        );
      }
      var defaultRecipient = recipients[0];
      if (this.state.showDropdownList) {
        dropdownClass = (0, _classnames2.default)(dropdownClass, _styles2.default.active);
        dropdownArrowClass = (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.dropdownActiveIcon);
      }
      return _react2.default.createElement(
        'h1',
        { className: _styles2.default.container },
        _react2.default.createElement(Recipient, {
          name: this.context.getRecipientName(defaultRecipient),
          onClick: this.toggleDropdown
        }),
        _react2.default.createElement('i', {
          className: dropdownArrowClass,
          onClick: this.toggleDropdown
        }),
        _react2.default.createElement(RecipientList, {
          recipients: recipients,
          className: dropdownClass,
          setDefaultRecipient: this.setDefaultRecipient,
          getRecipientName: this.context.getRecipientName
        })
      );
    }
  }]);
  return RecipientsHeader;
}(_react.Component);

RecipientsHeader.propTypes = {
  recipients: RecipientList.propTypes.recipients,
  currentLocale: _react.PropTypes.string.isRequired
};

RecipientsHeader.contextTypes = {
  getRecipientName: _react.PropTypes.func.isRequired,
  changeDefaultRecipient: _react.PropTypes.func.isRequired
};

exports.default = RecipientsHeader;
//# sourceMappingURL=index.js.map
