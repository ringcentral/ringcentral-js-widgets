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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SCROLL_INTERVAL = 5000;

var CarrouselBar = function (_Component) {
  (0, _inherits3.default)(CarrouselBar, _Component);

  function CarrouselBar(props) {
    (0, _classCallCheck3.default)(this, CarrouselBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CarrouselBar.__proto__ || (0, _getPrototypeOf2.default)(CarrouselBar)).call(this, props));

    _this.state = {
      currentIndex: 0,
      showAnimation: false,
      animationMode: 'move',
      hoverBar: false
    };
    return _this;
  }

  (0, _createClass3.default)(CarrouselBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setInterval(function () {
        if (!_this2.props.hoverBar) {
          _this2.setState(function (prevState) {
            return {
              currentIndex: prevState.currentIndex >= _this2.validChildren.length - 1 ? 0 : prevState.currentIndex + 1,
              showAnimation: true,
              animationMode: prevState.animationMode === 'move' ? 'moveOn' : 'move',
              hoverBar: false
            };
          });
        }
      }, this.props.scrollInterval);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.children !== this.props.children) {
        this.validChildren = this.getValidChildren(nextProps.children);
      }
      if (nextProps.hoverBar !== this.props.hoverBar && !!nextProps.hoverBar) {
        this.setState(function () {
          return {
            hoverBar: true
          };
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }, {
    key: 'getValidChildren',
    value: function getValidChildren(children) {
      // .toArray automatically removes invalid React children
      return _react2.default.Children.toArray(children);
    }
  }, {
    key: 'render',
    value: function render() {
      this.validChildren = this.getValidChildren(this.props.children);
      if (this.validChildren.length < 2) {
        return this.props.children;
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: this.state.showAnimation && !this.state.hoverBar ? _styles2.default[this.state.animationMode] : _styles2.default.center },
          this.validChildren[this.state.currentIndex]
        )
      );
    }
  }]);
  return CarrouselBar;
}(_react.Component);

exports.default = CarrouselBar;


CarrouselBar.propTypes = {
  children: _propTypes2.default.node,
  scrollInterval: _propTypes2.default.number,
  hoverBar: _propTypes2.default.bool
};
CarrouselBar.defaultProps = {
  children: undefined,
  scrollInterval: DEFAULT_SCROLL_INTERVAL,
  hoverBar: false
};
//# sourceMappingURL=index.js.map
