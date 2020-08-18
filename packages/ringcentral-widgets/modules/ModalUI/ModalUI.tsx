import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { DepModules, DepOptions, GetModalUIProps } from './ModalUI.interface';

@Module({
  name: 'ModalUI',
  deps: ['Modal'],
})
export class ModalUI extends RcUIModuleV2<DepModules> {
  constructor(deps: DepOptions) {
    super({
      deps,
    });
  }

  getUIProps(props?: GetModalUIProps) {
    return {
      modals: this._deps.modal.modals,
      ...props,
    };
  }

  getUIFunctions() {
    return {};
  }
}
