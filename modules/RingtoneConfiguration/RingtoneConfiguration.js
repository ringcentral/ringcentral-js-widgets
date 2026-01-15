"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingtoneConfiguration = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _core = require("@ringcentral-integration/core");
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _AudioSettings = require("../AudioSettings");
var _const = require("./const");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RingtoneConfiguration = exports.RingtoneConfiguration = (_dec = (0, _di.Module)({
  name: 'RingtoneConfiguration',
  deps: ['Storage', 'Webphone', 'Alert']
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.uploadRingtone), _dec3 = (0, _core.track)(_trackEvents.trackEvents.deleteRingtone), _dec4 = (0, _core.computed)(function (that) {
  return [that.enableCustomRingtone, that.customRingtoneList];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function RingtoneConfiguration(deps) {
    var _this;
    _classCallCheck(this, RingtoneConfiguration);
    _this = _callSuper(this, RingtoneConfiguration, [{
      deps: deps,
      storageKey: 'RingtoneConfiguration',
      enableCache: true
    }]);
    _initializerDefineProperty(_this, "selectedRingtoneId", _descriptor, _this);
    _initializerDefineProperty(_this, "customRingtoneList", _descriptor2, _this);
    return _this;
  }
  _inherits(RingtoneConfiguration, _RcModuleV);
  return _createClass(RingtoneConfiguration, [{
    key: "onInit",
    value: function onInit() {
      this.updateIncomingRingtone();
    }
  }, {
    key: "_setSelectedRingtoneId",
    value: function _setSelectedRingtoneId(id) {
      this.selectedRingtoneId = id;
    }
  }, {
    key: "setSelectedRingtoneId",
    value: function () {
      var _setSelectedRingtoneId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(id) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setSelectedRingtoneId(id);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setSelectedRingtoneId(_x) {
        return _setSelectedRingtoneId2.apply(this, arguments);
      }
      return setSelectedRingtoneId;
    }()
  }, {
    key: "_pushCustomRingtone",
    value: function _pushCustomRingtone(ringtone) {
      this.customRingtoneList.push(ringtone);
    }
  }, {
    key: "_removeCustomRingtone",
    value: function _removeCustomRingtone(id) {
      this.customRingtoneList = this.customRingtoneList.filter(function (ringtone) {
        return ringtone.id !== id;
      });
    }
  }, {
    key: "uploadCustomRingtone",
    value: function () {
      var _uploadCustomRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ringtone) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._pushCustomRingtone(ringtone);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function uploadCustomRingtone(_x2) {
        return _uploadCustomRingtone.apply(this, arguments);
      }
      return uploadCustomRingtone;
    }()
  }, {
    key: "removeCustomRingtone",
    value: function () {
      var _removeCustomRingtone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var hasCustomRingtone;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              hasCustomRingtone = this.customRingtoneList.find(function (ringtone) {
                return ringtone.id === id;
              });
              if (!id || !hasCustomRingtone) {
                this.showDangerAlert(_AudioSettings.audioSettingsErrors.deleteRingtoneFailed);
              }
              this._removeCustomRingtone(id);
              // if the remove one the selected ringtone, set the first default ringtone as selected
              if (id === this.selectedRingtoneId) {
                this.setSelectedRingtoneId(this.defaultRingtoneList[0].id);
                this.updateIncomingRingtone();
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function removeCustomRingtone(_x3) {
        return _removeCustomRingtone2.apply(this, arguments);
      }
      return removeCustomRingtone;
    }()
  }, {
    key: "showDangerAlert",
    value: function () {
      var _showDangerAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(message) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._deps.alert.danger({
                message: message,
                allowDuplicates: false
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function showDangerAlert(_x4) {
        return _showDangerAlert.apply(this, arguments);
      }
      return showDangerAlert;
    }()
  }, {
    key: "updateIncomingRingtone",
    value: function () {
      var _updateIncomingRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var selectedRingtoneAudio;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              selectedRingtoneAudio = this.getSelectedRingtoneAudio();
              if (selectedRingtoneAudio && selectedRingtoneAudio.dataUrl !== this._deps.webphone.incomingAudio) {
                this._deps.webphone.setIncomingAudio(selectedRingtoneAudio);
              }
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function updateIncomingRingtone() {
        return _updateIncomingRingtone.apply(this, arguments);
      }
      return updateIncomingRingtone;
    }()
  }, {
    key: "getSelectedRingtoneAudio",
    value: function getSelectedRingtoneAudio() {
      var _this2 = this;
      var ringtone = this.fullRingtoneList.find(function (ringtone) {
        return ringtone.id === _this2.selectedRingtoneId;
      });
      if (!(ringtone === null || ringtone === void 0 ? void 0 : ringtone.url)) {
        if ((ringtone === null || ringtone === void 0 ? void 0 : ringtone.type) === 'default' && (ringtone === null || ringtone === void 0 ? void 0 : ringtone.id) === _const.RINGS_TYPE.Off) {
          return {
            fileName: _const.RINGS_TYPE.Off,
            dataUrl: ''
          };
        }
        return null;
      }
      return {
        fileName: (0, _helper.getFileNameWithoutExt)(ringtone.name),
        dataUrl: ringtone.url
      };
    }
  }, {
    key: "defaultRingtoneList",
    get: function get() {
      var _this$_deps$ringtoneC, _this$_deps$ringtoneC2;
      return ((_this$_deps$ringtoneC = (_this$_deps$ringtoneC2 = this._deps.ringtoneConfigurationOptions) === null || _this$_deps$ringtoneC2 === void 0 ? void 0 : _this$_deps$ringtoneC2.defaultRingtoneList) !== null && _this$_deps$ringtoneC !== void 0 ? _this$_deps$ringtoneC : _const.DEFAULT_RINGTONE_LIST).map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          type: 'default',
          name: item.id
        });
      });
    }
  }, {
    key: "customRingtoneSortedList",
    get: function get() {
      return this.customRingtoneList.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
  }, {
    key: "fullRingtoneList",
    get: function get() {
      return [].concat(_toConsumableArray(this.customRingtoneSortedList), _toConsumableArray(this.defaultRingtoneList));
    }
  }, {
    key: "enableCustomRingtone",
    get: function get() {
      var _this$_deps$ringtoneC3, _this$_deps$ringtoneC4;
      return (_this$_deps$ringtoneC3 = (_this$_deps$ringtoneC4 = this._deps.ringtoneConfigurationOptions) === null || _this$_deps$ringtoneC4 === void 0 ? void 0 : _this$_deps$ringtoneC4.enableCustomRingtone) !== null && _this$_deps$ringtoneC3 !== void 0 ? _this$_deps$ringtoneC3 : true;
    }
  }, {
    key: "isUploadRingtoneDisabled",
    get: function get() {
      return this.enableCustomRingtone && this.customRingtoneList.length >= _const.MAX_CUSTOM_RINGTONE_COUNT;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedRingtoneId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this.defaultRingtoneList[0].id;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "customRingtoneList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setSelectedRingtoneId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSelectedRingtoneId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSelectedRingtoneId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setSelectedRingtoneId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pushCustomRingtone", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_pushCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCustomRingtone", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uploadCustomRingtone", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "uploadCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeCustomRingtone", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showDangerAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showDangerAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIncomingRingtone", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIncomingRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUploadRingtoneDisabled", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "isUploadRingtoneDisabled"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=RingtoneConfiguration.js.map
