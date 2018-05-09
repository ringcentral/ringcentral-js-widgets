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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactWidgetsMoment = require('react-widgets-moment');

var _reactWidgetsMoment2 = _interopRequireDefault(_reactWidgetsMoment);

var _DateTimePicker = require('react-widgets/lib/DateTimePicker');

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

require('react-widgets/dist/css/react-widgets.css');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_Component) {
  (0, _inherits3.default)(DatePicker, _Component);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

    _this.onClickFunc = function () {
      var open = !!document.querySelector('.rw-open');
      if (!open) {
        _this.date.inner.toggle();
      } else {
        _this.date.inner.close();
      }
    };

    _moment2.default.locale(_this.props.currentLocale);
    (0, _reactWidgetsMoment2.default)();
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentLocale = this.props.currentLocale;

      var dueDate = new Date().toISOString();
      var showDate = this.props.date ? (0, _moment2.default)(this.props.date).format('MM/DD/YY') : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.datePicker, this.props.datePickerClassName) },
        _react2.default.createElement(_DateTimePicker2.default, {
          culture: currentLocale,
          time: false,
          value: this.props.date,
          onChange: function onChange(currentStartTime) {
            if (currentStartTime) {
              var date = new Date(dueDate);
              date.setFullYear(currentStartTime.getFullYear());
              date.setMonth(currentStartTime.getMonth());
              date.setDate(currentStartTime.getDate());
              _this2.props.onChange(date);
            }
          },
          ref: function ref(_ref) {
            _this2.date = _ref;
          },
          format: 'MM/DD/YY',
          min: new Date()
        }),
        _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              return _this2.onClickFunc();
            },
            className: (0, _classnames2.default)(_styles2.default.dateText, this.props.dateTextClassName) },
          this.props.label,
          ':',
          showDate
        )
      );
    }
  }]);
  return DatePicker;
}(_react.Component);

exports.default = DatePicker;

DatePicker.propTypes = {
  currentLocale: _propTypes2.default.string,
  label: _propTypes2.default.string,
  date: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func,
  datePickerClassName: _propTypes2.default.string,
  dateTextClassName: _propTypes2.default.string
};
DatePicker.defaultProps = {
  currentLocale: 'en-US',
  label: '',
  date: null,
  onChange: undefined,
  datePickerClassName: '',
  dateTextClassName: ''
};
//# sourceMappingURL=index.js.map
