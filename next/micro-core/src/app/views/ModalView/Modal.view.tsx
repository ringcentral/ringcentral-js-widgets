/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  action,
  autobind,
  computed,
  DehydratedPortal,
  delegate,
  injectable,
  PortalHost,
  PortalInstance,
  RcViewModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import { RcDialogContentText, RcDialogTitle } from '@ringcentral/juno';
import { find, findIndex, map } from 'ramda';
import React, { useCallback } from 'react';

import type {
  ModalCreatorOptions,
  ModalDehydratedPortal,
} from './Modal.view.interface';
import type {
  ModalItemProps,
  ModalOnCancelType,
  ModalOnCloseType,
} from './ModalItemView';
import { ModalItemPanel } from './ModalItemView';

const DEFAULT_EXIT_TIMEOUT = 195;

export type ModalViewProps = Partial<ModalItemProps>;

export type ModalItemViewProps = ModalItemProps & {
  modal: ModalDehydratedPortal;
};

@injectable({
  name: 'ModalView',
})
export class ModalView extends RcViewModule {
  @state
  private _modals: Record<string, any>[] = [];

  constructor(private _portalHost: PortalHost) {
    super();
  }

  /**
   * create a modal instance for using in multiple tab.
   *
   * @param options target view and props
   * @returns modal instance
   *
   * @example
   * ```tsx
   * modal = this._modalView.create({
   *  view: this._homeView, // view with ModalRef implement
   *  props: () => ({
   *    disableBackdropClick: false,
   *    onClose: (e, reason) => {
   *      console.log('onClose', reason);
   *    },
   *    onCancel: (e, reason) => {
   *      console.log('onCancel', reason);
   *    },
   *    onConfirm: () => {
   *      console.log('onConfirm');
   *    },
   *    onExited: () => {
   *      console.log('onExited');
   *    },
   *  }),
   *});
   * ```
   * ## that must be done before or inside constructor, we must keep that instance otherwise when in multiple tab mode can't find target modal anymore.
   *
   */
  create<T extends Record<string, any> = Record<string, any>>(
    options: ModalCreatorOptions<T>,
  ) {
    const modalInstance = new DehydratedPortal<ModalCreatorOptions<T>, T>(
      options,
      {
        autoDisableBackdropClick: true,
        disableBackdropClick: true,
        fullScreen: false,
      },
    );

    return modalInstance;
  }

  /**
   * open target modal cross multiple tabs
   *
   * ```ts
   * this._modalView.open(modalInstance, {
   *    value: 'some value you want to pass once, those once pass will never be update during this modal open'
   * })
   * ```
   * @param modalInstance host modal instance
   * @param payload JSON data pass to modal, data must be `serializable`.
   */
  open<T extends ModalDehydratedPortal<any> = ModalDehydratedPortal>(
    modalInstance: T,
    payload?: T['payload'],
  ): PortalInstance {
    const instance = this._portalHost.open(modalInstance, payload, (...args) =>
      this._addModal(...args),
    );

    return {
      ...instance,
      close: () => {
        this.close(instance.id);
      },
    };
  }
  /**
   * close target modal cross multiple tabs
   *
   * ```ts
   * // remove target id modal
   * this._ModalView.close(id)
   * // remove all target modal type modals
   * this._ModalView.close(modalInstance)
   * ```
   */
  async close(value: string | DehydratedPortal<any, any, any>) {
    await this._portalHost.close(this._modals, value, (id, reason) =>
      this._close(id, reason),
    );
  }

  @action
  closeAll() {
    this._modals = [];
  }

  @delegate('server')
  private async _close(id: string, reason?: ModalOnCloseType) {
    if (reason) {
      await this._emitClose(id, reason);
    }
    const dehydratedState = find((item) => item.id === id, this._modals);
    if (!dehydratedState) {
      return false;
    }
    const updatedState = {
      ...dehydratedState,
      open: false,
    };

    this._updateModal(updatedState);

    return true;
  }

  @action
  private _innerAddModal(modalState: Record<string, any>) {
    this._modals.push(modalState);
  }

  @delegate('server')
  private async _addModal(
    id: string,
    type: string,
    payload: Record<string, any>,
  ) {
    this._portalHost.setIdTypeMap(id, type);

    const modalInstance = this.getMap(id);
    const dehydratedState = modalInstance?.getDehydrateState(id, payload);

    this._innerAddModal({ ...dehydratedState, open: true, payload });
  }

  @action
  private _updateModal(modalState: Record<string, any>) {
    const idx = findIndex((item) => item.id === modalState.id, this._modals);
    if (idx === -1) {
      throw new Error(`modal id "${modalState.id} not found`);
    }
    this._modals[idx] = Object.assign(this._modals[idx], modalState);
  }

  @action
  private _removeModal(id: string) {
    const index = findIndex((item) => item.id === id, this._modals);

    if (index !== -1) {
      this._modals.splice(index, 1);
    }
  }

  @action
  private _setLoading(id: string, loading: boolean) {
    const modalState = find((item) => item.id === id, this._modals);
    if (!modalState) return;

    const loadingMode = modalState.loadingMode;

    if (loadingMode === 'none') return;

    const idx = findIndex((item) => item.id === id, this._modals);
    switch (loadingMode) {
      case 'overlap':
        this._modals[idx].loadingOverlay = loading;
        return;
      case 'button':
      default:
        this._modals[idx].loading = loading;
        break;
    }
  }

