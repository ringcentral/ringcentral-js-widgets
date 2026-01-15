"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledDropdownSelect = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
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
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var gutter = (0, _juno.spacing)(2.5);
var StyledMenuItem = (0, _juno.styled)(_juno.RcMenuItem)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", " {\n    .RcListItemText-primary {\n      font-size: 13px;\n    }\n    margin: 0;\n  }\n\n  padding-left: ", ";\n  padding-right: ", ";\n"])), _juno.RcListItemText, gutter, gutter);
var Label = _juno.styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n  margin-right: ", ";\n"])), (0, _juno.flexWidth)('40%'), (0, _juno.spacing)(2));
var Value = _juno.styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  text-align: right;\n"])));
var WithLabelWrapper = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n\n  span {\n    ", ";\n  }\n"])), _juno.ellipsis);
StyledMenuItem.defaultProps = {
  disableGutters: true
};
var DropdownSelect = /*#__PURE__*/function (_Component) {
  function DropdownSelect(props) {
    var _this$props2, _this$props2$options$;
    var _this;
    _classCallCheck(this, DropdownSelect);
    _this = _callSuper(this, DropdownSelect, [props]);
    _this.inputRef = /*#__PURE__*/(0, _react.createRef)();
    // @ts-expect-error TS(2564): Property 'saveContent' has no initializer and is n... Remove this comment to see the full error message
    _this.saveContent = void 0;
    _this._optionsWithLabel = void 0;
    _this.wrapper = void 0;
    _this.dropdownMenu = void 0;
    _this._toggleShowDropdown = function (e) {
      var _this$props = _this.props,
        searchOption = _this$props.searchOption,
        stopPropagation = _this$props.stopPropagation,
        disabled = _this$props.disabled,
        onToggle = _this$props.onToggle,
        customInputEnabled = _this$props.customInputEnabled;
      if (!_this.state.open) {
        window.addEventListener('click', _this._handleDocumentClick, false);
        if (searchOption) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          _this.saveContent = _this.inputRef.current.value;
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          _this.inputRef.current.focus();
          if (!customInputEnabled && document.execCommand) {
            // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
            document.execCommand('selectAll', false, null);
          }
        }
        if (_this._optionsWithLabel) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          _this.inputRef.current.style.textAlign = 'left';
          if (customInputEnabled) {
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            var valueLength = _this.inputRef.current.value.length;
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            _this.inputRef.current.setSelectionRange(valueLength, valueLength);
          }
        }
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
        if (searchOption) {
          _this.setState({
            filter: null
          });
          if (!customInputEnabled) {
            _this._reSetBoxValue();
          }
          if (document.getSelection) {
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            document.getSelection().removeAllRanges();
          }
        }
        if (_this._optionsWithLabel) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          _this.inputRef.current.style.textAlign = 'right';
        }
      }
      if (e && stopPropagation) {
        e.stopPropagation();
      }
      if (disabled) {
        return;
      }
      var isPrevOpen = _this.state.open;
      onToggle && onToggle(!isPrevOpen);
      _this.setState(function (preState) {
        return {
          open: !preState.open
        };
      });
    };
    _this.onChange = function (e, option, idx) {
      e.stopPropagation();
      if (!(_this.props.placeholder && idx === 0)) {
        var selectedValue = option;
        if (_this._optionsWithLabel) {
          selectedValue = option.value;
          _this.setState({
            selectedOption: option
          });
        }
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _this.props.onChange(selectedValue, idx);
      }
      _this._toggleShowDropdown();
    };
    _this._handleDocumentClick = function (e) {
      if (_this.wrapper && _this.wrapper.contains(e.target)) {
        return;
      }
      if (_this.dropdownMenu && _this.dropdownMenu.contains(e.target)) {
        return;
      }
      _this._toggleShowDropdown();
    };
    _this._textChangeEmit = function (e) {
      var customInputLimit = _this.props.customInputLimit;
      if (customInputLimit && e.target.value && e.target.value.length > customInputLimit) {
        return;
      }
      if (_this._optionsWithLabel) {
        var oneOfOptions = _this.props.options.find(function (option) {
          return option.value === e.target.value;
        });
        if (oneOfOptions) {
          _this.setState({
            selectedOption: oneOfOptions
          });
        } else {
          _this.setState({
            selectedOption: {
              label: e.target.value ? 'Custom' : null,
              value: e.target.value
            }
          });
        }
      }
      if (_this.props.searchOption) {
        _this.setState({
          filter: e.target.value
        });
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.onChange(e.target.value);
    };
    var selectedOption = _this.props.options.find(function (x) {
      return x.value === _this.props.value;
    });
    _this.state = {
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      open: _this.props.open,
      filter: null,
      selectedOption: selectedOption || {
        value: _this.props.value,
        label: 'Custom'
      }
    };
    _this._optionsWithLabel = _this.props.optionsWithLabel && ((_this$props2 = _this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$options$ = _this$props2.options[0]) === null || _this$props2$options$ === void 0 ? void 0 : _this$props2$options$.label);
    return _this;
  }
  _inherits(DropdownSelect, _Component);
  return _createClass(DropdownSelect, [{
    key: "_reSetBoxValue",
    value: function _reSetBoxValue() {
      if (this.inputRef.current && this.inputRef.current.value !== this.saveContent) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        this.props.onChange(this.saveContent);
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props,
        renderDropdownMenu = _this$props3.renderDropdownMenu,
        open = _this$props3.open;
      if (prevState.open !== open) {
        if (renderDropdownMenu && this.wrapper) {
          var menu = this.renderDropdownMenu();
          var buttonPosition = this.wrapper.getBoundingClientRect();
          renderDropdownMenu(menu, open, buttonPosition);
        }
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
        this.setState({
          open: nextProps.open
        });
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "valueFunction",
    value: function valueFunction(option, idx) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return this.props.valueFunction(option, this.props.placeholder ? "".concat(idx - 1) : idx);
    }
  }, {
    key: "renderFunction",
    value: function renderFunction(option, idx) {
      if (this._optionsWithLabel) {
        return /*#__PURE__*/_react["default"].createElement(WithLabelWrapper, null, /*#__PURE__*/_react["default"].createElement(Label, {
          "data-sign": "optionLabel"
        }, option.label), /*#__PURE__*/_react["default"].createElement(Value, {
          "data-sign": "optionValue"
        }, option.value));
      }
      var _this$props4 = this.props,
        placeholder = _this$props4.placeholder,
        renderFunction = _this$props4.renderFunction;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return placeholder && idx === 0 ? placeholder : renderFunction(option, idx);
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var _this$props5 = this.props,
        placeholder = _this$props5.placeholder,
        renderValue = _this$props5.renderValue;
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
      var _this$props6 = this.props,
        titleEnabled = _this$props6.titleEnabled,
        renderTitle = _this$props6.renderTitle;
      if (titleEnabled) {
        return typeof renderTitle === 'function' ? renderTitle(selectedOption) : defaultTitle;
      }
      return '';
    }
  }, {
    key: "renderDropdownMenu",
    value: function renderDropdownMenu() {
      var _this2 = this;
      var _this$props7 = this.props,
        placeholder = _this$props7.placeholder,
        ellipsis = _this$props7.ellipsis,
        options = _this$props7.options,
        dropdownClassName = _this$props7.dropdownClassName,
        value = _this$props7.value,
        searchOption = _this$props7.searchOption,
        dropdownAlign = _this$props7.dropdownAlign;
      var _this$state = this.state,
        filter = _this$state.filter,
        open = _this$state.open;
      var currentOptions = placeholder ? [{}].concat(_toConsumableArray(options)) : options;
      if (searchOption && filter) {
        if (this._optionsWithLabel) {
          currentOptions = currentOptions.filter(function (option) {
            return searchOption(option.value, filter);
          });
        } else {
          currentOptions = currentOptions.filter(function (option) {
            return searchOption(option, filter);
          });
        }
      }
      if (!open) {
        currentOptions = [];
      }
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
        className: (0, _clsx["default"])(_styles["default"].dropdown, dropdownClassName),
        ref: function ref(_ref) {
          _this2.dropdownMenu = _ref;
        }
      }, currentOptions.map(function (option, idx) {
        var _option$disabled;
        var currentValue = _this2.valueFunction(option, idx);
        var selected = value === currentValue;
        var display = _this2.renderFunction(option, idx);
        var isOptionDisabled = (_option$disabled = option === null || option === void 0 ? void 0 : option.disabled) !== null && _option$disabled !== void 0 ? _option$disabled : false;
        return /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
          "data-sign": "selectMenuItem",
          key: currentValue || idx,
          selected: selected,
          className: (0, _clsx["default"])(
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          _styles["default"][dropdownAlign], ellipsis && _styles["default"].ellipsis, placeholder && _styles["default"].placeholder),
          title: _this2.renderTitle(option, option.value || display),
          onClick: function onClick(e) {
            if (!isOptionDisabled) {
              _this2.onChange(e, option, idx);
            }
          }
        }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
          "data-sign": display
        }, display));
      }));
    }
  }, {
    key: "renderSelectedOptionLabel",
    value: function renderSelectedOptionLabel() {
      var _this$state2 = this.state,
        open = _this$state2.open,
        selectedOption = _this$state2.selectedOption;
      if (!this._optionsWithLabel) return null;
      return /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "selectedLabel",
        className: (0, _clsx["default"])(_styles["default"].selectedOptionLabel, open ? _styles["default"].selectedOptionLabelHide : null)
      }, selectedOption.label);
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props8 = this.props,
        reference = _this$props8.reference,
        ellipsis = _this$props8.ellipsis,
        label = _this$props8.label,
        iconClassName = _this$props8.iconClassName,
        className = _this$props8.className,
        disabled = _this$props8.disabled,
        noPadding = _this$props8.noPadding,
        renderDropdownMenu = _this$props8.renderDropdownMenu,
        value = _this$props8.value,
        dataSign = _this$props8.dataSign,
        wrapperStyle = _this$props8.wrapperStyle,
        buttonStyle = _this$props8.buttonStyle,
        options = _this$props8.options,
        selectedClassName = _this$props8.selectedClassName,
        icon = _this$props8.icon,
        searchOption = _this$props8.searchOption,
        customInputEnabled = _this$props8.customInputEnabled;
      var _this$state3 = this.state,
        open = _this$state3.open,
        selectedOption = _this$state3.selectedOption;
      var currentLabel = label ? /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "searchInput",
        title: label
      }, label) : null;
      var currentIconClassName = (0, _clsx["default"])(_styles["default"].icon, open ? _styles["default"].iconUp : null, iconClassName);
      var containerClassName = (0, _clsx["default"])(_styles["default"].root, className, disabled ? _styles["default"].disabled : null, open ? _styles["default"].open : null, noPadding ? _styles["default"].noPadding : null);
      var buttonClassName = (0, _clsx["default"])(_styles["default"].button, disabled ? _styles["default"].disabled : null);
      var dropdownMenu = renderDropdownMenu || !this.state.open ? null : this.renderDropdownMenu();
      var renderValue = this.renderValue(value);
      var selectedOptionLabel = this.renderSelectedOptionLabel();
      return /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": dataSign,
        className: (0, _clsx["default"])(containerClassName, wrapperStyle),
        ref: function ref(_ref2) {
          if (reference) reference(_ref2);
          _this3.wrapper = _ref2;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "selectRoot",
        className: (0, _clsx["default"])(buttonClassName, buttonStyle),
        onClick: this._toggleShowDropdown,
        title: this.renderTitle(options[value], renderValue)
      }, currentLabel, searchOption || customInputEnabled ? /*#__PURE__*/_react["default"].createElement("input", {
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _clsx["default"])(_styles["default"].customInput, ellipsis && _styles["default"].ellipsis, selectedClassName, this._optionsWithLabel && _styles["default"].inputWithLabel, open && this._optionsWithLabel && _styles["default"].active),
        value: this._optionsWithLabel ? selectedOption.value : renderValue,
        onChange: this._textChangeEmit,
        id: "searchInput",
        autoComplete: "off"
      }) : /*#__PURE__*/_react["default"].createElement("span", {
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _clsx["default"])(_styles["default"].selectedValue, ellipsis && _styles["default"].ellipsis, selectedClassName, this._optionsWithLabel && _styles["default"].inputWithLabel)
      }, renderValue), /*#__PURE__*/_react["default"].createElement("span", {
        className: currentIconClassName
      }, icon === undefined ? /*#__PURE__*/_react["default"].createElement("i", {
        className: _DynamicsFont["default"].arrow
      }) : icon), this._optionsWithLabel && selectedOptionLabel), dropdownMenu));
    }
  }]);
}(_react.Component);
DropdownSelect.defaultProps = {
  icon: undefined,
  reference: undefined,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  selectedClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dropdownClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  iconClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | nu... Remove this comment to see the full error message
  value: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
  searchOption: null,
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'dropdownSelect',
  customInputEnabled: false,
  optionsWithLabel: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number | un... Remove this comment to see the full error message
  customInputLimit: null
};
var StyledDropdownSelect = exports.StyledDropdownSelect = (0, _juno.styled)(DropdownSelect)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([""])));
var _default = exports["default"] = DropdownSelect;
//# sourceMappingURL=DropdownSelect.js.map
