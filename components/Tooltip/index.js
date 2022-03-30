"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.function.bind");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _is_type = require("@ringcentral-integration/commons/lib/di/utils/is_type");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    if (el.style[name] !== undefined) {
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

var TRANSITION_END_EVT_NAME = transitionEnd();

var Tooltip = /*#__PURE__*/function (_Component) {
  _inherits(Tooltip, _Component);

  var _super = _createSuper(Tooltip);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, props);
    _this.onResize = _this.checkPosition.bind(_assertThisInitialized(_this));
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_assertThisInitialized(_this));
    _this.state = {
      cachedPositioning: null,
      visibility: null,
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
          position: window.getComputedStyle(triggerElm).position
        };
        this.setState({
          cachedPositioning: cachedPositioning
        });
      }
    }
  }, {
    key: "restorePositioning",
    value: function restorePositioning() {
      if (this.state.cachedPositioning && this.state.cachedPositioning.elm) {
        this.state.cachedPositioning.elm.style.potition = this.state.cachedPositioning.position;
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

        var top = props.direction === POSITION.top ? offset && offset.top - currentDemension.height - TAIL_HEIGHT / 2 : offset && offset.top + demensionOfTrigger.height + TAIL_HEIGHT / 2;
        var left = offset && offset.left + demensionOfTrigger.width / 2 - currentDemension.width / 2;
        this.setState(function (preState) {
          return _objectSpread(_objectSpread({}, preState), {}, {
            position: {
              left: left,
              top: top
            }
          });
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.recordPositioning();
      this.changeTriggerElmPosition();
      this.checkPosition();
      this.setVisibility();
      window.addEventListener('resize', this.onResize);

      if (TRANSITION_END_EVT_NAME) {
        this.dom.current.addEventListener(TRANSITION_END_EVT_NAME, this.onTransitionEnd);
      }
    }
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
          this.setVisible(nextProps);
        }

        if (nextProps.open) {
          (0, _is_type.isFunction)(this.props.beforeOpen) && this.props.beforeOpen();
        } else {
          (0, _is_type.isFunction)(this.props.beforeClose) && this.props.beforeClose();
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.open) {
        (0, _is_type.isFunction)(this.props.onOpen) && this.props.onOpen();
      } else {
        (0, _is_type.isFunction)(this.props.onClose) && this.props.onClose();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);

      if (TRANSITION_END_EVT_NAME) {
        this.dom.current.removeEventListener(TRANSITION_END_EVT_NAME, this.onTransitionEnd);
      }

      this.restorePositioning();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          open = _this$props.open,
          direction = _this$props.direction,
          fixed = _this$props.fixed,
          children = _this$props.children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.dom,
        className: (0, _classnames["default"])(_styles["default"].dropdownContainer, open ? _styles["default"].opened : null, _styles["default"][direction]),
        style: _objectSpread({
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
}(_react.Component);

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
