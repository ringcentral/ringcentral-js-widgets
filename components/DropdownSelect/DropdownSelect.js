"use strict";

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var DropdownSelect = /*#__PURE__*/function (_Component) {
  _inherits(DropdownSelect, _Component);

  var _super = _createSuper(DropdownSelect);

  function DropdownSelect(props) {
    var _this;

    _classCallCheck(this, DropdownSelect);

    _this = _super.call(this, props);
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
          _this.saveContent = _this.inputRef.current.textContent;

          _this.inputRef.current.focus();

          if (document.execCommand) {
            document.execCommand('selectAll', false, null);
          }
        }
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);

        if (searchOption) {
          if (document.getSelection) {
            document.getSelection().removeAllRanges();
          }
        }
      }

      if (e && stopPropagation) {
        e.stopPropagation();
      }

      if (disabled) {
        return;
      }

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
        _this.props.onChange(option, idx);
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
      _this.setState({
        filter: e.target.textContent
      });
    };

    _this._textPasteEmit = function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData('text/plain');

      if (document.execCommand) {
        document.execCommand('insertHTML', false, text);
      }
    };

    _this.state = {
      open: _this.props.open,
      filter: null
    };
    return _this;
  }

  _createClass(DropdownSelect, [{
    key: "_reSetBoxValue",
    value: function _reSetBoxValue() {
      if (this.inputRef.current && this.inputRef.current.textContent !== this.saveContent) {
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
        inputElm.setAttribute('contenteditable', 'true');
        inputElm.addEventListener('input', this._textChangeEmit, false);
        inputElm.addEventListener('paste', this._textPasteEmit, false);
      }
    }
  }, {
    key: "_removeInputListener",
    value: function _removeInputListener() {
      if (this.props.searchOption) {
        var inputElm = this.inputRef.current;
        inputElm.removeEventListener('input', this._textChangeEmit, false);
        inputElm.removeEventListener('paste', this._textPasteEmit, false);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._bindInputListener();
    }
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
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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

      this._removeInputListener();
    }
  }, {
    key: "valueFunction",
    value: function valueFunction(_, idx) {
      return this.props.valueFunction(_, this.props.placeholder ? "".concat(idx - 1) : idx);
    }
  }, {
    key: "renderFunction",
    value: function renderFunction(option, idx) {
      var _this$props3 = this.props,
          placeholder = _this$props3.placeholder,
          renderFunction = _this$props3.renderFunction;
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
        return value === 0 ? placeholder : renderValue(value - 1);
      }

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
        className: (0, _classnames["default"])(_styles["default"].dropdown, dropdownClassName, placeholder && _styles["default"].placeholder),
        ref: function ref(_ref) {
          _this2.dropdownMenu = _ref;
        }
      }, currentOptions.map(function (option, idx) {
        var currentValue = _this2.valueFunction(option, idx);

        var className = (0, _classnames["default"])(_styles["default"].dropdownItem, value === currentValue ? _styles["default"].selected : null);

        var display = _this2.renderFunction(option, idx);

        return /*#__PURE__*/_react["default"].createElement("li", {
          "data-sign": "selectMenuItem",
          key: currentValue || idx,
          className: (0, _classnames["default"])(className, _styles["default"][dropdownAlign], ellipsis && _styles["default"].ellipsis, placeholder && _styles["default"].placeholder),
          value: currentValue,
          title: _this2.renderTitle(option, display),
          onClick: function onClick(e) {
            return _this2.onChange(e, option, idx);
          }
        }, display);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props7 = this.props,
          reference = _this$props7.reference,
          ellipsis = _this$props7.ellipsis,
          label = _this$props7.label,
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
      var currentLabel = label ? /*#__PURE__*/_react["default"].createElement("label", null, label) : null;
      var currentIconClassName = (0, _classnames["default"])(_styles["default"].icon, this.state.open ? _styles["default"].iconUp : null, iconClassName);
      var containerClassName = (0, _classnames["default"])(_styles["default"].root, className, disabled ? _styles["default"].disabled : null, this.state.open ? _styles["default"].open : null, noPadding ? _styles["default"].noPadding : null);
      var buttonClassName = (0, _classnames["default"])(_styles["default"].button, disabled ? _styles["default"].disabled : null);
      var dropdownMenu = renderDropdownMenu ? null : this.renderDropdownMenu();
      var renderValue = this.renderValue(value);
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": dataSign,
        className: (0, _classnames["default"])(containerClassName, wrapperStyle),
        ref: function ref(_ref2) {
          if (reference) reference(_ref2);
          _this3.wrapper = _ref2;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        type: "button",
        className: (0, _classnames["default"])(buttonClassName, buttonStyle),
        onClick: this._toggleShowDropdown,
        title: this.renderTitle(options[value], renderValue)
      }, currentLabel, /*#__PURE__*/_react["default"].createElement("span", {
        ref: this.inputRef,
        "data-sign": "selectedItem",
        className: (0, _classnames["default"])(_styles["default"].selectedValue, ellipsis && _styles["default"].ellipsis, selectedClassName)
      }, renderValue), /*#__PURE__*/_react["default"].createElement("span", {
        className: currentIconClassName
      }, icon === undefined ? /*#__PURE__*/_react["default"].createElement("i", {
        className: _DynamicsFont["default"].arrow
      }) : icon)), dropdownMenu);
    }
  }]);

  return DropdownSelect;
}(_react.Component);

DropdownSelect.propTypes = {
  icon: _propTypes["default"].node,
  reference: _propTypes["default"].func,
  className: _propTypes["default"].string,
  selectedClassName: _propTypes["default"].string,
  dropdownClassName: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]),
  label: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  options: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  valueFunction: _propTypes["default"].func,
  // the render of dropdown menu item
  renderFunction: _propTypes["default"].func,
  // the button display render
  renderValue: _propTypes["default"].func,
  renderDropdownMenu: _propTypes["default"].func,
  renderTitle: _propTypes["default"].func,
  titleEnabled: _propTypes["default"].bool,
  dropdownAlign: _propTypes["default"].oneOf(['left', 'center', 'right']),
  stopPropagation: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  ellipsis: _propTypes["default"].bool,
  noPadding: _propTypes["default"].bool,
  onToggle: _propTypes["default"].func,
  searchOption: _propTypes["default"].func,
  open: _propTypes["default"].bool,
  wrapperStyle: _propTypes["default"].string,
  buttonStyle: _propTypes["default"].string,
  dataSign: _propTypes["default"].string
};
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
  dataSign: 'dropdownSelect'
};
var _default = DropdownSelect;
exports["default"] = _default;
//# sourceMappingURL=DropdownSelect.js.map
