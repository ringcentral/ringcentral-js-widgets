/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  injectable,
  optional,
  RcViewModule,
  UIFunctions,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { Toast } from '../../services';

import type { ToastViewOptions } from './Toast.view.interface';
import { ToastItemView } from './ToastItemView';
import { ToastPanel, ToastPanelProps } from './ToastPanel';

export type ToastViewProps = Partial<ToastPanelProps>;

@injectable({
  name: 'ToastView',
})
export class ToastView extends RcViewModule {
  constructor(
    private _toastItemView: ToastItemView,
    private _toast: Toast,
    @optional('ToastViewOptions')
    protected _toastViewOptions?: ToastViewOptions,
  ) {
    super();
  }

  private readonly uiFunctions: UIFunctions<ToastPanelProps> = {
    dismiss: (id, reason) => {
      this._toast.dismiss(id, reason);
    },
  };

  override component(props: ToastViewProps) {
    const { toasts, ready } = useConnector(() => ({
      toasts: this._toast.toasts,
      ready: this.ready,
    }));

    return ready ? (
      <ToastPanel
        messages={toasts}
        component={this._toastItemView.component}
        {...this.uiFunctions}
        {...props}
      />
    ) : null;
  }
}
