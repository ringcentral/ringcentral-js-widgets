"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _ramda = require("ramda");
var _core = require("@ringcentral-integration/core");
var _phoneSources = require("../../enums/phoneSources");
var _phoneTypes = require("../../enums/phoneTypes");
var _batchApiHelper = require("../../lib/batchApiHelper");
var _contactHelper = require("../../lib/contactHelper");
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _phoneTypeHelper = require("../../lib/phoneTypeHelper");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
            contactStatus: item.status
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
