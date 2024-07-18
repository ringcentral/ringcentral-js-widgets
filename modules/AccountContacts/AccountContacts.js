"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRESENCE_ENQUEUE_DELAY = exports.DEFAULT_PRESENCE_TTL = exports.AccountContacts = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _phoneSources = require("../../enums/phoneSources");
var _phoneTypes = require("../../enums/phoneTypes");
var _batchApiHelper = require("../../lib/batchApiHelper");
var _contactHelper = require("../../lib/contactHelper");
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _phoneTypeHelper = require("../../lib/phoneTypeHelper");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var PRESENCE_ENQUEUE_DELAY = 1 * 1000; // 1 second
exports.PRESENCE_ENQUEUE_DELAY = PRESENCE_ENQUEUE_DELAY;
var MAXIMUM_BATCH_GET_PRESENCE = 30;
var DEFAULT_PRESENCE_TTL = 10 * 60 * 1000; // 10 mins
exports.DEFAULT_PRESENCE_TTL = DEFAULT_PRESENCE_TTL;
var DEFAULT_AVATAR_TTL = 2 * 60 * 60 * 1000; // 2 hour
var DEFAULT_AVATAR_QUERY_INTERVAL = 2 * 1000; // 2 seconds
var AccountContacts = (_dec = (0, _di.Module)({
  name: 'AccountContacts',
  deps: ['Client', 'ExtensionInfo', 'AppFeatures', 'AccountInfo', {
    dep: 'CompanyContacts'
  }, {
    dep: 'AccountContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.companyContacts.filteredContacts, that.profileImages, that.presences, that._deps.accountContactsOptions];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.companyContacts.filteredContacts];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.contacts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AccountContacts, _RcModuleV);
  var _super = _createSuper(AccountContacts);
  function AccountContacts(deps) {
    var _this;
    _classCallCheck(this, AccountContacts);
    _this = _super.call(this, {
      deps: deps
    });
    _this._getPresenceContexts = new Map();
    _this._enqueueTimeoutId = void 0;
    _initializerDefineProperty(_this, "profileImages", _descriptor, _assertThisInitialized(_this));
    _this.presences = {};
    return _this;
  }
  _createClass(AccountContacts, [{
    key: "fetchImageSuccess",
    value: function fetchImageSuccess(_ref) {
      var _this2 = this;
      var imageId = _ref.imageId,
        imageUrl = _ref.imageUrl,
        ttl = _ref.ttl;
      var data = {};
      // TODO: refactor without side effect.
      Object.keys(this.profileImages).forEach(function (key) {
        if (Date.now() - _this2.profileImages[key].timestamp < ttl) {
          data[key] = _this2.profileImages[key];
        } else {
          URL.revokeObjectURL(_this2.profileImages[key].imageUrl);
        }
      });
      this.profileImages = data;
      this.profileImages[imageId] = {
        imageUrl: imageUrl,
        timestamp: Date.now()
      };
    }
    /**
     * 1. presence should not store in redux, which will make the CTI rerender once it has some changes and dispatch some action
     * 2. make sure this.presences's changes is immutable
     * 3. If the Record feature is stable, then we should use the below implementation to make sure change is immutable
     * ```
     *  data = {
     *      ...data,
     *      [key]: this.presences[key]
     *  }
     * ```
     */
  }, {
    key: "batchFetchPresenceSuccess",
    value: function batchFetchPresenceSuccess(_ref2) {
      var _this3 = this;
      var _ref2$presenceMap = _ref2.presenceMap,
        presenceMap = _ref2$presenceMap === void 0 ? {} : _ref2$presenceMap,
        ttl = _ref2.ttl;
      var data = {};
      var isUpdated = false;
      // TODO: refactor without side effect.
      Object.keys(this.presences).forEach(function (key) {
        var isExpired = Date.now() - _this3.presences[key].timestamp >= ttl;
        if (!isExpired) {
          // new key: use new reference: immutable
          data[key] = _this3.presences[key];
        } else {
          isUpdated = true;
        }
      });
      Object.keys(presenceMap).forEach(function (key) {
        isUpdated = true;
        data[key] = {
          presence: presenceMap[key],
          timestamp: Date.now()
        };
      });
      // need to make sure this.presences is immutable
      this.presences = isUpdated ? data : this.presences;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this4 = this;
      // TODO: refactor without side effect.
      Object.keys(this.profileImages).forEach(function (key) {
        URL.revokeObjectURL(_this4.profileImages[key].imageUrl);
      });
      this.profileImages = {};
      this.presences = {};
      clearTimeout(this._enqueueTimeoutId);
      this._getPresenceContexts.clear();
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.companyContacts.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._deps.companyContacts.ready && this.ready;
    } // interface of ContactSource
  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contact) {
        var useCache,
          imageId,
          image,
          imageUrl,
          response,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", null);
              case 3:
                imageId = contact.id;
                if (!(useCache && this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)) {
                  _context.next = 7;
                  break;
                }
                image = this.profileImages[imageId].imageUrl;
                return _context.abrupt("return", image);
              case 7:
                imageUrl = null;
                _context.prev = 8;
                _context.next = 11;
                return this._deps.client.account(contact.account.id).extension(contact.id).profileImage('195x195').get();
              case 11:
                response = _context.sent;
                _context.t0 = URL;
                _context.next = 15;
                return response.blob();
              case 15:
                _context.t1 = _context.sent;
                imageUrl = _context.t0.createObjectURL.call(_context.t0, _context.t1);
                this.fetchImageSuccess({
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context.next = 23;
                break;
              case 20:
                _context.prev = 20;
                _context.t2 = _context["catch"](8);
                console.error(_context.t2);
              case 23:
                return _context.abrupt("return", imageUrl);
              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 20]]);
      }));
      function getProfileImage(_x) {
        return _getProfileImage.apply(this, arguments);
      }
      return getProfileImage;
    }() // interface of ContactSource
  }, {
    key: "getPresence",
    value: function getPresence(contact) {
      var _this5 = this;
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new Promise(function (resolve) {
        var _contact$account;
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }
        var extensionId = contact.id;
        if (useCache && _this5.presences[extensionId] && Date.now() - _this5.presences[extensionId].timestamp < _this5._presenceTtl) {
          var presence = _this5.presences[extensionId].presence;
          resolve(presence);
          return;
        }
        var accountId = (_contact$account = contact.account) === null || _contact$account === void 0 ? void 0 : _contact$account.id;
        if (!accountId) {
          resolve(null);
          return;
        }
        var contextKey = "".concat(accountId, "-").concat(extensionId);
        var context = _this5._getPresenceContexts.get(contextKey);
        if (context) {
          context.callbacks.push(resolve);
        } else {
          _this5._getPresenceContexts.set(contextKey, {
            accountId: accountId,
            extensionId: extensionId,
            callbacks: [resolve]
          });
        }
        var startProcessing = function startProcessing() {
          var contexts = Array.from(_this5._getPresenceContexts.values());
          _this5._getPresenceContexts.clear();
          _this5._fetchPresences(contexts);
        };
        clearTimeout(_this5._enqueueTimeoutId);
        if (_this5._getPresenceContexts.size === MAXIMUM_BATCH_GET_PRESENCE) {
          startProcessing();
        } else {
          _this5._enqueueTimeoutId = setTimeout(startProcessing, PRESENCE_ENQUEUE_DELAY);
        }
      });
    } // interface of ContactSource
  }, {
    key: "findContact",
    value: function findContact(contactId) {
      return this.contacts.find(function (x) {
        return x.id === contactId;
      });
    } // interface of ContactSource
  }, {
    key: "filterContacts",
    value: function filterContacts(searchFilter) {
      return (0, _contactHelper.getFilterContacts)(this.isCDCEnabled ? this.directoryContacts.cdc : this.directoryContacts.all, searchFilter);
    } // interface of ContactSource
  }, {
    key: "searchForPhoneNumbers",
    value: function searchForPhoneNumbers(searchString) {
      var _this$_deps$extension = this._deps.extensionInfo,
        isMultipleSiteEnabled = _this$_deps$extension.isMultipleSiteEnabled,
        site = _this$_deps$extension.site;
      return (0, _contactHelper.getSearchForPhoneNumbers)({
        contacts: this.isCDCEnabled ? this.directoryContacts.cdc : this.directoryContacts.all,
        searchString: searchString,
        entityType: _phoneSources.phoneSources.rcContact,
        options: {
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          siteCode: site === null || site === void 0 ? void 0 : site.code
        }
      });
    } // interface of ContactSource
  }, {
    key: "matchContactsByPhoneNumber",
    value: function matchContactsByPhoneNumber(phoneNumber) {
      var _this$_deps$extension2 = this._deps.extensionInfo,
        isMultipleSiteEnabled = _this$_deps$extension2.isMultipleSiteEnabled,
        site = _this$_deps$extension2.site;
      var shouldMatchExtension = (0, _contactHelper.isAnExtension)(phoneNumber, this._deps.accountInfo.maxExtensionNumberLength);
      return (0, _contactHelper.getMatchContactsByPhoneNumber)({
        contacts: [].concat(_toConsumableArray(this.contacts), _toConsumableArray(this._deps.companyContacts.ivrContacts)),
        phoneNumber: phoneNumber,
        entityType: _phoneSources.phoneSources.rcContact,
        findPhoneNumber: (0, _contactHelper.getFindPhoneNumber)({
          phoneNumber: phoneNumber,
          shouldMatchExtension: shouldMatchExtension,
          options: {
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            siteCode: site === null || site === void 0 ? void 0 : site.code,
            maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength
          }
        })
      });
    }
  }, {
    key: "_fetchPresences",
    value: function () {
      var _fetchPresences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contexts) {
        var _this6 = this;
        var responses, presenceMap;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._batchFetchPresences(contexts);
              case 2:
                responses = _context2.sent;
                // response
                presenceMap = (0, _ramda.reduce)(function (acc, _ref3) {
                  var extensionId = _ref3.extensionId;
                  var response = responses[extensionId];
                  if (response) {
                    var dndStatus = response.dndStatus,
                      presenceStatus = response.presenceStatus,
                      telephonyStatus = response.telephonyStatus,
                      userStatus = response.userStatus,
                      meetingStatus = response.meetingStatus;
                    acc[extensionId] = {
                      dndStatus: dndStatus,
                      presenceStatus: presenceStatus,
                      telephonyStatus: telephonyStatus,
                      userStatus: userStatus,
                      meetingStatus: meetingStatus
                    };
                  } else if (_this6.presences[extensionId]) {
                    // Should keep the previous state when fail to fetch
                    acc[extensionId] = _this6.presences[extensionId].presence;
                  }
                  return acc;
                }, {}, contexts); // update state
                this.batchFetchPresenceSuccess({
                  presenceMap: presenceMap,
                  ttl: this._presenceTtl
                });
                // callback
                contexts.forEach(function (_ref4) {
                  var extensionId = _ref4.extensionId,
                    callbacks = _ref4.callbacks;
                  var presence = presenceMap[extensionId];
                  var _iterator = _createForOfIteratorHelper(callbacks),
                    _step;
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var resolve = _step.value;
                      try {
                        resolve(presence);
                      } catch (ex) {
                        console.error(ex);
                      }
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                });
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _fetchPresences(_x2) {
        return _fetchPresences2.apply(this, arguments);
      }
      return _fetchPresences;
    }()
  }, {
    key: "_batchFetchPresences",
    value: function () {
      var _batchFetchPresences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(contexts) {
        var _this7 = this;
        var presenceSet, accountExtensionMap, batchResponses;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                presenceSet = {};
                _context5.prev = 1;
                accountExtensionMap = (0, _ramda.reduce)(function (acc, _ref5) {
                  var _acc$accountId;
                  var accountId = _ref5.accountId,
                    extensionId = _ref5.extensionId;
                  var extensionIds = (_acc$accountId = acc[accountId]) !== null && _acc$accountId !== void 0 ? _acc$accountId : [];
                  if (!extensionIds.includes(extensionId)) {
                    extensionIds.push(extensionId);
                  }
                  acc[accountId] = extensionIds;
                  return acc;
                }, {}, contexts);
                _context5.next = 5;
                return Promise.all((0, _ramda.map)( /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(accountId) {
                    var extensionIds, extensionId;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(accountExtensionMap[accountId].length > 1)) {
                              _context4.next = 10;
                              break;
                            }
                            extensionIds = (0, _ramda.join)(',', accountExtensionMap[accountId]); // extract json data now so the data appears in the same format
                            // as single requests
                            _context4.t0 = Promise;
                            _context4.t1 = _ramda.map;
                            _context4.t2 = /*#__PURE__*/function () {
                              var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resp) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        return _context3.abrupt("return", resp.json());
                                      case 1:
                                      case "end":
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3);
                              }));
                              return function (_x5) {
                                return _ref7.apply(this, arguments);
                              };
                            }();
                            _context4.next = 7;
                            return (0, _batchApiHelper.batchGetApi)({
                              platform: _this7._deps.client.service.platform(),
                              url: "/restapi/v1.0/account/".concat(accountId, "/extension/").concat(extensionIds, "/presence")
                            });
                          case 7:
                            _context4.t3 = _context4.sent;
                            _context4.t4 = (0, _context4.t1)(_context4.t2, _context4.t3);
                            return _context4.abrupt("return", _context4.t0.all.call(_context4.t0, _context4.t4));
                          case 10:
                            // wrap single request response data in array to keep the same
                            // format as batch requests
                            extensionId = accountExtensionMap[accountId][0];
                            _context4.next = 13;
                            return _this7._deps.client.account(accountId).extension(extensionId).presence().get();
                          case 13:
                            _context4.t5 = _context4.sent;
                            return _context4.abrupt("return", [_context4.t5]);
                          case 15:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return function (_x4) {
                    return _ref6.apply(this, arguments);
                  };
                }(), (0, _ramda.keys)(accountExtensionMap)));
              case 5:
                batchResponses = _context5.sent;
                // treat all data as batch since the data is normalized
                (0, _ramda.forEach)(function (batch) {
                  return (0, _ramda.forEach)(function (data) {
                    if (data.errorCode) {
                      console.warn(data);
                      return;
                    }
                    var _data = data;
                    var _ref8 = _data.extension,
                      id = _ref8.id;
                    presenceSet[id] = _data;
                  }, batch);
                }, batchResponses);
                _context5.next = 12;
                break;
              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);
              case 12:
                return _context5.abrupt("return", presenceSet);
              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }));
      function _batchFetchPresences(_x3) {
        return _batchFetchPresences2.apply(this, arguments);
      }
      return _batchFetchPresences;
    }() // interface of ContactSource
  }, {
    key: "_avatarTtl",
    get: function get() {
      var _this$_deps$accountCo, _this$_deps$accountCo2;
      return (_this$_deps$accountCo = (_this$_deps$accountCo2 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo2 === void 0 ? void 0 : _this$_deps$accountCo2.avatarTtl) !== null && _this$_deps$accountCo !== void 0 ? _this$_deps$accountCo : DEFAULT_AVATAR_TTL;
    }
  }, {
    key: "_presenceTtl",
    get: function get() {
      var _this$_deps$accountCo3, _this$_deps$accountCo4;
      return (_this$_deps$accountCo3 = (_this$_deps$accountCo4 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo4 === void 0 ? void 0 : _this$_deps$accountCo4.presenceTtl) !== null && _this$_deps$accountCo3 !== void 0 ? _this$_deps$accountCo3 : DEFAULT_PRESENCE_TTL;
    }
  }, {
    key: "_avatarQueryInterval",
    get: function get() {
      var _this$_deps$accountCo5, _this$_deps$accountCo6;
      return (_this$_deps$accountCo5 = (_this$_deps$accountCo6 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo6 === void 0 ? void 0 : _this$_deps$accountCo6.avatarQueryInterval) !== null && _this$_deps$accountCo5 !== void 0 ? _this$_deps$accountCo5 : DEFAULT_AVATAR_QUERY_INTERVAL;
    }
  }, {
    key: "isCDCEnabled",
    get: function get() {
      var _this$_deps$appFeatur;
      // TODO: default to true when cdc feature is ready for production.
      return (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isCDCEnabled;
    }
  }, {
    key: "sourceName",
    get: function get() {
      return 'company';
    } // interface of ContactSource
  }, {
    key: "directoryContacts",
    get: function get() {
      var _this8 = this;
      return (0, _ramda.reduce)(function (result, item) {
        if (!(0, _isBlank.isBlank)(item.extensionNumber)) {
          var id = "".concat(item.id);
          var contact = _objectSpread(_objectSpread({}, item), {}, {
            type: _this8.sourceName,
            id: id,
            name: item.name ? item.name : "".concat(item.firstName || '', " ").concat(item.lastName || ''),
            emails: [item.email],
            extensionNumber: item.extensionNumber,
            hasProfileImage: !!item.profileImage,
            phoneNumbers: [{
              phoneNumber: item.extensionNumber,
              phoneType: _phoneTypes.phoneTypes.extension
            }],
            profileImageUrl: _this8.profileImages[id] && _this8.profileImages[id].imageUrl,
            presence: _this8.presences[id] && _this8.presences[id].presence,
            contactStatus: item.status,
            isCallQueueNumber: item.type === 'Department'
          });
          if (item.phoneNumbers && item.phoneNumbers.length > 0) {
            item.phoneNumbers.forEach(function (phone) {
              (0, _phoneTypeHelper.isSupportedPhoneNumber)(phone) && contact.phoneNumbers.push(_objectSpread(_objectSpread({}, phone), {}, {
                phoneType: (0, _phoneTypeHelper.convertUsageTypeToPhoneType)(phone === null || phone === void 0 ? void 0 : phone.usageType)
              }));
            });
          }
          result.all.push(contact);
          if (!contact.hidden) {
            var _contact$phoneNumbers;
            var cdcContact = _objectSpread(_objectSpread({}, contact), {}, {
              phoneNumbers: (0, _ramda.filter)(function (number) {
                return !number.hidden;
              }, (_contact$phoneNumbers = contact.phoneNumbers) !== null && _contact$phoneNumbers !== void 0 ? _contact$phoneNumbers : [])
            });
            result.cdc.push(cdcContact);
          }
        }
        return result;
      }, {
        all: [],
        cdc: []
      }, this._deps.companyContacts.filteredContacts);
    } // interface of ContactSource
  }, {
    key: "contacts",
    get: function get() {
      return this.directoryContacts.all;
    } // interface of ContactSource
  }, {
    key: "rawContacts",
    get: function get() {
      return this._deps.companyContacts.filteredContacts;
    }
  }, {
    key: "rcCompanyMapping",
    get: function get() {
      var rcCompanyMapping = {};
      this.contacts.forEach(function (item) {
        rcCompanyMapping[item.id] = item;
      });
      return rcCompanyMapping;
    } // interface of ContactSource
  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);
  return AccountContacts;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "profileImages", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "fetchImageSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchImageSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onReset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "onReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "directoryContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "directoryContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rawContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "rawContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcCompanyMapping", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "rcCompanyMapping"), _class2.prototype)), _class2)) || _class);
exports.AccountContacts = AccountContacts;
//# sourceMappingURL=AccountContacts.js.map
