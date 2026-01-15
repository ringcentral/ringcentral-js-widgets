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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactDropdownList = require("../ContactDropdownList");
var _RemoveButton = require("../RemoveButton");
var _SelectedRecipients = require("./SelectedRecipients");
var _focusCampo = require("./focusCampo");
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
var RecipientsInput = /*#__PURE__*/function (_Component) {
  function RecipientsInput(props) {
    var _this;
    _classCallCheck(this, RecipientsInput);
    _this = _callSuper(this, RecipientsInput, [props]);
    _this.setSelectedIndex = void 0;
    _this.scrollOperation = void 0;
    _this.addSelectedContactIndex = void 0;
    _this.reduceSelectedContactIndex = void 0;
    _this.isSplitter = void 0;
    _this.handleHotKey = void 0;
    _this.listRef = void 0;
    _this.inputRef = void 0;
    _this.onInputKeyUp = function (ev) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.searchContact(ev.currentTarget.value);
      _this.setState({
        isFocusOnInput: true
      });
    };
    _this.onInputFocus = function () {
      _this.setState({
        isFocusOnInput: true
      });
    };
    _this.onInputChange = function (ev) {
      var value = ev.currentTarget.value;
      var lastInputTimestamp = Date.now();
      _this.setState({
        value: value,
        lastInputTimestamp: lastInputTimestamp
      }, function () {
        _this.props.onChange(value);
      });
      if (_this.listRef) {
        _this.listRef.scrollTop = 0;
      }
    };
    _this.onPaste = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ev) {
        var pastedText, result, currentVal, newVal;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(
              // @ts-ignore
              _this.props.detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                _context.n = 2;
                break;
              }
              ev.preventDefault();
              pastedText = ev.clipboardData.getData('text/plain');
              _context.n = 1;
              return _this.props.detectPhoneNumbers(pastedText);
            case 1:
              result = _context.v;
              currentVal = _this.state.value || '';
              if (!result) {
                newVal = "".concat(currentVal).concat(pastedText.replace(/\n/g, ' '));
                _this.setState({
                  value: newVal
                }, function () {
                  _this.props.onChange(newVal);
                });
              }
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.onClean = function () {
      _this.setState({
        value: ''
      });
      _this.props.onClean();
    };
    _this.clickHandler = function (ev) {
      if (_this.listRef && _this.listRef.contains(ev.target)) {
        return;
      }
      if (_this.inputRef && _this.inputRef.contains(ev.target)) {
        _this.setState({
          isFocusOnInput: true
        });
        return;
      }
      _this.setState({
        isFocusOnInput: false
      });
    };
    _this._addToRecipients = function (item) {
      _this.setState({
        value: '',
        isFocusOnInput: false
      });
      _this.props.addToRecipients(item);
    };
    _this.setInputRef = function (ref) {
      _this.inputRef = ref;
      if (typeof _this.props.inputRef === 'function') {
        _this.props.inputRef(ref);
      }
    };
    _this.state = {
      value: props.value,
      lastInputTimestamp: 0,
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null
    };
    _this.setSelectedIndex = function (index) {
      _this.setState({
        selectedContactIndex: index,
        scrollDirection: null
      });
    };
    _this.scrollOperation = function (direction) {
      if (direction === 'ArrowDown' || direction === 'ArrowUp') {
        _this.setState({
          scrollDirection: direction
        });
      }
    };
    _this.addSelectedContactIndex = function () {
      var length = _this.props.searchContactList.length;
      if (_this.state.selectedContactIndex >= length - 1) {
        _this.setState({
          selectedContactIndex: length - 1
        });
      } else {
        _this.setState(function (preState) {
          return {
            selectedContactIndex: preState.selectedContactIndex + 1
          };
        });
      }
    };
    _this.reduceSelectedContactIndex = function () {
      if (_this.state.selectedContactIndex > 0) {
        _this.setState(function (preState) {
          return {
            selectedContactIndex: preState.selectedContactIndex - 1
          };
        });
      } else {
        _this.setState({
          selectedContactIndex: 0
        });
      }
    };
    _this.isSplitter = function (ev) {
      if (ev.key === ',' || ev.key === ';' || ev.key === 'Enter' || ev.key === 'Unidentified' && (
      // for Safari (FF cannot rely on keyCode...)
      ev.keyCode === 186 ||
      // semicolon
      ev.keyCode === 188 ||
      // comma
      ev.keyCode === 13) // enter
      ) {
        return true;
      }
      return false;
    };
    // using React SyntheticEvent to deal with cross browser issue
    _this.handleHotKey = function (ev) {
      if (_this.state.isFocusOnInput && _this.state.value.length >= 3) {
        if (ev.key === 'ArrowUp') {
          _this.reduceSelectedContactIndex();
          _this.scrollOperation(ev.key);
        } else if (ev.key === 'ArrowDown') {
          _this.addSelectedContactIndex();
          _this.scrollOperation(ev.key);
        }
      } else {
        _this.setState({
          selectedContactIndex: 0
        });
      }
      if (_this.isSplitter(ev)) {
        ev.preventDefault();
        var trimmedValue = _this.state.value.trim();
        var relatedContactList = _this.state.value.length >= 3 ? _this.props.searchContactList : [];
        var currentSelected = relatedContactList[_this.state.selectedContactIndex];
        if (trimmedValue.length === 0 && !currentSelected) {
          return;
        }
        if (currentSelected && ev.key === 'Enter') {
          _this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber
          });
        } else {
          _this.props.addToRecipients({
            name: trimmedValue.replace(',', ''),
            phoneNumber: trimmedValue.replace(',', '')
          });
        }
        _this.setState({
          value: ''
        });
      }
    };
    return _this;
  }
  _inherits(RecipientsInput, _Component);
  return _createClass(RecipientsInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;
      var isNotEditing = !this.state.isFocusOnInput || Date.now() - this.state.lastInputTimestamp > 2000;
      if (isNotEditing && nextProps.value !== undefined && nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        }, function () {
          if (_this2.inputRef) {
            (0, _focusCampo.focusCampo)(_this2.inputRef);
          }
        });
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        this.props.searchContact(nextProps.value);
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.searchContact(this.props.value);
      window.addEventListener('click', this.clickHandler);
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this3 = this;
      var _this$props = this.props,
        className = _this$props.className,
        contactInfoRenderer = _this$props.contactInfoRenderer,
        contactPhoneRenderer = _this$props.contactPhoneRenderer,
        currentLocale = _this$props.currentLocale,
        formatContactPhone = _this$props.formatContactPhone,
        isLastInputFromDialpad = _this$props.isLastInputFromDialpad,
        label = _this$props.label,
        multiple = _this$props.multiple,
        phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
        phoneTypeRenderer = _this$props.phoneTypeRenderer,
        placeholder = _this$props.placeholder,
        recipient = _this$props.recipient,
        recipients = _this$props.recipients,
        recipientsClassName = _this$props.recipientsClassName,
        removeFromRecipients = _this$props.removeFromRecipients,
        searchContactList = _this$props.searchContactList,
        titleEnabled = _this$props.titleEnabled,
        useRCUI = _this$props.useRCUI;
      var _this$state = this.state,
        value = _this$state.value,
        isFocusOnInput = _this$state.isFocusOnInput,
        scrollDirection = _this$state.scrollDirection,
        selectedContactIndex = _this$state.selectedContactIndex;
      // TODO: a temporary fix for rendering slower search result.
      var relatedContactList = value.length >= 3 ? searchContactList.slice(0, 50) : [];
      var labelString = label === undefined ? "".concat(_i18n["default"].getString('to', currentLocale), ":") : label;
      var labelEl =
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      _react["default"].createElement("label", {
        className: _styles["default"].label,
        title: labelString
      }, labelString);
      var toNumberInput = !multiple && recipient ? null : /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputWrapper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].inputField, isFocusOnInput ? 'Mui-focused' : null, 'MuiInput-underline')
      }, /*#__PURE__*/_react["default"].createElement("input", {
        "data-sign": "recipientsInput",
        ref: this.setInputRef,
        name: "receiver",
        value: value,
        onChange: this.onInputChange,
        onPaste: this.onPaste,
        className: _styles["default"].numberInput,
        maxLength: 30,
        onFocus: this.onInputFocus,
        onKeyUp: this.onInputKeyUp,
        placeholder: placeholder === undefined ? _i18n["default"].getString('enterNameOrNumber', currentLocale) : placeholder,
        autoComplete: "off"
      })), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
        className: _styles["default"].removeButton,
        onClick: this.onClean,
        visibility: value.length > 0
      }));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].container, useRCUI ? _styles["default"].rcuiStyle : null, className),
        onKeyDown: this.handleHotKey
      }, labelEl, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(useRCUI ? _styles["default"].rcuiStyle : null, label === undefined ? _styles["default"].rightPanel : '')
      }, /*#__PURE__*/_react["default"].createElement(_SelectedRecipients.SelectedRecipients, {
        recipient: recipient
        // @ts-expect-error TS(2322): Type '{ phoneNumber: string; name?: string | undef... Remove this comment to see the full error message
        ,
        recipients: recipients
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        ,
        multiple: multiple,
        onRemove: removeFromRecipients,
        className: recipientsClassName
      }), toNumberInput), /*#__PURE__*/_react["default"].createElement(_ContactDropdownList.ContactDropdownList, {
        currentLocale: currentLocale,
        listRef: function listRef(ref) {
          _this3.listRef = ref;
        }
        // @ts-expect-error TS(2769): No overload matches this call.
        ,
        scrollDirection: scrollDirection,
        selectedIndex: selectedContactIndex,
        setSelectedIndex: this.setSelectedIndex,
        addToRecipients: this._addToRecipients,
        items: relatedContactList,
        formatContactPhone: formatContactPhone,
        visibility: isFocusOnInput && !isLastInputFromDialpad,
        titleEnabled: titleEnabled,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactInfoRenderer: contactInfoRenderer,
        contactPhoneRenderer: contactPhoneRenderer
      }));
    }
  }]);
}(_react.Component);
RecipientsInput.defaultProps = {
  recipients: [],
  searchContact: function searchContact() {
    return null;
  }
};
var _default = exports["default"] = RecipientsInput;
//# sourceMappingURL=RecipientsInput.js.map
