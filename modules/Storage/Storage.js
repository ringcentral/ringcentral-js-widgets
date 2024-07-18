"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;
require("regenerator-runtime/runtime");
var _StorageBase2 = require("../../lib/StorageBase");
var _di = require("../../lib/di");
var _Auth = require("../Auth");
var _dec, _class; // @ts-nocheck
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var dataFetcherKey = 'dataFetcherV2-storageData';
var Storage = (_dec = (0, _di.Module)({
  name: 'Storage',
  deps: ['Auth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'StorageOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_StorageBase) {
  _inherits(Storage, _StorageBase);
  var _super = _createSuper(Storage);
  function Storage(deps) {
    var _deps$storageOptions, _this$_deps$storageOp, _this$_deps$storageOp2;
    var _this;
    _classCallCheck(this, Storage);
    _this = _super.call(this, deps, {
      name: 'storage',
      StorageProvider: (_deps$storageOptions = deps.storageOptions) === null || _deps$storageOptions === void 0 ? void 0 : _deps$storageOptions.StorageProvider
    });
    _this._disableInactiveTabsWrite = void 0;
    _this._storage = void 0;
    _this._storageHandler = null;
    _this.storedData = {};
    _this._disableInactiveTabsWrite = (_this$_deps$storageOp = (_this$_deps$storageOp2 = _this._deps.storageOptions) === null || _this$_deps$storageOp2 === void 0 ? void 0 : _this$_deps$storageOp2.disableInactiveTabsWrite) !== null && _this$_deps$storageOp !== void 0 ? _this$_deps$storageOp : true;
    return _this;
  }
  _createClass(Storage, [{
    key: "onStateChange",
    value: function onStateChange() {
      if (this.ready && this.storageWritable) {
        var currentData = this.data;
        // save new data to storage when changed
        for (var key in currentData) {
          if (key !== dataFetcherKey) {
            if (this.storedData[key] !== currentData[key]) {
              this._storage.setItem(key, currentData[key]);
              this.storedData[key] = currentData[key];
            }
          } else {
            var _currentData$dataFetc;
            var currentFetcherData = (_currentData$dataFetc = currentData[dataFetcherKey]) !== null && _currentData$dataFetc !== void 0 ? _currentData$dataFetc : {};
            if (!this.storedData[dataFetcherKey]) {
              this.storedData[dataFetcherKey] = {};
            }
            var storedFetcherData = this.storedData[dataFetcherKey];
            var needToSave = false;
            // initial state has no cachedTimestamps and need to save
            if (!storedFetcherData.cachedTimestamps) {
              needToSave = true;
              this.storedData[dataFetcherKey] = currentFetcherData;
            } else {
              // if cachedTimestamps changed, cachedData should be changed too
              // And an action only updates one data
              for (var _key in currentFetcherData.cachedTimestamps) {
                if (storedFetcherData.cachedTimestamps[_key] !== currentFetcherData.cachedTimestamps[_key]) {
                  needToSave = true;
                  storedFetcherData.cachedTimestamps[_key] = currentFetcherData.cachedTimestamps[_key];
                  storedFetcherData.cachedData[_key] = currentFetcherData.cachedData[_key];
                }
              }
            }
            if (needToSave) {
              this._storage.setItem(dataFetcherKey, this.storedData[dataFetcherKey]);
            }
          }
        }
      }
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$storageOp3;
        var key, currentData, _key2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._storage = new this._StorageProvider({
                  storageKey: this.storageKey
                });
                _context.next = 3;
                return this._storage.getData();
              case 3:
                this.storedData = _context.sent;
                if ((_this$_deps$storageOp3 = this._deps.storageOptions) === null || _this$_deps$storageOp3 === void 0 ? void 0 : _this$_deps$storageOp3.disableClearUnused) {
                  _context.next = 14;
                  break;
                }
                _context.t0 = regeneratorRuntime.keys(this.storedData);
              case 6:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 14;
                  break;
                }
                key = _context.t1.value;
                if (this._storageReducers[key]) {
                  _context.next = 12;
                  break;
                }
                delete this.storedData[key];
                _context.next = 12;
                return this._storage.removeItem(key);
              case 12:
                _context.next = 6;
                break;
              case 14:
                this.setData(_objectSpread(_objectSpread({}, this.data), this.storedData));
                currentData = this.data;
                for (_key2 in currentData) {
                  if (!Object.prototype.hasOwnProperty.call(this.storedData, _key2) && this.storageWritable) {
                    this._storage.setItem(_key2, currentData[_key2]);
                  }
                }
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      var _this2 = this;
      this._storageHandler = function (_ref) {
        var key = _ref.key,
          value = _ref.value;
        if (_this2.ready) {
          _this2.storedData[key] = value;
          _this2.syncData(key, value);
        }
      };
      this._storage.on('storage', this._storageHandler);
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn && (!this._deps.tabManager || this._deps.tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!!this._deps.tabManager && !this._deps.tabManager.ready || this._deps.auth.notLoggedIn) && this.ready;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      if (this._storageHandler) {
        if (this._storage.off) {
          this._storage.off('storage', this._storageHandler);
        } else if (this._storage.removeListener) {
          this._storage.removeListener('storage', this._storageHandler);
        }
        this._storageHandler = null;
      }
      if (this._storage) {
        this._storage.destroy();
        this._storage = null;
      }
      this.resetData();
    }
  }, {
    key: "storageWritable",
    get: function get() {
      return !this._disableInactiveTabsWrite || !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "storageKey",
    get: function get() {
      var prefix = this.prefix ? "".concat(this.prefix, "-") : '';
      return "".concat(prefix, "storage-").concat(this._deps.auth.ownerId);
    }
  }]);
  return Storage;
}(_StorageBase2.StorageBase)) || _class);
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map
