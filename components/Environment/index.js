"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Line = _interopRequireDefault(require("../Line"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */
var Environment =
/*#__PURE__*/
function (_Component) {
  _inherits(Environment, _Component);

  function Environment(props) {
    var _this;

    _classCallCheck(this, Environment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Environment).call(this, props));
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
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement(_BackHeader["default"], {
        onBackClick: this.onCancel,
        buttons: []
      }, "Environment"), _react["default"].createElement(_Panel["default"], {
        classname: _styles["default"].content
      }, _react["default"].createElement(_Line["default"], null, "Server", _react["default"].createElement(_TextInput["default"], {
        dataSign: "envServerUrl",
        value: this.state.serverValue,
        onChange: this.onServerChange
      })), _react["default"].createElement(_Line["default"], null, "Recording Host", _react["default"].createElement(_TextInput["default"], {
        value: this.state.recordingHostValue,
        onChange: this.onRecordingHostChange
      })), _react["default"].createElement(_IconLine["default"], {
        icon: _react["default"].createElement(_Switch["default"], {
          dataSign: "envToggle",
          checked: this.state.enabledValue,
          onChange: this.onToggleEnabled
        })
      }, "Enable"), _react["default"].createElement(_Line["default"], null, _react["default"].createElement(_Button["default"], {
        dataSign: "envSave",
        className: (0, _classnames["default"])(_styles["default"].saveButton, !hasChanges ? _styles["default"].disabled : null),
        onClick: this.onOk,
        disabled: !hasChanges
      }, "Save"))));
    }
  }]);

  return Environment;
}(_react.Component);

Environment.propTypes = {
  server: _propTypes["default"].string.isRequired,
  recordingHost: _propTypes["default"].string.isRequired,
  enabled: _propTypes["default"].bool.isRequired,
  onSetData: _propTypes["default"].func.isRequired,
  defaultHidden: _propTypes["default"].bool
};
Environment.defaultProps = {
  defaultHidden: true
};
var _default = Environment;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
