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

var _audios = require('../DialButton/audios');

var _audios2 = _interopRequireDefault(_audios);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cleanRegex = /[^\d*#]/g;
var filter = function filter(value) {
  return value.replace(cleanRegex, '');
};

var MAX_PASTE_LENGTH = 15;

var ActiveCallDialPad = function (_Component) {
  (0, _inherits3.default)(ActiveCallDialPad, _Component);

  function ActiveCallDialPad(props) {
    (0, _classCallCheck3.default)(this, ActiveCallDialPad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallDialPad.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallDialPad)).call(this, props));

    _this.state = {
      value: ''
    };

    if (typeof document !== 'undefined' && document.createElement) {
      _this.audio = document.createElement('audio');
    }

    _this.playAudio = function (value) {
      if (_this.audio && _this.audio.canPlayType('audio/ogg') !== '' && _audios2.default[value]) {
        if (!_this.audio.paused) {
          _this.audio.pause();
        }
        _this.audio.src = _audios2.default[value];
        _this.audio.currentTime = 0;
        _this.audio.play();
      }
    };

    _this.onButtonOutput = function (key) {
      _this.setState(function (preState) {
        var value = preState.value + key;
        _this.props.onChange(key);
        return { value: value };
      });
    };

    _this.sendDTMFKeys = function (keys) {
      if (keys === '') {
        return;
      }
      keys.split('').forEach(function (key, index) {
        setTimeout(function () {
          _this.playAudio(key);
          _this.props.onChange(key);
        }, 100 * index);
      });
    };

    _this.onChange = function (e) {
      var value = filter(e.currentTarget.value);
      _this.setState({ value: value });
    };

    _this.onKeyDown = function (e) {
      var value = filter(e.key);
      _this.sendDTMFKeys(value);
    };

    _this.onPaste = function (e) {
      var item = e.clipboardData.items[0];
      item.getAsString(function (data) {
        var value = filter(data);
        var keys = value;
        if (value.length > MAX_PASTE_LENGTH) {
          keys = value.slice(0, MAX_PASTE_LENGTH);
        }
        _this.sendDTMFKeys(keys);
        if (value.length > MAX_PASTE_LENGTH) {
          _this.setState(function (preState) {
            return {
              value: preState.value.replace(value, keys)
            };
          });
        }
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
            value: this.state.value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            onPaste: this.onPaste,
            autoFocus: true // eslint-disable-line
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
