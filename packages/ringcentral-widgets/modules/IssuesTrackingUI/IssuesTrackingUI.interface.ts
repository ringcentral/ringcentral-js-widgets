import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { BrowserLogger } from '@ringcentral-integration/commons/modules/BrowserLogger';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';

import type { RouterInteraction } from '../RouterInteraction';

export interface IssuesTrackingViewOptions {
  //
}

export interface Deps {
  routerInteraction: RouterInteraction;
  locale: Locale;
  alert: Alert;
  browserLogger: BrowserLogger;
  issuesTrackingViewOptions?: IssuesTrackingViewOptions;
}

export interface IssuesTrackingContainerProps {
  //
}

export interface IssuesTrackingPanelProps {
  currentLocale: string;
  downloading: boolean;
  enabled: boolean;
  goBack: () => void;
  toggleEnable: (checked: boolean) => void;
  downloadLog: () => Promise<void>;
  ConfirmPanelProps: {
    open: boolean;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
  };
}
