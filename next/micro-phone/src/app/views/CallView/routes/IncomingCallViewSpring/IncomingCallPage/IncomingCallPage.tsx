import { FormattedPhoneNumber } from '@ringcentral-integration/micro-auth/src/app/components';
import {
  AppFooterNav,
  useAppContentRef,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  ActionMenuList,
  type ActionMenuListButtonProps,
  Drawer,
  PageHeader,
} from '@ringcentral-integration/next-widgets/components';
import { FullScreenMd, OverflowMd, Xmd } from '@ringcentral/spring-icon';
import {
  IconButton,
  type IconButtonProps,
  List,
  ListItemText,
  MenuItem,
  Portal,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { FunctionComponent, useMemo, useState } from 'react';

import {
  CallButtonContainer,
  ExpandLogButton,
} from '../../../../../components';
import {
  useCallActionButtons,
  useContactRenderInfoFromCall,
} from '../../../../../hooks';
import { isQueueCall } from '../../../../../services';
import { IncomingCallViewPanelProps } from '../IncomingCall.view.interface';

import i18n from './i18n';

const MinComponent: FunctionComponent<
  IconButtonProps & {
    Component?: React.ComponentType<IconButtonProps>;
  }
> = ({ TooltipProps, className, Component = IconButton, ...itemRest }) => {
  return (
    <CallButtonContainer
      size="large"
      className={className}
      label={(TooltipProps?.title as string) || ''}
    >
      <Component size="xlarge" {...itemRest} />
    </CallButtonContainer>
  );
};

const Minimized: FunctionComponent<IncomingCallViewPanelProps> = ({
  call,
  onMinimized,
  showCloseButton,
  onAction,
  children,
  classes,
}) => {
  const { t } = useLocale(i18n);

  const { DisplayName, Avatar, OnOtherDevice } = useContactRenderInfoFromCall(
    call,
    {
      phoneNumberDisplayMode: 'phoneNumber',
      hideBlockedFromInfo: true,
    },
  );
  const { mainContentRef } = useAppContentRef();

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full pointer-events-none z-modal',
        classes?.miniContainer,
      )}
      aria-label="Incoming call popup"
    >
      <motion.div
        drag
        dragConstraints={mainContentRef}
        dragTransition={{
          power: 0,
        }}
        data-sign="IncomingCallCard"
        className="absolute top-0 left-0 p-3 w-full pointer-events-auto"
        data-draggable
        ref={
          // in test env, set boundary to the main content ref for check the drag boundary
          process.env.NODE_ENV === 'test'
            ? (elm) => {
                if (elm) {
                  elm.dataset.boundary = JSON.stringify({
                    top: mainContentRef.current?.clientTop,
                    left: mainContentRef.current?.clientLeft,
                    right: mainContentRef.current?.style.width,
                    bottom: mainContentRef.current?.style.height,
                  });
                }
              }
            : undefined
        }
      >
        <div className="bg-neutral-base rounded-sui-sm shadow-sui-md border border-neutral-b4 overflow-hidden py-3">
          <div className="flex px-3">
            <Avatar size="xlarge" />
            <ListItemText
              primary={
                <DisplayName
                  displayControl={{
                    viewable: true,
                  }}
                />
              }
              data-sign="callInfoLabel"
              secondary={
                <div className="flex items-center flex-nowrap gap-1">
                  <p data-sign="secondary-info">{t('incomingCall')}</p>
                  {OnOtherDevice && <OnOtherDevice mode="icon" />}
                </div>
              }
            />
            <i className="flex-auto" />
            <IconButton
              symbol={FullScreenMd}
              size="xsmall"
              iconSize="medium"
              variant="icon"
              color="secondary"
              data-sign="expand-button"
              onClick={() => onMinimized(false)}
            />
            {showCloseButton && (
              <>
                <i className="ml-4" />
                <IconButton
                  symbol={Xmd}
                  size="xsmall"
                  iconSize="medium"
                  variant="icon"
                  color="secondary"
                  data-sign="close-button"
                  onClick={() => onAction('back')}
                />
              </>
            )}
          </div>

          <div>{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

const Expanded: FunctionComponent<IncomingCallViewPanelProps> = ({
  call,
  onAction,
  expanded,
  onExpand,
  children,
}) => {
  const { t } = useLocale(i18n);

  const {
    DisplayName,
    displayPhoneNumber,
    Avatar,
    myCallerId,
    callQueueName,
    OnOtherDevice,
  } = useContactRenderInfoFromCall(call, {
    phoneNumberDisplayMode: 'unknown',
    hideBlockedFromInfo: true,
  });

  return (
    // <FocusTrap open>
    <div // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      data-sign="IncomingCallPage"
      className="flex flex-col absolute z-drawer top-0 left-0 bg-neutral-base size-full"
    >
      <PageHeader
        className="h-12"
        onBackClick={() => onAction('back')}
        endAdornment={
          // queue call will not show expand button in incoming page
          onExpand && typeof expanded === 'boolean' && !isQueueCall(call) ? (
            <ExpandLogButton
              expanded={expanded}
              onExpand={onExpand}
              data-sign={expanded ? 'folded' : 'unfolded'}
            />
          ) : undefined
        }
      />
      <div data-sign="callerInfo">
        <div className="mt-6 flex justify-center">
          <Avatar size="xxlarge" />
        </div>
        <div
          className="flex-auto flex flex-col gap-2 justify-center items-center mt-6 px-6 w-full"
          data-sign="callInfo"
        >
          <h2
            className="typography-display2 truncate w-full text-center flex flex-col items-center gap-1"
            data-sign="callerName"
          >
            <DisplayName
              displayControl={{
                maybe: true,
                viewable: true,
                matchCounts: true,
                align: 'center',
              }}
            />
          </h2>
          {displayPhoneNumber && (
            <p className="typography-mainText" data-sign="callFromNumber">
              {displayPhoneNumber}
            </p>
          )}
          {OnOtherDevice && <OnOtherDevice />}
          {!callQueueName && myCallerId && (
            <p
              className="typography-descriptorMini text-neutral-b2"
              data-sign="callToNumber"
            >
              {t('to')}: {myCallerId}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        {children}
      </div>
      <AppFooterNav />
    </div> // </FocusTrap>);
  );
};

export const IncomingCallPage: FunctionComponent<IncomingCallViewPanelProps> = (
  props,
) => {
  const { actions, minimized, mode, forwardingNumbers, onAction } = props;
  const multiple = mode === 'multiple';
  const queue = mode === 'queue';
  const [forwardOpen, setForwardOpen] = useState(false);
  const actionButtons = useCallActionButtons(actions, onAction);

  const buttons = useMemo(
    () =>
      actionButtons.map((button) => {
        const Original = button.Component;

        return {
          ...button,
          Component: Original
            ? (props) => <MinComponent Component={Original} {...props} />
            : MinComponent,
        } as ActionMenuListButtonProps;
      }),
    [actionButtons],
  );

  const actionMenuList = useMemo(() => {
    if (multiple) {
      const onlyOneButton = buttons.length === 1;

      return (
        <div
          data-sign="multipleCallActions"
          className={clsx(
            'grid',
            onlyOneButton ? 'grid-cols-1' : 'grid-cols-6',
            minimized ? 'gap-y-4' : 'gap-y-6 w-11/12',
          )}
        >
          <ActionMenuList
            variant="plain"
            listVariant="drawer"
            buttons={buttons}
            displayCount={5}
            MoreButtonComponent={MinComponent}
            moreButtonProps={{
              size: minimized ? 'small' : 'xxxlarge',
              shape: 'circular',
              variant: 'outlined',
              symbol: OverflowMd,
            }}
            propsMap={{
              ignore: {
                size: minimized ? 'large' : 'xlarge',
                className: 'col-start-2 col-span-2 order-1',
              },
              more: {
                size: minimized ? 'large' : 'xlarge',
                className: 'col-start-4 col-span-2 order-1',
              },
              endAndAnswer: {
                size: minimized ? 'large' : 'xlarge',
                className: 'col-span-2 order-2',
              },
              voicemail: {
                size: minimized ? 'xlarge' : 'xxxlarge',
                iconSize: 'large',
                className: 'col-span-2 order-2',
              },
              holdAndAnswer: {
                size: minimized ? 'large' : 'xlarge',
                className: 'col-span-2 order-2',
              },
              forward: {
                onClick: () => {
                  setForwardOpen(true);
                },
              },
            }}
          />
        </div>
      );
    }

    const twoColumnLayout = !minimized && buttons.length > 1;
    const minimizedTwoColumn = minimized && buttons.length === 2;
    const onlyOneButton = buttons.length === 1;
    return (
      <div
        data-sign="singleCallActions"
        className={clsx(
          twoColumnLayout
            ? 'grid grid-cols-2'
            : `pt-3 px-3 flex flex-row
              ${
                onlyOneButton
                  ? 'justify-center'
                  : minimizedTwoColumn
                  ? 'justify-center gap-2'
                  : 'justify-between'
              }`,

          {
            'w-3/4 mt-16': !minimized && queue,
            'w-3/4 gap-y-6': !minimized && !queue,
          },
        )}
      >
        {/* when minimized and only have two button add one column to make two button start with second column */}
        {minimizedTwoColumn && <div />}
        <ActionMenuList
          variant="plain"
          listVariant="drawer"
          buttons={buttons}
          displayCount={4}
          MoreButtonComponent={MinComponent}
          moreButtonProps={{
            size: 'xlarge',
            shape: 'circular',
            variant: 'outlined',
            symbol: OverflowMd,
          }}
          propsMap={{
            ...(minimized
              ? undefined
              : {
                  ignoreQueue: {
                    size: 'xxxlarge',
                    iconSize: 'large',
                    className: 'order-1',
                  },
                  ignore: {
                    size: 'xxxlarge',
                    iconSize: 'large',
                    className: 'order-1',
                  },
                  more: {
                    size: 'xxxlarge',
                    iconSize: 'large',
                    className: 'order-1',
                  },
                  voicemail: {
                    size: 'xxxlarge',
                    iconSize: 'large',
                    className: 'order-2',
                  },
                  answer: {
                    size: 'xxxlarge',
                    iconSize: 'large',
                    className: 'order-2',
                  },
                }),
            forward: {
              onClick: () => {
                setForwardOpen(true);
              },
            },
          }}
        />
        {minimizedTwoColumn && <div />}
      </div>
    );
  }, [buttons, minimized, multiple, queue]);

  return (
    <>
      {minimized ? (
        // use portal to render the minimized view to avoid the z-index issue
        <Portal>
          <Minimized {...props}>{actionMenuList}</Minimized>
        </Portal>
      ) : (
        <Expanded {...props}>{actionMenuList}</Expanded>
      )}
      <Drawer
        open={forwardOpen}
        onClose={() => {
          setForwardOpen(false);
        }}
      >
        <List tabIndex={0} className="my-2" data-sign="forwardList">
          {forwardingNumbers.map((item) => {
            const isCustomOption = item.phoneNumber === 'custom';

            return (
              <MenuItem
                onClick={() => {
                  if (isCustomOption) {
                    onAction('forward');
                    return;
                  }
                  onAction('startForward', item.phoneNumber);
                  setForwardOpen(false);
                }}
                key={item.phoneNumber}
                data-value={item.phoneNumber}
                data-sign={item.phoneNumber}
              >
                <ListItemText
                  primary={item.label}
                  secondary={
                    isCustomOption ? undefined : (
                      <FormattedPhoneNumber phoneNumber={item.phoneNumber} />
                    )
                  }
                />
              </MenuItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};
