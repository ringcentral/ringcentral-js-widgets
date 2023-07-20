import type { AdaptiveCardColumnInfo } from './AdaptiveCardColumnInfo';

export interface AdaptiveCardInfoRequestItem {
  /**
   */
  type: 'TextBlock' | 'ColumnSet' | 'Column' | 'FactSet';
  /**
   */
  text: string;
  /**
   */
  weight: string;
  /**
   */
  size: string;
  /**
   */
  columns: AdaptiveCardColumnInfo[];
}
