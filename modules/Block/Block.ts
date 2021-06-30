import {
  action,
  computed,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import * as uuid from 'uuid';

import { BlockItem, DepsModules, IBlock } from './Block.interface';

type ModalMappingType = Record<string, BlockItem>;

@Module({
  name: 'Block',
  deps: [{ dep: 'BlockOptions', optional: true }],
})
export class Block extends RcModuleV2<DepsModules> implements IBlock {
  @state
  blockIds: string[] = [];

  @state
  blockMapping: ModalMappingType = {};

  @computed((that: Block) => [that.blockIds, that.blockMapping])
  get blocks() {
    return this.blockIds.map((id) => this.blockMapping[id]);
  }

  @action
  private _setListItem(id: string, data: BlockItem) {
    this.blockIds.push(id);
    this.blockMapping[id] = data;
  }

  @action
  private _removeListItem(id: string) {
    this.blockIds = this.blockIds.filter((blockId) => blockId !== id);
    delete this.blockMapping[id];
  }

  @action
  private _clearAllItem() {
    this.blockIds.length = 0;
    this.blockMapping = {};
  }

  /**
   * block view with `SpinnerOverlay`
   * @param props props for show in `SpinnerOverlay`
   */
  block(props: BlockItem = {}) {
    const id = this._getId();

    this._setListItem(id, props);

    return id;
  }

  /**
   * that will unblock one of pass id
   * @param id for unblock id
   */
  unblock(id: string) {
    this._removeListItem(id);
  }

  /**
   * Show block and wait for call back method complete that block will auto close
   * @param cb the method you want to wait for complete
   */
  async next(cb: Function) {
    const id = this.block();
    try {
      await cb();
    } finally {
      this.unblock(id);
    }
  }

  /**
   * clear all block item, and unblock view
   */
  unblockAll() {
    this._clearAllItem();
  }

  private _getId() {
    return uuid.v4();
  }
}
