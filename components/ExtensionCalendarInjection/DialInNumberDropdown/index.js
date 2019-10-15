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

require("core-js/modules/es6.array.find");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _themeContext = require("../commons/themeContext");

var _DropdownSelect = _interopRequireDefault(require("../../DropdownSelect"));

var _ArrowSVG = _interopRequireDefault(require("../ArrowSVG"));

var _styles = _interopRequireDefault(require("./styles.scss"));

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

function DialInNumberItem(_ref) {
  var region = _ref.region,
      formattedPhoneNumber = _ref.formattedPhoneNumber;
  return _react["default"].createElement("div", {
    className: _styles["default"].dialInNumberItem,
    title: region
  }, _react["default"].createElement("span", {
    className: _styles["default"].region
  }, region), _react["default"].createElement("span", null, formattedPhoneNumber));
}

DialInNumberItem.propTypes = {
  region: _propTypes["default"].string.isRequired,
  formattedPhoneNumber: _propTypes["default"].string.isRequired
};

var DialInNumberDropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(DialInNumberDropdown, _Component);

  function DialInNumberDropdown() {
    _classCallCheck(this, DialInNumberDropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(DialInNumberDropdown).apply(this, arguments));
  }

  _createClass(DialInNumberDropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dialInNumber = _this$props.dialInNumber,
          dialInNumbers = _this$props.dialInNumbers,
          theme = _this$props.theme,
          onUpdate = _this$props.onUpdate;
      return _react["default"].createElement(_DropdownSelect["default"], {
        className: (0, _classnames["default"])(_styles["default"].dropdown, theme.UI && _styles["default"][theme.UI]),
        iconClassName: _styles["default"].dropdownIcon,
        value: dialInNumber,
        onChange: function onChange(option) {
          return onUpdate('dialInNumber', option.phoneNumber);
        },
        renderFunction: DialInNumberItem,
        renderValue: function renderValue(phoneNumber) {
          var option = dialInNumbers.find(function (p) {
            return p.phoneNumber === phoneNumber;
          });

          if (!option) {
            console.warn("Conference dial in number ".concat(phoneNumber, " is not found in the list."));
          }

          var itemOptions = option || dialInNumbers[0];

          if (itemOptions) {
            return DialInNumberItem(itemOptions);
          }

          return '';
        },
        options: dialInNumbers,
        dropdownAlign: "left",
        icon: _react["default"].createElement(_ArrowSVG["default"], null)
      });
    }
  }]);

  return DialInNumberDropdown;
}(_react.Component);

DialInNumberDropdown.propTypes = {
  dialInNumber: _propTypes["default"].string.isRequired,
  theme: _propTypes["default"].object.isRequired,
  dialInNumbers: _propTypes["default"].array.isRequired,
  onUpdate: _propTypes["default"].func.isRequired
};

var _default = (0, _themeContext.ThemeConsumer)(DialInNumberDropdown);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
