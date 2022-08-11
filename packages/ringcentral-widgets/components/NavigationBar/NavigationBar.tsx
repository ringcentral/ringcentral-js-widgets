import React, { FunctionComponent, useEffect, useState } from 'react';

import classnames from 'classnames';

import { useEventCallback, useMountState } from '@ringcentral/juno';

import { NavigationButtonIcon } from '../TabNavigationButton';
import type {
  NavigationBarProps,
  TabPropTypes,
} from './NavigationBar.interface';
import { NavigationBarMoreMenu } from './NavigationBarMoreMenu';
import styles from './styles.scss';

function getTabInfo({
  tab,
  currentPath,
  currentVirtualPath,
}: Pick<NavigationBarProps, 'currentPath' | 'currentVirtualPath'> & {
  tab: NavigationBarProps['tabs'][number];
}) {
  const active =
    tab.isActive?.(currentPath, currentVirtualPath) ||
    (tab.path && tab.path === currentPath) ||
    (tab.virtualPath && tab.virtualPath === currentVirtualPath) ||
    tab.childTabs?.some(
      (childTab) =>
        childTab.path === currentPath ||
        childTab.path === currentPath.slice(0, 9),
    );

  const activeAttr = active ? 'true' : '';

  function getIcon(icon: NavigationButtonIcon | undefined) {
    if (!icon) return icon;

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        active: activeAttr,
      });
    }

    const Icon = icon;

    return tab.childTabs ? <Icon currentPath={currentPath} /> : <Icon />;
  }

  const { icon, activeIcon } = tab;

  return {
    icon: getIcon(icon),
    activeIcon: getIcon(activeIcon),
    active,
  };
}

type TabSizeParams = {
  isVertical: boolean;
} & Pick<NavigationBarProps, 'direction' | 'tabHeight' | 'tabWidth' | 'tabs'>;

function getTabSize({
  isVertical,
  tabHeight,
  tabWidth,
  tabs = [],
}: TabSizeParams) {
  const width =
    tabWidth ?? (tabs.length > 0 ? `${(1 / tabs.length) * 100}%` : '0');

  const height = isVertical ? tabHeight ?? '50px' : '100%';

  return { width, height };
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const {
    fullSizeInk = true,
    tabs = [],
    direction = 'horizontal',
    currentVirtualPath: currentVirtualPathProp,
    goTo: goToProp,
    className,
    button: NavigationButton,
    childNavigationView,
    currentPath,
    tabWidth,
    tabHeight,
    tooltipForceHide,
  } = props;
  const [currentVirtualPath, setCurrentVirtualPath] = useState(
    currentVirtualPathProp,
  );
  const isMounted = useMountState();

  const isVertical = direction === 'vertical';

  const directionClass = isVertical ? styles.vertical : undefined;

  const setCurrentRouteState = useEventCallback((path: string) => {
    if (isMounted.current) {
      setCurrentVirtualPath(path);
    }
  });

  const goTo = async (tab: TabPropTypes) => {
    await goToProp?.(tab.path, tab.virtualPath);

    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    setCurrentRouteState(tab.virtualPath);
  };

  const { width, height } = getTabSize({
    isVertical,
    tabHeight,
    tabWidth,
    tabs,
  });

  useEffect(() => {
    if (currentVirtualPath) {
      setCurrentRouteState(currentVirtualPath);
    }
  }, [currentVirtualPath, setCurrentRouteState]);

  return (
    <nav className={classnames(styles.root, className, directionClass)}>
      {tabs.map((tab, index) => {
        const { active, icon, activeIcon } = getTabInfo({
          tab,
          currentPath,
          currentVirtualPath,
        });

        return (
          <NavigationButton
            {...tab}
            active={active}
            icon={icon}
            activeIcon={activeIcon}
            fullSizeInk={fullSizeInk}
            key={index}
            onClick={() => goTo(tab)}
            width={width}
            height={height}
            tooltipForceHide={tooltipForceHide}
          />
        );
      })}
      {childNavigationView ? (
        <NavigationBarMoreMenu
          tabs={tabs}
          currentPath={currentPath}
          childNavigationView={childNavigationView}
          goTo={goTo}
          currentVirtualPath={currentVirtualPath}
        />
      ) : null}
    </nav>
  );
};
