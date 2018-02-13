'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getUserGuideReducer = require('./getUserGuideReducer');

var _getUserGuideReducer2 = _interopRequireDefault(_getUserGuideReducer);

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

var UserGuide = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', 'Webphone', 'RolesAndPermissions', { dep: 'UserGuideOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(UserGuide, _RcModule);

  function UserGuide(_ref) {
    var auth = _ref.auth,
        storage = _ref.storage,
        webphone = _ref.webphone,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'storage', 'webphone', 'rolesAndPermissions']);
    (0, _classCallCheck3.default)(this, UserGuide);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UserGuide.__proto__ || (0, _getPrototypeOf2.default)(UserGuide)).call(this, (0, _extends3.default)({
      actionTypes: _actionTypes2.default
    }, options)));

    _this._auth = auth;
    _this._storage = storage;
    _this._webphone = webphone;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._reducer = (0, _getUserGuideReducer2.default)(_this.actionTypes);

    _this._context = options.context;

    _this._storageKey = 'userGuide';
    _this._guideReducer = (0, _getUserGuideReducer.getGuidesReducer)(_this.actionTypes);
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._guideReducer
    });
    return _this;
  }

  (0, _createClass3.default)(UserGuide, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.pending && this._auth.ready && this._storage.ready && this._rolesAndPermissions.ready && this._auth.loggedIn)) {
                  _context.next = 6;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 4;
                return this.initUserGuide();

              case 4:
                _context.next = 7;
                break;

              case 6:
                if (this.ready && (!this._auth.ready || !this._storage.ready || !this._rolesAndPermissions.ready)) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }

              case 7:
                // When there is an incoming call,
                // the guide should be dismissed
                if (this._webphone.ready && this._webphone.ringSession && this._webphone.ringSession !== this._lastRingSession) {
                  this._lastRingSession = this._webphone.ringSession;
                  this.updateCarousel({ curIdx: 0, entered: false, playing: false });
                }

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()

    /**
     * Using webpack `require.context` to load guides files.
     * Image files will be ordered by file name ascendingly.
     */

  }, {
    key: 'resolveGuides',
    value: function resolveGuides() {
      var _this3 = this;

      if (this._context && typeof this._context === 'function') {
        return this._context.keys().sort().map(function (key) {
          return _this3._context(key);
        });
      }
      return [];
    }
  }, {
    key: 'loadGuides',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(guides) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (guides) {
                  this.store.dispatch({
                    type: this.actionTypes.loadGuides,
                    guides: guides
                  });
                }

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadGuides(_x) {
        return _ref3.apply(this, arguments);
      }

      return loadGuides;
    }()
  }, {
    key: 'updateCarousel',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5) {
        var curIdx = _ref5.curIdx,
            entered = _ref5.entered,
            playing = _ref5.playing;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateCarousel,
                  curIdx: curIdx,
                  entered: entered,
                  playing: playing
                });

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateCarousel(_x2) {
        return _ref4.apply(this, arguments);
      }

      return updateCarousel;
    }()
  }, {
    key: 'initUserGuide',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var prevGuides, guides;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._rolesAndPermissions.hasUserGuidePermission) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                // eslint-disable-next-line
                prevGuides = this.guides;
                guides = this.resolveGuides();
                // Determine if it needs to be displayed when first log in,
                // the principles behind this is to use webpack's file hash,
                // i.e. if any of the guide files is changed, the file name hash
                // will be changed as well, in this case, it will be displayed.

                _context4.next = 6;
                return this.loadGuides(guides);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initUserGuide() {
        return _ref6.apply(this, arguments);
      }

      return initUserGuide;
    }()
  }, {
    key: 'start',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Start guides only when images are ready
                if (this.guides.length > 0) {
                  this.store.dispatch({
                    type: this.actionTypes.updateCarousel,
                    curIdx: 0,
                    entered: true,
                    playing: true
                  });
                }

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function start() {
        return _ref7.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'guides',
    get: function get() {
      if (!this._storage.ready) return [];
      var guides = this._storage.getItem(this._storageKey);
      if (guides && Array.isArray(guides)) return guides;
      return [];
    }
  }, {
    key: 'carouselState',
    get: function get() {
      return this.state.carouselState;
    }
  }, {
    key: 'started',
    get: function get() {
      return this.carouselState.entered && this.carouselState.playing;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return UserGuide;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'loadGuides', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadGuides'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateCarousel', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateCarousel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'initUserGuide', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'initUserGuide'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'start', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'start'), _class2.prototype)), _class2)) || _class);
exports.default = UserGuide;
//# sourceMappingURL=index.js.map
