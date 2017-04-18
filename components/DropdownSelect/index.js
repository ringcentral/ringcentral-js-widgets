'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    _this.state = {
      open: false
    };
    _this.mounted = true;

    _this.toggleShowDropdown = function () {
      if (_this.props.disabled) {
        return;
      }
      _this.setState(function (preState) {
        return {
          open: !preState.open
        };
      });
    };

    _this.onChange = function (e, option, idx) {
      e.stopPropagation();
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
      _this.setState({
        open: false
      });
    };
    return _this;
  }

  (0, _createClass3.default)(DropdownSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      window.addEventListener('click', this._handleDocumentClick, false);
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
    key: 'renderDropdownMenu',
    value: function renderDropdownMenu() {
      var _this2 = this;

      return _react2.default.createElement(
        'ul',
        { className: _styles2.default.dropdown, ref: function ref(_ref) {
            _this2.dropdownMenu = _ref;
          } },
        this.props.options.map(function (option, idx) {
          var currentValue = _this2.props.valueFunction(option, idx);
          var className = (0, _classnames2.default)(_styles2.default.dropdownItem, _this2.props.value === currentValue ? _styles2.default.selected : null);
          var display = _this2.props.renderFunction(option, idx);
          return _react2.default.createElement(
            'li',
            {
              key: currentValue,
              className: (0, _classnames2.default)(className, _styles2.default[_this2.props.dropdownAlign]),
              value: currentValue,
              title: _this2.props.titleEnabled && display,
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

      var label = this.props.label ? _react2.default.createElement(
        'label',
        null,
        this.props.label
      ) : null;
      var iconClassName = (0, _classnames2.default)(_styles2.default.icon, this.state.open ? _styles2.default.iconUp : null);
      var containerClassName = (0, _classnames2.default)(_styles2.default.root, this.props.className, this.props.disabled ? _styles2.default.disabled : null, this.state.open ? _styles2.default.open : null);
      var dropdownMenu = this.props.renderDropdownMenu ? null : this.renderDropdownMenu();

      var renderValue = this.props.renderValue(this.props.value);
      return _react2.default.createElement(
        'div',
        {
          className: containerClassName,
          ref: function ref(_ref2) {
            _this3.wrapper = _ref2;
          }
        },
        _react2.default.createElement(
          'button',
          {
            className: _styles2.default.button,
            onClick: this.toggleShowDropdown,
            title: this.props.titleEnabled && renderValue },
          label,
          _react2.default.createElement(
            'span',
            { className: _styles2.default.selectedValue },
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
  className: _react.PropTypes.string,
  value: _react.PropTypes.string,
  label: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  disabled: _react.PropTypes.bool,
  options: _react.PropTypes.arrayOf(_react.PropTypes.any).isRequired,
  valueFunction: _react.PropTypes.func,
  renderFunction: _react.PropTypes.func,
  renderValue: _react.PropTypes.func,
  renderDropdownMenu: _react.PropTypes.func,
  dropdownAlign: _react.PropTypes.oneOf(['left', 'center', 'right']),
  titleEnabled: _react.PropTypes.bool
};

DropdownSelect.defaultProps = {
  className: null,
  value: null,
  label: null,
  onChange: undefined,
  disabled: false,
  renderDropdownMenu: undefined,
  valueFunction: function valueFunction(option) {
    return option;
  },
  renderFunction: function renderFunction(option) {
    return option;
  },
  renderValue: function renderValue(option) {
    return option;
  },
  dropdownAlign: 'center',
  titleEnabled: undefined
};

exports.default = DropdownSelect;
//# sourceMappingURL=index.js.map
