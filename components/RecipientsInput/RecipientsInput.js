"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.trim");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ContactDropdownList = require("../ContactDropdownList");
var _RemoveButton = require("../RemoveButton");
var _SelectedRecipients = require("./SelectedRecipients");
var _focusCampo = require("./focusCampo");
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
var RecipientsInput = /*#__PURE__*/function (_Component) {
  _inherits(RecipientsInput, _Component);
  var _super = _createSuper(RecipientsInput);
  function RecipientsInput(props) {
    var _this;
    _classCallCheck(this, RecipientsInput);
    _this = _super.call(this, props);
    _this.setSelectedIndex = void 0;
    _this.scrollOperation = void 0;
    _this.addSelectedContactIndex = void 0;
    _this.reduceSelectedContactIndex = void 0;
    _this.isSplitter = void 0;
    _this.handleHotKey = void 0;
    _this.listRef = void 0;
    _this.inputRef = void 0;
    _this._focusTimeout = void 0;
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ev) {
        var pastedText, result, currentVal, newVal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(
                // @ts-ignore
                _this.props.detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                  _context.next = 8;
                  break;
                }
                ev.preventDefault();
                pastedText = ev.clipboardData.getData('text/plain');
                _context.next = 5;
                return _this.props.detectPhoneNumbers(pastedText);
              case 5:
                result = _context.sent;
                currentVal = _this.state.value || '';
                if (!result) {
                  newVal = "".concat(currentVal).concat(pastedText.replace(/\n/g, ' '));
                  _this.setState({
                    value: newVal
                  }, function () {
                    _this.props.onChange(newVal);
                  });
                }
              case 8:
              case "end":
                return _context.stop();
            }
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
  _createClass(RecipientsInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
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
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.searchContact(this.props.value);
      window.addEventListener('click', this.clickHandler);
      if (this.props.autoFocus) {
        this._focusTimeout = setTimeout(function () {
          if (_this3.inputRef) {
            _this3.inputRef.focus();
          }
        }, 300);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
      if (this._focusTimeout) {
        clearTimeout(this._focusTimeout);
        this._focusTimeout = undefined;
      }
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this4 = this;
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
        selectedContactIndex = _this$state.selectedContactIndex; // TODO: a temporary fix for rendering slower search result.
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
          _this4.listRef = ref;
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
  return RecipientsInput;
}(_react.Component);
RecipientsInput.defaultProps = {
  recipients: [],
  searchContact: function searchContact() {
    return null;
  }
};
var _default = RecipientsInput;
exports["default"] = _default;
//# sourceMappingURL=RecipientsInput.js.map
