"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStorage = void 0;
require("regenerator-runtime/runtime");
var _StorageBase2 = require("../../lib/StorageBase");
var _di = require("../../lib/di");
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
var GlobalStorage = (_dec = (0, _di.Module)({
  name: 'GlobalStorage',
  deps: [{
    dep: 'GlobalStorageOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_StorageBase) {
  _inherits(GlobalStorage, _StorageBase);
  var _super = _createSuper(GlobalStorage);
  function GlobalStorage(deps) {
    var _deps$globalStorageOp;
    var _this;
    _classCallCheck(this, GlobalStorage);
    _this = _super.call(this, deps, {
      name: 'globalStorage',
      StorageProvider: (_deps$globalStorageOp = deps.globalStorageOptions) === null || _deps$globalStorageOp === void 0 ? void 0 : _deps$globalStorageOp.StorageProvider
    });
    _this._storage = void 0;
    _this._storageHandler = null;
    _this.storedData = {};
    return _this;
  }
  _createClass(GlobalStorage, [{
    key: "onStateChange",
    value: function onStateChange() {
      if (this.ready) {
        var currentData = this.data;
        // save new data to storage when changed
        for (var key in currentData) {
          if (this.storedData[key] !== currentData[key]) {
            this._storage.setItem(key, currentData[key]);
            this.storedData[key] = currentData[key];
          }
        }
      }
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$globalSto;
        var storageKey, key, currentData, _key;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                storageKey = "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "GlobalStorage");
                this._storage = new this._StorageProvider({
                  storageKey: storageKey
                });
                _context.next = 4;
                return this._storage.getData();
              case 4:
                this.storedData = _context.sent;
                if ((_this$_deps$globalSto = this._deps.globalStorageOptions) === null || _this$_deps$globalSto === void 0 ? void 0 : _this$_deps$globalSto.disableClearUnused) {
                  _context.next = 15;
                  break;
                }
                _context.t0 = regeneratorRuntime.keys(this.storedData);
              case 7:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 15;
                  break;
                }
                key = _context.t1.value;
                if (this._storageReducers[key]) {
                  _context.next = 13;
                  break;
                }
                delete this.storedData[key];
                _context.next = 13;
                return this._storage.removeItem(key);
              case 13:
                _context.next = 7;
                break;
              case 15:
                this.setData(_objectSpread(_objectSpread({}, this.data), this.storedData));
                currentData = this.data;
                for (_key in currentData) {
                  if (!Object.prototype.hasOwnProperty.call(this.storedData, _key)) {
                    this._storage.setItem(_key, currentData[_key]);
                  }
                }
              case 18:
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
  }]);
  return GlobalStorage;
}(_StorageBase2.StorageBase)) || _class);
exports.GlobalStorage = GlobalStorage;
//# sourceMappingURL=GlobalStorage.js.map
