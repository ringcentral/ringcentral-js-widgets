import MoreMenuIcon from '@ringcentral-integration/widgets/assets/images/MoreMenu.svg';
import MoreMenuHoverIcon from '@ringcentral-integration/widgets/assets/images/MoreMenuHover.svg';
import type { RcIconProps, RcMenuProps } from '@ringcentral/juno';
import {
  combineProps,
  RcClasses,
  RcIcon,
  RcListItemIcon,
  RcListItemText,
  RcMenu,
  RcMenuItem,
  spacing,
  styled,
} from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React, { useMemo, useRef, useState } from 'react';

import type { NavBarProps, NavButtonProps } from '../NavBar';
import { NavBar, NavButton } from '../NavBar';

const IntFullMenuClasses = RcClasses<RcMenuProps>(['paper'], 'Int');

const FullMenu = styled(RcMenu)`
  .${IntFullMenuClasses.paper} {
    min-width: 100%;
  }
  ${RcListItemIcon} {
    ${RcIcon} {
      margin-right: ${spacing(3)};
    }
  }
`;
export interface TabItem extends NavButtonProps {
  moreMenuSymbol?: RcIconProps['symbol'];
}

export type HeaderNavProps = {
  tabs: TabItem[];
  currentPath: string;
  /**
   * number of should show tabs, if tabs length more then that,
   * that will cut that will group into more menu
   *
   * @default 5
   */
  maxTabCount?: number;
  /**
   * label of more menu
   */
  moreMenuLabel?: string;
} & Partial<NavBarProps>;

export const HeaderNav: FunctionComponent<HeaderNavProps> = (props) => {
  const {
    tabs,
    maxTabCount: maxTabLength = 5,
    moreMenuLabel,
    NavItemProps: NavItemPropsProp,
    onChange,
    currentPath,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const moreMenuRef = useRef(null);

  const open = Boolean(anchorEl);

  const {
    currTabs,
    moreIcon,
    moreActiveIcon,
    moreTabs,
    activeTab,
    showMoreButton,
  } = useMemo(() => {
    let currTabs = tabs;
    let moreIcon = MoreMenuIcon;
    let moreActiveIcon = MoreMenuHoverIcon;
    let moreTabs: TabItem[] = [];
    let activeTab: TabItem | undefined;
    let showMoreButton = false;

    if (tabs.length > maxTabLength) {
      showMoreButton = true;
      const showLength = maxTabLength - 1;
      moreTabs = currTabs.slice(showLength);
      currTabs = currTabs.slice(0, showLength);
      activeTab = moreTabs.find((tab) => {
        const isActive = tab.active ?? currentPath === tab.to;

        return isActive;
      });

      if (activeTab) {
        const { moreMenuSymbol } = activeTab;
        moreIcon = moreMenuSymbol;
        moreActiveIcon = moreMenuSymbol;
      }
    }

    return {
      currTabs: currTabs.map(({ moreMenuSymbol, ...rest }) => rest),
      moreIcon,
      moreActiveIcon,
      moreTabs,
      activeTab,
      showMoreButton,
    };
  }, [currentPath, maxTabLength, tabs]);

  const NavItemProps = useMemo(
    () =>
      combineProps(
        {
          onClick: (e, path) => onChange?.(path),
        },
        NavItemPropsProp,
      ),
    [NavItemPropsProp, onChange],
  );

  return (
    <>
      <NavBar
        {...rest}
        currentPath={currentPath}
        NavItemComponent={NavButton}
        NavItemProps={NavItemProps}
        tabs={currTabs}
        moreTab={
          showMoreButton && (
            <NavButton
              to="more"
              symbol={moreIcon}
              activeSymbol={moreActiveIcon}
              active={Boolean(activeTab)}
              title={moreMenuLabel || 'More Menu'}
              dataSign="moreMenu"
              ref={moreMenuRef}
              onClick={() => {
                setAnchorEl(moreMenuRef.current);
              }}
            />
          )
        }
      />
      {showMoreButton && (
        <FullMenu
          autoClose
          classes={IntFullMenuClasses}
          anchorEl={anchorEl}
          open={open}
          variant="menu"
          onClose={() => {
            setAnchorEl(null);
          }}
          marginThreshold={0}
        >
          {moreTabs.map((tab) => {
            const {
              title,
              dataSign,
              symbol,
              activeSymbol,
              active,
              to,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              moreMenuSymbol,
            } = tab;
            const isActive = active ?? currentPath === to;

            return (
              <RcMenuItem
                key={title}
                data-sign={dataSign}
                title={title}
                selected={isActive}
                size="large"
                onClick={() => onChange?.(to)}
                icon={
                  <RcListItemIcon>
                    <RcIcon
                      size="medium"
                      symbol={isActive ? activeSymbol : symbol}
                      color="interactive.f01"
                    />
                  </RcListItemIcon>
                }
              >
                <RcListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: active ? 'interactive.f01' : 'neutral.f05',
                  }}
                />
              </RcMenuItem>
            );
          })}
        </FullMenu>
      )}
    </>
  );
};
