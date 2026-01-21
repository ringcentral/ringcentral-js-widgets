import {
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';

import type {
  NonJSXToastItemProps,
  ToastDehydratedPortal,
} from '../../../services';

import type {
  ToastItemProps,
  ToastItemViewOptions,
} from './ToastItem.view.interface';
import { ToastItemPanel } from './ToastItemPanel';
import { ToastItemViewContext, ToastViewContextValue } from './contexts';

export type ToastItemViewProps = ToastItemProps & {
  toast: ToastDehydratedPortal;
};

@injectable({
  name: 'ToastItemView',
})
export class ToastItemView extends RcViewModule {
  constructor(
    @optional('ToastItemViewOptions')
    protected _toastItemViewOptions?: ToastItemViewOptions,
  ) {
    super();
  }

  component({ toast, payload, onClose, ...props }: ToastItemViewProps) {
    const ViewModule = toast.options.view;
    const isComponent = typeof ViewModule === 'function';
    const Action = isComponent ? undefined : ViewModule?.action;

    const {
      disableEscapeKeyDown,
      disableBackdropClick,
      message,
      // TODO: remove that after all alert migrate to toast, that just pick out from alert module
      // @ts-ignore
      allowDuplicates,
      action,
      ...toastProps
    } = useConnector(() => {
      return toast.getPureProps(payload || {});
    }) as NonJSXToastItemProps;

    const contextProps: ToastViewContextValue = {
      toastMode: true,
      props: {
        ...props,
        ...toastProps,
        disableEscapeKeyDown,
        disableBackdropClick,
        message: message as any,
        payload,
        onClose,
      },
      action: {
        close: (reason) => {
          onClose?.(reason as any);
        },
      },
    };

    const nonAction = action === null || Action === null;

    const Component = this._toastItemViewOptions?.component ?? ToastItemPanel;

    return (
      <ToastItemViewContext.Provider value={contextProps}>
        <Component
          {...props}
          {...toastProps}
          payload={payload}
          message={message!}
          action={nonAction ? null : Action ? <Action /> : undefined}
        >
          {ViewModule ? (
            isComponent ? (
              <ViewModule />
            ) : (
              <ViewModule.component />
            )
          ) : (
            message
          )}
        </Component>
      </ToastItemViewContext.Provider>
    );
  }
}
