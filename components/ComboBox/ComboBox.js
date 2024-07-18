"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.parse-int");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
var ComboBox = /*#__PURE__*/function (_Component) {
  _inherits(ComboBox, _Component);
  var _super = _createSuper(ComboBox);
  function ComboBox(props) {
    var _this;
    _classCallCheck(this, ComboBox);
    _this = _super.call(this, props);
    _this.dropdownMenu = void 0;
    _this.wrapper = void 0;
    _this.inputRef = /*#__PURE__*/(0, _react.createRef)();
    _this.saveContent = void 0;
    _this._toggleShowDropdown = function (e) {
      var _this$props = _this.props,
        searchOption = _this$props.searchOption,
        stopPropagation = _this$props.stopPropagation,
        disabled = _this$props.disabled,
        onToggle = _this$props.onToggle;
      if (!_this.state.open) {
        window.addEventListener('click', _this._handleDocumentClick, false);
        if (searchOption) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          _this.saveContent = _this.inputRef.current.textContent;
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          _this.inputRef.current.focus();
          // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
          document.execCommand('selectAll', false, null);
        }
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
        if (searchOption) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          document.getSelection().removeAllRanges();
        }
      }
      if (e && stopPropagation) {
        e.stopPropagation();
      }
      if (disabled) {
        return;
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onToggle(!_this.state.open);
      if (searchOption) {
        _this._reSetBoxValue();
      }
      _this.setState(function (preState) {
        return {
          open: !preState.open
        };
      });
    };
    _this.onChange = function (e, option, idx) {
      e.stopPropagation();
      if (!(_this.props.placeholder && idx === 0)) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _this.props.onChange(option, idx);
      }
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      _this._toggleShowDropdown();
    };
    _this._handleDocumentClick = function (e) {
      if (_this.wrapper && _this.wrapper.contains(e.target)) {
        return;
      }
      if (_this.dropdownMenu && _this.dropdownMenu.contains(e.target)) {
        return;
      }
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      _this._toggleShowDropdown();
    };
    _this._textChangeEmit = function (e) {
      _this.setState({
        filter: e.target.textContent
      });
    };
    _this._textPasteEmit = function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    };
    _this.state = {
      open: _this.props.open,
      filter: null
    };
    return _this;
  }
  _createClass(ComboBox, [{
    key: "_reSetBoxValue",
    value: function _reSetBoxValue() {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (this.inputRef.current.textContent !== this.saveContent) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        this.inputRef.current.textContent = this.saveContent;
        this.setState({
          filter: null
        });
      }
    }
  }, {
    key: "_bindInputListener",
    value: function _bindInputListener() {
      if (this.props.searchOption) {
        var inputElm = this.inputRef.current;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        inputElm.setAttribute('contenteditable', 'true');
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        inputElm.addEventListener('input', this._textChangeEmit, false);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        inputElm.addEventListener('paste', this._textPasteEmit, false);
      }
    }
  }, {
    key: "_removeInputListener",
    value: function _removeInputListener() {
      if (this.props.searchOption) {
        var inputElm = this.inputRef.current;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        inputElm.removeEventListener('input', this._textChangeEmit, false);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        inputElm.removeEventListener('paste', this._textPasteEmit, false);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._bindInputListener();
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props2 = this.props,
        renderDropdownMenu = _this$props2.renderDropdownMenu,
        open = _this$props2.open;
      if (prevState.open !== open) {
        if (renderDropdownMenu && this.wrapper) {
          var menu = this.renderDropdownMenu();
          var buttomPosition = this.wrapper.getBoundingClientRect();
          renderDropdownMenu(menu, open, buttomPosition);
        }
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
        this.setState({
          open: nextProps.open
        });
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._removeInputListener();
    }
  }, {
    key: "valueFunction",
    value: function valueFunction(_, idx) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return this.props.valueFunction(_, this.props.placeholder ? "".concat(idx - 1) : idx);
    }
  }, {
    key: "renderFunction",
    value: function renderFunction(option, idx) {
      var _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        renderFunction = _this$props3.renderFunction; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return placeholder && idx === 0 ? placeholder : renderFunction(option, idx);
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var _this$props4 = this.props,
        placeholder = _this$props4.placeholder,
        renderValue = _this$props4.renderValue;
      if (placeholder) {
        value = parseInt(value, 10) + 1;
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        return value === 0 ? placeholder : renderValue(value - 1);
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return renderValue(value);
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(selectedOption, defaultTitle) {
      var _this$props5 = this.props,
        titleEnabled = _this$props5.titleEnabled,
        renderTitle = _this$props5.renderTitle;
      if (titleEnabled) {
        return typeof renderTitle === 'function' ? renderTitle(selectedOption) : defaultTitle;
      }
      return '';
    }
  }, {
    key: "renderDropdownMenu",
    value: function renderDropdownMenu() {
      var _this2 = this;
      var _this$props6 = this.props,
        placeholder = _this$props6.placeholder,
        ellipsis = _this$props6.ellipsis,
        options = _this$props6.options,
        dropdownClassName = _this$props6.dropdownClassName,
        value = _this$props6.value,
        searchOption = _this$props6.searchOption,
        dropdownAlign = _this$props6.dropdownAlign;
      var filter = this.state.filter;
      var currentOptions = placeholder ? [{}].concat(_toConsumableArray(options)) : options;
      if (searchOption && filter) {
        currentOptions = currentOptions.filter(function (option) {
          return searchOption(option, filter);
        });
      }
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _clsx["default"])(_styles["default"].dropdown, dropdownClassName, placeholder && _styles["default"].placeholder),
        ref: function ref(_ref) {
          _this2.dropdownMenu = _ref;
        }
      }, currentOptions.map(function (option, idx) {
        var currentValue = _this2.valueFunction(option, idx);
        var className = (0, _clsx["default"])(_styles["default"].dropdownItem, value === currentValue ? _styles["default"].selected : null);
        var display = _this2.renderFunction(option, idx);
        return /*#__PURE__*/_react["default"].createElement("li", {
          "data-sign": "selectMenuItem",
          key: currentValue || idx,
          className: (0, _clsx["default"])(className,
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          _styles["default"][dropdownAlign], ellipsis && _styles["default"].ellipsis, placeholder && _styles["default"].placeholder),
          value: currentValue,
          title: _this2.renderTitle(option, display),
          onClick: function onClick(e) {
            return _this2.onChange(e, option, idx);
          }
        }, display);
      }));
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props7 = this.props,
        reference = _this$props7.reference,
        ellipsis = _this$props7.ellipsis,
        label = _this$props7.label,
        open = _this$props7.open,
        iconClassName = _this$props7.iconClassName,
        className = _this$props7.className,
        disabled = _this$props7.disabled,
        noPadding = _this$props7.noPadding,
        renderDropdownMenu = _this$props7.renderDropdownMenu,
        value = _this$props7.value,
        dataSign = _this$props7.dataSign,
        wrapperStyle = _this$props7.wrapperStyle,
        buttonStyle = _this$props7.buttonStyle,
        options = _this$props7.options,
        selectedClassName = _this$props7.selectedClassName,
        icon = _this$props7.icon;
      var currentLabel = label ? /*#__PURE__*/_react["default"].createElement("span", null, label) : null;
      var currentIconClassName = (0, _clsx["default"])(_styles["default"].icon, this.state.open ? _styles["default"].iconUp : null, iconClassName);
      var containerClassName = (0, _clsx["default"])(_styles["default"].root, className, disabled ? _styles["default"].disabled : null, this.state.open ? _styles["default"].open : null, noPadding ? _styles["default"].noPadding : null);
      var buttonClassName = (0, _clsx["default"])(_styles["default"].button, disabled ? _styles["default"].disabled : null);
      var dropdownMenu = renderDropdownMenu ? null : this.renderDropdownMenu();
      var renderValue = this.renderValue(value);
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": dataSign,
        className: (0, _clsx["default"])(containerClassName, wrapperStyle),
        ref: function ref(_ref2) {
          if (reference) reference(_ref2);
          _this3.wrapper = _ref2;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        // @ts-expect-error TS(2322): Type '{ children: (Element | null)[]; type: string... Remove this comment to see the full error message
        type: "button",
        className: (0, _clsx["default"])(buttonClassName, buttonStyle),
        onClick: this._toggleShowDropdown
        // @ts-expect-error TS(2538): Type 'object' cannot be used as an index type.
        ,
        title: this.renderTitle(options[value], renderValue)
      }, currentLabel, /*#__PURE__*/_react["default"].createElement("span", {
        // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _clsx["default"])(_styles["default"].selectedValue, ellipsis && _styles["default"].ellipsis, selectedClassName)
      }, renderValue), /*#__PURE__*/_react["default"].createElement("span", {
        className: currentIconClassName
      }, icon === undefined ? /*#__PURE__*/_react["default"].createElement("i", {
        className: _DynamicsFont["default"].arrow
      }) : icon)), dropdownMenu);
    }
  }]);
  return ComboBox;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ComboBox.defaultProps = {
  icon: undefined,
  reference: undefined,
  className: null,
  selectedClassName: null,
  dropdownClassName: null,
  iconClassName: null,
  value: null,
  label: null,
  onChange: undefined,
  disabled: false,
  renderDropdownMenu: undefined,
  renderTitle: undefined,
  valueFunction: function valueFunction(_, idx) {
    return idx;
  },
  renderFunction: function renderFunction(option) {
    return option;
  },
  renderValue: function renderValue(option) {
    return option;
  },
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  ellipsis: true,
  noPadding: false,
  onToggle: function onToggle() {},
  searchOption: null,
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'ComboBox'
};
var _default = ComboBox;
exports["default"] = _default;
//# sourceMappingURL=ComboBox.js.map
