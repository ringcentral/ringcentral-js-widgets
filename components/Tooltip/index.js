"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _is_type = require("ringcentral-integration/lib/di/utils/is_type");

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var POSITION = new _Enum["default"](['top', 'left']);
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

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    var _context;

    var _this;

    _classCallCheck(this, Tooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this, props));
    _this.onResize = (_context = _assertThisInitialized(_this), _this.checkPosition).bind(_context);
    _this.onTransitionEnd = (_context = _assertThisInitialized(_this), _this.onTransitionEnd).bind(_context);
    _this.state = {
      cachedPositioning: null,
      visibility: null,
      position: null
    };
    _this.dom = _react["default"].createRef();
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
        return _objectSpread({}, preState, {
          visibility: props.open ? 'initial' : 'hidden'
        });
      });
    }
  }, {
    key: "setVisible",
    value: function setVisible() {
      this.setState(function (preState) {
        return _objectSpread({}, preState, {
          visibility: 'initial'
        });
      });
    }
  }, {
    key: "setInVisible",
    value: function setInVisible() {
      this.setState(function (preState) {
        return _objectSpread({}, preState, {
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
          return _objectSpread({}, preState, {
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
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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
          // eslint-disable-next-line no-unused-expressions
          (0, _is_type.isFunction)(this.props.beforeOpen) && this.props.beforeOpen();
        } else {
          // eslint-disable-next-line no-unused-expressions
          (0, _is_type.isFunction)(this.props.beforeClose) && this.props.beforeClose();
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.open) {
        // eslint-disable-next-line no-unused-expressions
        (0, _is_type.isFunction)(this.props.onOpen) && this.props.onOpen();
      } else {
        // eslint-disable-next-line no-unused-expressions
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
      return _react["default"].createElement("div", {
        ref: this.dom,
        className: (0, _classnames["default"])(_styles["default"].dropdownContainer, open ? _styles["default"].opened : null, _styles["default"][direction]),
        style: _objectSpread({
          visibility: this.state.visibility,
          position: fixed ? 'fixed' : 'absolute'
        }, this.state.position)
      }, _react["default"].createElement("div", {
        className: _styles["default"].dropdown
      }, children), _react["default"].createElement("div", {
        className: _styles["default"].tail
      }));
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.propTypes = {
  triggerElm: _propTypes["default"].object,
  fixed: _propTypes["default"].bool,
  direction: _propTypes["default"].string,
  open: _propTypes["default"].bool,
  onOpen: _propTypes["default"].func,
  beforeOpen: _propTypes["default"].func,
  beforeClose: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  children: _propTypes["default"].node
};
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
