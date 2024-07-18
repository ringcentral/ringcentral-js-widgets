"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionNumberAreaCode = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _class, _class2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ExtensionNumberAreaCode = (_dec = (0, _di.Module)({
  name: 'ExtensionNumberAreaCode',
  deps: ['AppFeatures', 'Client', 'DataFetcherV2', 'ExtensionFeatures', 'ExtensionPhoneNumber', {
    dep: 'TabManager',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.extensionPhoneNumber.primaryNumber, that._deps.extensionPhoneNumber.mainCompanyNumber];
}), _dec3 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionNumberAreaCode, _DataFetcherV2Consume);
  var _super = _createSuper(ExtensionNumberAreaCode);
  function ExtensionNumberAreaCode(deps) {
    var _this;
    _classCallCheck(this, ExtensionNumberAreaCode);
    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = void 0;
    _this._source = new _DataFetcherV.DataSource({
      key: 'ExtensionNumberAreaCode',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._deps.client.service.platform().post('/restapi/v2/number-parser/parse', {
                    originalStrings: _this.originalString,
                    contextSource: 'Account',
                    context: {
                      outboundCallPrefix: _this._deps.appFeatures.OCPValue
                    }
                  });
                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  console.error('fetch extensionNumberAreaCode', _context.t0);
                  return _context.abrupt("return", {
                    results: []
                  });
                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return !!_this._deps.extensionPhoneNumber.ready && !!_this._deps.appFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadExtensionPhoneNumbers) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      }
    });
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(ExtensionNumberAreaCode, [{
    key: "_handleDataChange",
    value: function _handleDataChange() {
      var _this$_deps$tabManage, _this$_deps$tabManage2;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      this._stopWatching = (0, _core.watch)(this, function () {
        return _this2.originalString;
      }, function () {
        return _this2._handleDataChange();
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = undefined;
    }
  }, {
    key: "originalString",
    get: function get() {
      var _this$_deps$extension4, _this$_deps$extension5, _this$_deps$extension6;
      var mainCompanyNumber = (_this$_deps$extension4 = this._deps.extensionPhoneNumber.mainCompanyNumber) === null || _this$_deps$extension4 === void 0 ? void 0 : _this$_deps$extension4.phoneNumber;
      var primaryNumber = (_this$_deps$extension5 = (_this$_deps$extension6 = this._deps.extensionPhoneNumber.primaryNumber) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.phoneNumber) !== null && _this$_deps$extension5 !== void 0 ? _this$_deps$extension5 : mainCompanyNumber;
      return [primaryNumber, mainCompanyNumber];
    }
  }, {
    key: "defaultAreaCode",
    get: function get() {
      var _primaryNumber$number, _mainCompanyNumber$nu;
      if (!this.data) {
        return;
      }
      var _this$data$results = _slicedToArray(this.data.results, 2),
        primaryNumber = _this$data$results[0],
        mainCompanyNumber = _this$data$results[1];
      return (primaryNumber === null || primaryNumber === void 0 ? void 0 : (_primaryNumber$number = primaryNumber.numberDetails) === null || _primaryNumber$number === void 0 ? void 0 : _primaryNumber$number.areaCode) || (mainCompanyNumber === null || mainCompanyNumber === void 0 ? void 0 : (_mainCompanyNumber$nu = mainCompanyNumber.numberDetails) === null || _mainCompanyNumber$nu === void 0 ? void 0 : _mainCompanyNumber$nu.areaCode);
    }
  }]);
  return ExtensionNumberAreaCode;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "originalString", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "originalString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultAreaCode", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultAreaCode"), _class2.prototype)), _class2)) || _class);
exports.ExtensionNumberAreaCode = ExtensionNumberAreaCode;
//# sourceMappingURL=ExtensionNumberAreaCode.js.map
