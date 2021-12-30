import React from 'react';

export interface EulaProps {
  currentLocale: string;
  className?: string;
  dataSign?: string;
  link: string;
  label?: string;
  useShortLabel?: boolean;
  onClick?: (e: React.MouseEvent, link: string) => void;
}
