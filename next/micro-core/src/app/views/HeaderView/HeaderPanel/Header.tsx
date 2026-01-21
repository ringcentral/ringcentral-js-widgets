import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@ringcentral/spring-ui';
import React, {
  ComponentProps,
  FunctionComponent,
  Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { noop } from 'rxjs';

import { useAppHeader } from '../../../components';
import { useLocale } from '../../../hooks';
import type { HeaderViewProps } from '../Header.view.interface';

import i18n from './i18n';

export type HeaderAction = {
  closeMenu: () => void;
};

export type HeaderProps = {
  title: string;
  menuHeader: React.ReactNode;
  menuList: React.ReactNode;
  action?: Ref<HeaderAction>;
} & Pick<HeaderViewProps, 'onActionClick'>;

export const Header: FunctionComponent<HeaderProps> = ({
  title,
  children,
  menuHeader: menu,
  menuList,
  onActionClick = noop,
  action,
}) => {
  const {
    nav,
    override,
    title: appTitle,
  } = useAppHeader({
    // we not have any default element to render, but keep that here to avoid user want set null
    defaultNav: <></>,
  });

  const [fullMenuAnchor, setFullMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const { t } = useLocale(i18n);

  const avatarRoot = useMemo(() => {
    if (
      React.isValidElement(children) &&
      React.Children.count(children) === 1
    ) {
      return React.cloneElement(children, {
        onClick: (e) => {
          setFullMenuAnchor(e.currentTarget);
        },
      } as ComponentProps<'button'>);
    }
    return children;
  }, [children]);

  useImperativeHandle(
    action,
    () => ({
      closeMenu() {
        setFullMenuAnchor(null);
      },
    }),
    [],
  );

  const menuOpened = Boolean(fullMenuAnchor);

  return (
    <header className="flex-none">
      {override ? (
        nav
      ) : (
        <>
          <div className="flex relative gap-10 justify-center items-center px-3 w-full bg-neutral-base h-9">
            <div className="flex gap-3 justify-center items-center">
              {avatarRoot}
              <Text
                className="typography-subtitle text-neutral-b0"
                data-sign="title"
              >
                {appTitle ?? title}
              </Text>
            </div>
            <i className="flex-auto" />
            <nav className="flex gap-3 justify-center items-center">{nav}</nav>
          </div>

          {
            // TODO: spring-ui Menu in test show how never close, so we hide that in test
            ((process.env.NODE_ENV === 'test' && menuOpened) ||
              process.env.NODE_ENV !== 'test') && (
              <Menu
                PopperProps={{
                  role: 'menu',
                  'aria-label': 'user information',
                }}
                variant="pointed"
                open={menuOpened}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={false}
                anchorEl={fullMenuAnchor}
                onClose={() => {
                  setFullMenuAnchor(null);
                }}
              >
                {menu}
                <MenuList>
                  {menuList}
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      onActionClick('logout');
                    }}
                    classes={{
                      container: 'justify-center gap-3 p-0 min-h-4',
                      root: 'px-3 py-2 h-8',
                    }}
                  >
                    {t('logout')}
                  </MenuItem>
                </MenuList>
              </Menu>
            )
          }
        </>
      )}
    </header>
  );
};
