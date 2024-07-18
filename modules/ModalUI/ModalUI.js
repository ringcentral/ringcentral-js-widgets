"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalUI = void 0;
require("regenerator-runtime/runtime");
var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _uuid = require("uuid");
var _utils = require("./utils");
var _dec, _dec2, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var ModalUI = (_dec = (0, _di.Module)({
  name: 'ModalUI',
  deps: ['Locale']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._modals, that._deps.locale.currentLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ModalUI, _RcUIModuleV);
  var _super = _createSuper(ModalUI);
  function ModalUI(deps) {
    var _this;
    _classCallCheck(this, ModalUI);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "_modals", _descriptor, _assertThisInitialized(_this));
    _this._rendererRegister = new Map();
    _this._handlerRegister = new Map();
    _this._promises = new Map();
    _this.registerRenderer(_utils.defaultOKRendererID, _utils.defaultOKRenderer);
    _this.registerRenderer(_utils.defaultCancelRendererID, _utils.defaultCancelRenderer);
    _this.registerRenderer(_utils.infoTitleRendererID, _utils.infoTitleRenderer);
    return _this;
  }
  _createClass(ModalUI, [{
    key: "_addModal",
    value: function _addModal(modalState) {
      this._modals.push(modalState);
    }
  }, {
    key: "_updateModal",
    value: function _updateModal(modalState) {
      var idx = (0, _ramda.findIndex)(function (item) {
        return item.id === modalState.id;
      }, this._modals);
      if (idx === -1) {
        throw new Error("modal id \"".concat(modalState.id, " not found"));
      }
      this._modals[idx] = modalState;
    }
  }, {
    key: "_removeModal",
    value: function _removeModal(id) {
      this._modals = (0, _ramda.filter)(function (item) {
        return item.id !== id;
      }, this._modals);
    }
  }, {
    key: "_genericHandler",
    value: function () {
      var _genericHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, handlerID) {
        var _this$_handlerRegiste, _this$_handlerRegiste2;
        var _len,
          args,
          _key,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len = _args.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                  args[_key - 2] = _args[_key];
                }
                return _context.abrupt("return", (_this$_handlerRegiste = this._handlerRegister.get(id)) === null || _this$_handlerRegiste === void 0 ? void 0 : (_this$_handlerRegiste2 = _this$_handlerRegiste.get(handlerID)) === null || _this$_handlerRegiste2 === void 0 ? void 0 : _this$_handlerRegiste2.apply(void 0, args));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _genericHandler(_x, _x2) {
        return _genericHandler2.apply(this, arguments);
      }
      return _genericHandler;
    }()
  }, {
    key: "_setLoading",
    value: function _setLoading(id, loading) {
      var idx = (0, _ramda.findIndex)(function (item) {
        return item.id === id;
      }, this._modals);
      if (this._modals[idx].useLoadingOverlay) {
        this._modals[idx].loadingOverlay = loading;
      } else {
        this._modals[idx].loading = loading;
      }
    }
  }, {
    key: "_onConfirm",
    value: function () {
      var _onConfirm2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, onConfirm) {
        var handler;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // here we assume the handler is async and set the loading status
                // detecting whether the handler is async or not is unreliable and can be dangerous
                // for most non-async functions the loading status will occur too briefly
                // so that the UI will not really render the loading status at all
                this._setLoading(id, true);
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                handler = this._handlerRegister.get(id).get(onConfirm);
                if (!handler) {
                  _context2.next = 16;
                  break;
                }
                _context2.prev = 3;
                _context2.next = 6;
                return handler();
              case 6:
                _context2.t0 = _context2.sent;
                if (!(_context2.t0 === false)) {
                  _context2.next = 10;
                  break;
                }
                this._setLoading(id, false);
                return _context2.abrupt("return");
              case 10:
                _context2.next = 16;
                break;
              case 12:
                _context2.prev = 12;
                _context2.t1 = _context2["catch"](3);
                // if handler has unhandled error, at least remove the loading state so the modal could
                // still be closed by the user if cancel button is provided.
                this._setLoading(id, false);
                throw _context2.t1;
              case 16:
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._promises.get(id).resolve(true);
                this._promises["delete"](id);
                this.close(id);
              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 12]]);
      }));
      function _onConfirm(_x3, _x4) {
        return _onConfirm2.apply(this, arguments);
      }
      return _onConfirm;
    }()
  }, {
    key: "_onExited",
    value: function () {
      var _onExited2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, onExited) {
        var _this$_promises$get, _this$_handlerRegiste3;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (_this$_promises$get = this._promises.get(id)) === null || _this$_promises$get === void 0 ? void 0 : _this$_promises$get.resolve(false);
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                (_this$_handlerRegiste3 = this._handlerRegister.get(id).get(onExited)) === null || _this$_handlerRegiste3 === void 0 ? void 0 : _this$_handlerRegiste3();
                this._promises["delete"](id);
                this._removeModal(id);
                this._handlerRegister["delete"](id);
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _onExited(_x5, _x6) {
        return _onExited2.apply(this, arguments);
      }
      return _onExited;
    }()
  }, {
    key: "_onCancel",
    value: function () {
      var _onCancel2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, onCancel) {
        var _this$_handlerRegiste4;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                (_this$_handlerRegiste4 = this._handlerRegister.get(id).get(onCancel)) === null || _this$_handlerRegiste4 === void 0 ? void 0 : _this$_handlerRegiste4();
                this.close(id);
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function _onCancel(_x7, _x8) {
        return _onCancel2.apply(this, arguments);
      }
      return _onCancel;
    }()
  }, {
    key: "_registerHandler",
    value: function _registerHandler(id, handler) {
      var handlerID = (0, _uuid.v4)();
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._handlerRegister.get(id).set(handlerID, handler);
      return handlerID;
    }
  }, {
    key: "_removeHandler",
    value: function _removeHandler(id, handlerID) {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._handlerRegister.get(id)["delete"](handlerID);
    }
    /**
     * register render method for custom render if you want
     *
     * @example
     *
     * ```tsx
     * const defaultOKRenderer: CustomRenderer = ({ currentLocale }) =>
     *  <span>{i18n.getString('ok', currentLocale)}</span>
     * ```
     */
  }, {
    key: "registerRenderer",
    value: function registerRenderer(id, renderer) {
      this._rendererRegister.set(id, renderer);
    }
  }, {
    key: "_dehydrateFunctions",
    value: function _dehydrateFunctions(id, props, handlerIDs, oldProps) {
      var _this2 = this;
      if (props === null) {
        // check oldProps for existing handlers and remove them
        if (oldProps) {
          var _loop = function _loop(key) {
            if (Object.prototype.hasOwnProperty.call(oldProps, key)) {
              var idx = handlerIDs.findIndex(function (id) {
                return id === oldProps[key];
              });
              if (idx > -1) {
                _this2._removeHandler(id, oldProps[key]);
                handlerIDs.splice(idx, 1);
              }
            }
          };
          for (var key in oldProps) {
            _loop(key);
          }
        }
        return null;
      }
      var result = _objectSpread(_objectSpread({}, oldProps), props);
      var _loop2 = function _loop2(_key2) {
        if (Object.prototype.hasOwnProperty.call(props, _key2)) {
          if (typeof props[_key2] === 'function') {
            // check if old handler exist
            var oldID = oldProps && oldProps[_key2] && (0, _ramda.find)(function (id) {
              return id === oldProps[_key2];
            }, handlerIDs);
            if (oldID) {
              // replace oldHandler
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              _this2._handlerRegister.get(id).set(oldID, props[_key2]);
            } else {
              var handlerID = _this2._registerHandler(id, props[_key2]);
              handlerIDs.push(handlerID);
              result[_key2] = handlerID;
            }
          } else if (oldProps && Object.prototype.hasOwnProperty.call(oldProps, _key2)) {
            var idx = handlerIDs.findIndex(function (id) {
              return id === oldProps[_key2];
            });
            if (idx > -1) {
              _this2._removeHandler(id, oldProps[_key2]);
              handlerIDs.splice(idx, 1);
            }
          }
        }
      };
      for (var _key2 in props) {
        _loop2(_key2);
      }
      return result;
    }
  }, {
    key: "_rehydrateFunctions",
    value: function _rehydrateFunctions(id, props, handlerIDs) {
      var _this3 = this;
      var result = _objectSpread({}, props);
      var _loop3 = function _loop3(key) {
        if (Object.prototype.hasOwnProperty.call(props, key) && (0, _ramda.findIndex)(function (id) {
          return id === props[key];
        }, handlerIDs) > -1) {
          result[key] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
              args[_key3] = arguments[_key3];
            }
            return _this3._genericHandler.apply(_this3, [id, props[key]].concat(args));
          };
        }
      };
      for (var key in props) {
        _loop3(key);
      }
      return result;
    }
  }, {
    key: "_getDehydratedState",
    value: function _getDehydratedState(_ref, oldState) {
      var _oldState$handlerIDs$, _oldState$handlerIDs;
      var titleProps = _ref.titleProps,
        contentProps = _ref.contentProps,
        footerProps = _ref.footerProps,
        props = _objectWithoutProperties(_ref, ["titleProps", "contentProps", "footerProps"]);
      var handlerIDs = (_oldState$handlerIDs$ = oldState === null || oldState === void 0 ? void 0 : (_oldState$handlerIDs = oldState.handlerIDs) === null || _oldState$handlerIDs === void 0 ? void 0 : _oldState$handlerIDs.slice()) !== null && _oldState$handlerIDs$ !== void 0 ? _oldState$handlerIDs$ : [];
      var dehydratedState = _objectSpread(_objectSpread({}, this._dehydrateFunctions(props.id, props, handlerIDs, oldState)), {}, {
        handlerIDs: handlerIDs
      });
      if (titleProps !== undefined) {
        dehydratedState.titleProps = this._dehydrateFunctions(props.id, titleProps, handlerIDs, oldState === null || oldState === void 0 ? void 0 : oldState.titleProps);
      }
      if (contentProps !== undefined) {
        dehydratedState.contentProps = this._dehydrateFunctions(props.id, contentProps, handlerIDs, oldState === null || oldState === void 0 ? void 0 : oldState.contentProps);
      }
      if (footerProps !== undefined) {
        dehydratedState.footerProps = this._dehydrateFunctions(props.id, footerProps, handlerIDs, oldState === null || oldState === void 0 ? void 0 : oldState.footerProps);
      }
      return dehydratedState;
    }
  }, {
    key: "open",
    value: function open(_ref2, usePromise) {
      var _ref2$autoDisableBack = _ref2.autoDisableBackdropClick,
        autoDisableBackdropClick = _ref2$autoDisableBack === void 0 ? true : _ref2$autoDisableBack,
        _ref2$disableBackdrop = _ref2.disableBackdropClick,
        disableBackdropClick = _ref2$disableBackdrop === void 0 ? true : _ref2$disableBackdrop,
        _ref2$fullScreen = _ref2.fullScreen,
        fullScreen = _ref2$fullScreen === void 0 ? false : _ref2$fullScreen,
        props = _objectWithoutProperties(_ref2, ["autoDisableBackdropClick", "disableBackdropClick", "fullScreen"]);
      var id = (0, _uuid.v4)();
      this._handlerRegister.set(id, new Map());
      var dehydratedState = this._getDehydratedState(_objectSpread(_objectSpread({}, props), {}, {
        id: id,
        autoDisableBackdropClick: autoDisableBackdropClick,
        disableBackdropClick: disableBackdropClick,
        fullScreen: fullScreen,
        open: true
      }));
      this._addModal(dehydratedState);
      var resolveFn;
      var promise = new Promise(function (resolve) {
        resolveFn = resolve;
      });
      this._promises.set(id, {
        promise: promise,
        // @ts-expect-error TS(2322): Type 'undefined' is not assignable to type '(ok: b... Remove this comment to see the full error message
        resolve: resolveFn
      });
      return usePromise ? promise : id;
    }
    /**
     *
     * @returns Whether the update is successful.
     */
  }, {
    key: "update",
    value: function update(props) {
      var oldState = (0, _ramda.find)(function (item) {
        return item.id === props.id;
      }, this._modals);
      if (!oldState) {
        return false;
      }
      var updatedState = this._getDehydratedState(props, oldState);
      this._updateModal(updatedState);
      return true;
    }
  }, {
    key: "close",
    value: function close(id) {
      var dehydratedState = (0, _ramda.find)(function (item) {
        return item.id === id;
      }, this._modals);
      if (!dehydratedState) {
        return false;
      }
      var updatedState = _objectSpread(_objectSpread({}, dehydratedState), {}, {
        open: false
      });
      this._updateModal(updatedState);
      return true;
    }
  }, {
    key: "confirm",
    value: function confirm() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var usePromise = arguments.length > 1 ? arguments[1] : undefined;
      return this.open(_objectSpread(_objectSpread({
        confirmButtonText: _utils.defaultOKRendererID,
        cancelButtonText: _utils.defaultCancelRendererID
      }, props), {}, {
        variant: 'confirm'
      }),
      // @ts-expect-error TS(2345): Argument of type 'true | undefined' is not assigna... Remove this comment to see the full error message
      usePromise);
    }
  }, {
    key: "alert",
    value: function alert() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var usePromise = arguments.length > 1 ? arguments[1] : undefined;
      return this.open(_objectSpread(_objectSpread({
        confirmButtonText: _utils.defaultOKRendererID
      }, props), {}, {
        variant: 'alert'
      }),
      // @ts-expect-error TS(2345): Argument of type 'true | undefined' is not assigna... Remove this comment to see the full error message
      usePromise);
    }
  }, {
    key: "info",
    value: function info(props, usePromise) {
      return this.open(_objectSpread(_objectSpread({}, props), {}, {
        variant: 'info'
      }),
      // @ts-expect-error TS(2345): Argument of type 'true | undefined' is not assigna... Remove this comment to see the full error message
      usePromise);
    }
  }, {
    key: "getPromise",
    value: function getPromise(id) {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      return this._promises.get(id).promise;
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      return {};
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        modals: this.modals
      };
    }
  }, {
    key: "modals",
    get: function get() {
      var _this4 = this;
      return (0, _ramda.map)(function (_ref3) {
        var _this4$_rendererRegis, _this4$_rendererRegis2, _this4$_rendererRegis3, _this4$_rendererRegis4, _this4$_rendererRegis5, _this4$_rendererRegis6, _ref4, _this4$_rendererRegis7, _ref5, _this4$_rendererRegis8;
        var id = _ref3.id,
          _onConfirm3 = _ref3.onConfirm,
          onCancel = _ref3.onCancel,
          _onExited3 = _ref3.onExited,
          title = _ref3.title,
          content = _ref3.content,
          footer = _ref3.footer,
          confirmButtonText = _ref3.confirmButtonText,
          cancelButtonText = _ref3.cancelButtonText,
          _ref3$titleProps = _ref3.titleProps,
          titleProps = _ref3$titleProps === void 0 ? {} : _ref3$titleProps,
          _ref3$contentProps = _ref3.contentProps,
          contentProps = _ref3$contentProps === void 0 ? {} : _ref3$contentProps,
          _ref3$footerProps = _ref3.footerProps,
          footerProps = _ref3$footerProps === void 0 ? {} : _ref3$footerProps,
          variant = _ref3.variant,
          handlerIDs = _ref3.handlerIDs,
          autoDisableBackdropClick = _ref3.autoDisableBackdropClick,
          disableBackdropClick = _ref3.disableBackdropClick,
          loading = _ref3.loading,
          loadingOverlay = _ref3.loadingOverlay,
          useLoadingOverlay = _ref3.useLoadingOverlay,
          _onClose = _ref3.onClose,
          rest = _objectWithoutProperties(_ref3, ["id", "onConfirm", "onCancel", "onExited", "title", "content", "footer", "confirmButtonText", "cancelButtonText", "titleProps", "contentProps", "footerProps", "variant", "handlerIDs", "autoDisableBackdropClick", "disableBackdropClick", "loading", "loadingOverlay", "useLoadingOverlay", "onClose"]);
        var isBlockClose = autoDisableBackdropClick && (loading || loadingOverlay) || disableBackdropClick;
        var uiProps = _objectSpread(_objectSpread({}, rest), {}, {
          key: id,
          loading: loading,
          loadingOverlay: loadingOverlay,
          disableBackdropClick: isBlockClose,
          disableEscapeKeyDown: isBlockClose,
          onConfirm: function onConfirm() {
            return _this4._onConfirm(id, _onConfirm3);
          },
          onClose: function onClose(e, reason) {
            _onClose === null || _onClose === void 0 ? void 0 : _onClose(e, reason);
            _this4.close(id);
          },
          TransitionProps: {
            onExited: function onExited() {
              return _this4._onExited(id, _onExited3);
            }
          }
        });
        if (onCancel || cancelButtonText) {
          uiProps.onCancel = function () {
            return _this4._onCancel(id, onCancel);
          };
        }
        var renderedTitle = // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        (_this4$_rendererRegis = (_this4$_rendererRegis2 = _this4._rendererRegister.get(title)) === null || _this4$_rendererRegis2 === void 0 ? void 0 : _this4$_rendererRegis2(_objectSpread(_objectSpread({
          currentLocale: _this4._deps.locale.currentLocale
        }, _this4._rehydrateFunctions(id, titleProps, handlerIDs)), {}, {
          onConfirm: uiProps.onConfirm,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis !== void 0 ? _this4$_rendererRegis : title;
        if (variant === 'info') {
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          uiProps.title = _this4._rendererRegister.get(_utils.infoTitleRendererID)({
            title: renderedTitle,
            onConfirm: uiProps.onConfirm,
            currentLocale: _this4._deps.locale.currentLocale
          });
          uiProps.TitleProps = {
            disableTypography: true,
            display: 'flex',
            space: [0, 6]
          };
        } else {
          uiProps.title = renderedTitle;
        }
        uiProps.children = // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        (_this4$_rendererRegis3 = (_this4$_rendererRegis4 = _this4._rendererRegister.get(content)) === null || _this4$_rendererRegis4 === void 0 ? void 0 : _this4$_rendererRegis4(_objectSpread(_objectSpread({
          currentLocale: _this4._deps.locale.currentLocale
        }, _this4._rehydrateFunctions(id, contentProps, handlerIDs)), {}, {
          onConfirm: uiProps.onConfirm,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis3 !== void 0 ? _this4$_rendererRegis3 : content;
        uiProps.footer = variant === 'info' ? null : // @ts-expect-error TS(2345): Argument of type '((boolean | ReactChild | ReactFr... Remove this comment to see the full error message
        (_this4$_rendererRegis5 = (_this4$_rendererRegis6 = _this4._rendererRegister.get(footer)) === null || _this4$_rendererRegis6 === void 0 ? void 0 : _this4$_rendererRegis6(_objectSpread(_objectSpread({
          currentLocale: _this4._deps.locale.currentLocale
        }, _this4._rehydrateFunctions(id, footerProps, handlerIDs)), {}, {
          onConfirm: uiProps.onConfirm,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis5 !== void 0 ? _this4$_rendererRegis5 : footer;
        uiProps.confirmButtonText = // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        (_ref4 = (_this4$_rendererRegis7 = _this4._rendererRegister.get(confirmButtonText)) === null || _this4$_rendererRegis7 === void 0 ? void 0 : _this4$_rendererRegis7({
          currentLocale: _this4._deps.locale.currentLocale,
          onConfirm: uiProps.onConfirm,
          onCancel: uiProps.onCancel
        })) !== null && _ref4 !== void 0 ? _ref4 : confirmButtonText;
        uiProps.cancelButtonText = // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        (_ref5 = (_this4$_rendererRegis8 = _this4._rendererRegister.get(cancelButtonText)) === null || _this4$_rendererRegis8 === void 0 ? void 0 : _this4$_rendererRegis8({
          currentLocale: _this4._deps.locale.currentLocale,
          onConfirm: uiProps.onConfirm,
          onCancel: uiProps.onCancel
        })) !== null && _ref5 !== void 0 ? _ref5 : cancelButtonText;
        return uiProps;
      }, this._modals);
    }
  }]);
  return ModalUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_modals", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_addModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_genericHandler", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_genericHandler"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onConfirm", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onConfirm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onExited", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onExited"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCancel", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCancel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "open", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "open"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "close", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "close"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirm", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "confirm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alert", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "info", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "modals", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "modals"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPromise", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPromise"), _class2.prototype)), _class2)) || _class);
exports.ModalUI = ModalUI;
//# sourceMappingURL=ModalUI.js.map
