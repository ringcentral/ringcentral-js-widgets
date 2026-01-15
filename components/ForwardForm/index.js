"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.timers.js");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  function ForwardForm(props) {
    var _this;
    _classCallCheck(this, ForwardForm);
    _this = _callSuper(this, ForwardForm, [props]);
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
    _this.onForward = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _this.setState({
              handling: true
            });
            // @ts-expect-error TS(2339): Property 'onForward' does not exist on type 'Reado... Remove this comment to see the full error message
            _context.n = 1;
            return _this.props.onForward(_this.getValue());
          case 1:
            result = _context.v;
            if (_this._mounted) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            _this.setState({
              handling: false
            });
            if (result) {
              // @ts-expect-error TS(2339): Property 'onCancel' does not exist on type 'Readon... Remove this comment to see the full error message
              _this.props.onCancel();
            }
          case 3:
            return _context.a(2);
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
  _inherits(ForwardForm, _Component);
  return _createClass(ForwardForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
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
var _default = exports["default"] = ForwardForm;
//# sourceMappingURL=index.js.map
