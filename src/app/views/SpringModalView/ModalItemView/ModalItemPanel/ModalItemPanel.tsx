import {
  Drawer,
  SpringSpinnerOverlay as SpinnerOverlay,
} from '@ringcentral-integration/next-widgets/components';
import { Dialog, useEventCallback } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent, memo, useMemo } from 'react';

import { useLocale } from '../../../../hooks';
import { ModalItemPanelProps } from '../../../ModalView';
import i18n from '../../../ModalView/ModalItemView/ModalItemPanel/i18n';
import {
  ModalItemViewContext,
  ModalViewContextValue,
} from '../../../ModalView/ModalItemView/contexts';
import { DefaultActionsFooter } from '../../components';

export const ModalItemPanel: FunctionComponent<ModalItemPanelProps> = memo(
  (props) => {
    const {
      type,
      childrenSize,
      footer: footerProp,
      loadingOverlay,
      loading,
      confirmButtonText: confirmButtonTextProp,
      confirmButtonProps,
      onConfirm,
      cancelButtonText: cancelButtonTextProp,
      cancelButtonProps,
      onCancel,
      TitleProps,
      variant,
      disableBackdropClick: disableBackdropClickProp,
      ActionsProps,
      className,
      children,
      onClose,
      autoDisableBackdropClick,
      open,
      header,
      isCompact = false,
      ...rest
    } = props;
    const { t } = useLocale(i18n);

    const isBlockClose =
      (autoDisableBackdropClick && (loading || loadingOverlay)) ||
      disableBackdropClickProp;

    const isLoading = loading || loadingOverlay || isBlockClose;

    const disableBackdropClick = disableBackdropClickProp || isLoading;

    const handleClose = useEventCallback((e, reason) => {
      if (!open) return;

      if (reason === 'backdropClick' && disableBackdropClick) return;

      onClose?.(e, reason);
      onCancel?.(e, reason);
    });

    const { confirmButtonText, cancelButtonText } = useMemo(() => {
      let confirmButtonText = confirmButtonTextProp;
      let cancelButtonText = cancelButtonTextProp;

      switch (variant) {
        case 'alert':
          confirmButtonText = confirmButtonText ?? t('ok');
          break;

        case 'confirm':
          confirmButtonText = confirmButtonText ?? t('ok');
          cancelButtonText = cancelButtonText ?? t('cancel');
          break;
        default:
          break;
      }

      return { confirmButtonText, cancelButtonText };
    }, [confirmButtonTextProp, cancelButtonTextProp, variant, t]);

    const showDefaultFooter = cancelButtonText || confirmButtonText;

    const footer = showDefaultFooter ? <DefaultActionsFooter /> : footerProp;

    const {
      loadingMode,
      payload,
      // pick only
      footerText,
      headerText,
      ...restProps
    } = props;

    const contextProps: ModalViewContextValue = {
      modalMode: true,
      props: {
        disableEscapeKeyDown: isLoading,
        disableBackdropClick,
        ...restProps,
        ActionsProps: {
          className: isCompact
            ? `pr-0 ${ActionsProps?.className}`
            : ActionsProps?.className,
          ...ActionsProps,
        },
        loadingMode,
        payload,
        confirmButtonText,
        cancelButtonText,
        footer: footerText,
        header: headerText,
        // as any for we change onEvent callback reason value os must to do that.
        onClose: handleClose as any,
        onCancel: onCancel as any,
      },
      action: {
        close: (reason) => {
          onClose?.({}, reason as any);
        },
        cancel: (reason) => {
          onCancel?.({}, reason as any);
        },
        confirm: (data) => {
          onConfirm?.(data as any);
        },
      },
    };

    const {
      // pick only
      loadingMode: loadingMode2,
      payload: payload2,
      footerText: footerText2,
      headerText: headerText2,
      container,
      classes,
      fullScreen,
      disableRestoreFocus,
      ...restApplyProps
    } = rest;

    const render = (
      <SpinnerOverlay loading={loadingOverlay!}>
        {header}
        {children}
        {footer}
      </SpinnerOverlay>
    );

    return (
      <ModalItemViewContext.Provider value={contextProps}>
        {type === 'drawer' ? (
          <Drawer
            open={open}
            onClose={handleClose}
            data-sign={(restApplyProps as any)['data-sign']}
            bodyProps={{
              'aria-label': rest['aria-label'],
            }}
            disableEscapeKeyDown={isLoading}
            disableRestoreFocus={disableRestoreFocus}
            backdropProps={(restApplyProps as any)['BackdropProps']}
          >
            {render}
          </Drawer>
        ) : (
          <Dialog
            onClose={handleClose}
            open={open}
            data-sign={(restApplyProps as any)['data-sign']}
            bodyProps={{
              'aria-label': rest['aria-label'],
            }}
            disableEscapeKeyDown={isLoading}
            disableRestoreFocus={disableRestoreFocus}
            backdropProps={(restApplyProps as any)['BackdropProps']}
            classes={{
              body: clsx(
                'overflow-hidden',
                fullScreen &&
                  'h-full w-full transform-none top-0 left-0 max-h-full max-w-full py-0 rounded-none',
                isCompact && 'left-3 right-3 w-[276px] max-w-none p-3',
                classes?.root,
              ),
              root: className,
            }}
          >
            {render}
          </Dialog>
        )}
      </ModalItemViewContext.Provider>
    );
  },
);
