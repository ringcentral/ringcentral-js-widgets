import RingCentral from 'ringcentral';
import Wrapper from './wrapper';


/**
 * @class Sdk
 * wrapper around RingCentral official js sdk.
 */
export default class Sdk extends Wrapper {
  constructor ({
    appKey,
    appSecret,
    cachePrefix = 'rc',
    server,
    storage, //allow defining storage options when newing sdk objects
  }) {

    //temperarily change localStorage option during sdk object instantiation
    let tmp = RingCentral.core.Externals.localStorage;
    if(storage) {
      RingCentral.Externals.localStorage = storage;
    }
    let sdkInstance = new RingCentral({
      appKey,
      appSecret,
      cachePrefix: `${cachePrefix}-`,
      server
    });

    //return localStorage options after instantiation
    if(storage) {
      RingCentral.core.Externals.localStorage = tmp;
    }
    super(sdkInstance);
  }
}
