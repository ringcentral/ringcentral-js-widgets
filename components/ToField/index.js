"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RemoveButton = require("../RemoveButton");

var _ContactDropdownList = _interopRequireDefault(require("../ContactDropdownList"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function SelectedRecipientItem(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? phoneNumber : _ref$name,
      onRemove = _ref.onRemove;
  var className = phoneNumber.length > 5 ? _styles["default"].phoneNumber : _styles["default"].extension;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement("span", null, name), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
    className: _styles["default"].removeReceiver,
    onClick: onRemove,
    visibility: true
  }));
}

SelectedRecipientItem.propTypes = {
  name: _propTypes["default"].string,
  phoneNumber: _propTypes["default"].string.isRequired,
  onRemove: _propTypes["default"].func.isRequired
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

  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].selectReceivers
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(SelectedRecipientItem, {
      key: item.phoneNumber,
      name: item.name,
      phoneNumber: item.phoneNumber,
      onRemove: function onRemove() {
        return removeFromRecipients(item.phoneNumber);
      }
    });
  }));
}

SelectedRecipients.propTypes = {
  removeFromRecipients: _propTypes["default"].func.isRequired,
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired
};

var ToField = /*#__PURE__*/function (_Component) {
  _inherits(ToField, _Component);

  var _super = _createSuper(ToField);

  function ToField(props) {
    var _this;

    _classCallCheck(this, ToField);

    _this = _super.call(this, props);

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
      _this.props.searchContact({
        searchString: e.currentTarget.value
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
      if (e.key === ',' || e.key === ';' || e.key === 'Enter' || e.key === 'Unidentified' && (e.keyCode === 186 || // semicolon
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

  _createClass(ToField, [{
    key: "componentWillReceiveProps",
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
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.searchContact({
        searchString: this.props.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var relatedContactList = this.props.value.length >= 3 ? this.props.searchResults : [];

      var label = /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "to-field-input"
      }, this.props.label || _i18n["default"].getString('to', this.props.currentLocale));

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].container,
        onKeyDown: this.handleHotKey
      }, label, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].rightPanel
      }, /*#__PURE__*/_react["default"].createElement(SelectedRecipients, {
        items: this.props.recipients,
        removeFromRecipients: this.props.removeFromRecipients
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "to-field-input",
        name: "receiver",
        value: this.state.currentValue,
        onChange: this.props.onChange,
        onKeyUp: this.onInputKeyUp,
        className: _styles["default"].numberInput,
        maxLength: 30,
        onFocus: this.onReceiversInputFocus,
        onBlur: this.onReceiversInputBlur,
        placeholder: this.props.placeholder || _i18n["default"].getString('enterNameOrNumber', this.props.currentLocale),
        autoComplete: "off",
        autoFocus: this.props.autoFocus // eslint-disable-line

      })), /*#__PURE__*/_react["default"].createElement(_RemoveButton.RemoveButton, {
        className: _styles["default"].removeButton,
        onClick: this.props.onClean,
        visibility: this.props.value.length > 0 && this.state.isFocusOnInput
      })), /*#__PURE__*/_react["default"].createElement(_ContactDropdownList["default"], {
        currentLocale: this.props.currentLocale,
        scrollDirection: this.state.scrollDirection,
        selectedIndex: this.state.selectedContactIndex,
        setSelectedIndex: this.setSelectedIndex,
        addToRecipients: this.props.addToRecipients,
        items: relatedContactList,
        formatContactPhone: this.props.formatPhone,
        visibility: this.state.isFocusOnInput,
        titleEnabled: this.props.titleEnabled
      }));
    }
  }]);

  return ToField;
}(_react.Component);

exports["default"] = ToField;
ToField.propTypes = {
  label: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  searchContact: _propTypes["default"].func,
  searchResults: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })),
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired,
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onClean: _propTypes["default"].func.isRequired,
  addToRecipients: _propTypes["default"].func.isRequired,
  removeFromRecipients: _propTypes["default"].func.isRequired,
  formatPhone: _propTypes["default"].func,
  titleEnabled: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  currentLocale: _propTypes["default"].string.isRequired
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
