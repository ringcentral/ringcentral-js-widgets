import type { FormatNumberParams } from '@ringcentral-integration/commons/lib/formatNumber';

export type NumberFormattingParams = Omit<FormatNumberParams, 'phoneNumber'>;

export interface NumberFormatterOptions {
  /**
   * default is 7 is not specify
   */
  maxExtensionNumberLength?: number;

  /**
   * Overwrite the setting in ExtensionInfo, by default following the one in ExtensionInfo.
   */
  isMultipleSiteEnabled?: boolean;
}
