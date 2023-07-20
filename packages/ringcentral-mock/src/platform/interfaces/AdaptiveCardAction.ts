import type { ActionAdaptiveCardInfo } from './ActionAdaptiveCardInfo';

export interface AdaptiveCardAction {
  /**
   */
  type:
    | 'Action.ShowCard'
    | 'Action.Submit'
    | 'Action.OpenUrl'
    | 'Action.ToggleVisibility';
  /**
   */
  title: string;
  /**
   */
  card: ActionAdaptiveCardInfo;
  /**
   */
  url: string;
}
