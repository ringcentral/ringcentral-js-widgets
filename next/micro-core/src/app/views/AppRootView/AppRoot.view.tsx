import {
  injectable,
  isSharedWorker,
  RcViewModule,
} from '@ringcentral-integration/next-core';
import { isSafari } from '@ringcentral-integration/utils';
import React, { PropsWithChildren } from 'react';

import { EnsureAudio } from '../../services';
import { ModalView, ModalViewProps } from '../ModalView';
import { ToastView, ToastViewProps } from '../ToastView';
import { GlobalStyle } from '../globalStyle';

import { uiErrorIgnorer } from './uiErrorIgnorer';

type AppRootProps = {
  ModalViewProps?: ModalViewProps;
  ToastViewProps?: ToastViewProps;
  usingGlobalStyle?: boolean;
};

@injectable({
  name: 'AppRootView',
})
export class AppRootView extends RcViewModule {
  constructor(
    private _modalView: ModalView,
    private _toastView: ToastView,
    private _ensureAudio: EnsureAudio,
  ) {
    super();

    // only safari need to ensure audio permission
    // safari not allow non any user interaction to play audio
    if (isSafari()) {
      this._ensureAudio.ensure();
    }

    if (!isSharedWorker) {
      uiErrorIgnorer();
    }
  }

  component({
    children,
    ModalViewProps,
    ToastViewProps,
    usingGlobalStyle = true,
  }: PropsWithChildren<AppRootProps>) {
    return (
      <>
        {usingGlobalStyle && <GlobalStyle />}
        {children}
        <this._modalView.component {...ModalViewProps} />
        <this._toastView.component {...ToastViewProps} />
      </>
    );
  }
}
