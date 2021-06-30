"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallView = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find-index");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _IncomingCallPanel = _interopRequireDefault(require("../IncomingCallPanel"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IncomingCallView = /*#__PURE__*/function (_Component) {
  _inherits(IncomingCallView, _Component);

  var _super = _createSuper(IncomingCallView);

  function IncomingCallView(props) {
    var _this;

    _classCallCheck(this, IncomingCallView);

    _this = _super.call(this, props);

    _this.answer = function () {
      return _this.props.answer(_this.props.session.id);
    };

    _this.reject = function () {
      return _this.props.reject(_this.props.session.id);
    };

    _this.toVoiceMail = function () {
      return _this.props.toVoiceMail(_this.props.session.id);
    };

    _this.replyWithMessage = function (message) {
      return _this.props.replyWithMessage(_this.props.session.id, message);
    };

    _this.toggleMinimized = function () {
      return _this.props.toggleMinimized(_this.props.session.id);
    };

    _this.answerAndEnd = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.props.hangup(_this.props.activeSessionId);

            case 2:
              _context.next = 4;
              return _this.props.answer(_this.props.session.id);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.answerAndHold = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.props.onHold(_this.props.activeSessionId);

            case 2:
              _context2.next = 4;
              return _this.props.answer(_this.props.session.id);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    _this.onForward = function (forwardNumber) {
      return _this.props.onForward(_this.props.session.id, forwardNumber);
    };

    _this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null,
      hasOtherActiveCall: false
    };

    _this.onSelectMatcherName = function (option) {
      var nameMatches = _this.props.nameMatches || [];
      var selectedMatcherIndex = nameMatches.findIndex(function (match) {
        return match.id === option.id;
      });

      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }

      _this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });

      var contact = nameMatches[selectedMatcherIndex];

      if (contact) {
        _this.props.updateSessionMatchedContact(_this.props.session.id, contact);

        _this.props.getAvatarUrl(contact).then(function (avatarUrl) {
          _this.setState({
            avatarUrl: avatarUrl
          });
        });
      }
    };

    return _this;
  }

  _createClass(IncomingCallView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;

      this._updateAvatarAndMatchIndex(this.props);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.session.id !== nextProps.session.id) {
        this._updateAvatarAndMatchIndex(nextProps);
      }

      this.setState({
        hasOtherActiveCall: !!nextProps.activeSessionId
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "_updateAvatarAndMatchIndex",
    value: function _updateAvatarAndMatchIndex(props) {
      var _this2 = this;

      var selectedMatcherIndex = 0;
      var contact = props.session.contactMatch;

      if (!contact) {
        contact = props.nameMatches && props.nameMatches[0];
      } else {
        selectedMatcherIndex = props.nameMatches.findIndex(function (match) {
          return match.id === contact.id;
        });
      }

      this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });

      if (contact) {
        props.getAvatarUrl(contact).then(function (avatarUrl) {
          if (!_this2._mounted) {
            return;
          }

          _this2.setState({
            avatarUrl: avatarUrl
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          session = _this$props.session,
          showCallQueueName = _this$props.showCallQueueName;
      var active = !!session.id;

      if (!active) {
        return null;
      }

      if (session.minimized) {
        return null;
      }

      var phoneNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;
      var fallbackUserName;

      if (session.direction === _callDirections["default"].inbound && session.from === 'anonymous') {
        fallbackUserName = _i18n["default"].getString('anonymous', this.props.currentLocale);
      }

      if (!fallbackUserName) {
        fallbackUserName = _i18n["default"].getString('unknown', this.props.currentLocale);
      }

      return /*#__PURE__*/_react["default"].createElement(_IncomingCallPanel["default"], {
        currentLocale: this.props.currentLocale,
        nameMatches: this.props.nameMatches,
        fallBackName: fallbackUserName,
        callQueueName: showCallQueueName ? session.callQueueName : null,
        phoneNumber: phoneNumber,
        answer: this.answer,
        reject: this.reject,
        replyWithMessage: this.replyWithMessage,
        toVoiceMail: this.toVoiceMail,
        formatPhone: this.props.formatPhone,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        selectedMatcherIndex: this.state.selectedMatcherIndex,
        onSelectMatcherName: this.onSelectMatcherName,
        avatarUrl: this.state.avatarUrl,
        onBackButtonClick: this.toggleMinimized,
        forwardingNumbers: this.props.forwardingNumbers,
        onForward: this.onForward,
        brand: this.props.brand,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
        hasOtherActiveCall: this.state.hasOtherActiveCall,
        answerAndEnd: this.answerAndEnd,
        answerAndHold: this.answerAndHold,
        sessionId: this.props.session.id,
        sourceIcons: this.props.sourceIcons,
        searchContact: this.props.searchContact,
        searchContactList: this.props.searchContactList,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer
      }, this.props.children);
    }
  }]);

  return IncomingCallView;
}(_react.Component);

exports.IncomingCallView = IncomingCallView;
IncomingCallView.propTypes = {
  session: _propTypes["default"].shape({
    id: _propTypes["default"].string,
    direction: _propTypes["default"].string,
    startTime: _propTypes["default"].number,
    isOnMute: _propTypes["default"].bool,
    isOnHold: _propTypes["default"].bool,
    isOnRecord: _propTypes["default"].bool,
    to: _propTypes["default"].string,
    from: _propTypes["default"].string,
    contactMatch: _propTypes["default"].object,
    minimized: _propTypes["default"].bool,
    callQueueName: _propTypes["default"].any
  }).isRequired,
  showCallQueueName: _propTypes["default"].any,
  currentLocale: _propTypes["default"].string.isRequired,
  toggleMinimized: _propTypes["default"].func.isRequired,
  answer: _propTypes["default"].func.isRequired,
  reject: _propTypes["default"].func.isRequired,
  onForward: _propTypes["default"].func.isRequired,
  toVoiceMail: _propTypes["default"].func.isRequired,
  replyWithMessage: _propTypes["default"].func.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  nameMatches: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  forwardingNumbers: _propTypes["default"].array.isRequired,
  updateSessionMatchedContact: _propTypes["default"].func.isRequired,
  showContactDisplayPlaceholder: _propTypes["default"].bool.isRequired,
  brand: _propTypes["default"].string.isRequired,
  activeSessionId: _propTypes["default"].string,
  sourceIcons: _propTypes["default"].object,
  hangup: _propTypes["default"].func.isRequired,
  onHold: _propTypes["default"].func.isRequired,
  searchContactList: _propTypes["default"].array.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func
};
IncomingCallView.defaultProps = {
  children: undefined,
  activeSessionId: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showCallQueueName: null
};
//# sourceMappingURL=IncomingCallView.js.map
