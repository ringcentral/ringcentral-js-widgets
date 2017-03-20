'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

exports.default = autoBind;
exports.bindFunctionTo = bindFunctionTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoBind(prototype, property, descriptor) {
  descriptor.value._autoBind = true;
  return descriptor;
}

function bindFunctionTo(self) {
  var proto = (0, _getPrototypeOf2.default)(self);

  while (proto !== Object.prototype) {
    (0, _getOwnPropertyNames2.default)(proto).forEach(function (key) {
      if (typeof self[key] === 'function' && self[key]._autoBind) {
        self[key] = self[key].bind(self);
      }
    });
    proto = (0, _getPrototypeOf2.default)(proto);
  }
}
//# sourceMappingURL=index.js.map
