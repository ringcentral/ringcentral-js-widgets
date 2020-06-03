"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvRequeueCall = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _EvTypeError = require("../../lib/EvTypeError");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var EvRequeueCall = (_dec = (0, _di.Module)({
  name: 'EvRequeueCall',
  deps: ['EvClient', 'Storage', 'ActiveCallControl', 'EvAuth', 'Alert', {
    dep: 'EvRequeueCallOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvRequeueCall, _RcModuleV);

  var _super = _createSuper(EvRequeueCall);

  function EvRequeueCall(_ref) {
    var _this;

    var evClient = _ref.evClient,
        storage = _ref.storage,
        activeCallControl = _ref.activeCallControl,
        evAuth = _ref.evAuth,
        alert = _ref.alert,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvRequeueCall);

    _this = _super.call(this, {
      modules: {
        evClient: evClient,
        storage: storage,
        activeCallControl: activeCallControl,
        evAuth: evAuth,
        alert: alert
      },
      enableCache: enableCache,
      storageKey: 'EvRequeueCall'
    });

    _initializerDefineProperty(_this, "selectedQueueGroupId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "selectedGateId", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "stayOnCall", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "requeuing", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvRequeueCall, [{
    key: "setStatus",
    value: function setStatus(_ref2) {
      var selectedQueueGroupId = _ref2.selectedQueueGroupId,
          selectedGateId = _ref2.selectedGateId,
          stayOnCall = _ref2.stayOnCall,
          requeuing = _ref2.requeuing;
      this.state.selectedQueueGroupId = selectedQueueGroupId !== null && selectedQueueGroupId !== void 0 ? selectedQueueGroupId : this.selectedQueueGroupId;
      this.state.selectedGateId = selectedGateId !== null && selectedGateId !== void 0 ? selectedGateId : this.selectedGateId;
      this.state.stayOnCall = stayOnCall !== null && stayOnCall !== void 0 ? stayOnCall : this.stayOnCall;
      this.state.requeuing = requeuing !== null && requeuing !== void 0 ? requeuing : this.requeuing;
    }
  }, {
    key: "requeueCall",
    value: function () {
      var _requeueCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var loadingId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.setStatus({
                  requeuing: true
                });
                loadingId = this._modules.alert.info({
                  message: _enums.requeueEvents.START,
                  loading: true
                });
                _context.next = 5;
                return this._modules.evClient.requeueCall({
                  maintain: this.stayOnCall,
                  queueId: this.selectedGateId
                });

              case 5:
                result = _context.sent;

                if (!(result.status === 'FAILURE')) {
                  _context.next = 8;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: 'Requeue'
                });

              case 8:
                if (!this.stayOnCall) {
                  _context.next = 11;
                  break;
                }

                _context.next = 11;
                return this._modules.activeCallControl.hold();

              case 11:
                this._modules.alert.success({
                  message: _enums.requeueEvents.SUCCESS
                });

                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);

                this._modules.alert.danger({
                  message: _enums.requeueEvents.FAILURE
                });

                throw new _EvTypeError.EvTypeError({
                  type: _enums.requeueEvents.FAILURE
                });

              case 18:
                _context.prev = 18;
                this.setStatus({
                  requeuing: false
                });

                this._modules.alert.dismiss(loadingId);

                return _context.finish(18);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14, 18, 22]]);
      }));

      function requeueCall() {
        return _requeueCall.apply(this, arguments);
      }

      return requeueCall;
    }()
  }, {
    key: "checkAllowRequeue",
    value: function checkAllowRequeue(currentCall) {
      var result = true;

      if (!currentCall.endedCall) {
        if (!currentCall.allowRequeue) {
          result = false;
        } else if (!this._modules.evAuth.agentPermissions.allowCrossQueueRequeue && currentCall.callType === 'OUTBOUND' && currentCall.requeueType === 'ADVANCED') {
          result = false;
        } else if (!this._hasRequeueQueues(currentCall)) {
          result = false;
        }
      }

      return result;
    }
  }, {
    key: "_hasRequeueQueues",
    value: function _hasRequeueQueues(currentCall) {
      var result = false;

      if (currentCall.requeueType === 'ADVANCED') {
        var queues = this._modules.evAuth.availableQueues;
        result = queues && queues.length > 0;
      } else {
        var shortcuts = currentCall.requeueShortcuts;
        result = shortcuts && shortcuts.length > 0;
      }

      return result;
    }
  }]);

  return EvRequeueCall;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedQueueGroupId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedGateId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "requeuing", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setStatus"), _class2.prototype)), _class2)) || _class);
exports.EvRequeueCall = EvRequeueCall;
//# sourceMappingURL=EvRequeueCall.js.map
