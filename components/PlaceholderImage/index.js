"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var cache = {};
var defaultContainer = function defaultContainer(x) {
  return x;
};
/**
 * Reference: https://github.com/mbrevda/react-image
 * This component contains too many features we do not need for now
 *
 * @class PlaceholderImage
 * @extends {Component}
 */
var PlaceholderImage = /*#__PURE__*/function (_Component) {
  _inherits(PlaceholderImage, _Component);
  var _super = _createSuper(PlaceholderImage);
  function PlaceholderImage(props) {
    var _this;
    _classCallCheck(this, PlaceholderImage);
    _this = _super.call(this, props);
    _this.img = void 0;
    _this.onLoad = function () {
      var src = _this.props.src; // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      cache[src] = true;
      if (_this.img) {
        _this.setState({
          isLoaded: true
        });
      }
    };
    _this.onError = function () {
      var src = _this.props.src; // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      cache[src] = false;
      if (!_this.img) {
        return false;
      }
      _this.setState({
        isLoaded: false
      });
    };
    _this.loadImg = function () {
      var src = _this.props.src;
      _this.img = new Image();
      _this.img.src = src;
      // TODO: Consider using decode first here
      _this.img.onload = _this.onLoad;
      _this.img.onerror = _this.onError;
    };
    _this.unloadImg = function () {
      delete _this.img.onerror;
      delete _this.img.onload;
      try {
        delete _this.img.src;
      } catch (e) {
        console.error('Error: error on deleting img src');
      }
      delete _this.img;
    };
    _this.state = {
      isLoading: true,
      isLoaded: false
    };
    return _this;
  }
  _createClass(PlaceholderImage, [{
    key: "componentDidMount",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function componentDidMount() {
      var isLoading = this.state.isLoading;
      if (isLoading) {
        this.loadImg();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.img) {
        this.unloadImg();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var imgSrc = nextProps.src;
      var src = this.props.src;
      if (src !== imgSrc) {
        // If the source is invalid, just render the placeholder
        if (!imgSrc) {
          return this.setState({
            isLoading: false,
            isLoaded: false
          });
        }
        this.setState({
          isLoaded: false,
          isLoading: false
        }, this.loadImg);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        container = _this$props.container,
        src = _this$props.src,
        placeholder = _this$props.placeholder,
        placeholderContainer = _this$props.placeholderContainer,
        rest = _objectWithoutProperties(_this$props, ["container", "src", "placeholder", "placeholderContainer"]);
      var _this$state = this.state,
        isLoading = _this$state.isLoading,
        isLoaded = _this$state.isLoaded;
      if (isLoaded) {
        var imgProps = _objectSpread(_objectSpread({}, {
          src: src
        }), rest);
        /* eslint-disable-next-line */
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        return container( /*#__PURE__*/_react["default"].createElement("img", imgProps));
      }
      if (!isLoaded && isLoading) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        return placeholder ? placeholderContainer(placeholder) : null;
      }
      return null;
    }
  }]);
  return PlaceholderImage;
}(_react.Component);
PlaceholderImage.defaultProps = {
  src: '',
  placeholder: false,
  container: defaultContainer,
  placeholderContainer: defaultContainer
};
var _default = PlaceholderImage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
