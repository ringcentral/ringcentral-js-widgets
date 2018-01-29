'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _getFeedbackReducer = require('./getFeedbackReducer');

var _getFeedbackReducer2 = _interopRequireDefault(_getFeedbackReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @class
 * @description user feedback module
 */
var Feedback = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Feedback, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   */
  function Feedback(_ref) {
    var auth = _ref.auth,
        storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'storage']);
    (0, _classCallCheck3.default)(this, Feedback);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Feedback.__proto__ || (0, _getPrototypeOf2.default)(Feedback)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._storageKey = 'feedback';
    _this._storage = storage;
    _this._reducer = (0, _getFeedbackReducer2.default)(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer2.default)(_this.actionTypes);
    _this._storage.registerReducer({ key: _this._storageKey, reducer: _this._cacheReducer });
    return _this;
  }

  (0, _createClass3.default)(Feedback, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._auth.ready && this._storage.ready && !this.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if ((!this._auth.ready || !this._storage.ready) && this.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: 'updateEmail',
    value: function updateEmail(email) {
      this.store.dispatch({
        type: this.actionTypes.updateEmail,
        value: email
      });
    }
  }, {
    key: 'updateTopic',
    value: function updateTopic(topic) {
      this.store.dispatch({
        type: this.actionTypes.updateTopic,
        value: topic
      });
    }
  }, {
    key: 'updateSubject',
    value: function updateSubject(subjectText) {
      this.store.dispatch({
        type: this.actionTypes.updateSubject,
        value: subjectText
      });
    }
  }, {
    key: 'updateDescription',
    value: function updateDescription(descriptionText) {
      this.store.dispatch({
        type: this.actionTypes.updateDescription,
        value: descriptionText
      });
    }
  }, {
    key: 'clean',
    value: function clean() {
      this.store.dispatch({
        type: this.actionTypes.clean
      });
    }
  }, {
    key: 'sendFeedback',
    value: function sendFeedback(mailToUrl) {
      window.location.href = mailToUrl;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'data',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'email',
    get: function get() {
      return this.data.email;
    }
  }, {
    key: 'topic',
    get: function get() {
      return this.data.topic;
    }
  }, {
    key: 'subject',
    get: function get() {
      return this.data.subject;
    }
  }, {
    key: 'description',
    get: function get() {
      return this.data.description;
    }
  }]);
  return Feedback;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'updateEmail', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateEmail'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateTopic', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateTopic'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateSubject', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateSubject'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateDescription', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateDescription'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'clean', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'clean'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'sendFeedback', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'sendFeedback'), _class2.prototype)), _class2)) || _class);
exports.default = Feedback;
//# sourceMappingURL=index.js.map
