"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireWildcard(require("react"));

var _bindDebonce = require("../../lib/bindDebonce");

var _bindNextPropsUpdate = require("../../lib/bindNextPropsUpdate");

var _CustomArrowButton = require("../Rcui/CustomArrowButton");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InputSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(InputSelect, _Component);

  function InputSelect(props) {
    var _this;

    _classCallCheck(this, InputSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputSelect).call(this, props));
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_assertThisInitialized(_this));
    _this.debonce = (0, _bindDebonce.bindDebonce)(_assertThisInitialized(_this), _this.props.timeout);
    _this.wrapper = void 0;

    _this._renderPickList = function () {
      var subjectPicklist = _this.props.subjectPicklist;
      var expand = _this.state.expand;

      if (!expand) {
        return null;
      }

      return _react["default"].createElement("div", {
        className: _styles["default"].select
      }, _react["default"].createElement(_rcui.RcList, null, subjectPicklist.map(function (option, i) {
        return _react["default"].createElement(_rcui.RcListItem, {
          key: i,
          button: true,
          singleLine: true,
          onClick: function onClick() {
            return _this.onSelectChange(option);
          },
          "data-sign": "match".concat(i)
        }, _react["default"].createElement(_rcui.RcListItemText, {
          primary: option,
          classes: {
            primary: _styles["default"].listText
          }
        }));
      })));
    };

    _this.onSelectChange = function (subject) {
      _this.setState({
        subject: subject
      }, function () {
        _this.debonce(function () {
          if (_this.props.onSelectOption) {
            _this.props.onSelectOption();
          }

          _this.props.onChange(_this.state.subject).then(function () {
            return _this.props.onSave();
          });
        }, 0);
      });

      _this.toggleDropDownList();
    };

    _this.toggleDropDownList = function () {
      var expand = _this.state.expand;

      if (!expand) {
        window.addEventListener('click', _this._handleDocumentClick, false);
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
      }

      _this.setState({
        expand: !expand
      });
    };

    _this._handleDocumentClick = function (e) {
      if (_this.wrapper && _this.wrapper.contains(e.target)) {
        return;
      }

      _this.toggleDropDownList();
    };

    _this.state = {
      subject: _this.props.subject,
      expand: false
    };
    return _this;
  }

  _createClass(InputSelect, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.checkPropsUpdate(nextProps, 'subject');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          subjectPicklist = _this$props.subjectPicklist,
          required = _this$props.required;
      var _this$state$subject = this.state.subject,
          subject = _this$state$subject === void 0 ? '' : _this$state$subject;
      var hasError = required && subject.trim() === '';
      return _react["default"].createElement("div", {
        className: _styles["default"].root,
        ref: function ref(_ref) {
          _this2.wrapper = _ref;
        }
      }, _react["default"].createElement(_rcui.RcTextField, {
        label: "Subject",
        "data-sign": "subject",
        title: subject,
        fullWidth: true,
        required: required,
        value: subject,
        error: hasError,
        inputProps: {
          maxLength: 255
        },
        onChange: function onChange(e) {
          return _this2.updateValue(e.target.value, 500);
        },
        endAdornment: function endAdornment(disabled) {
          return subjectPicklist.length > 0 && _react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
            icon: "arrow_down",
            disabled: disabled,
            onClick: _this2.toggleDropDownList
          });
        }
      }), this._renderPickList());
    }
  }, {
    key: "updateValue",
    value: function updateValue(subject, time) {
      var _this3 = this;

      this.setState({
        subject: subject
      }, function () {
        _this3.debonce(function () {
          _this3.props.onChange(_this3.state.subject).then(function () {
            _this3.debonce(function () {
              return _this3.props.onSave();
            }, _this3.props.timeout - time);
          });
        }, time);
      });
    }
  }]);

  return InputSelect;
}(_react.Component);

exports["default"] = InputSelect;
InputSelect.defaultProps = {
  required: false,
  subjectPicklist: [],
  subject: null,
  onChange: undefined,
  onSave: undefined,
  timeout: 500,
  onSelectOption: undefined
};
//# sourceMappingURL=InputSelect.js.map
