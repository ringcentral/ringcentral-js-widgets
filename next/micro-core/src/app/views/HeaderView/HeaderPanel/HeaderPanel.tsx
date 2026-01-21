import {
  usePresenceItems,
  usePresenceText,
} from '@ringcentral-integration/next-widgets/components';
import {
  ExpandCollapseCaret,
  Menu,
  MenuDivider,
  MenuItem,
  StatusIndicator,
  useMountState,
} from '@ringcentral/spring-ui';
import React, {
  FunctionComponent,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { useLocale } from '../../../hooks';
import { HeaderViewProps } from '../Header.view.interface';

import { Header, HeaderAction } from './Header';
import i18n from './i18n';

const EMPTY_COMPONENT = () => <></>;

export type HeaderPanelAction = {
  closeMenu: () => void;
};

export const HeaderPanel: FunctionComponent<
  HeaderViewProps & {
    action?: Ref<HeaderPanelAction>;
  }
> = (props) => {
  const {
    loginNumber,
    userContact,
    userStatus,
    dndStatus,
    onPresenceChange,
    children,
    onActionClick,
    ContactAvatar = EMPTY_COMPONENT,
    action,
  } = props;

  const { t } = useLocale(i18n);

  const actionRef = useRef<HeaderAction>(null);
  const currentStatus = usePresenceText({
    // TODO: spring-ui, after all project migrate to spring-ui, rename this prop to presenceStatus
    presenceStatus: userStatus,
    dndStatus,
  });

  const isMountedRef = useMountState();

  const { elements: presenceElements, selectedItem } = usePresenceItems({
    // TODO: spring-ui, after all project migrate to spring-ui, rename this prop to presenceStatus
    presenceStatus: userStatus,
    dndStatus,
    onChange: (type) => {
      onPresenceChange?.(type);
      setStatusAnchor(null);

      // TODO: spring inner issue, if close at same time, the menu will shirking
      // also close the full menu when select a status, base on designer requirement
      requestAnimationFrame(() => {
        if (isMountedRef.current) actionRef.current?.closeMenu();
      });
    },
    divider: false,
    className: 'h-8 p-0',
  });

  const [statusAnchor, setStatusAnchor] = useState<HTMLButtonElement | null>(
    null,
  );

  const avatarRef = useRef<HTMLButtonElement>(null);

  const menuOpened = Boolean(statusAnchor);

  useImperativeHandle(
    action,
    () => ({
      closeMenu() {
        setStatusAnchor(null);

        requestAnimationFrame(() => {
          if (isMountedRef.current) actionRef.current?.closeMenu();
        });
      },
    }),
    [isMountedRef],
  );

  return (
    <div className="flex flex-col h-full flex-auto overflow-hidden bg-neutral-base">
      <Header
        title={t('phone')}
        action={actionRef}
        menuHeader={
          <div className="px-3 py-1 typography-descriptor text-neutral-b2 flex items-center h-12">
            {userContact && (
              <ContactAvatar
                contact={userContact}
                contactName={userContact.name}
                phoneNumber={userContact.phoneNumber}
                size="medium"
                variant="squircle"
                aria-label="User avatar"
              />
            )}
            <div className="ml-3 flex-auto overflow-hidden">
              <p
                className="typography-subtitle text-neutral-b0 truncate"
                title={userContact?.name}
              >
                {userContact?.name}
              </p>
              <p
                className="typography-descriptor text-neutral-b2 truncate"
                title={loginNumber}
                data-sign="login-number"
              >
                {loginNumber}
              </p>
            </div>
          </div>
        }
        menuList={
          <>
            <MenuDivider className="my-0.5" />
            <MenuItem
              autoClose={false}
              aria-label="change presence status"
              onClick={(e) => {
                setStatusAnchor((prev) => (prev ? null : e.currentTarget));
              }}
              classes={{
                container: 'gap-3 p-0 min-h-4',
                root: 'px-3 py-2 h-8',
              }}
            >
              <StatusIndicator variant={selectedItem?.variant} />
              <div
                className="typography-subtitleMini truncate"
                title={currentStatus}
              >
                {currentStatus}
              </div>
              <i className="flex-auto"></i>
              <ExpandCollapseCaret expanded={!!statusAnchor} size="xsmall" />
            </MenuItem>
            {
              // TODO: spring-ui Menu in test show how never close, so we hide that in test
              ((process.env.NODE_ENV === 'test' && menuOpened) ||
                process.env.NODE_ENV !== 'test') && (
                <Menu
                  PopperProps={{
                    role: 'menu',
                    'aria-label': 'presence status list',
                  }}
                  open={menuOpened}
                  anchorEl={statusAnchor}
                  onClose={() => {
                    setStatusAnchor(null);
                  }}
                >
                  {presenceElements}
                </Menu>
              )
            }
          </>
        }
        onActionClick={onActionClick}
      >
        {userContact && (
          <ContactAvatar
            size="small"
            contact={userContact}
            contactName={userContact.name}
            phoneNumber={userContact.phoneNumber}
            variant="circle"
            aria-label="User avatar"
            data-presence-status={currentStatus}
            component={'button' as any}
            showStatusIndicator
            avatarShapeRef={avatarRef}
            IndicatorProps={{
              variant: selectedItem?.variant,
              className: 'cursor-pointer',
              'data-sign': 'user-presence',
              onClick: () => {
                // TODO: spring inner issue, the indicator not able to trigger the top level button click event
                avatarRef.current?.click();
              },
            }}
          />
        )}
      </Header>

      {children}
    </div>
  );
};
