'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button(props) {
    (0, _classCallCheck3.default)(this, Button);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, props));

    _this._mounted = false;

    _this.state = {
      disabled: false
    };
    return _this;
  }

  (0, _createClass3.default)(Button, [{
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
    key: 'onClick',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._mounted) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                this.setState({
                  disabled: true
                });

                _context.next = 5;
                return this.props.onClick();

              case 5:

                if (this._mounted) {
                  this.setState({
                    disabled: false
                  });
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onClick() {
        return _ref.apply(this, arguments);
      }

      return onClick;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          children = _props.children,
          tooltip = _props.tooltip,
          dataSign = _props.dataSign;


      var realDisabled = disabled || this.state.disabled;

      return _react2.default.createElement(
        'div',
        {
          'data-sign': dataSign,
          className: (0, _classnames2.default)(className, _styles2.default.root, realDisabled && _styles2.default.disabled),
          onClick: realDisabled ? null : function () {
            return _this2.onClick();
          },
          title: tooltip },
        children
      );
    }
  }]);
  return Button;
}(_react.Component), _class.propTypes = {
  className: _propTypes2.default.string,
  tooltip: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.node,
  dataSign: _propTypes2.default.string
}, _class.defaultProps = {
  className: undefined,
  tooltip: '',
  disabled: false,
  onClick: undefined,
  children: undefined,
  dataSign: undefined
}, _temp);
exports.default = Button;
//# sourceMappingURL=index.js.map
