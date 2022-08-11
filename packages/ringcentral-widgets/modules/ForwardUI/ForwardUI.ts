import { Module } from '@ringcentral-integration/commons/lib/di';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import {
  Deps,
  ForwardUIFunctions,
  ForwardUIProps,
} from './ForwardUI.interface';

@Module({
  name: 'ForwardUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'ActiveCallControl',
    'RouterInteraction',
    { dep: 'ForwardUIOptions', optional: true },
  ],
})
export class ForwardUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    telephonySessionId,
  }: {
    telephonySessionId: string;
  }): ForwardUIProps {
    return {
      telephonySessionId,
      currentLocale: this._deps.locale?.currentLocale,
    };
  }

  getUIFunctions(): ForwardUIFunctions {
    return {
      onForward: async (phoneNumber: string, telephonySessionId: string) => {
        const result = await this._deps.activeCallControl.forward(
          phoneNumber,
          telephonySessionId,
        );
        if (result) {
          this._deps.routerInteraction.goBack();
        }
      },
      onBackClick: () => {
        this._deps.routerInteraction.goBack();
      },
    };
  }
}
