import type React from 'react';

export interface EulaProps {
  className?: string;
  link: string;
  label?: string;
  useShortLabel?: boolean;
  onClick?: (e: React.MouseEvent, link: string) => void;
}
