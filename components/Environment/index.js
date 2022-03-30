"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Button = require("../Button");

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _Line = _interopRequireDefault(require("../Line"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */
var Environment = /*#__PURE__*/function (_Component) {
  _inherits(Environment, _Component);

  var _super = _createSuper(Environment);

  function Environment(props) {
    var _this;

    _classCallCheck(this, Environment);

    _this = _super.call(this, props);
    _this.state = {
      hidden: props.defaultHidden,
      serverValue: props.server,
      recordingHostValue: props.recordingHost,
      enabledValue: props.enabled
    };

    _this.onServerChange = function (e) {
      _this.setState({
        serverValue: e.currentTarget.value
      });
    };

    _this.onRecordingHostChange = function (e) {
      _this.setState({
        recordingHostValue: e.currentTarget.value
      });
    };

    _this.onToggleEnabled = function (e) {
      _this.setState({
        enabledValue: !_this.state.enabledValue
      });
    };

    _this.onOk = function () {
      _this.props.onSetData({
        server: _this.state.serverValue,
        recordingHost: _this.state.recordingHostValue,
        enabled: _this.state.enabledValue
      });

      _this.toggleEnv();
    };

    _this.onCancel = function () {
      _this.setState({
        serverValue: _this.props.server,
        recordingHostValue: _this.props.recordingHost,
        enabledValue: _this.props.enabled
      });

      _this.toggleEnv();
    };

    _this.toggleEnv = function () {
      _this.setState({
        hidden: !_this.state.hidden
      });
    };

    if (typeof window !== 'undefined') {
      window.toggleEnv = _this.toggleEnv;
    }

    return _this;
  }

  _createClass(Environment, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.server !== this.props.server) {
        this.setState({
          serverValue: nextProps.server
        });
      }

      if (nextProps.recordingHost !== this.props.recordingHost) {
        this.setState({
          recordingHostValue: nextProps.recordingHost
        });
      }

      if (nextProps.enabled !== this.props.enabled) {
        this.setState({
          enabledValue: nextProps.enabled
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hidden) {
        return null;
      }

      var hasChanges = !(this.state.serverValue === this.props.server && this.state.enabledValue === this.props.enabled && this.state.recordingHostValue === this.props.recordingHost);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        onBackClick: this.onCancel,
        buttons: []
      }, "Environment"), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        classname: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "Server", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        dataSign: "envServerUrl",
        value: this.state.serverValue,
        onChange: this.onServerChange
      })), /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "Recording Host", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        dataSign: "envRecordingHost",
        value: this.state.recordingHostValue,
        onChange: this.onRecordingHostChange
      })), /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
        icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
          dataSign: "envToggle",
          checked: this.state.enabledValue,
          onChange: this.onToggleEnabled
        })
      }, "Enable"), /*#__PURE__*/_react["default"].createElement(_Line["default"], null, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "envSave",
        className: (0, _classnames["default"])(_styles["default"].saveButton, !hasChanges ? _styles["default"].disabled : null),
        onClick: this.onOk,
        disabled: !hasChanges
      }, "Save"))));
    }
  }]);

  return Environment;
}(_react.Component);

Environment.defaultProps = {
  defaultHidden: true
};
var _default = Environment;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
