import {
  CallFilledMd,
  CallMd,
  FaxFilledMd,
  FaxMd,
  SettingsFilledMd,
  SettingsMd,
  SmsFilledMd,
  Smsmd,
  VideoFilledMd,
  VideoMd,
} from '@ringcentral/spring-icon';

import type { NavButtonProps } from '../HeaderNav.view.interface';

type DefaultTabItem = Pick<NavButtonProps, 'symbol' | 'activeSymbol'>;

export const defaultTabMap = {
  dialer: {
    symbol: CallMd,
    activeSymbol: CallFilledMd,
  } as DefaultTabItem,
  text: {
    symbol: Smsmd,
    activeSymbol: SmsFilledMd,
  } as DefaultTabItem,
  fax: {
    symbol: FaxMd,
    activeSymbol: FaxFilledMd,
  } as DefaultTabItem,
  settings: {
    symbol: SettingsMd,
    activeSymbol: SettingsFilledMd,
  } as DefaultTabItem,
  video: {
    symbol: VideoMd,
    activeSymbol: VideoFilledMd,
  } as DefaultTabItem,
} as const;
