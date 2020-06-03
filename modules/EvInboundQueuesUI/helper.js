"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueues = updateQueues;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

function updateQueues(stateManagementInboundQueues, fetchedInboundQueues) {
  return fetchedInboundQueues.map(function (inboundQueue) {
    var persistenceExistThisQueue = stateManagementInboundQueues.find(function (queue) {
      return queue.gateId === inboundQueue.gateId;
    });
    if (persistenceExistThisQueue) return persistenceExistThisQueue;
    return inboundQueue;
  });
}
//# sourceMappingURL=helper.js.map
