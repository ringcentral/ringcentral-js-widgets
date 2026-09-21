import type { FunctionComponent } from 'react';
import React from 'react';

import { SpinnerOverlay } from '../SpinnerOverlay';
import TabContentPanel from '../TabContentPanel';

import styles from './styles.scss';

export interface Tab {
  path: string;
  label: string;
  dataSign: string;
  isActive: () => boolean;
}

export type TabContentViewChildren =
  | React.ReactNode
  | ((props: { showTabs?: boolean }) => React.ReactNode);

export interface TabContentViewProps {
  children?: TabContentViewChildren;
  goTo: (path: string) => void;
  showTabs: boolean;
  showSpinner: boolean;
  tabs: Tab[];
}

export const TabContentView: FunctionComponent<TabContentViewProps> = (
  props,
) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.showSpinner) {
    return <SpinnerOverlay />;
  }
  return (
    <TabContentPanel
      {...props}
      navClassName={styles.nav}
      tabContentClassName={styles.content}
    />
  );
};
