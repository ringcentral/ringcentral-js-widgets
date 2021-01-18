import {
  action,
  computed,
  RcUIModuleV2,
  state,
} from '@ringcentral-integration/core';
import {
  RcDialogHeader,
  RcDialogHeaderActions,
  RcDialogHeaderTitle,
  RcIconButton,
} from '@ringcentral/juno';
import close from '@ringcentral/juno/icon/Close';
import { filter, find, findIndex, map } from 'ramda';
import React from 'react';
import background from 'ringcentral-integration/lib/background';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import { v4 } from 'uuid';

import {
  ModalProps,
  ModalV2UIFunctions,
  ModalV2UIProps,
} from '../../components/ModalV2/interface';
import i18n from './i18n';
import {
  AlertModalOptions,
  ConfirmModalOptions,
  CustomRenderer,
  CustomRendererProps,
  DehydratedModalState,
  Deps,
  HandlerFunction,
  InfoModalOptions,
  ModalOptions,
} from './ModalUI.interface';
export const defaultOKRendererID = 'ModalUI.defaultOKRendererID';
export const defaultCancelRendererID = 'ModalUI.defaultCancelRendererID';
export const infoTitleRendererID = 'ModalUI.infoTitleRendererID';

export const defaultOKRenderer: CustomRenderer = ({ currentLocale }) =>
  i18n.getString('ok', currentLocale);

export const defaultCancelRenderer: CustomRenderer = ({ currentLocale }) =>
  i18n.getString('cancel', currentLocale);

