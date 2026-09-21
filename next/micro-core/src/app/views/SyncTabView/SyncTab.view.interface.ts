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
  onActiveChange?: (value: string | number | null) => void;
  className?: string;
  tabClassName?: string;
  tabLabelClassName?: string;
}> &
  Omit<TabsProps, 'defaultValue' | 'value' | 'onChange' | 'children'>;
