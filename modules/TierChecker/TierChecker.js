"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TierChecker = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _di = require("../../lib/di");
var _Auth = require("../Auth");
var _dec, _class;
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
var TierChecker = (_dec = (0, _di.Module)({
  name: 'TierChecker',
  deps: ['Auth', 'Alert', 'ExtensionFeatures', {
    dep: 'TierCheckerOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(TierChecker, _RcModuleV);
  var _super = _createSuper(TierChecker);
  function TierChecker(deps) {
    _classCallCheck(this, TierChecker);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(TierChecker, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this = this;
      (0, _core.watch)(this, function () {
        return [_this.ready, _this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn, _this.enforceCRMFeature, _this.isCRMEnabled];
      }, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
          var _ref3, ready, loggedIn, enforceCRMFeature, isCRMEnabled;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref3 = _slicedToArray(_ref, 4), ready = _ref3[0], loggedIn = _ref3[1], enforceCRMFeature = _ref3[2], isCRMEnabled = _ref3[3];
                  if (!(ready && loggedIn && enforceCRMFeature && !isCRMEnabled)) {
                    _context.next = 5;
                    break;
                  }
                  _context.next = 4;
                  return _this._deps.auth.logout();
                case 4:
                  _this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.invalidTier,
                    ttl: 0
                  });
                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }(), {
        multiple: true
      });
    }
  }, {
    key: "crmFeature",
    get: function get() {
      var _this$_deps$tierCheck, _this$_deps$tierCheck2;
      return (_this$_deps$tierCheck = (_this$_deps$tierCheck2 = this._deps.tierCheckerOptions) === null || _this$_deps$tierCheck2 === void 0 ? void 0 : _this$_deps$tierCheck2.crmFeature) !== null && _this$_deps$tierCheck !== void 0 ? _this$_deps$tierCheck : 'SalesForce';
    }
  }, {
    key: "isCRMEnabled",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2;
      return !!((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension[this.crmFeature]) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available);
    }
  }, {
    key: "enforceCRMFeature",
    get: function get() {
      var _this$_deps$tierCheck3, _this$_deps$tierCheck4;
      return (_this$_deps$tierCheck3 = (_this$_deps$tierCheck4 = this._deps.tierCheckerOptions) === null || _this$_deps$tierCheck4 === void 0 ? void 0 : _this$_deps$tierCheck4.enforceCRMFeature) !== null && _this$_deps$tierCheck3 !== void 0 ? _this$_deps$tierCheck3 : true;
    }
  }]);
  return TierChecker;
}(_core.RcModuleV2)) || _class);
exports.TierChecker = TierChecker;
//# sourceMappingURL=TierChecker.js.map
