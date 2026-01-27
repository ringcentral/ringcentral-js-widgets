import type UserGuidePanel from '@ringcentral-integration/widgets/components/UserGuide';

import type { UserGuide } from '../../services';

export interface UserGuideViewOptions {
  component?: typeof UserGuidePanel;
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
  quickAccessEnter?: () => Promise<void> | undefined;
}

export interface UserGuideViewProps {
  //
}
