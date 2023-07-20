import type { FixedOrderAgentsExtensionInfo } from './FixedOrderAgentsExtensionInfo';

export interface FixedOrderAgents {
  /**
   */
  extension: FixedOrderAgentsExtensionInfo;
  /**
   * Ordinal of an agent (call queue member)
   */
  index: number;
}