  @delegate('server')
  private async _onConfirm(id: string, data?: Record<string, any>) {
    const modalInstance = this.getMap(id);

    // here we assume the handler is async and set the loading status
    // detecting whether the handler is async or not is unreliable and can be dangerous
    // for most non-async functions the loading status will occur too briefly
    // so that the UI will not really render the loading status at all
    this._setLoading(id, true);

    const handler = modalInstance?.handlerRegister.get('onConfirm');

    if (handler) {
      // even though we add extra error handling here, handlers are expected to handle all its errors
      // this is only a best-effort attempt to not let a modal block usage if the handler threw error
      try {
        if ((await handler()) === false) {
          this._setLoading(id, false);
          return;
        }
      } catch (err) {
        // if handler has unhandled error, at least remove the loading state so the modal could
        // still be closed by the user if cancel button is provided.
        this._setLoading(id, false);
        throw err;
      }
    }

    this._close(id, 'confirmClick');
    await this._portalHost.resolveFn(id, data ?? true);
  }

  @delegate('server')
  private async _onExited(id: string, onExited: string) {
    await this._callOnEvent(id, onExited);

    this._removeModal(id);
    this._portalHost.clearTimer(id);
  }

  @delegate('server')
  private async _callOnEvent(id: string, eventName: string, ...args: any[]) {
    const modal = this.getMap(id);

    modal?.handlerRegister.get(eventName)?.(...args);
  }

  @delegate('server')
  private async _onCancel(
    id: string,
    onCancel?: string,
    reason?: ModalOnCancelType,
  ) {
    const modal = this.getMap(id);
    modal?.handlerRegister.get(onCancel!)?.({}, reason);

    // when trigger by escapeKeyDown or backdropClick will auto trigger onClose event, that handler in there.
    if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') {
      this._close(id, reason);
    }

    await this._portalHost.resolveFn(id, false);
  }

  @delegate('server')
  private async _onClose(id: string, reason: ModalOnCloseType) {
    this._emitClose(id, reason);

    await this._portalHost.resolveFn(id, null);

    this._close(id);
  }

  private async _emitClose(id: string, reason: string) {
    await this._callOnEvent(id, 'onClose', {}, reason);

    this.waitModalExist(id);
  }

  @delegate('server')
  private async waitModalExist(id: string) {
    const dehydratedState = find((item) => item.id === id, this._modals);
    if (!dehydratedState) return;

    const timeout = dehydratedState.TransitionProps?.timeout;

    const exitTimeout =
      typeof timeout === 'number'
        ? timeout
        : timeout?.exit ?? DEFAULT_EXIT_TIMEOUT;

    // not using onExited, just using timeout for run that timer only inside worker

    try {
      await this._portalHost.startTimer(id, exitTimeout);
      this._onExited(id, 'onExited');
    } catch (error) {
      // cancel be ignored
    }
  }

  private getMap(id: string) {
    return this._portalHost.getMap(id);
  }

  @computed((that: ModalView) => [that._modals])
  get modals() {
    return map(({ id, open, onCancel, loadingOverlay, loading, payload }) => {
      const uiProps: Partial<ModalItemProps> = {
        id,
        open,
        loadingOverlay,
        loading,
        payload,
        onConfirm: (e) => {
          const notSerializable =
            e instanceof Event ||
            // spring-ui is not pass the nativeEvent, so we need to check that
            e?.nativeEvent instanceof Event ||
            typeof e !== 'object';

          this._onConfirm(
            id,
            // only allow to pass event object, if that is event object, should not pass that to modal handler, that need serializable data.
            notSerializable ? undefined : e,
          );
        },
        onCancel: (e, reason) => {
          this._onCancel(id, onCancel, reason);
        },
        onClose: (e, reason) => {
          this._onClose(id, reason);
        },
      };

      return uiProps;
    }, this._modals);
  }

  @autobind
  private Item({ modal, payload, ...props }: ModalItemViewProps) {
    const ViewModule = modal.options.view;

    const isComponent = typeof ViewModule === 'function';

    const {
      TitleProps,
      header: headerText,
      content,
      footer,
      ...modalProps
    } = useConnector(() => {
      return modal.getPureProps(payload || {});
    });
    // footer
    // content
    const DefaultHeader = useCallback(
      () => <RcDialogTitle {...TitleProps}>{headerText}</RcDialogTitle>,
      [TitleProps, headerText],
    );
    const { header } = (isComponent ? undefined : ViewModule) || {};

    const nonHeaderText = headerText === null;
    const nonHeader =
      nonHeaderText || (isComponent ? undefined : ViewModule?.header) === null;

    const Header = header ?? DefaultHeader;

    const nonFooter =
      footer === null ||
      (isComponent ? undefined : ViewModule?.footer) === null;
    const footerNode =
      !nonFooter && !isComponent && ViewModule?.footer ? (
        <ViewModule.footer />
      ) : null;

    return (
      <ModalItemPanel
        {...props}
        {...modalProps}
        payload={payload}
        headerText={headerText}
        footerText={footer}
        header={nonHeader ? null : nonHeaderText ? undefined : <Header />}
        footer={nonFooter ? null : nonFooter ? undefined : footerNode}
      >
        {ViewModule ? (
          isComponent ? (
            <ViewModule />
          ) : (
            <ViewModule.component />
          )
        ) : (
          <RcDialogContentText>{content}</RcDialogContentText>
        )}
      </ModalItemPanel>
    );
  }

  override component(inputProps: ModalViewProps) {
    const modals = useConnector(() => this.modals);

    return (
      <>
        {modals.map(({ open, id, ...props }) => {
          const modal = this.getMap(id!)!;

          // deprecated props throw error directly
          if (process.env.NODE_ENV !== 'production' && (props as any).size) {
            throw new Error(
              '[ModalPanel] that size props are be deprecated, please use maxWidth',
            );
          }

          return (
            <this.Item
              id={id}
              {...inputProps}
              key={id!}
              {...props}
              open={open!}
              modal={modal}
            />
          );
        })}
      </>
    );
  }
}
