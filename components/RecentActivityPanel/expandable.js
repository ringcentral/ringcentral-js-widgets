'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

exports.default = expandable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expandable(_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? null : _ref$className;

  return function (WrappedComponent) {
    return function (_PureComponent) {
      (0, _inherits3.default)(Expandable, _PureComponent);

      function Expandable(props) {
        (0, _classCallCheck3.default)(this, Expandable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Expandable.__proto__ || (0, _getPrototypeOf2.default)(Expandable)).call(this, props));

        _this.togglePanel = function (event) {
          // In case it's fired twice
          event.stopPropagation();
          _this.setState(function (prevState) {
            return { expanded: !prevState.expanded };
          });
        };

        _this.state = {
          expanded: false
        };
        return _this;
      }

      (0, _createClass3.default)(Expandable, [{
        key: 'render',
        value: function render() {
          var expanded = this.state.expanded;

          var _styles = (0, _assign2.default)({}, styles, {
            height: expanded ? styles.height : styles.offset
          });
          return _react2.default.createElement(
            'div',
            {
              style: _styles,
              className: className
            },
            _react2.default.createElement(WrappedComponent, (0, _extends3.default)({
              onPanelToggle: this.togglePanel,
              expanded: expanded
            }, this.props))
          );
        }
      }]);
      return Expandable;
    }(_react.PureComponent);
  };
}
//# sourceMappingURL=expandable.js.map
