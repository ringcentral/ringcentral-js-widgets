import { ComponentType } from 'react';

import { WelcomePanel } from './WelcomePanel';

export interface WelcomeViewOptions {
  component?: typeof WelcomePanel;
  /**
   * The route to redirect to after the welcome page get start click
   *
   * @default '/dialer'
   */
  routeAfterStart?: string;
}

export type WelcomePanelInfo =
  | {
      bgColor: string;
      icon: ComponentType<any>;
      iconColor: string;
      title: string;
      mainText?: string;
      subText?: string;
      copyText: string;
    }
  | {
      loading: boolean;
    };

export type WelcomePanelInfos = WelcomePanelInfo[];

export type WelcomePanelProp = {
  onGetStart: () => void;
  onCopy: () => void;
  logoUrl?: string;
  infos?: WelcomePanelInfos;
  userName?: string;
};
