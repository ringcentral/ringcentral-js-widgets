"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledDropdownSelect = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ellipsis = require("@ringcentral/juno/es6/foundation/styles/ellipsis.js");

var _flexWidth = require("@ringcentral/juno/es6/foundation/styles/flexWidth.js");

var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");

var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");

var _MenuList = require("@ringcentral/juno/es6/components/Menu/MenuList/MenuList.js");

var _ThemeProvider = require("@ringcentral/juno/es6/foundation/theme/ThemeProvider.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject5() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n\n  span {\n    ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  text-align: right;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  margin-right: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    .RcListItemText-primary {\n      font-size: 13px;\n    }\n    margin: 0;\n  }\n\n  padding-left: ", ";\n  padding-right: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var gutter = (0, _spacing.spacing)(2.5);
var StyledMenuItem = (0, _styledComponents["default"])(_MenuItem.RcMenuItem)(_templateObject(), _ListItemText.RcListItemText, gutter, gutter);

var Label = _styledComponents["default"].span(_templateObject2(), (0, _flexWidth.flexWidth)('40%'), (0, _spacing.spacing)(2));

var Value = _styledComponents["default"].span(_templateObject3());

var WithLabelWrapper = _styledComponents["default"].div(_templateObject4(), _ellipsis.ellipsis);

StyledMenuItem.defaultProps = {
  disableGutters: true
};

var DropdownSelect = /*#__PURE__*/function (_Component) {
  _inherits(DropdownSelect, _Component);

  var _super = _createSuper(DropdownSelect);

  function DropdownSelect(props) {
    var _this$props2, _this$props2$options$;

    var _this;

    _classCallCheck(this, DropdownSelect);

    _this = _super.call(this, props);
    _this.inputRef = /*#__PURE__*/(0, _react.createRef)();
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
          _this.saveContent = _this.inputRef.current.value;

          _this.inputRef.current.focus();

          if (!customInputEnabled && document.execCommand) {
            document.execCommand('selectAll', false, null);
          }
        }

        if (_this._optionsWithLabel) {
          _this.inputRef.current.style.textAlign = 'left';

          if (customInputEnabled) {
            var valueLength = _this.inputRef.current.value.length;

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
            document.getSelection().removeAllRanges();
          }
        }

        if (_this._optionsWithLabel) {
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

      _this.props.onChange(e.target.value);
    };

    var selectedOption = _this.props.options.find(function (x) {
      return x.value === _this.props.value;
    });

    _this.state = {
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

  _createClass(DropdownSelect, [{
    key: "_reSetBoxValue",
    value: function _reSetBoxValue() {
      if (this.inputRef.current && this.inputRef.current.value !== this.saveContent) {
        this.props.onChange(this.saveContent);
      }
    }
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
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
        this.setState({
          open: nextProps.open
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "valueFunction",
    value: function valueFunction(option, idx) {
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
        return value === 0 ? placeholder : renderValue(value - 1);
      }

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
      var filter = this.state.filter;
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

      return /*#__PURE__*/_react["default"].createElement(_MenuList.RcMenuList, {
        className: (0, _classnames["default"])(_styles["default"].dropdown, dropdownClassName),
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
          className: (0, _classnames["default"])(_styles["default"][dropdownAlign], ellipsis && _styles["default"].ellipsis, placeholder && _styles["default"].placeholder),
          title: _this2.renderTitle(option, option.value || display),
          onClick: function onClick(e) {
            if (!isOptionDisabled) {
              _this2.onChange(e, option, idx);
            }
          }
        }, /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, null, display));
      }));
    }
  }, {
    key: "renderSelectedOptionLabel",
    value: function renderSelectedOptionLabel() {
      var _this$state = this.state,
          open = _this$state.open,
          selectedOption = _this$state.selectedOption;
      if (!this._optionsWithLabel) return null;
      return /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "selectedLabel",
        className: (0, _classnames["default"])(_styles["default"].selectedOptionLabel, open ? _styles["default"].selectedOptionLabelHide : null)
      }, selectedOption.label);
    }
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
      var _this$state2 = this.state,
          open = _this$state2.open,
          selectedOption = _this$state2.selectedOption;
      var currentLabel = label ? /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "searchInput"
      }, label) : null;
      var currentIconClassName = (0, _classnames["default"])(_styles["default"].icon, open ? _styles["default"].iconUp : null, iconClassName);
      var containerClassName = (0, _classnames["default"])(_styles["default"].root, className, disabled ? _styles["default"].disabled : null, open ? _styles["default"].open : null, noPadding ? _styles["default"].noPadding : null);
      var buttonClassName = (0, _classnames["default"])(_styles["default"].button, disabled ? _styles["default"].disabled : null);
      var dropdownMenu = renderDropdownMenu ? null : this.renderDropdownMenu();
      var renderValue = this.renderValue(value);
      var selectedOptionLabel = this.renderSelectedOptionLabel();
      return /*#__PURE__*/_react["default"].createElement(_ThemeProvider.RcSubThemeProvider, null, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": dataSign,
        className: (0, _classnames["default"])(containerClassName, wrapperStyle),
        ref: function ref(_ref2) {
          if (reference) reference(_ref2);
          _this3.wrapper = _ref2;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "selectRoot",
        className: (0, _classnames["default"])(buttonClassName, buttonStyle),
        onClick: this._toggleShowDropdown,
        title: this.renderTitle(options[value], renderValue)
      }, currentLabel, searchOption || customInputEnabled ? /*#__PURE__*/_react["default"].createElement("input", {
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _classnames["default"])(_styles["default"].customInput, ellipsis && _styles["default"].ellipsis, selectedClassName, this._optionsWithLabel && _styles["default"].inputWithLabel, open && this._optionsWithLabel && _styles["default"].active),
        value: this._optionsWithLabel ? selectedOption.value : renderValue,
        onChange: this._textChangeEmit,
        id: "searchInput",
        autoComplete: "off"
      }) : /*#__PURE__*/_react["default"].createElement("span", {
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _classnames["default"])(_styles["default"].selectedValue, ellipsis && _styles["default"].ellipsis, selectedClassName, this._optionsWithLabel && _styles["default"].inputWithLabel)
      }, renderValue), /*#__PURE__*/_react["default"].createElement("span", {
        className: currentIconClassName
      }, icon === undefined ? /*#__PURE__*/_react["default"].createElement("i", {
        className: _DynamicsFont["default"].arrow
      }) : icon), this._optionsWithLabel && selectedOptionLabel), dropdownMenu));
    }
  }]);

  return DropdownSelect;
}(_react.Component);

DropdownSelect.defaultProps = {
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
  dataSign: 'dropdownSelect',
  customInputEnabled: false,
  optionsWithLabel: false,
  customInputLimit: null
};
var StyledDropdownSelect = (0, _styledComponents["default"])(DropdownSelect)(_templateObject5());
exports.StyledDropdownSelect = StyledDropdownSelect;
var _default = DropdownSelect;
exports["default"] = _default;
//# sourceMappingURL=DropdownSelect.js.map
