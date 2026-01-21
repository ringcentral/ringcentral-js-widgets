import {
  action,
  delegate,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  Badge,
  MenuItem,
  Tab,
  TabContext,
  type TabProps,
  Tabs,
  TabsProps,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { forwardRef, useMemo, useState } from 'react';
import { tap } from 'rxjs';

import { useLocale } from '../../hooks';

import type {
  SyncTabProps,
  SyncTabViewOptions,
} from './SyncTab.view.interface';
import i18n from './i18n';

const DEFAULT_STATE = {};

const MenuItemComponent = forwardRef<any, React.PropsWithChildren<TabProps>>(
  (props, ref) => {
    const { children, BadgeProps, ...rest } = props;
    return (
      <MenuItem ref={ref} {...(rest as any)}>
        {children}
        <Badge color="secondary" {...BadgeProps} />
      </MenuItem>
    );
  },
);

/**
 * Sync Tab View will use router state to sync the active tab between different tabs.
 *
 * you can specify the `id` to identify the tab group, and the `tabs` to specify the tabs.
 *
 * when you want to change the active tab, you can use
 *
 * ```ts
 * this._router.push('somePath that render the tab', { [id]: value });
 *
 * // for example
 * this._router.push('dialer', { dialPadTabs: 'dialer' });
 *
 * // you can use the setActive method to change the active tab when you on the page
 * this._syncTabView.setActive('dialPadTabs', 'dialer');
 * ```
 *
 * in current usage, suggest use enum `SyncTabId` to define the tab id and use in everywhere.
 */
@injectable({
  name: 'SyncTabView',
})
export class SyncTabView extends RcViewModule {
  @state
  tabInfo: Record<string, { active: string | number | null }> = {};

  @action
  private _setTabInfo(key: string, val: { active: string | number | null }) {
    if (this.tabInfo[key]) {
      Object.assign(this.tabInfo[key], val);
    } else {
      this.tabInfo[key] = val;
    }
  }

  @delegate('server')
  private async setTabInfo(
    key: string,
    val: { active: string | number | null },
  ) {
    this._setTabInfo(key, val);
  }

  constructor(
    private _router: RouterPlugin,
    private _portManager: PortManager,
    @optional('SyncTabViewOptions')
    private _syncTabViewOptions?: SyncTabViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.listenServerStateChange();
      });
    } else {
      this.listenServerStateChange();
    }
  }

  private listenServerStateChange() {
    fromWatchValue(this, () => this.locationState)
      .pipe(
        tap((state) => {
          Object.entries(state).forEach(([tabId, activeTab]) => {
            this.setTabInfo(tabId, {
              active: activeTab,
            });
          });
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private get locationState(): Record<string, any> {
    return this._router.router?.location.state || DEFAULT_STATE;
  }

  getActive(tabId: string) {
    return this.tabInfo[tabId]?.active;
  }

  /**
   * that should only use when target tabId's tab be rendered
   */
  setActive(tabId: string, activeTab: string | number | null) {
    this.setTabInfo(tabId, {
      active: activeTab,
    });

    this._router.push(this._router.currentPath, {
      ...this.locationState,
      [tabId]: activeTab,
    });
  }

  /**
   * replace the active tab
   */
  async replaceActive(tabId: string, activeTab: string | number | null) {
    if (this.tabInfo[tabId]?.active === activeTab) return;

    this.setTabInfo(tabId, {
      active: activeTab,
    });

    // wait a tick to avoid the dom tree be destroyed during rendering
    await Promise.resolve();

    this._router.replace(this._router.currentPath, {
      ...this.locationState,
      [tabId]: activeTab,
    });
  }

  component({
    id,
    tabs,
    defaultValue: defaultValueProp,
    className,
    children,
    variant: variantProp,
    tabsContainerClassName,
    tabClassName,
    tabRootClassName,
    ...rest
  }: SyncTabProps) {
    const tabInfo = useConnector(() => this.tabInfo[id]);

    const { t } = useLocale(i18n);

    const tabMap = useMemo(
      () =>
        tabs.reduce((acc, { id: tabKey, component }) => {
          acc[tabKey] = component;
          return acc;
        }, {} as Record<string, React.ReactNode>),
      [tabs],
    );

    const defaultValue = defaultValueProp ?? tabs[0].id;

    const currentTab = useMemo(() => {
      const activeKey = tabInfo?.active ?? defaultValue;
      const keys = Object.keys(tabMap);

      // when the currentTab not exist in the tabMap, use the first as render tab
      if (!tabMap[activeKey as string] && keys.length > 0) return keys[0];

      return activeKey;
    }, [defaultValue, tabInfo?.active, tabMap]);

    const [moreMenuBadgeCount, setMoreMenuBadgeCount] = useState(0);
    const variant = variantProp ?? 'moreMenu';

    const moreProps: Partial<TabsProps> = useMemo(
      () =>
        variant === 'moreMenu'
          ? {
              onGroupInfoUpdate: (_, hiddenItemValues) => {
                const count = tabs
                  .filter(({ id: tabKey }) => hiddenItemValues.includes(tabKey))
                  .reduce(
                    (acc, { BadgeProps }) => acc + (BadgeProps?.count ?? 0),
                    0,
                  );

                setMoreMenuBadgeCount(count);
              },
              MoreMenuProps: {
                title: t('more'),
                BadgeProps: {
                  count: moreMenuBadgeCount,
                },
                ButtonProps: {
                  'aria-label': t('more'),
                },
                MenuItemComponent,
              },
            }
          : {},
      [moreMenuBadgeCount, t, tabs, variant],
    );

    const tabRootClasses = clsx(
      'h-7 p-0 pl-2 pr-2 flex items-center',
      tabRootClassName,
    );
    const tabWidthClasses = clsx('flex-1', tabClassName);


    return (
      <TabContext
        defaultValue={defaultValue}
        value={currentTab}
        onChange={(_, value) => {
          this.setActive(id, value);
        }}
      >
        {
          // only when tabs.length > 1, need show the tab selection
          tabs.length > 1 && (
            <Tabs
              variant={variant}
              className={clsx(className, 'h-7', tabsContainerClassName)}
              {...moreProps}
              {...rest}
            >
              {tabs.map(({ id: tabKey, label, BadgeProps }) => (
                <Tab
                  id={tabKey}
                  key={tabKey}
                  value={tabKey}
                  data-sign={`${tabKey}Tab`}
                  label={label}
                  BadgeProps={BadgeProps}
                  className={tabWidthClasses}
                  classes={{
                    root: tabRootClasses,
                  }}
                />
              ))}
            </Tabs>
          )
        }
        {tabMap[currentTab] ?? children}
      </TabContext>
    );
  }
}

export enum SyncTabId {
  DIALPAD = 'dialPadTabs',
  CALL_LOG = 'callLogTabs',
  CONVERSATIONS = 'conversationsTabs',
}

export enum CallLogSyncTabId {
  LOG = 'callLog',
  AI_NOTE = 'aiNote',
}

export enum ConversationsSyncTabId {
  PERSONAL = 'personal',
  SHARED = 'shared',
}
