"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = void 0;

require("core-js/modules/es6.object.assign");

var _RcModule = require("../RcModule");

var subscribe = function subscribe(service, listener) {
  if (typeof listener !== 'function') {
    throw new Error("The 'listener' should be a function.");
  }

  if (!(service instanceof _RcModule.RcModuleV2)) {
    throw new Error("The instance should be a RcModuleV2 instance.");
  }

  var unsubscribe;

  if (service._store) {
    var _service$_store;

    unsubscribe = (_service$_store = service._store) === null || _service$_store === void 0 ? void 0 : _service$_store.subscribe(listener);
  } else {
    // When constructing
    var subscriptions = service.__subscriptions__ || [];

    var _unsubscribe;

    subscriptions.push(function () {
      var _service$_store2;

      _unsubscribe = (_service$_store2 = service._store) === null || _service$_store2 === void 0 ? void 0 : _service$_store2.subscribe(listener);
    });

    unsubscribe = function unsubscribe() {
      return _unsubscribe();
    };

    Object.assign(service, {
      __subscriptions__: subscriptions
    });
  }

  return unsubscribe;
};

exports.subscribe = subscribe;
//# sourceMappingURL=subscribe.js.map
