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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SpinnerOverlay = require("@ringcentral-integration/widgets/components/SpinnerOverlay");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _left_arrow = _interopRequireDefault(require("../../assets/images/left_arrow.png"));

var _GlipPostList = _interopRequireDefault(require("../GlipPostList"));

var _GlipChatForm = _interopRequireDefault(require("../GlipChatForm"));

var _GlipGroupName = _interopRequireDefault(require("../GlipGroupName"));

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

var GlipChatPage = /*#__PURE__*/function (_Component) {
  _inherits(GlipChatPage, _Component);

  var _super = _createSuper(GlipChatPage);

  function GlipChatPage(props) {
    var _this;

    _classCallCheck(this, GlipChatPage);

    _this = _super.call(this, props);
    _this.state = {
      inputHeight: props.mobile ? 80 : 110,
      headerHeight: props.mobile ? 38 : 50
    };
    return _this;
  }

  _createClass(GlipChatPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadGroup(this.props.groupId);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.groupId !== nextProps.groupId) {
        this.props.loadGroup(nextProps.groupId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          group = _this$props.group,
          className = _this$props.className,
          posts = _this$props.posts,
          updateText = _this$props.updateText,
          createPost = _this$props.createPost,
          textValue = _this$props.textValue,
          dateTimeFormatter = _this$props.dateTimeFormatter,
          showSpinner = _this$props.showSpinner,
          atRender = _this$props.atRender,
          uploadFile = _this$props.uploadFile,
          viewProfile = _this$props.viewProfile,
          loadNextPage = _this$props.loadNextPage,
          onBackClick = _this$props.onBackClick,
          mobile = _this$props.mobile;
      var spinner = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null; // TODO: update alt with i18n

      var backIcon = onBackClick ? /*#__PURE__*/_react["default"].createElement("img", {
        src: _left_arrow["default"],
        alt: "Back",
        className: _styles["default"].backIcon,
        onClick: onBackClick
      }) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].header,
        style: {
          height: this.state.headerHeight,
          lineHeight: "".concat(this.state.headerHeight, "px")
        }
      }, backIcon, /*#__PURE__*/_react["default"].createElement(_GlipGroupName["default"], {
        group: group,
        showNumber: true
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].content,
        style: {
          height: "calc(100% - ".concat(this.state.inputHeight + this.state.headerHeight, "px)")
        }
      }, /*#__PURE__*/_react["default"].createElement(_GlipPostList["default"], {
        posts: posts,
        atRender: atRender,
        groupId: group.id,
        showName: group.members && group.members.length > 2,
        dateTimeFormatter: dateTimeFormatter,
        viewProfile: viewProfile,
        loadNextPage: loadNextPage
      })), /*#__PURE__*/_react["default"].createElement(_GlipChatForm["default"], {
        className: _styles["default"].inputArea,
        height: this.state.inputHeight,
        textValue: textValue,
        onTextChange: updateText,
        groupId: group.id,
        onSubmit: createPost,
        onUploadFile: uploadFile,
        members: group.detailMembers,
        mobile: mobile
      }), spinner);
    }
  }]);

  return GlipChatPage;
}(_react.Component);

exports["default"] = GlipChatPage;
GlipChatPage.propTypes = {
  className: _propTypes["default"].string,
  group: _propTypes["default"].object,
  posts: _propTypes["default"].array,
  groupId: _propTypes["default"].string,
  textValue: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  loadGroup: _propTypes["default"].func.isRequired,
  updateText: _propTypes["default"].func.isRequired,
  createPost: _propTypes["default"].func.isRequired,
  uploadFile: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  atRender: _propTypes["default"].func,
  onBackClick: _propTypes["default"].func,
  viewProfile: _propTypes["default"].func.isRequired,
  loadNextPage: _propTypes["default"].func.isRequired,
  mobile: _propTypes["default"].bool
};
GlipChatPage.defaultProps = {
  className: undefined,
  groupId: null,
  group: {},
  posts: [],
  textValue: '',
  showSpinner: false,
  atRender: undefined,
  onBackClick: undefined,
  mobile: false
};
//# sourceMappingURL=index.js.map
