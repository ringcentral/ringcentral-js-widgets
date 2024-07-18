"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Modal = _interopRequireDefault(require("@ringcentral-integration/widgets/components/Modal"));
var _SearchInput = require("@ringcentral-integration/widgets/components/SearchInput");
var _TextInput = _interopRequireDefault(require("@ringcentral-integration/widgets/components/TextInput"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var GlipTeamCreationModal = /*#__PURE__*/function (_Component) {
  _inherits(GlipTeamCreationModal, _Component);
  var _super = _createSuper(GlipTeamCreationModal);
  function GlipTeamCreationModal(props) {
    var _this;
    _classCallCheck(this, GlipTeamCreationModal);
    _this = _super.call(this, props);
    _this.state = {
      selectedContacts: [],
      teamName: '',
      creating: false,
      error: null
    };
    _this.updateSeachString = function (e) {
      _this.setState({
        error: null
      });
      var searchString = e.target.value;
      _this.props.updateFilter(searchString);
    };
    _this.updateTeamName = function (e) {
      var name = e.target.value;
      _this.setState({
        teamName: name,
        error: null
      });
    };
    _this.removeContact = function (email) {
      _this.setState(function (previousState) {
        return {
          selectedContacts: previousState.selectedContacts.filter(function (c) {
            return c.email !== email;
          })
        };
      });
    };
    _this.onCancel = function () {
      _this.props.updateFilter('');
      _this.props.closeModal();
      _this.setState({
        selectedContacts: [],
        teamName: ''
      });
    };
    _this.onConfirm = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.creating) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              if (!(_this.state.teamName === '')) {
                _context.next = 5;
                break;
              }
              // TODO: update error message with i18n
              _this.setState({
                error: 'Please enter a valid team name.'
              });
              return _context.abrupt("return");
            case 5:
              if (!(_this.state.selectedContacts.length === 0)) {
                _context.next = 8;
                break;
              }
              // TODO: update error message with i18n
              _this.setState({
                error: 'Please select team number.'
              });
              return _context.abrupt("return");
            case 8:
              _this.setState({
                creating: true
              });
              _context.prev = 9;
              _context.next = 12;
              return _this.props.createTeam(_this.state);
            case 12:
              _this.props.updateFilter('');
              _this.setState({
                selectedContacts: [],
                teamName: '',
                creating: false
              });
              _this.props.closeModal();
              _context.next = 21;
              break;
            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](9);
              console.log(_context.t0.message);
              _this.setState({
                error: _context.t0.message,
                creating: false
              });
            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 17]]);
    }));
    _this.addContact = function (contact) {
      _this.setState({
        error: null
      });
      var email = contact.email || contact.emails && contact.emails[0];
      var oldIndex = _this.state.selectedContacts.findIndex(function (c) {
        return c.email === email;
      });
      if (oldIndex > -1) {
        return;
      }
      _this.setState({
        selectedContacts: [{
          name: contact.name,
          email: email
        }].concat(_this.state.selectedContacts)
      });
      _this.props.updateFilter('');
    };
    return _this;
  }
  _createClass(GlipTeamCreationModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var contacts;
      if (this.props.searchFilter.length < 3) {
        contacts = [];
      } else {
        contacts = this.props.filteredContacts.filter(function (c) {
          return c.emails.length;
        }).slice(0, 10);
      }
      // TODO: update title message with i18n
      return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
        onConfirm: this.onConfirm,
        onCancel: this.onCancel,
        currentLocale: "en-US",
        show: this.props.show,
        title: "Create Team",
        textCancel: "Close",
        textConfirm: this.state.creating ? 'Creating' : 'Create'
      }, this.state.error ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].errorMessage
      }, this.state.error) : null, /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        className: _styles["default"].teamName,
        value: this.state.teamName,
        onChange: this.updateTeamName,
        placeholder: "Team name"
      }), /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
        className: _styles["default"].searchInput,
        value: this.props.searchFilter,
        onChange: this.updateSeachString,
        placeholder: "Search and add people.."
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].selectedContacts
      }, this.state.selectedContacts.map(function (contact) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: _styles["default"].selectedContactItem,
          key: contact.email
        }, contact.name, /*#__PURE__*/_react["default"].createElement("span", {
          className: _styles["default"].closeIcon,
          onClick: function onClick() {
            return _this2.removeContact(contact.email);
          }
        }, "x"));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].contacts
      }, contacts.map(function (contact) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].contactItem,
          key: contact.email || contact.emails && contact.emails[0],
          onClick: function onClick() {
            return _this2.addContact(contact);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].contactName,
          title: contact.name
        }, contact.name), /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].contactEmail,
          title: contact.email || contact.emails && contact.emails[0]
        }, contact.email || contact.emails && contact.emails[0]));
      })));
    }
  }]);
  return GlipTeamCreationModal;
}(_react.Component);
exports["default"] = GlipTeamCreationModal;
GlipTeamCreationModal.propTypes = {
  show: _propTypes["default"].bool.isRequired,
  closeModal: _propTypes["default"].func.isRequired,
  createTeam: _propTypes["default"].func.isRequired,
  updateFilter: _propTypes["default"].func.isRequired,
  searchFilter: _propTypes["default"].string.isRequired,
  filteredContacts: _propTypes["default"].array.isRequired
};
//# sourceMappingURL=index.js.map
