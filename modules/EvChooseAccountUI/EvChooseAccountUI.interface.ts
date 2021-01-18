import Locale from 'ringcentral-integration/modules/Locale';
import { Block } from 'ringcentral-widgets/modules/Block';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  evAuth: EvAuth;
  evClient: EvClient;
  block: Block;
}

export interface ChooseAccountUI {
  //
}
