import type { SuiBrandThemeMap } from '@ringcentral-integration/micro-core/src/app/services';
import type { MotionConfigContext } from 'framer-motion';

import type { ThemeSwitchPanel } from './ThemeSwitchPanel';

export interface ThemeSwitchViewOptions {
  component?: typeof ThemeSwitchPanel;
}

export type ThemeTypeOption = {
  label: string;
  value: string;
};

export interface ThemeSwitchViewPanelProps {
  themeType: string;
  onThemeTypeChange: (themeType: string) => void;
  themeId: string;
  onThemeIdChange: (themeId: string) => void;
  themeMap: SuiBrandThemeMap;
  themeTypeOptions: ThemeTypeOption[];
  onBack: () => void;
  prefersReducedMotion: MotionConfigContext['reducedMotion'];
  onPrefersReducedMotionChange: (
    prefersReducedMotion: MotionConfigContext['reducedMotion'],
  ) => void;
  reducedMotionOptions: ThemeTypeOption[];
}

export interface ThemeSwitchViewContainerProps {}

export interface ThemeSwitchViewProps {
  //
}
