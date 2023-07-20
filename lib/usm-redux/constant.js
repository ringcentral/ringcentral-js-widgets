"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usm = exports.subscriptionsKey = exports.storeKey = exports.stateKey = exports.identifierKey = exports.bootstrappedKey = void 0;
var usm = 'USM-REDUX';
exports.usm = usm;
var storeKey = Symbol('store');
exports.storeKey = storeKey;
var subscriptionsKey = Symbol('subscriptions');
exports.subscriptionsKey = subscriptionsKey;
var stateKey = Symbol('state');
exports.stateKey = stateKey;
var bootstrappedKey = Symbol('bootstrapped');
exports.bootstrappedKey = bootstrappedKey;
var identifierKey = Symbol('identifier');
exports.identifierKey = identifierKey;
//# sourceMappingURL=constant.js.map
