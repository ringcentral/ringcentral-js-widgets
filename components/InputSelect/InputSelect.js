"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _bindDebounce = require("../../lib/bindDebounce");
var _bindNextPropsUpdate = require("../../lib/bindNextPropsUpdate");
var _CustomArrowButton = require("../Rcui/CustomArrowButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var InputSelect = /*#__PURE__*/function (_Component) {
  _inherits(InputSelect, _Component);
  var _super = _createSuper(InputSelect);
  function InputSelect(props) {
    var _this;
    _classCallCheck(this, InputSelect);
    _this = _super.call(this, props);
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_assertThisInitialized(_this));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), _this.props.timeout);
    // @ts-expect-error TS(2564): Property 'wrapper' has no initializer and is not d... Remove this comment to see the full error message
    _this.wrapper = void 0;
    _this._renderPickList = function () {
      var subjectPicklist = _this.props.subjectPicklist;
      var expand = _this.state.expand;
      if (!expand) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].select
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, subjectPicklist.map(function (option, i) {
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
          var subject = _this.state.subject; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(InputSelect, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      this.checkPropsUpdate(nextProps, 'subject');
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322): Type 'HTMLDivElement | null' is not assignable to ... Remove this comment to see the full error message
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
        InputProps: {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          endAdornment: subjectPicklist.length > 0 && /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, {
            symbol: _junoIcon.ArrowDown2,
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
          var subject = _this3.state.subject; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onChange(subject).then(function () {
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  subject: null,
  onChange: undefined,
  onSave: undefined,
  timeout: 500,
  onSelectOption: undefined
};
//# sourceMappingURL=InputSelect.js.map
