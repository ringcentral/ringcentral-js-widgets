import { Client } from 'ringcentral-client';
import Account from 'ringcentral-client/build/paths/Account';
import ClientInfo from 'ringcentral-client/build/paths/ClientInfo';
import Dictionary from 'ringcentral-client/build/paths/Dictionary';
import Glip from 'ringcentral-client/build/paths/Glip';
import NumberParser from 'ringcentral-client/build/paths/NumberParser';
import Subscription from 'ringcentral-client/build/paths/Subscription';
import PathSegment from 'ringcentral-client/build/PathSegment';

import { SDK } from '@ringcentral/sdk';

// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
class RestPrefix extends PathSegment {
  constructor(service: SDK) {
    super('restapi/v1.0', null, null, service);
  }
}

class RingCentralClient extends Client {
  restPrefix() {
    return new RestPrefix(this.service.platform());
  }

  account(id?: string): Account {
    return new Account(this.restPrefix(), id, this.service.platform());
  }

  clientInfo(id?: string): ClientInfo {
    return new ClientInfo(this.restPrefix(), id, this.service.platform());
  }

  dictionary(id?: string): Dictionary {
    return new Dictionary(this.restPrefix(), id, this.service.platform());
  }

  numberParser(id?: string): NumberParser {
    return new NumberParser(this.restPrefix(), id, this.service.platform());
  }

  subscription(id?: string): Subscription {
    return new Subscription(this.restPrefix(), id, this.service.platform());
  }

  glip(id?: string) {
    return new Glip(this.restPrefix(), id, this.service.platform());
  }
}

export { RingCentralClient };
