"use strict";

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalUI = exports.infoTitleRenderer = exports.defaultCancelRenderer = exports.defaultOKRenderer = exports.infoTitleRendererID = exports.defaultCancelRendererID = exports.defaultOKRendererID = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.find-index");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _core = require("@ringcentral-integration/core");

var _juno = require("@ringcentral/juno");

var _Close = _interopRequireDefault(require("@ringcentral/juno/icon/Close"));

var _ramda = require("ramda");

var _react = _interopRequireDefault(require("react"));

var _background = _interopRequireDefault(require("ringcentral-integration/lib/background"));

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _uuid = require("uuid");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var defaultOKRendererID = 'ModalUI.defaultOKRendererID';
exports.defaultOKRendererID = defaultOKRendererID;
var defaultCancelRendererID = 'ModalUI.defaultCancelRendererID';
exports.defaultCancelRendererID = defaultCancelRendererID;
var infoTitleRendererID = 'ModalUI.infoTitleRendererID';
exports.infoTitleRendererID = infoTitleRendererID;

var defaultOKRenderer = function defaultOKRenderer(_ref) {
  var currentLocale = _ref.currentLocale;
  return _i18n["default"].getString('ok', currentLocale);
};

exports.defaultOKRenderer = defaultOKRenderer;

var defaultCancelRenderer = function defaultCancelRenderer(_ref2) {
  var currentLocale = _ref2.currentLocale;
  return _i18n["default"].getString('cancel', currentLocale);
};

exports.defaultCancelRenderer = defaultCancelRenderer;

var infoTitleRenderer = function infoTitleRenderer(_ref3) {
  var currentLocale = _ref3.currentLocale,
      onOK = _ref3.onOK,
      title = _ref3.title;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialogHeader, null, /*#__PURE__*/_react["default"].createElement(_juno.RcDialogHeaderTitle, null, title), /*#__PURE__*/_react["default"].createElement(_juno.RcDialogHeaderActions, {
    overlapSize: 2.5
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    tooltipTitle: _i18n["default"].getString('close', currentLocale),
    symbol: _Close["default"],
    onClick: onOK
  })));
};

