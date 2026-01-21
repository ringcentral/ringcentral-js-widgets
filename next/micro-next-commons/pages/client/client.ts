// TODO: fix transport
// import AdapterCore from '@ringcentral-integration/widgets/lib/AdapterCore';
import MessageTransport from '@ringcentral-integration/commons/lib/MessageTransport';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import messageTypes from '@ringcentral-integration/widgets/lib/AdapterCore/baseMessageTypes';

/* global config */

function createFrame(
  {
    src,
    id,
    version,
    width = '100%',
    height = '100%',
    position = 'absolute',
  }: any,
  document: any,
) {
  const app = document.createElement('iframe');
  app.id = id;
  app.src = src;
  app.width = width;
  app.height = height;
  app.setAttribute(
    'style',
    `overflow:hidden;height:${height};width:${width};position:${position};`,
  );
  app.setAttribute('version', version);
  app.setAttribute('allow', 'microphone');
  app.setAttribute('frameborder', '0');
  return app;
}

// TODO: extends AdapterCore
class Adapter {
  _app: any;
  _config: any;
  _global: any;
  _immediate: any;
  _messageTransport: any;
  _messageTypes: any;
  constructor({ config, global, immediate = true }: any) {
    this._messageTypes = ObjectMap.prefixValues(messageTypes, config.prefix);
    this._config = config;
    this._global = global;
    this._immediate = immediate;
    if (this._immediate) {
      this._init();
    }
  }

  _init() {
    this._inject();
    this._createTransport();
  }

  _createTransport() {
    this._messageTransport = new MessageTransport({
      targetWindow: this._app.contentWindow,
      origin: this._config.origin,
    });
    this._messageTransport.addListeners({
      request: async ({ requestId, payload }: any) => {
        const result = await this._request(payload);
        this._messageTransport.response({ requestId, result });
      },
    });
  }

  async _request(payload: any) {
    let result;
    if (payload) {
      switch (payload.type) {
        case this._messageTypes.logCall:
          result = await this._logCall(payload);
          break;
        default:
          break;
      }
    }
    return result;
  }

  _inject() {
    this._app = createFrame(
      {
        src: this._config.origin,
        id: this._config.prefix,
        version: this._config.version,
      },
      this._global.document,
    );
    this._global.document.body.appendChild(this._app);
  }

  async _logCall({ number }: any) {
    console.log('_logCall', number);
    return 'success';
  }

  async register({ serviceName }: any) {
    const payload = {
      type: 'register',
      service: {
        name: serviceName,
        registerContactMatch: true,
        registerActivityMatch: true,
      },
    };
    await this._messageTransport.request({ payload });
  }

  async clickToDial(number: any) {
    const payload = {
      type: 'clickToDial',
      number,
    };
    const result = await this._messageTransport.request({ payload });
    console.log('clickToDial result', result);
  }
}

const client = new Adapter({
  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
  config,
  global: window,
  immediate: true,
});

// @ts-expect-error TS(2551): Property '_client' does not exist on type 'Window ... Remove this comment to see the full error message
window._client = client;
