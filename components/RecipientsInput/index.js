"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RemoveButton = _interopRequireDefault(require("../RemoveButton"));

var _ContactDropdownList = _interopRequireDefault(require("../ContactDropdownList"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Set mouse focus and move cursor to end of input
 * @param {HTMLElement} inputField
 */
var focusCampo = function focusCampo(inputField) {
  inputField.blur();

  if (inputField && inputField.value.length !== 0) {
    if (inputField.createTextRange) {
      var FieldRange = inputField.createTextRange();
      FieldRange.moveStart('character', inputField.value.length);
      FieldRange.collapse();
      FieldRange.select();
    } else if (inputField.selectionStart || inputField.selectionStart === 0) {
      var elemLen = inputField.value.length;
      inputField.selectionStart = elemLen;
      inputField.selectionEnd = elemLen;
    }
  }

  setTimeout(function () {
    inputField.focus();
  }, 0);
};

function SelectedRecipientItem(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? phoneNumber : _ref$name,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? name : _ref$title,
      onRemove = _ref.onRemove;
  var className = phoneNumber.length > 5 ? _styles["default"].phoneNumber : _styles["default"].extension;
  return _react["default"].createElement("li", {
    className: className,
    title: title
  }, _react["default"].createElement("span", null, name), _react["default"].createElement(_RemoveButton["default"], {
    className: _styles["default"].removeReceiver,
    onClick: onRemove,
    visibility: true
  }));
}

SelectedRecipientItem.propTypes = {
  phoneNumber: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string,
  title: _propTypes["default"].string,
  onRemove: _propTypes["default"].func.isRequired
};
SelectedRecipientItem.defaultProps = {
  name: undefined,
  title: undefined
};

function SelectedRecipients(_ref2) {
  var recipient = _ref2.recipient,
      recipients = _ref2.recipients,
      multiple = _ref2.multiple,
      _onRemove = _ref2.onRemove,
      className = _ref2.className;

  if (multiple && recipients.length) {
    return _react["default"].createElement("ul", {
      className: (0, _classnames["default"])(className, _styles["default"].selectReceivers)
    }, recipients.map(function (item) {
      return _react["default"].createElement(SelectedRecipientItem, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(item.phoneNumber);
        }
      });
    }));
  } else if (!multiple && recipient) {
    return _react["default"].createElement("ul", {
      className: (0, _classnames["default"])(className, _styles["default"].selectReceivers)
    }, _react["default"].createElement(SelectedRecipientItem, {
      key: recipient.phoneNumber,
      name: recipient.name,
      phoneNumber: recipient.phoneNumber,
      onRemove: function onRemove() {
        return _onRemove(recipient.phoneNumber);
      }
    }));
  }

  return null;
}

SelectedRecipients.propTypes = {
  onRemove: _propTypes["default"].func.isRequired,
  recipient: _propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  }),
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired,
  multiple: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string
};
SelectedRecipients.defaultProps = {
  recipient: null,
  className: undefined
};

var RecipientsInput =
/*#__PURE__*/
function (_Component) {
  _inherits(RecipientsInput, _Component);

  function RecipientsInput(props) {
    var _this;

    _classCallCheck(this, RecipientsInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecipientsInput).call(this, props));

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

      _this.setState({
        value: value
      }, function () {
        _this.props.onChange(value);
      });

      if (_this.listRef) {
        _this.listRef.scrollTop = 0;
      }
    };

    _this.onClean = function () {
      _this.setState({
        value: ''
      });

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
      _this.setState({
        value: '',
        isFocusOnInput: false
      });

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
    }; // using React SyntheticEvent to deal with cross browser issue


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
        }
      }
    };

    return _this;
  }

  _createClass(RecipientsInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.value !== undefined && nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        }, function () {
          if (_this2.inputRef) {
            focusCampo(_this2.inputRef);
          }
        });
        this.props.searchContact(nextProps.value);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.props.searchContact(this.props.value);
      window.addEventListener('click', this.clickHandler);

      if (this.props.autoFocus) {
        this._focusTimeout = setTimeout(function () {
          if (_this3.inputRef) {
            _this3.inputRef.focus();
          }
        }, 300);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      // TODO a temporary fix for rendering slower search result.
      var relatedContactList = this.state.value.length >= 3 ? this.props.searchContactList.slice(0, 50) : [];

      var label = _react["default"].createElement("label", {
        className: _styles["default"].label
      }, this.props.label === undefined ? "".concat(_i18n["default"].getString('to', this.props.currentLocale), ":") : this.props.label);

      var toNumberInput = !this.props.multiple && this.props.recipient ? null : _react["default"].createElement("div", {
        className: _styles["default"].inputWrapper
      }, _react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, _react["default"].createElement("input", {
        "data-sign": "recipientsInput",
        ref: this.setInputRef,
        name: "receiver",
        value: this.state.value,
        onChange: this.onInputChange,
        className: _styles["default"].numberInput,
        maxLength: 30,
        onFocus: this.onInputFocus,
        onKeyUp: this.onInputKeyUp,
        placeholder: this.props.placeholder === undefined ? _i18n["default"].getString('enterNameOrNumber', this.props.currentLocale) : this.props.placeholder,
        autoComplete: "off"
      })), _react["default"].createElement(_RemoveButton["default"], {
        className: _styles["default"].removeButton,
        onClick: this.onClean,
        visibility: this.state.value.length > 0
      }));
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].container, this.props.className),
        onKeyDown: this.handleHotKey
      }, label, _react["default"].createElement("div", {
        className: this.props.label === undefined ? _styles["default"].rightPanel : ''
      }, _react["default"].createElement(SelectedRecipients, {
        recipient: this.props.recipient,
        recipients: this.props.recipients,
        multiple: this.props.multiple,
        onRemove: this.props.removeFromRecipients,
        className: this.props.recipientsClassName
      }), toNumberInput), _react["default"].createElement(_ContactDropdownList["default"], {
        currentLocale: this.props.currentLocale,
        listRef: function listRef(ref) {
          _this4.listRef = ref;
        },
        scrollDirection: this.state.scrollDirection,
        selectedIndex: this.state.selectedContactIndex,
        setSelectedIndex: this.setSelectedIndex,
        addToRecipients: this._addToRecipients,
        items: relatedContactList,
        formatContactPhone: this.props.formatContactPhone,
        visibility: this.state.isFocusOnInput,
        titleEnabled: this.props.titleEnabled,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
        contactInfoRenderer: this.props.contactInfoRenderer,
        contactPhoneRenderer: this.props.contactPhoneRenderer
      }));
    }
  }]);

  return RecipientsInput;
}(_react.Component);

RecipientsInput.propTypes = {
  className: _propTypes["default"].string,
  recipientsClassName: _propTypes["default"].string,
  label: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  searchContactList: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  recipient: _propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  }),
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })),
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onClean: _propTypes["default"].func.isRequired,
  addToRecipients: _propTypes["default"].func.isRequired,
  removeFromRecipients: _propTypes["default"].func.isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  searchContact: _propTypes["default"].func,
  titleEnabled: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  currentLocale: _propTypes["default"].string.isRequired,
  multiple: _propTypes["default"].bool,
  inputRef: _propTypes["default"].func,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  contactInfoRenderer: _propTypes["default"].func,
  contactPhoneRenderer: _propTypes["default"].func
};
RecipientsInput.defaultProps = {
  className: undefined,
  recipientsClassName: undefined,
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
  inputRef: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined
};
var _default = RecipientsInput;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
