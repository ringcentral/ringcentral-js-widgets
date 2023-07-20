"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSourceFilter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _ContactFilter = _interopRequireDefault(require("../../assets/images/ContactFilter.svg"));
var _ContactFilterSolid = _interopRequireDefault(require("../../assets/images/ContactFilterSolid.svg"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  font-size: 13px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject(), (0, _juno.spacing)(2));
var ContactSourceFilter = /*#__PURE__*/function (_Component) {
  _inherits(ContactSourceFilter, _Component);
  var _super = _createSuper(ContactSourceFilter);
  function ContactSourceFilter(props) {
    var _this;
    _classCallCheck(this, ContactSourceFilter);
    _this = _super.call(this, props);
    _this._mounted = false;
    _this.hideList = function () {
      if (_this._mounted) {
        _this.setState({
          unfold: false
        });
        if (typeof _this.props.onUnfoldChange === 'function') {
          _this.props.onUnfoldChange(false);
        }
      }
      window.removeEventListener('click', _this.hideList);
    };
    _this.showList = function () {
      _this.setState({
        unfold: true
      });
      window.addEventListener('click', _this.hideList);
      if (typeof _this.props.onUnfoldChange === 'function') {
        _this.props.onUnfoldChange(true);
      }
    };
    _this.togglePanel = function (evt) {
      evt.stopPropagation();
      if (!_this.state.unfold) {
        _this.showList();
        return;
      }
      _this.hideList();
    };
    _this.emitSelect = function (sourceName) {
      var onSourceSelect = _this.props.onSourceSelect;
      if (onSourceSelect) {
        onSourceSelect(sourceName);
      }
      _this.hideList();
    };
    var unfold = props.unfold !== undefined ? props.unfold : false;
    _this.state = {
      unfold: unfold
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ContactSourceFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (!this.state.unfold) {
        window.removeEventListener('click', this.hideList);
      }
    }
  }, {
    key: "getString",
    value: function getString(key, locale) {
      return _i18n["default"].getString(key, locale);
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        currentLocale = _this$props.currentLocale,
        contactSourceNames = _this$props.contactSourceNames,
        selectedSourceName = _this$props.selectedSourceName;
      var isAllSource = selectedSourceName === contactSourceNames[0];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].contactSourceFilter, className),
        "data-sign": "contactSourceFilterButton",
        onClick: this.togglePanel
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "filterIconContainer",
        className: _styles["default"].filterIconContainer
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        ,
        title: this.getString(selectedSourceName, currentLocale)
      }, isAllSource ? /*#__PURE__*/_react["default"].createElement(_ContactFilter["default"], {
        className: (0, _classnames["default"])(_styles["default"].filterIconNode, _styles["default"].iconNoneFill)
      }) : /*#__PURE__*/_react["default"].createElement(_ContactFilterSolid["default"], {
        className: _styles["default"].filterIconNode
      })), !this.state.unfold ? null : /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
        className: _styles["default"].contactSourceList,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        "data-sign": "contactSourceList"
      }, contactSourceNames.map(function (sourceName) {
        return /*#__PURE__*/_react["default"].createElement(StyledListItem, {
          "data-sign": "contactSourceItem",
          component: "div",
          onClick: function onClick() {
            return _this2.emitSelect(sourceName);
          },
          size: "small",
          key: sourceName,
          selected: sourceName === selectedSourceName,
          disableGutters: true
        }, _this2.getString(sourceName, currentLocale));
      })));
    }
  }]);
  return ContactSourceFilter;
}(_react.Component);
exports.ContactSourceFilter = ContactSourceFilter;
//# sourceMappingURL=ContactSourceFilter.js.map
