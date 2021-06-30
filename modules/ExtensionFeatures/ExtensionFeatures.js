"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionFeatures = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _subscriptionHints = require("../../enums/subscriptionHints");

var _di = require("../../lib/di");

var _DataFetcherV = require("../DataFetcherV2");

var _dec, _dec2, _class, _class2;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ExtensionFeatures = (_dec = (0, _di.Module)({
  name: 'ExtensionFeatures',
  deps: ['Client', 'DataFetcherV2', {
    dep: 'Subscription',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionFeaturesOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionFeatures, _DataFetcherV2Consume);

  var _super = _createSuper(ExtensionFeatures);

  function ExtensionFeatures(deps) {
    var _deps$extensionFeatur, _deps$extensionFeatur2;

    var _this;

    _classCallCheck(this, ExtensionFeatures);

    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = null;

    _this._handleSubscription = function (message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body;

      if (_this.ready && (_this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = _this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.hints) && (message.body.hints.includes(_subscriptionHints.subscriptionHints.limits) || message.body.hints.includes(_subscriptionHints.subscriptionHints.features) || message.body.hints.includes(_subscriptionHints.subscriptionHints.permissions))) {
        _this.fetchData();
      }
    };

    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({
      polling: (_deps$extensionFeatur = (_deps$extensionFeatur2 = deps.extensionFeaturesOptions) === null || _deps$extensionFeatur2 === void 0 ? void 0 : _deps$extensionFeatur2.polling) !== null && _deps$extensionFeatur !== void 0 ? _deps$extensionFeatur : true
    }, deps.extensionFeaturesOptions), {}, {
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._deps.client.service.platform().get('/restapi/v1.0/account/~/extension/~/features');

                case 2:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        var _this$_deps$subscript, _this$_deps$subscript2;

        return (_this$_deps$subscript = (_this$_deps$subscript2 = _this._deps.subscription) === null || _this$_deps$subscript2 === void 0 ? void 0 : _this$_deps$subscript2.ready) !== null && _this$_deps$subscript !== void 0 ? _this$_deps$subscript : true;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(ExtensionFeatures, [{
    key: "onInit",
    value: function onInit() {
      var _this2 = this;

      if (this._deps.subscription) {
        this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);

        this._stopWatching = (0, _core.watch)(this, function () {
          return _this2._deps.subscription.message;
        }, this._handleSubscription);
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;

      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "features",
    get: function get() {
      var _this$data$records, _this$data;

      return (0, _ramda.reduce)(function (features, item) {
        features[item.id] = item;
        return features;
      }, {}, (_this$data$records = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
    }
  }, {
    key: "CRMFlag",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2;

      return (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionFeaturesOptions) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.CRMFlag) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : 'SalesForce';
    }
  }, {
    key: "isCRMEnabled",
    get: function get() {
      var _this$features$this$C, _this$features, _this$features$this$C2;

      return (_this$features$this$C = (_this$features = this.features) === null || _this$features === void 0 ? void 0 : (_this$features$this$C2 = _this$features[this.CRMFlag]) === null || _this$features$this$C2 === void 0 ? void 0 : _this$features$this$C2.available) !== null && _this$features$this$C !== void 0 ? _this$features$this$C : false;
    }
  }, {
    key: "isRingOutEnabled",
    get: function get() {
      var _this$features$RingOu, _this$features2, _this$features2$RingO;

      return (_this$features$RingOu = (_this$features2 = this.features) === null || _this$features2 === void 0 ? void 0 : (_this$features2$RingO = _this$features2.RingOut) === null || _this$features2$RingO === void 0 ? void 0 : _this$features2$RingO.available) !== null && _this$features$RingOu !== void 0 ? _this$features$RingOu : false;
    }
  }, {
    key: "isWebPhoneEnabled",
    get: function get() {
      var _this$features$WebPho, _this$features3, _this$features3$WebPh;

      return (_this$features$WebPho = (_this$features3 = this.features) === null || _this$features3 === void 0 ? void 0 : (_this$features3$WebPh = _this$features3.WebPhone) === null || _this$features3$WebPh === void 0 ? void 0 : _this$features3$WebPh.available) !== null && _this$features$WebPho !== void 0 ? _this$features$WebPho : false;
    }
  }, {
    key: "isCallingEnabled",
    get: function get() {
      return this.isRingOutEnabled || this.isWebPhoneEnabled;
    }
  }, {
    key: "hasComposeTextPermission",
    get: function get() {
      var _this$features4, _this$features4$Pages, _this$features5, _this$features5$SMSSe;

      return !!(((_this$features4 = this.features) === null || _this$features4 === void 0 ? void 0 : (_this$features4$Pages = _this$features4.PagesSending) === null || _this$features4$Pages === void 0 ? void 0 : _this$features4$Pages.available) || ((_this$features5 = this.features) === null || _this$features5 === void 0 ? void 0 : (_this$features5$SMSSe = _this$features5.SMSSending) === null || _this$features5$SMSSe === void 0 ? void 0 : _this$features5$SMSSe.available));
    }
  }, {
    key: "hasReadMessagesPermission",
    get: function get() {
      return this.hasReadTextPermission || this.hasVoicemailPermission || this.hasReadFaxPermission;
    }
  }, {
    key: "hasReadTextPermission",
    get: function get() {
      var _this$features6, _this$features6$Pages, _this$features7, _this$features7$SMSRe;

      return !!(((_this$features6 = this.features) === null || _this$features6 === void 0 ? void 0 : (_this$features6$Pages = _this$features6.PagesReceiving) === null || _this$features6$Pages === void 0 ? void 0 : _this$features6$Pages.available) || ((_this$features7 = this.features) === null || _this$features7 === void 0 ? void 0 : (_this$features7$SMSRe = _this$features7.SMSReceiving) === null || _this$features7$SMSRe === void 0 ? void 0 : _this$features7$SMSRe.available));
    }
  }, {
    key: "hasVoicemailPermission",
    get: function get() {
      var _this$features$Voicem, _this$features8, _this$features8$Voice;

      return (_this$features$Voicem = (_this$features8 = this.features) === null || _this$features8 === void 0 ? void 0 : (_this$features8$Voice = _this$features8.Voicemail) === null || _this$features8$Voice === void 0 ? void 0 : _this$features8$Voice.available) !== null && _this$features$Voicem !== void 0 ? _this$features$Voicem : false;
    }
  }, {
    key: "hasReadFaxPermission",
    get: function get() {
      var _this$features$FaxRec, _this$features9, _this$features9$FaxRe;

      return (_this$features$FaxRec = (_this$features9 = this.features) === null || _this$features9 === void 0 ? void 0 : (_this$features9$FaxRe = _this$features9.FaxReceiving) === null || _this$features9$FaxRe === void 0 ? void 0 : _this$features9$FaxRe.available) !== null && _this$features$FaxRec !== void 0 ? _this$features$FaxRec : false;
    }
  }, {
    key: "hasRoomConnectorBeta",
    get: function get() {
      var _this$features$RoomCo, _this$features10, _this$features10$Room;

      return (_this$features$RoomCo = (_this$features10 = this.features) === null || _this$features10 === void 0 ? void 0 : (_this$features10$Room = _this$features10.RoomConnectorBeta) === null || _this$features10$Room === void 0 ? void 0 : _this$features10$Room.available) !== null && _this$features$RoomCo !== void 0 ? _this$features$RoomCo : false;
    }
  }, {
    key: "hasOutboundSMSPermission",
    get: function get() {
      var _this$features$SMSSen, _this$features11, _this$features11$SMSS;

      return (_this$features$SMSSen = (_this$features11 = this.features) === null || _this$features11 === void 0 ? void 0 : (_this$features11$SMSS = _this$features11.SMSSending) === null || _this$features11$SMSS === void 0 ? void 0 : _this$features11$SMSS.available) !== null && _this$features$SMSSen !== void 0 ? _this$features$SMSSen : false;
    }
  }, {
    key: "hasInternalSMSPermission",
    get: function get() {
      var _this$features$PagesS, _this$features12, _this$features12$Page;

      return (_this$features$PagesS = (_this$features12 = this.features) === null || _this$features12 === void 0 ? void 0 : (_this$features12$Page = _this$features12.PagesSending) === null || _this$features12$Page === void 0 ? void 0 : _this$features12$Page.available) !== null && _this$features$PagesS !== void 0 ? _this$features$PagesS : false;
    }
  }, {
    key: "hasMeetingsPermission",
    get: function get() {
      var _this$features$Meetin, _this$features13, _this$features13$Meet;

      return (_this$features$Meetin = (_this$features13 = this.features) === null || _this$features13 === void 0 ? void 0 : (_this$features13$Meet = _this$features13.Meetings) === null || _this$features13$Meet === void 0 ? void 0 : _this$features13$Meet.available) !== null && _this$features$Meetin !== void 0 ? _this$features$Meetin : false;
    }
  }]);

  return ExtensionFeatures;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "features", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "features"), _class2.prototype)), _class2)) || _class);
exports.ExtensionFeatures = ExtensionFeatures;
//# sourceMappingURL=ExtensionFeatures.js.map
