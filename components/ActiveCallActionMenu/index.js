"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Button = require("../Button");

var _EntityButton = _interopRequireDefault(require("../EntityButton"));

var _LogButton = _interopRequireDefault(require("../LogButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var ActiveCallActionMenu = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallActionMenu, _Component);

  var _super = _createSuper(ActiveCallActionMenu);

  function ActiveCallActionMenu(props) {
    var _this;

    _classCallCheck(this, ActiveCallActionMenu);

    _this = _super.call(this, props);

    _this.captureClick = function (e) {
      // e.captureClick = this.props.captureClick;
      if (_this.props.stopPropagation) {
        e.stopPropagation();
      }
    };

    return _this;
  }

  _createClass(ActiveCallActionMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          onClickToSms = _this$props.onClickToSms,
          disableLinks = _this$props.disableLinks,
          phoneNumber = _this$props.phoneNumber,
          textTitle = _this$props.textTitle,
          onLog = _this$props.onLog,
          isLogged = _this$props.isLogged,
          isLogging = _this$props.isLogging,
          currentLocale = _this$props.currentLocale,
          addLogTitle = _this$props.addLogTitle,
          editLogTitle = _this$props.editLogTitle,
          hasEntity = _this$props.hasEntity,
          onViewEntity = _this$props.onViewEntity,
          onCreateEntity = _this$props.onCreateEntity,
          createEntityTitle = _this$props.createEntityTitle,
          viewEntityTitle = _this$props.viewEntityTitle;
      var smsButton = onClickToSms ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: (0, _classnames["default"])(_styles["default"].actionButton, _styles["default"].sms),
        onClick: onClickToSms,
        disabled: disableLinks || !phoneNumber
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _DynamicsFont["default"].composeText,
        title: textTitle
      })) : null;
      var logButton = onLog ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: (0, _classnames["default"])(_styles["default"].actionButton, _styles["default"].log),
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var entityButton;

      if (hasEntity && onViewEntity) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: (0, _classnames["default"])(_styles["default"].actionButton, _styles["default"].entity),
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
          className: (0, _classnames["default"])(_styles["default"].actionButton, _styles["default"].addContact),
          onClick: onCreateEntity,
          disabled: disableLinks || !phoneNumber
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: _DynamicsFont["default"].add2,
          title: createEntityTitle
        }));
      } else {
        entityButton = null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
        onClick: this.captureClick
      }, smsButton, entityButton, logButton);
    }
  }]);

  return ActiveCallActionMenu;
}(_react.Component);

ActiveCallActionMenu.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  textTitle: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  stopPropagation: false,
  onCreateEntity: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  onViewEntity: undefined,
  hasEntity: false
};
var _default = ActiveCallActionMenu;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
