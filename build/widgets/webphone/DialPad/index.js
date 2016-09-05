'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _googleLibphonenumber = require('google-libphonenumber');

var _googleLibphonenumber2 = _interopRequireDefault(_googleLibphonenumber);

var _AutoComplete = require('../../shared/AutoComplete/');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _Icon = require('../../shared/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Dialer = require('../Dialer');

var _Dialer2 = _interopRequireDefault(_Dialer);

var _CallerBar = require('../CallerBar');

var _CallerBar2 = _interopRequireDefault(_CallerBar);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const incoming = '../../../assets/audio/incoming.ogg';
// const outgoing = '../../../assets/audio/incoming.ogg';

var _prefix = (0, _style2.default)(['main', 'container', 'line', 'bar', 'callButton', 'phoneInput'], 'DialPad');

var main = _prefix.main;
var container = _prefix.container;
var line = _prefix.line;
var bar = _prefix.bar;
var callButton = _prefix.callButton;
var phoneInput = _prefix.phoneInput;

var DialPad = function (_React$PureComponent) {
  _inherits(DialPad, _React$PureComponent);

  function DialPad() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DialPad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DialPad)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      dialingNumber: '',
      caller: _this.props.userNumbers ? _this.props.userNumbers[0] : null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DialPad, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.props.userNumbers[0]) {
        this.setDefaultCaller(this.props.userNumbers);
      }
      this.phoneUtil = _googleLibphonenumber2.default.PhoneNumberUtil.getInstance();
      this.boundHandleChange = function (number) {
        return _this2.handleChange(number);
      };
      this.boundHandleClick = function (number) {
        return _this2.handleClick(number);
      };
      this.boundHandleCallClick = function (event) {
        return _this2.handleCallClick(event);
      };
      this.boundCaller = function (number) {
        return _this2.caller(number);
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.caller && nextProps.userNumbers[0]) {
        this.setDefaultCaller(nextProps.userNumbers);
      }
      // if (this.props.disabled && !nextProps.disabled) {
      //   this.props.loadRingAudio({
      //     incoming,
      //     outgoing,
      //   });
      // }
    }
  }, {
    key: 'setDefaultCaller',
    value: function setDefaultCaller(numbers) {
      this.setState({ caller: numbers[0] });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(number) {
      this.dial(number);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(number) {
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(number) > -1) {
        this.dial(this.state.dialingNumber + number);
      }
    }
  }, {
    key: 'handleCallClick',
    value: function handleCallClick(event) {
      var toNumberInstance = this.phoneUtil.parse(this.state.dialingNumber, 'US');
      var fromNumberInstance = this.phoneUtil.parse(this.state.caller.phoneNumber, 'US');
      if (this.phoneUtil.isValidNumber(toNumberInstance)) {
        this.props.call({
          toNumber: this.phoneUtil.format(toNumberInstance, _googleLibphonenumber2.default.PhoneNumberFormat.E164),
          fromNumber: this.phoneUtil.format(fromNumberInstance, _googleLibphonenumber2.default.PhoneNumberFormat.E164),
          media: {
            remote: this.props.remoteMedia,
            local: this.props.localMedia
          }
        });
      } else {
        console.error(this.state.dialingNumber + ' not a valid phone number');
        // TODO: SHOW ERROR
      }
    }
  }, {
    key: 'dial',
    value: function dial(dialingNumber) {
      this.setState({ dialingNumber: dialingNumber });
    }
  }, {
    key: 'caller',
    value: function caller(_caller) {
      this.setState({ caller: _caller });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(main, container) },
        _react2.default.createElement(
          'div',
          { className: bar },
          _react2.default.createElement(_CallerBar2.default, {
            setCaller: this.boundCaller,
            caller: this.state.caller,
            numbers: this.props.userNumbers,
            getString: this.props.getString
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_AutoComplete2.default, {
              className: phoneInput,
              onChange: this.boundHandleChange,
              value: this.state.dialingNumber,
              items: this.props.contacts
            }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Dialer2.default, { handleClick: this.boundHandleClick })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: line },
            _react2.default.createElement(
              'button',
              {
                className: callButton,
                onClick: this.boundHandleCallClick
              },
              _react2.default.createElement(_Icon2.default, { id: 'icon-uniAE' })
            )
          )
        )
      );
    }
  }]);

  return DialPad;
}(_react2.default.PureComponent);

DialPad.propTypes = {
  disabled: _react2.default.PropTypes.bool,
  contacts: _react2.default.PropTypes.array,
  userNumbers: _react2.default.PropTypes.array,
  call: _react2.default.PropTypes.func,
  remoteMedia: _react2.default.PropTypes.any,
  localMedia: _react2.default.PropTypes.any,
  getString: _react2.default.PropTypes.func,
  loadRingAudio: _react2.default.PropTypes.func
};
DialPad.defaultProps = {
  userNumbers: [],
  contacts: []
};
exports.default = DialPad;