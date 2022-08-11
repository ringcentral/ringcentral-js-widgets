// Currency information
export interface CurrencyInfo {
  /**
   * Internal identifier of a currency
   * Format: int64
   */
  id: number;
  /**
   * Official code of a currency
   */
  code: string;
  /**
   * Official name of a currency
   */
  name: string;
  /**
   * Graphic symbol of a currency
   */
  symbol: string;
  /**
   * Minor graphic symbol of a currency
   */
  minorSymbol: string;
}
