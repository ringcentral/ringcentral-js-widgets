"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

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

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _iconArrow_down = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-arrow_down.svg"));

var _react = _interopRequireWildcard(require("react"));

var _bindDebounce = require("../../lib/bindDebounce");

var _bindNextPropsUpdate = require("../../lib/bindNextPropsUpdate");

var _CustomArrowButton = require("../Rcui/CustomArrowButton");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InputSelect = /*#__PURE__*/function (_Component) {
  _inherits(InputSelect, _Component);

  var _super = _createSuper(InputSelect);

  function InputSelect(props) {
    var _this;

    _classCallCheck(this, InputSelect);

    _this = _super.call(this, props);
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_assertThisInitialized(_this));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), _this.props.timeout);
    _this.wrapper = void 0;

    _this._renderPickList = function () {
      var subjectPicklist = _this.props.subjectPicklist;
      var expand = _this.state.expand;

      if (!expand) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].select
      }, /*#__PURE__*/_react["default"].createElement(_rcui.RcList, null, subjectPicklist.map(function (option, i) {
        return /*#__PURE__*/_react["default"].createElement(_rcui.RcListItem, {
          key: i,
          button: true,
          singleLine: true,
          onClick: function onClick() {
            return _this.onSelectChange(option);
          },
          "data-sign": "match".concat(i)
        }, /*#__PURE__*/_react["default"].createElement(_rcui.RcListItemText, {
          primary: option,
          classes: {
            primary: _styles["default"].listText
          }
        }));
      })));
    };

    _this.onSelectChange = function (subject) {
      var _this$props = _this.props,
          onSelectOption = _this$props.onSelectOption,
          onSave = _this$props.onSave,
          onChange = _this$props.onChange;

      _this.setState({
        subject: subject
      }, function () {
        _this.debounce(function () {
          if (onSelectOption) {
            onSelectOption();
          }

          var subject = _this.state.subject;
          onChange(subject).then(function () {
            return onSave();
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

    var _subject = _this.props.subject;
    _this.state = {
      subject: _subject,
      expand: false
    };
    return _this;
  }

  _createClass(InputSelect, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
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

      var _this$props2 = this.props,
          subjectPicklist = _this$props2.subjectPicklist,
          required = _this$props2.required,
          label = _this$props2.label;
      var _this$state$subject = this.state.subject,
          subject = _this$state$subject === void 0 ? '' : _this$state$subject;
      var hasError = required && subject.trim() === '';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        ref: function ref(_ref) {
          _this2.wrapper = _ref;
        }
      }, /*#__PURE__*/_react["default"].createElement(_rcui.RcTextField, {
        label: label || 'Subject',
        "data-sign": "subject",
        title: subject,
        fullWidth: true,
        clearBtn: false,
        required: required,
        value: subject,
        error: hasError,
        inputProps: {
          maxLength: 255
        },
        InputProps: {
          endAdornment: subjectPicklist.length > 0 && /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
            symbol: _iconArrow_down["default"],
            onClick: this.toggleDropDownList,
            size: "large"
          })
        },
        onChange: function onChange(e) {
          return _this2.updateValue(e.target.value, 500);
        }
      }), this._renderPickList());
    }
  }, {
    key: "updateValue",
    value: function updateValue(subject, time) {
      var _this3 = this;

      var _this$props3 = this.props,
          onChange = _this$props3.onChange,
          onSave = _this$props3.onSave,
          timeout = _this$props3.timeout;
      this.setState({
        subject: subject
      }, function () {
        _this3.debounce(function () {
          var subject = _this3.state.subject;
          onChange(subject).then(function () {
            _this3.debounce(function () {
              return onSave();
            }, timeout - time);
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
