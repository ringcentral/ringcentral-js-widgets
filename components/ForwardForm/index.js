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

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isBlank = _interopRequireDefault(require("@ringcentral-integration/commons/lib/isBlank"));

var _Button = require("../Button");

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var cleanRegex = /[^\d+*-\s]/g;

function ForwardNumbers(_ref) {
  var numbers = _ref.numbers,
      onSelect = _ref.onSelect,
      selected = _ref.selected,
      formatPhone = _ref.formatPhone;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].numbers
  }, numbers.map(function (number, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: number.id,
      "data-sign": "forward-number-".concat(number.label.toLowerCase()),
      className: (0, _classnames["default"])(_styles["default"].number, index === selected ? _styles["default"].active : null),
      onClick: function onClick() {
        return onSelect(index);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].label,
      title: number.label
    }, number.label), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].colon
    }, ":"), /*#__PURE__*/_react["default"].createElement("span", null, formatPhone(number.phoneNumber)));
  }));
}

ForwardNumbers.propTypes = {
  numbers: _propTypes["default"].array.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  selected: _propTypes["default"].number.isRequired,
  formatPhone: _propTypes["default"].func.isRequired
};

var ForwardForm = /*#__PURE__*/function (_Component) {
  _inherits(ForwardForm, _Component);

  var _super = _createSuper(ForwardForm);

  function ForwardForm(props) {
    var _this;

    _classCallCheck(this, ForwardForm);

    _this = _super.call(this, props);

    _this._onCustomValueChange = function (value) {
      _this.setState({
        customValue: value
      });
    };

    _this._clearToNumber = function () {
      _this.setState({
        customValue: ''
      });
    };

    _this._setRecipient = function (recipient) {
      _this.setState({
        recipient: recipient
      });

      _this._clearToNumber();
    };

    _this._clearRecipient = function () {
      _this.setState({
        recipient: null
      });
    };

    _this.state = {
      selectedIndex: 0,
      customValue: '',
      handling: false,
      recipient: null
    };

    _this.filter = function (value) {
      return value.replace(cleanRegex, '');
    };

    _this.onSelect = function (index) {
      _this.setState({
        selectedIndex: index
      });

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(_this.getValue());
      }
    };

    _this.onForward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                handling: true
              });

              _context.next = 3;
              return _this.props.onForward(_this.getValue());

            case 3:
              result = _context.sent;

              if (_this._mounted) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              _this.setState({
                handling: false
              });

              if (result) {
                _this.props.onCancel();
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.onSelectCustomNumber = function () {
      _this.onSelect(_this.props.forwardingNumbers.length);

      setTimeout(function () {
        if (_this.customInput) {
          _this.customInput.focus();
        }
      }, 100);
    };

    return _this;
  }

  _createClass(ForwardForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.state.selectedIndex < this.props.forwardingNumbers.length) {
        var forwardingNumber = this.props.forwardingNumbers[this.state.selectedIndex];
        return forwardingNumber && forwardingNumber.phoneNumber;
      }

      if (this.state.recipient) {
        return this.state.recipient.phoneNumber;
      }

      return this.state.customValue;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          onCancel = _this$props.onCancel,
          currentLocale = _this$props.currentLocale,
          forwardingNumbers = _this$props.forwardingNumbers,
          formatPhone = _this$props.formatPhone,
          searchContact = _this$props.searchContact,
          searchContactList = _this$props.searchContactList,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          autoFocus = _this$props.autoFocus;
      var value = this.getValue();
      var disableButton = (0, _isBlank["default"])(value) || this.state.handling;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "forwardPage",
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement(ForwardNumbers, {
        formatPhone: formatPhone,
        numbers: forwardingNumbers,
        onSelect: this.onSelect,
        selected: this.state.selectedIndex
      }), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "customNumber",
        className: (0, _classnames["default"])(_styles["default"].custromNumber, this.state.selectedIndex === forwardingNumbers.length ? _styles["default"].active : null),
        onClick: this.onSelectCustomNumber
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].customLabel
      }, _i18n["default"].getString('customNumber', currentLocale)), /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
        label: "",
        placeholder: "",
        inputRef: function inputRef(ref) {
          _this2.customInput = ref;
        },
        value: this.state.customValue,
        className: _styles["default"].customInput,
        onChange: this._onCustomValueChange,
        onClean: this._clearToNumber,
        recipient: this.state.recipient,
        addToRecipients: this._setRecipient,
        removeFromRecipients: this._clearRecipient,
        searchContact: searchContact,
        searchContactList: searchContactList,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        formatContactPhone: formatPhone,
        currentLocale: currentLocale,
        titleEnabled: true,
        autoFocus: autoFocus
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "cancel",
        className: _styles["default"].cancelButton,
        onClick: onCancel
      }, _i18n["default"].getString('cancel', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "forwardCall",
        className: (0, _classnames["default"])(_styles["default"].forwardButton, disableButton ? _styles["default"].disabled : null),
        onClick: this.onForward,
        disabled: disableButton
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].buttonText
      }, _i18n["default"].getString('forward', currentLocale)))));
    }
  }]);

  return ForwardForm;
}(_react.Component);

ForwardForm.propTypes = {
  className: _propTypes["default"].string,
  onCancel: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  forwardingNumbers: _propTypes["default"].array.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onForward: _propTypes["default"].func.isRequired,
  onChange: _propTypes["default"].func,
  searchContactList: _propTypes["default"].array.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool
};
ForwardForm.defaultProps = {
  className: null,
  onChange: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  autoFocus: true
};
var _default = ForwardForm;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
