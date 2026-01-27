import {
  palette2,
  RcDialog,
  RcDialogContent,
  RcDrawer,
  RcLoading,
  RcPopupBoxProps,
  styled,
  useEventCallback,
} from '@ringcentral/juno';
import { DialogContent } from '@ringcentral/spring-ui';
import React, {
  ComponentProps,
  FunctionComponent,
  memo,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { highContrastBorderStyle } from '../../../../../styles';
import { useLocale } from '../../../../hooks';
import { DefaultActionsFooter } from '../../components';
import { ModalItemViewContext, ModalViewContextValue } from '../contexts';

import i18n from './i18n';

export type ModalItemProps<
  T extends Record<string, any> = Record<string, any>,
> = Omit<RcPopupBoxProps, 'data' | 'title'> & {
  key: string;
  /**
   * variant of the modal
   *
   * @default 'modal'
   */
  type?: 'modal' | 'drawer';
  /**
   * variant of modal
   *
   * - `alert` alert modal with `confirm` button
   * - `confirm` confirm modal with `confirm` and `cancel` button
   * - `info` info modal no with any button, and have `close` button
   */
  variant?: 'alert' | 'confirm' | 'info';
  /**
   * loading mode, when `onConfirm` be call and that be a promise.
   *
   * @default 'button'
   */
  loadingMode?: 'overlap' | 'button' | 'none';
  /**
   * auto disableBackdropClick handling when loading,
   * only works when `disableBackdropClick` is set to `false`
   *
   * @default true
   */
  autoDisableBackdropClick?: boolean;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   *
   * @default true
   */
  disableBackdropClick?: boolean;
  /**
   * JSON payload pass when open
   */
  payload?: T;
  /**
   * header view node
   */
  header?: ReactNode | null;
  /**
   * controlls padding
   * of title, action btns and body content
   * along with width of the modal,
   *
   * @default false
   */
  isCompact?: boolean;
  /**
   * props passed to DialogContent component
   */
  ContentProps?: ComponentProps<typeof DialogContent>;
};

const Dialog = styled(RcDialog)`
  ${highContrastBorderStyle('top')};

  ${RcDialogContent} {
    color: ${palette2('neutral', 'f06')};
  }
`;

const Drawer = styled(RcDrawer)`
  ${highContrastBorderStyle('top')};

  ${RcDialogContent} {
    color: ${palette2('neutral', 'f06')};
  }
`;

/**
 * drawer will need the open change state, if init be open directly that will miss the animation
 */
export const DrawerWithNextOpen: FunctionComponent<
  ComponentProps<typeof Drawer>
> = ({ open, children, ...rest }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useLayoutEffect(() => {
    setDrawerOpen(open || false);
  }, [open]);

  return (
    <Drawer open={drawerOpen} {...rest}>
      {children}
    </Drawer>
  );
};

type AdditionModalItemContextPass = {
  headerText?: string | null;
  footerText?: null;
};

export type ModalItemPanelProps = ModalItemProps &
  AdditionModalItemContextPass & {
    renderType?: ModalItemProps['type'];
  };

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
      ContentProps,
      variant,
      disableBackdropClick: disableBackdropClickProp,
      ActionsProps,
      children,
      onClose,
      autoDisableBackdropClick,
      open,
      header,
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
      ...restApplyProps
    } = rest;

    const render = (
      <RcLoading loading={loadingOverlay!}>
        {header}
        <RcDialogContent {...ContentProps}>{children}</RcDialogContent>
        {footer}
      </RcLoading>
    );

    const {
      // pick only
      fullScreen,
      ...restApplyDrawerProps
    } = restApplyProps;

    return (
      <ModalItemViewContext.Provider value={contextProps}>
        {type === 'drawer' ? (
          <DrawerWithNextOpen
            disableEscapeKeyDown={isLoading}
            onClose={handleClose}
            anchor="bottom"
            open={open}
            PaperProps={{
              role: 'dialog',
            }}
            {...restApplyDrawerProps}
          >
            {render}
          </DrawerWithNextOpen>
        ) : (
          <Dialog
            childrenSize={childrenSize}
            disableEscapeKeyDown={isLoading}
            onClose={handleClose}
            open={open}
            {...restApplyProps}
          >
            {render}
          </Dialog>
        )}
      </ModalItemViewContext.Provider>
    );
  },
);
