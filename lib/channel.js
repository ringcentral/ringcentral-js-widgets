"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Channel = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Channel = /*#__PURE__*/function () {
  function Channel(type) {
    _classCallCheck(this, Channel);

    this._mux = void 0;
    this._type = void 0;
    // action -> handler
    this._mux = {};
    this._type = type;

    this._make();
  }

  _createClass(Channel, [{
    key: "select",
    value: function select(actionType, handler) {
      this._mux[actionType] = handler;
      return this;
    }
  }, {
    key: "send",
    value: function send(packet) {
      var _this = this;

      return new Promise(function (resolve) {
        chrome.runtime.sendMessage(_objectSpread({
          type: _this._type
        }, packet), resolve);
      });
    }
  }, {
    key: "broadcast",
    value: function broadcast(packet) {
      var _this2 = this;

      var promises = [];
      chrome.tabs.query({}, function (tabs) {
        if (!tabs.length) return;
        tabs.forEach(function (tab) {
          promises.push(new Promise(function (resolve) {
            chrome.tabs.sendMessage(tab.id, _objectSpread({
              type: _this2._type
            }, packet), resolve);
          }));
        });
      });
      return Promise.all(promises);
    }
  }, {
    key: "_make",
    value: function _make() {
      var _this3 = this;

      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var type = request.type,
            action = request.action;

        if (type === _this3._type) {
          var handler = _this3._mux[action];

          if (typeof handler === 'function') {
            Promise.resolve(handler(request, sender)).then(function (retval) {
              sendResponse(retval);
            })["catch"](function (err) {
              return console.error(err);
            }); // Async

            return true;
          }
        }

        return false;
      });
    }
  }]);

  return Channel;
}();

exports.Channel = Channel;
//# sourceMappingURL=channel.js.map
