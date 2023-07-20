"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;
require("regenerator-runtime/runtime");
var uuid = _interopRequireWildcard(require("uuid"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var Block = (_dec = (0, _di.Module)({
  name: 'Block',
  deps: [{
    dep: 'BlockOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.blockIds, that.blockMapping];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Block, _RcModuleV);
  var _super = _createSuper(Block);
  function Block() {
    var _this;
    _classCallCheck(this, Block);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _initializerDefineProperty(_this, "blockIds", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "blockMapping", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Block, [{
    key: "_setListItem",
    value: function _setListItem(id, data) {
      this.blockIds.push(id);
      this.blockMapping[id] = data;
    }
  }, {
    key: "_removeListItem",
    value: function _removeListItem(id) {
      this.blockIds = this.blockIds.filter(function (blockId) {
        return blockId !== id;
      });
      delete this.blockMapping[id];
    }
  }, {
    key: "_clearAllItem",
    value: function _clearAllItem() {
      this.blockIds.length = 0;
      this.blockMapping = {};
    }
    /**
     * block view with `SpinnerOverlay`
     * @param props props for show in `SpinnerOverlay`
     */
  }, {
    key: "block",
    value: function block() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var id = this._getId();
      this._setListItem(id, props);
      return id;
    }
    /**
     * that will unblock one of pass id
     * @param id for unblock id
     */
  }, {
    key: "unblock",
    value: function unblock(id) {
      this._removeListItem(id);
    }
    /**
     * Show block and wait for call back method complete that block will auto close
     * @param cb the method you want to wait for complete
     */
  }, {
    key: "next",
    value: function () {
      var _next2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cb) {
        var id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = this.block();
                _context.prev = 1;
                _context.next = 4;
                return cb();
              case 4:
                _context.prev = 4;
                this.unblock(id);
                return _context.finish(4);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1,, 4, 7]]);
      }));
      function next(_x) {
        return _next2.apply(this, arguments);
      }
      return next;
    }()
    /**
     * clear all block item, and unblock view
     */
  }, {
    key: "unblockAll",
    value: function unblockAll() {
      this._clearAllItem();
    }
  }, {
    key: "_getId",
    value: function _getId() {
      return uuid.v4();
    }
  }, {
    key: "blocks",
    get: function get() {
      var _this2 = this;
      return this.blockIds.map(function (id) {
        return _this2.blockMapping[id];
      });
    }
  }]);
  return Block;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "blockIds", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blockMapping", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "blocks", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "blocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setListItem", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeListItem", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearAllItem", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearAllItem"), _class2.prototype)), _class2)) || _class);
exports.Block = Block;
//# sourceMappingURL=Block.js.map
