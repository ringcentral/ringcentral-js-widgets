import { ToastItemPanelProps } from '../../../services';

import type { ToastItemPanel } from './ToastItemPanel';

export interface ToastItemViewOptions {
  component?: typeof ToastItemPanel;
}

export type ToastItemProps = {} & ToastItemPanelProps;
