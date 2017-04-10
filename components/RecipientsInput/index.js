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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RemoveButton = require('../RemoveButton');

var _RemoveButton2 = _interopRequireDefault(_RemoveButton);

var _ContactDropdownList = require('../ContactDropdownList');

var _ContactDropdownList2 = _interopRequireDefault(_ContactDropdownList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectedRecipientItem(props) {
  var className = props.phoneNumber.length > 5 ? _styles2.default.blue : null;
  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'span',
      null,
      props.name
    ),
    _react2.default.createElement(_RemoveButton2.default, {
      className: _styles2.default.removeReceiver,
      onClick: props.onRemove,
      visibility: true
    })
  );
}

SelectedRecipientItem.propTypes = {
  name: _react.PropTypes.string.isRequired,
  phoneNumber: _react.PropTypes.string.isRequired,
  onRemove: _react.PropTypes.func.isRequired
};

function SelectedRecipients(props) {
  var items = props.items;
  if (items.length < 1) {
    return null;
  }
  return _react2.default.createElement(
    'ul',
    { className: _styles2.default.selectReceivers },
    items.map(function (item) {
      return _react2.default.createElement(SelectedRecipientItem, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return props.removeFromRecipients(item.phoneNumber);
        }
      });
    })
  );
}

SelectedRecipients.propTypes = {
  removeFromRecipients: _react.PropTypes.func.isRequired,
  items: _react2.default.PropTypes.arrayOf(_react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string.isRequired
  })).isRequired
};

var RecipientsInput = function (_Component) {
  (0, _inherits3.default)(RecipientsInput, _Component);

  function RecipientsInput(props) {
    (0, _classCallCheck3.default)(this, RecipientsInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecipientsInput.__proto__ || (0, _getPrototypeOf2.default)(RecipientsInput)).call(this, props));

    _this.state = {
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
      currentValue: props.value.replace(',', '')
    };

    _this.onReceiversInputFocus = function () {
      _this.setState({
        isFocusOnInput: true
      });
    };

    _this.onReceiversInputBlur = function () {
      _this.setState({
        isFocusOnInput: false
      });
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

    _this.handleHotKey = function (e) {
      if (_this.state.isFocusOnInput && _this.props.value.length >= 3) {
        if (e.key === 'ArrowUp') {
          _this.reduceSelectedContactIndex();
          _this.scrollOperation(e.key);
        } else if (e.key === 'ArrowDown') {
          _this.addSelectedContactIndex();
          _this.scrollOperation(e.key);
        }
      } else {
        _this.setState({
          selectedContactIndex: 0
        });
      }
      if (e.key === ',' || e.key === ';' || e.key === 'Enter') {
        e.preventDefault();
        if (_this.props.value.length === 0) {
          return;
        }
        var relatedContactList = _this.props.value.length >= 3 ? _this.props.searchContactList : [];
        var currentSelected = relatedContactList[_this.state.selectedContactIndex];
        if (currentSelected) {
          _this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber
          });
        } else {
          _this.props.addToRecipients({
            name: _this.props.value.replace(',', ''),
            phoneNumber: _this.props.value.replace(',', '')
          });
          _this.props.onClean();
        }
        _this.props.onClean();
      }
    };
    return _this;
  }

  (0, _createClass3.default)(RecipientsInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        currentValue: newProps.value.replace(',', '')
      });
      if (newProps.value && newProps.value !== this.props.value && this.props.value[this.props.value.length - 1] === ',') {
        this.setState({
          isFocusOnInput: true
        });
        this.props.addToRecipients({
          name: this.props.value.replace(',', ''),
          phoneNumber: this.props.value.replace(',', '')
        }, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var relatedContactList = this.props.value.length >= 3 ? this.props.searchContactList : [];
      var label = this.props.label ? _react2.default.createElement(
        'label',
        null,
        this.props.label
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.container, onKeyDown: this.handleHotKey },
        label,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.rightPanel },
          _react2.default.createElement(SelectedRecipients, {
            items: this.props.recipients,
            removeFromRecipients: this.props.removeFromRecipients
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.inputField },
            _react2.default.createElement('input', {
              name: 'receiver',
              value: this.state.currentValue,
              onChange: this.props.onChange,
              onKeyUp: this.props.onKeyUp,
              onKeyDown: this.props.onKeyDown,
              className: _styles2.default.numberInput,
              maxLength: 30,
              onFocus: this.onReceiversInputFocus,
              onBlur: this.onReceiversInputBlur,
              placeholder: this.props.placeholder,
              autoComplete: 'off'
            })
          ),
          _react2.default.createElement(_RemoveButton2.default, {
            className: _styles2.default.removeButton,
            onClick: this.props.onClean,
            visibility: this.props.value.length > 0 && this.state.isFocusOnInput
          })
        ),
        _react2.default.createElement(_ContactDropdownList2.default, {
          scrollDirection: this.state.scrollDirection,
          selectedIndex: this.state.selectedContactIndex,
          setSelectedIndex: this.setSelectedIndex,
          addToRecipients: this.props.addToRecipients,
          items: relatedContactList,
          formatContactPhone: this.props.formatContactPhone,
          className: _styles2.default.contactsDropdown,
          visibility: this.state.isFocusOnInput
        })
      );
    }
  }]);
  return RecipientsInput;
}(_react.Component);

RecipientsInput.propTypes = {
  label: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  searchContactList: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    entityType: _react.PropTypes.string.isRequired,
    phoneType: _react.PropTypes.string.isRequired,
    phoneNumber: _react.PropTypes.string.isRequired
  })).isRequired,
  recipients: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string.isRequired
  })).isRequired,
  value: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  onClean: _react.PropTypes.func.isRequired,
  onKeyUp: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  addToRecipients: _react.PropTypes.func.isRequired,
  removeFromRecipients: _react.PropTypes.func.isRequired,
  formatContactPhone: _react.PropTypes.func.isRequired
};

RecipientsInput.defaultProps = {
  label: null,
  placeholder: '',
  onKeyUp: function onKeyUp() {
    return null;
  },
  onKeyDown: function onKeyDown() {
    return null;
  }
};

exports.default = RecipientsInput;
//# sourceMappingURL=index.js.map
