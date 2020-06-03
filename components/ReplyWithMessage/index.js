"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

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

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isBlank = _interopRequireDefault(require("ringcentral-integration/lib/isBlank"));

var _Button = require("../Button");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CALL_YOU = 0;
var CALL_ME = 1;
var ON_MY_WAY = 2;
var CUSTOM_MESSAGE = 3;
var MINS = 0;
var HOURS = 1;
var DAYS = 2;
var cleanRegex = /[^\d]/g;

function TimeInput(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timeInput
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].timeValue
  }, /*#__PURE__*/_react["default"].createElement("input", {
    maxLength: 2,
    value: props.timeValue,
    onChange: props.onTimeValueChange,
    ref: props.inputRef
  })), /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick() {
      return props.onSelectTimeUnit(MINS);
    },
    className: props.timeUnit === MINS ? _styles["default"].timeUnitSelected : null
  }, _i18n["default"].getString('min', props.currentLocale)), /*#__PURE__*/_react["default"].createElement("span", {
    className: props.timeUnit === HOURS ? _styles["default"].timeUnitSelected : null,
    onClick: function onClick() {
      return props.onSelectTimeUnit(HOURS);
    }
  }, _i18n["default"].getString('hours', props.currentLocale)), /*#__PURE__*/_react["default"].createElement("span", {
    className: props.timeUnit === DAYS ? _styles["default"].timeUnitSelected : null,
    onClick: function onClick() {
      return props.onSelectTimeUnit(DAYS);
    }
  }, _i18n["default"].getString('days', props.currentLocale)));
}

TimeInput.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  timeValue: _propTypes["default"].string,
  timeUnit: _propTypes["default"].number,
  inputRef: _propTypes["default"].func.isRequired,
  onTimeValueChange: _propTypes["default"].func.isRequired,
  onSelectTimeUnit: _propTypes["default"].func.isRequired
};
TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS
};

