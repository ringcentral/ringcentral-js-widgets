'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _defineProperty4 = require('babel-runtime/helpers/defineProperty');

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2, _descriptor;

var _RcModule2 = require('ringcentral-integration/lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('ringcentral-integration/lib/di');

var _getter = require('ringcentral-integration/lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _reselect = require('reselect');

var _getCallLogSectionReducer = require('./getCallLogSectionReducer');

var _getCallLogSectionReducer2 = _interopRequireDefault(_getCallLogSectionReducer);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty3.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var CallLogSection = (_dec = (0, _di.Module)({
  name: 'CallLogSection',
  deps: ['Storage']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(CallLogSection, _RcModule);

  function CallLogSection(_ref) {
    var storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage']);
    (0, _classCallCheck3.default)(this, CallLogSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallLogSection.__proto__ || (0, _getPrototypeOf2.default)(CallLogSection)).call(this, (0, _extends3.default)({
      storage: storage,
      actionTypes: _actionTypes2.default
    }, options)));

    _initDefineProp(_this, 'calls', _descriptor, _this);

    _this._storage = storage;
    _this._storageReducer = (0, _getStorageReducer2.default)(_this.actionTypes);
    _this._storageKey = 'callLogSection';
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._storageReducer
    });
    _this._reducer = (0, _getCallLogSectionReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(CallLogSection, [{
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._storage.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !this._storage.ready && this.ready;
    }
  }, {
    key: '_showCallLogSection',
    value: function _showCallLogSection() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
          _ref3 = (0, _slicedToArray3.default)(_ref2, 1),
          call = _ref3[0];

      if (call && !this.show) {
        this.showLogSection(call.sessionId);
      }
    }
  }, {
    key: 'updateCall',
    value: function updateCall(_ref4, sessionId) {
      var task = _ref4.task,
          call = (0, _objectWithoutProperties3.default)(_ref4, ['task']);

      this.store.dispatch({
        type: this.actionTypes.update,
        call: call,
        task: task,
        sessionId: sessionId
      });
    }
  }, {
    key: 'logCall',
    value: function logCall(_ref5) {
      var sessionId = _ref5.sessionId;

      var loggedCall = {
        isSaved: true,
        isLogged: true,
        isSaving: false
      };
      this.store.dispatch({
        type: this.actionTypes.update,
        call: loggedCall,
        sessionId: sessionId
      });
    }
  }, {
    key: 'showLogSection',
    value: function showLogSection(sessionId) {
      this.store.dispatch({
        type: this.actionTypes.showLogSection,
        sessionId: sessionId
      });
    }
  }, {
    key: 'hideLogSection',
    value: function hideLogSection() {
      if (this.show) {
        this.store.dispatch({
          type: this.actionTypes.hideLogSection
        });
      }
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'callsMapping',
    get: function get() {
      return this._storage.getItem(this._storageKey).calls;
    }
  }, {
    key: 'tasksMapping',
    get: function get() {
      return this._storage.getItem(this._storageKey).tasks;
    }
  }, {
    key: 'currentSessionId',
    get: function get() {
      return this._storage.getItem(this._storageKey).currentSessionId;
    }
  }, {
    key: 'show',
    get: function get() {
      return this._storage.getItem(this._storageKey).show;
    }
  }]);
  return CallLogSection;
}(_RcModule3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'calls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return (0, _reselect.createSelector)(function () {
      return _this2.callsMapping;
    }, function () {
      return _this2.tasksMapping;
    }, function (callsMapping, tasksMapping) {
      return (0, _entries2.default)(callsMapping).reduce(function (calls, _ref6) {
        var _ref7 = (0, _slicedToArray3.default)(_ref6, 2),
            sessionId = _ref7[0],
            call = _ref7[1];

        return (0, _assign2.default)(calls, (0, _defineProperty5.default)({}, sessionId, (0, _extends3.default)({}, call, {
          task: tasksMapping[sessionId]
        })));
      }, {});
    });
  }
})), _class2)) || _class);
exports.default = CallLogSection;
//# sourceMappingURL=index.js.map
