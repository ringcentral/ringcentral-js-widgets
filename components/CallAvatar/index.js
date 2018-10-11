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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Spinner = require('../../assets/images/Spinner.svg');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEXP_BLOB_URL = /^blob:.+\/[\w-]{36,}(?:#.+)?$/;
var REGEXP_BASE64_URL = /^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/gi;

function isBlobURL(value) {
  return REGEXP_BLOB_URL.test(value);
}

function isBase64(value) {
  return REGEXP_BASE64_URL.test(value);
}

var CallAvatar = function (_Component) {
  (0, _inherits3.default)(CallAvatar, _Component);

  function CallAvatar(props) {
    (0, _classCallCheck3.default)(this, CallAvatar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallAvatar.__proto__ || (0, _getPrototypeOf2.default)(CallAvatar)).call(this, props));

    _this.state = {
      avatarUrl: null
    };
    _this._mounted = false;
    return _this;
  }

  (0, _createClass3.default)(CallAvatar, [{
    key: 'loadImg',
    value: function loadImg() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var avatarUrl = props.avatarUrl;


      if (isBase64(avatarUrl)) {
        this.setState({
          avatarUrl: avatarUrl
        });
        return;
      }

      // means we have to load it
      if (!this._mounted) {
        return;
      }
      if (avatarUrl) {
        var $img = document.createElement('img');
        $img.src = avatarUrl;
        $img.onload = function () {
          if (!_this2._mounted) {
            return;
          }
          _this2.setState({
            avatarUrl: avatarUrl
          });
        };
        $img.onerror = function () {
          if (!_this2._mounted) {
            return;
          }
          _this2.setState({
            avatarUrl: null
          });
        };
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadImg();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      if (!this.state.avatarUrl) {
        this.loadImg();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.avatarUrl !== this.props.avatarUrl) {
        this.loadImg(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          extraNum = _props.extraNum,
          isOnConferenceCall = _props.isOnConferenceCall,
          spinnerMode = _props.spinnerMode,
          className = _props.className,
          onClick = _props.onClick;
      var avatarUrl = this.state.avatarUrl;

      var initialSize = 38;
      var margin = 4;
      var avatarCircleRadius = 15;
      var extraNumCircleRadius = 8.5;
      var extraNumCircleBorder = 1;
      var circleBorder = 1;
      var $snow = '#fff';
      var $blueLight = '#cee7f2';
      var $blue = '#0684bd';
      var $dark = '#e2e2e2';
      var $transparency = '0.8';
      var defaultAvatarStyle = { opacity: +$transparency };
      var hash = _uuid2.default.v4();
      var portraitChar = '\uE904'; // HACK: &#xe904; is the font code for the portrait icon
      var iconFont = 'dynamics_icon'; // Hard coding this for firefox to load iconfont
      var textId = 'text-' + hash;
      var clipId = 'circleClip-' + hash;
      var avatarStyle = { stroke: $dark, strokeWidth: circleBorder + 'px' };
      var showingSpinner = spinnerMode;
      var aspectRatio = 'xMidYMid meet';
      var xmlns = 'http://www.w3.org/2000/svg';
      var svgCls = (0, _classnames2.default)(_styles2.default.callAvatar, onClick ? _styles2.default.autoPointerEvents : _styles2.default.disabledPointerEvents, className);
      // spinner sizing
      var spinnerId = 'spinner-' + hash;
      var spinnerScaleSize = 1.5;
      var spinnerSize = 12;
      var spinnerTranslateTo = (initialSize - spinnerSize * spinnerScaleSize) / 2;
      var isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;
      var spinnerTransform = 'translate(' + (spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0)) + ',' + spinnerTranslateTo + ') scale(' + spinnerScaleSize + ', ' + spinnerScaleSize + ')';

      if (isOnConferenceCallWithExtraNum) {
        return _react2.default.createElement(
          'svg',
          {
            onClick: onClick ? function () {
              return onClick();
            } : null,
            className: svgCls,
            style: avatarUrl ? avatarStyle : null,
            viewBox: '0 0 ' + initialSize + ' ' + initialSize,
            preserveAspectRatio: aspectRatio,
            xmlns: xmlns
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'g',
              { id: textId },
              _react2.default.createElement(
                'text',
                {
                  x: '0',
                  y: '0',
                  dy: initialSize - 10 + 'px',
                  style: {
                    fontSize: avatarCircleRadius * 2 + 'px',
                    fill: $blue,
                    opacity: '.5'
                  },
                  fontFamily: iconFont
                },
                portraitChar
              )
            ),
            _react2.default.createElement(_Spinner2.default, { id: spinnerId })
          ),
          _react2.default.createElement('circle', {
            cx: avatarCircleRadius,
            cy: margin + avatarCircleRadius,
            r: avatarCircleRadius,
            fill: $snow,
            stroke: showingSpinner ? $dark : 'inherit',
            strokeOpacity: showingSpinner ? $transparency : '1'
          }),
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
              'clipPath',
              { id: clipId },
              _react2.default.createElement('circle', {
                cx: avatarCircleRadius,
                cy: margin + avatarCircleRadius,
                r: avatarCircleRadius,
                fill: $snow })
            )
          ),
          showingSpinner && _react2.default.createElement(
            'g',
            { transform: spinnerTransform },
            _react2.default.createElement('use', { xlinkHref: '#' + spinnerId })
          ),
          avatarUrl && _react2.default.createElement('image', { clipPath: 'url(#' + clipId + ')', height: '100%', width: '100%', xlinkHref: avatarUrl }),
          !avatarUrl && !showingSpinner && _react2.default.createElement('use', {
            xlinkHref: '#' + textId,
            clipPath: 'url(#' + clipId + ')',
            style: defaultAvatarStyle
          }),
          _react2.default.createElement('circle', {
            cx: initialSize - extraNumCircleRadius,
            cy: extraNumCircleRadius,
            r: extraNumCircleRadius,
            fill: $snow }),
          _react2.default.createElement('circle', {
            cx: initialSize - extraNumCircleRadius,
            cy: extraNumCircleRadius,
            r: extraNumCircleRadius - extraNumCircleBorder,
            fill: $blueLight }),
          _react2.default.createElement(
            'text',
            {
              x: initialSize - extraNumCircleRadius,
              y: extraNumCircleRadius,
              dy: '3px',
              textAnchor: 'middle',
              style: {
                fontSize: '9px',
                stroke: 'none',
                fill: $blue,
                fontWeight: 'bolder',
                opacity: '.5'
              } },
            '+' + extraNum
          )
        );
      }
      return _react2.default.createElement(
        'svg',
        {
          className: svgCls,
          onClick: onClick ? function () {
            return onClick();
          } : null,
          style: avatarUrl ? avatarStyle : null,
          viewBox: '0 0 ' + initialSize + ' ' + initialSize,
          preserveAspectRatio: aspectRatio,
          xmlns: xmlns
        },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'g',
            { id: textId },
            _react2.default.createElement(
              'text',
              {
                x: '0',
                y: '0',
                dy: initialSize - 10 + 'px',
                dx: '2',
                style: {
                  fontSize: (initialSize / 2 - 2) * 2 + 'px',
                  fill: $blue,
                  opacity: '.5'
                },
                fontFamily: iconFont
              },
              portraitChar
            )
          ),
          _react2.default.createElement(_Spinner2.default, { id: spinnerId })
        ),
        _react2.default.createElement('circle', {
          cx: initialSize / 2,
          cy: initialSize / 2,
          r: initialSize / 2 - circleBorder,
          fill: $snow,
          stroke: showingSpinner ? $dark : 'inherit',
          strokeOpacity: showingSpinner ? $transparency : '1'
        }),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'clipPath',
            { id: clipId },
            _react2.default.createElement('circle', {
              cx: initialSize / 2,
              cy: initialSize / 2,
              r: initialSize / 2 - 1
            })
          )
        ),
        showingSpinner && _react2.default.createElement(
          'g',
          { transform: spinnerTransform },
          _react2.default.createElement('use', { xlinkHref: '#' + spinnerId })
        ),
        showingSpinner && _react2.default.createElement(
          'g',
          { transform: spinnerTransform },
          _react2.default.createElement('use', { xlinkHref: '#' + spinnerId })
        ),
        avatarUrl && _react2.default.createElement('image', {
          clipPath: 'url(#' + clipId + ')',
          height: '100%',
          width: '100%',
          xlinkHref: avatarUrl,
          preserveAspectRatio: 'xMinYMin slice' }),
        !avatarUrl && !showingSpinner && _react2.default.createElement('use', {
          xlinkHref: '#' + textId,
          clipPath: 'url(#' + clipId + ')',
          style: defaultAvatarStyle
        })
      );
    }
  }]);
  return CallAvatar;
}(_react.Component);

CallAvatar.propTypes = {
  isOnConferenceCall: _propTypes2.default.bool,
  avatarUrl: _propTypes2.default.string,
  extraNum: _propTypes2.default.number,
  /**
   * Set to true to make it always show the loading spinner.
   */
  spinnerMode: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

CallAvatar.defaultProps = {
  isOnConferenceCall: false,
  avatarUrl: null,
  extraNum: 0,
  spinnerMode: false,
  className: null,
  onClick: null
};

exports.default = CallAvatar;
//# sourceMappingURL=index.js.map
