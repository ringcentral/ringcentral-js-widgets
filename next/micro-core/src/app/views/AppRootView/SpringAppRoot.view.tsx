import {
  autobind,
  injectable,
  isSharedWorker,
  optional,
  RcViewModule,
  Root,
  useConnector,
} from '@ringcentral-integration/next-core';
import { isSafari } from '@ringcentral-integration/utils';
import { Divider } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';

import { AppProvider, useAppContentRef } from '../../components';
import { EnsureAudio } from '../../services';
import type { ModalViewProps } from '../ModalView';
import { SpringModalView } from '../SpringModalView';
import { SpringToastView, ToastViewProps } from '../SpringToastView';

import { uiErrorIgnorer } from './uiErrorIgnorer';
import { VIEW_TRANSITION_CONTAINER_IDENTIFY } from './viewTransition';

type SpringAppRootProps = {
  ModalViewProps?: ModalViewProps;
  ToastViewProps?: ToastViewProps;
  /**
   * top header, that will render above the main content
   */
  header?: React.ReactNode;
  /**
   * to control overflow style of the main content
   */
  overflowHidden?: boolean;
};

const verticalContentStyles = 'flex flex-col overflow-auto relative w-full';

export type AppRootViewOptions = {
  mainProps?: React.ComponentProps<'div'>;
  expandedProps?: React.ComponentProps<'div'>;
};

/**
 * spring app root view, include modal view and toast view
 */
@injectable({
  name: 'SpringAppRootView',
})
export class SpringAppRootView extends RcViewModule {
  constructor(
    private _root: Root,
    private _modalView: SpringModalView,
    private _toastView: SpringToastView,
    private _ensureAudio: EnsureAudio,
    @optional('AppRootViewOptions')
    private _appRootViewOptions?: AppRootViewOptions,
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

  @autobind
  private Main({
    children,
    overflowHidden = true,
  }: PropsWithChildren<{ overflowHidden?: boolean }>) {
    const { mainContentRef, expandedContentRef } = useAppContentRef();
    const expanded = useConnector(() => this._root.expanded);

    return (
      <div
        className={clsx(
          'flex',
          'w-full',
          'flex-auto',
          overflowHidden ? 'overflow-hidden' : null,
        )}
      >
        <div
          id={VIEW_TRANSITION_CONTAINER_IDENTIFY}
          ref={mainContentRef}
          {...this._appRootViewOptions?.mainProps}
          data-sign="mainContent"
          className={clsx(
            verticalContentStyles,
            this._root.expandedLayoutMainClass,
            this._appRootViewOptions?.mainProps?.className,
          )}
        >
          {children}
        </div>
        {expanded && (
          <>
            <Divider orientation="vertical" className="flex-none" />
            <div
              ref={expandedContentRef}
              {...this._appRootViewOptions?.expandedProps}
              data-sign="expandedContent"
              className={clsx(
                verticalContentStyles,
                'flex-auto',
                this._appRootViewOptions?.expandedProps?.className,
              )}
            ></div>
          </>
        )}
      </div>
    );
  }

  component({
    children,
    ModalViewProps,
    ToastViewProps,
    header,
    overflowHidden = true,
  }: PropsWithChildren<SpringAppRootProps>) {
    return (
      <AppProvider>
        <div className="flex flex-col h-full">
          {header}
          <this.Main overflowHidden={overflowHidden}>{children}</this.Main>
        </div>
        <this._modalView.component {...ModalViewProps} />
        <this._toastView.component {...ToastViewProps} />
      </AppProvider>
    );
  }
}
