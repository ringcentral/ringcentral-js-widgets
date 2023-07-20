"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
