"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.date.now");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _dec, _dec2, _dec3, _class, _class2;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Contacts = (_dec = (0, _di.Module)({
  name: 'Contacts',
  deps: ['Auth', {
    dep: 'ContactSources',
    optional: true
  }, {
    dep: 'ContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._contactSources.size, that.checkSourceUpdated()];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.checkSourceUpdated()];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Contacts, _RcModuleV);

  var _super = _createSuper(Contacts);

  function Contacts(deps) {
    var _this$_deps$contactSo;

    var _this;

    _classCallCheck(this, Contacts);

    _this = _super.call(this, {
      deps: deps
    });
    _this._contactSources = new Map();
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = Date.now();

    var _iterator = _createForOfIteratorHelper((_this$_deps$contactSo = _this._deps.contactSources) !== null && _this$_deps$contactSo !== void 0 ? _this$_deps$contactSo : []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var source = _step.value;

        _this.addSource(source);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return _this;
  }

  _createClass(Contacts, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this.sourceModuleReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._deps.auth.loggedIn || !this.sourceModuleReady) && this.ready;
    }
  }, {
    key: "addSource",
    value: function addSource(source) {
      if (!source.sourceName) {
        throw new Error('[Contacts > ContactSource > sourceName] is required');
      }

      if (this._contactSources.has(source.sourceName)) {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > sourceName] already exists"));
      }

      if (source.getPresence && typeof source.getPresence !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getPresence] must be a function"));
      }

      if (source.getProfileImage && typeof source.getProfileImage !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getProfileImage] must be a function"));
      }

      if (source.findContact && typeof source.findContact !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] must be a function"));
      }

      if (source.filterContacts && typeof source.filterContacts !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] must be a function"));
      }

      if (source.searchForPhoneNumbers && typeof source.searchForPhoneNumbers !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] must be a function"));
      }

      if (source.matchContactsByPhoneNumber && typeof source.matchContactsByPhoneNumber !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] must be a function"));
      }

      this._contactSources.set(source.sourceName, source);

      this._sourcesLastStatus.set(source.sourceName, {});

      this._sourcesUpdatedAt = Date.now();
    }
  }, {
    key: "checkSourceUpdated",
    value: function checkSourceUpdated() {
      var updated = false;

      for (var _i = 0, _Array$from = Array.from(this._contactSources.keys()); _i < _Array$from.length; _i++) {
        var sourceName = _Array$from[_i];

        var source = this._contactSources.get(sourceName);

        var lastStatus = this._sourcesLastStatus.get(sourceName);

        if (lastStatus.ready !== source.sourceReady || lastStatus.data !== source.contacts) {
          updated = true;

          this._sourcesLastStatus.set(sourceName, {
            ready: source.sourceReady,
            data: source.contacts
          });
        }
      }

      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }

      return this._sourcesUpdatedAt;
    }
  }, {
    key: "findContact",
    value: function () {
      var _findContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var sourceName, contactId, contact, source;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sourceName = _ref.sourceName, contactId = _ref.contactId;
                contact = null;
                source = this._contactSources.get(sourceName);

                if (!(source && typeof source.findContact === 'function')) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return source.findContact(contactId);

              case 7:
                contact = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] ").concat(_context.t0));

              case 13:
                return _context.abrupt("return", contact);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function findContact(_x) {
        return _findContact.apply(this, arguments);
      }

      return findContact;
    }()
  }, {
    key: "filterContacts",
    value: function () {
      var _filterContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchFilter) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.filterContacts === 'function';
                });
                result = [];
                _context2.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.filterContacts(searchFilter));
                  return promise.then(function (items) {
                    if (items) {
                      result = result.concat(items);
                    }
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                  });
                }));

              case 4:
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function filterContacts(_x2) {
        return _filterContacts.apply(this, arguments);
      }

      return filterContacts;
    }()
  }, {
    key: "searchForPhoneNumbers",
    value: function () {
      var _searchForPhoneNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchString) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.searchForPhoneNumbers === 'function';
                });
                result = [];
                _context3.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.searchForPhoneNumbers(searchString));
                  return promise.then(function (items) {
                    if (items) {
                      result = result.concat(items);
                    }
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] ").concat(error));
                  });
                }));

              case 4:
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function searchForPhoneNumbers(_x3) {
        return _searchForPhoneNumbers.apply(this, arguments);
      }

      return searchForPhoneNumbers;
    }()
  }, {
    key: "matchContactsByPhoneNumber",
    value: function () {
      var _matchContactsByPhoneNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(phoneNumber) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.matchContactsByPhoneNumber === 'function';
                });
                result = [];
                _context4.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.matchContactsByPhoneNumber(phoneNumber));
                  return promise.then(function (items) {
                    if (items) {
                      result = result.concat(items);
                    }
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] ").concat(error));
                  });
                }));

              case 4:
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function matchContactsByPhoneNumber(_x4) {
        return _matchContactsByPhoneNumber.apply(this, arguments);
      }

      return matchContactsByPhoneNumber;
    }()
  }, {
    key: "matchContacts",
    value: function () {
      var _matchContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref2) {
        var _this2 = this;

        var phoneNumbers, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                phoneNumbers = _ref2.phoneNumbers;
                result = {};
                _context5.next = 4;
                return Promise.all(phoneNumbers.map(function (phoneNumber) {
                  var promise = _this2.matchContactsByPhoneNumber(phoneNumber);

                  return promise.then(function (items) {
                    result[phoneNumber] = items;
                  });
                }));

              case 4:
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function matchContacts(_x5) {
        return _matchContacts.apply(this, arguments);
      }

      return matchContacts;
    }()
  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(contact) {
        var useCache,
            source,
            result,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                useCache = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getProfileImage)) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 5;
                return source.getProfileImage(contact, useCache);

              case 5:
                result = _context6.sent;
                return _context6.abrupt("return", result);

              case 7:
                return _context6.abrupt("return", null);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getProfileImage(_x6) {
        return _getProfileImage.apply(this, arguments);
      }

      return getProfileImage;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contact) {
        var useCache,
            source,
            result,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                useCache = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getPresence)) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 5;
                return source.getPresence(contact, useCache);

              case 5:
                result = _context7.sent;
                return _context7.abrupt("return", result);

              case 7:
                return _context7.abrupt("return", null);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getPresence(_x7) {
        return _getPresence.apply(this, arguments);
      }

      return getPresence;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var syncPromises,
            _i2,
            _Array$from2,
            sourceName,
            source,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                syncPromises = [];

                for (_i2 = 0, _Array$from2 = Array.from(this._contactSources.keys()); _i2 < _Array$from2.length; _i2++) {
                  sourceName = _Array$from2[_i2];
                  source = this._contactSources.get(sourceName);

                  if (typeof source.sync === 'function') {
                    syncPromises.push(source.sync.apply(source, _args8));
                  }
                }

                _context8.next = 4;
                return Promise.all(syncPromises);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "sourceModuleReady",
    get: function get() {
      var ready = true;

      for (var _i3 = 0, _Array$from3 = Array.from(this._contactSources.keys()); _i3 < _Array$from3.length; _i3++) {
        var sourceName = _Array$from3[_i3];

        var source = this._contactSources.get(sourceName);

        if (!source.ready) {
          ready = false;
          break;
        }
      }

      return ready;
    }
  }, {
    key: "sourceNames",
    get: function get() {
      var names = [];

      for (var _i4 = 0, _Array$from4 = Array.from(this._contactSources.keys()); _i4 < _Array$from4.length; _i4++) {
        var sourceName = _Array$from4[_i4];

        var source = this._contactSources.get(sourceName);

        if (source.sourceReady) {
          names.push(sourceName);
        }
      }

      return names;
    }
  }, {
    key: "allContacts",
    get: function get() {
      var contacts = [];

      for (var _i5 = 0, _Array$from5 = Array.from(this._contactSources.keys()); _i5 < _Array$from5.length; _i5++) {
        var sourceName = _Array$from5[_i5];

        var source = this._contactSources.get(sourceName);

        if (source.sourceReady && source.contacts) {
          contacts = contacts.concat(source.contacts);
        }
      }

      return contacts;
    }
  }]);

  return Contacts;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allContacts"), _class2.prototype)), _class2)) || _class);
exports.Contacts = Contacts;
//# sourceMappingURL=Contacts.js.map
