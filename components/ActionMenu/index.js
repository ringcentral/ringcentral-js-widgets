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

var _ActionMenuList = _interopRequireDefault(require("../ActionMenuList"));

var _SlideMenu = _interopRequireDefault(require("../SlideMenu"));

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

var ActionMenu = /*#__PURE__*/function (_Component) {
  _inherits(ActionMenu, _Component);

  var _super = _createSuper(ActionMenu);

  function ActionMenu() {
    _classCallCheck(this, ActionMenu);

    return _super.apply(this, arguments);
  }

  _createClass(ActionMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          reference = _this$props.reference,
          className = _this$props.className,
          currentLocale = _this$props.currentLocale,
          onLog = _this$props.onLog,
          isLogged = _this$props.isLogged,
          isLogging = _this$props.isLogging,
          isCreating = _this$props.isCreating,
          onViewEntity = _this$props.onViewEntity,
          onCreateEntity = _this$props.onCreateEntity,
          createEntityTypes = _this$props.createEntityTypes,
          hasEntity = _this$props.hasEntity,
          onClickToDial = _this$props.onClickToDial,
          onClickToSms = _this$props.onClickToSms,
          phoneNumber = _this$props.phoneNumber,
          disableLinks = _this$props.disableLinks,
          disableCallButton = _this$props.disableCallButton,
          disableClickToDial = _this$props.disableClickToDial,
          addLogTitle = _this$props.addLogTitle,
          editLogTitle = _this$props.editLogTitle,
          callTitle = _this$props.callTitle,
          textTitle = _this$props.textTitle,
          createEntityTitle = _this$props.createEntityTitle,
          viewEntityTitle = _this$props.viewEntityTitle,
          onDelete = _this$props.onDelete,
          deleteTitle = _this$props.deleteTitle,
          onMark = _this$props.onMark,
          onUnmark = _this$props.onUnmark,
          marked = _this$props.marked,
          markTitle = _this$props.markTitle,
          externalViewEntity = _this$props.externalViewEntity,
          externalHasEntity = _this$props.externalHasEntity,
          disableClickToSms = _this$props.disableClickToSms,
          withAnimation = _this$props.withAnimation,
          selectedMatchContactType = _this$props.selectedMatchContactType,
          showChooseEntityModal = _this$props.showChooseEntityModal,
          shouldHideEntityButton = _this$props.shouldHideEntityButton,
          extended = _this$props.extended,
          onToggle = _this$props.onToggle,
          extendIconClassName = _this$props.extendIconClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: reference
      }, /*#__PURE__*/_react["default"].createElement(_SlideMenu["default"], {
        extended: extended,
        onToggle: onToggle,
        className: className,
        extendIconClassName: extendIconClassName,
        minHeight: 0,
        maxHeight: 53,
        withAnimation: withAnimation
      }, /*#__PURE__*/_react["default"].createElement(_ActionMenuList["default"], {
        onLog: onLog,
        isLogged: isLogged,
        isLogging: isLogging,
        isCreating: isCreating,
        selectedMatchContactType: selectedMatchContactType,
        onViewEntity: onViewEntity,
        onCreateEntity: onCreateEntity,
        createEntityTypes: createEntityTypes,
        hasEntity: hasEntity,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        shouldHideEntityButton: shouldHideEntityButton,
        disableClickToDial: disableClickToDial,
        addLogTitle: addLogTitle,
        editLogTitle: editLogTitle,
        textTitle: textTitle,
        callTitle: callTitle,
        createEntityTitle: createEntityTitle,
        viewEntityTitle: viewEntityTitle,
        currentLocale: currentLocale,
        onDelete: onDelete,
        deleteTitle: deleteTitle,
        onMark: onMark,
        onUnmark: onUnmark,
        marked: marked,
        markTitle: markTitle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        disableClickToSms: disableClickToSms,
        showChooseEntityModal: showChooseEntityModal
      })));
    }
  }]);

  return ActionMenu;
}(_react.Component);

ActionMenu.defaultProps = {
  extended: undefined,
  onToggle: undefined,
  reference: undefined,
  className: undefined,
  extendIconClassName: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  isCreating: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  createEntityTypes: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
  withAnimation: true,
  selectedMatchContactType: '',
  showChooseEntityModal: true,
  shouldHideEntityButton: false
};
var _default = ActionMenu;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
