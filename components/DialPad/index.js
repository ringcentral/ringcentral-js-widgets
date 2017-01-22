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

exports.default = DialPad;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _audios = require('./audios');

var _audios2 = _interopRequireDefault(_audios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyConfig = [[{ value: '1', text: '' }, { value: '2', text: 'ABC' }, { value: '3', text: 'DEF' }], [{ value: '4', text: 'GHI' }, { value: '5', text: 'JKL' }, { value: '6', text: 'MON' }], [{ value: '7', text: 'PQRS' }, { value: '8', text: 'TUV' }, { value: '9', text: 'WXYZ' }], [{ value: '*', text: '' }, { value: '0', text: '+', alternativeValue: '+' }, { value: '#', text: '' }]];

var ALTERNATIVE_TIMEOUT = 1000;

var DialButton = function (_Component) {
  (0, _inherits3.default)(DialButton, _Component);

  function DialButton(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, DialButton);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = DialButton.__proto__ || (0, _getPrototypeOf2.default)(DialButton)).call.apply(_ref, [this, props].concat(args)));

    _this.state = {
      pressed: false
    };
    _this.timeout = null;
    if (typeof document !== 'undefined' && document.createElement && _audios2.default[props.btn.value]) {
      _this.audio = document.createElement('audio');
      _this.audio.src = _audios2.default[props.btn.value];
    }
    _this.onMouseDown = function () {
      if (_this.audio && _this.audio.canPlayType('audio/ogg') !== '') {
        _this.audio.currentTime = 0;
        _this.audio.play();
      }
      if (typeof _this.props.onPress === 'function') {
        _this.props.onPress(_this.props.btn.value);
      }

      _this.timeout = setTimeout(function () {
        if (_this.state.pressed) {
          if (_this.timeout) {
            clearTimeout(_this.timeout);
            _this.timeout = null;
          }
          if (typeof _this.props.onOutput === 'function') {
            _this.props.onOutput(_this.props.btn.alternativeValue || _this.props.btn.value);
          }
          _this.setState({
            pressed: false
          });
        }
      }, _this.props.alternativeTimeout || ALTERNATIVE_TIMEOUT);

      _this.setState({
        pressed: true
      });
    };
    _this.onMouseUp = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          _this.timeout = null;
        }
        if (typeof _this.props.onOutput === 'function') {
          _this.props.onOutput(_this.props.btn.value);
        }
        _this.setState({
          pressed: false
        });
      }
    };
    _this.onMouseLeave = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          _this.timeout = null;
        }
        _this.setState({
          pressed: false
        });
      }
    };
    return _this;
  }

  (0, _createClass3.default)(DialButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.btnPlaceholder },
        _react2.default.createElement(
          'svg',
          { className: _styles2.default.btnSvg, viewBox: '0 0 500 500' },
          _react2.default.createElement(
            'g',
            {
              className: (0, _classnames2.default)(_styles2.default.btnSvgGroup, this.state.pressed && _styles2.default.pressed),
              onMouseUp: this.onMouseUp,
              onMouseDown: this.onMouseDown,
              onMouseLeave: this.onMouseLeave },
            _react2.default.createElement('circle', {
              className: _styles2.default.circle,
              cx: '250',
              cy: '250',
              r: '200'
            }),
            _react2.default.createElement(
              'text',
              {
                className: _styles2.default.btnValue,
                x: '250',
                y: '280' },
              this.props.btn.value
            ),
            _react2.default.createElement(
              'text',
              {
                className: _styles2.default.btnText,
                x: '250',
                y: '380' },
              this.props.btn.text
            )
          )
        )
      );
    }
  }]);
  return DialButton;
}(_react.Component);

DialButton.propTypes = {
  btn: _react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    text: _react.PropTypes.string,
    alternativeValue: _react.PropTypes.string
  }).isRequired,
  audio: _react.PropTypes.string,
  onPress: _react.PropTypes.func,
  onOutput: _react.PropTypes.func,
  alternativeTimeout: _react.PropTypes.number
};

function DialPad(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    keyConfig.map(function (row, rowIdx) {
      return _react2.default.createElement(
        'div',
        { key: rowIdx, className: _styles2.default.row },
        row.map(function (btn) {
          if (props.hideSpecial && (btn.value === '*' || btn.value === '#')) {
            return _react2.default.createElement('div', { key: btn.value, className: _styles2.default.btnPlaceholder });
          }
          return _react2.default.createElement(DialButton, {
            key: btn.value,
            btn: btn,
            onPress: props.onButtonPress,
            onOutput: props.onButtonOutput,
            alternativeTimeout: props.alternativeTimeout
          });
        })
      );
    })
  );
}

DialPad.propTypes = {
  className: _react.PropTypes.string,
  hideSpecial: _react.PropTypes.bool,
  onButtonPress: _react.PropTypes.func,
  onButtonOutput: _react.PropTypes.func,
  alternativeTimeout: _react.PropTypes.number
};
//# sourceMappingURL=index.js.map
