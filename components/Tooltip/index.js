"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.string.fixed");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var POSITION = _ObjectMap.ObjectMap.fromKeys(['top', 'left']);
var TAIL_HEIGHT = Math.sqrt(Math.pow(10, 2) * 2);
var getDimensions = function getDimensions(element) {
  var PROPERTIES = {
    position: 'fixed',
    visibility: 'hidden'
  };
  if (element.nodeType) {
    var clonedEl = element.cloneNode(true);
    Object.keys(PROPERTIES).forEach(function (key) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      clonedEl.style[key] = PROPERTIES[key];
    });
    document.body.appendChild(clonedEl);
    var result = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    document.body.removeChild(clonedEl);
    clonedEl = null;
    return result;
  }
  return null;
};
var transitionEnd = function transitionEnd() {
  var el = document.createElement('bootstrap');
  var transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };
  for (var name in transEndEventNames) {
    // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
    if (el.style[name] !== undefined) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return transEndEventNames[name];
    }
  }
  return null;
};
var getPageOffset = function getPageOffset(el) {
  if (!el) {
    return null;
  }
  var rect = el.getBoundingClientRect();
  var scollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scollLeft
  };
};
var getRelativeOffset = function getRelativeOffset(el) {
  var res = {
    top: 0,
    left: 0
  };
  if (!el) {
    return null;
  }
  var tmp = el;
  while (window.getComputedStyle(tmp).position === 'static') {
    res.top += el.offsetTop;
    res.left += el.offsetLeft;
    tmp = tmp.parentElement;
  }
  return res;
};
var Tooltip = /*#__PURE__*/function (_Component) {
  _inherits(Tooltip, _Component);
  var _super = _createSuper(Tooltip);
  function Tooltip(props) {
    var _this;
    _classCallCheck(this, Tooltip);
    _this = _super.call(this, props);
    _this.dom = void 0;
    _this.onResize = void 0;
    _this.TRANSITION_END_EVT_NAME = void 0;
    _this.onResize = _this.checkPosition.bind(_assertThisInitialized(_this));
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_assertThisInitialized(_this));
    _this.TRANSITION_END_EVT_NAME = transitionEnd();

    // @ts-ignore
    _this.state = {
      // @ts-ignore
      cachedPositioning: null,
      // @ts-ignore
      visibility: null,
      // @ts-ignore
      position: null
    };
    _this.dom = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(Tooltip, [{
    key: "onTransitionEnd",
    value: function onTransitionEnd() {
      return !this.props.open ? this.setInVisible() : null;
    }
  }, {
    key: "setVisibility",
    value: function setVisibility() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      this.setState(function (preState) {
        return _objectSpread(_objectSpread({}, preState), {}, {
          visibility: props.open ? 'initial' : 'hidden'
        });
      });
    }
  }, {
    key: "setVisible",
    value: function setVisible() {
      this.setState(function (preState) {
        return _objectSpread(_objectSpread({}, preState), {}, {
          visibility: 'initial'
        });
      });
    }
  }, {
    key: "setInVisible",
    value: function setInVisible() {
      this.setState(function (preState) {
        return _objectSpread(_objectSpread({}, preState), {}, {
          visibility: 'hidden'
        });
      });
    }
  }, {
    key: "changeTriggerElmPosition",
    value: function changeTriggerElmPosition() {
      var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.fixed;
      var triggerElm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.triggerElm;
      var RELATIVE = 'relative';
      var elm;
      if (!fixed) {
        elm = triggerElm;
      } else {
        elm = document.body;
      }
      if (elm) {
        // @ts-expect-error TS(2339): Property 'style' does not exist on type 'object'.
        elm.style.position = RELATIVE;
      }
    }
  }, {
    key: "recordPositioning",
    value: function recordPositioning() {
      var triggerElm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.triggerElm;
      if (triggerElm) {
        var cachedPositioning = this.props.fixed ? {
          elm: document.body,
          position: window.getComputedStyle(document.body).position
        } : {
          elm: triggerElm,
          // @ts-expect-error TS(2345): Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
          position: window.getComputedStyle(triggerElm).position
        };
        // @ts-expect-error TS(2345): Argument of type '{ cachedPositioning: { elm: obje... Remove this comment to see the full error message
        this.setState({
          cachedPositioning: cachedPositioning
        });
      }
    }
  }, {
    key: "restorePositioning",
    value: function restorePositioning() {
      // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
      if (this.state.cachedPositioning && this.state.cachedPositioning.elm) {
        // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
        this.state.cachedPositioning.elm.style.potition =
        // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
        this.state.cachedPositioning.position;
      }
    }
  }, {
    key: "checkPosition",
    value: function checkPosition() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var triggerElm = this.props.triggerElm;
      if (triggerElm) {
        var current = this.dom.current;
        var demensionOfTrigger = getDimensions(triggerElm);
        var currentDemension = getDimensions(current);
        var offset;
        if (props.fixed) {
          offset = getPageOffset(triggerElm);
        } else {
          offset = getRelativeOffset(triggerElm);
        }
        var top = props.direction === POSITION.top ?
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        offset && offset.top - currentDemension.height - TAIL_HEIGHT / 2 :
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        offset && offset.top + demensionOfTrigger.height + TAIL_HEIGHT / 2;
        var left = offset &&
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        offset.left + demensionOfTrigger.width / 2 - currentDemension.width / 2;
        this.setState(function (preState) {
          return _objectSpread(_objectSpread({}, preState), {}, {
            position: {
              left: left,
              top: top
            }
          });
        });
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.recordPositioning();
      this.changeTriggerElmPosition();
      this.checkPosition();
      this.setVisibility();
      window.addEventListener('resize', this.onResize);
      if (this.TRANSITION_END_EVT_NAME) {
        this.dom.current.addEventListener(this.TRANSITION_END_EVT_NAME, this.onTransitionEnd);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.triggerElm !== this.props.triggerElm) {
        this.restorePositioning();
        this.recordPositioning(nextProps.triggerElm);
        this.changeTriggerElmPosition(nextProps.fixed, nextProps.triggerElm);
      }
      if (nextProps.children !== this.props.children || nextProps.fixed !== this.props.fixed) {
        this.checkPosition(nextProps);
      }
      if (nextProps.open !== this.props.open) {
        if (nextProps.open) {
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          this.setVisible(nextProps);
        }
        if (nextProps.open) {
          var _this$props$beforeOpe, _this$props;
          (_this$props$beforeOpe = (_this$props = this.props).beforeOpen) === null || _this$props$beforeOpe === void 0 ? void 0 : _this$props$beforeOpe.call(_this$props);
        } else {
          var _this$props$beforeClo, _this$props2;
          (_this$props$beforeClo = (_this$props2 = this.props).beforeClose) === null || _this$props$beforeClo === void 0 ? void 0 : _this$props$beforeClo.call(_this$props2);
        }
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.open) {
        var _this$props$onOpen, _this$props3;
        (_this$props$onOpen = (_this$props3 = this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props3);
      } else {
        var _this$props$onClose, _this$props4;
        (_this$props$onClose = (_this$props4 = this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props4);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      if (this.TRANSITION_END_EVT_NAME) {
        this.dom.current.removeEventListener(this.TRANSITION_END_EVT_NAME, this.onTransitionEnd);
      }
      this.restorePositioning();
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        open = _this$props5.open,
        direction = _this$props5.direction,
        fixed = _this$props5.fixed,
        children = _this$props5.children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.dom,
        className: (0, _clsx["default"])(_styles["default"].dropdownContainer, open ? _styles["default"].opened : null,
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        _styles["default"][direction]),
        style: _objectSpread({
          // @ts-expect-error TS(2339): Property 'visibility' does not exist on type 'neve... Remove this comment to see the full error message
          visibility: this.state.visibility,
          position: fixed ? 'fixed' : 'absolute'
        }, this.state.position)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].dropdown
      }, children), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].tail
      }));
    }
  }]);
  return Tooltip;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Tooltip.defaultProps = {
  triggerElm: null,
  fixed: false,
  direction: 'bottom',
  open: false,
  children: null,
  beforeOpen: function beforeOpen(i) {
    return i;
  },
  onOpen: function onOpen(i) {
    return i;
  },
  beforeClose: function beforeClose(i) {
    return i;
  },
  onClose: function onClose(i) {
    return i;
  }
};
var _default = Tooltip;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
