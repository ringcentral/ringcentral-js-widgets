'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactTransitionGroup = require('react-transition-group');

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlStyles = {
  entered: { transform: 'translateY(0)' }
};

var UserGuide = function (_React$Component) {
  (0, _inherits3.default)(UserGuide, _React$Component);

  function UserGuide(props) {
    (0, _classCallCheck3.default)(this, UserGuide);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UserGuide.__proto__ || (0, _getPrototypeOf2.default)(UserGuide)).call(this, props));

    _this.slideTo = function (idx) {
      if (idx > _this.props.guides.length - 1) {
        _this.exit();
        return;
      }
      _this.setState({
        curIdx: idx
      });
      _this.props.updateCarousel({
        curIdx: idx,
        entered: _this.state.entered,
        playing: _this.state.playing
      });
    };

    _this.exit = function () {
      _this.setState({
        playing: false
      });
      _this.props.updateCarousel({
        curIdx: _this.state.curIdx,
        entered: _this.state.entered,
        playing: false
      });
    };

    _this.onExited = function () {
      _this.setState({
        entered: false
      });
      _this.props.updateCarousel({
        curIdx: 0,
        entered: false,
        playing: false
      });
    };

    _this.state = {
      curIdx: props.curIdx || 0,
      entered: props.entered || false,
      playing: props.playing || false
    };
    return _this;
  }

  (0, _createClass3.default)(UserGuide, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var curIdx = nextProps.curIdx,
          entered = nextProps.entered,
          playing = nextProps.playing;

      if (this.state.curIdx !== curIdx) {
        this.setState({ curIdx: curIdx });
      }
      if (this.state.entered !== entered) {
        this.setState({ entered: entered });
      }
      if (this.state.playing !== playing) {
        this.setState({ playing: playing });
      }
    }
  }, {
    key: 'getIntroView',
    value: function getIntroView() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.intro },
        _react2.default.createElement('div', {
          className: _styles2.default.introBg,
          style: { backgroundImage: 'url(' + this.props.guides[0] + ')' }
        }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.buttonGroup },
          _react2.default.createElement(
            _Button2.default,
            {
              className: _styles2.default.primaryButton,
              onClick: function onClick() {
                _this2.slideTo(1);
              }
            },
            _i18n2.default.getString('start', this.props.currentLocale)
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: function onClick() {
                _this2.exit();
              },
              className: _styles2.default.secondaryButton
            },
            _i18n2.default.getString('skip', this.props.currentLocale)
          )
        )
      );
    }
  }, {
    key: 'getCarouselView',
    value: function getCarouselView() {
      var _this3 = this;

      var guides = this.props.guides.slice(1, this.props.guides.length);
      var imageView = guides.map(function (guide, i) {
        return _react2.default.createElement('div', {
          key: i,
          className: _styles2.default.view,
          style: {
            backgroundImage: 'url(' + guide + ')',
            transform: 'translateX(' + (i + 1) * 100 + 'vw)'
          }
        });
      });
      var indicatorView = guides.map(function (_, i) {
        var highlight = i + 1 === _this3.state.curIdx ? _styles2.default.highlight : null;
        return _react2.default.createElement('li', {
          key: i,
          className: (0, _classnames2.default)(_styles2.default.dot, highlight),
          onClick: function onClick() {
            _this3.slideTo(i + 1);
          }
        });
      });
      var onLastPage = this.state.curIdx === this.props.guides.length - 1;
      var skipButton = onLastPage ? _react2.default.createElement('div', { className: _styles2.default.secondaryButton }) : _react2.default.createElement(
        _Button2.default,
        {
          onClick: function onClick() {
            _this3.exit();
          },
          className: (0, _classnames2.default)(_styles2.default.secondaryButton)
        },
        _i18n2.default.getString('skip', this.props.currentLocale)
      );
      var nextButton = _react2.default.createElement(
        _Button2.default,
        {
          onClick: function onClick() {
            _this3.slideTo(_this3.state.curIdx + 1);
          },
          className: (0, _classnames2.default)(_styles2.default.primaryButton)
        },
        onLastPage ? _i18n2.default.getString('finish', this.props.currentLocale) : _i18n2.default.getString('next', this.props.currentLocale)
      );
      var controlView = _react2.default.createElement(
        _reactTransitionGroup.Transition,
        {
          'in': this.state.curIdx > 0,
          timeout: 300
        },
        function (state) {
          return _react2.default.createElement(
            'div',
            { className: _styles2.default.control, style: (0, _extends3.default)({}, controlStyles[state]) },
            skipButton,
            _react2.default.createElement(
              'ul',
              { className: _styles2.default.indicator },
              indicatorView
            ),
            nextButton
          );
        }
      );
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.carousel },
        _react2.default.createElement(
          'div',
          {
            className: _styles2.default.carouselBox,
            style: { transform: 'translateX(-' + this.state.curIdx * 100 + 'vw)' }
          },
          this.getIntroView(),
          imageView
        ),
        controlView
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.entered) return null;
      if (this.props.showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, null);
      }
      var view = this.getCarouselView();
      return _react2.default.createElement(
        _reactTransitionGroup.CSSTransition,
        {
          'in': this.state.playing,
          timeout: 400,
          classNames: {
            appear: _styles2.default.enter,
            appearActive: _styles2.default.enterActive,
            exit: _styles2.default.exit,
            exitActive: _styles2.default.exitActive
          },
          onExited: this.onExited,
          appear: true
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.root },
          view
        )
      );
    }
  }]);
  return UserGuide;
}(_react2.default.Component);

exports.default = UserGuide;


UserGuide.propTypes = {
  curIdx: _propTypes2.default.number,
  entered: _propTypes2.default.bool,
  playing: _propTypes2.default.bool,
  updateCarousel: _propTypes2.default.func,
  guides: _propTypes2.default.array.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

UserGuide.defaultProps = {
  curIdx: 0,
  entered: false,
  playing: false,
  updateCarousel: function updateCarousel() {
    return null;
  }
};
//# sourceMappingURL=index.js.map
