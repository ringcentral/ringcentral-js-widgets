"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _requeueEvents$FAILUR;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_requeueEvents$FAILUR = {}, _defineProperty(_requeueEvents$FAILUR, _enums.requeueEvents.FAILURE, 'Call queue transfer is failed'), _defineProperty(_requeueEvents$FAILUR, _enums.requeueEvents.START, 'Call queue transfer in progress'), _defineProperty(_requeueEvents$FAILUR, _enums.requeueEvents.SUCCESS, 'Call queue transfer is completed'), _requeueEvents$FAILUR);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
