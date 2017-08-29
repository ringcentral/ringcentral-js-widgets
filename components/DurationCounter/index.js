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

var _formatDuration = require('../../lib/formatDuration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DurationCounter = function (_Component) {
  (0, _inherits3.default)(DurationCounter, _Component);

  function DurationCounter(props) {
    (0, _classCallCheck3.default)(this, DurationCounter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DurationCounter.__proto__ || (0, _getPrototypeOf2.default)(DurationCounter)).call(this, props));

    _this.state = _this.calculateState();
    return _this;
  }

  (0, _createClass3.default)(DurationCounter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.setState(_this2.calculateState());
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      var startTime = this.props.startTime + this.props.offset;
      return {
        duration: Math.round((new Date().getTime() - startTime) / 1000)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: this.props.className },
        (0, _formatDuration2.default)(this.state.duration)
      );
    }
  }]);
  return DurationCounter;
}(_react.Component);

exports.default = DurationCounter;


DurationCounter.propTypes = {
  className: _propTypes2.default.string,
  startTime: _propTypes2.default.number.isRequired,
  offset: _propTypes2.default.number
};

DurationCounter.defaultProps = {
  className: null,
  offset: 0
};
//# sourceMappingURL=index.js.map
