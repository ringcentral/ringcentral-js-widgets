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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
  var recipient = _ref2.recipient,
      recipients = _ref2.recipients,
      multiple = _ref2.multiple,
      _onRemove = _ref2.onRemove;

  if (multiple && recipients.length) {
    return _react2.default.createElement(
      'ul',
      { className: _styles2.default.selectReceivers },
      recipients.map(function (item) {
        return _react2.default.createElement(SelectedRecipientItem, {
          key: item.phoneNumber,
          name: item.name,
          phoneNumber: item.phoneNumber,
          onRemove: function onRemove() {
            return _onRemove(item.phoneNumber);
          }
        });
      })
    );
  } else if (!multiple && recipient) {
    return _react2.default.createElement(
      'ul',
      { className: _styles2.default.selectReceivers },
      _react2.default.createElement(SelectedRecipientItem, {
        key: recipient.phoneNumber,
        name: recipient.name,
        phoneNumber: recipient.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(recipient.phoneNumber);
        }
      })
    );
  }
  return null;
}

SelectedRecipients.propTypes = {
  onRemove: _propTypes2.default.func.isRequired,
  recipient: _propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  }),
  recipients: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  })).isRequired,
  multiple: _propTypes2.default.bool.isRequired
};
SelectedRecipients.defaultProps = {
  recipient: null
};

var RecipientsInput = function (_Component) {
  (0, _inherits3.default)(RecipientsInput, _Component);

  function RecipientsInput(props) {
    (0, _classCallCheck3.default)(this, RecipientsInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecipientsInput.__proto__ || (0, _getPrototypeOf2.default)(RecipientsInput)).call(this, props));

    _this.onInputKeyUp = function (e) {
      _this.props.searchContact(e.currentTarget.value);
      _this.setState({
        isFocusOnInput: true
      });
    };

    _this.onInputFocus = function () {
      _this.setState({
        isFocusOnInput: true
      });
    };

    _this.onInputChange = function (e) {
      var value = e.currentTarget.value;

      _this.setState({ value: value });
      _this.props.onChange(value);
      if (_this.listRef) {
        _this.listRef.scrollTop = 0;
      }
    };

    _this.onClean = function () {
      _this.setState({ value: '' });
      _this.props.onClean();
    };

    _this.clickHandler = function (evt) {
      if (_this.listRef && _this.listRef.contains(evt.target)) return;
      if (_this.inputRef && _this.inputRef.contains(evt.target)) {
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
      _this.setState({ value: '', isFocusOnInput: false });
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
    // using React SyntheticEvent to deal with cross browser issue
    _this.handleHotKey = function (e) {
      if (_this.state.isFocusOnInput && _this.state.value.length >= 3) {
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
        if (_this.state.value.length === 0) {
          return;
        }
        var relatedContactList = _this.state.value.length >= 3 ? _this.props.searchContactList : [];
        var currentSelected = relatedContactList[_this.state.selectedContactIndex];
        if (currentSelected && e.key === 'Enter') {
          _this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber
          });
        } else {
          _this.props.addToRecipients({
            name: _this.state.value.replace(',', ''),
            phoneNumber: _this.state.value.replace(',', '')
          });
          _this.onClean();
        }
        _this.onClean();
      }
    };
    return _this;
  }

  (0, _createClass3.default)(RecipientsInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== undefined && nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
        this.props.searchContact(nextProps.value);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.searchContact(this.props.value);
      window.addEventListener('click', this.clickHandler);
      if (this.props.autoFocus) {
        this._focusTimeout = setTimeout(function () {
          if (_this2.inputRef) {
            _this2.inputRef.focus();
          }
        }, 300);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // TODO a temporary fix for rendering slower search result.
      var relatedContactList = this.state.value.length >= 3 ? this.props.searchContactList.slice(0, 50) : [];
      var label = _react2.default.createElement(
        'label',
        null,
        this.props.label === undefined ? _i18n2.default.getString('to', this.props.currentLocale) + ':' : this.props.label
      );
      var toNumberInput = !this.props.multiple && this.props.recipient ? null : _react2.default.createElement(
        'div',
        { className: _styles2.default.inputWrapper },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.inputField },
          _react2.default.createElement('input', {
            ref: this.setInputRef,
            name: 'receiver',
            value: this.state.value,
            onChange: this.onInputChange,
            className: _styles2.default.numberInput,
            maxLength: 30,
            onFocus: this.onInputFocus,
            onKeyUp: this.onInputKeyUp,
            placeholder: this.props.placeholder === undefined ? _i18n2.default.getString('enterNameOrNumber', this.props.currentLocale) : this.props.placeholder,
            autoComplete: 'off'
          })
        ),
        _react2.default.createElement(_RemoveButton2.default, {
          className: _styles2.default.removeButton,
          onClick: this.onClean,
          visibility: this.props.value.length > 0 && this.state.isFocusOnInput
        })
      );

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.container, this.props.className),
          onKeyDown: this.handleHotKey
        },
        label,
        _react2.default.createElement(
          'div',
          { className: this.props.label === undefined ? _styles2.default.rightPanel : '' },
          _react2.default.createElement(SelectedRecipients, {
            recipient: this.props.recipient,
            recipients: this.props.recipients,
            multiple: this.props.multiple,
            onRemove: this.props.removeFromRecipients
          }),
          toNumberInput
        ),
        _react2.default.createElement(_ContactDropdownList2.default, {
          listRef: function listRef(ref) {
            _this3.listRef = ref;
          },
          phoneTypeRenderer: this.props.phoneTypeRenderer,
          scrollDirection: this.state.scrollDirection,
          selectedIndex: this.state.selectedContactIndex,
          setSelectedIndex: this.setSelectedIndex,
          addToRecipients: this._addToRecipients,
          items: relatedContactList,
          formatContactPhone: this.props.formatContactPhone,
          visibility: this.state.isFocusOnInput,
          titleEnabled: this.props.titleEnabled
        })
      );
    }
  }]);
  return RecipientsInput;
}(_react.Component);

RecipientsInput.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  searchContactList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    entityType: _propTypes2.default.string.isRequired,
    phoneType: _propTypes2.default.string.isRequired,
    phoneNumber: _propTypes2.default.string.isRequired
  })).isRequired,
  recipient: _propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  }),
  recipients: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  })),
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onClean: _propTypes2.default.func.isRequired,
  addToRecipients: _propTypes2.default.func.isRequired,
  removeFromRecipients: _propTypes2.default.func.isRequired,
  formatContactPhone: _propTypes2.default.func.isRequired,
  searchContact: _propTypes2.default.func,
  titleEnabled: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  currentLocale: _propTypes2.default.string.isRequired,
  multiple: _propTypes2.default.bool,
  phoneTypeRenderer: _propTypes2.default.func,
  inputRef: _propTypes2.default.func
};

RecipientsInput.defaultProps = {
  className: undefined,
  label: undefined,
  placeholder: undefined,
  recipient: null,
  recipients: [],
  searchContact: function searchContact() {
    return null;
  },
  titleEnabled: undefined,
  autoFocus: false,
  multiple: false,
  phoneTypeRenderer: undefined,
  inputRef: undefined
};

exports.default = RecipientsInput;
//# sourceMappingURL=index.js.map
