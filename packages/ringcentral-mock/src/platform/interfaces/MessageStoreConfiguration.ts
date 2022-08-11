export interface MessageStoreConfiguration {
  /**
   * Retention policy setting, specifying how long to keep messages; the supported value range is 7-90 days
   * Maximum: 90
   * Minimum: 7
   */
  retentionPeriod: number;
}
