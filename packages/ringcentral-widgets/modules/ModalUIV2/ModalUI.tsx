import {
  action,
  computed,
  RcUIModuleV2,
  state,
} from '@ringcentral-integration/core';
import { filter, find, findIndex, map } from 'ramda';
import background from '@ringcentral-integration/commons/lib/background';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import { v4 } from 'uuid';

import {
  ModalProps,
  ModalV2UIFunctions,
  ModalV2UIProps,
} from '../../components/ModalV2/interface';
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
import {
  defaultCancelRenderer,
  defaultCancelRendererID,
  defaultOKRenderer,
  defaultOKRendererID,
  infoTitleRenderer,
  infoTitleRendererID,
} from './utils';

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

  @action
  private _setLoading(id: string, loading: boolean) {
    const idx = findIndex((item) => item.id === id, this._modals);
    if (this._modals[idx].useLoadingOverlay) {
      this._modals[idx].loadingOverlay = loading;
    } else {
      this._modals[idx].loading = loading;
    }
  }

  @proxify
  private async _onConfirm(id: string, onConfirm?: string) {
    // here we assume the handler is async and set the loading status
    // detecting whether the handler is async or not is unreliable and can be dangerous
    // for most non-async functions the loading status will occur too briefly
    // so that the UI will not really render the loading status at all
    this._setLoading(id, true);
    const handler = this._handlerRegister.get(id).get(onConfirm);

    if (handler && (await handler()) === false) {
      this._setLoading(id, false);
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

  /**
   * register render method for custom render if you want
   *
   * @example
   *
   * ```tsx
   * const defaultOKRenderer: CustomRenderer = ({ currentLocale }) =>
   *  <span>{i18n.getString('ok', currentLocale)}</span>
   * ```
   */
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
      return false;
    }
    const updatedState = {
      ...dehydratedState,
      open: false,
    };
    this._updateModal(updatedState);
    return true;
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
        confirmButtonText: defaultOKRendererID,
        cancelButtonText: defaultCancelRendererID,
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
        confirmButtonText: defaultOKRendererID,
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

  @computed(({ _modals, _deps: { locale: { currentLocale } } }: ModalUI) => [
    _modals,
    currentLocale,
  ])
  get modals() {
    const currentLocale = this._deps.locale.currentLocale;
    return map(
      ({
        id,
        onConfirm,
        onCancel,
        title,
        content,
        footer,
        confirmButtonText,
        cancelButtonText,
        titleProps = {},
        contentProps = {},
        footerProps = {},
        variant,
        handlerIDs,
        // * just pick this field out of rest
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useLoadingOverlay,
        ...rest
      }) => {
        const uiProps: ModalProps = {
          ...rest,
          key: id,
          onConfirm: () => this._onConfirm(id, onConfirm),
          onExited: () => this._onExited(id),
        };

        if (onCancel || cancelButtonText) {
          uiProps.onCancel = () => this._onCancel(id, onCancel);
        }

        const renderedTitle =
          this._rendererRegister.get(title)?.({
            currentLocale,
            ...this._rehydrateFunctions(id, titleProps, handlerIDs),
            onConfirm: uiProps.onConfirm,
            onCancel: uiProps.onCancel,
          }) ?? title;

        if (variant === 'info') {
          uiProps.title = this._rendererRegister.get(infoTitleRendererID)({
            title: renderedTitle,
            onConfirm: uiProps.onConfirm,
            currentLocale,
          });
          uiProps.TitleProps = {
            disableTypography: true,
            display: 'flex',
            space: [0, 6],
          };
        } else {
          uiProps.title = renderedTitle;
        }

        uiProps.children =
          this._rendererRegister.get(content)?.({
            currentLocale,
            ...this._rehydrateFunctions(id, contentProps, handlerIDs),
            onConfirm: uiProps.onConfirm,
            onCancel: uiProps.onCancel,
          }) ?? content;

        uiProps.footer =
          variant === 'info'
            ? null
            : this._rendererRegister.get(footer)?.({
                currentLocale,
                ...this._rehydrateFunctions(id, footerProps, handlerIDs),
                onConfirm: uiProps.onConfirm,
                onCancel: uiProps.onCancel,
              }) ?? footer;

        uiProps.confirmButtonText =
          (this._rendererRegister.get(confirmButtonText)?.({
            currentLocale,
            onConfirm: uiProps.onConfirm,
            onCancel: uiProps.onCancel,
          }) as string) ?? confirmButtonText;

        uiProps.cancelButtonText =
          (this._rendererRegister.get(cancelButtonText)?.({
            currentLocale,
            onConfirm: uiProps.onConfirm,
            onCancel: uiProps.onCancel,
          }) as string) ?? cancelButtonText;

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
