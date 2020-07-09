import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { DepsModules, GetModalUIProps } from './ModalUI.interface';

@Module({
  name: 'ModalUI',
  deps: ['Modal'],
})
export class ModalUI extends RcUIModuleV2<DepsModules> {
  constructor({ modal }) {
    super({
      modules: {
        modal,
      },
    });
  }

  getUIProps(props?: GetModalUIProps) {
    return {
      modals: this._modules.modal.getModals(),
      ...props,
    };
  }

  getUIFunctions() {
    return {};
  }
}
