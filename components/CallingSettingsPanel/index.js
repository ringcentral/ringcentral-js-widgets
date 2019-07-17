"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallingSettingsPanel;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

require("rc-tooltip/assets/bootstrap_white.css");

var _Info = _interopRequireDefault(require("../../assets/images/Info.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _IconField = _interopRequireDefault(require("../IconField"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _SaveButton = _interopRequireDefault(require("../SaveButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TooltipCom = typeof _rcTooltip["default"] === 'function' ? _rcTooltip["default"] : _rcTooltip["default"]["default"];

var CallingSettingsContent =
/*#__PURE__*/
function (_Component) {
  _inherits(CallingSettingsContent, _Component);

  function CallingSettingsContent(props) {
    var _this;

    _classCallCheck(this, CallingSettingsContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallingSettingsContent).call(this, props));

    _this.onSave = function () {
      if (typeof _this.props.onSave === 'function') {
        var _this$state = _this.state,
            callWith = _this$state.callWith,
            myLocation = _this$state.myLocation,
            ringoutPrompt = _this$state.ringoutPrompt;

        _this.props.onSave({
          callWith: callWith,
          myLocation: myLocation,
          ringoutPrompt: ringoutPrompt
        });
      }
    };

    _this.onReset = function () {
      var _this$props = _this.props,
          callWith = _this$props.callWith,
          myLocation = _this$props.myLocation,
          ringoutPrompt = _this$props.ringoutPrompt;

      _this.setState({
        callWith: callWith,
        myLocation: myLocation,
        ringoutPrompt: ringoutPrompt
      });
    };

    _this.onCallWithChange = function (callWith) {
      if (callWith === _this.props.callWith) {
        _this.setState({
          callWith: callWith,
          myLocation: _this.props.myLocation,
          ringoutPrompt: _this.props.ringoutPrompt
        });

        return;
      }

      _this.setState({
        callWith: callWith,
        myLocation: _this.props.availableNumbers[callWith] && _this.props.availableNumbers[callWith][0] || '',
        ringoutPrompt: _this.defaultRingoutPrompt
      });
    };

    _this.onMyLocationChange = function (myLocation) {
      _this.setState({
        myLocation: myLocation
      });
    };

    _this.onMyLocationTextChange = function (e) {
      var myLocation = e.target.value;

      _this.setState({
        myLocation: myLocation
      });
    };

    _this.onRingoutPromptChange = function (checked) {
      _this.setState({
        ringoutPrompt: checked
      });
    };

    _this.renderHandler = function (option) {
      var brand = _this.props.brand;

      if (option === _callingOptions["default"].myphone) {
        brand = brand.replace(/\sPhone$/, '');
      }

      return (0, _formatMessage["default"])(_i18n["default"].getString(option, _this.props.currentLocale), {
        brand: brand
      });
    };

    _this.defaultRingoutPrompt = props.defaultRingoutPrompt;
    _this.state = {
      callWith: props.callWith,
      ringoutPrompt: props.ringoutPrompt,
      myLocation: props.myLocation
    };
    return _this;
  }

  _createClass(CallingSettingsContent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.callWith !== this.props.callWith) {
        this.setState({
          callWith: newProps.callWith
        });
      }

      if (newProps.ringoutPrompt !== this.props.ringoutPrompt) {
        this.setState({
          ringoutPrompt: newProps.ringoutPrompt
        });
      }

      if (newProps.myLocation !== this.props.myLocation) {
        this.setState({
          myLocation: newProps.myLocation
        });
      }
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      var _this2 = this;

      var contentKeys;

      if (this.state.callWith === _callingOptions["default"].browser || this.state.callWith === _callingOptions["default"].softphone) {
        contentKeys = ["".concat(this.state.callWith, "Tooltip")];
      } else {
        contentKeys = ["".concat(this.state.callWith, "Tooltip"), "".concat(this.state.callWith, "Tooltip1")];
      }

      return _react["default"].createElement("div", null, contentKeys.map(function (contentKey) {
        return _react["default"].createElement("div", {
          key: contentKey
        }, (0, _formatMessage["default"])(_i18n["default"].getString(contentKey, _this2.props.currentLocale), {
          brand: _this2.props.brand
        }));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          callWith = _this$props2.callWith,
          callWithOptions = _this$props2.callWithOptions,
          myLocation = _this$props2.myLocation,
          ringoutPrompt = _this$props2.ringoutPrompt,
          availableNumbers = _this$props2.availableNumbers,
          disabled = _this$props2.disabled,
          locationSearchable = _this$props2.locationSearchable;
      var hasChanges = this.state.callWith !== callWith || this.state.myLocation !== myLocation || this.state.ringoutPrompt !== ringoutPrompt;
      var availableCallWithNumbers = availableNumbers[this.state.callWith];
      var ringout = this.state.callWith !== _callingOptions["default"].softphone && this.state.callWith !== _callingOptions["default"].browser ? _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: _styles["default"].ringoutHint
      }, _i18n["default"].getString('ringoutHint', currentLocale)), _react["default"].createElement(_InputField["default"], {
        dataSign: "myLocation",
        label: _i18n["default"].getString('myLocationLabel', currentLocale)
      }, availableCallWithNumbers ? _react["default"].createElement(_DropdownSelect["default"], {
        className: (0, _classnames["default"])(_styles["default"].select, _styles["default"].locationSelect),
        value: this.state.myLocation,
        onChange: this.onMyLocationChange,
        searchOption: locationSearchable ? function (option, text) {
          return option.includes(text);
        } : null,
        options: availableCallWithNumbers,
        disabled: disabled,
        dropdownAlign: "left",
        titleEnabled: true
      }) : _react["default"].createElement(_TextInput["default"], {
        dataSign: "myLocationInput",
        value: this.state.myLocation,
        maxLength: 30,
        onChange: this.onMyLocationTextChange
      })), _react["default"].createElement(_IconField["default"], {
        className: _styles["default"].iconField,
        icon: _react["default"].createElement(_Switch["default"], {
          dataSign: "ringoutPromptToggle",
          checked: this.state.ringoutPrompt,
          onChange: this.onRingoutPromptChange
        })
      }, _i18n["default"].getString('press1ToStartCallLabel', currentLocale))) : null;
      var toolTip = this.getTooltipContent();
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_InputField["default"], {
        label: _react["default"].createElement("span", null, _i18n["default"].getString('makeCallsWith', currentLocale), _react["default"].createElement(TooltipCom, {
          placement: "bottom",
          trigger: "click",
          overlay: toolTip,
          align: {
            offset: [0, 47]
          },
          arrowContent: _react["default"].createElement("div", {
            className: "rc-tooltip-arrow-inner"
          }),
          getTooltipContainer: function getTooltipContainer() {
            return _this3.tooltipContainner;
          }
        }, _react["default"].createElement(_Info["default"], {
          width: 14,
          height: 14,
          className: _styles["default"].infoIcon
        }))),
        noBorder: true
      }, _react["default"].createElement(_DropdownSelect["default"], {
        dataSign: "callingSetting",
        className: _styles["default"].select,
        value: this.state.callWith,
        onChange: this.onCallWithChange,
        options: callWithOptions,
        dropdownAlign: "left",
        renderFunction: this.renderHandler,
        renderValue: this.renderHandler,
        disabled: disabled,
        titleEnabled: true
      }), _react["default"].createElement("div", {
        className: _styles["default"].tooltipContainner,
        ref: function ref(tooltipContainner) {
          _this3.tooltipContainner = tooltipContainner;
        }
      })), ringout, _react["default"].createElement(_SaveButton["default"], {
        currentLocale: currentLocale,
        onClick: this.onSave,
        disabled: !hasChanges
      }));
    }
  }]);

  return CallingSettingsContent;
}(_react.Component);

