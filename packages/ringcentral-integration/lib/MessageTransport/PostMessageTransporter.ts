import BasicTransporter from './BasicTransporter';

export class PostMessageTransporter extends BasicTransporter {
  addReceiver = (receiveMessage: any, { useCapture = false } = {}) => {
    window.addEventListener('message', receiveMessage, useCapture);
  };

  createEmitter = (sendTarget: Window) => {
    // Always specify an exact target origin, not *,
    // when you use postMessage to send data to other windows.
    // A malicious site can change the location of the window without your knowledge,
    // and therefore it can intercept the data sent using postMessage.
    return (message: string, { targetOrigin = '*', callback } = {} as any) => {
      sendTarget.postMessage(message, targetOrigin);
      if (typeof callback === 'function') callback();
    };
  };
}
