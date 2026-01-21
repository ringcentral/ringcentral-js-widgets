import type { ConnectivityType } from '../../services/ConnectivityManager';

import type { ConnectivityPanel } from './ConnectivityPanel';

export interface ConnectivityViewOptions {
  component?: typeof ConnectivityPanel;
}

export interface ConnectivityViewProps {
  className?: string;
  mode: ConnectivityType | null;
  loading: boolean;
  retry: boolean;
  onClick: () => void;
}
