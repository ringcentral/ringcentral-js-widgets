"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _Button = require("../Button");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _LogBasicInfo = _interopRequireDefault(require("../LogBasicInfo"));

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EditSection = function EditSection(_ref) {
  var children = _ref.children,
      scrollerRef = _ref.scrollerRef,
      rest = _objectWithoutProperties(_ref, ["children", "scrollerRef"]);

  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    ref: scrollerRef,
    className: (0, _classnames["default"])(_styles["default"].editSection)
  }), children);
};

EditSection.propTypes = {
  children: _propTypes["default"].object,
  scrollerRef: _propTypes["default"].func
};
EditSection.defaultProps = {
  children: null,
  scrollerRef: undefined
};

var SaveButton = function SaveButton(_ref2) {
  var isSaving = _ref2.isSaving,
      onClick = _ref2.onClick,
      overlapped = _ref2.overlapped,
      children = _ref2.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].buttonPanel, overlapped && _styles["default"].overlapped)
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].primaryButton, isSaving && _styles["default"].disabled),
    disabled: isSaving,
    onClick: onClick
  }, children));
};

SaveButton.propTypes = {
  isSaving: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  overlapped: _propTypes["default"].bool,
  children: _propTypes["default"].string
};
SaveButton.defaultProps = {
  isSaving: false,
  onClick: function onClick() {},
  overlapped: false,
  children: null
};

var LogSection = /*#__PURE__*/function (_Component) {
  _inherits(LogSection, _Component);

  var _super = _createSuper(LogSection);

  function LogSection(props) {
    var _this;

    _classCallCheck(this, LogSection);

    _this = _super.call(this, props);
    _this.state = {
      mainCtrlOverlapped: false
    };
    return _this;
  }

  _createClass(LogSection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: "checkOverlap",
    value: function checkOverlap() {
      if (!this.mainCtrl) {
        return;
      }

      var _this$mainCtrl = this.mainCtrl,
          scrollHeight = _this$mainCtrl.scrollHeight,
          clientHeight = _this$mainCtrl.clientHeight,
          scrollTop = _this$mainCtrl.scrollTop;
      var overlappedHeight = scrollHeight - clientHeight - scrollTop;
      var mainCtrlOverlapped = overlappedHeight > 1;

      if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
        this.setState({
          mainCtrlOverlapped: mainCtrlOverlapped
        });
      }
    }
  }, {
    key: "getEditLogSection",
    value: function getEditLogSection() {
      var _this$props = this.props,
          renderEditLogSection = _this$props.renderEditLogSection,
          currentLocale = _this$props.currentLocale,
          onSaveCallLog = _this$props.onSaveCallLog,
          onUpdateCallLog = _this$props.onUpdateCallLog,
          currentLog = _this$props.currentLog,
          additionalInfo = _this$props.additionalInfo,
          onCallLogSaved = _this$props.onCallLogSaved;
      return renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        currentLog: currentLog,
        additionalInfo: additionalInfo,
        onCallLogSaved: onCallLogSaved
      });
    }
  }, {
    key: "genSaveLogButton",
    value: function genSaveLogButton() {
      var _this$props2 = this.props,
          showSaveLogBtn = _this$props2.showSaveLogBtn,
          renderSaveLogButton = _this$props2.renderSaveLogButton,
          currentLocale = _this$props2.currentLocale,
          onSaveCallLog = _this$props2.onSaveCallLog,
          currentLog = _this$props2.currentLog;
      var call = currentLog.call,
          currentLogCall = currentLog.currentLogCall;

      if (!showSaveLogBtn) {
        return null;
      }

      if (renderSaveLogButton) {
        return renderSaveLogButton({
          currentLocale: currentLocale,
          onSaveCallLog: onSaveCallLog,
          currentLog: currentLog,
          overlapped: this.state.mainCtrlOverlapped
        });
      }

      return /*#__PURE__*/_react["default"].createElement(SaveButton, {
        isSaving: currentLogCall.isSaving,
        onClick: function onClick() {
          return onSaveCallLog(call);
        },
        overlapped: this.state.mainCtrlOverlapped
      }, _i18n["default"].getString('saveLog', currentLocale));
    }
  }, {
    key: "renderLogBasicInfo",
    value: function renderLogBasicInfo() {
      var _this$props3 = this.props,
          currentLog = _this$props3.currentLog,
          showSmallCallControl = _this$props3.showSmallCallControl;
      var currentSessionId = currentLog.currentSessionId,
          call = currentLog.call;
      var telephonyStatus = call.telephonyStatus,
          result = call.result;
      var status = telephonyStatus || result; // if `result` is exist, call has been disconnect

      var isActive = !result;
      var clickable = isActive && !(0, _callLogHelpers.isRingingInboundCall)(call);
      var extraButton;

      if (showSmallCallControl && isActive) {
        extraButton = this.props.renderSmallCallContrl(status, currentSessionId);
      }

      return /*#__PURE__*/_react["default"].createElement(_LogBasicInfo["default"], {
        dataSign: "leftSectionInfo",
        currentLog: this.props.currentLog,
        currentLocale: this.props.currentLocale,
        formatPhone: this.props.formatPhone,
        extraButton: extraButton,
        clickable: clickable,
        onClick: clickable ? this.props.onLogBasicInfoClick : function () {
          return console.log('noop');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          currentLog = _this$props4.currentLog,
          isInnerMask = _this$props4.isInnerMask;
      var showSpinner = currentLog.showSpinner;

      if (showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
          className: _styles["default"].spinner
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, this.renderLogBasicInfo(), /*#__PURE__*/_react["default"].createElement(EditSection, {
        scrollerRef: function scrollerRef(el) {
          _this2.mainCtrl = el;
        },
        onScroll: function onScroll() {
          return _this2.checkOverlap();
        }
      }, this.getEditLogSection()), this.genSaveLogButton(), isInnerMask ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].innerMask
      }) : null);
    }
  }]);

  return LogSection;
}(_react.Component);

exports["default"] = LogSection;
LogSection.propTypes = {
  currentLog: _propTypes["default"].object,
  additionalInfo: _propTypes["default"].object,
  currentLocale: _propTypes["default"].string.isRequired,
  formatPhone: _propTypes["default"].func,
  onUpdateCallLog: _propTypes["default"].func,
  onSaveCallLog: _propTypes["default"].func,
  renderEditLogSection: _propTypes["default"].func,
  renderSaveLogButton: _propTypes["default"].func,
  isInnerMask: _propTypes["default"].bool,
  onLogBasicInfoClick: _propTypes["default"].func,
  showSaveLogBtn: _propTypes["default"].bool,
  showSmallCallControl: _propTypes["default"].bool,
  renderSmallCallContrl: _propTypes["default"].func,
  onCallLogSaved: _propTypes["default"].func
};
LogSection.defaultProps = {
  currentLog: {},
  additionalInfo: undefined,
  formatPhone: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  isInnerMask: undefined,
  onLogBasicInfoClick: function onLogBasicInfoClick() {},
  renderSmallCallContrl: function renderSmallCallContrl() {},
  showSaveLogBtn: true,
  showSmallCallControl: true,
  onCallLogSaved: undefined
};
//# sourceMappingURL=index.js.map
