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

function ExtendIcon(_ref2) {
  var onClick = _ref2.onClick,
      extendIconClassName = _ref2.extendIconClassName;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.extendIcon, onClick: onClick },
    _react2.default.createElement('div', { className: (0, _classnames2.default)(_styles2.default.extendInner, extendIconClassName) })
  );
}

var SlideMenu = function (_Component) {
  (0, _inherits3.default)(SlideMenu, _Component);

  function SlideMenu(props) {
    (0, _classCallCheck3.default)(this, SlideMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SlideMenu.__proto__ || (0, _getPrototypeOf2.default)(SlideMenu)).call(this, props));

    _this.onToggle = function (e) {
      e.stopPropagation();
      _this.setState(function (prevState) {
        return { extended: !prevState.extended };
      });
      if (_this.props.onToggle) {
        _this.props.onToggle(e);
      }
    };

    _this.state = {
      extended: false
    };
    return _this;
  }

  (0, _createClass3.default)(SlideMenu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.extended !== this.props.extended) {
        this.setState({
          extended: nextProps.extended
        });
      }
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
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          minHeight = _props.minHeight,
          maxHeight = _props.maxHeight,
          children = _props.children;
      var extended = this.state.extended;


      var wrapperStyles = {
        height: extended ? maxHeight : minHeight
      };

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className)
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
        _react2.default.createElement(ExtendIcon, {
          extendIconClassName: extended ? (0, _classnames2.default)(_styles2.default.extended, this.props.extendIconClassName) : null,
          onClick: this.onToggle })
      );
    }
  }]);
  return SlideMenu;
}(_react.Component);

exports.default = SlideMenu;


SlideMenu.propTypes = {
  children: _propTypes2.default.node,
  extended: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  className: _propTypes2.default.string,
  extendIconClassName: _propTypes2.default.string,
  minHeight: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number
};
SlideMenu.defaultProps = {
  className: undefined,
  extendIconClassName: undefined,
  children: undefined,
  minHeight: 0,
  maxHeight: 100
};
//# sourceMappingURL=index.js.map
