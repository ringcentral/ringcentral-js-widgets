"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _reactEmojione = _interopRequireDefault(require("react-emojione"));

var _emojione = _interopRequireDefault(require("../../assets/images/emojione.png"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ImageRender(props) {
  if (props.alt === ':Person' || props.alt === ':Team') {
    if (typeof props.atRender === 'function') {
      var AtRender = props.atRender;
      return _react["default"].createElement(AtRender, {
        id: props.src,
        type: props.alt.replace(':', '')
      });
    }

    return _react["default"].createElement("a", {
      href: "#".concat(props.src)
    }, "@", props.src);
  }

  return _react["default"].createElement("img", {
    src: props.src,
    alt: props.alt
  });
}

ImageRender.propTypes = {
  src: _propTypes["default"].string.isRequired,
  alt: _propTypes["default"].string,
  atRender: _propTypes["default"].func
};
ImageRender.defaultProps = {
  alt: undefined,
  atRender: undefined
};

function LinkRender(props) {
  return _react["default"].createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: props.href,
    title: props.title
  }, props.children);
}

LinkRender.propTypes = {
  href: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node.isRequired,
  title: _propTypes["default"].string
};
LinkRender.defaultProps = {
  title: undefined
};

function TextRender(props) {
  var children = props.children.map(function (child) {
    if (child && child.split) {
      return child.split('\n').reduce(function (lines, line) {
        if (lines.length > 0) {
          lines.push(_react["default"].createElement("br", null));
        }

        lines.push(line);
        return lines;
      }, []);
    }

    return child;
  });
  return _react["default"].createElement("p", null, _react["default"].createElement(_reactEmojione["default"], {
    style: {
      backgroundImage: "url(\"".concat(_emojione["default"], "\")")
    }
  }, children));
}

TextRender.propTypes = {
  children: _propTypes["default"].node.isRequired
};

function Markdown(_ref) {
  var className = _ref.className,
      text = _ref.text,
      atRender = _ref.atRender;
  var renderers = {
    image: function image(props) {
      return _react["default"].createElement(ImageRender, _extends({}, props, {
        atRender: atRender
      }));
    },
    link: LinkRender,
    paragraph: TextRender
  };
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement(_reactMarkdown["default"], {
    className: _styles["default"]['markdown-body'],
    source: text,
    renderers: renderers
  }));
  /* eslint-enable */
}

Markdown.propTypes = {
  className: _propTypes["default"].string,
  text: _propTypes["default"].string.isRequired,
  atRender: _propTypes["default"].func
};
Markdown.defaultProps = {
  className: undefined,
  atRender: undefined
};
var _default = Markdown;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
