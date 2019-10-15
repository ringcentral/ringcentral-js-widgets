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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _AlertDisplay = _interopRequireDefault(require("../AlertDisplay"));

var _MessageSenderAlert = _interopRequireDefault(require("../MessageSenderAlert"));

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

var NoSenderAlert =
/*#__PURE__*/
function (_Component) {
  _inherits(NoSenderAlert, _Component);

  function NoSenderAlert(props) {
    var _this;

    _classCallCheck(this, NoSenderAlert);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NoSenderAlert).call(this, props));
    _this.state = {
      showAlert: props.showAlert
    };

    _this.onDismissAlert = function () {
      _this.setState({
        showAlert: false
      });
    };

    _this.getRenderer = function () {
      return _MessageSenderAlert["default"];
    };

    _this.messages = [{
      id: '1',
      level: 'warning',
      message: _messageSenderMessages["default"].senderNumberInvalid
    }];
    return _this;
  }

  _createClass(NoSenderAlert, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.showAlert !== this.state.showAlert) {
        this.setState({
          showAlert: nextProps.showAlert
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.showAlert ? _react["default"].createElement(_AlertDisplay["default"], {
        brand: this.props.brand,
        currentLocale: this.props.currentLocale,
        messages: this.messages,
        dismiss: this.onDismissAlert,
        getRenderer: this.getRenderer
      }) : null;
    }
  }]);

  return NoSenderAlert;
}(_react.Component);

exports["default"] = NoSenderAlert;
NoSenderAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  showAlert: _propTypes["default"].bool.isRequired,
  brand: _propTypes["default"].string
};
NoSenderAlert.defaultProps = {
  brand: 'RingCentral'
};
//# sourceMappingURL=NoSenderAlert.js.map
