"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.date.to-iso-string");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _reactWidgetsMoment = _interopRequireDefault(require("react-widgets-moment"));

var _DateTimePicker = _interopRequireDefault(require("react-widgets/lib/DateTimePicker"));

require("react-widgets/dist/css/react-widgets.css");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _this._handleDocumentClick = function (e) {
      if (!_this.mounted) {
        return;
      }

      if (_this.date && _this.date.contains(e.target)) {
        return;
      }

      var open = false;

      _this.setState({
        open: open
      });
    };

    _this.onClickFunc = function () {
      var open = !!_this.date.querySelector('.rw-open');
      var openState = !open ? 'date' : false;

      if (!_this.state.open) {
        window.addEventListener('click', _this._handleDocumentClick, false);
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
      }

      _this.setState({
        open: openState
      });
    };

    _this.collapseDatePicker = function () {
      _this.setState({
        open: false
      });
    };

    _moment.default.locale(_this.props.currentLocale);

    (0, _reactWidgetsMoment.default)();
    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentLocale = this.props.currentLocale;
      var dueDate = new Date().toISOString();
      var showDate = this.props.date ? (0, _moment.default)(this.props.date).format('MM/DD/YY') : '';
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.datePicker, this.props.datePickerClassName),
        ref: function ref(_ref) {
          _this2.date = _ref;
        }
      }, _react.default.createElement(_DateTimePicker.default, {
        className: "dateTimePicker",
        culture: currentLocale,
        time: false,
        open: this.state.open,
        value: this.props.date,
        onChange: function onChange(currentStartTime) {
          if (currentStartTime) {
            var date = new Date(dueDate);
            date.setFullYear(currentStartTime.getFullYear(), currentStartTime.getMonth(), currentStartTime.getDate());

            _this2.props.onChange(date);
          }

          _this2.collapseDatePicker();
        },
        format: "MM/DD/YY",
        min: new Date(),
        onToggle: function onToggle() {}
      }), _react.default.createElement("div", {
        onClick: function onClick() {
          return _this2.onClickFunc();
        },
        className: (0, _classnames.default)(_styles.default.dateText, this.props.dateTextClassName)
      }, "".concat(this.props.label, ": ").concat(showDate)));
    }
  }]);

  return DatePicker;
}(_react.Component);

exports.default = DatePicker;
DatePicker.propTypes = {
  currentLocale: _propTypes.default.string,
  label: _propTypes.default.string,
  date: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func,
  datePickerClassName: _propTypes.default.string,
  dateTextClassName: _propTypes.default.string
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
