"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
