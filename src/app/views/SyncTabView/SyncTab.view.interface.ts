import type { TabsProps } from '@ringcentral/spring-ui';
import type { PropsWithChildren } from 'react';

export interface SyncTabViewOptions {}

export type SyncTabProps = PropsWithChildren<{
  id: string;
  tabs: {
    id: string;
    label: string;
    component: React.ReactNode;
    BadgeProps?: any;
  }[];
  defaultValue?: string;
  className?: string;
  tabsContainerClassName?: string;
  tabClassName?: string;
  tabRootClassName?: string;
}> &
  Omit<TabsProps, 'defaultValue' | 'value' | 'onChange' | 'children'>;
