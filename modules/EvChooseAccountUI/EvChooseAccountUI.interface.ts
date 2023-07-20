import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Block } from '@ringcentral-integration/widgets/modules/Block';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvClient } from '../../lib/EvClient';
import type { EvAuth } from '../EvAuth';

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
