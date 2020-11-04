"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RCV_WAITING_ROOM_MODE_REVERSE = exports.RCV_WAITING_ROOM_MODE = exports.ASSISTED_USERS_MYSELF = void 0;
var ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';
exports.ASSISTED_USERS_MYSELF = ASSISTED_USERS_MYSELF;
var RCV_WAITING_ROOM_MODE = {
  off: 0,
  all: 1,
  guests: 2,
  notcoworker: 3
};
exports.RCV_WAITING_ROOM_MODE = RCV_WAITING_ROOM_MODE;
var RCV_WAITING_ROOM_MODE_REVERSE = {
  0: 'all',
  1: 'all',
  2: 'guests',
  3: 'notcoworker'
};
exports.RCV_WAITING_ROOM_MODE_REVERSE = RCV_WAITING_ROOM_MODE_REVERSE;
//# sourceMappingURL=constants.js.map
