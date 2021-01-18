"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentCalls = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _callStatus = require("./callStatus");

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));

var _phoneTypes = require("../../enums/phoneTypes");

var _RecentCallsHelper = require("./RecentCallsHelper");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var RecentCalls = (_dec = (0, _di.Module)({
  name: 'RecentCalls',
  deps: ['Client', 'Auth', 'CallHistory', {
    dep: 'RecentCallsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RecentCalls, _RcModuleV);

  var _super = _createSuper(RecentCalls);

  function RecentCalls(deps) {
    var _this;

    _classCallCheck(this, RecentCalls);

    _this = _super.call(this, {
      deps: deps
    });

    _initializerDefineProperty(_this, "calls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callStatus", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(RecentCalls, [{
    key: "initLoad",
    value: function initLoad() {
      this.callStatus = _callStatus.callStatus.loading;
    }
  }, {
    key: "loadSuccess",
    value: function loadSuccess(_ref) {
      var contact = _ref.contact,
          calls = _ref.calls,
          sessionId = _ref.sessionId;
      this.callStatus = _callStatus.callStatus.loaded;
      var contactId = String(contact && contact.id);
      this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId] = calls;
    }
  }, {
    key: "cleanUpCalls",
    value: function cleanUpCalls(_ref2) {
      var contact = _ref2.contact,
          _ref2$sessionId = _ref2.sessionId,
          sessionId = _ref2$sessionId === void 0 ? null : _ref2$sessionId;
      this.callStatus = _callStatus.callStatus.loaded;
      var contactId = String(contact && contact.id);
      var id = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;
      delete this.calls[id];
    }
  }, {
    key: "getCalls",
    value: function () {
      var _getCalls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var currentContact, _ref3$sessionId, sessionId, contactId, calls;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentContact = _ref3.currentContact, _ref3$sessionId = _ref3.sessionId, sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId;

                if (currentContact) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                contactId = String(currentContact && currentContact.id);

                if (!this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId]) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                this.initLoad();
                _context.next = 9;
                return this._getRecentCalls(currentContact, this._deps.callHistory.calls);

              case 9:
                calls = _context.sent;
                this.loadSuccess({
                  calls: calls,
                  contact: currentContact,
                  sessionId: sessionId
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCalls(_x) {
        return _getCalls.apply(this, arguments);
      }

      return getCalls;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(RecentCalls.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(RecentCalls.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
    /**
     * Searching for recent calls of specific contact.
     * @param {Object} currentContact Current contact
     * @param {Array} calls Calls in callHistory
     * @param {Number} daySpan Find calls within certain days
     * @param {Number} length Maximum length of recent calls
     * @return {Array}
     * @private
     */

  }, {
    key: "_getRecentCalls",
    value: function () {
      var _getRecentCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(currentContact) {
        var calls,
            daySpan,
            length,
            dateFrom,
            recentCalls,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                calls = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                daySpan = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 60;
                length = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 5;
                dateFrom = (0, _getDateFrom["default"])(daySpan);
                recentCalls = this._getLocalRecentCalls(currentContact, calls, dateFrom); // If we could not find enough recent calls,
                // we need to search for calls on server.

                if (!(recentCalls.length < length)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return this._fetchRemoteRecentCalls(currentContact, dateFrom.toISOString(), length);

              case 8:
                recentCalls = _context2.sent;

              case 9:
                recentCalls.sort(_RecentCallsHelper.sortByTime);
                recentCalls = (0, _RecentCallsHelper.dedup)(recentCalls);
                return _context2.abrupt("return", recentCalls.length > length ? recentCalls.slice(0, length) : recentCalls);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getRecentCalls(_x2) {
        return _getRecentCalls2.apply(this, arguments);
      }

      return _getRecentCalls;
    }()
  }, {
    key: "_getLocalRecentCalls",
    value: function _getLocalRecentCalls(_ref4, calls, dateFrom) {
      var phoneNumbers = _ref4.phoneNumbers;
      // Get all calls related to this contact
      return calls.reduce(function (acc, call) {
        if (call && call.to && call.from) {
          var matches = phoneNumbers.find((0, _RecentCallsHelper.filterPhoneNumber)(call)); // Check if calls is within certain days

          if (!!matches && new Date(call.startTime) > dateFrom) {
            return acc.concat(call);
          }
        }

        return acc;
      }, []);
    }
    /**
     * Fetch recent calls from server by given current contact.
     */

  }, {
    key: "_fetchRemoteRecentCalls",
    value: function _fetchRemoteRecentCalls(_ref5, dateFrom, length) {
      var _this2 = this;

      var phoneNumbers = _ref5.phoneNumbers;
      var params = {
        dateFrom: dateFrom,
        perPage: length,
        type: 'Voice'
      }; // CallLog API doesn't support plus sign in phoneNumber

      var recentCallsPromises = phoneNumbers.reduce(function (acc, _ref6) {
        var phoneType = _ref6.phoneType,
            phoneNumber = _ref6.phoneNumber;
        phoneNumber = phoneNumber.replace('+', '');

        if (phoneType === _phoneTypes.phoneTypes.extension) {
          var _promise = _this2._fetchCallLogList(_objectSpread(_objectSpread({}, params), {}, {
            extensionNumber: phoneNumber
          }));

          return acc.concat(_promise);
        }

        var promise = _this2._fetchCallLogList(_objectSpread(_objectSpread({}, params), {}, {
          phoneNumber: phoneNumber
        }));

        return acc.concat(promise);
      }, []);
      return (0, _concurrentExecute["default"])(recentCallsPromises, 5, 500).then(_RecentCallsHelper.flattenToRecords);
    }
  }, {
    key: "_fetchCallLogList",
    value: function _fetchCallLogList(params) {
      var _this3 = this;

      return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this3._deps.auth.loggedIn) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", {
                  records: []
                });

              case 2:
                return _context3.abrupt("return", _this3._deps.client.account().extension().callLog().list(params));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
  }, {
    key: "isCallsLoaded",
    get: function get() {
      return this.callStatus === _callStatus.callStatus.loaded;
    }
  }]);

  return RecentCalls;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "initLoad", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "initLoad"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "loadSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUpCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUpCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCalls", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getCalls"), _class2.prototype)), _class2)) || _class);
exports.RecentCalls = RecentCalls;
//# sourceMappingURL=RecentCalls.js.map
