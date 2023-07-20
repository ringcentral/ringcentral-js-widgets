import type { ReactNode } from 'react';

import type { SearchSelectFieldProps } from '../components/SearchSelectField';

interface SettingField {
  dataSign?: string;
  onChange(...args: any[]): void;
  onBlur?(...args: any[]): void;
  value: any;
  input?: {
    type: string;
    label: string;
    required: boolean;
    placeholder: string;
    min?: number;
    max?: number;
  };
  select?: {
    getItemValue: (value: any) => any;
    renderValue: ReactNode;
    label: string;
    required: boolean;
    itemRenderer: (value: any) => ReactNode;
  } & Pick<SearchSelectFieldProps, 'options' | 'searchOption'>;
}

export type EvManualDialSettingsUIProps = {
  currentLocale: string;
  settingFields: SettingField[];
};

export type EvManualDialSettingsUIFunctions = {
  goBack(): void;
  init(): void;
  save(): void;
};
