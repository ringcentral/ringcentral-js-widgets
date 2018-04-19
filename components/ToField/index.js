'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RemoveButton = require('../RemoveButton');

var _RemoveButton2 = _interopRequireDefault(_RemoveButton);

var _ContactDropdownList = require('../ContactDropdownList');

var _ContactDropdownList2 = _interopRequireDefault(_ContactDropdownList);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectedRecipientItem(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$name = _ref.name,
      name = _ref$name === undefined ? phoneNumber : _ref$name,
      onRemove = _ref.onRemove;

  var className = phoneNumber.length > 5 ? _styles2.default.phoneNumber : _styles2.default.extension;
  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'span',
      null,
      name
    ),
    _react2.default.createElement(_RemoveButton2.default, {
      className: _styles2.default.removeReceiver,
      onClick: onRemove,
      visibility: true
    })
  );
}

SelectedRecipientItem.propTypes = {
  name: _propTypes2.default.string,
  phoneNumber: _propTypes2.default.string.isRequired,
  onRemove: _propTypes2.default.func.isRequired
};
SelectedRecipientItem.defaultProps = {
  name: undefined
};

function SelectedRecipients(_ref2) {
  var items = _ref2.items,
      removeFromRecipients = _ref2.removeFromRecipients;

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
          return removeFromRecipients(item.phoneNumber);
        }
      });
    })
  );
}

SelectedRecipients.propTypes = {
  removeFromRecipients: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  })).isRequired
};

var ToField = function (_Component) {
  (0, _inherits3.default)(ToField, _Component);

  function ToField(props) {
    (0, _classCallCheck3.default)(this, ToField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ToField.__proto__ || (0, _getPrototypeOf2.default)(ToField)).call(this, props));

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

    _this.onReceiversInputKeyUp = function (e) {
      _this.props.searchContact({ searchString: e.currentTarget.value });
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
      var length = _this.props.searchResults.length;
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

    _this.isSplitter = function (e) {
      if (e.key === ',' || e.key === ';' || e.key === 'Enter' || e.key === 'Unidentified' && ( // for Safari (FF cannot rely on keyCode...)
      e.keyCode === 186 || // semicolon
      e.keyCode === 188 || // comma
      e.keyCode === 13) // enter
      ) {
          return true;
        }
      return false;
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
      if (_this.isSplitter(e)) {
        e.preventDefault();
        if (_this.props.value.length === 0) {
          return;
        }
        var relatedContactList = _this.props.value.length >= 3 ? _this.props.searchResults : [];
        var currentSelected = relatedContactList[_this.state.selectedContactIndex];
        if (currentSelected && e.key === 'Enter') {
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

    _this.state = {
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
      currentValue: props.value.replace(',', '')
    };
    return _this;
  }
  // using React SyntheticEvent to deal with cross browser issue


  (0, _createClass3.default)(ToField, [{
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.searchContact({ searchString: this.props.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var relatedContactList = this.props.value.length >= 3 ? this.props.searchResults : [];
      var label = _react2.default.createElement(
        'label',
        null,
        this.props.label || _i18n2.default.getString('to', this.props.currentLocale)
      );
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
              onKeyUp: this.onInputKeyUp,
              className: _styles2.default.numberInput,
              maxLength: 30,
              onFocus: this.onReceiversInputFocus,
              onBlur: this.onReceiversInputBlur,
              placeholder: this.props.placeholder || _i18n2.default.getString('enterNameOrNumber', this.props.currentLocale),
              autoComplete: 'off',
              autoFocus: this.props.autoFocus // eslint-disable-line
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
          formatContactPhone: this.props.formatPhone,
          visibility: this.state.isFocusOnInput,
          titleEnabled: this.props.titleEnabled
        })
      );
    }
  }]);
  return ToField;
}(_react.Component);

exports.default = ToField;


ToField.propTypes = {
  label: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  searchContact: _propTypes2.default.func,
  searchResults: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    entityType: _propTypes2.default.string.isRequired,
    phoneType: _propTypes2.default.string.isRequired,
    phoneNumber: _propTypes2.default.string.isRequired
  })),
  recipients: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  })).isRequired,
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onClean: _propTypes2.default.func.isRequired,
  addToRecipients: _propTypes2.default.func.isRequired,
  removeFromRecipients: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func,
  titleEnabled: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  currentLocale: _propTypes2.default.string.isRequired
};

ToField.defaultProps = {
  label: null,
  placeholder: null,
  titleEnabled: undefined,
  autoFocus: false,
  searchContact: function searchContact() {
    return null;
  },
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  searchResults: []
};
//# sourceMappingURL=index.js.map
