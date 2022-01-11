import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import { BlockItem } from '../Block';
import { Deps, GetBlockUIProps } from './BlockUI.interface';

@Module({
  name: 'BlockUI',
  deps: ['Block'],
})
export class BlockUI extends RcUIModuleV2<Deps> {
  @computed((that: BlockUI) => [that._deps.block.blocks])
  get block(): BlockItem {
    const { blocks } = this._deps.block;
    return blocks.length > 0 ? blocks[0] : null;
  }

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps(props: GetBlockUIProps) {
    return {
      block: this.block,
      ...props,
    };
  }

  getUIFunctions() {
    return {};
  }
}
