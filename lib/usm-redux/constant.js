"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usm = exports.subscriptionsKey = exports.storeKey = exports.stateKey = exports.identifierKey = exports.bootstrappedKey = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

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
