"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

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

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SlideMenu = _interopRequireDefault(require("../SlideMenu"));

var _ActionMenuList = _interopRequireDefault(require("../ActionMenuList"));

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
          selectedMatchContactType = _this$props.selectedMatchContactType;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: reference
      }, /*#__PURE__*/_react["default"].createElement(_SlideMenu["default"], {
        extended: this.props.extended,
        onToggle: this.props.onToggle,
        className: className,
        extendIconClassName: this.props.extendIconClassName,
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
        disableClickToSms: disableClickToSms
      })));
    }
  }]);

  return ActionMenu;
}(_react.Component);

exports["default"] = ActionMenu;
ActionMenu.propTypes = {
  extended: _propTypes["default"].bool,
  onToggle: _propTypes["default"].func,
  reference: _propTypes["default"].func,
  className: _propTypes["default"].string,
  extendIconClassName: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onLog: _propTypes["default"].func,
  isLogged: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  isCreating: _propTypes["default"].bool,
  onViewEntity: _propTypes["default"].func,
  onCreateEntity: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  hasEntity: _propTypes["default"].bool,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  phoneNumber: _propTypes["default"].string,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  addLogTitle: _propTypes["default"].string,
  editLogTitle: _propTypes["default"].string,
  textTitle: _propTypes["default"].string,
  callTitle: _propTypes["default"].string,
  createEntityTitle: _propTypes["default"].string,
  viewEntityTitle: _propTypes["default"].string,
  onDelete: _propTypes["default"].func,
  deleteTitle: _propTypes["default"].string,
  onMark: _propTypes["default"].func,
  onUnmark: _propTypes["default"].func,
  marked: _propTypes["default"].bool,
  markTitle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].bool,
  disableClickToSms: _propTypes["default"].bool,
  withAnimation: _propTypes["default"].bool,
  selectedMatchContactType: _propTypes["default"].string
};
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
  selectedMatchContactType: ''
};
//# sourceMappingURL=index.js.map
