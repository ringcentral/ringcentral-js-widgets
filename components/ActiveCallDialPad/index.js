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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveCallDialPad = function (_Component) {
  (0, _inherits3.default)(ActiveCallDialPad, _Component);

  function ActiveCallDialPad(props) {
    (0, _classCallCheck3.default)(this, ActiveCallDialPad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallDialPad.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallDialPad)).call(this, props));

    _this.state = {
      value: ''
    };
    _this.onButtonOutput = function (key) {
      _this.setState(function (preState) {
        var value = preState.value + key;
        _this.props.onChange(key);
        return { value: value };
      });
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallDialPad, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: this.props.hiddenDialPad
          },
          _i18n2.default.getString('keypad', this.props.currentLocale)
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.dialInput },
          _react2.default.createElement('input', {
            className: _styles2.default.input,
            value: this.state.value
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.padContainer },
          _react2.default.createElement(_DialPad2.default, {
            className: _styles2.default.dialPad,
            onButtonOutput: this.onButtonOutput
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.buttonRow },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.button },
              _react2.default.createElement(_CircleButton2.default, {
                className: _styles2.default.stopButton,
                onClick: this.props.onHangup,
                icon: _End2.default,
                showBorder: false
              })
            )
          )
        )
      );
    }
  }]);
  return ActiveCallDialPad;
}(_react.Component);

ActiveCallDialPad.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  hiddenDialPad: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

exports.default = ActiveCallDialPad;
//# sourceMappingURL=index.js.map
