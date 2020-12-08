"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactList = exports.FILTER_THRESHOLD = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _debounceThrottle = require("../../lib/debounce-throttle");

var _contactHelper = require("../../lib/contactHelper");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var FILTER_THRESHOLD = 500;
exports.FILTER_THRESHOLD = FILTER_THRESHOLD;
var ContactList = (_dec = (0, _di.Module)({
  name: 'ContactList',
  deps: ['Auth', 'ContactSources']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.checkSourcesUpdated()];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.filteredContacts];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ContactList, _RcModuleV);

  var _super = _createSuper(ContactList);

  function ContactList(deps) {
    var _this;

    _classCallCheck(this, ContactList);

    _this = _super.call(this, {
      deps: deps
    });
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = 0;
    _this._currentFilterCriteria = null;
    _this._nextFilterCriteria = null;

    _initializerDefineProperty(_this, "sourceFilter", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchFilter", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filterStamp", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isFiltering", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredContacts", _descriptor5, _assertThisInitialized(_this));

    _this._debouncedFilterContactSources = (0, _debounceThrottle.debounce)({
      fn: _this._filterContactSources,
      threshold: FILTER_THRESHOLD
    });
    return _this;
  }

  _createClass(ContactList, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(ContactList.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this.allSourcesReady();
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(ContactList.prototype), "_shouldReset", this).call(this) || this.ready && (this._deps.auth.notLoggedIn || !this.allSourcesReady());
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

      var _iterator = _createForOfIteratorHelper(this._deps.contactSources),
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

      if (this._sourcesLastStatus.size !== this._deps.contactSources.length) {
        updated = true;

        this._sourcesLastStatus.clear();
      }

      var _iterator2 = _createForOfIteratorHelper(this._deps.contactSources),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var source = _step2.value;

          var lastStatus = this._sourcesLastStatus.get(source.sourceName);

          if (!lastStatus || lastStatus.sourceReady !== source.sourceReady || lastStatus.contacts !== source.contacts) {
            updated = true;

            this._sourcesLastStatus.set(source.sourceName, {
              sourceReady: source.sourceReady,
              contacts: source.contacts
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
      this.sourceFilter = sourceFilter;
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
      this._currentFilterCriteria = null;
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
      this.filteredContacts = [];
    }
  }, {
    key: "_appendFilteredContacts",
    value: function _appendFilteredContacts(contacts) {
      this.filteredContacts = this.filteredContacts.concat(contacts);
    }
  }, {
    key: "_filterContactSources",
    value: function () {
      var _filterContactSources2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(criteria) {
        var _this3 = this;

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
                sources = this._deps.contactSources.filter(function (source) {
                  return source.sourceReady && typeof source.filterContacts === 'function' && (source.sourceName === criteria.sourceFilter || _contactHelper.AllContactSourceName === criteria.sourceFilter);
                });
                _context.next = 9;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.filterContacts(criteria.searchFilter));
                  return promise.then(function (items) {
                    if (!criteria.filterStamp || criteria.filterStamp === _this3.filterStamp) {
                      _this3._appendFilteredContacts(items);
                    }
                  })["catch"](function (error) {
                    console.error("[ContactList > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                  });
                }));

              case 9:
                this._currentFilterCriteria = null;

                this._setIsFiltering(false);

                if (this._nextFilterCriteria) {
                  next = this._nextFilterCriteria;
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
            source,
            result,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                useCache = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
                source = this._deps.contactSources.find(function (x) {
                  return x.sourceReady && typeof x.getPresence === 'function' && x.sourceName === (contact && contact.type);
                });

                if (!source) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 5;
                return source.getPresence(contact, useCache);

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 7:
                return _context3.abrupt("return", null);

              case 8:
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
    key: "sourceNames",
    get: function get() {
      var names = [_contactHelper.AllContactSourceName];

      var _iterator3 = _createForOfIteratorHelper(this._deps.contactSources),
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
      return (0, _contactHelper.groupByFirstLetterOfName)((0, _contactHelper.sortContactItemsByName)((0, _contactHelper.uniqueContactItems)(this.filteredContacts)));
    }
  }]);

  return ContactList;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceFilter", [_core.state], {
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
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIsFiltering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIsFiltering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_appendFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_appendFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "applyFilters", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "applyFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contactGroups", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "contactGroups"), _class2.prototype)), _class2)) || _class);
exports.ContactList = ContactList;
//# sourceMappingURL=ContactList.js.map