export const infoTitleRenderer: CustomRenderer = ({
  currentLocale,
  onOK,
  title,
}) => (
  <RcDialogHeader>
    <RcDialogHeaderTitle>{title}</RcDialogHeaderTitle>
    <RcDialogHeaderActions overlapSize={2.5}>
      <RcIconButton
        tooltipTitle={i18n.getString('close', currentLocale)}
        symbol={close}
        onClick={onOK}
      />
    </RcDialogHeaderActions>
  </RcDialogHeader>
);
@Module({
  name: 'ModalUI',
  deps: ['Locale'],
})
export class ModalUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this.registerRenderer(defaultOKRendererID, defaultOKRenderer);
    this.registerRenderer(defaultCancelRendererID, defaultCancelRenderer);
    this.registerRenderer(infoTitleRendererID, infoTitleRenderer);
  }

  @state
  private _modals: DehydratedModalState[] = [];

  @action
  private _addModal(modalState: DehydratedModalState) {
    this._modals.push(modalState);
  }

  @action
  private _updateModal(modalState: DehydratedModalState) {
    const idx = findIndex((item) => item.id === modalState.id, this._modals);
    if (idx === -1) {
      throw new Error(`modal id "${modalState.id} not found`);
    }
    this._modals[idx] = modalState;
  }

  @action
  private _removeModal(id: string) {
    this._modals = filter((item) => item.id !== id, this._modals);
  }

  private _rendererRegister = new Map<string, CustomRenderer<any>>();
  private _handlerRegister = new Map<string, Map<string, HandlerFunction>>();
  private _promises = new Map<
    string,
    { promise: Promise<boolean>; resolve: (ok: boolean) => void }
  >();

  @proxify
  private async _genericHandler(id: string, handlerID: string, ...args: any) {
    return this._handlerRegister.get(id)?.get(handlerID)?.(...args);
  }

  @proxify
  private async _onOK(id: string, onOK?: string) {
    const handler = this._handlerRegister.get(id).get(onOK);
    if (handler && (await handler()) === false) {
      return;
    }
    this._promises.get(id).resolve(true);
    this._promises.delete(id);
    this.close(id);
  }

  @proxify
  private async _onExited(id: string) {
    this._promises.get(id)?.resolve(false);
    this._promises.delete(id);
    this._removeModal(id);
    this._handlerRegister.delete(id);
  }

  @proxify
  private async _onCancel(id: string, onCancel?: string) {
    this._handlerRegister.get(id).get(onCancel)?.();
    this.close(id);
  }

  private _registerHandler(id: string, handler: HandlerFunction) {
    const handlerID = v4();
    this._handlerRegister.get(id).set(handlerID, handler);
    return handlerID;
  }

  private _removeHandler(id: string, handlerID: string) {
    this._handlerRegister.get(id).delete(handlerID);
  }

  registerRenderer<T extends CustomRendererProps = CustomRendererProps>(
    id: string,
    renderer: CustomRenderer<T>,
  ) {
    this._rendererRegister.set(id, renderer);
  }

  private _dehydrateFunctions(
    id: string,
    props: any,
    handlerIDs: string[],
    oldProps?: any,
  ): any {
    if (props === null) {
      // check oldProps for existing handlers and remove them
      if (oldProps) {
        for (const key in oldProps) {
          if (Object.prototype.hasOwnProperty.call(oldProps, key)) {
            const idx = handlerIDs.findIndex((id) => id === oldProps[key]);
            if (idx > -1) {
              this._removeHandler(id, oldProps[key]);
              handlerIDs.splice(idx, 1);
            }
          }
        }
      }
      return null;
    }
    const result = { ...oldProps, ...props };
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (typeof props[key] === 'function') {
          // check if old handler exist
          const oldID =
            oldProps &&
            oldProps[key] &&
            find((id) => id === oldProps[key], handlerIDs);
          if (oldID) {
            // replace oldHandler
            this._handlerRegister.get(id).set(oldID, props[key]);
          } else {
            const handlerID = this._registerHandler(id, props[key]);
            handlerIDs.push(handlerID);
            result[key] = handlerID;
          }
        } else if (
          oldProps &&
          Object.prototype.hasOwnProperty.call(oldProps, key)
        ) {
          const idx = handlerIDs.findIndex((id) => id === oldProps[key]);
          if (idx > -1) {
            this._removeHandler(id, oldProps[key]);
            handlerIDs.splice(idx, 1);
          }
        }
      }
    }
    return result;
  }

  private _rehydrateFunctions(id: string, props: any, handlerIDs: string[]) {
    const result = { ...props };
    for (const key in props) {
      if (
        Object.prototype.hasOwnProperty.call(props, key) &&
        findIndex((id) => id === props[key], handlerIDs) > -1
      ) {
        result[key] = (...args: any) =>
          this._genericHandler(id, props[key], ...args);
      }
    }
    return result;
  }

  private _getDehydratedState(
    {
      titleProps,
      contentProps,
      footerProps,
      ...props
    }: Partial<ModalOptions> & {
      id: string;
      open?: boolean;
    },
    oldState?: DehydratedModalState,
  ): DehydratedModalState {
    const handlerIDs = oldState?.handlerIDs?.slice() ?? [];
    const dehydratedState: DehydratedModalState = {
      ...this._dehydrateFunctions(props.id, props, handlerIDs, oldState),
      handlerIDs,
    };
    if (titleProps !== undefined) {
      dehydratedState.titleProps = this._dehydrateFunctions(
        props.id,
        titleProps,
        handlerIDs,
        oldState?.titleProps,
      );
    }
    if (contentProps !== undefined) {
      dehydratedState.contentProps = this._dehydrateFunctions(
        props.id,
        contentProps,
        handlerIDs,
        oldState?.contentProps,
      );
    }
    if (footerProps !== undefined) {
      dehydratedState.footerProps = this._dehydrateFunctions(
        props.id,
        footerProps,
        handlerIDs,
        oldState?.footerProps,
      );
    }
    return dehydratedState;
  }

  public open(props: ModalOptions): string;
  public open(props: ModalOptions, usePromise: true): Promise<boolean>;
  @background
  open(
    { disableBackdropClick = true, fullScreen = false, ...props }: ModalOptions,
    usePromise?: boolean,
  ) {
    const id = v4();
    this._handlerRegister.set(id, new Map<string, HandlerFunction>());
    const dehydratedState = this._getDehydratedState({
      ...props,
      id,
      disableBackdropClick,
      fullScreen,
      open: true,
    });

    this._addModal(dehydratedState);
    let resolveFn;
    const promise = new Promise<boolean>((resolve) => {
      resolveFn = resolve;
    });
    this._promises.set(id, {
      promise,
      resolve: resolveFn,
    });
    return usePromise ? promise : id;
  }

  /**
   *
   * @returns Whether the update is successful.
   */
  @background
  update(props: Partial<ModalOptions> & { id: string }) {
    const oldState = find((item) => item.id === props.id, this._modals);
    if (!oldState) {
      return false;
    }
    const updatedState = this._getDehydratedState(props, oldState);
    this._updateModal(updatedState);
    return true;
  }

  @background
  close(id: string) {
    const dehydratedState = find((item) => item.id === id, this._modals);
    if (!dehydratedState) {
      throw new Error(`modal id "${id} not found`);
    }
    const updatedState = {
      ...dehydratedState,
      open: false,
    };
    this._updateModal(updatedState);
  }

  public confirm(props: ConfirmModalOptions): string;
  public confirm(
    props: ConfirmModalOptions,
    usePromise: true,
  ): Promise<boolean>;
  @background
  confirm(props: ConfirmModalOptions = {}, usePromise?: true) {
    return this.open(
      {
        okText: defaultOKRendererID,
        cancelText: defaultCancelRendererID,
        ...props,
        variant: 'confirm',
      },
      usePromise,
    ) as any;
  }

  public alert(props: AlertModalOptions): string;
  public alert(props: AlertModalOptions, usePromise: true): Promise<boolean>;
  @background
  alert(props: AlertModalOptions = {}, usePromise?: true) {
    return this.open(
      {
        okText: defaultOKRendererID,
        ...props,
        variant: 'alert',
      },
      usePromise,
    ) as any;
  }

  public info(props: InfoModalOptions): string;
  public info(props: InfoModalOptions, usePromise: true): Promise<boolean>;
  @background
  info(props: InfoModalOptions, usePromise?: true) {
    return this.open(
      {
        ...props,
        variant: 'info',
      },
      usePromise,
    ) as any;
  }

  @computed<ModalUI>(({ _modals, _deps: { locale: { currentLocale } } }) => [
    _modals,
    currentLocale,
  ])
  get modals() {
    const currentLocale = this._deps.locale.currentLocale;
    return map(
      ({
        id,
        onOK,
        onCancel,
        title,
        content,
        footer,
        okText,
        cancelText,
        titleProps = {},
        contentProps = {},
        footerProps = {},
        variant,
        handlerIDs,
        ...props
      }) => {
        const uiProps: ModalProps = {
          ...props,
          key: id,
          onOK: () => this._onOK(id, onOK),
          onExited: () => this._onExited(id),
        };
        if (onCancel || cancelText) {
          uiProps.onCancel = () => this._onCancel(id, onCancel);
        }
        const renderedTitle =
          this._rendererRegister.get(title)?.({
            currentLocale,
            ...this._rehydrateFunctions(id, titleProps, handlerIDs),
            onOK: uiProps.onOK,
            onCancel: uiProps.onCancel,
          }) ?? title;
        uiProps.title =
          variant === 'info'
            ? this._rendererRegister.get(infoTitleRendererID)({
                title: renderedTitle,
                onOK: uiProps.onOK,
                currentLocale,
              })
            : renderedTitle;

        uiProps.content =
          this._rendererRegister.get(content)?.({
            currentLocale,
            ...this._rehydrateFunctions(id, contentProps, handlerIDs),
            onOK: uiProps.onOK,
            onCancel: uiProps.onCancel,
          }) ?? content;

        uiProps.footer =
          variant === 'info'
            ? null
            : this._rendererRegister.get(footer)?.({
                currentLocale,
                ...this._rehydrateFunctions(id, footerProps, handlerIDs),
                onOK: uiProps.onOK,
                onCancel: uiProps.onCancel,
              }) ?? footer;

        uiProps.okText =
          (this._rendererRegister.get(okText)?.({
            currentLocale,
            onOK: uiProps.onOK,
            onCancel: uiProps.onCancel,
          }) as string) ?? okText;

        uiProps.cancelText =
          (this._rendererRegister.get(cancelText)?.({
            currentLocale,
            onOK: uiProps.onOK,
            onCancel: uiProps.onCancel,
          }) as string) ?? cancelText;

        return uiProps;
      },
      this._modals,
    );
  }

  @background
  getPromise(id: string) {
    return this._promises.get(id).promise;
  }

  getUIFunctions(): ModalV2UIFunctions {
    return {};
  }

  getUIProps(): ModalV2UIProps {
    return {
      modals: this.modals,
    };
  }
}
