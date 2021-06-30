import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  Deps,
  ForwardUIProps,
  ForwardUIFunctions,
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
    const { activeCallControl, routerInteraction } = this._deps;
    return {
      async onForward(phoneNumber: string, telephonySessionId: string) {
        const result = await activeCallControl.forward(
          phoneNumber,
          telephonySessionId,
        );
        if (result) {
          routerInteraction.goBack();
        }
      },
      onBackClick() {
        routerInteraction.goBack();
      },
    };
  }
}
