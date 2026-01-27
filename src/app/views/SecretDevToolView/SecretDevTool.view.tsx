import {
  action,
  autobind,
  delegate,
  globalStorage,
  injectable,
  RcViewModule,
  state,
  StoragePlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { Portal } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useRef } from 'react';

import { Locale } from '../../services';

import { HiddenMagic } from './HiddenMagic';
import type { SecretDevToolProps } from './SecretDevTool.view.interface';

@injectable({
  name: 'SecretDevToolView',
})
export class SecretDevToolView extends RcViewModule {
  @globalStorage
  @state
  show = false;

  @action
  private _setShow(val: boolean) {
    this.show = val;
  }

  @delegate('server')
  async setShow(val: boolean) {
    this._setShow(val);
  }

  @globalStorage
  @state
  expanded = false;

  @action
  private _setExpanded(val: boolean) {
    this.expanded = val;
  }

  @delegate('server')
  async setExpanded(val: boolean) {
    this._setExpanded(val);
  }

  constructor(private _storage: StoragePlugin, private _locale: Locale) {
    super();
    this._storage.enable(this);
  }

  @autobind
  private FloatPanel({ className, useRenderProps }: SecretDevToolProps) {
    const { currentLocale, expanded } = useConnector(() => ({
      currentLocale: this._locale.currentLocale,
      expanded: this.expanded,
    }));

    const { online, action, header, details } = useRenderProps?.() || {};

    const summaryRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    return (
      <div
        data-sign="magic-float-panel"
        className={clsx(
          'fixed bottom-0 right-0 z-tooltip w-full max-w-[400px] shadow-lg border border-neutral-b2 bg-neutral-b5',
          'translate-x-[calc(100%-16px)] transition-transform ease-in-out',
          expanded ? '!translate-x-0' : 'hover:!translate-x-0',
          '[&_button]:bg-neutral-b4 [&_button:active]:bg-neutral-b4/70 [&_button:hover]:bg-neutral-b4 [&_button:hover]:text-neutral-b1',
          className,
        )}
      >
        <div className="flex max-h-screen flex-col">
          <div
            className={clsx(
              'flex border-b border-l-[16px]',
              online === undefined && 'border-neutral-b4',
              online
                ? 'text-success-f border-success-f'
                : 'text-danger-f border-danger-f',
            )}
            onClick={() => this.setExpanded(!expanded)}
            ref={summaryRef}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                this.setExpanded(!expanded);
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <button
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  this.setShow(false);
                }}
              >
                hide
              </button>
              {action}
            </div>
            <i className="flex-auto"></i>
            <div className="w-[185px]">
              <div>· Current locale: {currentLocale}</div>
              {header}
            </div>
          </div>
          {expanded && (
            <div className="flex flex-col overflow-auto p-4" ref={detailsRef}>
              {details}
            </div>
          )}
        </div>
      </div>
    );
  }

  component({ show, ...rest }: SecretDevToolProps) {
    const showState = useConnector(() => this.show);

    return (
      <Portal>
        {show || showState ? (
          <this.FloatPanel {...rest}></this.FloatPanel>
        ) : (
          <HiddenMagic
            data-sign="magic-hidden"
            onShowChange={() => this.setShow(true)}
          />
        )}
      </Portal>
    );
  }
}
