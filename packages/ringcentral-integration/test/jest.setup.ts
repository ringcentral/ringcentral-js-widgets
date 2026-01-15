global.chrome = global.chrome ?? {
  runtime: {
    onMessage: {
      addListener: (listener: unknown) => {},
      removeListener: (listener: unknown) => {},
    },
    sendMessage: (message: unknown) => {},
  },
  tabs: {
    query: (queryInfo: chrome.tabs.QueryInfo) => {},
    sendMessage: (tabId: number, message: unknown) => {},
  },
};
global.MediaStream = jest.fn().mockReturnValue(true);
global.RTCPeerConnection = jest.fn().mockReturnValue(true);
