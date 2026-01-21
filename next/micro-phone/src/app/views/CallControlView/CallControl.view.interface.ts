import type {
  CallCtrlContainer,
  CallCtrlContainerProps,
} from '@ringcentral-integration/widgets/components/CallCtrlContainer';
import type { ReactNode } from 'react';

export interface CallControlViewOptions {
  component?: typeof CallCtrlContainer;
}

export interface CallControlComponentProps {
  showCallQueueName?: boolean;
  showPark?: boolean;
  getAvatarUrl?: () => string;
  onBackButtonClick?: () => any;
  phoneTypeRenderer?: () => ReactNode;
  phoneSourceNameRenderer?: () => ReactNode;
  children?: ReactNode;
}

export interface CallControlViewProps extends CallCtrlContainerProps {
  //
}
