"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ramda = require("ramda");

var _reactVirtualized = require("react-virtualized");

var _ContactItem = _interopRequireDefault(require("../ContactItem"));

var _i18n = _interopRequireDefault(require("./i18n"));

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

var CAPTION_HEIGHT = 20;
var ROW_HEIGHT = 50;

var Placeholder = function Placeholder(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].placeholder
  }, message);
};

Placeholder.propTypes = {
  message: _propTypes["default"].string.isRequired
};

var ContactList = /*#__PURE__*/function (_Component) {
  _inherits(ContactList, _Component);

  var _super = _createSuper(ContactList);

  function ContactList(props) {
    var _this;

    _classCallCheck(this, ContactList);

    _this = _super.call(this, props);

    _this.calculateRowHeight = function (_ref2) {
      var index = _ref2.index;

      if (_this.isBottomNoticeRow(index)) {
        return _this.props.bottomNoticeHeight;
      }

      if (_this.state.captionRows[index]) {
        return CAPTION_HEIGHT;
      }

      return ROW_HEIGHT;
    };

    _this.findGroup = function (_ref3) {
      var index = _ref3.index;
      return (0, _ramda.find)(function (item) {
        return index >= item.startIndex && index < item.startIndex + item.contacts.length;
      }, _this.state.groups);
    };

    _this.rowGetter = function (_ref4) {
      var index = _ref4.index;

      if (_this.isBottomNoticeRow(index)) {
        return {
          bottomNoticeRow: true
        };
      }

      if (_this.state.captionRows[index]) {
        return {
          caption: _this.state.captionRows[index]
        };
      }

      var group = _this.findGroup({
        index: index
      });

      return group.contacts[index - group.startIndex];
    };

    _this.onScroll = function (_ref5) {
      var scrollTop = _ref5.scrollTop;

      if (scrollTop !== _this.state.scrollTop) {
        _this.setState({
          scrollTop: scrollTop
        });
      }
    };

    _this.cellRenderer = function (_ref6) {
      var rowData = _ref6.rowData;

      if (rowData.bottomNoticeRow) {
        var BottomNotice = _this.props.bottomNotice;
        return BottomNotice ? /*#__PURE__*/_react["default"].createElement(BottomNotice, null) : /*#__PURE__*/_react["default"].createElement("span", null);
      }

      if (rowData.caption) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].groupCaption
        }, rowData.caption);
      }

      var _this$props = _this.props,
          currentLocale = _this$props.currentLocale,
          getAvatarUrl = _this$props.getAvatarUrl,
          getPresence = _this$props.getPresence,
          onItemSelect = _this$props.onItemSelect,
          sourceNodeRenderer = _this$props.sourceNodeRenderer,
          currentSiteCode = _this$props.currentSiteCode,
          isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "".concat(rowData.type, "-").concat(rowData.id)
      }, /*#__PURE__*/_react["default"].createElement(_ContactItem["default"], {
        currentLocale: currentLocale,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        contact: rowData,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onSelect: onItemSelect,
        sourceNodeRenderer: sourceNodeRenderer
      }));
    };

    _this.onRowsRendered = function (_ref7) {
      var startIndex = _ref7.startIndex;

      if (_this.isBottomNoticeRow(startIndex)) {
        return;
      } // update header with the correct caption


      if (_this.state.captionRows[startIndex]) {
        var groupIndex = (0, _ramda.findIndex)(function (item) {
          return item === _this.state.captionRows[startIndex];
        }, _this.state.captions);
        var previousCaption = _this.state.captions[groupIndex - 1];

        if (previousCaption !== _this.state.currentCaption) {
          _this.setState({
            currentCaption: previousCaption
          });
        }
      } else {
        var group = _this.findGroup({
          index: startIndex
        });

        if (group.caption !== _this.state.currentCaption) {
          _this.setState({
            currentCaption: group.caption
          });
        }
      }
    };

    _this.headerRenderer = function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].groupCaption
      }, _this.state.currentCaption);
    };

    _this.state = ContactList.getDerivedStateFromProps(props);
    _this.list = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(ContactList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.state.lastContactGroups !== prevProps.contactGroups) {
        if (this.list && this.list.current && this.list.current.recomputeRowHeights) {
          this.list.current.recomputeRowHeights(0);
        }
      }
    }
  }, {
    key: "isBottomNoticeRow",
    value: function isBottomNoticeRow(rowIndex) {
      return this.props.bottomNotice && rowIndex === this.state.rowCount;
    }
  }, {
    key: "resetScrollTop",
    value: function resetScrollTop() {
      this.setState({
        scrollTop: 0
      });
    }
  }, {
    key: "renderList",
    value: function renderList() {
      // use table instead of list to allow caption header
      return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Table, {
        ref: this.list,
        headerHeight: CAPTION_HEIGHT,
        width: this.props.width,
        height: this.props.height,
        rowCount: this.state.rowCount + (this.props.bottomNotice ? 1 : 0),
        rowHeight: this.calculateRowHeight,
        rowGetter: this.rowGetter,
        onRowsRendered: this.onRowsRendered,
        onScroll: this.onScroll,
        scrollTop: this.state.scrollTop
      }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "caption",
        disableSort: true,
        flexGrow: 1,
        width: this.props.width,
        cellRenderer: this.cellRenderer,
        headerRenderer: this.headerRenderer
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          contactGroups = _this$props2.contactGroups,
          isSearching = _this$props2.isSearching,
          width = _this$props2.width,
          height = _this$props2.height;
      var content = null;

      if (width !== 0 && height !== 0) {
        if (contactGroups.length) {
          content = this.renderList();
        } else if (isSearching) {
          content = /*#__PURE__*/_react["default"].createElement(Placeholder, {
            message: _i18n["default"].getString('onSearching', currentLocale)
          });
        } else {
          content = /*#__PURE__*/_react["default"].createElement(Placeholder, {
            message: _i18n["default"].getString('noContacts', currentLocale)
          });
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        "data-sign": "contactList",
        "data-contact-count": this.state.contactCount
      }, content);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        scrollTop: 0,
        currentCaption: ''
      };

      if (props.contactGroups !== state.lastContactGroups) {
        return _objectSpread(_objectSpread({}, (0, _ramda.reduce)(function (nextState, group) {
          nextState.captions.push(group.caption); // skip the caption row for the first group

          var rowOffset = nextState.groups.length !== 0 ? 1 : 0;

          if (rowOffset) {
            nextState.captionRows[nextState.rowCount] = group.caption;
          }

          nextState.groups.push(_objectSpread(_objectSpread({}, group), {}, {
            startIndex: nextState.rowCount + rowOffset
          }));
          nextState.rowCount += group.contacts.length + rowOffset; // with caption row

          nextState.contactCount += group.contacts.length;
          return nextState;
        }, _objectSpread(_objectSpread({}, state), {}, {
          groups: [],
          captions: [],
          captionRows: {},
          rowCount: 0,
          contactCount: 0
        }), props.contactGroups)), {}, {
          lastContactGroups: props.contactGroups
        });
      }

      return state;
    }
  }]);

  return ContactList;
}(_react.Component);

ContactList.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  contactGroups: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    caption: _propTypes["default"].string.isRequired,
    contacts: _propTypes["default"].arrayOf(_ContactItem["default"].propTypes.contact).isRequired
  })).isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  getPresence: _propTypes["default"].func.isRequired,
  onItemSelect: _propTypes["default"].func,
  sourceNodeRenderer: _propTypes["default"].func,
  isSearching: _propTypes["default"].bool,
  bottomNotice: _propTypes["default"].func,
  bottomNoticeHeight: _propTypes["default"].number,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};
ContactList.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined,
  isSearching: false,
  bottomNotice: undefined,
  bottomNoticeHeight: 0,
  currentSiteCode: '',
  isMultipleSiteEnabled: false
};
var _default = ContactList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
