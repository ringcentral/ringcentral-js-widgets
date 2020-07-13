import { createSelector, RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { BlockItem } from '../Block';
import { DepsModules, GetBlockUIProps } from './BlockUI.interface';

@Module({
  name: 'BlockUI',
  deps: ['Block'],
})
export class BlockUI extends RcUIModuleV2<DepsModules> {
  getBlock = createSelector(
    () => this._modules.block.getBlocks(),
    (blocks): BlockItem => {
      return blocks.length > 0 ? blocks[0] : null;
    },
  );

  constructor({ block }) {
    super({
      modules: {
        block,
      },
    });
  }

  getUIProps(props: GetBlockUIProps) {
    return {
      block: this.getBlock(),
      ...props,
    };
  }

  getUIFunctions() {
    return {};
  }
}
