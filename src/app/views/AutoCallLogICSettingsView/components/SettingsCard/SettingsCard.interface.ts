import { ReactNode } from 'react';

export interface SettingsCardProps {
  mainText: string;
  descriptor?: string;
  className?: string;
  mainTextClassName?: string;
  descriptorClassName?: string;
  children?: ReactNode;
  dataSign?: string;
}
