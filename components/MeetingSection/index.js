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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeetingSection = function (_Component) {
  (0, _inherits3.default)(MeetingSection, _Component);

  function MeetingSection() {
    var _ref;

    (0, _classCallCheck3.default)(this, MeetingSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = MeetingSection.__proto__ || (0, _getPrototypeOf2.default)(MeetingSection)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      toggle: _this.props.toggle
    };
    return _this;
  }

  (0, _createClass3.default)(MeetingSection, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          title = _props.title,
          withSwitch = _props.withSwitch,
          className = _props.className,
          hideTopBorderLine = _props.hideTopBorderLine;

      var toggle = function toggle() {
        _this2.setState({ toggle: !_this2.state.toggle });
      };
      var Title = function Title() {
        return title ? _react2.default.createElement(
          'span',
          { className: _styles2.default.title },
          title
        ) : null;
      };
      var DropDown = function DropDown(_ref2) {
        var isDropDown = _ref2.isDropDown,
            onClick = _ref2.onClick;
        return withSwitch ? _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)(isDropDown ? _styles2.default.dropDown : null),
            onClick: onClick },
          _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.arrow) })
        ) : null;
      };
      var topBorderLine = hideTopBorderLine ? _styles2.default.hiddenTopBorder : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.section, topBorderLine, className) },
        title ? _react2.default.createElement(
          'div',
          { className: _styles2.default.spaceBetween },
          _react2.default.createElement(Title, null),
          _react2.default.createElement(DropDown, { isDropDown: this.state.toggle, onClick: toggle })
        ) : null,
        this.state.toggle ? children : null
      );
    }
  }]);
  return MeetingSection;
}(_react.Component);

MeetingSection.propTypes = {
  children: _propTypes2.default.element.isRequired,
  title: _propTypes2.default.string,
  className: _propTypes2.default.string,
  withSwitch: _propTypes2.default.bool,
  toggle: _propTypes2.default.bool,
  hideTopBorderLine: _propTypes2.default.bool
};

MeetingSection.defaultProps = {
  className: null,
  title: null,
  withSwitch: false,
  toggle: true,
  hideTopBorderLine: false
};

exports.default = MeetingSection;
//# sourceMappingURL=index.js.map
