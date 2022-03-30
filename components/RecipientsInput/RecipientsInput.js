"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ContactDropdownList = require("../ContactDropdownList");

var _RemoveButton = require("../RemoveButton");

var _focusCampo = require("./focusCampo");

var _i18n = _interopRequireDefault(require("./i18n"));

var _SelectedRecipients = require("./SelectedRecipients");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RecipientsInput = /*#__PURE__*/function (_Component) {
  _inherits(RecipientsInput, _Component);

  var _super = _createSuper(RecipientsInput);

  function RecipientsInput(props) {
    var _this;

    _classCallCheck(this, RecipientsInput);

    _this = _super.call(this, props);
    _this.setSelectedIndex = void 0;
    _this.scrollOperation = void 0;
    _this.addSelectedContactIndex = void 0;
    _this.reduceSelectedContactIndex = void 0;
    _this.isSplitter = void 0;
    _this.handleHotKey = void 0;
    _this.listRef = void 0;
    _this.inputRef = void 0;
    _this._focusTimeout = void 0;

    _this.onInputKeyUp = function (ev) {
      _this.props.searchContact(ev.currentTarget.value);

      _this.setState({
        isFocusOnInput: true
      });
    };

    _this.onInputFocus = function () {
      _this.setState({
        isFocusOnInput: true
      });
    };

    _this.onInputChange = function (ev) {
      var value = ev.currentTarget.value;
      var lastInputTimestamp = Date.now();

      _this.setState({
        value: value,
        lastInputTimestamp: lastInputTimestamp
      }, function () {
        _this.props.onChange(value);
      });

      if (_this.listRef) {
        _this.listRef.scrollTop = 0;
      }
    };

    _this.onPaste = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ev) {
        var pastedText, result, currentVal, newVal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.props.detectPhoneNumbers && ev.clipboardData && ev.clipboardData.getData)) {
                  _context.next = 8;
                  break;
                }

                ev.preventDefault();
                pastedText = ev.clipboardData.getData('text/plain');
                _context.next = 5;
                return _this.props.detectPhoneNumbers(pastedText);

              case 5:
                result = _context.sent;
                currentVal = _this.state.value || '';

                if (!result) {
                  newVal = "".concat(currentVal).concat(pastedText.replace(/\n/g, ' '));

                  _this.setState({
                    value: newVal
                  }, function () {
                    _this.props.onChange(newVal);
                  });
                }

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.onClean = function () {
      _this.setState({
        value: ''
      });

      _this.props.onClean();
    };

    _this.clickHandler = function (ev) {
      if (_this.listRef && _this.listRef.contains(ev.target)) {
        return;
      }

      if (_this.inputRef && _this.inputRef.contains(ev.target)) {
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
      lastInputTimestamp: 0,
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

    _this.isSplitter = function (ev) {
      if (ev.key === ',' || ev.key === ';' || ev.key === 'Enter' || ev.key === 'Unidentified' && ( // for Safari (FF cannot rely on keyCode...)
      ev.keyCode === 186 || // semicolon
      ev.keyCode === 188 || // comma
      ev.keyCode === 13) // enter
      ) {
        return true;
      }

      return false;
    }; // using React SyntheticEvent to deal with cross browser issue


    _this.handleHotKey = function (ev) {
      if (_this.state.isFocusOnInput && _this.state.value.length >= 3) {
        if (ev.key === 'ArrowUp') {
          _this.reduceSelectedContactIndex();

          _this.scrollOperation(ev.key);
        } else if (ev.key === 'ArrowDown') {
          _this.addSelectedContactIndex();

          _this.scrollOperation(ev.key);
        }
      } else {
        _this.setState({
          selectedContactIndex: 0
        });
      }

      if (_this.isSplitter(ev)) {
        ev.preventDefault();

        var trimmedValue = _this.state.value.trim();

        var relatedContactList = _this.state.value.length >= 3 ? _this.props.searchContactList : [];
        var currentSelected = relatedContactList[_this.state.selectedContactIndex];

        if (trimmedValue.length === 0 && !currentSelected) {
          return;
        }

        if (currentSelected && ev.key === 'Enter') {
          _this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber
          });
        } else {
          _this.props.addToRecipients({
            name: trimmedValue.replace(',', ''),
            phoneNumber: trimmedValue.replace(',', '')
          });
        }

        _this.setState({
          value: ''
        });
      }
    };

    return _this;
  }

  _createClass(RecipientsInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var isNotEditing = !this.state.isFocusOnInput || Date.now() - this.state.lastInputTimestamp > 2000;

      if (isNotEditing && nextProps.value !== undefined && nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        }, function () {
          if (_this2.inputRef) {
            (0, _focusCampo.focusCampo)(_this2.inputRef);
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

      var _this$props = this.props,
          className = _this$props.className,
          contactInfoRenderer = _this$props.contactInfoRenderer,
          contactPhoneRenderer = _this$props.contactPhoneRenderer,
          currentLocale = _this$props.currentLocale,
          formatContactPhone = _this$props.formatContactPhone,
          isLastInputFromDialpad = _this$props.isLastInputFromDialpad,
          label = _this$props.label,
          multiple = _this$props.multiple,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          placeholder = _this$props.placeholder,
          recipient = _this$props.recipient,
          recipients = _this$props.recipients,
          recipientsClassName = _this$props.recipientsClassName,
          removeFromRecipients = _this$props.removeFromRecipients,
          searchContactList = _this$props.searchContactList,
          titleEnabled = _this$props.titleEnabled,
          useRCUI = _this$props.useRCUI;
      var _this$state = this.state,
          value = _this$state.value,
          isFocusOnInput = _this$state.isFocusOnInput,
          scrollDirection = _this$state.scrollDirection,
          selectedContactIndex = _this$state.selectedContactIndex; // TODO a temporary fix for rendering slower search result.

      var relatedContactList = value.length >= 3 ? searchContactList.slice(0, 50) : [];

      var labelEl =
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      _react["default"].createElement("label", {
        className: _styles["default"].label
      }, label === undefined ? "".concat(_i18n["default"].getString('to', currentLocale), ":") : label);

      var toNumberInput = !multiple && recipient ? null : /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputWrapper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].inputField, isFocusOnInput ? 'Mui-focused' : null, 'MuiInput-underline')
      }, /*#__PURE__*/_react["default"].createElement("input", {
        "data-sign": "recipientsInput",
        ref: this.setInputRef,
        name: "receiver",
        value: value,
        onChange: this.onInputChange,
        onPaste: this.onPaste,
        className: _styles["default"].numberInput,
        maxLength: 30,
        onFocus: this.onInputFocus,
        onKeyUp: this.onInputKeyUp,
        placeholder: placeholder === undefined ? _i18n["default"].getString('enterNameOrNumber', currentLocale) : placeholder,
        autoComplete: "off"
      })), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
        className: _styles["default"].removeButton,
        onClick: this.onClean,
        visibility: value.length > 0
      }));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].container, useRCUI ? _styles["default"].rcuiStyle : null, className),
        onKeyDown: this.handleHotKey
      }, labelEl, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(useRCUI ? _styles["default"].rcuiStyle : null, label === undefined ? _styles["default"].rightPanel : '')
      }, /*#__PURE__*/_react["default"].createElement(_SelectedRecipients.SelectedRecipients, {
        recipient: recipient,
        recipients: recipients,
        multiple: multiple,
        onRemove: removeFromRecipients,
        className: recipientsClassName
      }), toNumberInput), /*#__PURE__*/_react["default"].createElement(_ContactDropdownList.ContactDropdownList, {
        currentLocale: currentLocale,
        listRef: function listRef(ref) {
          _this4.listRef = ref;
        },
        scrollDirection: scrollDirection,
        selectedIndex: selectedContactIndex,
        setSelectedIndex: this.setSelectedIndex,
        addToRecipients: this._addToRecipients,
        items: relatedContactList,
        formatContactPhone: formatContactPhone,
        visibility: isFocusOnInput && !isLastInputFromDialpad,
        titleEnabled: titleEnabled,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactInfoRenderer: contactInfoRenderer,
        contactPhoneRenderer: contactPhoneRenderer
      }));
    }
  }]);

  return RecipientsInput;
}(_react.Component);

RecipientsInput.defaultProps = {
  recipients: [],
  searchContact: function searchContact() {
    return null;
  }
};
var _default = RecipientsInput;
exports["default"] = _default;
//# sourceMappingURL=RecipientsInput.js.map
