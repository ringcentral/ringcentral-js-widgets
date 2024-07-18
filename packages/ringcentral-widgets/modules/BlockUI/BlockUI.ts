import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import type { BlockItem } from '../Block';

import type { Deps, GetBlockUIProps } from './BlockUI.interface';

@Module({
  name: 'BlockUI',
  deps: ['Block'],
})
export class BlockUI extends RcUIModuleV2<Deps> {
  @computed((that: BlockUI) => [that._deps.block.blocks])
  get block(): BlockItem {
    const { blocks } = this._deps.block;
    // @ts-expect-error TS(2322): Type 'SpinnerOverlayProps | null' is not assignabl... Remove this comment to see the full error message
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
