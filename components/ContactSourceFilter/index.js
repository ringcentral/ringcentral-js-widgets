"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSourceItem = ContactSourceItem;
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _ContactFilter = _interopRequireDefault(require("../../assets/images/ContactFilter.svg"));

var _ContactFilterSolid = _interopRequireDefault(require("../../assets/images/ContactFilterSolid.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ContactSourceItem(_ref) {
  var sourceName = _ref.sourceName,
      sourceLabel = _ref.sourceLabel,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect;
  return _react.default.createElement("div", {
    onClick: function onClick() {
      return onSelect(sourceName);
    },
    className: (0, _classnames.default)(_styles.default.contactSourceItem, isSelected ? _styles.default.selected : '')
  }, sourceLabel);
}

ContactSourceItem.propTypes = {
  sourceName: _propTypes.default.string.isRequired,
  sourceLabel: _propTypes.default.string.isRequired,
  isSelected: _propTypes.default.bool.isRequired,
  onSelect: _propTypes.default.func.isRequired
};

var ContactSourceFilter =
/*#__PURE__*/
function (_Component) {
  _inherits(ContactSourceFilter, _Component);

  function ContactSourceFilter(props) {
    var _this;

    _classCallCheck(this, ContactSourceFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactSourceFilter).call(this, props));

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

  _createClass(ContactSourceFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
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
      return _i18n.default.getString(key, locale);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          currentLocale = _this$props.currentLocale,
          contactSourceNames = _this$props.contactSourceNames,
          selectedSourceName = _this$props.selectedSourceName;
      var isAllSource = selectedSourceName === contactSourceNames[0];
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.contactSourceFilter, className),
        "data-sign": "contactSourceFilterButton",
        onClick: this.togglePanel
      }, _react.default.createElement("div", {
        "data-sign": "filterIconContainer",
        className: _styles.default.filterIconContainer,
        title: this.getString(selectedSourceName, currentLocale)
      }, isAllSource ? _react.default.createElement(_ContactFilter.default, {
        className: (0, _classnames.default)(_styles.default.filterIconNode, _styles.default.iconNoneFill)
      }) : _react.default.createElement(_ContactFilterSolid.default, {
        className: _styles.default.filterIconNode
      })), !this.state.unfold ? null : _react.default.createElement("div", {
        className: _styles.default.contactSourceList,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        "data-sign": "contactSourceList"
      }, contactSourceNames.map(function (sourceName) {
        return _react.default.createElement(ContactSourceItem, {
          key: sourceName,
          sourceName: sourceName,
          sourceLabel: _this2.getString(sourceName, currentLocale),
          isSelected: sourceName === selectedSourceName,
          onSelect: _this2.emitSelect
        });
      })));
    }
  }]);

  return ContactSourceFilter;
}(_react.Component);

exports.default = ContactSourceFilter;
ContactSourceFilter.propTypes = {
  className: _propTypes.default.string,
  currentLocale: _propTypes.default.string.isRequired,
  onSourceSelect: _propTypes.default.func,
  selectedSourceName: _propTypes.default.string,
  contactSourceNames: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  unfold: _propTypes.default.bool,
  onUnfoldChange: _propTypes.default.func
};
ContactSourceFilter.defaultProps = {
  className: undefined,
  selectedSourceName: undefined,
  onSourceSelect: undefined,
  unfold: undefined,
  onUnfoldChange: undefined
};
//# sourceMappingURL=index.js.map
