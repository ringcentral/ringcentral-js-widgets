'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _formatDuration = require('../../lib/formatDuration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

var _Download = require('../../assets/images/Download.svg');

var _Download2 = _interopRequireDefault(_Download);

var _Play = require('../../assets/images/Play.svg');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('../../assets/images/Pause.svg');

var _Pause2 = _interopRequireDefault(_Pause);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audiosMap = {};

var VoicemailPlayer = function (_Component) {
  (0, _inherits3.default)(VoicemailPlayer, _Component);

  function VoicemailPlayer(props) {
    (0, _classCallCheck3.default)(this, VoicemailPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VoicemailPlayer.__proto__ || (0, _getPrototypeOf2.default)(VoicemailPlayer)).call(this, props));

    _this.state = {
      playing: false,
      paused: false,
      progress: 0
    };

    _this._id = (props.uri && props.uri.split('?')[0].split('/').pop()) + '/' + new Date().getTime();
    _this._audio = new Audio();
    _this._audio.preload = false;
    _this._audio.volume = 1;
    audiosMap[_this._id] = _this._audio;
    _this._audio.addEventListener('timeupdate', function () {
      if (!_this._mounted) {
        return;
      }
      _this.setState({
        progress: _this._audio.currentTime / _this._audio.duration
      });
    });

    _this._audio.addEventListener('ended', function () {
      if (!_this._mounted) {
        return;
      }
      _this.setState({
        playing: false
      });
      _this._audio.isPlaying = false;
    });

    _this._audio.addEventListener('pause', function () {
      if (!_this._mounted) {
        return;
      }
      _this.setState({
        paused: true,
        playing: false
      });
      _this._audio.isPlaying = false;
    });

    _this._audio.addEventListener('play', function () {
      if (!_this._mounted) {
        return;
      }
      _this.setState({
        playing: true,
        paused: false
      });
      _this._audio.isPlaying = true;
    });

    _this._audio.addEventListener('error', function () {
      console.error(_this._audio.error);
    });

    _this._playAudio = function () {
      if (_this.state.playing) {
        return;
      }
      if (!_this.state.paused) {
        _this._audio.src = _this.props.uri;
        _this._audio.load(_this.props.uri);
        _this._audio.currentTime = 0;
      }
      _this._pauseOtherAudios();
      _this._audio._playPromise = _this._audio.play();
      if (typeof _this.props.onPlay === 'function') {
        _this.props.onPlay();
      }
    };

    _this._pauseAudio = function () {
      if (_this.state.paused) {
        return;
      }
      if (_this._audio._playPromise !== undefined) {
        _this._audio._playPromise.then(function () {
          _this._audio.pause();
        });
      }
    };

    _this._onDownloadClick = function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
      }
    };
    return _this;
  }

  (0, _createClass3.default)(VoicemailPlayer, [{
    key: '_pauseOtherAudios',
    value: function _pauseOtherAudios() {
      var _this2 = this;

      (0, _keys2.default)(audiosMap).forEach(function (id) {
        if (id === _this2._id) {
          return;
        }
        var otherAudio = audiosMap[id];
        if (otherAudio.isPlaying && otherAudio._playPromise) {
          otherAudio._playPromise.then(function () {
            otherAudio.pause();
          });
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      this._audio.currentTime = 0;
      this._audio.pause();
      delete audiosMap[this._id];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          duration = _props.duration,
          uri = _props.uri,
          disabled = _props.disabled,
          currentLocale = _props.currentLocale;

      var icon = void 0;
      if (this.state.playing) {
        icon = _react2.default.createElement(
          _Button2.default,
          {
            className: (0, _classnames2.default)(_styles2.default.play, disabled ? _styles2.default.disabled : null),
            onClick: this._pauseAudio,
            disabled: disabled
          },
          _react2.default.createElement(
            'span',
            { title: _i18n2.default.getString('pause', currentLocale) },
            _react2.default.createElement(_Pause2.default, { width: 18, height: 18 })
          )
        );
      } else {
        icon = _react2.default.createElement(
          _Button2.default,
          {
            className: (0, _classnames2.default)(_styles2.default.play, disabled ? _styles2.default.disabled : null),
            onClick: this._playAudio,
            disabled: disabled
          },
          _react2.default.createElement(
            'span',
            { title: _i18n2.default.getString('play', currentLocale) },
            _react2.default.createElement(_Play2.default, { width: 18, height: 18 })
          )
        );
      }
      var currentTime = this._audio.currentTime < duration ? this._audio.currentTime : duration;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        icon,
        _react2.default.createElement(
          'span',
          { className: _styles2.default.startTime },
          (0, _formatDuration2.default)(currentTime)
        ),
        _react2.default.createElement(
          'a',
          {
            className: (0, _classnames2.default)(_styles2.default.download, disabled ? _styles2.default.disabled : null),
            target: '_blank',
            download: true,
            title: _i18n2.default.getString('download', currentLocale),
            href: uri,
            onClick: this._onDownloadClick
          },
          _react2.default.createElement(_Download2.default, { width: 18, height: 18 })
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.endTime },
          (0, _formatDuration2.default)(duration)
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.progress },
          _react2.default.createElement('div', { className: _styles2.default.all }),
          _react2.default.createElement('div', { className: _styles2.default.done, style: { width: this.state.progress * 100 + '%' } }),
          _react2.default.createElement('div', { className: _styles2.default.current, style: { left: this.state.progress * 100 + '%' } })
        )
      );
    }
  }]);
  return VoicemailPlayer;
}(_react.Component);

VoicemailPlayer.propTypes = {
  duration: _propTypes2.default.number,
  uri: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  onPlay: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  currentLocale: _propTypes2.default.string.isRequired
};

VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false
};

exports.default = VoicemailPlayer;
//# sourceMappingURL=index.js.map
