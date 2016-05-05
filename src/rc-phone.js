import RcBase from './lib/rc-base';
import RingCentral from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import Subscription from './modules/subscription';
import Brand from './modules/brand';
import Auth from './modules/auth';
import User from './modules/user';

/**
 * @class RcPhone
 * Default RingCentral phone class, provide feature complete ringcentral phone without UI.
 * Application builders can directly use RcBase and build their own phone class if they need
 * different sets of modules.
 */
export default class RcPhone extends RcBase {
  constructor({
    sdkSettings: {
      appKey,
      appSecret,
      cachePrefix = 'rc',
      server,
    },
    brandSettings, // TODO: should we default to rcus?
  }) {
    super();

    this.addModule('sdk', new RingCentral({
      appKey,
      appSecret,
      cachePrefix: `${cachePrefix}`,
      server,
    }));

    const client = new RingCentralClient(this.sdk);
    this.addModule('client', client);

    this.addModule('brand', new Brand(brandSettings));
    this.addModule('auth', new Auth({
      ...this,
      platform: this.sdk.platform(),
    }));

    this.addModule('subscription', new Subscription({
      ...this,
    }));

    this.addModule('user', new User(client));
  }
}
