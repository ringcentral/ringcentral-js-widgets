"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _bindDebounce = require("../../lib/bindDebounce");
var _bindNextPropsUpdate = require("../../lib/bindNextPropsUpdate");
var _CustomArrowButton = require("../Rcui/CustomArrowButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var InputSelect = exports["default"] = /*#__PURE__*/function (_Component) {
  function InputSelect(props) {
    var _this;
    _classCallCheck(this, InputSelect);
    _this = _callSuper(this, InputSelect, [props]);
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_this);
    _this.debounce = (0, _bindDebounce.bindDebounce)(_this, _this.props.timeout);
    _this.wrapper = null;
    _this.inputRef = /*#__PURE__*/_react["default"].createRef();
    _this._renderPickList = function () {
      var subjectPicklist = _this.props.subjectPicklist;
      var expand = _this.state.expand;
      if (!expand) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].select
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, subjectPicklist === null || subjectPicklist === void 0 ? void 0 : subjectPicklist.map(function (option, i) {
        return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
          key: i,
          button: true,
          singleLine: true,
          onClick: function onClick() {
            return _this.onSelectChange(option);
          },
          "data-sign": "match".concat(i)
        }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
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
          onChange === null || onChange === void 0 ? void 0 : onChange(subject).then(function () {
            return onSave === null || onSave === void 0 ? void 0 : onSave();
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
  _inherits(InputSelect, _Component);
  return _createClass(InputSelect, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$inputRef;
      var isFocused = document.activeElement === ((_this$inputRef = this.inputRef) === null || _this$inputRef === void 0 ? void 0 : _this$inputRef.current);
      if (!isFocused) {
        this.checkPropsUpdate(nextProps, 'subject', false);
      }
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
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
        label: label || 'Subject',
        "data-sign": "subject",
        gutterBottom: true,
        title: subject,
        fullWidth: true,
        clearBtn: false,
        required: required,
        value: subject,
        error: hasError,
        inputProps: {
          maxLength: 255
        },
        inputRef: this.inputRef,
        InputProps: {
          endAdornment: (subjectPicklist === null || subjectPicklist === void 0 ? void 0 : subjectPicklist.length) && /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
            symbol: _junoIcon.ArrowDown2,
            onClick: this.toggleDropDownList,
            size: "large"
          })
        },
        onChange: function onChange(e) {
          return _this2.updateValue(e.target, 500);
        }
      }), this._renderPickList());
    }
  }, {
    key: "updateValue",
    value: function updateValue(_ref2, time) {
      var _this3 = this;
      var value = _ref2.value;
      var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        onSave = _this$props3.onSave,
        _this$props3$timeout = _this$props3.timeout,
        timeout = _this$props3$timeout === void 0 ? 2e3 : _this$props3$timeout;
      this.setState({
        subject: value
      }, function () {
        _this3.debounce(function () {
          var subject = _this3.state.subject;
          onChange === null || onChange === void 0 ? void 0 : onChange(subject).then(function () {
            _this3.debounce(function () {
              return onSave === null || onSave === void 0 ? void 0 : onSave();
            }, timeout - time);
          });
        }, time);
      });
    }
  }]);
}(_react.Component);
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