exports.infoTitleRenderer = infoTitleRenderer;
var ModalUI = (_dec = (0, _di.Module)({
  name: 'ModalUI',
  deps: ['Locale']
}), _dec2 = (0, _core.computed)(function (_ref4) {
  var _modals = _ref4._modals,
      currentLocale = _ref4._deps.locale.currentLocale;
  return [_modals, currentLocale];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
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

    _this.registerRenderer(defaultOKRendererID, defaultOKRenderer);

    _this.registerRenderer(defaultCancelRendererID, defaultCancelRenderer);

    _this.registerRenderer(infoTitleRendererID, infoTitleRenderer);

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
        this._modals[idx].showLoadingOverlay = loading;
      } else {
        this._modals[idx].loading = loading;
      }
    }
  }, {
    key: "_onOK",
    value: function () {
      var _onOK2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, onOK) {
        var handler;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._setLoading(id, true);

                handler = this._handlerRegister.get(id).get(onOK);
                _context2.t0 = handler;

                if (!_context2.t0) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return handler();

              case 6:
                _context2.t1 = _context2.sent;
                _context2.t0 = _context2.t1 === false;

              case 8:
                if (!_context2.t0) {
                  _context2.next = 11;
                  break;
                }

                this._setLoading(id, false);

                return _context2.abrupt("return");

              case 11:
                this._promises.get(id).resolve(true);

                this._promises["delete"](id);

                this.close(id);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _onOK(_x3, _x4) {
        return _onOK2.apply(this, arguments);
      }

      return _onOK;
    }()
  }, {
    key: "_onExited",
    value: function () {
      var _onExited2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var _this$_promises$get;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (_this$_promises$get = this._promises.get(id)) === null || _this$_promises$get === void 0 ? void 0 : _this$_promises$get.resolve(false);

                this._promises["delete"](id);

                this._removeModal(id);

                this._handlerRegister["delete"](id);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onExited(_x5) {
        return _onExited2.apply(this, arguments);
      }

      return _onExited;
    }()
  }, {
    key: "_onCancel",
    value: function () {
      var _onCancel2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, onCancel) {
        var _this$_handlerRegiste3;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (_this$_handlerRegiste3 = this._handlerRegister.get(id).get(onCancel)) === null || _this$_handlerRegiste3 === void 0 ? void 0 : _this$_handlerRegiste3();
                this.close(id);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _onCancel(_x6, _x7) {
        return _onCancel2.apply(this, arguments);
      }

      return _onCancel;
    }()
  }, {
    key: "_registerHandler",
    value: function _registerHandler(id, handler) {
      var handlerID = (0, _uuid.v4)();

      this._handlerRegister.get(id).set(handlerID, handler);

      return handlerID;
    }
  }, {
    key: "_removeHandler",
    value: function _removeHandler(id, handlerID) {
      this._handlerRegister.get(id)["delete"](handlerID);
    }
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
    value: function _getDehydratedState(_ref5, oldState) {
      var _oldState$handlerIDs$, _oldState$handlerIDs;

      var titleProps = _ref5.titleProps,
          contentProps = _ref5.contentProps,
          footerProps = _ref5.footerProps,
          props = _objectWithoutProperties(_ref5, ["titleProps", "contentProps", "footerProps"]);

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
    value: function open(_ref6, usePromise) {
      var _ref6$disableBackdrop = _ref6.disableBackdropClick,
          disableBackdropClick = _ref6$disableBackdrop === void 0 ? true : _ref6$disableBackdrop,
          _ref6$fullScreen = _ref6.fullScreen,
          fullScreen = _ref6$fullScreen === void 0 ? false : _ref6$fullScreen,
          props = _objectWithoutProperties(_ref6, ["disableBackdropClick", "fullScreen"]);

      var id = (0, _uuid.v4)();

      this._handlerRegister.set(id, new Map());

      var dehydratedState = this._getDehydratedState(_objectSpread(_objectSpread({}, props), {}, {
        id: id,
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
        throw new Error("modal id \"".concat(id, " not found"));
      }

      var updatedState = _objectSpread(_objectSpread({}, dehydratedState), {}, {
        open: false
      });

      this._updateModal(updatedState);
    }
  }, {
    key: "confirm",
    value: function confirm() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var usePromise = arguments.length > 1 ? arguments[1] : undefined;
      return this.open(_objectSpread(_objectSpread({
        okText: defaultOKRendererID,
        cancelText: defaultCancelRendererID
      }, props), {}, {
        variant: 'confirm'
      }), usePromise);
    }
  }, {
    key: "alert",
    value: function alert() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var usePromise = arguments.length > 1 ? arguments[1] : undefined;
      return this.open(_objectSpread(_objectSpread({
        okText: defaultOKRendererID
      }, props), {}, {
        variant: 'alert'
      }), usePromise);
    }
  }, {
    key: "info",
    value: function info(props, usePromise) {
      return this.open(_objectSpread(_objectSpread({}, props), {}, {
        variant: 'info'
      }), usePromise);
    }
  }, {
    key: "getPromise",
    value: function getPromise(id) {
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

      var currentLocale = this._deps.locale.currentLocale;
      return (0, _ramda.map)(function (_ref7) {
        var _this4$_rendererRegis, _this4$_rendererRegis2, _this4$_rendererRegis3, _this4$_rendererRegis4, _this4$_rendererRegis5, _this4$_rendererRegis6, _ref8, _this4$_rendererRegis7, _ref9, _this4$_rendererRegis8;

        var id = _ref7.id,
            _onOK3 = _ref7.onOK,
            onCancel = _ref7.onCancel,
            title = _ref7.title,
            content = _ref7.content,
            footer = _ref7.footer,
            okText = _ref7.okText,
            cancelText = _ref7.cancelText,
            _ref7$titleProps = _ref7.titleProps,
            titleProps = _ref7$titleProps === void 0 ? {} : _ref7$titleProps,
            _ref7$contentProps = _ref7.contentProps,
            contentProps = _ref7$contentProps === void 0 ? {} : _ref7$contentProps,
            _ref7$footerProps = _ref7.footerProps,
            footerProps = _ref7$footerProps === void 0 ? {} : _ref7$footerProps,
            variant = _ref7.variant,
            handlerIDs = _ref7.handlerIDs,
            props = _objectWithoutProperties(_ref7, ["id", "onOK", "onCancel", "title", "content", "footer", "okText", "cancelText", "titleProps", "contentProps", "footerProps", "variant", "handlerIDs"]);

        var uiProps = _objectSpread(_objectSpread({}, props), {}, {
          key: id,
          onOK: function onOK() {
            return _this4._onOK(id, _onOK3);
          },
          onExited: function onExited() {
            return _this4._onExited(id);
          }
        });

        if (onCancel || cancelText) {
          uiProps.onCancel = function () {
            return _this4._onCancel(id, onCancel);
          };
        }

        var renderedTitle = (_this4$_rendererRegis = (_this4$_rendererRegis2 = _this4._rendererRegister.get(title)) === null || _this4$_rendererRegis2 === void 0 ? void 0 : _this4$_rendererRegis2(_objectSpread(_objectSpread({
          currentLocale: currentLocale
        }, _this4._rehydrateFunctions(id, titleProps, handlerIDs)), {}, {
          onOK: uiProps.onOK,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis !== void 0 ? _this4$_rendererRegis : title;
        uiProps.title = variant === 'info' ? _this4._rendererRegister.get(infoTitleRendererID)({
          title: renderedTitle,
          onOK: uiProps.onOK,
          currentLocale: currentLocale
        }) : renderedTitle;
        uiProps.content = (_this4$_rendererRegis3 = (_this4$_rendererRegis4 = _this4._rendererRegister.get(content)) === null || _this4$_rendererRegis4 === void 0 ? void 0 : _this4$_rendererRegis4(_objectSpread(_objectSpread({
          currentLocale: currentLocale
        }, _this4._rehydrateFunctions(id, contentProps, handlerIDs)), {}, {
          onOK: uiProps.onOK,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis3 !== void 0 ? _this4$_rendererRegis3 : content;
        uiProps.footer = variant === 'info' ? null : (_this4$_rendererRegis5 = (_this4$_rendererRegis6 = _this4._rendererRegister.get(footer)) === null || _this4$_rendererRegis6 === void 0 ? void 0 : _this4$_rendererRegis6(_objectSpread(_objectSpread({
          currentLocale: currentLocale
        }, _this4._rehydrateFunctions(id, footerProps, handlerIDs)), {}, {
          onOK: uiProps.onOK,
          onCancel: uiProps.onCancel
        }))) !== null && _this4$_rendererRegis5 !== void 0 ? _this4$_rendererRegis5 : footer;
        uiProps.okText = (_ref8 = (_this4$_rendererRegis7 = _this4._rendererRegister.get(okText)) === null || _this4$_rendererRegis7 === void 0 ? void 0 : _this4$_rendererRegis7({
          currentLocale: currentLocale,
          onOK: uiProps.onOK,
          onCancel: uiProps.onCancel
        })) !== null && _ref8 !== void 0 ? _ref8 : okText;
        uiProps.cancelText = (_ref9 = (_this4$_rendererRegis8 = _this4._rendererRegister.get(cancelText)) === null || _this4$_rendererRegis8 === void 0 ? void 0 : _this4$_rendererRegis8({
          currentLocale: currentLocale,
          onOK: uiProps.onOK,
          onCancel: uiProps.onCancel
        })) !== null && _ref9 !== void 0 ? _ref9 : cancelText;
        return uiProps;
      }, this._modals);
    }
  }]);

  return ModalUI;
}(_core.RcUIModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_modals", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_addModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeModal", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_genericHandler", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_genericHandler"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onOK", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onOK"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onExited", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onExited"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCancel", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCancel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "open", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "open"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "close", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "close"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirm", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "confirm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alert", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "info", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "modals", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "modals"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPromise", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPromise"), _class2.prototype)), _class2)) || _class);
exports.ModalUI = ModalUI;
//# sourceMappingURL=ModalUI.js.map
