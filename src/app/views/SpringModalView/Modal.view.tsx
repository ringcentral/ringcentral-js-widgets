/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autobind,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import { DialogContent, DialogTitle } from '@ringcentral/spring-ui';
import React, { useCallback } from 'react';

import {
  type ModalItemViewProps,
  ModalView,
  type ModalViewOptions,
  ModalViewProps,
} from '../ModalView';

import { ModalItemPanel } from './ModalItemView';

@injectable({
  name: 'SpringModalView',
})
export class SpringModalView extends RcViewModule {
  constructor(
    private _modalView: ModalView,
    @optional('ModalViewOptions')
    private _modalViewOptions?: ModalViewOptions,
  ) {
    super();
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
      ContentProps,
      isCompact: modalIsCompact,
      ...modalProps
    } = useConnector(() => {
      return modal.getPureProps(payload || {});
    });

    // Apply isCompact with priority: modal-specific > global options > false
    const isCompact =
      modalIsCompact ?? this._modalViewOptions?.isCompact ?? false;

    const { ref, ...restTitleProps } = TitleProps || {};

    // footer
    // content
    const DefaultHeader = useCallback(
      () => (
        <DialogTitle
          {...restTitleProps}
          className={
            isCompact
              ? `p-0 ${restTitleProps?.className ?? ''}`
              : restTitleProps.className
          }
        >
          {headerText}
        </DialogTitle>
      ),
      [headerText, restTitleProps],
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
        isCompact={isCompact}
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
          <DialogContent
            {...ContentProps}
            className={
              isCompact
                ? `p-0 ${ContentProps?.className ?? ''}`
                : ContentProps?.className ?? ''
            }
          >
            {content}
          </DialogContent>
        )}
      </ModalItemPanel>
    );
  }

  override component(inputProps: ModalViewProps) {
    const modals = useConnector(() => this._modalView.modals);

    return (
      <>
        {modals.map(({ open, id, ...props }) => {
          const modal = this._modalView['getMap'](id!)!;

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
