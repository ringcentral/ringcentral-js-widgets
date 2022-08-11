import { IVRMenuSiteInfo } from './IVRMenuSiteInfo';
import { IVRMenuPromptInfo } from './IVRMenuPromptInfo';
import { IVRMenuActionsInfo } from './IVRMenuActionsInfo';

export interface IVRMenuInfo {
  /**
   * Internal identifier of an IVR Menu extension
   */
  id: string;
  /**
   * Link to an IVR Menu extension resource
   */
  uri: string;
  /**
   * First name of an IVR Menu user
   */
  name: string;
  /**
   * Number of an IVR Menu extension
   */
  extensionNumber: string;
  /**
   */
  site: IVRMenuSiteInfo;
  /**
   */
  prompt: IVRMenuPromptInfo;
  /**
   * Keys handling settings
   */
  actions: IVRMenuActionsInfo[];
}
