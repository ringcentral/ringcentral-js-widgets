export function updateQueues(
  stateManagementInboundQueues,
  fetchedInboundQueues,
) {
  return fetchedInboundQueues.map((inboundQueue) => {
    const persistenceExistThisQueue = stateManagementInboundQueues.find(
      (queue) => queue.gateId === inboundQueue.gateId,
    );
    if (persistenceExistThisQueue) return persistenceExistThisQueue;
    return inboundQueue;
  });
}
