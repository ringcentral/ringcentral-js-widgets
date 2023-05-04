import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccess';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuide';
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
