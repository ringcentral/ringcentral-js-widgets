"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var cleanRegex = /[^\d+*-\s]/g;
var ForwardNumbers = function ForwardNumbers(_ref) {
  var numbers = _ref.numbers,
    onSelect = _ref.onSelect,
    selected = _ref.selected,
    formatPhone = _ref.formatPhone;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].numbers
  }, numbers.map(function (number, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: number.id,
      "data-sign": "forward-number-".concat(number.label.toLowerCase()),
      className: (0, _clsx["default"])(_styles["default"].number, index === selected ? _styles["default"].active : null),
      onClick: function onClick() {
        return onSelect(index);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].label,
      title: number.label
    }, number.label), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].colon
    }, ":"), /*#__PURE__*/_react["default"].createElement("span", null, formatPhone(number.phoneNumber)));
  }));
};
ForwardNumbers.propTypes = {
  numbers: _propTypes["default"].array.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  selected: _propTypes["default"].number.isRequired,
  formatPhone: _propTypes["default"].func.isRequired
};
var ForwardForm = /*#__PURE__*/function (_Component) {
  _inherits(ForwardForm, _Component);
  var _super = _createSuper(ForwardForm);
  function ForwardForm(props) {
    var _this;
    _classCallCheck(this, ForwardForm);
    _this = _super.call(this, props);
    _this._mounted = void 0;
    _this.customInput = void 0;
    _this.filter = void 0;
    _this.onForward = void 0;
    _this.onSelect = void 0;
    _this.onSelectCustomNumber = void 0;
    _this._onCustomValueChange = function (value) {
      _this.setState({
        customValue: value
      });
    };
    _this._clearToNumber = function () {
      _this.setState({
        customValue: ''
      });
    };
    _this._setRecipient = function (recipient) {
      _this.setState({
        recipient: recipient
      });
      _this._clearToNumber();
    };
    _this._clearRecipient = function () {
      _this.setState({
        recipient: null
      });
    };
    _this.state = {
      selectedIndex: 0,
      customValue: '',
      handling: false,
      recipient: null
    };
    _this.filter = function (value) {
      return value.replace(cleanRegex, '');
    };
    _this.onSelect = function (index) {
      _this.setState({
        selectedIndex: index
      });
      // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
      if (typeof _this.props.onChange === 'function') {
        // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
        _this.props.onChange(_this.getValue());
      }
    };
    _this.onForward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                handling: true
              });
              // @ts-expect-error TS(2339): Property 'onForward' does not exist on type 'Reado... Remove this comment to see the full error message
              _context.next = 3;
              return _this.props.onForward(_this.getValue());
            case 3:
              result = _context.sent;
              if (_this._mounted) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return");
            case 6:
              _this.setState({
                handling: false
              });
              if (result) {
                // @ts-expect-error TS(2339): Property 'onCancel' does not exist on type 'Readon... Remove this comment to see the full error message
                _this.props.onCancel();
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.onSelectCustomNumber = function () {
      // @ts-expect-error TS(2339): Property 'forwardingNumbers' does not exist on typ... Remove this comment to see the full error message
      _this.onSelect(_this.props.forwardingNumbers.length);
      setTimeout(function () {
        if (_this.customInput) {
          _this.customInput.focus();
        }
      }, 100);
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ForwardForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
      if (this.state.selectedIndex < this.props.forwardingNumbers.length) {
        var forwardingNumber =
        // @ts-expect-error TS(2339): Property 'forwardingNumbers' does not exist on typ... Remove this comment to see the full error message
        this.props.forwardingNumbers[this.state.selectedIndex];
        return forwardingNumber && forwardingNumber.phoneNumber;
      }
      // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
      if (this.state.recipient) {
        // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
        return this.state.recipient.phoneNumber;
      }
      // @ts-expect-error TS(2339): Property 'customValue' does not exist on type 'Rea... Remove this comment to see the full error message
      return this.state.customValue;
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        onCancel = _this$props.onCancel,
        currentLocale = _this$props.currentLocale,
        forwardingNumbers = _this$props.forwardingNumbers,
        formatPhone = _this$props.formatPhone,
        searchContact = _this$props.searchContact,
        searchContactList = _this$props.searchContactList,
        phoneTypeRenderer = _this$props.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
        autoFocus = _this$props.autoFocus;
      var value = this.getValue();
      // @ts-expect-error TS(2339): Property 'handling' does not exist on type 'Readon... Remove this comment to see the full error message
      var disableButton = (0, _isBlank.isBlank)(value) || this.state.handling;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "forwardPage",
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement(ForwardNumbers, {
        formatPhone: formatPhone,
        numbers: forwardingNumbers,
        onSelect: this.onSelect
        // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
        ,
        selected: this.state.selectedIndex
      }), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "customNumber",
        className: (0, _clsx["default"])(_styles["default"].custromNumber,
        // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
        this.state.selectedIndex === forwardingNumbers.length ? _styles["default"].active : null),
        onClick: this.onSelectCustomNumber
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].customLabel
      }, _i18n["default"].getString('customNumber', currentLocale)), /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
        label: "",
        placeholder: "",
        inputRef: function inputRef(ref) {
          _this2.customInput = ref;
        }
        // @ts-expect-error TS(2339): Property 'customValue' does not exist on type 'Rea... Remove this comment to see the full error message
        ,
        value: this.state.customValue,
        className: _styles["default"].customInput,
        onChange: this._onCustomValueChange,
        onClean: this._clearToNumber
        // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
        ,
        recipient: this.state.recipient,
        addToRecipients: this._setRecipient,
        removeFromRecipients: this._clearRecipient,
        searchContact: searchContact,
        searchContactList: searchContactList,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        formatContactPhone: formatPhone,
        currentLocale: currentLocale,
        titleEnabled: true,
        autoFocus: autoFocus
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "cancel",
        className: _styles["default"].cancelButton,
        onClick: onCancel
      }, _i18n["default"].getString('cancel', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "forwardCall",
        className: (0, _clsx["default"])(_styles["default"].forwardButton, disableButton ? _styles["default"].disabled : null),
        onClick: this.onForward,
        disabled: disableButton
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].buttonText
      }, _i18n["default"].getString('forward', currentLocale)))));
    }
  }]);
  return ForwardForm;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ForwardForm.propTypes = {
  className: _propTypes["default"].string,
  onCancel: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  forwardingNumbers: _propTypes["default"].array.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onForward: _propTypes["default"].func.isRequired,
  onChange: _propTypes["default"].func,
  searchContactList: _propTypes["default"].array.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ForwardForm.defaultProps = {
  className: null,
  onChange: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  autoFocus: true
};
var _default = ForwardForm;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
