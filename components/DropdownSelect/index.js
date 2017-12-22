'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownSelect = function (_Component) {
  (0, _inherits3.default)(DropdownSelect, _Component);

  function DropdownSelect(props) {
    (0, _classCallCheck3.default)(this, DropdownSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DropdownSelect.__proto__ || (0, _getPrototypeOf2.default)(DropdownSelect)).call(this, props));

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
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(DropdownSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: 'componentDidUpdate',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: 'valueFunction',
    value: function valueFunction(_, idx) {
      if (this.props.placeholder) {
        idx = '' + (idx - 1);
      }
      return this.props.valueFunction(_, idx);
    }
  }, {
    key: 'renderFunction',
    value: function renderFunction(option, idx) {
      if (this.props.placeholder) {
        return idx === 0 ? this.props.placeholder : this.props.renderFunction(option, idx);
      }
      return this.props.renderFunction(option, idx);
    }
  }, {
    key: 'renderValue',
    value: function renderValue(value) {
      if (this.props.placeholder) {
        value = parseInt(value, 10) + 1;
        return value === 0 ? this.props.placeholder : this.props.renderValue(value - 1);
      }
      return this.props.renderValue(value);
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle(selectedOption, defaultTitle) {
      if (this.props.titleEnabled) {
        return typeof this.props.renderTitle === 'function' ? this.props.renderTitle(selectedOption) : defaultTitle;
      }
      return '';
    }
  }, {
    key: 'renderDropdownMenu',
    value: function renderDropdownMenu() {
      var _this2 = this;

      var options = void 0;
      var _props = this.props,
          placeholder = _props.placeholder,
          ellipsis = _props.ellipsis;

      if (placeholder) {
        options = [{}].concat((0, _toConsumableArray3.default)(this.props.options));
      } else {
        options = this.props.options;
      }
      return _react2.default.createElement(
        'ul',
        {
          className: (0, _classnames2.default)(_styles2.default.dropdown, placeholder && _styles2.default.placeholder),
          ref: function ref(_ref) {
            _this2.dropdownMenu = _ref;
          } },
        options.map(function (option, idx) {
          var currentValue = _this2.valueFunction(option, idx);
          var className = (0, _classnames2.default)(_styles2.default.dropdownItem, _this2.props.value === currentValue ? _styles2.default.selected : null);
          var display = _this2.renderFunction(option, idx);
          return _react2.default.createElement(
            'li',
            {
              key: currentValue,
              className: (0, _classnames2.default)(className, _styles2.default[_this2.props.dropdownAlign], ellipsis && _styles2.default.ellipsis, placeholder && _styles2.default.placeholder),
              value: currentValue,
              title: _this2.renderTitle(option, display),
              onClick: function onClick(e) {
                return _this2.onChange(e, option, idx);
              }
            },
            display
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var ellipsis = this.props.ellipsis;
      var reference = this.props.reference;
      var label = this.props.label ? _react2.default.createElement(
        'label',
        null,
        this.props.label
      ) : null;
      var iconClassName = (0, _classnames2.default)(_styles2.default.icon, this.state.open ? _styles2.default.iconUp : null, this.props.iconClassName);
      var containerClassName = (0, _classnames2.default)(_styles2.default.root, this.props.className, this.props.disabled ? _styles2.default.disabled : null, this.state.open ? _styles2.default.open : null, this.props.noPadding ? _styles2.default.noPadding : null);
      var dropdownMenu = this.props.renderDropdownMenu ? null : this.renderDropdownMenu();

      var renderValue = this.renderValue(this.props.value);
      return _react2.default.createElement(
        'div',
        {
          className: containerClassName,
          ref: function ref(_ref2) {
            if (reference) reference(_ref2);
            _this3.wrapper = _ref2;
          }
        },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: _styles2.default.button,
            onClick: this.toggleShowDropdown,
            title: this.renderTitle(this.props.options[this.props.value], renderValue) },
          label,
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)(_styles2.default.selectedValue, ellipsis && _styles2.default.ellipsis) },
            renderValue
          ),
          _react2.default.createElement(
            'span',
            { className: iconClassName },
            _react2.default.createElement('i', { className: _DynamicsFont2.default.arrow })
          )
        ),
        dropdownMenu
      );
    }
  }]);
  return DropdownSelect;
}(_react.Component);

DropdownSelect.propTypes = {
  reference: _propTypes2.default.func,
  className: _propTypes2.default.string,
  iconClassName: _propTypes2.default.string,
  value: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  options: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  valueFunction: _propTypes2.default.func,
  renderFunction: _propTypes2.default.func,
  renderValue: _propTypes2.default.func,
  renderDropdownMenu: _propTypes2.default.func,
  renderTitle: _propTypes2.default.func,
  titleEnabled: _propTypes2.default.bool,
  dropdownAlign: _propTypes2.default.oneOf(['left', 'center', 'right']),
  stopPropagation: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  ellipsis: _propTypes2.default.bool,
  noPadding: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func
};

DropdownSelect.defaultProps = {
  reference: undefined,
  className: null,
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
  onToggle: function onToggle() {}
};

exports.default = DropdownSelect;
//# sourceMappingURL=index.js.map
