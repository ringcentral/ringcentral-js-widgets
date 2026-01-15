"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usm = exports.subscriptionsKey = exports.storeKey = exports.stateKey = exports.identifierKey = exports.bootstrappedKey = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
var usm = exports.usm = 'USM-REDUX';
var storeKey = exports.storeKey = Symbol('store');
var subscriptionsKey = exports.subscriptionsKey = Symbol('subscriptions');
var stateKey = exports.stateKey = Symbol('state');
var bootstrappedKey = exports.bootstrappedKey = Symbol('bootstrapped');
var identifierKey = exports.identifierKey = Symbol('identifier');
//# sourceMappingURL=constant.js.map
