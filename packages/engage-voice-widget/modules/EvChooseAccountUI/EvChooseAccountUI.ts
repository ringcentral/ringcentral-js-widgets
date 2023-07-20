import { Module } from '@ringcentral-integration/commons/lib/di';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type {
  EvChooseAccountUIFunctions,
  EvChooseAccountUIProps,
} from '../../interfaces/EvChooseAccountUI.interface';
import type { ChooseAccountUI, Deps } from './EvChooseAccountUI.interface';

@Module({
  name: 'ChooseAccountUI',
  deps: ['EvClient', 'Locale', 'RouterInteraction', 'EvAuth', 'Block'],
})
class EvChooseAccountUI extends RcUIModuleV2<Deps> implements ChooseAccountUI {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  async _onAccountItemClick(agentId: string) {
    await this._deps.block.next(async () => {
      this._deps.evAuth.setAgentId(agentId);
      await this._deps.evAuth.openSocketWithSelectedAgentId({
        syncOtherTabs: true,
        retryOpenSocket: true,
      });
    });
  }

  getUIProps(): EvChooseAccountUIProps {
    return {
      currentLocale: this._deps.locale.currentLocale,
      agents: this._deps.evAuth.authenticateResponse.agents,
    };
  }

  getUIFunctions(): EvChooseAccountUIFunctions {
    return {
      onAccountItemClick: (agentId) => this._onAccountItemClick(agentId),
    };
  }
}
export { EvChooseAccountUI };
