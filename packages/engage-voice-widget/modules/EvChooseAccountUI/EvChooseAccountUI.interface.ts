import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Block } from '@ringcentral-integration/widgets/modules/Block';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

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
