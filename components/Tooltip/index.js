'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_type = require('ringcentral-integration/lib/di/utils/is_type');

var _Enum = require('ringcentral-integration/lib/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POSITION = new _Enum2.default(['top', 'left']);

var TAIL_HEIGHT = Math.sqrt(Math.pow(10, 2) * 2);

var getDimensions = function getDimensions(element) {
  var PROPERTIES = {
    position: 'fixed',
    visibility: 'hidden'
  };

  if (element.nodeType) {
    var clonedEl = element.cloneNode(true);

    (0, _keys2.default)(PROPERTIES).forEach(function (key) {
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
  var res = { top: 0, left: 0 };
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

var Tooltip = function (_Component) {
  (0, _inherits3.default)(Tooltip, _Component);

  function Tooltip(props) {
    (0, _classCallCheck3.default)(this, Tooltip);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).call(this, props));

    _this.onResize = _this.checkPosition.bind(_this);
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);

    _this.state = {
      cachedPositioning: null,
      visibility: null,
      position: null
    };

    _this.dom = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'onTransitionEnd',
    value: function onTransitionEnd() {
      return !this.props.open ? this.setInVisible() : null;
    }
  }, {
    key: 'setVisibility',
    value: function setVisibility() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.setState(function (preState) {
        return (0, _extends3.default)({}, preState, {
          visibility: props.open ? 'initial' : 'hidden'
        });
      });
    }
  }, {
    key: 'setVisible',
    value: function setVisible() {
      this.setState(function (preState) {
        return (0, _extends3.default)({}, preState, {
          visibility: 'initial'
        });
      });
    }
  }, {
    key: 'setInVisible',
    value: function setInVisible() {
      this.setState(function (preState) {
        return (0, _extends3.default)({}, preState, {
          visibility: 'hidden'
        });
      });
    }
  }, {
    key: 'changeTriggerElmPosition',
    value: function changeTriggerElmPosition() {
      var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.fixed;
      var triggerElm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.triggerElm;

      var RELATIVE = 'relative';
      var elm = void 0;
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
    key: 'recordPositioning',
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
    key: 'restorePositioning',
    value: function restorePositioning() {
      if (this.state.cachedPositioning && this.state.cachedPositioning.elm) {
        this.state.cachedPositioning.elm.style.potition = this.state.cachedPositioning.position;
      }
    }
  }, {
    key: 'checkPosition',
    value: function checkPosition() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var triggerElm = this.props.triggerElm;

      if (triggerElm) {
        var current = this.dom.current;

        var demensionOfTrigger = getDimensions(triggerElm);
        var currentDemension = getDimensions(current);

        var offset = void 0;

        if (props.fixed) {
          offset = getPageOffset(triggerElm);
        } else {
          offset = getRelativeOffset(triggerElm);
        }

        var top = props.direction === POSITION.top ? offset && offset.top - currentDemension.height - TAIL_HEIGHT / 2 : offset && offset.top + demensionOfTrigger.height + TAIL_HEIGHT / 2;
        var left = offset && offset.left + demensionOfTrigger.width / 2 - currentDemension.width / 2;

        this.setState(function (preState) {
          return (0, _extends3.default)({}, preState, {
            position: {
              left: left,
              top: top
            }
          });
        });
      }
    }
  }, {
    key: 'componentDidMount',
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
    key: 'componentWillReceiveProps',
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
    key: 'componentDidUpdate',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      if (TRANSITION_END_EVT_NAME) {
        this.dom.current.removeEventListener(TRANSITION_END_EVT_NAME, this.onTransitionEnd);
      }
      this.restorePositioning();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          direction = _props.direction,
          fixed = _props.fixed,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        {
          ref: this.dom,
          className: (0, _classnames2.default)(_styles2.default.dropdownContainer, open ? _styles2.default.opened : null, _styles2.default[direction]),
          style: (0, _extends3.default)({
            visibility: this.state.visibility,
            position: fixed ? 'fixed' : 'absolute'
          }, this.state.position)
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.dropdown },
          children
        ),
        _react2.default.createElement('div', { className: _styles2.default.tail })
      );
    }
  }]);
  return Tooltip;
}(_react.Component);

Tooltip.propTypes = {
  triggerElm: _propTypes2.default.object,
  fixed: _propTypes2.default.bool,
  direction: _propTypes2.default.string,
  open: _propTypes2.default.bool,
  onOpen: _propTypes2.default.func,
  beforeOpen: _propTypes2.default.func,
  beforeClose: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node
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

exports.default = Tooltip;
//# sourceMappingURL=index.js.map
