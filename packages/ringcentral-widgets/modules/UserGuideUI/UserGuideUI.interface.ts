import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  routerInteraction: RouterInteraction;
  locale: Locale;
  userGuide: UserGuide;
  quickAccess?: QuickAccess;
}

export interface UserGuidePanelProps {
  showSpinner: boolean;
  currentLocale: string;
  curIdx: number;
  entered: boolean;
  playing: boolean;
  firstLogin: boolean;
  guides: string[];
  updateCarousel: UserGuide['updateCarousel'];
  quickAccessEnter?: () => Promise<void>;
}
