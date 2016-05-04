import RcBase from './lib/rc-base';
import RingCentral from 'ringcentral';
import Subscription from './modules/subscription';
import Brand from './modules/brand';
import Auth from './modules/auth';

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

    this.addModule('brand', new Brand(brandSettings));
    this.addModule('auth', new Auth({
      ...this,
      platform: this.sdk.platform(),
    }));

    this.addModule('subscription', new Subscription({
      ...this,
    }));
  }
}
