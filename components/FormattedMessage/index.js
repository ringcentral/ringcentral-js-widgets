"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatMessage = _interopRequireDefault(require("format-message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormattedMessage =
/*#__PURE__*/
function (_Component) {
  _inherits(FormattedMessage, _Component);

  function FormattedMessage() {
    _classCallCheck(this, FormattedMessage);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormattedMessage).apply(this, arguments));
  }

  _createClass(FormattedMessage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          message = _this$props.message,
          values = _this$props.values,
          tagName = _this$props.tagName;
      var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
      var hashedParams = {};
      var elements = {};
      var tokenDelimeter = "@__".concat(uid, "__@");
      Object.keys(values).forEach(function (key) {
        if ((0, _react.isValidElement)(values[key])) {
          hashedParams[key] = "".concat(tokenDelimeter).concat(key).concat(tokenDelimeter);
          elements[key] = values[key];
        } else {
          hashedParams[key] = values[key];
        }
      });
      var nodes = (0, _formatMessage.default)(message, hashedParams).split(tokenDelimeter).filter(function (token) {
        return !!token;
      }).map(function (token) {
        return elements[token] || token;
      });
      return _react.createElement.apply(void 0, [tagName, null].concat(_toConsumableArray(nodes)));
    }
  }]);

  return FormattedMessage;
}(_react.Component);

exports.default = FormattedMessage;
FormattedMessage.propTypes = {
  message: _propTypes.default.string.isRequired,
  values: _propTypes.default.object,
  tagName: _propTypes.default.string
};
FormattedMessage.defaultProps = {
  values: {},
  tagName: 'span'
};
//# sourceMappingURL=index.js.map
