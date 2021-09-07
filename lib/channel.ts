type Handler = (request: any, sender: any) => void;

type Packet = {
  [s: string]: any;
};
class Channel {
  _mux: {
    [k: string]: Handler;
  };
  _type: string;
  constructor(type: string) {
    // action -> handler
    this._mux = {};
    this._type = type;
    this._make();
  }

  select(actionType: string, handler: Handler) {
    this._mux[actionType] = handler;
    return this;
  }

  send(packet: Packet) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: this._type, ...packet }, resolve);
    });
  }

  broadcast(packet: Packet) {
    const promises: Promise<any>[] = [];
    chrome.tabs.query({}, (tabs) => {
      if (!tabs.length) return;
      tabs.forEach((tab) => {
        promises.push(
          new Promise((resolve) => {
            chrome.tabs.sendMessage(
              tab.id,
              { type: this._type, ...packet },
              resolve,
            );
          }),
        );
      });
    });
    return Promise.all(promises);
  }

  _make() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      const { type, action } = request;
      if (type === this._type) {
        const handler = this._mux[action];
        if (typeof handler === 'function') {
          Promise.resolve(handler(request, sender))
            .then((retval) => {
              sendResponse(retval);
            })
            .catch((err) => console.error(err));
          // Async
          return true;
        }
      }
      return false;
    });
  }
}

export { Channel };
