import type { DataSourceBaseProps } from '../DataFetcher';

export interface ExtensionInfoOptions extends DataSourceBaseProps {
  /**
   * Given current account is enabled the multiple site,
   * also when number is the same with current account
   * then the number needs to be formatted.
   *
   * when be same site the currentSiteCode will be remove from the extension
   *
   * side code: 567
   * source extension number: 5670101
   * result => 101 (5670 be removed)
   */
  isMultipleSiteEnabled?: boolean;
}

export interface RemappedServiceInfo {
  featureName: string;
  enabled: boolean;
  reason?: string;
}
