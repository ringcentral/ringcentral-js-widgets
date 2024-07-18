"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER_THRESHOLD = exports.ContactListUI = void 0;
require("regenerator-runtime/runtime");
var _contactHelper = require("@ringcentral-integration/commons/lib/contactHelper");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
var FILTER_THRESHOLD = 500;
exports.FILTER_THRESHOLD = FILTER_THRESHOLD;
var ContactListUI = (_dec = (0, _di.Module)({
  name: 'ContactListUI',
  deps: ['Auth', 'Locale', 'ExtensionInfo', 'Contacts', {
    dep: 'ContactDetailsUI',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.filteredContactsList].concat(_toConsumableArray(Object.values(that.contactSources).map(function (source) {
    return source.contacts;
  })));
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.checkSourcesUpdated()];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.filteredContacts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ContactListUI, _RcUIModuleV);
  var _super = _createSuper(ContactListUI);
  function ContactListUI(deps) {
    var _this;
    _classCallCheck(this, ContactListUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = 0;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    _this._currentFilterCriteria = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    _this._nextFilterCriteria = null;
    _initializerDefineProperty(_this, "sourceFilter", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "searchFilter", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "filterStamp", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isFiltering", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "filteredContactsList", _descriptor5, _assertThisInitialized(_this));
    _this._debouncedFilterContactSources = (0, _debounceThrottle.debounce)({
      fn: _this._filterContactSources,
      threshold: FILTER_THRESHOLD
    });
    return _this;
  }
  _createClass(ContactListUI, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(ContactListUI.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this.allSourcesReady();
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(ContactListUI.prototype), "_shouldReset", this).call(this) || this.ready && (this._deps.auth.notLoggedIn || !this.allSourcesReady());
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this.checkSourcesUpdated();
      (0, _core.watch)(this, function () {
        return _this2.checkSourcesUpdated();
      }, function () {
        if (_this2.ready) {
          _this2.applyFilters();
        }
      });
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      this.applyFilters();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._resetFilters();
      this._clearFilteredContacts();
      if (this._debouncedFilterContactSources) {
        this._debouncedFilterContactSources.cancel();
      }
    }
  }, {
    key: "allSourcesReady",
    value: function allSourcesReady() {
      var ready = true;
      var _iterator = _createForOfIteratorHelper(this.contactSources),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var source = _step.value;
          if (!source.ready) {
            ready = false;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return ready;
    }
  }, {
    key: "checkSourcesUpdated",
    value: function checkSourcesUpdated() {
      var updated = false;
      if (this._sourcesLastStatus.size !== this.contactSources.length) {
        updated = true;
        this._sourcesLastStatus.clear();
      }
      var _iterator2 = _createForOfIteratorHelper(this.contactSources),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var source = _step2.value;
          var lastStatus = this._sourcesLastStatus.get(source.sourceName);
          if (!lastStatus || lastStatus.sourceReady !== source.sourceReady || lastStatus.rawContacts !== source.rawContacts) {
            updated = true;
            this._sourcesLastStatus.set(source.sourceName, {
              sourceReady: source.sourceReady,
              contacts: source.contacts,
              rawContacts: source.rawContacts
            });
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }
      return this._sourcesUpdatedAt;
    }
  }, {
    key: "_updateFilters",
    value: function _updateFilters(_ref) {
      var sourceFilter = _ref.sourceFilter,
        searchFilter = _ref.searchFilter;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.sourceFilter = sourceFilter;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.searchFilter = searchFilter;
      this.filterStamp = Math.random();
    }
  }, {
    key: "_resetFilters",
    value: function _resetFilters() {
      this.sourceFilter = _contactHelper.AllContactSourceName;
      this.searchFilter = '';
      this.filterStamp = 0;
      this.isFiltering = false;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
      this._currentFilterCriteria = null;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
      this._nextFilterCriteria = null;
    }
  }, {
    key: "_setIsFiltering",
    value: function _setIsFiltering(isFiltering) {
      this.isFiltering = isFiltering;
    }
  }, {
    key: "_clearFilteredContacts",
    value: function _clearFilteredContacts() {
      this.filteredContactsList = [];
    }
  }, {
    key: "_appendFilteredContacts",
    value: function _appendFilteredContacts(contacts, sourceName) {
      var _this3 = this;
      if (contacts.length > 0) {
        contacts.forEach(function (contact) {
          _this3.filteredContactsList.push([sourceName, contact.id]);
        });
      }
    }
  }, {
    key: "_filterContactSources",
    value: function () {
      var _filterContactSources2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(criteria) {
        var _this4 = this;
        var sources, next;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._currentFilterCriteria) {
                  _context.next = 3;
                  break;
                }
                this._nextFilterCriteria = criteria;
                return _context.abrupt("return");
              case 3:
                this._setIsFiltering(true);
                this._clearFilteredContacts();
                this._currentFilterCriteria = criteria;
                sources = this.contactSources.filter(function (source) {
                  return source.sourceReady && typeof source.filterContacts === 'function' && (source.sourceName === criteria.sourceFilter || _contactHelper.AllContactSourceName === criteria.sourceFilter);
                });
                _context.next = 9;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  source.filterContacts(criteria.searchFilter));
                  return promise.then(function (items) {
                    if (!criteria.filterStamp || criteria.filterStamp === _this4.filterStamp) {
                      _this4._appendFilteredContacts(items, source.sourceName);
                    }
                  })["catch"](function (error) {
                    console.error("[ContactListUI > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                  });
                }));
              case 9:
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
                this._currentFilterCriteria = null;
                this._setIsFiltering(false);
                if (this._nextFilterCriteria) {
                  next = this._nextFilterCriteria; // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
                  this._nextFilterCriteria = null;
                  this._filterContactSources(next);
                }
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _filterContactSources(_x) {
        return _filterContactSources2.apply(this, arguments);
      }
      return _filterContactSources;
    }()
  }, {
    key: "applyFilters",
    value: function () {
      var _applyFilters = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref2,
          _ref2$sourceFilter,
          sourceFilter,
          _ref2$searchFilter,
          searchFilter,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref2$sourceFilter = _ref2.sourceFilter, sourceFilter = _ref2$sourceFilter === void 0 ? this.sourceFilter : _ref2$sourceFilter, _ref2$searchFilter = _ref2.searchFilter, searchFilter = _ref2$searchFilter === void 0 ? this.searchFilter : _ref2$searchFilter;
                this._updateFilters({
                  sourceFilter: sourceFilter,
                  searchFilter: searchFilter
                });
                this._debouncedFilterContactSources({
                  sourceFilter: sourceFilter,
                  searchFilter: searchFilter,
                  filterStamp: this.filterStamp
                });
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function applyFilters() {
        return _applyFilters.apply(this, arguments);
      }
      return applyFilters;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(contact) {
        var useCache,
          presence,
          _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                useCache = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
                _context3.next = 3;
                return this._deps.contacts.getPresence(contact, useCache);
              case 3:
                presence = _context3.sent;
                return _context3.abrupt("return", presence);
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getPresence(_x2) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
      var bottomNotice = _ref3.bottomNotice,
        bottomNoticeHeight = _ref3.bottomNoticeHeight;
      return {
        currentLocale: this._deps.locale.currentLocale,
        contactSourceNames: this.sourceNames,
        contactGroups: this.contactGroups,
        searchSource: this.sourceFilter,
        searchString: this.searchFilter,
        isSearching: this.isFiltering,
        showSpinner: !(this._deps.locale.ready && this.ready),
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        bottomNotice: bottomNotice,
        bottomNoticeHeight: bottomNoticeHeight
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this5 = this;
      var _onVisitPage = _ref4.onVisitPage,
        onRefresh = _ref4.onRefresh,
        onItemSelect = _ref4.onItemSelect;
      return {
        getAvatarUrl: function getAvatarUrl() {
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
          return null;
        },
        getPresence: function getPresence(contact) {
          return _this5.getPresence(contact);
        },
        onItemSelect: onItemSelect || ( /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref5) {
            var type, id;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    type = _ref5.type, id = _ref5.id;
                    if (_this5._deps.contactDetailsUI) {
                      _this5._deps.contactDetailsUI.showContactDetails({
                        type: type,
                        id: id
                      });
                    }
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));
          return function (_x3) {
            return _ref6.apply(this, arguments);
          };
        }()),
        onSearchContact: function onSearchContact(_ref7) {
          var searchSource = _ref7.searchSource,
            searchString = _ref7.searchString;
          _this5.applyFilters({
            sourceFilter: searchSource,
            searchFilter: searchString
          });
        },
        onVisitPage: function onVisitPage() {
          if (typeof _onVisitPage === 'function') {
            _onVisitPage();
          }
          // fire filtering contacts if not yet
          if (!_this5.filterStamp) {
            _this5.applyFilters();
          }
        },
        onRefresh: onRefresh
      };
    }
  }, {
    key: "contactSources",
    get: function get() {
      return Array.from(this._deps.contacts.contactSources.values());
    }
  }, {
    key: "filteredContacts",
    get: function get() {
      var contactsMap = {};
      this.contactSources.forEach(function (source) {
        contactsMap[source.sourceName] = {};
        source.contacts.forEach(function (contact) {
          contactsMap[source.sourceName][contact.id] = contact;
        });
      });
      var filteredContacts = [];
      this.filteredContactsList.forEach(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
          sourceName = _ref9[0],
          id = _ref9[1];
        var contact = contactsMap[sourceName][id];
        if (contact) {
          filteredContacts.push(contact);
        }
      });
      return filteredContacts;
    }
  }, {
    key: "sourceNames",
    get: function get() {
      var names = [_contactHelper.AllContactSourceName];
      var _iterator3 = _createForOfIteratorHelper(this.contactSources),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var source = _step3.value;
          if (source.sourceReady) {
            names.push(source.sourceName);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return names;
    }
  }, {
    key: "contactGroups",
    get: function get() {
      var _groupByFirstLetterOf;
      return (_groupByFirstLetterOf = (0, _contactHelper.groupByFirstLetterOfName)((0, _contactHelper.sortContactItemsByName)((0, _contactHelper.uniqueContactItems)(this.filteredContacts)))) !== null && _groupByFirstLetterOf !== void 0 ? _groupByFirstLetterOf : [];
    }
  }]);
  return ContactListUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactHelper.AllContactSourceName;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filterStamp", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isFiltering", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "filteredContactsList", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIsFiltering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIsFiltering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_appendFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_appendFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "applyFilters", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "applyFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contactGroups", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "contactGroups"), _class2.prototype)), _class2)) || _class);
exports.ContactListUI = ContactListUI;
//# sourceMappingURL=ContactListUI.js.map
