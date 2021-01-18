"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallDisposition = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

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

require("core-js/modules/es6.array.find");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var EvCallDisposition = (_dec = (0, _di.Module)({
  name: 'EvCallDisposition',
  deps: ['Storage', 'EvCallMonitor', 'EvCallHistory', 'EvClient', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'EvCallDispositionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallDisposition, _RcModuleV);

  var _super = _createSuper(EvCallDisposition);

  function EvCallDisposition(deps) {
    var _this;

    _classCallCheck(this, EvCallDisposition);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvCallDisposition'
    });

    _initializerDefineProperty(_this, "callsMapping", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "dispositionStateMapping", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvCallDisposition, [{
    key: "setDisposition",
    value: function setDisposition(id, data) {
      this.callsMapping[id] = data;
    }
  }, {
    key: "removeDisposition",
    value: function removeDisposition(id) {
      delete this.callsMapping[id];
    }
  }, {
    key: "setDispositionState",
    value: function setDispositionState(id, disposed) {
      this.dispositionStateMapping[id] = disposed;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._deps.evCallMonitor.onCallAnswered(function (call) {
        if (call.outdialDispositions) {
          var disposition = call.outdialDispositions.dispositions.find(function (_ref) {
            var isDefault = _ref.isDefault;
            return isDefault;
          });

          var id = _this2._deps.evCallMonitor.getCallId(call.session);

          _this2.setDisposition(id, {
            dispositionId: disposition ? disposition.dispositionId : null,
            notes: ''
          });
        }
      });
    }
  }, {
    key: "disposeCall",
    value: function disposeCall(id) {
      var call = this._deps.evCallHistory.callsMapping[id];
      var callDisposition = this.callsMapping[id];
      var isDisposed = this.dispositionStateMapping[id] && this.dispositionStateMapping[id].disposed;
      if (!call.outdialDispositions || isDisposed) return;

      this._deps.evClient.dispositionCall({
        uii: call.uii,
        dispId: callDisposition.dispositionId,
        notes: callDisposition.notes
      });

      this.setDispositionState(id, {
        disposed: true
      });
    }
  }]);

  return EvCallDisposition;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dispositionStateMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDispositionState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDispositionState"), _class2.prototype)), _class2)) || _class);
exports.EvCallDisposition = EvCallDisposition;
//# sourceMappingURL=EvCallDisposition.js.map
