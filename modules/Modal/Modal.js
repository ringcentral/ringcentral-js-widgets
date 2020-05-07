"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.filter");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _uuid = _interopRequireDefault(require("uuid"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Modal = (_dec = (0, _di.Module)({
  name: 'Modal',
  deps: []
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModuleV) {
  _inherits(Modal, _RcModuleV);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "modalIds", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "modalMapping", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "modals", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Modal, [{
    key: "_setListItem",
    value: function _setListItem(id, data) {
      if (data.open) {
        this.state.modalIds.push(id);
      }

      this.state.modalMapping[id] = data;
    }
  }, {
    key: "_close",
    value: function _close(id) {
      if (this.modalMapping[id]) {
        this._setListItem(id, _objectSpread({}, this.modalMapping[id], {
          open: false
        }));
      }
    }
  }, {
    key: "_removeListItem",
    value: function _removeListItem(id) {
      this.state.modalIds = this.state.modalIds.filter(function (modalId) {
        return modalId !== id;
      });
      delete this.state.modalMapping[id];
    }
  }, {
    key: "alert",
    value: function alert(props) {
      var id = this._getId();

      return this._open(id, props);
    }
    /**
     * ### This will be a `promise method`, resolve when `onOK` complete.
     */

  }, {
    key: "alertSync",
    value: function alertSync(_ref) {
      var _this2 = this;

      var _onOK = _ref.onOK,
          rest = _objectWithoutProperties(_ref, ["onOK"]);

      return new Promise(function (resolve) {
        var id = _this2.alert(_objectSpread({}, rest, {
          onOK: function onOK(e) {
            return regeneratorRuntime.async(function onOK$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(_onOK(e));

                  case 2:
                    resolve(id);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }
        }));
      });
    }
  }, {
    key: "confirm",
    value: function confirm(_ref2) {
      var _this3 = this;

      var _onCancel = _ref2.onCancel,
          rest = _objectWithoutProperties(_ref2, ["onCancel"]);

      var id = this._getId();

      return this._open(id, _objectSpread({
        cancelText: 'cancel',
        onCancel: function onCancel(e) {
          if (_onCancel) _onCancel(e);

          _this3._close(id);
        }
      }, rest));
    }
    /**
     * ### This will be a `promise method`, resolve when `onOK` or `onCancel` complete.
     */

  }, {
    key: "confirmSync",
    value: function confirmSync(_ref3) {
      var _this4 = this;

      var _onCancel2 = _ref3.onCancel,
          _onOK2 = _ref3.onOK,
          rest = _objectWithoutProperties(_ref3, ["onCancel", "onOK"]);

      return new Promise(function (resolve) {
        var id = _this4.confirm(_objectSpread({}, rest, {
          onOK: function onOK(e) {
            return regeneratorRuntime.async(function onOK$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(_onOK2(e));

                  case 2:
                    resolve(id);

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          },
          onCancel: function onCancel(e) {
            if (_onCancel2) _onCancel2(e);
            resolve(null);
          }
        }));
      });
    }
  }, {
    key: "close",
    value: function close(id) {
      this._close(id);
    }
  }, {
    key: "_open",
    value: function _open(id, _ref4) {
      var _this5 = this;

      var _onOK3 = _ref4.onOK,
          rest = _objectWithoutProperties(_ref4, ["onOK"]);

      this._setListItem(id, _objectSpread({
        // default modal props
        disableBackdropClick: true,
        fullScreen: false,
        open: true,
        size: 'xsmall',
        okText: 'ok'
      }, rest, {
        onOK: function onOK(e) {
          _onOK3(e);

          _this5._close(id);
        },
        onExited: function onExited() {
          _this5._removeListItem(id);
        }
      }));

      return id;
    }
  }, {
    key: "_getId",
    value: function _getId() {
      return _uuid["default"].v4();
    }
  }]);

  return Modal;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "modalIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "modalMapping", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "modals", [_core.computed], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.modalIds;
    }, function () {
      return _this6.modalMapping;
    }, function (modalIds, modalMapping) {
      return modalIds.map(function (id) {
        return modalMapping[id];
      });
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setListItem", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeListItem", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeListItem"), _class2.prototype)), _class2)) || _class);
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map
