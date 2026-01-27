import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  PluginModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import { SpringSpinnerOverlay } from '@ringcentral-integration/next-widgets/components';
import { SpinnerOverlay } from '@ringcentral-integration/next-widgets/components/SpinnerOverlay';
import { RcPortal } from '@ringcentral/juno';
import React, { PropsWithChildren } from 'react';
import { finalize, Observable, of, switchMap, tap } from 'rxjs';
import { v4 } from 'uuid';

import type { BlockItem, BlockPluginOptions } from './Block.plugin.interface';

@injectable({
  name: 'BlockPlugin',
})
export class BlockPlugin extends PluginModule {
  @state
  blockIds: string[] = [];

  @state
  blockMapping: Record<string, BlockItem> = {};

  @computed((that: BlockPlugin) => [that.blockIds, that.blockMapping])
  get blocks() {
    return this.blockIds.map((id) => this.blockMapping[id]);
  }

  @computed((that: BlockPlugin) => [that.blocks])
  get currentBlock(): BlockItem | null {
    const blocks = this.blocks;
    return blocks[0] ?? null;
  }

  constructor(
    @optional('BlockPluginOptions')
    protected _blockPluginOptions?: BlockPluginOptions,
  ) {
    super();
  }

  /**
   * block view with `SpinnerOverlay`
   * @param props props for show in `SpinnerOverlay`
   */
  block(props: BlockItem = {}) {
    const id = v4();

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
  async next<T extends () => Promise<unknown>>(cb: T) {
    const id = this.block();
    const result = await cb().finally(() => {
      this.unblock(id);
    });

    return result as ReturnType<T>;
  }

  next$<T>(obs: Observable<T>, props?: BlockItem): Observable<T> {
    let id: string;

    return of(null).pipe(
      tap(() => (id = this.block(props))),
      switchMap(() => obs),
      finalize(() => this.unblock(id)),
    );
  }

  /**
   * clear all block item, and unblock view
   */
  unblockAll() {
    this._clearAllItem();
  }

  @action
  private __setListItem(id: string, data: BlockItem) {
    this.blockIds.push(id);
    this.blockMapping[id] = data;
  }

  @delegate('server')
  private async _setListItem(id: string, data: BlockItem) {
    this.__setListItem(id, data);
  }

  @action
  private __removeListItem(id: string) {
    this.blockIds = this.blockIds.filter((blockId) => blockId !== id);
    delete this.blockMapping[id];
  }

  @delegate('server')
  private async _removeListItem(id: string) {
    this.__removeListItem(id);
  }

  @action
  private __clearAllItem() {
    this.blockIds.length = 0;
    this.blockMapping = {};
  }

  @delegate('server')
  private async _clearAllItem() {
    this.__clearAllItem();
  }

  override provider = ({ children }: PropsWithChildren<{}>) => {
    const currentBlock = useConnector(() => this.currentBlock);

    const Component =
      process.env.THEME_SYSTEM === 'spring-ui'
        ? SpringSpinnerOverlay
        : SpinnerOverlay;

    const BlockPanel = this._blockPluginOptions?.component || Component;

    return (
      <>
        {children}
        <RcPortal>
          <BlockPanel
            {...currentBlock}
            loading={!!currentBlock}
            keepMounted={false}
          >
            {null}
          </BlockPanel>
        </RcPortal>
      </>
    );
  };
}