CallingSettingsContent.propTypes = {
  brand: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  callWithOptions: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  callWith: _propTypes["default"].string.isRequired,
  myLocation: _propTypes["default"].string.isRequired,
  ringoutPrompt: _propTypes["default"].bool.isRequired,
  defaultRingoutPrompt: _propTypes["default"].bool,
  availableNumbers: _propTypes["default"].object.isRequired,
  onSave: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool,
  locationSearchable: _propTypes["default"].bool
};
CallingSettingsContent.defaultProps = {
  disabled: false,
  locationSearchable: false,
  defaultRingoutPrompt: true
};

function CallingSettingsPanel(_ref) {
  var className = _ref.className,
      onBackButtonClick = _ref.onBackButtonClick,
      currentLocale = _ref.currentLocale,
      showSpinner = _ref.showSpinner,
      props = _objectWithoutProperties(_ref, ["className", "onBackButtonClick", "currentLocale", "showSpinner"]);

  var content = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : _react["default"].createElement(CallingSettingsContent, _extends({}, props, {
    currentLocale: currentLocale
  }));
  return _react["default"].createElement("div", {
    "data-sign": "callingSettings",
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackButtonClick
  }, _i18n["default"].getString('title', currentLocale)), _react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content));
}

CallingSettingsPanel.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onBackButtonClick: _propTypes["default"].func.isRequired,
  showSpinner: _propTypes["default"].bool
};
CallingSettingsPanel.defaultProps = {
  className: null,
  showSpinner: false
};
//# sourceMappingURL=index.js.map
