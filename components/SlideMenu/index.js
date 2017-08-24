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

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToggleButton(_ref) {
  var onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: _styles2.default.toggleButton,
      onClick: onClick
    },
    _react2.default.createElement('div', { className: _styles2.default.toggleButtonInner }),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.toggleButtonIcon },
      _react2.default.createElement('span', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow) })
    )
  );
}
ToggleButton.propTypes = {
  onClick: _propTypes2.default.func
};
ToggleButton.defaultProps = {
  onClick: undefined
};

var SlideMenu = function (_Component) {
  (0, _inherits3.default)(SlideMenu, _Component);

  function SlideMenu(props) {
    (0, _classCallCheck3.default)(this, SlideMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SlideMenu.__proto__ || (0, _getPrototypeOf2.default)(SlideMenu)).call(this, props));

    _this.onMouseEnter = function () {
      _this._timestamp = Date.now();
      _this.setState({
        expanded: true
      });
    };

    _this.onMouseLeave = function () {
      _this.setState({
        expanded: false
      });
    };

    _this.onToggle = function () {
      /* On touch enabled devices or devices with pen inputs, click/touch will trigger
       * mouseenter event before the click event, in that case, we simply ignore
       * the click event.
       */
      if (Date.now() - _this._timestamp > 30) {
        _this.setState({
          expanded: !_this.state.expanded
        });
      }
    };

    _this.state = {
      expanded: false
    };
    return _this;
  }

  (0, _createClass3.default)(SlideMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
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
          children = _props.children,
          className = _props.className,
          minWidth = _props.minWidth,
          maxWidth = _props.maxWidth;
      var expanded = this.state.expanded;


      var wrapperStyles = {
        width: expanded ? maxWidth : minWidth
      };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className, expanded && _styles2.default.expanded),
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.wrapper, style: wrapperStyles },
          _react2.default.createElement(
            'div',
            {
              className: _styles2.default.content
            },
            children
          )
        ),
        _react2.default.createElement(ToggleButton, { onClick: this.onToggle })
      );
    }
  }]);
  return SlideMenu;
}(_react.Component);

exports.default = SlideMenu;


SlideMenu.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  minWidth: _propTypes2.default.number,
  maxWidth: _propTypes2.default.number
};
SlideMenu.defaultProps = {
  className: undefined,
  children: undefined,
  minWidth: 0,
  maxWidth: 100
};
//# sourceMappingURL=index.js.map