var ReplyWithMessage = /*#__PURE__*/function (_Component) {
  _inherits(ReplyWithMessage, _Component);

  var _super = _createSuper(ReplyWithMessage);

  function ReplyWithMessage(props) {
    var _this;

    _classCallCheck(this, ReplyWithMessage);

    _this = _super.call(this, props);
    _this.state = {
      type: ON_MY_WAY,
      customValue: '',
      callYouTimeValue: '',
      callYouTimeUnit: MINS,
      callMeTimeValue: '',
      callMeTimeUnit: MINS
    };

    _this.onSelectType = function (index) {
      _this.setState({
        type: index
      });

      _this.props.onChange(_this._getValue());
    };

    _this.onCustomValueChange = function (e) {
      var value = e.target.value;

      _this.setState({
        customValue: value
      });

      _this.props.onChange(_this._getValue());
    };

    _this.onCallYouTimeValueChange = function (e) {
      var value = e.target.value;

      _this.setState({
        callYouTimeValue: value.replace(cleanRegex, '')
      });
    };

    _this.onCallYouTimeUnitChange = function (unit) {
      _this.setState({
        callYouTimeUnit: unit
      });
    };

    _this.onCallMeTimeValueChange = function (e) {
      var value = e.target.value;

      _this.setState({
        callMeTimeValue: value.replace(cleanRegex, '')
      });
    };

    _this.onCallMeTimeUnitChange = function (unit) {
      _this.setState({
        callMeTimeUnit: unit
      });
    };

    _this.onReply = function () {
      _this.props.onReply(_this._getValue());
    };

    _this.onCallYouInputRef = function (input) {
      _this.callYouInputRef = input;
    };

    _this.onCallMeInputRef = function (input) {
      _this.callMeInputRef = input;
    };

    return _this;
  }

  _createClass(ReplyWithMessage, [{
    key: "_getValue",
    value: function _getValue() {
      var value = {
        replyType: 0
      };

      if (this.state.type === CUSTOM_MESSAGE) {
        value.replyText = this.state.customValue;
      }

      if (this.state.type === ON_MY_WAY) {
        value.replyText = 'On my way';
      }

      if (this.state.type < 2) {
        value.replyType = 1;
        value.callbackDirection = this.state.type;

        if (this.state.type === 0) {
          value.timeValue = this.state.callYouTimeValue;
          value.timeUnits = this.state.callYouTimeUnit;
          value.replyText = this.state.callYouTimeValue;
        } else {
          value.timeValue = this.state.callMeTimeValue;
          value.timeUnits = this.state.callMeTimeUnit;
          value.replyText = this.state.callMeTimeValue;
        }
      }

      return value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          onCancel = _this$props.onCancel,
          currentLocale = _this$props.currentLocale,
          disabled = _this$props.disabled;
      var disableButton = (0, _isBlank["default"])(this._getValue().replyText) || disabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].messages
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          _this2.onSelectType(CALL_YOU);

          setTimeout(function () {
            _this2.callYouInputRef.focus();
          }, 100);
        },
        className: (0, _classnames["default"])(_styles["default"].messageItem, this.state.type === CALL_YOU ? _styles["default"].active : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('willCallYouBackIn', currentLocale), "..."), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement(TimeInput, {
        currentLocale: currentLocale,
        timeValue: this.state.callYouTimeValue,
        timeUnit: this.state.callYouTimeUnit,
        onTimeValueChange: this.onCallYouTimeValueChange,
        onSelectTimeUnit: this.onCallYouTimeUnitChange,
        inputRef: this.onCallYouInputRef
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          _this2.onSelectType(CALL_ME);

          setTimeout(function () {
            _this2.callMeInputRef.focus();
          }, 100);
        },
        className: (0, _classnames["default"])(_styles["default"].messageItem, this.state.type === CALL_ME ? _styles["default"].active : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('callMeBackIn', currentLocale), "..."), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement(TimeInput, {
        currentLocale: currentLocale,
        timeValue: this.state.callMeTimeValue,
        timeUnit: this.state.callMeTimeUnit,
        onTimeValueChange: this.onCallMeTimeValueChange,
        onSelectTimeUnit: this.onCallMeTimeUnitChange,
        inputRef: this.onCallMeInputRef
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          return _this2.onSelectType(ON_MY_WAY);
        },
        className: (0, _classnames["default"])(_styles["default"].messageItem, this.state.type === ON_MY_WAY ? _styles["default"].active : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('onMyWay', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick() {
          _this2.onSelectType(CUSTOM_MESSAGE);

          setTimeout(function () {
            _this2.customValueInput.focus();
          }, 100);
        },
        className: (0, _classnames["default"])(_styles["default"].messageItem, this.state.type === CUSTOM_MESSAGE ? _styles["default"].active : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('customMessage', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement("textarea", {
        value: this.state.customValue,
        maxLength: 50,
        onChange: this.onCustomValueChange,
        ref: function ref(input) {
          _this2.customValueInput = input;
        }
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: _styles["default"].cancelButton,
        onClick: onCancel
      }, _i18n["default"].getString('cancel', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: (0, _classnames["default"])(_styles["default"].replyButton, disableButton ? _styles["default"].disabled : null),
        onClick: this.props.disabled ? function () {} : this.onReply,
        disabled: disableButton
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].buttonText
      }, _i18n["default"].getString('reply', currentLocale)))));
    }
  }]);

  return ReplyWithMessage;
}(_react.Component);

exports["default"] = ReplyWithMessage;
ReplyWithMessage.propTypes = {
  className: _propTypes["default"].string,
  onCancel: _propTypes["default"].func.isRequired,
  onReply: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  disabled: _propTypes["default"].bool.isRequired
};
ReplyWithMessage.defaultProps = {
  className: null,
  onChange: undefined
};
//# sourceMappingURL=index.js.map
