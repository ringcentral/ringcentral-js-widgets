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

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EntityModal =
/*#__PURE__*/
function (_Component) {
  _inherits(EntityModal, _Component);

  function EntityModal(props) {
    var _this;

    _classCallCheck(this, EntityModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EntityModal).call(this, props));
    _this.state = {
      selected: props.entities[0]
    };

    _this.onCancel = function () {
      if (typeof _this.props.onCancel === 'function') {
        _this.props.onCancel();
      }
    };

    _this.onCreate = function () {
      if (typeof _this.props.onCreate === 'function') {
        _this.props.onCreate(_this.state.selected);
      }
    };

    _this.onRadioChange = function (e) {
      _this.setState({
        selected: e.target.value
      });
    };

    return _this;
  }

  _createClass(EntityModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          entities = _this$props.entities,
          show = _this$props.show,
          currentLocale = _this$props.currentLocale;
      return _react["default"].createElement(_Modal["default"], {
        show: show,
        title: _i18n["default"].getString('chooseEntity', currentLocale),
        onConfirm: this.onCreate,
        onCancel: this.onCancel,
        textConfirm: _i18n["default"].getString('create', currentLocale),
        currentLocale: currentLocale,
        clickOutToClose: true
      }, entities.map(function (entityType, idx) {
        return _react["default"].createElement("div", {
          className: _styles["default"].radio,
          key: idx
        }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
          type: "radio",
          value: entityType,
          checked: entityType === _this2.state.selected,
          onChange: _this2.onRadioChange
        }), _i18n["default"].getString("".concat(entityType), currentLocale)));
      }));
    }
  }]);

  return EntityModal;
}(_react.Component);

exports["default"] = EntityModal;
EntityModal.propTypes = {
  show: _propTypes["default"].bool,
  onCreate: _propTypes["default"].func.isRequired,
  onCancel: _propTypes["default"].func.isRequired,
  entities: _propTypes["default"].array,
  currentLocale: _propTypes["default"].string.isRequired
};
EntityModal.defaultProps = {
  show: false,
  entities: ['account', 'lead', 'contact']
};
//# sourceMappingURL=EntityModal.js.map
