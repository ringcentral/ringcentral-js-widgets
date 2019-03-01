"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownSelect, _Component);

  function DropdownSelect(props) {
    var _this;

    _classCallCheck(this, DropdownSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownSelect).call(this, props));

    _this.toggleShowDropdown = function (e) {
      if (!_this.state.open) {
        window.addEventListener('click', _this._handleDocumentClick, false);
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
      }

      if (e && _this.props.stopPropagation) {
        e.stopPropagation();
      }

      if (_this.props.disabled) {
        return;
      }

      _this.props.onToggle(!_this.state.open);

      _this.setState(function (preState) {
        return {
          open: !preState.open
        };
      });
    };

    _this.onChange = function (e, option, idx) {
      e.stopPropagation();

      if (_this.props.placeholder && idx === 0) {
        _this.toggleShowDropdown();

        return;
      }

      _this.props.onChange(option, idx);

      _this.toggleShowDropdown();
    };

    _this._handleDocumentClick = function (e) {
      if (!_this.mounted) {
        return;
      }

      if (_this.wrapper && _this.wrapper.contains(e.target)) {
        return;
      }

      if (_this.dropdownMenu && _this.dropdownMenu.contains(e.target)) {
        return;
      }

      _this.props.onToggle(false);

      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: _this.props.open
    };
    return _this;
  }

  _createClass(DropdownSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.open !== this.state.open) {
        if (this.props.renderDropdownMenu && this.wrapper) {
          var menu = this.renderDropdownMenu();
          var buttomPosition = this.wrapper.getBoundingClientRect();
          this.props.renderDropdownMenu(menu, this.state.open, buttomPosition);
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
      this.mounted = false;
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "valueFunction",
    value: function valueFunction(_, idx) {
      if (this.props.placeholder) {
        idx = "".concat(idx - 1);
      }

      return this.props.valueFunction(_, idx);
    }
  }, {
    key: "renderFunction",
    value: function renderFunction(option, idx) {
      if (this.props.placeholder) {
        return idx === 0 ? this.props.placeholder : this.props.renderFunction(option, idx);
      }

      return this.props.renderFunction(option, idx);
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      if (this.props.placeholder) {
        value = parseInt(value, 10) + 1;
        return value === 0 ? this.props.placeholder : this.props.renderValue(value - 1);
      }

      return this.props.renderValue(value);
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(selectedOption, defaultTitle) {
      if (this.props.titleEnabled) {
        return typeof this.props.renderTitle === 'function' ? this.props.renderTitle(selectedOption) : defaultTitle;
      }

      return '';
    }
  }, {
    key: "renderDropdownMenu",
    value: function renderDropdownMenu() {
      var _this2 = this;

      var options;
      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          ellipsis = _this$props.ellipsis;

      if (placeholder) {
        options = [{}].concat(_toConsumableArray(this.props.options));
      } else {
        options = this.props.options;
      }

      return _react.default.createElement("ul", {
        className: (0, _classnames.default)(_styles.default.dropdown, this.props.dropdownClassName, placeholder && _styles.default.placeholder),
        ref: function ref(_ref) {
          _this2.dropdownMenu = _ref;
        }
      }, options.map(function (option, idx) {
        var currentValue = _this2.valueFunction(option, idx);

        var className = (0, _classnames.default)(_styles.default.dropdownItem, _this2.props.value === currentValue ? _styles.default.selected : null);

        var display = _this2.renderFunction(option, idx);

        return _react.default.createElement("li", {
          "data-sign": "selectMenuItem",
          key: currentValue || idx,
          className: (0, _classnames.default)(className, _styles.default[_this2.props.dropdownAlign], ellipsis && _styles.default.ellipsis, placeholder && _styles.default.placeholder),
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

      var ellipsis = this.props.ellipsis;
      var reference = this.props.reference;
      var label = this.props.label ? _react.default.createElement("label", null, this.props.label) : null;
      var iconClassName = (0, _classnames.default)(_styles.default.icon, this.state.open ? _styles.default.iconUp : null, this.props.iconClassName);
      var containerClassName = (0, _classnames.default)(_styles.default.root, this.props.className, this.props.disabled ? _styles.default.disabled : null, this.state.open ? _styles.default.open : null, this.props.noPadding ? _styles.default.noPadding : null);
      var buttonClassName = (0, _classnames.default)(_styles.default.button, this.props.disabled ? _styles.default.disabled : null);
      var dropdownMenu = this.props.renderDropdownMenu ? null : this.renderDropdownMenu();
      var renderValue = this.renderValue(this.props.value);
      return _react.default.createElement("div", {
        "data-sign": this.props.dataSign,
        className: (0, _classnames.default)(containerClassName, this.props.wrapperStyle),
        ref: function ref(_ref2) {
          if (reference) reference(_ref2);
          _this3.wrapper = _ref2;
        }
      }, _react.default.createElement("div", {
        type: "button",
        className: (0, _classnames.default)(buttonClassName, this.props.buttonStyle),
        onClick: this.toggleShowDropdown,
        title: this.renderTitle(this.props.options[this.props.value], renderValue)
      }, label, _react.default.createElement("span", {
        "data-sign": "selectedItem",
        className: (0, _classnames.default)(_styles.default.selectedValue, ellipsis && _styles.default.ellipsis, this.props.selectedClassName)
      }, renderValue), _react.default.createElement("span", {
        className: iconClassName
      }, this.props.icon ? this.props.icon : _react.default.createElement("i", {
        className: _DynamicsFont.default.arrow
      }))), dropdownMenu);
    }
  }]);

  return DropdownSelect;
}(_react.Component);

DropdownSelect.propTypes = {
  icon: _propTypes.default.node,
  reference: _propTypes.default.func,
  className: _propTypes.default.string,
  selectedClassName: _propTypes.default.string,
  dropdownClassName: _propTypes.default.string,
  iconClassName: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object, _propTypes.default.number]),
  label: _propTypes.default.string,
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  options: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  valueFunction: _propTypes.default.func,
  renderFunction: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderDropdownMenu: _propTypes.default.func,
  renderTitle: _propTypes.default.func,
  titleEnabled: _propTypes.default.bool,
  dropdownAlign: _propTypes.default.oneOf(['left', 'center', 'right']),
  stopPropagation: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  ellipsis: _propTypes.default.bool,
  noPadding: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  open: _propTypes.default.bool,
  wrapperStyle: _propTypes.default.string,
  buttonStyle: _propTypes.default.string,
  dataSign: _propTypes.default.string
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
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'dropdownSelect'
};
var _default = DropdownSelect;
exports.default = _default;
//# sourceMappingURL=index.js.map
