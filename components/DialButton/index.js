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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _audios = require('./audios');

var _audios2 = _interopRequireDefault(_audios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _this.audio.volume = _this.props.volume;
        _this.audio.muted = _this.props.muted;
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
      var isSpecial = this.props.btn.value === '*';
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
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
              r: '191'
            }),
            _react2.default.createElement(
              'text',
              {
                className: (0, _classnames2.default)(_styles2.default.btnValue, isSpecial ? _styles2.default.special : null),
                x: '0',
                dx: '205',
                y: '0',
                dy: isSpecial ? 350 : 250
              },
              this.props.btn.value
            ),
            _react2.default.createElement(
              'text',
              {
                className: _styles2.default.btnText,
                x: '0',
                dx: this.props.btn.dx,
                y: '0',
                dy: '360' },
              this.props.btn.text
            )
          )
        )
      );
    }
  }]);
  return DialButton;
}(_react.Component);

exports.default = DialButton;


DialButton.propTypes = {
  btn: _propTypes2.default.shape({
    value: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string,
    alternativeValue: _propTypes2.default.string,
    dx: _propTypes2.default.string
  }).isRequired,
  className: _propTypes2.default.string,
  onPress: _propTypes2.default.func,
  onOutput: _propTypes2.default.func,
  alternativeTimeout: _propTypes2.default.number,
  volume: _propTypes2.default.number,
  muted: _propTypes2.default.bool
};

DialButton.defaultProps = {
  className: null,
  onPress: undefined,
  onOutput: undefined,
  alternativeTimeout: undefined,
  volume: 1,
  muted: false
};
//# sourceMappingURL=index.js.map
