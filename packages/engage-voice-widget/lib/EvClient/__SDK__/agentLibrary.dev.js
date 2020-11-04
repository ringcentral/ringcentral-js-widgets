import SIP from 'sip.js';

import SDK from './agentLibrary';

// Close Logger in development,
SDK.prototype.openConsoleLogger = () => {};

const noLog = () => localStorage?.getItem('__SIP_NO_LOG__');

// in develop mode, close log for webRTC
class NoLogUA extends SIP.UA {
  constructor(option) {
    super({
      ...option,
      log: {
        // eslint-disable-next-line eqeqeq
        builtinEnabled: !(noLog() == 'true'),
      },
    });
  }
}

SIP.UA = NoLogUA;

export default SDK;
