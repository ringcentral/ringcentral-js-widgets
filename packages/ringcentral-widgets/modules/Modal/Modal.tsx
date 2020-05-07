import {
  action,
  computed,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import uuid from 'uuid';

import {
  AlertModalProps,
  ConfirmModalProps,
  DepsModules,
  ModalItem,
  ModalMappingType,
  State,
} from './Modal.interface';

type ModalState = RcModuleState<Modal, State>;

@Module({
  name: 'Modal',
  deps: [],
})
export class Modal extends RcModuleV2<DepsModules, ModalState> {
  @storage
  @state
  modalIds: string[] = [];

  @state
  modalMapping: ModalMappingType = {};

  @computed
  modals: ModalItem[] = [
    () => this.modalIds,
    () => this.modalMapping,
    (modalIds: string[], modalMapping: ModalMappingType) =>
      modalIds.map((id) => modalMapping[id]),
  ] as any;

  @action
  private _setListItem(id: string, data: ModalItem) {
    if (data.open) {
      this.state.modalIds.push(id);
    }
    this.state.modalMapping[id] = data;
  }

  private _close(id: string) {
    if (this.modalMapping[id]) {
      this._setListItem(id, { ...this.modalMapping[id], open: false });
    }
  }

  @action
  private _removeListItem(id: string) {
    this.state.modalIds = this.state.modalIds.filter(
      (modalId) => modalId !== id,
    );
    delete this.state.modalMapping[id];
  }

  alert(props: AlertModalProps) {
    const id = this._getId();
    return this._open(id, props);
  }

  /**
   * ### This will be a `promise method`, resolve when `onOK` complete.
   */
  alertSync({ onOK, ...rest }: AlertModalProps) {
    return new Promise<string>((resolve) => {
      const id = this.alert({
        ...rest,
        onOK: async (e) => {
          await onOK(e);
          resolve(id);
        },
      });
    });
  }

  confirm({ onCancel, ...rest }: ConfirmModalProps) {
    const id = this._getId();
    return this._open(id, {
      cancelText: 'cancel',
      onCancel: (e) => {
        if (onCancel) onCancel(e);
        this._close(id);
      },
      ...rest,
    });
  }

  /**
   * ### This will be a `promise method`, resolve when `onOK` or `onCancel` complete.
   */
  confirmSync({ onCancel, onOK, ...rest }: ConfirmModalProps) {
    return new Promise<string>((resolve) => {
      const id = this.confirm({
        ...rest,
        onOK: async (e) => {
          await onOK(e);
          resolve(id);
        },
        onCancel: (e) => {
          if (onCancel) onCancel(e);
          resolve(null);
        },
      });
    });
  }

  close(id: string) {
    this._close(id);
  }

  private _open(id: string, { onOK, ...rest }: ModalItem) {
    this._setListItem(id, {
      // default modal props
      disableBackdropClick: true,
      fullScreen: false,
      open: true,
      size: 'xsmall',
      okText: 'ok',
      ...rest,
      onOK: (e) => {
        onOK(e);
        this._close(id);
      },
      onExited: () => {
        this._removeListItem(id);
      },
    });
    return id;
  }

  private _getId() {
    return uuid.v4();
  }
}
