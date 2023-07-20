import type { AddonInfo } from './AddonInfo';

// HardPhone model information
export interface ModelInfo {
  /**
   * Internal identifier of a HardPhone device model
   */
  id: string;
  /**
   * Device name
   */
  name: string;
  /**
   * Addons description
   */
  addons: AddonInfo[];
  /**
   */
  deviceClass: string;
  /**
   * Device feature or multiple features supported
   */
  features: ('BLA' | 'CommonPhone' | 'Intercom' | 'Paging' | 'HELD')[];
  /**
   * Max supported count of phone lines
   */
  lineCount: number;
}
